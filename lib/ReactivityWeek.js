import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DateTime, Duration } from 'luxon'
import { isNil, times } from 'ramda'

import { ReactivityTile } from './ReactivityTile'

export class ReactivityWeek extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    max: PropTypes.number.isRequired,
    maxColor: PropTypes.string.isRequired,
    min: PropTypes.number.isRequired,
    minColor: PropTypes.string.isRequired,
    startDate: PropTypes.instanceOf(DateTime).isRequired,
  }

  static defaultProps = {
    data: [],
    max: 1,
    min: 0,
  }

  constructor(props) {
    super(props)

    this.endDate = props.startDate.plus({ days: 6 })
    this.isMonthStart =
      props.startDate.day === 1 || props.startDate.day > this.endDate.day
    this.monthLabel = this.endDate.toFormat('MMM')
    this.range = props.max - props.min

    this.logDates = this.logDates.bind(this)
    this.normalizeValue = this.normalizeValue.bind(this)
    this.renderTile = this.renderTile.bind(this)
    this.styles = this.styles.bind(this)
  }

  logDates() {
    console.log(
      this.props.startDate.toISO(),
      this.endDate.toISO(),
      this.props.data
    )
  }

  normalizeValue(v) {
    return isNil(v) ? 0 : (v - this.props.min) / this.range
  }

  renderTile(idx) {
    return (
      <ReactivityTile
        key={`day-0${idx}`}
        max={this.props.max}
        maxColor={this.props.maxColor}
        minColor={this.props.minColor}
        value={this.normalizeValue(this.props.data[idx])}
      />
    )
  }

  styles() {
    return {
      root: {
        display: 'inline-block',
      },
      monthLabel: {
        height: '1.22em',
        overflowX: 'visible',
        width: 0,
      },
    }
  }

  render() {
    const styles = this.styles()

    return (
      <div style={styles.root} onClick={this.logDates}>
        <div style={styles.monthLabel}>
          {this.isMonthStart ? this.monthLabel : null}
        </div>
        {times(this.renderTile, 7)}
      </div>
    )
  }
}
