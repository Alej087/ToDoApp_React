import { useState } from "react";
import Todo from "./todo";
import "./todoApp.css";

export default function TodoApp(params) {
    const [title, setTitle] = useState("");
    const [todos, setTodos] = useState([]);

    function handleChange(e) {
        const value = e.target.value;
        setTitle(value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newTodo = {
            id: crypto.randomUUID(),
            title: title,
            completed: false,
        };

        setTodos([...todos, newTodo]);
        setTitle("");
    }

    function handleUpdate(id, value) {
        const temp = [...todos];
        const item = temp.find((item) => item.id === id);
        item.title = value;
        setTodos(temp);
    }

    function handleDelete(id) {
        const temp = todos.filter((item) => item.id !== id);
        setTodos(temp);
    }

    return (
        <div className="todoContainer">
            <form onSubmit={handleSubmit} className="todoCreateForm">
                <input
                    onChange={handleChange}
                    className="todoInput"
                    value={title}
                />
                <input
                    onClick={handleSubmit}
                    type="submit"
                    value="Create Task"
                    className="buttonCreate"
                />
            </form>
            <div className="todosContainer">
                {todos.map((todo) => (
                    <Todo
                        key={todo.id}
                        item={todo}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}
