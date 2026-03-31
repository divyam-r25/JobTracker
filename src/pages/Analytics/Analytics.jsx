import { useMemo } from 'react'
import { FiBarChart2, FiBookmark, FiCalendar, FiTrendingUp } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import { MonthlyApplicationsChart } from '../../components/Charts/MonthlyApplicationsChart'
import { StatusPieChart } from '../../components/Charts/StatusPieChart'
import { EmptyState } from '../../components/Common/EmptyState'
import { Loader } from '../../components/Common/Loader'
import { PageHeader } from '../../components/Common/PageHeader'
import { StatsCards } from '../../components/Common/StatsCards'
import { useApplicationContext } from '../../context/ApplicationContext'
import { useApplications } from '../../hooks/useApplications'
import './Analytics.css'

const MotionDiv = motion.div

function getTopPlatforms(applications) {
  const platformMap = applications.reduce((acc, item) => {
    acc.set(item.platform, (acc.get(item.platform) || 0) + 1)
    return acc
  }, new Map())

  return [...platformMap.entries()]
    .sort((first, second) => second[1] - first[1])
    .map(([platform, count]) => ({ platform, count }))
}

export function AnalyticsPage() {
  const { loading } = useApplicationContext()
  const { analytics, allApplications } = useApplications()

  const topPlatforms = useMemo(() => getTopPlatforms(allApplications).slice(0, 5), [allApplications])

  if (loading) {
    return <Loader label="Crunching analytics..." />
  }

  const stats = [
    {
      label: 'Total Applications',
      value: analytics.totalApplications,
      icon: FiBarChart2,
      iconBg: 'rgba(14, 165, 233, 0.22)',
    },
    {
      label: 'Interview Rate',
      value:
        analytics.totalApplications > 0
          ? `${Math.round((analytics.interviewsScheduled / analytics.totalApplications) * 100)}%`
          : '0%',
      icon: FiCalendar,
      iconBg: 'rgba(59, 130, 246, 0.2)',
    },
    {
      label: 'Offer Rate',
      value:
        analytics.totalApplications > 0
          ? `${Math.round((analytics.offersReceived / analytics.totalApplications) * 100)}%`
          : '0%',
      icon: FiTrendingUp,
      iconBg: 'rgba(245, 158, 11, 0.22)',
    },
    {
      label: 'Bookmarked',
      value: analytics.bookmarked,
      icon: FiBookmark,
      iconBg: 'rgba(20, 184, 166, 0.2)',
    },
  ]

  return (
    <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-stack">
      <PageHeader
        title="Analytics"
        description="Understand trendlines, conversion rates, and which channels are driving the best outcomes."
        actions={
          <Link to="/applications" className="button button--ghost">
            Manage Applications
          </Link>
        }
      />

      <StatsCards stats={stats} />

      <section className="dashboard-grid">
        <StatusPieChart data={analytics.statusDistribution} />
        <MonthlyApplicationsChart data={analytics.monthlyApplications} />
      </section>

      <section className="panel">
        <div className="panel__header">
          <h2>Top Application Platforms</h2>
        </div>

        {topPlatforms.length ? (
          <ul className="platform-list">
            {topPlatforms.map((platform) => (
              <li key={platform.platform}>
                <p>{platform.platform}</p>
                <strong>{platform.count}</strong>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="No platform trends yet"
            description="Add more applications to unlock platform performance insights."
          />
        )}
      </section>
    </MotionDiv>
  )
}
