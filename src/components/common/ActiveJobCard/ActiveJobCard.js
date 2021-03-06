import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import cn from 'classnames'
import { Link, Image, Button } from 'src/components/common'
import { JobModel, BoardModel, ProfileModel, JobNoticeModel, NOTICE_TYPE_PROBLEM, NOTICE_TYPE_MESSAGE, JOB_STATE_FINISHED } from 'src/models'

import css from './ActiveJobCard.scss'

const dateFormat = 'h:mm A'

export default class ActiveJobCard extends React.Component {
  static propTypes = {
    job: PropTypes.instanceOf(JobModel).isRequired,
    board: PropTypes.instanceOf(BoardModel),
    notice: PropTypes.instanceOf(JobNoticeModel),
    worker: PropTypes.instanceOf(ProfileModel),
    recruiter: PropTypes.instanceOf(ProfileModel),
    onClickReview: PropTypes.func,
  }

  constructor (...args) {
    super(...args)
    this.handleReview = this.handleReview.bind(this)
  }

  handleReview () {
    this.props.onClickReview(this.props.job, this.props.worker)
  }

  handleMessage () {
    // eslint-disable-next-line no-console
    console.log('ActionJobCard-handleMessage')
  }

  render () {
    const { job, worker, recruiter/*, board*/, notice } = this.props

    return (
      <div
        className={cn(css.root, {
          'applied': true,
          [css.approved]: true,
          [css.inProgress]: true,
          [css.attention]: notice && notice.type === NOTICE_TYPE_MESSAGE,
          [css.problem]: notice && notice.type === NOTICE_TYPE_PROBLEM,
        })}
      >
        <div className={css.rowInfo}>
          <h4>{moment(job.extra.startedAt).format(dateFormat)}</h4>
          <h4 className={css.medium}>{ job.ipfs.name }</h4>
          {!(job.ipfs.budget.isSpecified && job.ipfs.budget.award) ? null : (
            <div className={css.jobAwardRow}>
              <p>{job.ipfs.budget.award.dividedBy(3).toFixed(2)} / LHUS {job.ipfs.budget.award.toFixed(2)}</p>
              <p>{job.ipfs.budget.award.dividedBy(3).multipliedBy(30).toFixed(2)} / USD {job.ipfs.budget.award.multipliedBy(30).toFixed(2)}</p>
            </div>
          )}
        </div>
        <div>
          {!worker ? null : (
            <div className={css.iconAndName}>
              <img className={css.icon} src={worker.ipfs.logo} alt={worker.ipfs.name} />
              <Link className={css.link} href='/worker-profile'><p>{worker.ipfs.name} (Worker)</p></Link>
            </div>
          )}
          {!recruiter ? null : (
            <div className={css.iconAndName}>
              <img className={css.icon} src={recruiter.ipfs.logo} alt={recruiter.ipfs.name} />
              <Link className={css.link} href='/recruiter-profile'><p>{recruiter.ipfs.name} (Recruiter)</p></Link>
            </div>
          )}
          {job.state === JOB_STATE_FINISHED && <Button
            label='REVIEW'
            className={css.review}
            mods={Button.MODS.FLAT}
            onClick={this.handleReview}
          />}
          {job.state === JOB_STATE_FINISHED && <Image
            clickable
            className={css.actionButton}
            title='Message'
            icon={Image.ICONS.MESSAGE}
            onClick={this.handleMessage}
          />}
        </div>
      </div>
    )
  }
}
