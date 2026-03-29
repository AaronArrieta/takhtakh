// behaviour functions for "Task" Object in TakhTakh program (task.c)

import { Task, PriorityLevel } from "../models/task.js";

const tasks: Task[] = []; // initialize Master array of Task Object

export function getAllTasks(): Task[] {
    return tasks;
}

export function createTask(name: string, dueDate: string, priorityLevel: PriorityLevel): Task {
        
    // fill in Task fields
    const newTask: Task = {
        id: crypto.randomUUID(),        // "hash()" a unique ID
        name: name,
        dueDate: dueDate,
        status: "todo",
        priorityLevel: priorityLevel
    };

    // add newTask into master array
    tasks.push(newTask);

    return newTask;
}