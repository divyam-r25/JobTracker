import { FiBookmark, FiCalendar, FiEdit2, FiMapPin, FiTrash2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import { formatDate, getDummyLogoUrl, getLogoUrl, getSalaryRange } from '../../utils/helpers'
import { StatusPill } from '../Common/StatusPill'
import './JobCard.css'

const MotionArticle = motion.article

export function JobCard({ application, onDelete, onToggleBookmark }) {
  const logoUrl = getLogoUrl(application.company) || getDummyLogoUrl(application.company)

  function handleLogoError(event) {
    const fallbackLogo = getDummyLogoUrl(application.company)
    if (event.currentTarget.src !== fallbackLogo) {
      event.currentTarget.src = fallbackLogo
    }
    event.currentTarget.onerror = null
  }

  return (
    <MotionArticle
      className="job-card"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <header className="job-card__header">
        <div className="job-card__company-wrap">
          <img
            src={logoUrl}
            alt={`${application.company} logo`}
            className="job-card__logo"
            onError={handleLogoError}
          />

          <div>
            <h3>{application.company}</h3>
            <p>{application.role}</p>
          </div>
        </div>

        <StatusPill status={application.status} />
      </header>

      <dl className="job-card__meta">
        <div>
          <dt>
            <FiMapPin aria-hidden="true" />
            Location
          </dt>
          <dd>{application.location || '--'}</dd>
        </div>

        <div>
          <dt>
            <FiCalendar aria-hidden="true" />
            Applied
          </dt>
          <dd>{formatDate(application.appliedDate)}</dd>
        </div>

        <div>
          <dt>Salary Range</dt>
          <dd>{getSalaryRange(application.salary)}</dd>
        </div>

        <div>
          <dt>Platform</dt>
          <dd>{application.platform}</dd>
        </div>
      </dl>

      <footer className="job-card__footer">
        <button
          type="button"
          className={application.bookmarked ? 'icon-button icon-button--active' : 'icon-button'}
          onClick={() => onToggleBookmark(application.id)}
          aria-label={application.bookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <FiBookmark aria-hidden="true" />
          {application.bookmarked ? 'Saved' : 'Save'}
        </button>

        <Link to={`/applications/${application.id}`} className="icon-button icon-button--link">
          <FiEdit2 aria-hidden="true" />
          Edit
        </Link>

        <button
          type="button"
          className="icon-button icon-button--danger"
          onClick={() => onDelete(application.id)}
        >
          <FiTrash2 aria-hidden="true" />
          Delete
        </button>
      </footer>
    </MotionArticle>
  )
}
