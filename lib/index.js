import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduce, times } from 'ramda'

const generateTiles = (baseColor, tileColor, max) => (idx, value) => (
  <div
    key={idx}
    style={{
      backgroundColor: baseColor,
      border: '0.08em solid white',
      borderRadius: '0.66em',
      height: '0.66em',
      margin: 0,
      overflow: 'hidden',
      padding: 0,
      width: '0.66em',
    }}
  >
    <div
      style={{
        backgroundColor: tileColor,
        height: '100%',
        opacity: max === 0 ? 0 : value / max,
        width: '100%',
      }}
    />
  </div>
)

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

export class ReactivityBox extends Component {
  static propTypes = {
    baseColor: PropTypes.string.isRequired,
    fetchData: PropTypes.func.isRequired,
    tileColor: PropTypes.string.isRequired,
  }

  static defaultProps = {
    baseColor: '#777',
    tileColor: 'darkcyan',
  }

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      isReady: false,
      tileFactory: generateTiles(this.props.baseColor, this.props.tileColor, 1),
    }

    this.props.fetchData().then(data => {
      const findMaxReducer = (acc, val) => (val > acc ? val : acc)
      const max = reduce(findMaxReducer, 0, data) || 1

      this.setState({
        data: data,
        tileFactory: generateTiles(
          this.props.baseColor,
          this.props.tileColor,
          max
        ),
      })
    })
  }

  render() {
    return (
      <div style={styles(this.props).root}>
        <div style={styles(this.props).label}>{this.props.label}</div>
        <div>
          <div style={styles(this.props).grid}>
            {times(
              weekIdx => (
                <div
                  key={`week-${weekIdx}`}
                  style={{
                    display: 'inline-block',
                  }}
                >
                  {times(dayIdx => {
                    const val = this.state.data[weekIdx * 7 + dayIdx] || 0
                    return this.state.tileFactory(dayIdx, val)
                  }, 7)}
                </div>
              ),
              53
            )}
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
