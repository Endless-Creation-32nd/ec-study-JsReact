함수는, 특정 코드를 하나의 명령으로 실행 할 수 있게 해주는 기능입니다.


function add(a, b) {
  return a+b;
  console.log('호출이 되지 않는 코드!')
  }
  
  const sum = add(1,2);
  console.log(sum);


function hello(name) {
  console.log('Hello, ${name}!');
}

hello('velopert');

//성적 등급

function getGrade(score) {
  if (score === 100) {
    return 'A+';
  } else if (score >= 90) { // else if 문에서의 괄호{} 안에 return 을 써준다
    return 'A';
  } else if (score === 89) {
    return 'B+';
  } else if (score >= 80) {
    return 'B';
  } else if (score === 79) {
    return 'C+' ;
  } else if (score >= 70) {
    return 'C';
  } else if (score === 69) {
    return 'D+';
  } else if (score >= 60) {
    return 'D';
  } else { // 마지막 끝나는 부분에서는 else 문을 써준다
    return 'F';
  }
} 



const grade = getGrade(90);
console.log(grade);
