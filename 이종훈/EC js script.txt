console.log('안녕하세요!');
console.log('javaScript를 배워봅시다');

//console.log 를 통해 출력을 배워보았습니다



let value = 1;
console.log(value);
value = 2;
console.log(value);
//변수는 값 변경이 가능합니다

let value = 1;
let value = 2;
// 똑같은 이름으로는 선언할 수 없습니다


const a = 1;
a = 2;
// const는 변수, 상수선언시 사용하며 이후에는 변경이 불가합니다

데이터 타입
// 숫자 number은 바로 대입가능합니다
// 문자열 string은 ' '로 감싸서 선언합니다

//a++는 1을 더하기 직전값을 보여주며++a는 1을 더한 후의 값을 보여줍니다

+= 는 정수값을 바로 더해주는 대입연산자입니다

!:not 은 bool타입을 반대로 바꿔줍니다, &&:and양쪽값이 모두 true일 경우에만 true이며 나머지는 false 입니다, ||:or 하나라도 true라면 true입니다

const value = !((true&&false)||true&&false||!false);
console.log(value)

false

두 값이 일치하는지 확인할 시 ===를 사용하자 타입까지 함께 봐주므로

const a =1;
const b ="1";
const equals = a ===b;
console.log(equals)

if문
const a=1;
if(true) {
  const a =2;
  console.log('if문 안의 a 값은'+a);
}
console.log('if문 a밖의 값은'+a)

"if문의 안의 a 값은 2"
"if문 밖의 a 값은 1"

const a = 10;
if (a===5) {
  console.log('5입니다');
} else if (a===10) {
  console.log('10입니다');
} else {
  console.log('5도 아니고 10도 아닙니다');
}

10입니다

const device = '1';

switch (device) {
  case 'iphone':
    console.log('아이폰');
    break;
  case 'ipad':
    console.log('아이패드');
    break;
  case 'galxy note':
    console.log('갤럭시 노트');
    break;
  default:
    console.log('모르겠네요');
  }

모르겠네요


대입연산자에서 cpp 도 === 사용이 가능할까요 ?

