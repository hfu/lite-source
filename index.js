const sqlite = require('spatialite')
const fs = require('fs')

if (process.argv.length !== 3) {
  console.log('node index.js some.sqlite')
  process.exit()
} else {
  if (!fs.existsSync(process.argv[2])) {
    console.log(`${process.argv[2]} does not exist.`)
    process.exit()
  }
}

const db = new sqlite.Database(process.argv[2])
db.spatialite(err => {
  if (err) throw err
  db.each('SELECT AsGeoJSON(GEOMETRY) FROM points', (err, row) => {
    if (err) throw err
    console.log(row)
  })
})
