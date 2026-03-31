import { FiBookmark } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { formatDate } from '../../utils/helpers'
import { EmptyState } from './EmptyState'
import { StatusPill } from './StatusPill'
import './BookmarkedList.css'

export function BookmarkedList({ applications }) {
  if (!applications.length) {
    return (
      <EmptyState
        title="No bookmarked jobs"
        description="Bookmark important roles to keep them in focus."
      />
    )
  }

  return (
    <section className="bookmark-list" aria-label="Bookmarked applications">
      {applications.map((application) => (
        <article key={application.id} className="bookmark-item">
          <div>
            <p className="bookmark-item__company">
              <FiBookmark aria-hidden="true" />
              {application.company}
            </p>
            <p className="bookmark-item__role">{application.role}</p>
          </div>

          <div className="bookmark-item__meta">
            <StatusPill status={application.status} />
            <span>Applied {formatDate(application.appliedDate)}</span>
            <Link to={`/applications/${application.id}`}>Open</Link>
          </div>
        </article>
      ))}
    </section>
  )
}
