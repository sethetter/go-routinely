import * as moment from 'moment'

export function startOfWeekFromDate (date: Date): Date {
  return moment(middleOfDay(date)).day('Sunday').toDate()
}

export function weekDaysFromDate (date: Date): Date[] {
  // Subtract one to start so loop can always add one
  const startOfWeek = moment(middleOfDay(date)).subtract(1, 'day')
  const weekDays = []

  for (let i = 0; i < 7; i++) {
    weekDays.push(startOfWeek.add(1, 'day').toDate())
  }

  return weekDays
}

export function middleOfDay (date: Date): Date {
  return moment.utc(date).startOf('day').add(12, 'hours').toDate()
}
