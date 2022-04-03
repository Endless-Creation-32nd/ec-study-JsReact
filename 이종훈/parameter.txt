객체는 우리가 변수 혹은 상수를 사용하게 될 때 하나의 이름에 여러 종류의 값을 넣을 수 있게 해줍니다.

const ironMan = {
  name: '토니 스타크',
  actor: '로버트 다우니 주니어',
  alias: '아이언맨'
};

const captainAmerica = {
  name: '스티븐 로저스',
  actor: '크리스 에반스',
  alias: '캡틴 아메리카'
};

function print(hero) {
 const { alias, name, actor } = hero;
 const text = `${alias}(${name}) 역할을 맡은 배우는 ${actor} 입니다.`;
  console.log(text);
};

print(ironMan);
print(captainAmerica);

//function 부분에서 hero 대신 { alias, name, actor }을 바로 넣어 사용이 가능합니다
//print 를 console.log 로 오해하여 'print' is defined but never used 의 경고알림을 받음

const dog = {
  name:'멍멍이',
  sound:'멍멍!',
  say: function(){
    console.log(this.sound); // 함수가 객체안에 들어가게 되면 this는 자신이 속해있는 객체를 가르키게 됩니다 함수 선언//시 이름이 없어도 됩니다.
  }
};

dog.say();

const numbers = {
  a:1,
  b:2,
get sum() { //getter 함수
  console.log('sum 함수가 실행됩니다 !');
  return this.a + this.b; // 함수 내의 this는 자신이 속한 객체를 가르키게 됩니다
 }
};


console.log(numbers.sum);
numbers.b = 5;
console.log(numbers.sum);



const numbers = {
  _a:1,
  _b:2,
  sum:3,
  calculate() {
    console.log('calculate');
    this.sum=this._a+this._b;
  },
  get a() {
    return this._a;
  },
  get b() {
    return this._b;
  },
  set a (value){
    console.log('a가 바뀝니다.');
    this._a=value;
    this.calculate();
  },
  set b(value) {
    console.log('b가 바뀝니다.');
    this._b = value;
    this.calculate();
  }
};

console.log(numbers.sum);
numbers.a=5;
numbers.b=7;
numbers.a=9;

console.log(numbers.sum);
console.log(numbers.sum);
console.log(numbers.sum);
// 바뀔때마다 값이 변한다고 하였는데 왜 마지막 계산만 3번 반복하는지..









