const routes = module.exports = require('next-routes')()

routes
  .add('landing-page', '/', 'landing-page')
  .add('opportunity-view', '/opportunity-view/:id', 'opportunity-view')
  .add('review-applicants', '/review-applicants/:id', 'review-applicants')
  .add('worker-profile', '/worker-profile/:id', 'worker-profile')
  .add('client-job-view', '/client-job-view/:id', 'client-job-view')
  // .add('about')
  // Examples:
  // .add('blog', '/blog/:slug')
  // .add('user', '/user/:id', 'profile')
  // .add('/:noname/:lang(en|es)/:wow+', 'complex')
  // .add({name: 'beta', pattern: '/v3', page: 'v3'})
