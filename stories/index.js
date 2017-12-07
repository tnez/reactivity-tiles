import React from 'react';
import { times } from 'ramda'

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { ReactivityBox } from '../lib'

storiesOf('ReactivityBox', module)
  .add('green', () => {
    const dataFetcher = () => new Promise((resolve, reject) =>
      setTimeout(resolve(times(Math.random, 7 * 40)), 2400))

    return (
      <ReactivityBox
        baseColor="#333"
        fetchData={dataFetcher}
        tileColor="green"
      />
    )
  })
  .add('yellow', () => {
    const dataFetcher = () => new Promise((resolve, reject) =>
      setTimeout(resolve(times(Math.random, 7 * 40)), 2400))

    return (
      <ReactivityBox
        baseColor="#333"
        fetchData={dataFetcher}
        tileColor="yellow"
      />
    )
  })
  .add('red', () => {
    const dataFetcher = () => new Promise((resolve, reject) =>
      setTimeout(resolve(times(Math.random, 7 * 40)), 2400))

    return (
      <ReactivityBox
        baseColor="#333"
        fetchData={dataFetcher}
        tileColor="red"
      />
    )
  })
