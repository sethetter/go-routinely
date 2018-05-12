import * as moment from 'moment'

export function startOfWeekFromDate (date: Date): Date {
  return moment(date).day('Sunday').startOf('day').toDate()
}

export function weekDaysFromDate (date: Date): Date[] {
  // Subtract one to start so loop can always add one
  const startOfWeek = moment(date).day('Sunday').subtract(1, 'day').startOf('day')
  const weekDays = []

  for (let i = 0; i < 7; i++) {
    weekDays.push(startOfWeek.add(1, 'day').toDate())
  }

  return weekDays
}
