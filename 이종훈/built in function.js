// 배열 내장함수

const superheroes = ['아이언맨', '캡틴 아메리카', '토르', '닥터스트레인지'];

/*for (let i=0; i<superheroes.length; i++) {
  console.log(superheroes[i]);
}*/

superheroes.forEach(hero => {
  console.log(hero);
});

// forEach 함수의 파라미터로는, 각 원소에 대하여 처리하고 싶은 코드를 함수로 넣어주며 파라미터의 hero는 각 원소를 가르키게 됩니다.
// 이렇게 함수형태의 파라미터를 전달하는 것이 콜백함수

// map 함수

const array = [1,2,3,4,5,6,7,8];

const square = n => n*n;
const squared = array.map(square); // 

console.log(squared);

map 함수의 파라미터로는 변화를 주는 함수를 전달해줍니다. square 는 파라미터n 을 받아와서 이를 제곱해줍니다.
array.map 함수를 사용 할 때 squrare 를 변화함수로 사용함으로서, 내부의 모든 값에 대한 제곱을 하여 새로운 배열을 생성하였습니다.

indexOf

const superheroes = ['아이언맨','캡틴 아메리카', '토르', '닥터스트레인지'];
const index = superheroes.indexOf('토르')

console.log(index);

indexOf 함수는 원하는 항목이 몇번째 원소인지 찾아주는 함수입니다.

findIndex, find,filter 함수

const todos = [
  {
    id:1,
    text:'자바스크립트 입문',
    done:true
  },
  {
    id:2,
    text:'함수 배우기',
    done:true
  },
  {
    id:3,
    text:'객체와 배열 배우기',
    done:true
  },
  {
    id:4,
    text:'배열 내장함수 배우기',
    done:false
  }
];
const index = todos.findIndex(todo => todo.id ===3);
console.log(index);
const todo = todos.find(todo => todo.id ===3);
console.log(todo);
const tasksNotDone = todos.filter(todo => todo.done == false);
console.log(tasksNotDone);

findIndex 함수는 배열안의 객체, 배열일 경우 사용할 수 있다
find 함수는 배열안의 객체, 배열값 자체를 호출한다
filter 함수는 특정조건을 만족하는 값들을 따로 추출하여 새로운 배열을 만든다

splice 함수
배열에서 특정항목을 제거할 때 사용

const numbers = [10,20,30,40];
const index = numbers.indexOf(30);
numbers.splice(index,1); // 첫번째는 어디서부터 지울지 인덱스로 지정, 두번째는 몇개를 지울지 지정
console.log(numbers);

slice
배열을 잘라낼 때 사용, splice와 다른점은 기존의 배열을 건드리지 않음

const numbers = [10,20,30,40];
const sliced = numbers.slice(0,2); // 0부터 2전까지 자름

console.log(sliced); // 자른배열
console.log(numbers); // 기존배열

shift, pop
shift 는 첫번째 원소를 추출, pop은 제일 마지막 함수를 추출

const numbers = [10,20,30,40];
const value = numbers.shift();
const value = numbers.pop();

console.log(numbers);
console.log(value);
console.log(pop);

unshift
shift 와 반대, 즉 새로운 원소를 제일 앞쪽에 추가해줌

const numbers = [10,20,30,40];
numbers.unshift(5);

console.log(numbers);






