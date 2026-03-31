import { Link } from 'react-router-dom'

import { EmptyState } from '../components/Common/EmptyState'

export function NotFoundPage() {
  return (
    <EmptyState
      title="Page not found"
      description="The page you requested does not exist."
      action={
        <Link to="/dashboard" className="button button--ghost">
          Go to Dashboard
        </Link>
      }
    />
  )
}
