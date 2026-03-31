// behaviour functions for "Task" Object in TakhTakh program (task.c)

import type { Task, PriorityLevel, Status } from "../models/task.js";

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

export function deleteTask(id: string): boolean {

    // traverse master array, find the corresponding task to delete
    for (let i: number = 0; i < tasks.length; i++) {
        if (tasks[i]?.id === id) {
            tasks.splice(i, 1);     // REMOVE element @ index i
            return true;
        }
    }

    // else, given id is not in Tasks[]
    return false;
}

export function editTask(id: string, name?: string, dueDate?: string, status?: Status, priorityLevel?: PriorityLevel): boolean {

    // traverse master array to find corresponding task to edit
    for (let i: number = 0; i < tasks.length; i++) {
        
        const task = tasks[i];

        if (task === undefined) {
            continue;
        }

        if (task.id === id) {

            // ensure only given fields are modified
            if (name !== undefined) {
                task.name = name;
            }

            if (dueDate !== undefined) {
                task.dueDate = dueDate;
            }

            if (status !== undefined) {
                task.status = status;
            }

            if (priorityLevel !== undefined) {
                task.priorityLevel = priorityLevel;
            }

            return true;
        }
    }

    // else, there is no corresponding task to edit!
    return false;
}

export function updateStatus(id: string, status: Status): boolean {
    
    // traverse master array to find the corresponding task to update its' Status
    for (let i: number = 0; i < tasks.length; i++) {
        const task = tasks[i];

        if (task === undefined) {
            continue;
        }

        if (task.id === id) {
            
            task.status = status;
            return true;
        }

    }

    // else, no task to update its' status

    return false;
}