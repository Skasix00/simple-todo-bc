import { useEffect, useState } from "react";
import "./App.css";

import { TodoItem } from "./components/TodoItem";
import { TodoItem as TodoItemType } from "./types";
function App() {
	const [todos, setTodos] = useState<TodoItemType[]>(() => {
		const savedTodos = localStorage.getItem("todos");
		return savedTodos ? JSON.parse(savedTodos) : [];
	});
	const [input, setInput] = useState("");

	const addTodo = (text: string) => {
		const newTodo: TodoItemType = {
			id: Date.now(),
			text,
			isCompleted: false,
			created_at: new Date().toUTCString(),
			completed_at: null,
		};
		setTodos([...todos, newTodo]);
		setInput("");
	};

	const removeTodo = (id: number) => {
		const removedTodo = todos.filter((item) => item.id !== id);
		setTodos(removedTodo);
	};

	const toggleTodo = (id: number) => {
		const now: string = new Date().toUTCString();
		const newTodos = todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, isCompleted: !todo.isCompleted, completed_at: now };
			}
			return todo;
		});
		setTodos(newTodos);
	};

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	return (
		<>
			<main>
				<section className='wrapper p-3'>
					<h2 className='mt-3 ms-3'>Todos</h2>
					<div className='row mt-3 ms-2'>
						<div className='col-lg-10'>
							<input className='field-control w-100' type='text' value={input} onChange={(e) => setInput(e.target.value)} />
						</div>
						<div className='col-lg-2'>
							<button className='btn btn-primary' onClick={() => addTodo(input)}>
								Adicionar
							</button>
						</div>
					</div>
				</section>
				<ul className='list mt-3 w-100 p-3'>
					{todos.map((todo) => (
						<TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} removeTodo={removeTodo}></TodoItem>
					))}
				</ul>
			</main>
		</>
	);
}

export default App;
