import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'
import { reduce, slice, times } from 'ramda'

import { ReactivityWeek } from './ReactivityWeek'

const styles = props => ({
  dateNav: {
    display: 'inline-block',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  grid: {
    display: 'inline-block',
    marginRight: '20px',
  },
  root: {
    color: '#777',
    display: 'inline-block',
    padding: '1em',
  },
})

export class ReactivityTiles extends Component {
  static propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    fetchData: PropTypes.func.isRequired,
    maxColor: PropTypes.string.isRequired,
    minColor: PropTypes.string.isRequired,
  }

  static defaultProps = {
    backgroundColor: 'white',
    maxColor: 'forestgreen',
    minColor: '#DDD',
  }

  constructor(props) {
    super(props)

    this.relativeStartDate = this.relativeStartDate.bind(this)
    this.weekFactory = this.weekFactory.bind(this)

    this.state = {
      endDate: DateTime.utc(),
      isReady: false,
      weekFactory: this.weekFactory([], 1),
    }

    this.props.fetchData().then(data => {
      const findMaxReducer = (acc, val) => (val > acc ? val : acc)
      const max = reduce(findMaxReducer, 0, data) || 1

      this.setState({ weekFactory: this.weekFactory(data, max) })
    })
  }

  relativeStartDate(weekIdx = 0) {
    const aYearAgo = this.state.endDate.plus({ years: -1 })
    const startDate =
      aYearAgo.weekday === 7
        ? aYearAgo
        : aYearAgo.startOf('week').plus({ days: -1 })

    return startDate.plus({ days: 7 * weekIdx })
  }

  weekFactory(data, max) {
    return idx => (
      <ReactivityWeek
        key={`week-${idx}`}
        data={slice(idx * 7, idx * 7 + 7, data)}
        maxColor={this.props.maxColor}
        minColor={this.props.minColor}
        startDate={this.relativeStartDate(idx)}
      />
    )
  }

  render() {
    return (
      <div style={styles(this.props).root}>
        <div style={styles(this.props).label}>{this.props.label}</div>
        <div>
          <div style={styles(this.props).grid}>
            {times(this.state.weekFactory, 53)}
          </div>
          <ul style={styles(this.props).dateNav}>
            <li>2017</li>
            <li>2016</li>
            <li>2015</li>
          </ul>
        </div>
      </div>
    )
  }
}
