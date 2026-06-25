"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useCreateTodo, useGetTodos } from "@/hooks/useTodos";
import TodoList from "@/components/TodoList";

const HomePage = () => {
  const [title, setTitle] = useState<string>("");

  const { data: todos, isLoading, isError } = useGetTodos();

  const { mutate: newTodoMutation } = useCreateTodo();

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleNewTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    newTodoMutation(title);
    setTitle("");
  };

  return (
    <div>
      <h1>투두 리스트</h1>

      <form className="flex items-center gap-1" onSubmit={handleNewTodo}>
        <input
          type="text"
          className="border"
          value={title}
          onChange={handleTitleChange}
        />
        <button type="submit" className="border px-1 rounded-xs">
          추가
        </button>
      </form>

      {isLoading ? <div>로딩중...</div> : <TodoList todos={todos ?? []} />}
    </div>
  );
};

export default HomePage;
