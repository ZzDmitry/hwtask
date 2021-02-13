function test(tests, f) {
  tests.forEach(([args, expecting], index) => {
    const result = f(...args);
    if (result === expecting) {
      console.log(`${index}. SUCCESS ${JSON.stringify(args)} => ${JSON.stringify(result)}`);
    } else {
      console.log(`${index}. ERROR ${JSON.stringify(args)} => ${JSON.stringify(result)}, expecting ${JSON.stringify(expecting)}`);
    }
  })
}

module.exports = test;
