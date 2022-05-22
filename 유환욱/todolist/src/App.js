import { React, useState, useRef } from 'react';
import './App.css';
import Button from './components/Button';
import Div from './components/Div';
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
    if (inputRef.current.value === '') {
      return;
    }
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

  const changeChecked = (id) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  return (
    <Div className='App'>
      <h2>투두리스트</h2>
      <Div className='createTodoForm'>
        <input
          type='text'
          ref={inputRef}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              createTodo();
            }
          }}
        ></input>
        <Button onClick={createTodo}>추가</Button>
      </Div>
      <Div className='todoList'>
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
      </Div>
    </Div>
  );
}

export default App;
