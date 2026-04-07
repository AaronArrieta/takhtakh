// fields for "Task" Object in TakhTakh program (task.h)
export type PriorityLevel = "low" | "medium" | "high";
export type Status = "To Do" | "In Progress" | "Completed";


export interface Task {
    id: string;
    name: string;
    dueDate: string;
    status: Status;
    priorityLevel: PriorityLevel;
}
