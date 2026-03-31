import { getStatusTone, normalizeStatus } from '../../utils/helpers'
import './StatusPill.css'

export function StatusPill({ status }) {
  const normalized = normalizeStatus(status)

  return <span className={`status-pill ${getStatusTone(normalized)}`}>{normalized}</span>
}
