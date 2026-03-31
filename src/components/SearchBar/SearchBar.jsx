import { FiSearch, FiX } from 'react-icons/fi'

import './SearchBar.css'

export function SearchBar({ value, onChange, placeholder = 'Search by company or role' }) {
  return (
    <label className="searchbar" htmlFor="job-search-input">
      <FiSearch aria-hidden="true" />
      <input
        id="job-search-input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {value ? (
        <button
          type="button"
          className="searchbar__clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          <FiX aria-hidden="true" />
        </button>
      ) : null}
    </label>
  )
}
