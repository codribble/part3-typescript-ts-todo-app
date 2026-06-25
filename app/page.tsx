"use client";

import { useGetTodos } from "@/hooks/useTodos";
import TodoList from "@/components/TodoList";
import Form from "@/components/Form";

const HomePage = () => {
  const { data: todos, isLoading, isError } = useGetTodos();

  return (
    <div>
      <h1>투두 리스트</h1>

      <Form />

      {isLoading ? <div>로딩중...</div> : <TodoList todos={todos ?? []} />}
    </div>
  );
};

export default HomePage;
