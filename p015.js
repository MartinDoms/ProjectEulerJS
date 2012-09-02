function factorial(n) {
  var r = 1;
  for (var i = 1; i <= n; i++) r *= i;
  return r;
}

function routes(size) {
  var r = 1;
  for (var i = size+1; i <= size*2; i++) r *= i;
  return r/factorial(size);
}

test("routes", function() {
  equal(routes(2), 6);
  equal(routes(20), 137846528820);
});