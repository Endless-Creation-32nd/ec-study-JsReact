import { memo, useEffect, useRef, useState } from "react";

const Todo = ({ id, content, onUpdateTodo, onDeleteTodo }) => {
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef();

  const handleUpdateTodo = () => {
    onUpdateTodo({ id, content: inputRef.current.value });
    inputRef.current.value = "";
    setEditMode(false);
  };

  useEffect(() => {
    console.log("Todo #", id, " 등장");
  }, []);

  return (
    <div className="todo">
      {editMode ? (
        <>
          <input type="text" ref={inputRef} placeholder={content} />
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
                onDeleteTodo(id);
              }}
            >
              삭제
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(Todo);
