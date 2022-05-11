import React from 'react';

function createTodo() {
    return(
        <div>
            <input type='text' placeholder='해야할 일' value={todoText}></input>
            <button>등록</button>
        </div>
    )
}



export default createTodo;