js 2장
==
삼항연산자
--
```
const array = [];
let text = array.length === 0 ? '배열이 비어있습니다' : '배열이 비어있지 않습니다.';
console.log(text);
```
```
조건 ? true일때 : false일때
```

논리연산자
--
&& and : 모두가 참일때만 참
<br>
|| or : 하나만 참이면 참
```
const dog = {
  name: '멍멍'
};

function getName(animal) {
  return animal && animal.name;
}

const name = getName(dog);
console.log(name); //'멍멍'

console.log(true && 'hello'); // hello
console.log(false && 'hello'); // false
console.log('hello' && 'bye'); // bye
console.log(null && 'hello'); // null
console.log(undefined && 'hello'); // undefined
console.log('' && 'hello'); // ''
console.log(0 && 'hello'); // 0
console.log(1 && 'hello'); // hello
console.log(1 && 1); // 1
```
```
const namelessDog = {
  name: ''
};

function getName(animal) {
  const name = animal && animal.name;
  return name || '이름이 없는 동물입니다.';
}

const name = getName(namelessDog);
console.log(name); // 이름이 없는 동물입니다.
```
화살표 함수
```
const calculateCircleArea = (r = 1) => Math.PI * r * r;

const area = calculateCircleArea();
console.log(area); // 3.141592
```
배열의 include 함수 사용
--
비교해야할 값들이 많을 때 
```
function isAnimal(name) {
  const animals = ['고양이', '개', '거북이', '너구리'];
  return animals.includes(name);
}

console.log(isAnimal('개')); // true
console.log(isAnimal('노트북')); // false
```
switch case 문 사용
```
function getSound(animal) {
  switch (animal) {
    case '개':
      return '멍멍';
    case '고양이':
      return '야옹';
    case '참새':
      return '짹짹';
    case '비둘기':
      return '구구';
    default:
      return '?';
  }
}

console.log(getSound('개')); // 멍멍
console.log(getSound('비둘기')); // 구구
```
객체 사용
```
function getSound(animal) {
  const sounds = {
    개: '멍멍',
    고양이: '야옹',
    참새: '짹짹',
    비둘기: '구구'
  };
  return sounds[animal] || '?';
}

console.log(getSound('개')); // 멍멍
console.log(getSound('비둘기')); // 구구
```
```
function makeSound(animal) {
  const tasks = {
    개() {
      console.log('멍멍');
    },
    고양이() {
      console.log('고양이');
    },
    비둘기() {
      console.log('구구 구 구');
    }
  };
  if (!tasks[animal]) {
    console.log('...?');
    return;
  }
  tasks[animal]();
}

makeSound('개');
makeSound('비둘기');
```
getSound 는 소리를 받아와서 직접 출력
<br>
makeSound 는 함수가 출력
<br><br>

<h2>비구조화 할당</h2>
객체 안에 있는 값을 추출해서 변수 혹은 상수로 바로 선언 가능

```
const object = { a: 1, b: 2 };

const { a, b } = object;

console.log(a); // 1
console.log(b); // 2
```
함수의 파라미터에서 비구조화 할당 예시
```
const object = { a: 1, b: 2 };

function print({ a, b }) {
  console.log(a);
  console.log(b);
}

print(object);
```
<h2>기본값 설정</h2>

```
const object = { a: 1 };

function print({ a, b = 2 }) {
  console.log(a);
  console.log(b);
}

print(object); //1 2
```
배열 비구조화 할당
--
```
const array = [1];
const [one, two = 2] = array;

console.log(one);
console.log(two);
```
깊은 값 비구조화 할당 방법
--
비구조화 할당 문법을 두번 사용하는 것
```
const deepObject = {
  state: {
    information: {
      name: 'velopert',
      languages: ['korean', 'english', 'chinese']
    }
  },
  value: 5
};

const { name, languages } = deepObject.state.information;
const { value } = deepObject;

const extracted = {
  name,
  languages,
  value
};

console.log(extracted); // {name: "velopert", languages: Array[3], value: 5}
```
Spread
--
spread: 펼치다

'객체 혹은 배열을 펼치는'<br><br>
<b>기존의 것을 건들이지 않고, 새로운 객체를 만든다는 것</b><br><br>
...<-spread연산자
```
const slime = {
  name: '슬라임'
};

const cuteSlime = {
  ...slime,
  attribute: 'cute'
};

const purpleCuteSlime = {
  ...cuteSlime,
  color: 'purple'
};

console.log(slime);
console.log(cuteSlime);
console.log(purpleCuteSlime);
```
배열에서 spread 사용
```
const numbers = [1, 2, 3, 4, 5];

const spreadNumbers = [...numbers, 1000, ...numbers];
console.log(spreadNumbers); // [1, 2, 3, 4, 5, 1000, 1, 2, 3, 4, 5]
```
rest 
--
'...이름' 연산자

<b>객체와 배열, 파라미터에서 사용</b>

객체에서의 rest
```
const purpleCuteSlime = {
  name: '슬라임',
  attribute: 'cute',
  color: 'purple'
};

const { color, ...cuteSlime } = purpleCuteSlime;
console.log(color);
console.log(cuteSlime);
```
배열에서의 rest
```
const numbers = [0, 1, 2, 3, 4, 5, 6];

const [one, ...rest] = numbers;

console.log(one);
console.log(rest);
```
함수의 파라미터에서의 rest
```
function sum(...rest) {
  return rest;
}

const result = sum(1, 2, 3, 4, 5, 6);
console.log(result);
```



Scope 이해하기
--
Scope 란, 우리가 변수 혹은 함수를 선언하게 될 때 해당 변수 또는 함수가 유효한 범위


1. Global (전역) Scope: 코드의 모든 범위에서 사용이 가능
2. Function (함수) Scope: 함수 안에서만 사용이 가능
3. Block (블록) Scope: if, for, switch 등 특정 블록 내부에서만 사용이 가능