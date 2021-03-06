import { storeIntoIPFS } from 'src/utils'
import {
  JobModel,
  JobConfirmEndWorkEvent,
  JobPostedEvent,
  JobPausedEvent,
  JobResumedEvent,
  JobCanceledEvent,
  JobFormModel,
  JobOfferFormModel,
  SkillModel,
} from 'src/models'
import { daoByType } from '../daos/selectors'
import { signerSelector } from '../wallet/selectors'
import { executeTransaction } from '../ethereum/actions'
import { web3Selector } from '../ethereum/selectors'

export const JOBS_CLEAR = 'jobs/clear'
export const JOBS_SAVE = 'jobs/save'
export const JOBS_CLIENT_SAVE = 'jobs/client_save'
export const JOBS_WORKER_SAVE = 'jobs/worker_save'
export const JOBS_FILTER = 'jobs/filter'

export const refreshJob = (jobId: Number) => async (dispatch, getState) => {
  // eslint-disable-next-line no-console
  console.log('refreshJob: ', jobId)
  const state = getState()
  const jobsDataProviderDAO = daoByType('JobsDataProvider')(state)
  const boardControlerDAO = daoByType('BoardController')(state)
  const job = await jobsDataProviderDAO.getJobById(boardControlerDAO, jobId)
  dispatch({
    type: JOBS_WORKER_SAVE,
    jobList: [ job ],
  })
  return job
}

// Should be called only once
export const initJobs = () => async (dispatch, getState) => {
  const state = getState()
  daoByType('JobController')(state)
    .on('JobPosted', ({ event }) => dispatch(handleJobPosted(event)))
    .on('JobCanceled', ({ event }) => dispatch(handleJobCanceled(event)))
    .on('JobPaused', ({ event }) => dispatch(handleJobPaused(event)))
    .on('JobResumed', ({ event }) => dispatch(handleJobResumed(event)))
    .on('JobConfirmEndWork', ({ event }) => dispatch(handleJobConfirmEndWork(event)))
    .on('JobCanceled', ({ event }) => dispatch(handleJobCanceled(event)))
  await dispatch(reloadJobs())
}

export const reloadJobs = () => async (dispatch, getState) => {

  const state = getState()

  const boardControlerDAO = daoByType('BoardController')(state)
  const JobDataProviderDAO = daoByType('JobsDataProvider')(state)
  dispatch({ type: JOBS_CLEAR })

  const jobs = await JobDataProviderDAO.getJobs(boardControlerDAO)
  dispatch({ type: JOBS_SAVE, jobList: jobs })

  // if (user.accountTypes.worker) { // @todo return when getJobs methods will accept filter by all entries thought bit masks
  //   const jobs = await JobDataProviderDAO.getJobsForWorker(signer.address)
  //   dispatch({ type: JOBS_WORKER_SAVE, jobList: jobs })
  // }
  //
  // if (user.accountTypes.client) {
  //   const jobs = await JobDataProviderDAO.getJobsForClient(signer.address)
  //   dispatch({ type: JOBS_CLIENT_SAVE, jobList: jobs })
  // }

}

export const handleJobPaused = (e: JobPausedEvent) => async (dispatch, getState) => {
  // eslint-disable-next-line no-console
  console.log('handleJobPaused', e)
  const state = getState()
  const jobsDataProviderDAO = daoByType('JobsDataProvider')(state)
  const boardControlerDAO = daoByType('BoardController')(state)
  const job = await jobsDataProviderDAO.getJobById(boardControlerDAO, e.jobId)
  dispatch({
    type: JOBS_WORKER_SAVE,
    jobList: [ job ],
  })
  return job
}

export const handleJobResumed = (e: JobResumedEvent) => async (dispatch) => {
  // eslint-disable-next-line no-console
  console.log('handleJobPaused', e)
  dispatch(refreshJob(e.jobId))
}

export const handleJobPosted = (e: JobPostedEvent) => async (dispatch): JobModel => {
  // eslint-disable-next-line no-console
  console.log('jobs/handleJobPosted', e)
  dispatch(refreshJob(e.jobId))
}

export const handleJobCanceled = (e: JobCanceledEvent) => async (dispatch) => {
  // eslint-disable-next-line no-console
  console.log('jobs/handleJobCanceled', e)
  dispatch(refreshJob(e.jobId))
}

export const handleJobConfirmEndWork = (e: JobConfirmEndWorkEvent) => async (dispatch) => {
  // eslint-disable-next-line no-console
  console.log('jobs/handleJobConfirmEndWork', e)
  dispatch(refreshJob(e.jobId))
}

export const resumeJobWork = (jobId: Number) => async (dispatch, getState) => {
  const state = getState()
  const jobControllerDAO = daoByType('JobController')(state)
  const signer = signerSelector()(state)
  const web3 = web3Selector()(state)

  const tx = jobControllerDAO.createResumeJobWorkTx(
    signer.address,
    jobId
  )
  await dispatch(executeTransaction({ tx, web3 }))
}

export const pauseJobWork = (jobId: Number) => async (dispatch, getState) => {
  const state = getState()
  const jobControllerDAO = daoByType('JobController')(state)
  const signer = signerSelector()(state)
  const web3 = web3Selector()(state)

  const tx = jobControllerDAO.createPauseJobWorkTx(
    signer.address,
    jobId
  )
  await dispatch(executeTransaction({ tx, web3 }))
}

export const confirmEndWork = (jobId: Number) => async (dispatch, getState) => {
  const state = getState()
  const jobsController = daoByType('JobController')(state)
  const signer = signerSelector()(state)
  await jobsController.confirmEndWork(signer.address, jobId)
}

export const cancelJob = (jobId: Number) => async (dispatch, getState) => {
  const state = getState()
  const jobsController = daoByType('JobController')(state)
  const signer = signerSelector()(state)
  await jobsController.cancelJob(signer.address, jobId)
}

export const createJob = (form: JobFormModel) => async (dispatch, getState) => {
  // eslint-disable-next-line no-console
  console.log('[jobs] createJob from values', form)
  const state = getState()
  const jobControllerDAO = daoByType('JobController')(state)
  const signer = signerSelector()(state)
  const web3 = web3Selector()(state)

  const detailsIPFSHash = await storeIntoIPFS(form.ipfs)

  const tx = jobControllerDAO.createPostJobTx(
    signer.address,
    1, // flowType enum { TM = 1, FIXED_PRICE = 2 }
    form.area.code,
    form.category.code,
    SkillModel.writeArrayToMask(form.skills),
    0, // defaultPay todo check what this parameter is for and mark up field on create job form
    detailsIPFSHash
  )
  await dispatch(executeTransaction({ tx, web3, signer }))
}

export const createJobOffer = (form: JobOfferFormModel) => async (dispatch, getState) => {
  // eslint-disable-next-line no-console
  console.log('[jobs] createJobOffer from values', form)
  const state = getState()
  const jobControllerDAO = daoByType('JobController')(state)
  const signer = signerSelector()(state)
  const web3 = web3Selector()(state)

  const tx = jobControllerDAO.createPostJobOfferTx(
    signer.address,
    form.jobId,
    form.rate,
    form.estimate,
    form.ontop
  )
  await dispatch(executeTransaction({ tx, web3, signer }))
}

export const updateFilterJobs = (filterFields) => (dispatch, getState) => {
  const state = getState()

  const { list } = state.jobs

  let { searchText } = filterFields
  let currentList = [...list] || []

  if (searchText){
    searchText = String(searchText).toLowerCase()
    currentList = currentList.filter((job) => (String(job.ipfs.name || '').toLowerCase().includes(searchText)))
  }

  dispatch({
    type: JOBS_FILTER,
    jobsList: currentList,
  })
}
