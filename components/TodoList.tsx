"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "@/types/todo";
import { API_URL } from "@/constants";

const TodoList = ({ todos }: { todos: Todo[] }) => {
  const queryClient = useQueryClient();

  const { mutate: toggleTodoMutation } = useMutation({
    mutationFn: async (todo: Todo) => {
      await fetch(`${API_URL}/${todo.id}`, {
        method: "PATCH",
        body: JSON.stringify({ done: !todo.done }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutate: deleteTodoMutation } = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

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
            <label htmlFor={`${todo.title}-${todo.id}`}>{todo.title}</label>
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
