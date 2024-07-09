import React, { FC } from "react"

	interface ITodoFormHandlers {
		onChangeHandler: any,
		keyPressHandler: any,
		value: string
	}
	
	const TodoForm: FC<ITodoFormHandlers>  = ({onChangeHandler, keyPressHandler, value}) => {

	return (
		<>
			<form>
				<input 
					type="text" 
					value={value}
					onKeyPress = { e => keyPressHandler(e) }
					onChange = { e => onChangeHandler(e) }
					placeholder = "What needs to be done?"
				/>
			</form>			
		</>
	)

}

export default TodoForm