import React from "react";
import { TodoItem as TodoItemType } from "../../types";
import "../../App.css";

type Props = {
	todo: TodoItemType;
	toggleTodo: (id: number) => void;
	removeTodo: (id: number) => void;
};

export const TodoItem: React.FC<Props> = (props) => {
	const formattedDate = (date: string | null | undefined) => {
		if (!date || isNaN(new Date(date).getTime())) {
			return "Não completa";
		}
		return new Intl.DateTimeFormat("pt-PT", {
			year: "numeric",
			month: "numeric",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		}).format(new Date(date));
	};
	return (
		<li className={"list-item"}>
			<input type='checkbox' checked={props.todo.isCompleted} disabled={props.todo.isCompleted ? true : false} onChange={() => props.toggleTodo(props.todo.id)} />
			<p className={props.todo.isCompleted ? "lined-trough" : "none"}>{props.todo.text}</p>
			<p>
				Criada:
				{props.todo.created_at ? formattedDate(props.todo.created_at) : "Data inválida"}
			</p>
			<p>Completada: {props.todo.completed_at ? formattedDate(props.todo.completed_at) : formattedDate(null)}</p>
			<button className='btn btn-danger' onClick={() => props.removeTodo(props.todo.id)}>
				X
			</button>
		</li>
	);
};
