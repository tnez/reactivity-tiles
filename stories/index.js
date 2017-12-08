import React from 'react';
import { compose, map, times } from 'ramda'

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { ReactivityBox } from '../lib'

const randomData = compose(
  map(v => v < 0.10 ? 0 : v),
  times(Math.random)
)

storiesOf('ReactivityBox', module)
  .add('darkgreen', () => {
    const dataFetcher = () => new Promise((resolve, reject) =>
      setTimeout(resolve(randomData(7 * 53)), 8400))

    return (
      <ReactivityBox
        baseColor="#DDD"
        fetchData={dataFetcher}
        tileColor="darkgreen"
      />
    )
  })
  .add('darkcyan', () => {
    const dataFetcher = () => new Promise((resolve, reject) =>
      setTimeout(resolve(randomData(7 * 53)), 2400))

    return (
      <ReactivityBox
        baseColor="#DDD"
        fetchData={dataFetcher}
        tileColor="darkcyan"
      />
    )
  })
  .add('darkblue', () => {
    const dataFetcher = () => new Promise((resolve, reject) =>
      setTimeout(resolve(randomData(7 * 53)), 2400))

    return (
      <ReactivityBox
        baseColor="#DDD"
        fetchData={dataFetcher}
        tileColor="darkblue"
      />
    )
  })
  .add('darkred', () => {
    const dataFetcher = () => new Promise((resolve, reject) =>
      setTimeout(resolve(randomData(7 * 53)), 2400))

    return (
      <ReactivityBox
        baseColor="#DDD"
        fetchData={dataFetcher}
        tileColor="darkred"
      />
    )
  })
