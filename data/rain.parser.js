/**
 * Read rain.data.csv and transform into a javascript obj
 */

const fs = require('fs')
const csv = require('csv-parser')

const ws = fs.createWriteStream(`${__dirname}/rain.data.js`)
ws.write('export default = {\n')

const transform = data => {
  const { DATE, PRCP } = data
  return Number(PRCP) > 0 ? `  "${DATE}": ${PRCP},\n` : null
}

fs.createReadStream(`${__dirname}/rain.data.csv`)
  .pipe(csv())
  .on('data', data => {
    const entry = transform(data)
    entry && ws.write(entry)
  })
  .on('end', () => ws.write('}\n') && ws.end())
