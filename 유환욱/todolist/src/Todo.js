import { React, useEffect, useState, useRef, memo } from 'react';

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
    updateTodo({ id, content: inputRef.current.value, checked });
    inputRef.current.value = '';
    setEditMode(false);
  };

  useEffect(() => {
    console.log('Todo #', id, ' 등장', checked);
  });

  return (
    <div className='todo'>
      {editMode ? (
        <>
          <input type='text' ref={inputRef} autoFocus placeholder={content} />
          <div>
            <button onClick={handleUpdateTodo}>완료</button>
          </div>
        </>
      ) : (
        <>
          {content}
          <div>
            <button
              onClick={() => {
                setEditMode(true);
              }}
            >
              수정
            </button>
            <button
              onClick={() => {
                deleteTodo(id);
              }}
            >
              삭제
            </button>
            <input
              type='checkbox'
              onChange={() => {
                changeChecked();
              }}
            ></input>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(Todo);
