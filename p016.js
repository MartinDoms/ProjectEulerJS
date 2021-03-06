Math.log10 = function(n) {
  return Math.log(n)/Math.log(10);
}

function sumOfDigits(base, exp) {
  var ndigits = exp * Math.log10(base);
  var digits = [];
  digits[0] = base;
  var currExp = 1;
  while (currExp < exp) {
    var carry = 0;
    currExp++;
    for (var i = 0; i < ndigits; i++) {
      var num = base * (digits[i]||0) + carry;
      digits[i] = num%10;
      carry = Math.floor(num/10);
    }
  }
  var sum = 0;
  for (var i = 0; i < digits.length; i++) {
    if (digits[i]) sum += digits[i];
  }
  
  return sum;
}

test("sumOfDigits", function() {
  equal(sumOfDigits(2, 15), 26);
  equal(sumOfDigits(2, 1000), 1366);
});