import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class ReactivityTile extends Component {
  static propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    max: PropTypes.number.isRequired,
    maxColor: PropTypes.string.isRequired,
    minColor: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  }

  static defaultProps = {
    backgroundColor: 'white',
    max: 1,
    value: 0,
  }

  constructor(props) {
    super(props)

    this.styles = this.styles.bind(this)
  }

  styles() {
    return {
      background: {
        backgroundColor: this.props.minColor,
        border: `0.08em solid ${this.props.backgroundColor}`,
        height: '0.66em',
        margin: 0,
        overflow: 'hidden',
        padding: 0,
        width: '0.66em',
      },
      foreground: {
        backgroundColor: this.props.maxColor,
        height: '100%',
        opacity: (this.props.max === 0) ? 0 :
                 this.props.value / this.props.max,
        width: '100%',
      },
    }
  }

  render() {
    const styles = this.styles()

    return (
      <div style={styles.background}>
        <div style={styles.foreground} />
      </div>
    )
  }
}
