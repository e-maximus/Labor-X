import { Link, Carousel, ParallaxBox } from 'components/common'
import ReactDOM from 'react-dom'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'

import initialStore, { hideCookiesNotice, getCookiesNoticeValue } from 'store'
import { bootstrap } from 'store/bootstrap'
import 'styles/globals/globals.scss'
import css from './index.scss'

class Index extends React.Component {
  static propTypes = {
    hideCookiesNotice: PropTypes.func,
    getCookiesNoticeValue: PropTypes.func,
    isHideCookiesNotice: PropTypes.bool,
  }
  
  static defaultProps = {
    hideCookiesNotice: () => {},
    getCookiesNoticeValue: () => {},
    isHideCookiesNotice: true,
  }
  
  static getInitialProps ({ store }) {
    store.dispatch(bootstrap())
  }
  
  constructor (){
    super()
    
    this.state = {
      activeIndex: 0,
      isVisibleNavBottom: true,
    }
  }
  
  componentDidMount (){
    this.props.getCookiesNoticeValue()
    this.learnMoreVisibility()
    window.addEventListener('scroll', this.learnMoreVisibility.bind(this))
  }
  
  getCookiesNoticeWidget (){
    return (
      <div className={[css.cookiesNotice].join(' ')}>
        <img className={css.cookiesNoticeImg} src='/static/images/laborx-promo-info.svg' alt='' />
        We use cookies to improve our user's experience. Read our <Link href='#'>cookies policies</Link> to learn more or change settings.
        <button className={css.noticeClose} onClick={this.props.hideCookiesNotice.bind(this)}>X</button>
      </div>
    )
  }
  
  goToNextSlide (){
    this.setState({ activeIndex: this.state.activeIndex })
  }
  
  learnMoreVisibility (){
    let carousel = ReactDOM.findDOMNode(this.refs.carousel)
    let rect = carousel.getBoundingClientRect()
    if (rect.top + rect.height < 0){
      this.setState({ isVisibleNavBottom: false })
    } else {
      this.setState({ isVisibleNavBottom: true })
    }
  }
  
  render () {
    return (
      <div className={[css.root, this.props.isHideCookiesNotice ? '' : css.rootCookiesNoticeVisible].join(' ')}>
        <Head>
          <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width' />
        </Head>
        <div className={css.fixedPanel}>
          { this.getCookiesNoticeWidget() }
          <div className={css.navigationPanel}>
            <div className={css.createButtonWrapper} >
              <Link href='/' className={css.createButton}>
                New account
              </Link>
            </div>
            <div className={css.loginButtonWrapper}>
              <Link href='/login-options' className={css.loginButton}>
                Login
              </Link>
            </div>
          </div>
        </div>
        <div className={css.sliderContainer}>
          <div className={css.logo}>
            <Link className={css.topLink} href='/'>
              <img src='/static/images/laborx-promo-head.jpg' className={css.logoImg} alt='' />
            </Link>
          </div>
          <Carousel
            ref='carousel'
            content={[
              { link: '/', imgSrc: '/static/images/laborx-promo-slider-01_together-tobetter-future.jpg' },
              { link: '/', imgSrc: '/static/images/laborx-promo-slider-02_work.jpg' },
              { link: '/', imgSrc: '/static/images/laborx-promo-slider-03_labor-hour.jpg' },
            ]}
          />
        </div>
        <div className={css.benefitsBlock}>
          <h1 className={css.benefitsHeader}>Our Network Benefits</h1>
          <p className={css.benefitsText}>
            We took the most secure technology
            and have built this global, autonomous and versatile platform.
          </p>
          <p className={css.benefitsText}>
            We aim to make short-term employment as accessible and rewardingas long-term employment.
          </p>
        </div>
        <div className={css.advantageBlockWrapper}>
          <ParallaxBox imgSrc='/static/images/laborx-promo-woman-watching-time-1.jpg' deflectionPercent={3}>
            <div className={[css.advantageCounts, css.advantageCountsWoman].join(' ')}>
              <div className={css.advantageCountsInner}>
                <div className={css.advantageCountBlock}>
                  <div className={css.advantageCountBlockHeader}>
                      1,250 Recruiters
                  </div>
                  <div className={css.advantageCountBlockText}>
                      are already using LaborX
                  </div>
                </div>
                <div className={css.advantageCountBlock}>
                  <div className={css.advantageCountBlockHeader}>
                      USD 50,945
                  </div>
                  <div className={css.advantageCountBlockText}>
                      earned by Recruiters in September 2018
                  </div>
                </div>
              </div>
            </div>
            <div className={[css.advantageContent, css.advantageContentWoman].join(' ')}>
              <div className={css.advantageContentInner}>
                <div className={css.advantageTitle}>
                  <span className={css.advantageTitleFirstWord}>for</span>
                  Recruiters
                </div>
                <div className={css.advantageContentBlock}>
                  <div className={css.advantageContentBlockTitle}>
                    Earn
                  </div>
                  <div className={css.advantageContentBlockText}>
                    Create and manage your Job Boards and get paid for your work.
                  </div>
                  <div className={css.advantageContentBlockTitle}>
                    Save Time
                  </div>
                  <div className={css.advantageContentBlockText}>
                    Our smart automated technologies will save your time removing
                    big portion of paperwork and routines.
                  </div>
                  <div className={css.advantageContentBlockTitle}>
                    Trust
                  </div>
                  <div className={css.advantageContentBlockText}>
                    Get access to our reliable database of Workers and Clients
                    verified by out professional team. LaborX is using an innovative
                    technology and guarantees reliable contacts reputation.
                  </div>
    
                </div>
              </div>
            </div>
            
          </ParallaxBox>
        </div>
        <div className={css.advantageBlockWrapper}>
          <ParallaxBox imgSrc='/static/images/laborx-promo-hero-2.jpg' deflectionPercent={3}>
            <div className={[css.advantageCounts, css.advantageCountsWorkers].join(' ')}>
              <div className={css.advantageCountsInner}>
                <div className={css.advantageCountBlock}>
                  <div className={css.advantageCountBlockHeader}>
                  USD 8,000
                  </div>
                  <div className={css.advantageCountBlockText}>
                  Earned by Workers in past 24h
                  </div>
                </div>
                <div className={css.advantageCountBlock}>
                  <div className={css.advantageCountBlockHeader}>
                  5,001 Clients
                  </div>
                  <div className={css.advantageCountBlockText}>
                  posted their jobs
      
                  </div>
                </div>
              </div>
            </div>
            <div className={[css.advantageContent, css.advantageContentWorkers].join(' ')}>
              <div className={css.advantageContentInner}>
                <div className={css.advantageTitle}>
                  <span className={css.advantageTitleFirstWord}>for</span>
                  Workers
                </div>
                <div className={css.advantageContentBlock}>
                  <div className={css.advantageContentBlockTitle}>
                    Payment
                  </div>
                  <div className={css.advantageContentBlockText}>
                    Our automated digital contracts guarantees real-time payment.
                    Your high skills, responsibility and rating can demand higher
                    hourly fee.
                  </div>
                  <div className={css.advantageContentBlockTitle}>
                    Inflation Resistance
                  </div>
                  <div className={css.advantageContentBlockText}>
                    Our LaborHour digital currency is linked to 1 hour average
                    learning in your location which keeps the currency stable.
                  </div>
                  <div className={css.advantageContentBlockTitle}>
                    Scheduling
                  </div>
                  <div className={css.advantageContentBlockText}>
                    LaborX is a fully automated solution with ability to track you
                    time, view reports and plan your schedule.
                  </div>
      
                </div>
              </div>
            </div>
          </ParallaxBox>

        </div>
        <div className={[css.advantageBlockWrapper, css.advantageBlockWrapperLast].join(' ')}>
          <ParallaxBox imgSrc='/static/images/laborx-promo-client-3.jpg' deflectionPercent={3}>
            <div className={[css.advantageCounts, css.advantageCountsClients].join(' ')}>
              <div className={css.advantageCountsInner}>
                <div className={css.advantageCountBlock}>
                  <div className={css.advantageCountBlockHeader}>
                    10,250 Workers
                  </div>
                  <div className={css.advantageCountBlockText}>
                    are already using LaborX
                  </div>
                </div>
                <div className={css.advantageCountBlock}>
                  <div className={css.advantageCountBlockHeader}>
                    1,450 Jobs
                  </div>
                  <div className={css.advantageCountBlockText}>
                    had been done in September 2018
                  </div>
                </div>
              </div>
            </div>
            
            <div className={[css.advantageContent, css.advantageContentClients].join(' ')}>
              <div className={css.advantageContentInner}>
                <div className={css.advantageTitle}>
                  <span className={css.advantageTitleFirstWord}>for</span>
                  Clients
                </div>
                <div className={css.advantageContentBlock}>
                  <div className={css.advantageContentBlockTitle}>
                    Spend Less
                  </div>
                  <div className={css.advantageContentBlockText}>
                    Our solution allows us to reduce recruitment fees compared with
                    traditional recruitment industry.
                  </div>
                  <div className={css.advantageContentBlockTitle}>
                    Get Your Job Done
                  </div>
                  <div className={css.advantageContentBlockText}>
                    Public Worker Rating System is reliable and contains real people
                    profiles, histories and ratings which make your choice easier.
                  </div>
                  <div className={css.advantageContentBlockTitle}>
                    Access Immediate
                  </div>
                  <div className={css.advantageContentBlockText}>
                    Our solution is fast, reliable, secure, and permanently available.
                    The ability to pay with a variety of digital tokens makes the
                    system universal and not tied to any particular country or region.
                  </div>
      
                </div>
              </div>
            </div>
          </ParallaxBox>
        </div>
        <div className={css.footer}>
          <Link href='/' className={css.footerLogo}>
            <img src='/static/images/labor-x-logo.svg' alt='' />
          </Link>
          <ul className={css.footerMenu}>
            <li><Link href='/'>LaborX Whitepaper</Link></li>
            <li><Link href='/'>Chronobank Whitepaper</Link></li>
            <li><Link href='/'>Q&A</Link></li>
            <li><Link href='/'>Privacy Policy</Link></li>
            <li><Link href='/'>Terms of Use</Link></li>
          </ul>
          <div className={css.footerCopyright}>© 2018 LaborX</div>
        </div>
        <div className={[css.navigationBottom, this.state.isVisibleNavBottom ? '' : css.navigationBottomHide].join(' ')}>
          <div className={css.bottomButtonBackground} />
          <div className={css.bottomButtonWrapper}>
            <Link href='#' className={css.bottomButton}>Learn More</Link>
          </div>
          <div className={css.bottomLine} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isHideCookiesNotice: state.landing.isHideCookiesNotice,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideCookiesNotice: () => dispatch(hideCookiesNotice()),
    getCookiesNoticeValue: () => dispatch(getCookiesNoticeValue()),
  }
}

export default withRedux(initialStore, mapStateToProps, mapDispatchToProps)(Index)