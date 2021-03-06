import React from 'react'
import uniqid from 'uniqid'
import { Button, Translate, Input } from 'components/common'
import css from './SecurityTab.scss'

export default class NotificationsTab extends React.Component {
  render () {
    const activities = [
      {
        activity: 'Login',
        date: '12 Feb 2018 13:30',
        country: 'Russian Federation',
        ip: '255.255.255.0 Mozilla (X11; Linux X86)',
      },
    ]

    return (
      <div>
        <div className={css.card}>
          <img
            className={css.twofaImage}
            src='/static/images/svg/2fa.svg'
            alt=''
          />
          <div>
            <div className={css.header}><Translate value='ui.myProfile.security.twoFactorAuthentication' /></div>
            <div className={css.twofaDesc}><Translate value='ui.myProfile.security.twoFactorAuthenticationDesc' /></div>
            <div
              className={css.badges}
            >
              <img
                src='/static/images/svg/googleplay.svg'
                alt=''
              />
              <img
                src='/static/images/svg/appstore.svg'
                alt=''
              />
            </div>
            <Button
              className={css.proceedButton}
              label='terms.proceed'
              color={Button.COLORS.PRIMARY}
            />
          </div>
        </div>
        <div className={css.card}>
          <i
            className={[css.iconImage, 'material-icons'].join(' ')}
          >security
          </i>
          <div>
            <div className={css.header}><Translate value='ui.myProfile.security.resetPassword' /></div>
            <div className={css.passwords}>
              <Input
                type={Input.TYPES.PASSWORD}
                placeholder='ui.myProfile.security.oldPassword'
              />
              <Input
                type={Input.TYPES.PASSWORD}
                placeholder='ui.myProfile.security.newPassword'
              />
              <Input
                type={Input.TYPES.PASSWORD}
                placeholder='ui.myProfile.security.confirmNewPassword'
              />
            </div>
            <Button
              className={css.proceedButton}
              label='terms.proceed'
              color={Button.COLORS.PRIMARY}
            />
          </div>
        </div>
        <div className={css.card}>
          <i
            className={[css.iconImage, 'material-icons'].join(' ')}
          >security
          </i>
          <div>
            <div className={css.header}><Translate value='ui.myProfile.security.activityLog' /></div>
            <table>
              <thead>
                <tr>
                  <th align='left'><Translate value='ui.myProfile.security.activity.activity' /></th>
                  <th align='left'><Translate value='ui.myProfile.security.activity.date' /></th>
                  <th align='left'><Translate value='ui.myProfile.security.activity.country' /></th>
                  <th align='left'><Translate value='ui.myProfile.security.activity.ip' /></th>
                </tr>
              </thead>
              <tbody>
                {activities.map( (activity) => (
                  <tr key={uniqid()} >
                    <td align='left'>{activity.activity}</td>
                    <td>{activity.date}</td>
                    <td>{activity.country}</td>
                    <td>{activity.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
