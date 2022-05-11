import React , { userRef, useState} from 'react';
import createTodo from './createTodo'
import './App.css';

function App() {
  const [todos, settodo] = useState([
    {
      id: 1,
      todoText: '리액트 공부하기',
      check: false
    }
  ]
  );

  const [inputs, setInputs] = useState({
    todoText: '',
    check: false
  });

  const nextId = userRef(2);

  return (
    <div>
      <h1>TodoList!</h1>
      <createTodo
      
      onCreate={onCreate}
      />
    </div>
  );
}

export default App;
