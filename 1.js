const tests = require('./test')

function add(s1, s2) {
  const n1 = BigInt(s1);
  const n2 = BigInt(s2);
  return (n1 + n2).toString();
}

tests(
  [
    [['1'.repeat(100), '2'.repeat(100)], '3'.repeat(100)],
    [['9'.repeat(5100 - 1), '9'.repeat(5100 - 1)], `1${'9'.repeat(5100 - 2)}8`]
  ],
  add,
);
