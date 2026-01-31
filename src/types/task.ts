import { Status } from "./status";

export type TaskItem = {
  id: string;
  text: string;
  status: typeof Status[keyof typeof Status];
}

export type TaskList = {
  id: string;
  tasks: TaskItem[];
}

export type ListsState = Record<string, TaskList>;