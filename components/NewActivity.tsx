import * as React from 'react'
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from 'reactstrap'

import ActivityForm from './ActivityForm'

export type NewActivityProps = {
  onSubmitNewActivity: (params: Partial<Activity>) => Promise<void>
}

type NewActivityState = {
  modalOpen: boolean
  activity: Partial<Activity>
}

class NewActivity extends React.Component<NewActivityProps, NewActivityState> {
  constructor (args: any) {
    super(args)

    this.state = {
      modalOpen: false,
      activity: { name: '', value: 1 }
    }

    this.toggleModal = this.toggleModal.bind(this)
    this.updateActivity = this.updateActivity.bind(this)
  }

  toggleModal () {
    this.setState({ modalOpen: !this.state.modalOpen })
  }


  updateActivity (activity: Partial<Activity>) {
    this.setState({ activity })
  }

  render () {
    const { onSubmitNewActivity } = this.props

    const submitActivity = () => {
      onSubmitNewActivity(this.state.activity)
      this.toggleModal()
    }

    return (
      <div>
        <button
          type="button"
          className="new-activity btn btn-light"
          onClick={this.toggleModal}>
          Add Activity
        </button>

        <Modal
          isOpen={this.state.modalOpen}
          toggle={this.toggleModal}
        >
          <ModalHeader>
            Create New Activity
          </ModalHeader>
          <ModalBody>
            <ActivityForm
              activity={this.state.activity}
              onModelChange={this.updateActivity}
            />
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-success submit-new-activity"
              onClick={submitActivity}
            >
              Create
            </button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }

}

export default NewActivity
