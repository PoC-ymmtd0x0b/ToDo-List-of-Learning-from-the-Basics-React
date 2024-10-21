import React, { useRef } from "react";
import { useTodo } from "./hooks/useTodo";

const TodoTitle = ({ title, as }) => {
  if (as === "h1") {
    return <h1>{title}</h1>;
  } else if (as === "h2") {
    return <h2>{title}</h2>;
  } else {
    return <p>{title}</p>;
  }
};

const TodoList = ({ todoList, toggleTodoListItemStatus }) => {
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          toggleTodoListItemStatus={toggleTodoListItemStatus}
        />
      ))}
    </ul>
  );
};

const TodoItem = ({ todo, toggleTodoListItemStatus }) => {
  const handleToggleTodoListItemStatus = () =>
    toggleTodoListItemStatus(todo.id, todo.done);

  return (
    <li>
      {todo.content}
      <button onClick={handleToggleTodoListItemStatus}>
        {todo.done ? "完了リストへ" : "未完了リストへ"}
      </button>
    </li>
  );
};

const TodoAdd = ({ inputEl, handleAddTodoListItem }) => {
  return (
    <>
      <textarea ref={inputEl} />
      <button onClick={handleAddTodoListItem}>+ TODOを追加</button>
    </>
  );
};

function App() {
  const { todoList, addTodoListItem, toggleTodoListItemStatus } = useTodo();

  const inputEl = useRef(null);

  const inCompletedList = todoList.filter((todo) => !todo.done);
  const completedList = todoList.filter((todo) => todo.done);

  const handleAddTodoListItem = () => {
    if (inputEl.current.value === "") return;

    addTodoListItem(inputEl.current.value);
    inputEl.current.value = "";
  };

  return (
    <>
      <TodoTitle title="TODO進捗管理" as="h1" />
      <TodoAdd
        inputEl={inputEl}
        handleAddTodoListItem={handleAddTodoListItem}
      />

      <TodoTitle title="未完了TODOリスト" as="h2" />
      <TodoList
        todoList={inCompletedList}
        toggleTodoListItemStatus={toggleTodoListItemStatus}
      />

      <TodoTitle title="完了TODOリスト" as="h2" />
      <TodoList
        todoList={completedList}
        toggleTodoListItemStatus={toggleTodoListItemStatus}
      />
    </>
  );
}

export default App;
