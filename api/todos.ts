import { API_URL } from "@/constants";
import { Todo } from "@/types/todo";

export const getTodos = async () => {
  const res = await fetch(API_URL);
  const data = await res.json();

  return data;
};

export const createTodo = async (title: string) => {
  await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ title, done: false }),
  });
};

export const toggleCompleteTodo = async (todo: Todo) => {
  await fetch(`${API_URL}/${todo.id}`, {
    method: "PATCH",
    body: JSON.stringify({ done: !todo.done }),
  });
};

export const deleteTodo = async (id: string) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};
