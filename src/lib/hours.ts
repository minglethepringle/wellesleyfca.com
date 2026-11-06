import { officeHours } from '../data/site'

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

const toLabel = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  const suffix = h >= 12 ? 'pm' : 'am'
  const hour = h % 12 || 12
  return `${hour}:${String(m).padStart(2, '0')}${suffix}`
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/** Current day/time at the practice, regardless of where the visitor is. */
function nowInNeedham(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) }
}

export type OpenStatus = { open: boolean; label: string }

export function getOpenStatus(date = new Date()): OpenStatus {
  const { day, minutes } = nowInNeedham(date)
  const today = officeHours[day]

  if (today && minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
    return { open: true, label: `Open today until ${toLabel(today.close)}` }
  }
  if (today && minutes < toMinutes(today.open)) {
    return { open: false, label: `Opens today at ${toLabel(today.open)}` }
  }
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7
    const next = officeHours[d]
    if (next) {
      const when = i === 1 ? 'tomorrow' : DAY_NAMES[d]
      return { open: false, label: `Closed now · Opens ${when} at ${toLabel(next.open)}` }
    }
  }
  return { open: false, label: 'Closed now' }
}
