// Sieve of Eratosthenes
function prime(n) {
  var max = 500000;
  var currN = 0;
  var currP = -1;
  var nums = [];
  for (var i = 2; i <= max; i++) {
    if (!nums[i]) {// prime
      currN++;
      currP = i;
      if (currN == n) return currP;
      for (var j = i*2; j < max; j+=i) {
        nums[j] = true;
      }
    }
  }
}

test("prime", function() {
  equal(prime(6), 13);
  equal(prime(10001), 104743);
});