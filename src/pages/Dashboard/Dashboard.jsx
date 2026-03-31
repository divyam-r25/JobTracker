import { FiBarChart2, FiCalendar, FiCheckCircle, FiPlusCircle, FiXOctagon } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import { MonthlyApplicationsChart } from '../../components/Charts/MonthlyApplicationsChart'
import { StatusPieChart } from '../../components/Charts/StatusPieChart'
import { BookmarkedList } from '../../components/Common/BookmarkedList'
import { EmptyState } from '../../components/Common/EmptyState'
import { Loader } from '../../components/Common/Loader'
import { PageHeader } from '../../components/Common/PageHeader'
import { StatsCards } from '../../components/Common/StatsCards'
import { StatusPill } from '../../components/Common/StatusPill'
import { useApplicationContext } from '../../context/ApplicationContext'
import { useApplications } from '../../hooks/useApplications'
import { formatDate, getRecentApplications, getUpcomingInterviews } from '../../utils/helpers'
import './Dashboard.css'

const MotionDiv = motion.div

export function DashboardPage() {
  const { loading, seedSource, applications: allApplications } = useApplicationContext()
  const { analytics, bookmarkedApplications } = useApplications()

  if (loading) {
    return <Loader label="Loading your dashboard..." />
  }

  const upcomingInterviews = getUpcomingInterviews(allApplications).slice(0, 5)
  const recentApplications = getRecentApplications(allApplications, 5)

  const stats = [
    {
      label: 'Total Applications',
      value: analytics.totalApplications,
      icon: FiBarChart2,
      iconBg: 'rgba(14, 165, 233, 0.2)',
      subtle: `Data source: ${seedSource}`,
    },
    {
      label: 'Interviews',
      value: analytics.interviewsScheduled,
      icon: FiCalendar,
      iconBg: 'rgba(59, 130, 246, 0.2)',
    },
    {
      label: 'Offers',
      value: analytics.offersReceived,
      icon: FiCheckCircle,
      iconBg: 'rgba(245, 158, 11, 0.25)',
    },
    {
      label: 'Rejections',
      value: analytics.rejected,
      icon: FiXOctagon,
      iconBg: 'rgba(248, 113, 113, 0.22)',
    },
    {
      label: 'Bookmarked',
      value: analytics.bookmarked,
      icon: FiPlusCircle,
      iconBg: 'rgba(20, 184, 166, 0.2)',
    },
  ]

  return (
    <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-stack">
      <PageHeader
        title="Dashboard"
        description="Track your pipeline health, upcoming interviews, and top opportunities from a single view."
        actions={
          <>
            <Link to="/applications" className="button button--ghost">
              View Applications
            </Link>
            <Link to="/applications/new" className="button button--primary">
              Add Application
            </Link>
          </>
        }
      />

      <StatsCards stats={stats} />

      <section className="dashboard-grid">
        <StatusPieChart data={analytics.statusDistribution} />
        <MonthlyApplicationsChart data={analytics.monthlyApplications} />
      </section>

      <section className="dashboard-grid dashboard-grid--split">
        <article className="panel">
          <div className="panel__header">
            <h2>Upcoming Interviews</h2>
          </div>

          {upcomingInterviews.length ? (
            <div className="timeline-list">
              {upcomingInterviews.map((application) => (
                <article key={application.id} className="timeline-item">
                  <div>
                    <p className="timeline-item__title">
                      {application.company} - {application.role}
                    </p>
                    <p className="timeline-item__meta">
                      Scheduled for {formatDate(application.interviewDate)}
                    </p>
                  </div>
                  <StatusPill status={application.status} />
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No upcoming interviews"
              description="Keep pushing applications. Your next interview slot will show up here."
            />
          )}
        </article>

        <article className="panel">
          <div className="panel__header">
            <h2>Bookmarked Jobs</h2>
          </div>
          <BookmarkedList applications={bookmarkedApplications.slice(0, 4)} />
        </article>
      </section>

      <section className="panel">
        <div className="panel__header">
          <h2>Recent Applications</h2>
          <Link to="/applications" className="panel__link">
            See all
          </Link>
        </div>

        {recentApplications.length ? (
          <ul className="recent-list">
            {recentApplications.map((application) => (
              <li key={application.id}>
                <p>
                  <strong>{application.company}</strong> - {application.role}
                </p>
                <span>{formatDate(application.appliedDate)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="No applications yet"
            description="Start tracking your applications to unlock dashboard insights."
          />
        )}
      </section>
    </MotionDiv>
  )
}
