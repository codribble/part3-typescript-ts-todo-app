"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "@/types/todo";
import { API_URL } from "@/constants";
import { useDeleteTodo, useToggleCompleteTodo } from "@/hooks/useTodos";

const TodoList = ({ todos }: { todos: Todo[] }) => {
  const queryClient = useQueryClient();

  const { mutate: toggleTodoMutation } = useToggleCompleteTodo();

  const { mutate: deleteTodoMutation } = useDeleteTodo();

  const handleToggleTodo = (todo: Todo) => {
    toggleTodoMutation(todo);
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodoMutation(id);
  };
  return (
    <ul>
      {todos?.map((todo: Todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between border border-white m-5 p-5"
        >
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`${todo.title}-${todo.id}`}
              checked={todo.done}
              onChange={() => handleToggleTodo(todo)}
            />
            <label
              htmlFor={`${todo.title}-${todo.id}`}
              className={`cursor-pointer ${todo.done ? "line-through" : ""}`}
            >
              {todo.title}
            </label>
          </div>

          <button
            onClick={() => handleDeleteTodo(todo.id)}
            className="bg-white text-black p-2 cursor-pointer"
          >
            삭제
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
