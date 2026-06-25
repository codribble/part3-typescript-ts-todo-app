"use client";

import { useCreateTodo } from "@/hooks/useTodos";
import { ChangeEvent, FormEvent, useState } from "react";

const Form = () => {
  const [title, setTitle] = useState<string>("");
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
  );
};

export default Form;
