반복문은 특정 작업을 반복적으로 할 때 사용할 수 있는 구문입니다

for (let i =0; i<10; i++) {
  console.log(i);
}
가장 기본적인 반복문

for (초기구문; 조건구문; 변화구문;) {
   코드
}


배열과 for의 조함
const names = ['멍멍이', '야옹이', '멍뭉이'];

for (let i=0; i<names.length; i++) {
  console.log(names[i]);
}


while 문 은 조건이 참이면 계속해서 반복한다
for 문은 특정숫자를 가지고 숫자의 값을 비교하고, 증감해주면서 반복을 한다면, while 문은 조건을 확인만 하면서 반복을
합니다. 때문에 조건 내부에서 변화를 직접 주어야 합니다

let i = 0;
while (i<10) {
  console.log(i);
  i++;
}

while 문 사용시 반드시 false 가 나오도록 해야함 아니면 무한루프빠짐


const doggy = {
  name:'멍멍이',
  sound:'멍멍',
  age:2
};

console.log(Object.entries(doggy)); // [키,값],[키,값] 형태의 배열로 변환
console.log(Object.keys(doggy)); // [키,키,키]  형태의 배열로 변환
console.log(Object.values(doggy)); [값,값,값] 형태의 배열로 변환


break 와 continue

for (let i=0; i<10; i++) {
  if (i === 2) continue; // 다음루프 실행
  console.log(i);
  if (i ===5) break; //반복문 끝내기
}

continue 에서 조건을 만족할때 바로 3(다음루프)으로 넘어간다


function sumOf(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}

const result = sumOf([1,2,3,4,5]);
console.log(result);

함수 시작은 let 과 return 으로 끝내며 sumOf 라는 함수를 이용하여 1부터 5까지의 합을 구해보았다

function biggerThanThree(numbers) {
  const array = [];
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i]>3) {
        array.push(numbers[i]);
      }
  }
  return array;
}

const numbers = [1,2,3,4,5,6,7];
console.log(biggerThanThree(numbers)); 

for 문 문법
for (1시작조건; 2반복조건; 4매번반복후 일어나는 동작;) {
    3매번 반복마다 실행 될 명령어들
}

위 for 문에서 names.length를 사용하는 이유는 물론 i<7로 하여도 동일하게 동작하지만 리스트의 길이가 추거되거나 제거될 경우 매번 변경을 해야함으로 names.length를 사용함으로써 해결할 수 있기 때문에 사용한다


