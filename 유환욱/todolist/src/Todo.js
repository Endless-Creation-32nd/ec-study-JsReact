import { React, useEffect, useState, useRef, memo } from 'react';
import Button from './components/Button';
import Div from './components/Div';

const Todo = ({
  id,
  content,
  checked,
  deleteTodo,
  updateTodo,
  changeChecked,
}) => {
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef();

  const handleUpdateTodo = () => {
    if (inputRef.current.value === '') {
      return;
    }
    updateTodo({ id, content: inputRef.current.value, checked });
    inputRef.current.value = '';
    setEditMode(false);
  };

  useEffect(() => {
    console.log('Todo #', id, ' 등장', checked);
  });

  return (
    <Div className='todo'>
      {editMode ? (
        <>
          <input
            type='text'
            ref={inputRef}
            autoFocus
            placeholder={content}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleUpdateTodo();
              }
            }}
          />
          <Div>
            <Button onClick={handleUpdateTodo}>완료</Button>
          </Div>
        </>
      ) : (
        <>
          {content}
          <Div>
            <Button
              onClick={() => {
                setEditMode(true);
              }}
            >
              수정
            </Button>
            <Button
              onClick={() => {
                deleteTodo(id);
              }}
            >
              삭제
            </Button>
            <input
              type='checkbox'
              onChange={() => {
                changeChecked(id);
              }}
            ></input>
          </Div>
        </>
      )}
    </Div>
  );
};

export default memo(Todo);
