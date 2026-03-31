import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import {
  DEFAULT_FORM_VALUES,
  LOCATION_TYPE_OPTIONS,
  PLATFORM_OPTIONS,
  STATUS_OPTIONS,
} from '../../utils/constants'
import { toApplicationPayload } from '../../utils/helpers'
import './ApplicationForm.css'

const schema = yup.object({
  company: yup.string().trim().required('Company name is required'),
  role: yup.string().trim().required('Role is required'),
  location: yup.string().trim().nullable(),
  locationType: yup.string().oneOf(LOCATION_TYPE_OPTIONS).required('Location type is required'),
  salary: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .typeError('Salary must be a number')
    .min(0, 'Salary must be positive')
    .nullable(),
  platform: yup.string().oneOf(PLATFORM_OPTIONS).required('Platform is required'),
  status: yup.string().oneOf(STATUS_OPTIONS).required('Status is required'),
  appliedDate: yup.string().required('Applied date is required'),
  interviewDate: yup
    .string()
    .nullable()
    .test(
      'interviewAfterApplied',
      'Interview date must be on or after applied date',
      function validateInterviewDate(value) {
        if (!value || !this.parent.appliedDate) {
          return true
        }

        return new Date(value) >= new Date(this.parent.appliedDate)
      },
    ),
  notes: yup.string().max(800, 'Notes cannot exceed 800 characters').nullable(),
})

export function ApplicationForm({
  initialValues,
  onSubmit,
  submitLabel = 'Save Application',
  isSubmitting,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues || DEFAULT_FORM_VALUES,
  })

  useEffect(() => {
    reset(initialValues || DEFAULT_FORM_VALUES)
  }, [initialValues, reset])

  return (
    <form className="application-form" onSubmit={handleSubmit((values) => onSubmit(toApplicationPayload(values)))}>
      <section className="application-form__grid">
        <label>
          <span>Company Name *</span>
          <input type="text" placeholder="Google" {...register('company')} />
          {errors.company && <small>{errors.company.message}</small>}
        </label>

        <label>
          <span>Job Role *</span>
          <input type="text" placeholder="Frontend Engineer" {...register('role')} />
          {errors.role && <small>{errors.role.message}</small>}
        </label>

        <label>
          <span>Location</span>
          <input type="text" placeholder="Bengaluru, India" {...register('location')} />
          {errors.location && <small>{errors.location.message}</small>}
        </label>

        <label>
          <span>Location Type</span>
          <select {...register('locationType')}>
            {LOCATION_TYPE_OPTIONS.map((locationType) => (
              <option key={locationType} value={locationType}>
                {locationType}
              </option>
            ))}
          </select>
          {errors.locationType && <small>{errors.locationType.message}</small>}
        </label>

        <label>
          <span>Salary (CTC / year)</span>
          <input type="number" min="0" step="1000" placeholder="2200000" {...register('salary')} />
          {errors.salary && <small>{errors.salary.message}</small>}
        </label>

        <label>
          <span>Application Platform</span>
          <select {...register('platform')}>
            {PLATFORM_OPTIONS.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
          {errors.platform && <small>{errors.platform.message}</small>}
        </label>

        <label>
          <span>Status</span>
          <select {...register('status')}>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {errors.status && <small>{errors.status.message}</small>}
        </label>

        <label>
          <span>Applied Date *</span>
          <input type="date" {...register('appliedDate')} />
          {errors.appliedDate && <small>{errors.appliedDate.message}</small>}
        </label>

        <label>
          <span>Interview Date</span>
          <input type="date" {...register('interviewDate')} />
          {errors.interviewDate && <small>{errors.interviewDate.message}</small>}
        </label>
      </section>

      <label className="application-form__notes">
        <span>Notes</span>
        <textarea rows="5" placeholder="Interview rounds, contact details, prep notes..." {...register('notes')} />
        {errors.notes && <small>{errors.notes.message}</small>}
      </label>

      <button className="button button--primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  )
}
