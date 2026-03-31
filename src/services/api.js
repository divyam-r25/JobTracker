import axios from 'axios'
import { addDays, format, subDays } from 'date-fns'

import {
  FALLBACK_APPLICATIONS,
  LOCATION_TYPE_OPTIONS,
  PLATFORM_OPTIONS,
  STATUS_OPTIONS,
} from '../utils/constants'
import { generateId, normalizeStatus } from '../utils/helpers'

const JOBS_API = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 12000,
})

const LOCATION_POOL = [
  'Bengaluru, India',
  'Hyderabad, India',
  'Pune, India',
  'Remote, India',
  'Gurugram, India',
  'Chennai, India',
  'Noida, India',
  'Mumbai, India',
]

const ROLE_POOL = [
  'Frontend Engineer',
  'Software Engineer',
  'Full Stack Developer',
  'React Developer',
  'UI Engineer',
  'JavaScript Engineer',
  'Product Engineer',
  'SDE-1',
]

function pick(items, index) {
  return items[index % items.length]
}

function inferRole(product, index) {
  if (!product?.category) {
    return pick(ROLE_POOL, index)
  }

  const category = String(product.category).toLowerCase()

  if (category.includes('laptop') || category.includes('tablet')) {
    return 'Frontend Engineer'
  }

  if (category.includes('mobile')) {
    return 'React Native Developer'
  }

  if (category.includes('software') || category.includes('app')) {
    return 'Software Engineer'
  }

  return pick(ROLE_POOL, index)
}

function inferStatus(index) {
  const statusCycle = ['Applied', 'Applied', 'Interview Scheduled', 'Rejected', 'Offer Received']
  return pick(statusCycle, index)
}

function estimateSalary(product, index) {
  const base = Number(product?.price || 100)
  return Math.round(base * 12000 + (index % 5) * 150000)
}

function mapProductToApplication(product, index) {
  const company = product.brand || product.title?.split(' ')[0] || `Company ${index + 1}`
  const status = normalizeStatus(inferStatus(index))
  const appliedDate = subDays(new Date(), (index * 7) % 160)

  const shouldHaveInterviewDate =
    status === 'Interview Scheduled' || status === 'Offer Received' || status === 'Rejected'

  const interviewDate = shouldHaveInterviewDate
    ? addDays(appliedDate, 6 + (index % 14))
    : null

  return {
    id: generateId(),
    company,
    role: inferRole(product, index),
    location: pick(LOCATION_POOL, index),
    locationType: pick(LOCATION_TYPE_OPTIONS, index),
    salary: estimateSalary(product, index),
    platform: pick(PLATFORM_OPTIONS, index),
    status,
    appliedDate: format(appliedDate, 'yyyy-MM-dd'),
    interviewDate: interviewDate ? format(interviewDate, 'yyyy-MM-dd') : '',
    notes: product.description || 'Imported from sample API.',
    bookmarked: index % 6 === 0,
  }
}

export async function fetchMockApplications(limit = 24) {
  const response = await JOBS_API.get('/products', {
    params: {
      limit,
      skip: 0,
    },
  })

  const products = response?.data?.products || []

  if (!products.length) {
    throw new Error('No products returned from DummyJSON')
  }

  return products.map(mapProductToApplication)
}

export function getFallbackApplications() {
  return FALLBACK_APPLICATIONS.map((application, index) => ({
    ...application,
    id: `${application.id}-${index}`,
  }))
}

export { STATUS_OPTIONS }
