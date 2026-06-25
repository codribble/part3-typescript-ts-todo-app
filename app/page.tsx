"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Todo } from "@/types/todo";
import { API_URL } from "@/constants";
import TodoList from "@/components/TodoList";

const HomePage = () => {
  const [title, setTitle] = useState<string>("");
  const QueryClient = useQueryClient();

  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await fetch(API_URL);
      const data = await res.json();

      return data;
    },
  });

  const { mutate: newTodoMutation } = useMutation({
    mutationFn: async (title: string) => {
      await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ title, done: false }),
      });
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

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
