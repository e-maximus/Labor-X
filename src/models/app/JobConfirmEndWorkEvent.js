import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  key: PropTypes.string.isRequired,
  jobId: PropTypes.number.isRequired,
  self: PropTypes.string.isRequired,
})

export default class JobConfirmEndWorkEvent extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.assign(this, props)
    Object.freeze(this)
  }
}
