## 7. 배열

배열이란?

```javascript
const array = [1, 2, 3, 4, 5];
```

객체 배열

```javascript
const objects = [{ name: '멍멍이' }, { name: '야옹이' }];
objects[1]; // 출력결과 : Object {name: '멍멍이'}
```

배열에 항목 추가

```javascript
// 내장함수인 push 사용
objects.push({
  name: '멍뭉이',
});
```

배열의 크기 구하기

```javascript
console.log(objects.length); // 출력결과 : 3
```

## 8. 반복문

for문

```javascript
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

배열과 for문

```javascript
const names = ['멍멍이', '야옹이', '멍뭉이'];

for (let i = 0; i < names.length; i++) {
  console.log(names[i]);
} // 출력 결과 : 멍멍이 / 야옹이 / 멍뭉이
```

while문

```javascript
let i = 0;
while (i < 10) {
  console.log(i);
  i++;
}
```

객체의 정보를 배열 형태로 받아올 수 있는 함수

```javascript
const doggy = {
  name: '멍멍이',
  sound: '멍멍',
  age: 2,
};

console.log(Object.entries(doggy)); // [[키,값],[키,값]] 형태
console.log(Object.keys(doggy)); // [키,키,키] 형태
console.log(Object.values(doggy)); // [값,값,값] 형태
```

break 와 continue

```javascript
for (let i = 0; i < 10; i++) {
  if (i === 2) continue; // 다음 루프를 실행 -> i가 2일 때 코드 실행 x
  console.log(i);
  if (i === 5) break; // 반복문을 끝내기 -> i가 5일 때 반복문 종료
}
```

## 9. 배열 내장함수

forEach

```javascript
const superheroes = ['아이언맨', '캡틴 아메리카', '토르', '닥터 스트레인지'];

superheroes.forEach((hero) => {
  // 파라미터에 처리하고 싶은 코드를 함수로 넣어줌
  // 이렇게 함수형태의 파라미터를 전달하는 것을 콜백함수라고 한다
  console.log(hero);
});
```

map

```javascript
const array = [1, 2, 3, 4, 5, 6, 7, 8];

const square = (n) => n * n; // n을 n*n으로 바꾸는 화살표 함수
const squared = array.map(square); // square를 파라미터로 가지면서 새로운 배열 생성
console.log(squared);
```

indexOf, findIndex

```javascript
const superheroes = ['아이언맨', '캡틴 아메리카', '토르', '닥터 스트레인지'];
const index = superheroes.indexOf('토르'); // 주어진 값이 몇번째 항목인지 알고싶다
console.log(index); // 2
```

객체나 배열일 때 `indexOf` 를 사용해서는 찾을 수 없다 ->`findIndex` 사용

```javascript
const index = todos.findIndex((todo) => todo.id === 3); // todo.id가 3인 객체 또는 배열의 위치 반환
```

find

```javascript
const todo = todos.find((todo) => todo.id === 3); // 위치가 아닌 객체나 배열 반환
```

filter

```javascript
const tasksNotDone = todos.filter((todo) => todo.done === false); // 조건을 만족하는 항목들만으로 새로운 배열 생성
```

splice, slice

```javascript
const numbers = [10, 20, 30, 40];
const index = numbers.indexOf(30);
numbers.splice(index, 1); // 첫번째 파라미터는 어떤 인덱스부터 지울지, 두번째 파라미터는 몇개를 지울지
console.log(numbers); // 결과값 : [10, 20, 40]
```

```javascript
const numbers = [10, 20, 30, 40];
const sliced = numbers.slice(0, 2); // 기존의 배열이 아닌 새로운 배열, 0부터 시작해서 2전까지

console.log(sliced); // [10, 20]
console.log(numbers); // [10, 20, 30, 40]
```

shift, unshift

```javascript
const numbers = [10, 20, 30, 40];
const value = numbers.shift(); // 첫번째 원소를 배열에서 추출
console.log(value); // 결과값 : 10
console.log(numbers); // 결과값 : [20, 30, 40]
```

```javascript
const numbers = [10, 20, 30, 40];
numbers.unshift(5); // 맨 앞에 새 원소 추가
console.log(numbers); // 결과값 : [5, 10, 20, 30, 40]
```

pop

```javascript
const numbers = [10, 20, 30, 40];
const value = numbers.pop(); // 마지막 원소를 배열에서 추출
console.log(value); // 결과값 : 40
console.log(numbers); // 결과값 : [10, 20, 30]
```

concat, join

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const concated = arr1.concat(arr2); // arr1과 arr2 두 배열을 합침

console.log(concated); // 결과값 : [1, 2, 3, 4, 5, 6]
```

```javascript
const array = [1, 2, 3, 4, 5];
console.log(array.join()); // 결과값 : 1,2,3,4,5
console.log(array.join(' ')); // 결과값 : 1 2 3 4 5
console.log(array.join(', ')); // 결과값 : 1, 2, 3, 4, 5
```

reduce **(다시 공부)**

```javascript
const numbers = [1, 2, 3, 4, 5];
let sum = numbers.reduce((accumulator, current) => {
  console.log({ accumulator, current });
  return accumulator + current;
}, 0);

console.log(sum);
```

## 10. 프로토타입과 클래스

객체 생성자

```javascript
// Animal이라는 객체생성자
function Animal(type, name, sound) {
  this.type = type;
  this.name = name;
  this.sound = sound;
  this.say = function () {
    console.log(this.sound);
  };
}

const dog = new Animal('개', '멍멍이', '멍멍'); // new를 사용해 객체 생성
const cat = new Animal('고양이', '야옹이', '야옹');

dog.say();
cat.say();
```

프로토타입

```javascript
function Animal(type, name, sound) {
  this.type = type;
  this.name = name;
  this.sound = sound;
}

Animal.prototype.say = function () {
  // 프로토타입을 사용해 say를 재사용
  console.log(this.sound);
};
Animal.prototype.sharedValue = 1; // 프로토타입을 사용해 sharedValue 값 설정

const dog = new Animal('개', '멍멍이', '멍멍');
const cat = new Animal('고양이', '야옹이', '야옹');

dog.say();
cat.say();

console.log(dog.sharedValue);
console.log(cat.sharedValue);
```

클래스  
객체 생성자로 구현했던 코드를 명확하고 깔끔하게 구현 가능

```javascript
class Animal {
  constructor(type, name, sound) {
    this.type = type;
    this.name = name;
    this.sound = sound;
  }
  say() {
    // say 함수를 class 내부에서 선언. -> 메서드, 자동으로 prototype 등록
    console.log(this.sound);
  }
}

const dog = new Animal('개', '멍멍이', '멍멍');
const cat = new Animal('고양이', '야옹이', '야옹');

dog.say();
cat.say();
```
