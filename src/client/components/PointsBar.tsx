import * as React from 'react'
import { Progress } from 'reactstrap'

export type PointsBarProps = {
  points: number
  createLog: (params: Partial<ActivityLog>) => void
}

const PointsBar = ({ points, createLog }: PointsBarProps) => {
  const percentToNextReward = (points % 50) * 2
  const barColor =
    percentToNextReward > 70 ? 'success'
    : percentToNextReward > 30 ? 'warning' : 'danger'

  const useReward = () => {
    createLog({ name: 'Reward', value: -50 })
  }

  const rewards = []
  for (var i = 0; i < Math.floor(points / 50); i++) {
    rewards.push(<i className="reward fa fa-trophy" key={i} onClick={useReward}></i>)
  }

  return (
    <div>
      <div className="progress">
        <Progress bar value={percentToNextReward} color={barColor} />
      </div>
      <div className="row">
        <div className="col-10">
          <h1>{rewards}</h1>
        </div>
        <div className="col-2">
          <h4 className="text-right">{points % 50} / 50</h4>
        </div>
      </div>
    </div>
  )
}

export default PointsBar
