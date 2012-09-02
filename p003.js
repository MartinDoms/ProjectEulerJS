function isPrime(x) {
  var s = Math.sqrt(x);
  for (var i = 2; i < s; i++) {
    if (x % i == 0) {
      return false;
    }
  }
  return true;
}

function isFactor(f, num) {
  return num % f == 0;
}

function largestPrimeFactor(max) {
  var result = 0;
  var s = Math.floor(Math.sqrt(max));
  for (var i = s; i > 2; i--) {
    if (isFactor(i, max) && isPrime(i)) {
      result = i;
      break;
    }
  }
  
  return result;
}

test("evenFibSum", function() {
  equal(largestPrimeFactor(13195), 29);
  equal(largestPrimeFactor(600851475143 ), 6857);
});