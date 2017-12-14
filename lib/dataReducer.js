import { DateTime } from 'luxon'
import {
  compose,
  isNil,
  reduce,
  toPairs,
  union,
} from 'ramda'

/**
 * @function dataReducer
 * @param data - object that is keyed by strings parsable as dates and values
 * that represent counts for these dates. Note that dates can be skipped and
 * will be interpreted as zero values.
 *
 * {
 *   "2016-12-24": 4,
 *   "2016-12-26": 7,
 *   "2017-01-02": 24,
 *   "2017-01-04": 5,
 *   // ...
 *   "2017-12-30": 17
 * }
 *
 * @return object with the following shape:
 *
 * {
 *   endDate: "2017-12-30",
 *   max: 27,
 *   min: 0,
 *   startDate: "2016-12-24",
 *   ts: {
 *     "2016-12-24": 4,
 *     "2016-12-26": 7,
 *     "2017-01-02": 24,
 *     "2017-01-04": 5,
 *     // ...
 *     "2017-12-30": 17
 *   },
 *   years: [
 *     "2016",
 *     "2017"
 *   ]
 * }
 */
export default compose(reduce(accumulator, { ts: {}, years: [] }), toPairs)

function accumulator(acc, tuple) {
  const [dtStr, val] = tuple
  const dt = DateTime.fromISO(dtStr)
  const hash = dtHash(dt)
  const newVal = acc.ts[hash] ? acc.ts[hash] + val : val

  return {
    endDate: (isNil(acc.endDate) || hash > acc.endDate) ? hash : acc.endDate,
    max: (isNil(acc.max) || val > acc.max) ? val : acc.max,
    min: (isNil(acc.min) || val < acc.min) ? val : acc.min,
    startDate: (isNil(acc.startDate) || hash < acc.startDate) ? hash : acc.startDate,
    ts: { ...acc.ts, [hash]: newVal },
    years: union(acc.years, [dt.year]),
  }
}

function dtHash(dt) {
  return dt.toISODate()
}
