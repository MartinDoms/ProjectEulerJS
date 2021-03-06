function tripletProd(n) {
  for (var c = n-2; c > 2; c--) {
    for (var b = c - 1; b > 1; b--) {
      for (var a = b - 1; a > 0; a--) {
        if (a + b + c == n && a*a + b*b == c*c) {
          return a * b * c;
        }
      }
    }
  }
}

test("Triplet", function() {
  equal(tripletProd(12), 60);
  equal(tripletProd(1000), 31875000);
});