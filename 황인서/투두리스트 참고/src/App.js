import { useEffect, useRef, useState } from "react";
import "./App.css";
import Todo from "./Todo";

function App() {
  const [todoList, setTodoList] = useState([
    {
      id: "1233",
      content: "asdvsd",
      checked: false,
    },
  ]);
  const inputRef = useRef();

  const onCreateTodo = () => {
    if (inputRef.current.value === "") return;
    setTodoList(
      todoList.concat({
        id: parseInt(Math.random(6) * 1000000),
        content: inputRef.current.value,
        checked: false,
      })
    );
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  const onUpdateTodo = ({ id, content }) => {
    setTodoList(
      todoList.map((todo) => (todo.id === id ? { ...todo, content } : todo))
    );
  };

  const onDeleteTodo = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <div className="createTodoForm">
        <input
          type="text"
          ref={inputRef}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onCreateTodo();
            }
          }}
        />
        <button onClick={onCreateTodo}>추가</button>
      </div>

      <div className="todoList">
        {todoList.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            content={todo.content}
            onUpdateTodo={onUpdateTodo}
            onDeleteTodo={onDeleteTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
