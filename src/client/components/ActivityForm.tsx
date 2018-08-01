import * as React from 'react'

type ActivityFormProps = {
  activity: Partial<Activity>
  onModelChange: (activity: Partial<Activity>) => any
}

const ActivityForm = ({ activity, onModelChange }: ActivityFormProps) => {
  const onFieldChange = (name: string) => (event: React.FormEvent<HTMLInputElement>) =>
    onModelChange({ ...activity, [name]: event.currentTarget.value })

  return (
    <div className="row">
      <div className="form-group col-9">
        <label htmlFor="activity.name">Name</label>
        <input
          type="text"
          className="form-control"
          name="activity.name"
          value={activity.name}
          onChange={onFieldChange('name')}
        />
      </div>
      <div className="form-group col-3">
        <label htmlFor="activity.value">Value</label>
        <input
          type="number"
          className="form-control"
          name="activity.value"
          value={activity.value}
          onChange={onFieldChange('value')}
        />
      </div>
    </div>
  )
}

export default ActivityForm
