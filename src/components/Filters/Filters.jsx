import { FiBookmark } from 'react-icons/fi'

import {
  DEFAULT_FILTERS,
  LOCATION_TYPE_OPTIONS,
  PLATFORM_OPTIONS,
  SORT_OPTIONS,
  STATUS_OPTIONS,
} from '../../utils/constants'
import './Filters.css'

export function Filters({
  filters,
  onFiltersChange,
  sortBy,
  onSortChange,
  showBookmarkedOnly,
  onToggleBookmarks,
}) {
  function handleFilterChange(key, value) {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const hasActiveFilter =
    filters.status !== DEFAULT_FILTERS.status ||
    filters.platform !== DEFAULT_FILTERS.platform ||
    filters.locationType !== DEFAULT_FILTERS.locationType

  return (
    <section className="filters" aria-label="Application filters and sorting">
      <label>
        <span>Status</span>
        <select
          value={filters.status}
          onChange={(event) => handleFilterChange('status', event.target.value)}
        >
          <option value="All">All Statuses</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Platform</span>
        <select
          value={filters.platform}
          onChange={(event) => handleFilterChange('platform', event.target.value)}
        >
          <option value="All">All Platforms</option>
          {PLATFORM_OPTIONS.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Location Type</span>
        <select
          value={filters.locationType}
          onChange={(event) => handleFilterChange('locationType', event.target.value)}
        >
          <option value="All">All Types</option>
          {LOCATION_TYPE_OPTIONS.map((locationType) => (
            <option key={locationType} value={locationType}>
              {locationType}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Sort By</span>
        <select value={sortBy} onChange={(event) => onSortChange(event.target.value)}>
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        className={
          showBookmarkedOnly ? 'filters__bookmark filters__bookmark--active' : 'filters__bookmark'
        }
        onClick={onToggleBookmarks}
      >
        <FiBookmark aria-hidden="true" />
        {showBookmarkedOnly ? 'Bookmarked Only' : 'Show Bookmarked'}
      </button>

      {hasActiveFilter ? (
        <button
          type="button"
          className="button button--ghost"
          onClick={() => onFiltersChange(DEFAULT_FILTERS)}
        >
          Reset Filters
        </button>
      ) : null}
    </section>
  )
}
