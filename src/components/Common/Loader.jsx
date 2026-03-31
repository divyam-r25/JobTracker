import './Loader.css'

export function Loader({ label = 'Loading...' }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader__spinner" />
      <p>{label}</p>
    </div>
  )
}
