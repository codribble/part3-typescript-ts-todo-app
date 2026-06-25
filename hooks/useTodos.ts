import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Todo } from "@/types/todo";
import {
  createTodo,
  deleteTodo,
  getTodos,
  toggleCompleteTodo,
} from "@/api/todos";

export const useGetTodos = () => {
  return useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useToggleCompleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleCompleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
