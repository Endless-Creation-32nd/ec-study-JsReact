# 1-16

## useEffect를 사용하여 마운트/언마운트/업데이트시 할 작업 설정하기

useEffect 역시 Hook의 일종이다.

컴포넌트가 마운트 됐을 때 (처음 나타났을 때), 언마운트 됐을 때 (사라질 때),

그리고 업데이트 될 때 (특정 props가 바뀔 때) 특정 작업을 처리하는 방법을 담고 있다.

`useEffect` 를 사용할 때 첫번째 파라미터에 함수, 두번째 파라미터에는 의존값이 들어있는 배열(`deps`)을 넣는다.

useEffect의 성능 최적화 - [https://ko.reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects](https://ko.reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects)

### 마운트/언마운트

```jsx
function User({ user, onRemove, onToggle }) {
  useEffect(() => {
    console.log('컴포넌트가 화면에 나타남');
    return () => {
      console.log('컴포넌트가 화면에서 사라짐');
    };
  }, []);
```

만약 `deps` 배열을 비우게 된다면, 컴포넌트가 처음 나타날 때만 `useEffect` 에 등록한 함수가 호출된다.

`useEffect` 에서는 함수를 반환 할 수 있는데 이를 `cleanup` 함수라고 부른다.

`cleanup` 함수는 `useEffect` 에 대한 뒷정리를 해준다.

`deps` 가 비어있는 경우에는 컴포넌트가 사라질때 호출된다.

마운트 시에 하는 작업

- `props` 로 받은 값을 컴포넌트의 로컬 상태로 설정
- 외부 API 요청 (REST API 등)
- 라이브러리 사용 (D3, Video.js 등...)
- setInterval 을 통한 반복작업 혹은 setTimeout 을 통한 작업 예약

언마운트 시에 하는 작업

- setInterval, setTimeout 을 사용하여 등록한 작업들 clear 하기 (clearInterval, clearTimeout)
- 라이브러리 인스턴스 제거

### deps에 특정 값 넣기

`deps`에 특정 값을 넣으면 컴포넌트가 처음 마운트 될 때 뿐만 아니라 지정한 값이 바뀔 때에도 호출이 된다. 언마운트시에도 호출이 되고, 값이 바뀌기 직전에도 호출이 된다.

```jsx
function User({ user, onRemove, onToggle }) {
  useEffect(() => {
    console.log('user 값이 설정됨');
    console.log(user);
    return () => {
      console.log('user 가 바뀌기 전..');
      console.log(user);
    };
  }, [user]);
```

만약 `useEffect` 안에서 사용하는 상태나, props가 있다면 `useEffect` 의 `deps` 에 넣어주어야 한다.

그렇지 않으면 최신 상태, props를 가르키지 않는다.

### deps 파라미터를 생략하기

`deps` 파라미터를 생략하면 컴포넌트가 리렌더링 될 때마다 호출이 된다.

```jsx
function User({ user, onRemove, onToggle }) {
  useEffect(() => {
    console.log(user);
  });
```

# 1-17

## useMemo를 사용하여 연산한 값 재사용하기

성능 최적화를 위하여 연산된 값을 `useMemo` 라는 Hook을 사용하여 재사용한다.

```jsx
function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter((user) => user.active).length;
}
```

`countActiveUsers` 라는 함수를 만들어서 `active` 값이 `true` 인 사용자의 수를 세어 화면에 렌더링.

+저번에 배웠던 filter함수를 사용해서 `active` 값이 `true` 인 새로운 배열의 길이를 렌더링한다.

- useMemo 사용 X

```jsx
const count = countActiveUsers(users);
```

`useMemo` 를 사용하지 않으면 input의 값을 바꿀때도 `countActiveUsers` 함수가 호출된다.

⇒ `users` 에 변화가 있을 때만 활성 사용자 수를 세어야 하는데 input 값이 바뀔 때에도 컴포넌트가 리렌더링 되기 때문에 불필요할 때에도 호출되어 자원이 낭비된다.

- useMemo 사용 O

```jsx
const count = useMemo(() => countActiveUsers(users), [users]);
```

`useMemo`의 첫 번째 파라미터에는 연산을 정의하는 함수를 넣어주고, 두 번째 파라미터에는 `deps` 배열을 넣어준다.

⇒ 이 배열 안에 넣은 내용이 바뀌면 : 우리가 등록한 함수를 호출해서 값을 연산해준다.

⇒ 이 배열 안에 넣은 내용이 바뀌지 않으면 : 이전에 연산한 값을 재사용한다.

# 1-18

## useCallback을 사용하여 함수 재사용하기

`useMemo` 는 특정 결과값을 재사용 할 때 사용하는 반면,

`useCallback` 은 특정 함수를 새로 만들지 않고 재사용하고 싶을 때 사용한다.

- `useCallback` 사용 X

```jsx
const onCreate = () => {
  const user = {
    id: nextId.current,
    username,
    email,
  };
  setUsers(users.concat(user));

  setInputs({
    username: '',
    email: '',
  });
  nextId.current += 1;
};

const onRemove = (id) => {
  setUsers(users.filter((user) => user.id !== id));
};
const onToggle = (id) => {
  setUsers(
    users.map((user) =>
      user.id === id ? { ...user, active: !user.active } : user
    )
  );
};
```

이전에 만들었던 `onCreate`, `onRemove`, `onToggle` 함수들은 컴포넌트가 리렌더링 될 때 마다 새로 만들어진다. 함수를 선언하는 것 자체가 메모리나 CPU를 많이 차지하는 작업은 아니지만

<aside>
💡 한번 만든 함수를 필요할때만 새로 만들고 재사용하는 것은 중요하다

</aside>

⇒ 나중에 컴포넌트에서 `props` 가 바뀌지 않으면 Virtual DOM에 새로 렌더링하는 것조차 하지 않고 컴포넌트의 결과물을 재사용하는 최적화 작업을 할텐데 이 때 함수의 재사용이 필수!

- `useCallback` 사용 O

```jsx
const onCreate = useCallback(() => {
  const user = {
    id: nextId.current,
    username,
    email,
  };
  setUsers(users.concat(user));

  setInputs({
    username: '',
    email: '',
  });
  nextId.current += 1;
}, [users, username, email]);

const onRemove = useCallback(
  (id) => {
    setUsers(users.filter((user) => user.id !== id));
  },
  [users]
);
const onToggle = useCallback(
  (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  },
  [users]
);
```

❗ 함수 안에서 사용하는 상태 , `props` 가 있다면 꼭 `deps` 배열 안에 포함시켜야 한다.

그렇지 않으면 함수 내에서 해당 값들을 참조할 때 가장 최신의 값이라고 보장할 수 없다.

- uscCallback에서 deps안에 필요한 값에는 무엇이 있을까?

  함수 안에서 사용하는 props나 상태를 포함시켜야한다.

# 1-19

## React.memo 를 사용한 컴포넌트 리렌더링 방지

`React.momo` : 컴포넌트의 `props`가 바뀌지 않았다면, 리렌더링을 방지하여 컴포넌트의 리렌더링 성능 최적화를 해줄 수 있다.

CreateUser.js

```jsx
import React from 'react';

const CreateUser = ({ username, email, onChange, onCreate }) => {
  return (
    <div>
      <input
        name='username'
        placeholder='계정명'
        onChange={onChange}
        value={username}
      />
      <input
        name='email'
        placeholder='이메일'
        onChange={onChange}
        value={email}
      />
      <button onClick={onCreate}>등록</button>
    </div>
  );
};

export default React.memo(CreateUser);
```

UserList.js

```jsx
import React from 'react';

const User = React.memo(function User({ user, onRemove, onToggle }) {
  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black',
        }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
});

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map((user) => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default React.memo(UserList);
```

이렇게 React.memo로 감싸주면 input을 수정할 때 하단의 UserList가 리렌더링 되지 않는다.

❗그런데 User 중 하나라도 수정하면 모든 User들이 리렌더링 되고, CreateUser도 리렌더링 된다.

⇒ users 배열이 바뀔 때마다 `onCreate`, `onRemove`, `onToggle` 이 새로 만들어지기 때문이다.

    `deps` 에 `users` 가 들어가 있기 때문에 배열이 바뀔 때마다 함수들이 새로 만들어지는건 당연.

💡이것도 최적화하고싶다면?

`deps` 에서 `users` 를 지우고, 함수들에서 현재 `useState`로 관리하는 `users`를 참조하지 않게 하는 방법이 있다. ⇒ `useState` 의 함수형 업데이트를 통해 가능!

함수형 업데이트를 하게 되면 `setUsers` 에 등록하는 콜백함수의 파라미터에서 최신 `users` 를 참조 할 수 있기 때문에 `deps` 에 `users` 를 넣지 않아도 된다.

콜백 측에서는 `deps`안에 바뀐 state들이 들어있지 않아서 리렌더링을 진행하지 않는다.

onCreate 함수

```jsx
const onCreate = useCallback(() => {
  const user = {
    id: nextId.current,
    username,
    email,
  };
  setUsers((users) => users.concat(user));

  setInputs({
    username: '',
    email: '',
  });
  nextId.current += 1;
}, [username, email]);
```

이렇게까지 해주면 최적화 끝!

- `useCallback`, `useMemo`, `React.memo` 는 컴포넌트의 성능을 실제로 개선할 수 있는 상황에서만 사용. (ex. `button` 에 `onClick` 으로 설정해준 함수들은 리렌더링을 막을 수 없다.)
- 렌더링 최적화 하지 않을 컴포넌트에 React.memo를 사용하는 것은 불필요한 추가행동이다.

- 배열이 바뀔때마다 함수가 새로 만들어지는 것을 최적화 하기 위한 방법은?
  함수형 업데이트를 통해 콜백함수의 파라미터에서 최신 users를 참조할 수 있기 때문에 deps에 users를 넣지 않아도 된다.

1-20

## useReducer 를 사용하여 상태 업데이트 로직 분리하기

상태를 관리할때 `useState` 대신 `useReducer` 를 사용하여 컴포넌트의 상태 업데이트 로직을 컴포넌트에서 분리시킬 수 있다.

장점 : 상태 업데이트 로직을 컴포넌트 바깥에 작성 할 수 있다.

     다른 파일에 작성 후 불러와서 사용할 수도 있다.

```jsx
function reducer(state, action) {
  // 새로운 상태를 만드는 로직
  // const nextState = ...
  return nextState; //반환하는 상태는 컴포넌트가 지닐 새로운 상태
}
```

`reducer` 는 현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수.

`action` 은 업데이트를 위한 정보를 가지고 있다.

```jsx
// 카운터에 1을 더하는 액션
{
  type: 'INCREMENT'
}
// 카운터에 1을 빼는 액션
{
  type: 'DECREMENT'
}
// input 값을 바꾸는 액션
{
  type: 'CHANGE_INPUT',
  key: 'email',
  value: 'tester@react.com'
}
// 새 할 일을 등록하는 액션
{
  type: 'ADD_TODO',
  todo: {
    id: 1,
    text: 'useReducer 배우기',
    done: false,
  }
}
```

`useReducer` 의 사용법

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

`state` 는 컴포넌트에서 사용할 수 있는 상태

`dispatch` 는 액션을 발생시키는 함수 ⇒ `dispatch({ type:'INCREMENT' })` 의 형식으로 사용.

`useReducer` 에 넣는 첫번째 파라미터는 reducer 함수이고 두번째 파라미터는 초기 상태.

- Counter.js

```jsx
import React, { useState } from 'react';

function Counter() {
  const [number, setNumber] = useState(0);

  const onIncrease = () => {
    setNumber((prevNumber) => prevNumber + 1);
  };

  const onDecrease = () => {
    setNumber((prevNumber) => prevNumber - 1);
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
```

- `useReducer` 로 구현한 Counter.js

```jsx
import React, { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

function Counter() {
  const [number, dispatch] = useReducer(reducer, 0);

  const onIncrease = () => {
    dispatch({ type: 'INCREMENT' });
  };

  const onDecrease = () => {
    dispatch({ type: 'DECREMENT' });
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
```

- `useReducer` 로 구현한 최종 App.js

```jsx
import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter((user) => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: '',
  },
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false,
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value,
        },
      };
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user),
      };
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const { users } = state;
  const { username, email } = state.inputs;

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value,
    });
  }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    nextId.current += 1;
  }, [username, email]);

  const onToggle = useCallback((id) => {
    dispatch({
      type: 'TOGGLE_USER',
      id,
    });
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({
      type: 'REMOVE_USER',
      id,
    });
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
```

⭐상황에 맞게 `useReducer` 과 `useState` 를 사용하자!

- useReducer의 장점은?
  상태 업데이트 로직을 컴포넌트 바깥에 작성 할 수 있다, 다른 파일에 작성 후 불러와서 사용할 수도 있다.

# 1-21

## 커스텀 HOOKS 만들기

컴포넌트를 만들다보면 반복되는 로직이 자주 발생한다.

그러한 상황에 커스텀 Hooks를 만들어서 반복되는 로직을 쉽게 재사용 할 수 있다.

아래의 예시는 input을 관리하는 코드가 관리할 때마다 비슷한 코드가 반복되기 때문에 커스텀 Hooks를 통해 기능을 구현하는 과정이다.

useInputs.js

```jsx
import { useState, useCallback } from 'react';

function useInputs(initialForm) {
  const [form, setForm] = useState(initialForm);
  // change
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }, []);
  const reset = useCallback(() => setForm(initialForm), [initialForm]);
  return [form, onChange, reset];
}

export default useInputs;
```

useInputs.js (useReducer 버전)

```jsx
import { useCallback, useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        [action.name]: action.value,
      };
    case 'RESET':
      return Object.keys(state).reduce((acc, current) => {
        acc[current] = '';
        return acc;
      }, []);
    default:
      return state;
  }
}

function useInputs(initialForm) {
  const [form, setForm] = useReducer(reducer, initialForm);
  // change
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({ type: 'CHANGE', name, value });
  }, []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);
  return [form, onChange, reset];
}

export default useInputs;
```

App.js

```jsx
import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './hooks/useInputs';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter((user) => user.active).length;
}

const initialState = {
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false,
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_USER':
      return {
        users: state.users.concat(action.user),
      };
    case 'TOGGLE_USER':
      return {
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      };
    case 'REMOVE_USER':
      return {
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      return state;
  }
}

function App() {
  const [{ username, email }, onChange, reset] = useInputs({
    username: '',
    email: '',
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const { users } = state;

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    reset();
    nextId.current += 1;
  }, [username, email, reset]);

  const onToggle = useCallback((id) => {
    dispatch({
      type: 'TOGGLE_USER',
      id,
    });
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({
      type: 'REMOVE_USER',
      id,
    });
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
```

- 커스텀 Hooks를 사용하는 이유는?
  반복되는 로직을 쉽게 재사용하기 위해서
