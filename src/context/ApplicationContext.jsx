/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { format } from 'date-fns'

import { useLocalStorage } from '../hooks/useLocalStorage'
import { fetchMockApplications, getFallbackApplications } from '../services/api'
import { LOCAL_STORAGE_KEY } from '../utils/constants'
import { generateId, normalizeStatus } from '../utils/helpers'

const ApplicationContext = createContext(null)

function sanitizeApplication(application) {
  return {
    id: application.id || generateId(),
    company: application.company?.trim() || '',
    role: application.role?.trim() || '',
    location: application.location?.trim() || '',
    locationType: application.locationType || 'Remote',
    salary: Number(application.salary) || 0,
    platform: application.platform || 'LinkedIn',
    status: normalizeStatus(application.status),
    appliedDate: application.appliedDate || format(new Date(), 'yyyy-MM-dd'),
    interviewDate: application.interviewDate || '',
    notes: application.notes?.trim() || '',
    bookmarked: Boolean(application.bookmarked),
  }
}

export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useLocalStorage(LOCAL_STORAGE_KEY, [])
  const [loading, setLoading] = useState(true)
  const [seedSource, setSeedSource] = useState('local')

  useEffect(() => {
    let active = true

    async function bootstrap() {
      if (applications.length > 0) {
        setSeedSource('local')
        setLoading(false)
        return
      }

      try {
        const mockApplications = await fetchMockApplications(24)
        if (!active) {
          return
        }

        setApplications(mockApplications)
        setSeedSource('api')
      } catch (error) {
        if (!active) {
          return
        }

        console.error('Failed to fetch dummy API. Falling back to local seed data.', error)
        setApplications(getFallbackApplications())
        setSeedSource('fallback')
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    bootstrap()

    return () => {
      active = false
    }
    // We only want this to run once on initial mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addApplication = useCallback(
    (payload) => {
      const newApplication = sanitizeApplication({
        ...payload,
        id: generateId(),
        bookmarked: payload.bookmarked ?? false,
      })

      setApplications((previous) => [newApplication, ...previous])
      return newApplication
    },
    [setApplications],
  )

  const updateApplication = useCallback(
    (id, updates) => {
      let updated = null

      setApplications((previous) =>
        previous.map((application) => {
          if (application.id !== id) {
            return application
          }

          updated = sanitizeApplication({
            ...application,
            ...updates,
            id,
          })

          return updated
        }),
      )

      return updated
    },
    [setApplications],
  )

  const deleteApplication = useCallback(
    (id) => {
      setApplications((previous) => previous.filter((application) => application.id !== id))
    },
    [setApplications],
  )

  const toggleBookmark = useCallback(
    (id) => {
      setApplications((previous) =>
        previous.map((application) =>
          application.id === id
            ? { ...application, bookmarked: !application.bookmarked }
            : application,
        ),
      )
    },
    [setApplications],
  )

  const getApplicationById = useCallback(
    (id) => applications.find((application) => application.id === id),
    [applications],
  )

  const replaceApplications = useCallback(
    (nextApplications) => {
      const sanitized = nextApplications.map((item) => sanitizeApplication(item))
      setApplications(sanitized)
    },
    [setApplications],
  )

  const value = useMemo(
    () => ({
      applications,
      loading,
      seedSource,
      addApplication,
      updateApplication,
      deleteApplication,
      toggleBookmark,
      getApplicationById,
      replaceApplications,
    }),
    [
      applications,
      loading,
      seedSource,
      addApplication,
      updateApplication,
      deleteApplication,
      toggleBookmark,
      getApplicationById,
      replaceApplications,
    ],
  )

  return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>
}

export function useApplicationContext() {
  const context = useContext(ApplicationContext)

  if (!context) {
    throw new Error('useApplicationContext must be used inside ApplicationProvider')
  }

  return context
}
