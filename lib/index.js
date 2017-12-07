import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { times } from 'ramda'

const FakeData = N => setTimeout(
)

/**
* @returns func - a function that generates new tiles with proper color
*/
const generateTiles = (baseColor, max) => value => (
  <div
    style={{
      backgroundColor: baseColor,
      height: '10px',
      margin: '1px',
      width: '10px',
    }}
  >
  </div>
)

const styles = props => ({
  root: {
    border: '1px solid',
    color: props.baseColor,
    display: 'inline-block',
    padding: '1em',
  },
  grid: {
    display: 'inline-block',
    marginRight: '20px',
  },
  dateNav: {
    display: 'inline-block',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
})


export class ReactivityBox extends Component {
  static propTypes = {
    baseColor: PropTypes.string.isRequired,
    fetchData: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    tileColor: PropTypes.string.isRequired,
  }

  static defaultProps = {
    baseColor: '#333',
    tileColor: 'forestgreen',
  }

  constructor(props) {
    super(props)

    this.state = {
      isReady: false,
      tileFactory: generateTiles(this.props.tileColor, 1)
    }
  }

  render() {
    return (
      <div style={styles(this.props).root}>
        <div>
          <div style={styles(this.props).grid}>
            {times(() => (
              <div
                style={{
                  display: 'inline-block',
                }}
                >
                {times(this.state.tileFactory, 7)}
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
