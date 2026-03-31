export const LOCAL_STORAGE_KEY = 'jobtrack:applications:v1'

export const STATUS_OPTIONS = [
  'Applied',
  'Interview Scheduled',
  'Offer Received',
  'Rejected',
]

export const PIPELINE_TABS = ['All', ...STATUS_OPTIONS]

export const PLATFORM_OPTIONS = [
  'LinkedIn',
  'Company Career Page',
  'Referral',
  'Indeed',
  'Naukri',
  'Wellfound',
]

export const LOCATION_TYPE_OPTIONS = ['Remote', 'Hybrid', 'On-site']

export const SORT_OPTIONS = [
  { value: 'appliedDateDesc', label: 'Applied Date (Newest)' },
  { value: 'appliedDateAsc', label: 'Applied Date (Oldest)' },
  { value: 'salaryDesc', label: 'Salary (High to Low)' },
  { value: 'salaryAsc', label: 'Salary (Low to High)' },
  { value: 'companyAsc', label: 'Company (A-Z)' },
  { value: 'companyDesc', label: 'Company (Z-A)' },
]

export const DEFAULT_FILTERS = {
  status: 'All',
  platform: 'All',
  locationType: 'All',
}

export const DEFAULT_FORM_VALUES = {
  company: '',
  role: '',
  location: '',
  locationType: 'Remote',
  salary: '',
  platform: 'LinkedIn',
  status: 'Applied',
  appliedDate: '',
  interviewDate: '',
  notes: '',
}

export const FALLBACK_APPLICATIONS = [
  {
    id: 'seed-1',
    company: 'Google',
    role: 'Frontend Engineer',
    location: 'Bengaluru, India',
    locationType: 'Hybrid',
    salary: 2800000,
    platform: 'LinkedIn',
    status: 'Interview Scheduled',
    appliedDate: '2026-03-05',
    interviewDate: '2026-04-03',
    notes: 'Round 2 with the product engineering team.',
    bookmarked: true,
  },
  {
    id: 'seed-2',
    company: 'Amazon',
    role: 'Software Development Engineer',
    location: 'Hyderabad, India',
    locationType: 'On-site',
    salary: 3200000,
    platform: 'Referral',
    status: 'Applied',
    appliedDate: '2026-03-18',
    interviewDate: '',
    notes: 'Referred by former teammate.',
    bookmarked: false,
  },
  {
    id: 'seed-3',
    company: 'Atlassian',
    role: 'UI Engineer',
    location: 'Remote, India',
    locationType: 'Remote',
    salary: 2600000,
    platform: 'Company Career Page',
    status: 'Offer Received',
    appliedDate: '2026-02-21',
    interviewDate: '2026-03-08',
    notes: 'Offer in final negotiation stage.',
    bookmarked: true,
  },
  {
    id: 'seed-4',
    company: 'Adobe',
    role: 'React Developer',
    location: 'Noida, India',
    locationType: 'Hybrid',
    salary: 2400000,
    platform: 'Naukri',
    status: 'Rejected',
    appliedDate: '2026-01-30',
    interviewDate: '2026-02-15',
    notes: 'Rejected after technical interview.',
    bookmarked: false,
  },
]
