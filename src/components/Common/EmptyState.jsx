import { FiInbox } from 'react-icons/fi'

import './EmptyState.css'

export function EmptyState({
  title = 'No data found',
  description = 'Try changing the filters or add a new job application.',
  action,
}) {
  return (
    <div className="empty-state">
      <FiInbox className="empty-state__icon" aria-hidden="true" />
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  )
}
