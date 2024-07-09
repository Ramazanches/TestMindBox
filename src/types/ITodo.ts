import { ITask } from "./ITask";

export interface ITodo {
	task: ITask,
	toggleComplete: (id: any) => void,
	children: string
}