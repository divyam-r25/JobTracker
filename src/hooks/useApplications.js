import { useMemo } from 'react'

import { useApplicationContext } from '../context/ApplicationContext'
import { DEFAULT_FILTERS } from '../utils/constants'
import {
  filterApplications,
  getAnalytics,
  getPipelineCounts,
  sortApplications,
} from '../utils/helpers'

export function useApplications(options = {}) {
  const { applications: allApplications } = useApplicationContext()

  const {
    query = '',
    filters = DEFAULT_FILTERS,
    sortBy = 'appliedDateDesc',
    activeTab = 'All',
    showBookmarkedOnly = false,
  } = options

  const mergedFilters = useMemo(
    () => ({
      ...DEFAULT_FILTERS,
      ...filters,
    }),
    [filters],
  )

  const applications = useMemo(() => {
    const filtered = filterApplications(
      allApplications,
      query,
      mergedFilters,
      activeTab,
      showBookmarkedOnly,
    )

    return sortApplications(filtered, sortBy)
  }, [allApplications, query, mergedFilters, activeTab, showBookmarkedOnly, sortBy])

  const pipelineCounts = useMemo(() => getPipelineCounts(allApplications), [allApplications])
  const bookmarkedApplications = useMemo(
    () => allApplications.filter((application) => application.bookmarked),
    [allApplications],
  )
  const analytics = useMemo(() => getAnalytics(allApplications), [allApplications])

  return {
    applications,
    allApplications,
    pipelineCounts,
    bookmarkedApplications,
    analytics,
  }
}
