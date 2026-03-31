import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

import { EmptyState } from '../../components/Common/EmptyState'
import { Loader } from '../../components/Common/Loader'
import { PageHeader } from '../../components/Common/PageHeader'
import { ApplicationForm } from '../../components/Forms/ApplicationForm'
import { useApplicationContext } from '../../context/ApplicationContext'
import { getFormValuesFromApplication } from '../../utils/helpers'

const MotionDiv = motion.div

export function EditApplicationPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { loading, getApplicationById, updateApplication } = useApplicationContext()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const application = getApplicationById(id)
  const initialValues = useMemo(() => getFormValuesFromApplication(application), [application])

  async function handleSubmit(data) {
    setIsSubmitting(true)

    try {
      updateApplication(id, data)
      toast.success('Application updated')
      navigate('/applications')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <Loader label="Loading application details..." />
  }

  if (!application) {
    return (
      <EmptyState
        title="Application not found"
        description="This record may have been deleted or the link is invalid."
        action={
          <Link to="/applications" className="button button--ghost">
            Back to Applications
          </Link>
        }
      />
    )
  }

  return (
    <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-stack">
      <PageHeader
        title={`Edit ${application.company}`}
        description="Update timeline details, status changes, and notes as your process progresses."
        actions={
          <Link to="/applications" className="button button--ghost">
            Back to Applications
          </Link>
        }
      />

      <ApplicationForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel="Update Application"
        isSubmitting={isSubmitting}
      />
    </MotionDiv>
  )
}
