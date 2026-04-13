import express, { Router } from 'express'
import taskRouter from './routes/tasks.js'
import cors from 'cors'
import { loadTasks } from './controllers/taskController.ts'

const app = express()
app.use(cors())
app.use(express.json())
app.use(taskRouter)

await loadTasks();

app.listen(3000, () => console.log ('Server is running on port 3000'))