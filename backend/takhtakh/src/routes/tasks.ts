import { Router } from 'express'
import * as taskController from '../controllers/taskController.js'
import type { Task } from "../models/task.ts"
const router = Router()

router.get("/taskAPI/getAll", (_req, res) => {
   res.json(taskController.getAllTasks())
})


router.post("/taskAPI/create", (req, res) => {
    const result: Task = taskController.createTask(req.body.name, req.body.dueDate, req.body.priorityLevel)
    if (result) {
    res.json( {message: "Task Created Successfully"} )
    }
    else {
    res.json( {message: "An Error Has Occured" } )
    }
})

router.delete("/taskAPI/delete/:id", (req, res) => {
    const result: Boolean = taskController.deleteTask(req.params.id)
    if (result) {
        res.json({message: "Task Successfully Deleted"})
    }
    else {
    res.json( {message: "An Error Has Occured" } )
    }
})

router.put("/taskAPI/edit/:id", (req, res) => {
    const result: Boolean = taskController.editTask(req.params.id, req.body.name, req.body.dueDate, req.body.status, req.body.priorityLevel)
    if (result) {
        res.json({message: "Task Successfully Edited"})
    }
    else {
    res.json( {message: "An Error Has Occured" } )
    }
})

export default router