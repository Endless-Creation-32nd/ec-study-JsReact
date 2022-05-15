import { React, useState, useRef } from 'react';
import './App.css';
import Todo from './Todo';

function App() {
  const [todoList, setTodoList] = useState([
    {
      id: 1234,
      content: '공부',
      checked: false,
    },
  ]);
  const inputRef = useRef();

  const createTodo = () => {
    setTodoList(
      todoList.concat({
        id: parseInt(Math.random(6) * 1000000),
        content: inputRef.current.value,
        checked: false,
      })
    );
    inputRef.current.value = '';
    inputRef.current.focus();
  };

  const updateTodo = ({ id, content, checked }) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, content, checked } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const changeChecked = () => {
    setTodoList(
      todoList.map((todo) =>
        todo.checked === true
          ? { ...todo, checked: false }
          : { ...todo, checked: true }
      )
    );
  };

  return (
    <div className='App'>
      <div className='createTodoForm'>
        <input type='text' ref={inputRef} autoFocus></input>
        <button onClick={createTodo}>추가</button>
      </div>

      <div className='todoList'>
        {todoList.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            content={todo.content}
            checked={todo.checked}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            changeChecked={changeChecked}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
