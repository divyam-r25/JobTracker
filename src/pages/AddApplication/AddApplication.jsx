import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

import { ApplicationForm } from '../../components/Forms/ApplicationForm'
import { PageHeader } from '../../components/Common/PageHeader'
import { useApplicationContext } from '../../context/ApplicationContext'

const MotionDiv = motion.div

export function AddApplicationPage() {
  const navigate = useNavigate()
  const { addApplication } = useApplicationContext()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(data) {
    setIsSubmitting(true)

    try {
      addApplication(data)
      toast.success('Application added successfully')
      navigate('/applications')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-stack">
      <PageHeader
        title="Add Application"
        description="Capture every opportunity with complete context and timeline details."
        actions={
          <Link to="/applications" className="button button--ghost">
            Back to Applications
          </Link>
        }
      />

      <ApplicationForm
        onSubmit={handleSubmit}
        submitLabel="Create Application"
        isSubmitting={isSubmitting}
      />
    </MotionDiv>
  )
}
