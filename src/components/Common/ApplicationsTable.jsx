import { FiBookmark, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { formatDate, getDummyLogoUrl, getLogoUrl, getSalaryRange } from '../../utils/helpers'
import { StatusPill } from './StatusPill'
import './ApplicationsTable.css'

function CompanyCell({ company }) {
  const logoUrl = getLogoUrl(company) || getDummyLogoUrl(company)

  function handleLogoError(event) {
    const fallbackLogo = getDummyLogoUrl(company)
    if (event.currentTarget.src !== fallbackLogo) {
      event.currentTarget.src = fallbackLogo
    }
    event.currentTarget.onerror = null
  }

  return (
    <div className="table-company">
      <img src={logoUrl} alt={`${company} logo`} onError={handleLogoError} />
      <span>{company}</span>
    </div>
  )
}

export function ApplicationsTable({ applications, onDelete, onToggleBookmark }) {
  return (
    <div className="applications-table-wrap">
      <table className="applications-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Status</th>
            <th>Applied Date</th>
            <th>Salary Range</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.id}>
              <td>
                <CompanyCell company={application.company} />
              </td>
              <td>{application.role}</td>
              <td>
                <StatusPill status={application.status} />
              </td>
              <td>{formatDate(application.appliedDate)}</td>
              <td>{getSalaryRange(application.salary)}</td>
              <td>
                <div className="table-actions">
                  <button
                    type="button"
                    className={
                      application.bookmarked
                        ? 'table-action table-action--active'
                        : 'table-action'
                    }
                    onClick={() => onToggleBookmark(application.id)}
                    aria-label={application.bookmarked ? 'Remove bookmark' : 'Bookmark'}
                  >
                    <FiBookmark aria-hidden="true" />
                  </button>

                  <Link to={`/applications/${application.id}`} className="table-action">
                    <FiEdit2 aria-hidden="true" />
                  </Link>

                  <button
                    type="button"
                    className="table-action table-action--danger"
                    onClick={() => onDelete(application.id)}
                    aria-label="Delete application"
                  >
                    <FiTrash2 aria-hidden="true" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
