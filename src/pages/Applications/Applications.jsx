import { useMemo, useState } from 'react'
import { FiGrid, FiList, FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

import { Filters } from '../../components/Filters/Filters'
import { ApplicationsTable } from '../../components/Common/ApplicationsTable'
import { EmptyState } from '../../components/Common/EmptyState'
import { Loader } from '../../components/Common/Loader'
import { PageHeader } from '../../components/Common/PageHeader'
import { JobCard } from '../../components/JobCard/JobCard'
import { SearchBar } from '../../components/SearchBar/SearchBar'
import { useApplicationContext } from '../../context/ApplicationContext'
import { useApplications } from '../../hooks/useApplications'
import { useDebounce } from '../../hooks/useDebounce'
import { DEFAULT_FILTERS, PIPELINE_TABS } from '../../utils/constants'
import './Applications.css'

const MotionDiv = motion.div

export function ApplicationsPage() {
  const { loading, deleteApplication, toggleBookmark } = useApplicationContext()

  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [sortBy, setSortBy] = useState('appliedDateDesc')
  const [activeTab, setActiveTab] = useState('All')
  const [viewMode, setViewMode] = useState('cards')
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false)

  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  const { applications, pipelineCounts } = useApplications({
    query: debouncedSearchQuery,
    filters,
    sortBy,
    activeTab,
    showBookmarkedOnly,
  })

  const hasActiveQuery = searchQuery.trim().length > 0
  const resultLabel = useMemo(() => {
    if (applications.length === 1) {
      return '1 application found'
    }

    return `${applications.length} applications found`
  }, [applications.length])

  function handleDelete(id) {
    const shouldDelete = window.confirm('Delete this application? This action cannot be undone.')

    if (!shouldDelete) {
      return
    }

    deleteApplication(id)
    toast.success('Application deleted')
  }

  function handleToggleBookmark(id) {
    toggleBookmark(id)
  }

  function resetAllControls() {
    setSearchQuery('')
    setFilters(DEFAULT_FILTERS)
    setSortBy('appliedDateDesc')
    setActiveTab('All')
    setShowBookmarkedOnly(false)
  }

  if (loading) {
    return <Loader label="Loading applications..." />
  }

  return (
    <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-stack">
      <PageHeader
        title="Applications"
        description="Search, filter, sort, and manage your full job pipeline in one place."
        actions={
          <Link to="/applications/new" className="button button--primary">
            <FiPlus aria-hidden="true" />
            Add Application
          </Link>
        }
      />

      <section className="applications-controls">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <div className="view-toggle" role="group" aria-label="Toggle application view">
          <button
            type="button"
            className={viewMode === 'cards' ? 'view-toggle__button view-toggle__button--active' : 'view-toggle__button'}
            onClick={() => setViewMode('cards')}
          >
            <FiGrid aria-hidden="true" />
            Cards
          </button>
          <button
            type="button"
            className={viewMode === 'table' ? 'view-toggle__button view-toggle__button--active' : 'view-toggle__button'}
            onClick={() => setViewMode('table')}
          >
            <FiList aria-hidden="true" />
            Table
          </button>
        </div>
      </section>

      <section className="pipeline-tabs" role="tablist" aria-label="Pipeline tabs">
        {PIPELINE_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            className={activeTab === tab ? 'pipeline-tab pipeline-tab--active' : 'pipeline-tab'}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            <span>{pipelineCounts[tab] ?? 0}</span>
          </button>
        ))}
      </section>

      <Filters
        filters={filters}
        onFiltersChange={setFilters}
        sortBy={sortBy}
        onSortChange={setSortBy}
        showBookmarkedOnly={showBookmarkedOnly}
        onToggleBookmarks={() => setShowBookmarkedOnly((previous) => !previous)}
      />

      <section className="results-meta">
        <p>{resultLabel}</p>
        {hasActiveQuery && <small>Showing results for "{debouncedSearchQuery}"</small>}
      </section>

      {applications.length ? (
        viewMode === 'cards' ? (
          <section className="job-card-grid">
            {applications.map((application) => (
              <JobCard
                key={application.id}
                application={application}
                onDelete={handleDelete}
                onToggleBookmark={handleToggleBookmark}
              />
            ))}
          </section>
        ) : (
          <ApplicationsTable
            applications={applications}
            onDelete={handleDelete}
            onToggleBookmark={handleToggleBookmark}
          />
        )
      ) : (
        <EmptyState
          title="No applications match your criteria"
          description="Try resetting filters or add a new application to grow your pipeline."
          action={
            <button type="button" className="button button--ghost" onClick={resetAllControls}>
              Reset Search & Filters
            </button>
          }
        />
      )}
    </MotionDiv>
  )
}
