// Monthly newsletters sent through Constant Contact.
// To publish a new issue, add it to the TOP of this list with its conta.cc link.
// The home page shows the newest few automatically.

export type Newsletter = {
  month: string // "YYYY-MM"
  title: string
  summary: string
  url: string
}

export const newsletters: Newsletter[] = [
  {
    month: '2026-10',
    title: 'Monthly Dose of Practice News',
    summary:
      "Welcoming WFCA's newest NP, Breast Cancer Awareness, final chances for flu clinics, and WFCA in the community!",
    url: 'https://conta.cc/4AFBrOq',
  },
  {
    month: '2026-09',
    title: 'Falling Into September at WFCA',
    summary:
      'Holiday hours, accepting patients, healthy aging month, first time aesthetics offers, dealing with fall allergies and preparing for flu season with our vaccine clinics.',
    url: 'https://conta.cc/4ycI2hd',
  },
  {
    month: '2026-08',
    title: 'Late Summer Practice Updates',
    summary:
      'A welcome to our newest provider, seasonal health reminders, back-to-school tips, and services and programs designed to support your family.',
    url: 'https://conta.cc/4pIphiy',
  },
]

export function formatIssueMonth(month: string) {
  const [y, m] = month.split('-').map(Number)
  return new Date(y, m - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}
