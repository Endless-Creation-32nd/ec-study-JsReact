import React , { useRef, useState} from 'react';
import './App.css';
import Todo from "./Todo";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트 공부하기',
      check: false,
      edit: false
    }
  ]
  );

  const inputRef = useRef();
  const nextId = useRef(2);

  const onCreate = () => {
    const todo = {
      id: nextId.current,
      text: inputRef.current.value,
      check: false,
      edit: false,
    }

    setTodos(todos => todos.concat(todo))
    inputRef.current.value = "";
    inputRef.current.focus();
    

    nextId.current += 1;
  };

  const onRemove = id => {
    setTodos(todos => todos.filter(todo => todo.id !== id))
  };

  const onEdit = (id, newText) => {
    setTodos(todos => todos.map(todo => todo.id === id
      ? {...todo, text: newText, edit: false} : todo))
  };

  const onEditMode = id => {
    setTodos(todos => todos.map(todo => todo.id === id
      ? {...todo, edit: true} : todo))
  };

  const onCheck = id => {
    setTodos(todos => todos.map(todo => todo.id === id
      ? {...todo, check: !todo.check} : todo))
  };

  return (
    <div className='App'>
      <h1>TodoList!</h1>
      <div className='createTodoForm'>
      <input type='text' placeholder='해야할 일' ref={inputRef}></input>
      <button onClick={onCreate}>추가</button>
      </div>
      <div className='todoList'>
        {todos.map(todo => (
        <Todo
        id={todo.id}
        text={todo.text}
        check={todo.check}
        edit={todo.edit}
        onRemove={onRemove}
        onEdit={onEdit}
        onEditMode={onEditMode}
        onCheck={onCheck}
      />
      ))}
      </div>
    </div>
    );
}

export default App;
