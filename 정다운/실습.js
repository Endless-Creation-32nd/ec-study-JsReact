function a() {
    const x = 3;
    console.log(`global scope: ${x}`);
    if(x === 3) {
        console.log(x);
        const x = 5;
        console.log(x);
    }
}
a();