// Step 1 import ...
const express = require('express')
const app = express()
const morgan = require('morgan')
const { readdirSync } = require('fs')
const cors = require('cors')

// const crud = require('./routes/crud') การ Import Route ปกติทีละตัว

// Step 4 Middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

// Step 3 Routing
// app.use('/api',crud) การ Import Route ปกติทีละตัว
readdirSync('./routes').map((c)=>app.use('/api',require('./routes/'+c))) // Import Auto ใช้ทั้ง project


// Step 2
app.listen(5002, ()=>console.log('Server is running on port 5002'))