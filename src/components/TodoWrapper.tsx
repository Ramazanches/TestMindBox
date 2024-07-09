import React, { FC, useEffect, useState } from "react"
import TodoForm from "./TodoForm"
import { ITask } from "../types/ITask"
import * as uuid from 'uuid'
import Todo from "./Todo"

const TodoWrapper: FC  = () => {

	const [todos, setTodos] = useState<ITask[]>([])
	const [value, setValue] = useState<string>('')
	const [isCompleted, setIsCompleted] = useState<boolean>(false)
	const [isActive, setIsActive] = useState<boolean>(false)
	const [isAll, setIsAll] = useState<boolean>(true)

	const task: ITask = {
		id: uuid.v4(),
		text: value, //state value
		completed: false,
	}

	useEffect( () => {
		const store = JSON.parse(localStorage.getItem('todos') || '[]') as ITask[]
		setTodos(store)
	}, [])

	useEffect( () => {
		localStorage.setItem('todos', JSON.stringify(todos))
	}, [todos])

	const keyPressHandler = (e: React.KeyboardEvent<HTMLFormElement>) => {
		if (e.key === 'Enter') {
			setTodos( prev => [task, ...prev])
		}
	}

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}

	const toggleComplete = (id: any) => {
		setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
	}

	const removeAll = () => {
		setTodos(prev => prev = [])
		console.log(todos)
	}

	const showAll: () => void = () => {
		if (!isAll) setIsAll(true)
		if (isCompleted) setIsCompleted(false)
		if (isActive) setIsActive(false)
			console.log(todos)
	}

	const showActive: () => void = () => {
		setIsAll(false)
		if (isCompleted) setIsCompleted(false)
		if (!isActive) setIsActive(true)
			console.log(todos)
	}

	const showCompleted: () => void = () => {
		setIsAll(false)
		if (!isCompleted) setIsCompleted(true)
		if (isActive) setIsActive(false)
			console.log(todos)
	}

	const activeTodos = todos.filter( todo => todo.completed === false)

	const completedTodos = todos.filter( todo => todo.completed === true)

	return (
		<>

			<h1>todos</h1>

			<div>

				<TodoForm 
					onChangeHandler = { onChangeHandler }
					keyPressHandler = { keyPressHandler }
					value = { value }
				/>

				<ul>
					{
						isCompleted && completedTodos.map( (todo: ITask) => (
							<Todo
								task = { todo }
								toggleComplete = { toggleComplete }
								key = { todo.id }
							>
								{ todo.text }
							</Todo>
						))
					} 
					{
						isActive && activeTodos.map( (todo: ITask) => (
							<Todo
								task = { todo }
								toggleComplete = { toggleComplete }
								key = { todo.id }
							>
								{ todo.text }
							</Todo>
						))						
					}
					{
						isAll && todos.map( (todo: ITask) => (
							<Todo 
								task = { todo }
								toggleComplete = { toggleComplete }
								key = { todo.id }
							>
								{ todo.text }
							</Todo>
						))
					}
				</ul>

				<div>
					<span></span>
					<ul>
						<li>
   						<button onClick = { () => showAll() }>All</button>
							<button onClick = { () => showActive() }>Active</button>
							<button onClick = { () => showCompleted() }>Completed</button>
							<button onClick = { () => removeAll() }>Clear completed</button>
						</li>
					</ul>
				</div>

			</div>
		</>
	)
}

export default TodoWrapper