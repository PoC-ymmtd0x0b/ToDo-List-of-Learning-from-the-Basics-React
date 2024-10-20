import React, { useState, useEffect } from "react";
import axios from "axios";

const todoDataUrl = "http://localhost:3100/todos";

const TodoTitle = ({ title, as }) => {
  if (as === "h1") {
    return <h1>{title}</h1>;
  } else if (as === "h2") {
    return <h2>{title}</h2>;
  } else {
    return <p>{title}</p>;
  }
};

const TodoList = ({ todoList }) => {
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};

const TodoItem = ({ todo }) => {
  return (
    <li>
      {todo.content}（{todo.done ? "完了" : "未完了"}）
    </li>
  );
};

function App() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(todoDataUrl).catch((e) => {
        return { data: [] };
      });
      setTodoList(response.data);
    };
    fetchData();
  }, []);

  console.log("TODOリスト：", todoList);

  const inCompletedList = todoList.filter((todo) => {
    return !todo.done;
  });
  console.log("未完了TODOリスト：", inCompletedList);

  const completedList = todoList.filter((todo) => {
    return todo.done;
  });
  console.log("完了TODOリスト：", completedList);

  return (
    <>
      <TodoTitle title="TODO進捗管理" as="h1" />
      <textarea />
      <button>+ TODOを追加</button>

      <TodoTitle title="未完了TODOリスト" as="h2" />
      <TodoList todoList={inCompletedList} />

      <TodoTitle title="完了TODOリスト" as="h2" />
      <TodoList todoList={completedList} />
    </>
  );
}

export default App;
