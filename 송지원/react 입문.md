# react 입문
### 01 react - 라이브러리
리액트는 어떠한 상태가 바뀌었을때, 그 상태에 따라 DOM 을 어떻게 업데이트 할 지 규칙을 정하는 것이 아니라, 아예 날려버리고 처음부터 모든걸 새로 만들어서 보여준다면 어떨까? 라는 아이디어에서 시작됨.
<br>**Virtual DOM** 사용
<br>Virtual DOM: 가상의 DOM, 그냥 JavaScript 객체이기 때문에 작동 성능이 실제로 브라우저에서 DOM 을 보여주는 것 보다 속도가 훨씬 빠름.
<p>
리액트를 사용하며 "업데이트를 어떻게 할 지" 에 대한 고민을 하지 않으면서, 빠른 성능도 지킬 수 있음.
<br>
<h3> 03 리액트 컴포넌트 </h3>
<pre>
<code>
import React from 'react';
//리액트 불러오기

function Hello() {
  return <div>안녕하세요</div>
}

export default Hello; 
//Hello 라는 컴포넌트를 내보내겠다.
</code>
</pre>
<pre>
<code>
import React from 'react';
//리액트 불러오기
App.js
import Hello from './Hello';

function App() {
  return (
    <div>
      <Hello />
    </div>
  );
}

export default App;
</code>
</pre>
쉽게 재사용 가능
<pre>
<code>
import React from 'react';
import Hello from './Hello';

function App() {
  return (
    <div>
      <Hello />
      <Hello />
      <Hello />
    </div>
  );
}

export default App;

</code>
</pre>
<h3> 04 JSX의 기본 규칙 </h3>
JSX는 생김새를 정의할때 사용하는 문법
<br> 태그를 열었다면 꼭 닫아주어야 함
<br>
<h3> Self closing 태그 </h3>
<pre>
<code>
import React from 'react';
import Hello from './Hello';

function App() {
  return (
    <div>
      <Hello />
      <Hello />
      <Hello />
      <input />
      <br />
    </div>
  );
}

export default App;

</code>
</pre>
<h3> JSX 안에 자바스크립트 값 사용하기</h3>
jsx 내부에 자바스크립트 변수를 보여줘야 할 때에 {} 으로 감싸야 함.
<pre>
<code>
import React from 'react';
import Hello from './Hello';

function App() {
  const name = 'react';
  return (
    <>
      <Hello />
      <div>{name}</div>
    </>
  );
}

export default App;

</code>
</pre>
<h3> style과 className</h3>
html에서 설정하는 방법과 다르다.
<pre>
<code>
import React from 'react';
import Hello from './Hello';

function App() {
  const name = 'react';
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: 24, // 기본 단위 px
    padding: '1rem' // 다른 단위 사용 시 문자열로 설정
  }

  return (
    <>
      <Hello />
      <div style={style}>{name}</div>
    </>
  );
}

export default App;

</code>
</pre>
<h3> 주석</h3>
{/* 이런 형태로 */} 작성함
<br>//도 가능
<br>
<h3> 05 props를 통해 컴포넌트에게 값 전달하기</h3>
props: properties 의 줄임말
<br>우리가 어떠한 값을 컴포넌트에게 전달해줘야 할 때, props를 사용함.
<pre>
<code>
import React from 'react';

function Hello(props) {
  return <div>안녕하세요 {props.name}</div>
}

export default Hello;

</code>
</pre>
props는 객체 형태로 전달되며, name 값을 조회하고 싶다면 props.name을 조회하면 됨.
<h3> 여러개의 props, 비구조화 할당</h3>

<pre>
<code>
import React from 'react';

function Hello(props) {
  return <div style={{ color: props.color }}>안녕하세요 {props.name}</div>
}

export default Hello;
</code>
</pre>
비구조화 할당--> 코드를 조금 더 간결하게 작성하는 법
<pre>
<code>
import React from 'react';

function Hello({ color, name }) {
  return <div style={{ color }}>안녕하세요 {name}</div>
}

export default Hello;
</code>
</pre>
<h3> 07 useState 를 통해 컴포넌트에서 바뀌는 값 관리하기</h3>
<pre>
<code>
import React from 'react';

function Counter() {
  return (
    <div>
      <h1>0</h1>
      <button>+1</button>
      <button>-1</button>
    </div>
  );
}

export default Counter;
</code>
</pre>
<pre>
<code>
import React from 'react';
import Counter from './Counter';

function App() {
  return (
    <Counter />
  );
}

export default App;
</code>
</pre>
<pre>
<code>
import React from 'react';

function Counter() {
  const onIncrease = () => {
    console.log('+1')
  }
  const onDecrease = () => {
    console.log('-1');
  }
  return (
    <div>
      <h1>0</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
</code>
</pre>
<h3> useState </h3>
<pre>
<code>
import React, { useState } from 'react';
//리액트 패키지에서 useState 함수 호출

function Counter() {
  const [number, setNumber] = useState(0);
//배열 비구조화 할당
  const onIncrease = () => {
    setNumber(number + 1);
  }

  const onDecrease = () => {
    setNumber(number - 1);
  }

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
</code>
</pre>
<h3> 08 input 상태 관리하기 </h3>
<pre>
<code>
import React from 'react';

function InputSample() {
  return (
    <div>
      <input />
      <button>초기화</button>
      <div>
        <b>값: </b>
      </div>
    </div>
  );
}

export default InputSample;
</code>
</pre>
<pre>
<code>
import React from 'react';
import InputSample from './InputSample';

function App() {
  return (
    <InputSample />
  );
}

export default App;
</code>
</pre>
input 에 입력하는 값이 하단에 나타나게 하고, 초기화 버튼을 누르면 input 이 값이 비워지도록 구현함.
<pre>
<code>
import React, { useState } from 'react';

function InputSample() {
  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onReset = () => {
    setText('');
  };
//input 태그의 value값을 설정해주어야 함.
상태가 바뀌었을 때 input의 내용도 업데이트 됨.
  return (
    <div>
      <input onChange={onChange} value={text}  />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: {text}</b>
      </div>
    </div>
  );
}

export default InputSample;
</code>
</pre>
<h3> 09 여러개의 input 상태 관리하기</h3>
input 에 name 을 설정하고 이벤트가 발생했을 때 이 값을 참조하는 방법이 좋음.
<pre>
<code>
import React, { useState } from 'react';

function InputSample() {
  const [inputs, setInputs] = useState({
    name: '',
    nickname: ''
  });

  const { name, nickname } = inputs; // 비구조화 할당을 통해 값 추출

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    //새로운 객체 생성
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  };

  const onReset = () => {
    setInputs({
      name: '',
      nickname: '',
    })
  };


  return (
    <div>
      <input name="name" placeholder="이름" onChange={onChange} value={name} />
      <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname}/>
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  );
}

export default InputSample;
</code>
</pre>

결론:  리액트에서 객체를 업데이트하게 될 때에는 기존 객체를 직접 수정하면 안되고, 새로운 객체를 만들어서, 새 객체에 변화를 주어야 함.
