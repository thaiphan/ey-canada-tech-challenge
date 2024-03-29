import express from 'express'
import cors from 'cors'
import connect from './db'
import { v4 as uuid } from 'uuid'

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const api = express.Router()

api.get('/bookings', async (res, req) => {
  const db = await connect()
  // Catch errors
  try {
    const { rows } = await db.query(`SELECT * FROM bookings`)
    req.json(rows)
  } catch (ex) {
    req.json({ error: `Database Error!`, ...ex })
  }
})

api.post('/bookings', async (req, res) => {
  const db = await connect()
  // Catch errors
  try {
    const { bookingDate, username, location } = req.body

    const { rows: existing } = await db.query(`SELECT * FROM bookings WHERE "bookingDate"='${bookingDate}' AND "location"='${location}'`)

    if (existing.length > 0) {
      throw Error('Booking already exists for that date!')
    }


    await db.query(`INSERT INTO bookings ("createdDate", "bookingDate", "location", "username") VALUES (NOW(), '${bookingDate}', '${location}', '${username}')`)

    res.json({ message: 'Booking Created!' });
  } catch (ex) {
    res.json({ error: `Database Error!`, ...ex })
  }
});

api.delete('/bookings/:bookingId', async (req, res) => {
  const db = await connect();
  // Catch errors
  try {
    await db.query(`DELETE FROM bookings WHERE "id"='${req.params.bookingId}'`)
    res.json({ message: 'Booking Deleted!' })
  } catch (ex) {
    res.json({ error: `Database Error!`, ...ex })
  }
})

api.get('/locations', async (req, res) => {
  const db = await connect();
  // Catch errors
  try {
    const { rows } = await db.query(`SELECT * FROM locations`)
    res.json(rows)
  } catch (ex) {
    res.json({ error: `Database Error!`, ...ex })
  }
})

app.use('/api', api)
app.listen(4000, () => {
  console.log('server started on port 4000')
});
