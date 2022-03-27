# JavaScript 입문

## 1. Hello JavaScript

- **콘솔에 안녕하세요를 출력하는 코드**

```javascript
console.log('안녕하세요!');
```

## 2. 변수

`let` 을 이용해 변수에 값을 넣을 수 있다.  
 `const` 를 이용해 상수로 선언할 수 있다. -> 한번 값이 정해지면 변하지 않음.  
 `var` 이라는 키워드를 이용해 변수 선언이 가능했지만 사용하지 말자.  
 -> [var을 사용하지 않는 이유](https://hoondev.tistory.com/101)

- 데이터타입
  - 숫자
  - 문자열 : ''로 감싸서 선언
  - 참/거짓(Boolean) : true, false 두 값만을 가짐
  - null, undefined : null은 값이 없는 것이고, undefined는 값이 아직 설정되지 않은 것이다.

## 3. 연산자

산술 연산자 : 덧셈, 뺄셈, 곱셈, 나눗셈과 같이 사칙연산을 하는 연산자 ,  
 `a++` , `++a`와 같은 연산자 역시 산술연산자에 속한다.

대입 연산자 : 특정 값에 연산 한 값을 바로 설정할 때 사용.  
 **ex) ---을 기준으로 나뉜 두 코드는 같은코드**

```javascript
    let a = 1;
    a = a + 3;
    -------------------------
    let a = 1;
    a += 3;
```

논리 연산자 : boolean 타입을 위한 연산자.  
 `!` : NOT (True->False, False->True)  
 `&&` : AND (둘 다 true일 때만 true)  
 `||` : OR (둘 다 false 일때만 false)

비교 연산자 : 두 값을 비교할 때 사용.  
 `==` : 두 값만 비교  
 `===` : 두 값뿐만 아니라 타입도 비교  
 `!==` : 두 값이 일치하지 않는지 확인  
 ` < , > , =< , =>` : 기본적인 비교연산자들

```javascript
const a = 1;
const b = '1';
const equals1 = a == b; // true
const equals2 = a === b; // false
```

## 4. 조건문

- if문

```javascript
const a = 1;
if (a + 1 === 2) {
  console.log('a + 1이 2 입니다.'); // if문 () 안의 조건을 만족시키면 코드 실행
}
```

- if-else문 : 특정 조건이 만족할때와 하지 않을 때 사용

```javascript
const a = 10;
if (a > 15) {
  console.log('a가 15보다 큽니다');
} else {
  console.log('a가 15보다 크지 않습니다'); // 이 코드 출력
}
```

- if-else if문 : 여러 조건에 따라 다른 작업을 해야할 때 사용

```javascript
const a = 10;
if (a === 5) {
  console.log('5입니다!');
} else if (a === 10) {
  console.log('10입니다!'); // 이 코드 출력
} else {
  console.log('5도 아니고 10도 아닙니다.');
}
```

- switch문 : 특정 값이 무엇이냐에 따라 다른 작업을 하고 싶을 때 사용

```javascript
const device = 'iphone';

switch (device) {
  case 'iphone':
    console.log('아이폰!'); // 이 코드 출력
    break; // break문을 이용해 switch문을 빠져나옴
  case 'ipad':
    console.log('아이패드!');
    break;
  case 'galaxy note':
    console.log('갤럭시 노트!');
    break;
  default:
    console.log('모르겠네요..');
}
```

## 5. 함수

**함수란??** 특정 코드를 하나의 명령으로 실행할 수 있게 해주는 기능

```javascript
function add(a, b) {
  // function 키워드를 사용하여 파라미터 a,b를 입력받고
  return a + b; // return 키워드를 이용하여 함수의 결과물 저장
}

const sum = add(1, 2); // sum이라는 변수에 add(1,2)의 값을 저장
console.log(sum);
```

**템플릿리터럴을 이용한 함수**

```javascript
function hello(name) {
  console.log(`Hello, ${name}!`); // ${}를 이용해 + 없이 문자열 조합 가능
}
hello('velopert');
//결과값 : Hello, velopert!
```

**화살표 함수 (많이 사용하니 잘 숙지)**

```javascript
const add = (a, b) => {
  // function 키워드를 사용하지 않고 변수 자체를 함수의 결과물로 저장
  return a + b;
};

console.log(add(1, 2));
```

## 6. 객체

객체란?

```javascript
const dog = {
  name: '멍멍이', // key : value의 개념
  age: 2,
};

console.log(dog.name); // 변수이름.key 를 이용해 값 출력
console.log(dog.age);
```

함수에서 객체 사용

```javascript
const ironMan = {
  name: '토니 스타크',
  actor: '로버트 다우니 주니어',
  alias: '아이언맨',
};

const captainAmerica = {
  name: '스티븐 로저스',
  actor: '크리스 에반스',
  alias: '캡틴 아메리카',
};

function print(hero) {
  // 파라미터에 위에서 선언한 객체를 넣을 수 있다.
  const text = `${hero.alias}(${hero.name}) 역할을 맡은 배우는 ${hero.actor} 입니다.`;
  console.log(text);
}

print(ironMan); // 아이언맨(토니 스타크) 역할을 맡은 배우는 로버트 다우니 주니어 입니다.
print(captainAmerica); // 캡틴 아메리카(스티븐 로저스) 역할을 맡은 배우는 크리스 에반스 입니다.
```

**- 객체 비구조화 할당(중요 개념)**

```javascript
const { alias, name, actor } = hero;
```

```javascript
const ironMan = {
  name: '토니 스타크',
  actor: '로버트 다우니 주니어',
  alias: '아이언맨',
};

const captainAmerica = {
  name: '스티븐 로저스',
  actor: '크리스 에반스',
  alias: '캡틴 아메리카',
};

function print({ alias, name, actor }) {
  // 파라미터에 객체 비구조화 할당 적용
  const text = `${alias}(${name}) 역할을 맡은 배우는 ${actor} 입니다.`;
  console.log(text);
}

print(ironMan); // 같은 결과 출력
print(captainAmerica); // 같은 결과 출력
```

객체 안에 함수 넣기

```javascript
const dog = {
  name: '멍멍이',
  sound: '멍멍!',
  say: function say() {
    // 객체 안의 함수 (함수의 이름이 굳이 존재하지 않아도 됨)
    console.log(this.sound); // 함수가 객체 안에 들어가면 this는 객체를 가리킴.
  },
};

dog.say(); // 결과값 : 멍멍!
```

getter setter 함수  
getter 함수

```javascript
const numbers = {
  a: 1,
  b: 2,
  get sum() {
    // get 함수 사용
    console.log('sum 함수가 실행됩니다!');
    return this.a + this.b;
  },
};

console.log(numbers.sum);
numbers.b = 5;
console.log(numbers.sum);
```

setter 함수

```javascript
const dog = {
  _name: '멍멍이',
  get name() {
    console.log('_name을 조회합니다.');
    return this._name;
  },
  set name(value) {
    // set 함수 사용
    console.log('이름이 바뀝니다..' + value);
    this._name = value;
  },
};

console.log(dog.name);
dog.name = '뭉뭉이'; // 객체의 값이 변경될 때 set함수 실행
console.log(dog.name);
```
