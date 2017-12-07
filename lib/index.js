import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduce, times } from 'ramda'
import Color from 'color'

const calculateColor = (baseColor, tileColor, max) => value => {
  if (value === 0) { return baseColor }

  const factor = value / max
  const col = Color(tileColor)

  return factor > 0.5 ?
         col.darken(factor / 4.0) :
         col.lighten(factor / 0.5)
}

/**
* @returns func - a function that generates new tiles with proper color
*/
const generateTiles = (baseColor, tileColor, max) => (idx, value) => (
  <div
    key={idx}
    style={{
      backgroundColor: calculateColor(baseColor, tileColor, max)(value),
      borderRadius: '1px',
      height: '12px',
      margin: '2px',
      width: '12px',
    }}
  >
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
    opacity: 0.8,
  },
  label: props.labelStyle,
  root: {
    border: '1px solid',
    color: '#777',
    display: 'inline-block',
    padding: '1em',
  },
})


export class ReactivityBox extends Component {
  static propTypes = {
    baseColor: PropTypes.string.isRequired,
    fetchData: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    labelStyle: PropTypes.object.isRequired,
    tileColor: PropTypes.string.isRequired,
  }

  static defaultProps = {
    baseColor: '#333',
    label: 'Label for data',
    labelStyle: {
      fontWeight: 600,
      marginBottom: '10px',
    },
    tileColor: 'forestgreen',
  }

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      isReady: false,
      tileFactory: generateTiles(this.props.baseColor, this.props.tileColor, 0)
    }

    this.props.fetchData()
      .then(data => {
        const findMaxReducer = (acc, val) => val > acc ? val : acc
        const max = reduce(findMaxReducer, 0, data)

        this.setState({
          data: data,
          tileFactory: generateTiles(this.props.baseColor, this.props.tileColor, max),
        })
      })
  }

  render() {
    return (
      <div style={styles(this.props).root}>
        <div style={styles(this.props).label}>{this.props.label}</div>
        <div>
          <div style={styles(this.props).grid}>
            {times(weekIdx => (
              <div
                key={`week-${weekIdx}`}
                style={{
                  display: 'inline-block',
                }}
                >
                {times(
                   dayIdx =>
                     this.state.tileFactory(dayIdx, this.state.data[weekIdx * 7 + dayIdx]),
                   7
                )}
              </div>
            ), 40)}
          </div>
          <ul style={styles(this.props).dateNav}>
            <li>2017</li>
            <li>2016</li>
            <li>2015</li>
          </ul>
          <br />
          <a href="#">view raw data</a>
        </div>
      </div>
    )
  }
}
