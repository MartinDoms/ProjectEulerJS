function evenFibSum(max) {
  var result = 0;
  var fib = 2;
  var fib_1 = 1;
  while (fib < max) {
    if (fib % 2 == 0) result += fib;
    var next = fib + fib_1;
    fib_1 = fib;
    fib = next;
  }
  return result;
}

test("evenFibSum", function() {
  equal(evenFibSum(89), 44);
  equal(evenFibSum(4000000), 4613732);
});