import { useState, useEffect } from "react";
import { ulid } from "ulid";

import * as todoData from "../api/todos";

export const useTodo = () => {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    todoData.getAllTodosData().then((todos) => {
      setTodoList([...todos].reverse());
    });
  }, []);

  const toggleTodoListItemStatus = (id, done) => {
    const todoItem = todoList.find((todo) => todo.id === id);
    const newTodoItem = { ...todoItem, done: !done };

    todoData.updateTodoData(id, newTodoItem).then((updatedTodo) => {
      const newTodoList = todoList.map((todo) =>
        todo.id !== updatedTodo.id ? todo : updatedTodo
      );

      setTodoList(newTodoList);
    });
  };

  const addTodoListItem = (todoContent) => {
    const newTodoItem = { id: ulid(), content: todoContent, done: false };
    todoData.addTodoData(newTodoItem).then((addTodo) => {
      setTodoList([addTodo, ...todoList]);
    });
  };

  const deleteTodoListItem = (id) => {
    todoData.deleteTodoData(id).then((deleteListItemId) => {
      const newTodoList = todoList.filter(
        (todo) => todo.id !== deleteListItemId
      );

      setTodoList(newTodoList);
    });
  };

  return {
    todoList,
    toggleTodoListItemStatus,
    addTodoListItem,
    deleteTodoListItem,
  };
};
