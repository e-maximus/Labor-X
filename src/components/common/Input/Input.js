import { Translate } from 'components/common'
import PropTypes from 'prop-types'
import React from 'react'
import { I18n } from 'react-redux-i18n'
import css from './Input.scss'

export default class Input extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    invert: PropTypes.bool,
    disabled: PropTypes.bool,
    input: PropTypes.shape({
      value: PropTypes.string,
      name: PropTypes.string,
    }),
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]),
    }),
    autoComplete: PropTypes.bool,
    mods: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
  }

  static TYPES = {
    TEXT: 'text',
    PASSWORD: 'password',
  }

  static MODS = {
    INVERT: css.invert,
    HUGE: css.huge,
    BOXED: css.boxed,
  }

  static defaultProps = {
    disabled: false,
    input: {
      value: '',
      name: 'input',
    },
    type: Input.TYPES.TEXT,
    meta: {
      touched: false,
      error: null,
    },
    placeholder: '',
    autoComplete: true,
    // TODO @dkchv: add normal as default mod
    mods: [],
  }

  render () {
    const { className, placeholder, type, input, label, meta, disabled, autoComplete, mods } = this.props
    const classNames = [ css.root ].concat(mods)
    className && classNames.push(className)
    meta.touched && meta.error && classNames.push(css.invalid)
    input.autoComplete = autoComplete ? 'on' : 'off'

    return (
      <div className={classNames.join(' ')}>
        {label && <div className={css.label}><Translate value={label} /></div>}
        <input
          className={css.input}
          placeholder={I18n.t(placeholder)}
          type={type}
          disabled={disabled}
          {...input}
        />
        <div className={css.line} />
        {meta.touched && meta.error && <div className={css.error}><Translate value={meta.error} /></div>}
      </div>
    )
  }
}
