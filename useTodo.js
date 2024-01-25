import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

const init = () => {
  return JSON.parse(localStorage.getItem("todos") || []);
};

export const useTodo = () => {
  const initialState = [];
  const [todos, dispatch] = useReducer(todoReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onNewTodo = (todo) => {
    dispatch({
      type: "[TODO] Add Todo",
      payload: todo,
    });
  };

  const handleDeleteTodo = (id) => {
    dispatch({
      type: "[TODO] Remove Todo",
      payload: id,
    });
  };

  const handleToggleTodo = (id) => {
    dispatch({
      type: "[TODO] Toggle Todo",
      payload: id,
    });
  };

  return {
    todos,
    onNewTodo,
    todosCount: todos.length,
    handleDoneTodo: todos.filter((todo) => !todo.done).length,
    handleDeleteTodo,
    handleToggleTodo,
  };
};
