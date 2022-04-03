7 배열
객체에서는 하나의 변수,상수에 여러가지 정보를 담기 위함이였다면, 배열은 여러개의 항목들이 들어있는 리스트와 같습니다

const array = [1,2,3,4,5];

const objects = [{name:'멍멍이'},{name:'야옹이'}];
console.log(objects);
console.log(objects[0]);
console.log(objects[1]); // objects[n] - n번째의 배열 항목을 정하는 것

배열 추가 코드는
objects.push({
  name:'멍뭉이'
});

배열의 크기를 알 수 있는 코드는 
console.log(objects.length);