import React , {useRef} from 'react';

function Todo({id, text, check, edit, onRemove, onEdit, onEditMode, onCheck}) {
  const editInputRef = useRef();

  return (
    <div className='todo'>
    <br></br>
    {
      edit ? (
        <input type='text' defaultValue={text} ref={editInputRef}/>
      )
      : (
        check ? (
          <>
          <button onClick={() => onCheck(id)}>☑</button>
          <del>{text}</del>
          </>
        ) : (
          <>
          <button onClick={() => onCheck(id)}>☐</button>
          {text}
          </>
        )
      )
    }
    
    {
      edit ? (
        <button onClick={() => (
          onEdit(id, editInputRef.current.value),
          editInputRef.current.value = "")}>완료</button>
      )
      : (
        <>
        <button onClick={() => onRemove(id)}>삭제</button>
        <button onClick={() => onEditMode(id)}>수정</button>
        </>
      )
    }
    </div>
  )
}
export default Todo;