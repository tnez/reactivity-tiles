import React from 'react';
import { compose, map, times } from 'ramda'

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { ReactivityBox } from '../lib'

const randomData = compose(
  map(v => v < 0.15 ? 0 : v),
  times(() => Math.random() * Math.random())
)

storiesOf('ReactivityBox', module)
  .add('green', () => {
    const dataFetcher = () => new Promise((resolve, reject) =>
      setTimeout(resolve(randomData(7 * 40)), 2400))

    return (
      <ReactivityBox
        baseColor="#DDD"
        fetchData={dataFetcher}
        tileColor="green"
      />
    )
  })
  .add('yellow', () => {
    const dataFetcher = () => new Promise((resolve, reject) =>
      setTimeout(resolve(randomData(7 * 40)), 2400))

    return (
      <ReactivityBox
        baseColor="#DDD"
        fetchData={dataFetcher}
        tileColor="yellow"
      />
    )
  })
  .add('red', () => {
    const dataFetcher = () => new Promise((resolve, reject) =>
      setTimeout(resolve(randomData(7*40)), 2400))

    return (
      <ReactivityBox
        baseColor="#DDD"
        fetchData={dataFetcher}
        tileColor="red"
      />
    )
  })
