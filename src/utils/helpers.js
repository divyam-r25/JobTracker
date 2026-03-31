import {
  format,
  isValid,
  parseISO,
  startOfMonth,
  subMonths,
  isAfter,
  compareAsc,
  compareDesc,
} from 'date-fns'

import { STATUS_OPTIONS } from './constants'

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `job-${Date.now()}-${Math.floor(Math.random() * 100000)}`
}

export function toDate(value) {
  if (!value) {
    return null
  }

  if (value instanceof Date && isValid(value)) {
    return value
  }

  const parsed = parseISO(String(value))
  return isValid(parsed) ? parsed : null
}

function safeDate(value) {
  return toDate(value) ?? new Date(0)
}

export function formatDate(value, output = 'dd MMM yyyy') {
  const parsed = toDate(value)
  if (!parsed) {
    return '--'
  }

  return format(parsed, output)
}

export function toInputDate(value) {
  const parsed = toDate(value)
  if (!parsed) {
    return ''
  }

  return format(parsed, 'yyyy-MM-dd')
}

export function formatCurrency(amount) {
  if (amount === '' || amount === null || amount === undefined) {
    return '--'
  }

  const numeric = Number(amount)
  if (Number.isNaN(numeric)) {
    return '--'
  }

  return currencyFormatter.format(numeric)
}

export function getSalaryRange(salary) {
  const numeric = Number(salary)
  if (Number.isNaN(numeric) || numeric <= 0) {
    return '--'
  }

  const min = Math.round(numeric * 0.9)
  const max = Math.round(numeric * 1.1)
  return `${formatCurrency(min)} - ${formatCurrency(max)}`
}

export function normalizeStatus(status) {
  const statusMap = {
    applied: 'Applied',
    interviewing: 'Interview Scheduled',
    interview: 'Interview Scheduled',
    rejected: 'Rejected',
    offer: 'Offer Received',
    offered: 'Offer Received',
  }

  if (!status) {
    return 'Applied'
  }

  const lower = String(status).toLowerCase().trim()

  if (statusMap[lower]) {
    return statusMap[lower]
  }

  if (STATUS_OPTIONS.includes(status)) {
    return status
  }

  return 'Applied'
}

export function toCompanyDomain(company) {
  if (!company) {
    return ''
  }

  const cleaned = company
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()

  const firstWord = cleaned.split(/\s+/)[0]
  if (!firstWord) {
    return ''
  }

  return `${firstWord}.com`
}

export function getLogoUrl(company, explicitDomain = '') {
  const domain = explicitDomain || toCompanyDomain(company)
  if (!domain) {
    return ''
  }

  return `https://logo.clearbit.com/${domain}`
}

export function getDummyLogoUrl(company = '') {
  const safeLetter = (company.trim().slice(0, 1) || 'J').toUpperCase()
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='#cffafe'/>
        <stop offset='100%' stop-color='#fef3c7'/>
      </linearGradient>
    </defs>
    <rect width='120' height='120' rx='24' fill='url(#g)'/>
    <text x='50%' y='56%' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='54' font-weight='700' fill='#0f766e'>${safeLetter}</text>
  </svg>`

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export function getStatusTone(status) {
  const normalized = normalizeStatus(status)

  switch (normalized) {
    case 'Applied':
      return 'status-applied'
    case 'Interview Scheduled':
      return 'status-interview'
    case 'Offer Received':
      return 'status-offer'
    case 'Rejected':
      return 'status-rejected'
    default:
      return 'status-applied'
  }
}

export function filterApplications(applications, query, filters, activeTab, showBookmarkedOnly) {
  const safeQuery = query?.trim().toLowerCase() || ''

  return applications.filter((application) => {
    const matchesQuery =
      !safeQuery ||
      application.company.toLowerCase().includes(safeQuery) ||
      application.role.toLowerCase().includes(safeQuery)

    const matchesStatus =
      !filters.status || filters.status === 'All' || application.status === filters.status

    const matchesPlatform =
      !filters.platform ||
      filters.platform === 'All' ||
      application.platform === filters.platform

    const matchesLocationType =
      !filters.locationType ||
      filters.locationType === 'All' ||
      application.locationType === filters.locationType

    const matchesTab = activeTab === 'All' || application.status === activeTab
    const matchesBookmark = !showBookmarkedOnly || application.bookmarked

    return (
      matchesQuery &&
      matchesStatus &&
      matchesPlatform &&
      matchesLocationType &&
      matchesTab &&
      matchesBookmark
    )
  })
}

export function sortApplications(applications, sortBy) {
  const result = [...applications]

  switch (sortBy) {
    case 'appliedDateAsc':
      return result.sort((a, b) => compareAsc(safeDate(a.appliedDate), safeDate(b.appliedDate)))
    case 'salaryDesc':
      return result.sort((a, b) => Number(b.salary) - Number(a.salary))
    case 'salaryAsc':
      return result.sort((a, b) => Number(a.salary) - Number(b.salary))
    case 'companyAsc':
      return result.sort((a, b) => a.company.localeCompare(b.company))
    case 'companyDesc':
      return result.sort((a, b) => b.company.localeCompare(a.company))
    case 'appliedDateDesc':
    default:
      return result.sort((a, b) => compareDesc(safeDate(a.appliedDate), safeDate(b.appliedDate)))
  }
}

export function getPipelineCounts(applications) {
  return STATUS_OPTIONS.reduce(
    (acc, status) => {
      acc[status] = applications.filter((item) => item.status === status).length
      return acc
    },
    { All: applications.length },
  )
}

export function getAnalytics(applications) {
  const totalApplications = applications.length
  const interviewsScheduled = applications.filter(
    (application) => application.status === 'Interview Scheduled',
  ).length
  const offersReceived = applications.filter(
    (application) => application.status === 'Offer Received',
  ).length
  const rejected = applications.filter((application) => application.status === 'Rejected').length
  const bookmarked = applications.filter((application) => application.bookmarked).length

  const statusDistribution = STATUS_OPTIONS.map((status) => ({
    name: status,
    value: applications.filter((application) => application.status === status).length,
  }))

  const monthlyMap = new Map()

  for (let i = 5; i >= 0; i -= 1) {
    const monthDate = startOfMonth(subMonths(new Date(), i))
    const key = format(monthDate, 'MMM yyyy')
    monthlyMap.set(key, 0)
  }

  applications.forEach((application) => {
    const parsed = toDate(application.appliedDate)
    if (!parsed) {
      return
    }

    const key = format(startOfMonth(parsed), 'MMM yyyy')
    if (monthlyMap.has(key)) {
      monthlyMap.set(key, monthlyMap.get(key) + 1)
    }
  })

  const monthlyApplications = Array.from(monthlyMap.entries()).map(([month, count]) => ({
    month,
    applications: count,
  }))

  return {
    totalApplications,
    interviewsScheduled,
    offersReceived,
    rejected,
    bookmarked,
    statusDistribution,
    monthlyApplications,
  }
}

export function getUpcomingInterviews(applications) {
  const now = new Date()

  return applications
    .filter((application) => application.interviewDate)
    .filter((application) => {
      const interviewDate = toDate(application.interviewDate)
      return interviewDate && isAfter(interviewDate, now)
    })
    .sort((a, b) => compareAsc(safeDate(a.interviewDate), safeDate(b.interviewDate)))
}

export function getRecentApplications(applications, limit = 5) {
  return [...applications]
    .sort((a, b) => compareDesc(safeDate(a.appliedDate), safeDate(b.appliedDate)))
    .slice(0, limit)
}

export function getFormValuesFromApplication(application) {
  if (!application) {
    return null
  }

  return {
    company: application.company || '',
    role: application.role || '',
    location: application.location || '',
    locationType: application.locationType || 'Remote',
    salary: application.salary ? String(application.salary) : '',
    platform: application.platform || 'LinkedIn',
    status: application.status || 'Applied',
    appliedDate: toInputDate(application.appliedDate),
    interviewDate: toInputDate(application.interviewDate),
    notes: application.notes || '',
  }
}

export function toApplicationPayload(data) {
  return {
    ...data,
    salary: Number(data.salary),
    appliedDate: data.appliedDate,
    interviewDate: data.interviewDate || '',
    notes: data.notes?.trim() || '',
  }
}
