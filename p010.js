function sumOfPrimes(n) {
  var a = [];
  var sum = 0;
  for (var i = 2; i < n; i++) {
    if (!a[i]) {
      sum += i;
      for (var j = i+i; j < n; j+=i) {
        a[j] = true;
      }
    }
  }
  return sum;
}

test("sumOfPrimes", function() {
  equal(17, sumOfPrimes(10));
  equal(142913828922, sumOfPrimes(2000000));
});