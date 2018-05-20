import ReportsAndClaimsContent from 'components/ReportsAndClaims/ReportsAndClaims'
import { MainLayout } from 'components/layouts'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import 'styles/globals/globals.scss'
import initialStore from 'store'

class ReportsAndClaims extends React.Component {
  render () {
    return (
      <MainLayout title='nav.reportsAndClaims'>
        <ReportsAndClaimsContent />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(ReportsAndClaims)
