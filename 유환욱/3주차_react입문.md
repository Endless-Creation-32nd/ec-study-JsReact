# 01.리액트는 어쩌다가 만들어졌을까?

## JavaScript의 UI제어

JavaScript를 사용하여 HTML로 구성한 UI를 제어할 때, DOM(Document Object Model)을 변형시키기 위해서는 특정 DOM을 선택한 뒤, 특정 이벤트가 발생하면 변화를 주도록 설정해야 한다.

```HTML
<h2 id="number">0</h2>
<div>
  <button id="increase">+1</button>
  <button id="decrease">-1</button>
</div>
```

다음과 같이, id를 이용하여 각 DOM을 선택하고 이벤트에 맞춰서 DOM의 속성을 바꿔줘야 한다.

```JavaScript
const number = document.getElementById('number');
const increase = document.getElementById('increase');
const decrease = document.getElementById('decrease');

increase.onclick = () => {
  const current = parseInt(number.innerText, 10);
  number.innerText = current + 1;
};

decrease.onclick = () => {
  const current = parseInt(number.innerText, 10);
  number.innerText = current - 1;
};
```

## React의 시작

위 코드처럼 간단하다면 상관없지만, 인터렉션이 자주 발생하고 이에 따라 동적으로 UI를 표현해야된다면 규칙이 매우 다양해지고 관리가 힘들다  
-> 상태에 따라 DOM을 어떻게 업데이트 할 지 규칙을 정하는 것이 아니라, 다 날려버리고 처음부터 모든걸 새로 만들어서 보여주자!

## Virtual DOM의 등장

- Virtual DOM은 메모리에 가상으로 존재하는 DOM이다.
- 작동 성능이 브라우저에서 DOM을 보여주는 것 보다 속도가 훨씬 빠르다.
- 상태가 업데이트 되면, 업데이트가 필요한 곳의 UI를 Virtual DOM을 통해 렌더링한다.

### 질문

DOM은 무엇이고, 기존의 DOM을 Virtual DOM이 어떤 점에서 개선시켰을까?

### 답

- DOM(Document Object Model)은 XML이나 HTML 문서에 접근하기 위한 일종의 인터페이스이다.
  이 객체 모델은 문서 내의 모든 요소를 정의하고, 각각의 요소에 접근하는 방법을 제공한다.
- 새로운 이벤트가 발생할 때마다 DOM의 제어를 통해 각각의 요소마다 접근했어야 하지만, Virtual DOM은 가상의 DOM으로, 실제로 브라우저에서 보여지는 DOM과 비교를 한 후, 차이가 있는 곳을 감지하여 실제 DOM에 패치를 해줌으로써 업데이트를 어떻게 할지에 대한 고민과 속도에 대한 문제를 해결했다.
- http://www.tcpschool.com/javascript/js_dom_concept

# 03. 나의 첫번째 리액트 컴포넌트

리액트 컴포넌트를 만들땐 다음과 같은 코드를 통하여 리액트를 불러와야 한다.

```JavaScript
import React from 'react';
```

코드의 최하단에 다음과 같은 코드를 통하여 컴포넌트를 내보낼 수 있다.

```JavaScript
export default Hello;
```

이 코드는 Hello라는 컴포넌트를 내보내겠다는 의미이다. 이렇게 하면 다른 컴포넌트에서 불러와 사용할 수 있다.

## 컴포넌트 불러오기 예시

**Hello.js**

```JavaScript
import React from 'react';

function Hello() {
  return <div>안녕하세요</div>
}

export default Hello;
```

**App.js**

```JavaScript
import React from 'react';
import Hello from './Hello';

function App() {
  return (
    <div>
      <Hello />
    </div>              // Hello 컴포넌트 불러와서 사용
  );
}

export default App;
```

**index.js**

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
// id가 root인 DOM 내부에 리액트 컴포넌트를 랜더링

serviceWorker.unregister();
```

### 질문

ReactDOM.render의 역할은 무엇인가?

### 답

브라우저에 있는 실제 DOM 내부에 리액트 컴포넌트를 랜더링해준다.

# 04. JSX의 기본 규칙 알아보기

- JSX는 리액트의 기본 문법
- 리액트 컴포넌트 파일에서 XML 형태로 코드를 작성하면 bable이 JSX를 JavaScript로 변환해준다

### **babel이란?**

babel은 자바스크립트의 문법을 확장해주는 도구.  
지원되지 않는 최신 문법이나 실험적인 자바스크립트 문법들을 정식 자바스크립트 형태로 변환해줌.

[BABEL 사이트](https://bit.ly/2wMpkk2)

## JSX 사용시 지켜야 할 규칙

- 태그는 반드시 닫혀야 한다  
  반례)

  ```JavaScript
  import React from 'react';
  import Hello from './Hello';

  function App() {
    return (
        <div>
        <Hello />
        <Hello />
        <Hello />
        <div>   // 닫히는 태그가 없기 때문에 오류 발생
        </div>
    );
  }
    export default App;
  ```

- 두개 이상의 태그는 반드시 감싸져야한다  
  반례)

  ```JavaScript
  import React from 'react';
  import Hello from './Hello';

  function App() {
  return (
    <Hello />
    <div>오류 코드입니다.</div> // Hello 태그와 div 태그가 감싸져 있지 않아서 오류 발생
  );
  }
  export default App;
  ```

  단순히 감싸기 위해 div 태그를 사용하는것 보다는 리액트의 Fragment를 사용해 <>, </>를 이용하는 것이 좋다.

  수정된 반례)

  ```JavaScript
  import React from 'react';
  import Hello from './Hello';

  function App() {
  return (
  <>
      <Hello />
      <div>올바른 코드입니다.</div>
  </>
  }
  export default App;
  ```

- JSX 안에 자바스크립트 값 사용하기

```JavaScript
import React from 'react';
import Hello from './Hello';

function App() {
  const name = 'react';
  return (
    <>
      <Hello />
      <div>{name}</div>
    </>       // 다음과 같이 name을 {}로 감싸서 표현
  );
}

export default App;
```

- style과 className

  - 인라인 스타일은 객체 형태로 작성하고 background-color 처럼 -로 구분되어 있는 이름들은 backgroundColor처럼 camelCase 형태로 네이밍 해야한다.
  - CSS class를 설정할 때는 `class=` 형태가 아닌 `className=`으로 설정해야한다.

- 주석
  - JSX 내부의 주석은 `{/* ~~~ */}`의 형태로 작성한다.
  - 열리는 태그 내에서는 `//`의 형태로도 주석 작성이 가능하다.

## 질문

태그와 태그 사이에 내용이 들어가지 않을 때 태그를 닫는 방법은 무엇인가?

## 답

Self Closing 태그를 사용하여 열리고 바로 닫히게 한다. ex) `<Hello />`

# 05. props를 통해 컴포넌트에게 값 전달하기

## props 기본 사용법

- Hello 컴포넌트에서 name 값을 사용하고 싶으면 props.name을 조회하면 된다.

**App.js**

```JavaScript
import React from 'react';
import Hello from './Hello';

function App() {
 return (
   <Hello name="react" />
 );
}

export default App;
```

**Hello.js**

```JavaScript
import React from 'react';

function Hello(props) {
  return <div>이름을 props로 나타냅니다. {props.name}</div>
}

export default Hello;
```

- props 내부의 값을 조회할 때마다 `props.` 를 입력해야 하는데 함수의 파라미터에서 비구조화 할당 문법을 사용하면 조금 더 코드를 간결하게 작성 할 수 있다. (+[비구조화 할당](https://learnjs.vlpt.us/useful/06-destructuring.html))

**App.js**

```JavaScript
import React from 'react';
import Hello from './Hello';

function App() {
  return (
    <Hello name="react" color="red"/>
  );
}

export default App;
```

**Hello.js**

```JavaScript
import React from 'react';

function Hello({ color, name }) {
  return <div style={{ color }}>비구조화 할당입니다. {name}</div>
}

export default Hello;
```

- 컴포넌트에 props를 지정하지 않았을때 `defaultProps`라는 값을 통해 기본값을 설정한다.
- 컴포넌트 '태그' 사이에 넣은 값을 조회할 때 `props.children`을 이용한다.

## 질문

비구조화 할당을 사용하여 다음 코드의 ---에 들어갈 내용을 적으세요.  
(Hello.js의 컴포넌트에서 color 값을 조회해서 폰트의 색상으로 설정하고, "안녕하세요 'name값'"을 출력)  
**App.js**

```JavaScript
import React from 'react';
import Hello from './Hello';

function App() {
  return (
    <Hello name="react" color="red"/>
  );
}

export default App;
```

**Hello.js**

```JavaScript
import React from 'react';

function Hello(---){
    return <div style={---}>안녕하세요 ---</div>
}
```

## 답

{ color , name } , { color } , { name }

# 06. 조건부 렌더링

**특정 조건에 따라 다른 결과물을 렌더링 하는 것**  
**App.js**

```JavaScript
import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';

function App(){
    return(
        <Wrapper>
            <Hello name="react" color="red" isSpecial={true}/>
            <Hello color="pink">
        </Wrapper>
    )
}

export default App;
```

**Hello.js**

```JavaScript
import React from 'react';

function Hello({color,name,isSpecial}){
    return(
        <div style={{color}}>
            {isSpecial ? <b>*</b> : null}   {/* isSpecial의 조건에 따라 렌더링 */}
                                            {/* isSpecial && <b>*</b>로도 표현 가능 */}
            안녕하세요 {name}
        </div>
    );
}

Hello.defaultProps={
    name: '이름없음'
}

export default Hello
```

props 값을 설정하게 될 때 props 이름만 작성하고 값 설정을 생략한다면 true로 설정한 것으로 간주한다.

+)[단축 평가 논리 계산법](https://learnjs.vlpt.us/useful/03-short-circuiting.html)

## 질문

JSX에서 ---,---,--- 를 렌더링하면 아무것도 나타나지 않는다. ---에 들어갈 세가지는?

## 답

null, false, undefined

# 07. useState 를 통해 컴포넌트에서 바뀌는 값 관리하기

Hooks -> 함수형 컴포넌트에서 상태 관리를 할 수 있게 해주는 기능.  
useState라는 함수는 Hooks중의 하나이다.  
리액트에서 엘리먼트에 이벤트를 설정해줄때에는 `on이벤트이름={실행하고싶은함수}` 로 설정.

**Counter.js**

```JavaScript
import React, { useState } from 'react';    // useState를 사용하여 컴포넌트에서 상태 관리

function Counter() {
  const [number, setNumber] = useState(0);

  const onIncrease = () => {            // 화살표 함수를 사용하여 구현
    setNumber(number + 1);
  }

  const onDecrease = () => {
    setNumber(number - 1);
  }

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button> {/* button의 onClick으로 각 함수 연결 */}
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
```

**App.js**

```JavaScript
import React from 'react';
import Counter from './Counter';    //Counter 렌더링

function App() {
  return (
    <Counter />
  );
}

export default App;
```

+)[화살표 함수](https://learnjs.vlpt.us/basics/05-function.html#%ED%99%94%EC%82%B4%ED%91%9C-%ED%95%A8%EC%88%98)

## 질문

엘리먼트 이벤트를 설정해줄때 onClick={onIncrease()}의 형태로 함수를 실행하면 안되는 이유는 무엇일까?

## 답

렌더링되는 시점에 함수가 호출되버리기 때문이다  
이벤트를 설정할 때는 '함수타입의 값'을 넣어주어야한다.

# 08. input 상태 관리하기

**InputSample.js**

```JavaScript
import React, { useState } from 'react';

function InputSample() {
  const [text, setText] = useState('');       //useState를 사용해 상태관리 해준다.

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onReset = () => {
    setText('');
  };

  return (
    <div>
      <input onChange={onChange} value={text} />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: {text}</b>
      </div>
    </div>
  );
}

export default InputSample;
```

`e.target`은 이벤트가 발생한 DOM인 Input DOM을 가리킨다.  
즉 `e.target.value`는 Input DOM의 value값을 나타낸다.

**App.js**

```JavaScript
import React from 'react';
import InputSample from './InputSample';

function App() {
  return (
    <InputSample />
  );
}

export default App;
```

## 질문

위의 예시 코드에서 `useState`를 사용할 때 객체의 e.target이 가리키는 것은? 또, e.target.value가 가리키는 것은?

## 답

이벤트가 발생한 input DOM을 가리킨다. input DOM의 `value`값인 입력한 값을 가리킨다.

# 9. 여러개의 input 상태 관리하기

input의 개수가 여러개가 되면 단순히 `useState`를 여러번 사용하고 `onChange`도 여러개 만들어서 구현이 가능하다.  
이보다 더 좋은 방법은 input에 `name`을 설정하고 이벤트가 발생했을 때 이 값을 참조하게 하는 것이다.

**InputSample.js**

```JavaScript
import React, { useState } from 'react';

function InputSample() {
  const [inputs, setInputs] = useState({
    name: '',
    nickname: ''
  });

  const { name, nickname } = inputs; // 비구조화 할당을 통해 값 추출

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
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
```

+) [spread 문법](https://learnjs.vlpt.us/useful/07-spread-and-rest.html)

리액트에서는 다음과 같은 형태로 직접 수정하면 안된다.

```JavaScript
inputs[name] = value;
```

새로운 객체를 만들어서 새로운 객체에 변화를 주고 이를 상태로 사용해주어야한다.

```JavaScript
setInputs({
    ...inputs,
    [name]: value
});
```

## 질문

리액트에서 기존 객체를 직접 수정하면 안되는 이유는?

## 답

리액트는 기본적으로 리액트 컴포넌트에서 상태가 업데이트 됐음을 감지하고 이에 따라 필요한 리렌더링을 진행한다. 하지만 리액트에서 기존 상태를 직접 수정하면 값을 바꿔도 리렌더링이 진행되지 않는다.
