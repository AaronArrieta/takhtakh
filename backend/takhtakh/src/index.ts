import express, { Router } from 'express'
import taskRouter from './routes/tasks.js'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
app.use(taskRouter)

app.listen(3000, () => console.log ('Server is running on port 3000'))