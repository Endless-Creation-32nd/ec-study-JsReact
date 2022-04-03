# JavaScript 입문 - 2장

## 1. 삼항연산자

```javascript
const array = [];
let text = '';
if (array.length === 0) {
  text = '배열이 비어있습니다.';
} else {
  text = '배열이 비어있지 않습니다.';
}
console.log(text);
```

위의 코드를 삼항 연산자를 이용하여 다음과 같이 간단히 작성할 수 있다.

```javascript
const array = [];
let text =
  array.length === 0 ? '배열이 비어있습니다' : '배열이 비어있지 않습니다.';

console.log(text);
```

- 삼항 연산자 사용법

```javascript
조건 ? true : false;
```

- 삼항 연산자의 중첩은 가독성이 좋지 않을 수도 있음 -> if문으로 처리

## 2. Truthy and Falsy

```javascript
function print(person) {
  if (person === undefined || person === null) {
    console.log('person이 없네요');
    return;
  }
  console.log(person.name);
}

const person = null;
print(person);
```

- 위의 코드는 `person`이 `undefined` 이거나, `null`인 상황의 오류를 대비하기 위한 코드이다.
- 아래의 코드처럼 축약해서 작성 가능하다.

```javascript
function print(person) {
  if (!person) {
    console.log('person이 없네요');
    return;
  }
  console.log(person.name);
}

const person = null;
print(person);
```

이렇게 축약이 가능한 이유 : `undefined` 와 `null` 은 Falsy한 값이기 때문이다.

```javascript
const value = { a: 1 };
if (value) {
  console.log('value 가 Truthy 하네요.');
}
```

- 위의 코드는 `value`가 Truthy한 값이기 때문에 콘솔에 메세지를 출력하는 코드이다.
- 만약 `value`가 `null`,`undefined`, 0, NaN 중 하나라면 무엇이 출력될까 ? A. 출력 안됨

## 3. 단축 평가 (short-circuit evaluation) 논리 계산법

- 단축 평가 논리 계산법은 논리 연산자를 유용하게 사용하는 방법이라고 생각하면 된다.

```javascript
const dog = {
  name: '멍멍이',
};

function getName(animal) {
  return animal.name;
}

const name = getName(dog);
console.log(name); // 멍멍이
```

Q. 위 코드의 출력결과는? , getName의 파라미터에 객체가 주어지지 않는다면 출력결과는?  
A. 멍멍이, 오류 발생 (animal 객체가 undefined이기 때문에 name 조회 불가)

수정 코드:

```javascript
const dog = {
  name: '멍멍이',
};

function getName(animal) {
  if (animal) {
    // animal 값이 주어지지 않아도 에러 발생 X
    return animal.name;
  }
  return undefined;
}

const name = getName();
console.log(name);
```

수정 코드 단축 :

```javascript
const dog = {
  name: '멍멍이',
};

function getName(animal) {
  return animal && animal.name; // animal이 Truthy한 값이라면 B가 결과값
} // animal이 Falsy 한 값이라면 A가 결과값

const name = getName();
console.log(name); // animal이 undefined이므로 Falsy -> animal이 결과값 -> undefined
```

## 4. 함수의 기본 파라미터

원의 넓이 구하는 함수:

```javascript
function calculateCircleArea(r) {
  return Math.PI * r * r;
}

const area = calculateCircleArea();
console.log(area); // NaN -> undefined * undefined 곱셈 결과
```

ES6 이전 수정:

```javascript
function calculateCircleArea(r) {
  const radius = r || 1;
  return Math.PI * radius * radius;
}

const area = calculateCircleArea();
console.log(area); // 3.141592653589793
```

ES6 이후 수정:

```javascript
function calculateCircleArea(r = 1) {
  // 함수의 기본 파라미터 문법
  return Math.PI * r * r;
}

const area = calculateCircleArea();
console.log(area); // 3.141592653589793
```

## 5. 조건문 더 스마트하게 쓰기

### 특정 값이 여러 값 중 하나인지 확인해야 할 때

```javascript
function isAnimal(text) {
  return (
    text === '고양이' || text === '개' || text === '거북이' || text === '너구리'
  ); // 비교 값이 많아질 경우 코드의 길이도 증가
}

console.log(isAnimal('개')); // true
console.log(isAnimal('노트북')); // false
```

수정 코드1(배열 생성, 배열 includes 함수 사용):

```javascript
function isAnimal(name) {
  const animals = ['고양이', '개', '거북이', '너구리'];
  return animals.includes(name);
}

console.log(isAnimal('개')); // true
console.log(isAnimal('노트북')); // false
```

수정 코드2(배열 선언 생략, 화살표 함수):

```javascript
const isAnimal = (name) => ['고양이', '개', '거북이', '너구리'].includes(name);

console.log(isAnimal('개')); // true
console.log(isAnimal('노트북')); // false
```

수정 코드2는 코드가 짧고 간단해 보여서 무조건적으로 좋다고 느낄 수 있지만, 읽었을 때 어떤 역할을 하는지 잘 이해가 될 수 있어야 좋은 코드라고 할 수 있다.

### 값에 따라 다른 결과물을 반환해야 할 때

if문과 switch문을 통해 작성하는것도 좋지만 깔끔하게 해결할 방법이 다음과 같다.

```javascript
function getSound(animal) {
  const sounds = {
    // 객체를 활용
    개: '멍멍!',
    고양이: '야옹~',
    참새: '짹짹',
    비둘기: '구구 구 구',
  };
  return sounds[animal] || '...?'; // 단축 평가 논리 계산법
}

console.log(getSound('개')); // 멍멍!
console.log(getSound('비둘기')); // 구구 구 구
```

## 6. 비구조화 할당(구조분해) 문법

사용 예시)

```javascript
const object = { a: 1, b: 2 };

const { a, b } = object;

console.log(a); // 1
console.log(b); // 2
```

```javascript
const object = { a: 1, b: 2 };

function print({ a, b }) {
  //함수의 파라미터에서 비구조화 할당
  console.log(a);
  console.log(b);
}

print(object);
```

비구조화 할당시 기본값 설정

```javascript
const object = { a: 1 };

function print({ a, b = 2 }) {
  console.log(a);
  console.log(b);
}

print(object);
// 1
// 2
```

비구조화 할당시 이름 바꾸기

```javascript
const animal = {
  name: '멍멍이',
  type: '개',
};

const { name: nickname } = animal; // animal.name 값을 nickname으로 : 문자를 이용해 변경
console.log(nickname);
```

배열 비구조화 할당

```javascript
const array = [1, 2];
const [one, two] = array;

console.log(one);
console.log(two);
```

깊은 값 비구조화 할당  
사용 예시 1)

```javascript
const deepObject = {
  //객체 안의 깊은 값이 있을 때
  state: {
    information: {
      name: 'velopert',
      languages: ['korean', 'english', 'chinese'],
    },
  },
  value: 5,
};

const { name, languages } = deepObject.state.information; // 비구조화 할당 두번 사용
const { value } = deepObject;

const extracted = {
  name,
  languages,
  value,
};

console.log(extracted); // {name: "velopert", languages: Array[3], value: 5}
```

사용 예시 2)

```javascript
const deepObject = {
  state: {
    information: {
      name: 'velopert',
      languages: ['korean', 'english', 'chinese'],
    },
  },
  value: 5,
};

const {
  // 객체를 통한 비구조화 할당으로 한번에 추출 가능
  state: {
    information: { name, languages },
  },
  value,
} = deepObject;

const extracted = {
  name,
  languages,
  value,
};

console.log(extracted);
```

## 7. spread와 rest

### spread

```javascript
const slime = {
  name: '슬라임',
};

const cuteSlime = {
  ...slime, // ...문자(spread)를 사용해 기존의 slime의 내용 추가
  attribute: 'cute',
};

const purpleCuteSlime = {
  ...cuteSlime,
  color: 'purple',
};

console.log(slime);
console.log(cuteSlime);
console.log(purpleCuteSlime);
```

배열에서 사용 예시)

```javascript
const numbers = [1, 2, 3, 4, 5];

const spreadNumbers = [...numbers, 1000, ...numbers]; // 여러번 사용 가능
console.log(spreadNumbers); // [1, 2, 3, 4, 5, 1000, 1, 2, 3, 4, 5]
```

### rest

```javascript
const purpleCuteSlime = {
  name: '슬라임',
  attribute: 'cute',
  color: 'purple',
};

const { color, ...rest } = purpleCuteSlime; // rest는 비구조화 할당 문법과 사용됨
console.log(color);
console.log(rest);
```

배열에서 사용 예시)

```javascript
const numbers = [0, 1, 2, 3, 4, 5, 6];

const [one, ...rest] = numbers;

console.log(one);
console.log(rest);
```

함수의 파라미터의 개수가 몇개가 될지 모를경우

```javascript
function sum(...rest) {
  // rest 파라미터를 사용해 간단히 코드 작성
  return rest;
}

const result = sum(1, 2, 3, 4, 5, 6);
console.log(result);
```

### 함수 인자와 spread

파라미터와 인자의 차이

```javascript
const myFunction(a) { // 여기서 a 는 파라미터
  console.log(a); // 여기서 a 는 인자
}

myFunction('hello world'); // 여기서 'hello world' 는 인자
```

```javascript
function sum(...rest) {
  return rest.reduce((acc, current) => acc + current, 0);
}

const numbers = [1, 2, 3, 4, 5, 6];
const result = sum(...numbers);
console.log(result);
```

## 8. 자바스크립트의 Scope에 대한 이해

Scope란? 변수 혹은 함수를 선언하게 될 때 해당 변수 또는 함수가 유효한 범위

- Global(전역) Scope : 코드의 모든 범위 사용가능
- Function(함수) Scope : 함수 안에서만 사용가능
- Block(블록) Scope : if, for, switch 등 특정 블록 내부에서 사용가능

예시1)

```javascript
const value = 'hello!'; // 전역변수

function myFunction() {
  console.log('myFunction: ');
  console.log(value); // 전역변수이기 때문에 함수 안에서 사용 가능
}

function otherFunction() {
  console.log('otherFunction: ');
  const value = 'bye!'; // 함수 내의 변수
  console.log(value); // 함수 안에서만 사용 가능, 밖에서 사용 X
}

myFunction(); // value 출력값 : hello!
otherFunction(); // value 출력값 : bye!

console.log('global scope: ');
console.log(value); // 출력값 : hello!
```

예시2)

```javascript
const value = 'hello!';

function myFunction() {
  const value = 'bye!';
  if (true) {
    const value = 'world';
    console.log('block scope: ');
    console.log(value); // Block 내에서 value 값이 world 이므로 world 출력
  }
  console.log('function scope: ');
  console.log(value); // 함수 내에서 value 값이 bye! 이므로 bye! 출력
}

myFunction();
console.log('global scope: ');
console.log(value); // 전역변수의 값이 hello!이므로 hello! 출력
```

### Hoisting

Hoisting이란 아직 선언되지 않은 함수/변수를 "끌어올려서" 사용할 수 있는 작동방식

```javascript
myFunction(); // 함수 호출 먼저

function myFunction() {
  // 함수 선언을 나중에
  console.log('hello world!');
}
```

위의 코드를 자바스크립트 엔진이 해석하면 다음과 같다.

```javascript
function myFunction() {
  console.log('hello world!');
}

myFunction();
```

변수 역시 Hoisting 가능. 하지만 `var` 을 제외한 `const`와 `let`은 hoisting이 발생하지 않고 에러가 발생하기 때문에 일부러 Hoisting을 할 필요가 없다.
