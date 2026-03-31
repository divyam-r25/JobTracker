import './StatsCards.css'

export function StatsCards({ stats }) {
  return (
    <section className="stats-grid" aria-label="Summary metrics">
      {stats.map((stat) => {
        const Icon = stat.icon

        return (
          <article key={stat.label} className="stats-card">
            <div className="stats-card__icon" style={{ background: stat.iconBg }}>
              <Icon aria-hidden="true" />
            </div>
            <div>
              <p className="stats-card__label">{stat.label}</p>
              <p className="stats-card__value">{stat.value}</p>
              {stat.subtle && <p className="stats-card__subtle">{stat.subtle}</p>}
            </div>
          </article>
        )
      })}
    </section>
  )
}
