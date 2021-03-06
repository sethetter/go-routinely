import * as express from 'express'
import * as moment from 'moment'
import { isEmpty, sum } from 'lodash'

import Activity from '../models/Activity';
import ActivityLog from '../models/ActivityLog';

const router = express.Router()

router.get('/user/me', (req, res) => {
  res.json(req.user)
})

/**
 * Activity Routes
 */
router.get('/activities', async (req, res) => {
  const userId = req.user.id
  const activities = await Activity.find({ userId })
  res.json(activities)
})

router.post('/activities', async (req, res) => {
  const { name, value } = req.body
  const userId = req.user.id

  const params = { name, value, userId }
  const activity = new Activity(params)

  try {
    await activity.save()
  } catch (err) {
    if (err.errors && !isEmpty(err.errors)) {
      return res.status(400).json({ errors: activity.errors })
    }
    throw err
  }

  return res.json(activity)
})

/**
 * Activity Routes
 */
router.get('/logs', async (req, res) => {
  const query: any = { userId: req.user.id }

  if (req.query.week) {
    const weekDay = moment(req.query.week)

    query.completedAt = {
      $gte: weekDay.startOf('week').toDate(),
      $lte: weekDay.endOf('week').toDate(),
    }
  }

  const logs = await ActivityLog.find(query)
  res.json(logs)
})

router.post('/logs', async (req, res) => {
  const { name, value, activityId, completedAt } = req.body
  const userId = req.user.id

  const params = { name, value, activityId, userId, completedAt }
  let activityLog = new ActivityLog(params)

  try {
    activityLog = await activityLog.save()
  } catch (err) {
    if (err.errors && !isEmpty(err.errors)) {
      return res.status(401).json({ errors: activityLog.errors })
    }
    throw err
  }

  return res.json(activityLog)
})

router.get('/points', async (req, res) => {
  const query: any = { userId: req.user.id }
  const logs = await ActivityLog.find(query).select({ value: 1 })
  const points = sum(logs.map(l => l.value))
  return res.json({ points })
})

export default router
