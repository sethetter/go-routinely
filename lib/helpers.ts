import * as moment from 'moment'
import { reduce } from 'lodash'

export function entityArray<T extends Entity> (entity: EntityStore<T>): T[] {
  return entity.allIds.map(id => entity.byId[id])
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

export function toEntityStore<T extends Entity> (items: T[]): EntityStore<T> {
  return {
    byId: reduce(items, (o, i) => Object.assign(o, { [i.id]: i }), {}),
    allIds: items.map(i => i.id)
  }
}
