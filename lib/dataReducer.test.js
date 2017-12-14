import dataReducer from './dataReducer'

const data = {
  '2016-12-24': 4,
  '2016-12-26': 7,
  '2017-01-02': 24,
  '2017-01-04': 5,
  '2017-12-30': 17
}

const result = dataReducer(data)

it('should handle normal data', () => {
  expect(result.ts['2016-12-24']).toEqual(4)
})

it('should collect years', () => {
  expect(result.years).toEqual([2016, 2017])
})

it('should interpret missing data as undefined', () => {
  expect(result.ts['2017-01-03']).toBe(undefined)
})

it('should calculate max', () => {
  expect(result.max).toEqual(24)
})

it('should calculate min', () => {
  expect(result.min).toEqual(4)
})
