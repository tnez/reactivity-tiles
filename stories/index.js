import React from 'react'
import { compose, map, times } from 'ramda'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { ReactivityTiles } from '../lib'

const randomData = compose(map(v => (v < 0.1 ? 0 : v)), times(Math.random))

storiesOf('ReactivityTiles', module)
  .add('darkgreen', () => {
    const dataFetcher = () =>
      new Promise((resolve, reject) =>
        setTimeout(resolve(randomData(7 * 53)), 2400)
      )

    return (
      <ReactivityTiles
        fetchData={dataFetcher}
        maxColor="darkgreen"
      />
    )
  })
  .add('darkcyan', () => {
    const dataFetcher = () =>
      new Promise((resolve, reject) =>
        setTimeout(resolve(randomData(7 * 53)), 2400)
      )

    return (
      <ReactivityTiles
        fetchData={dataFetcher}
        maxColor="darkcyan"
      />
    )
  })
  .add('darkblue', () => {
    const dataFetcher = () =>
      new Promise((resolve, reject) =>
        setTimeout(resolve(randomData(7 * 53)), 2400)
      )

    return (
      <ReactivityTiles
        fetchData={dataFetcher}
        maxColor="darkblue"
      />
    )
  })
  .add('darkred', () => {
    const dataFetcher = () =>
      new Promise((resolve, reject) =>
        setTimeout(resolve(randomData(7 * 53)), 2400)
      )

    return (
      <ReactivityTiles
        fetchData={dataFetcher}
        maxColor="darkred"
      />
    )
  })
