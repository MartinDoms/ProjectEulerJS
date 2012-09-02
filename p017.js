var count = [0,3,3,5,4,4,3,5,5,4]

function lettersIn(n) {
  var c = 0;
  var curr = n;
  if (curr>=10000) throw "Too big";
  if (curr>=1000) {
    c += count[Math.floor(curr/1000)] + 8;
    curr -= Math.floor(curr/1000)*1000;
  }
  if (curr >= 100) {
    c += count[Math.floor(curr/100)] + 7;
    if (curr%100>0) c += 3;
    curr -= Math.floor(curr/100)*100;
  }
  if (curr >= 90) c += 6 + count[curr%90];
  else if (curr >= 80) c += 6 + count[curr%10];
  else if (curr >= 70) c += 7 + count[curr%10];
  else if (curr >= 40) c += 5 + count[curr%10];
  else if (curr >= 20) c += 6 + count[curr%10];
  else if (curr == 18) c += 8;
  else if (curr > 15) c += 4 + count[curr%10];
  else if (curr == 15) c += 7;
  else if (curr == 14) c += 4 + count[curr%10];
  else if (curr == 13) c += 8;
  else if (curr == 12) c += 6;
  else if (curr == 11) c += 6;
  else if (curr == 10) c += 3;
  
  if (curr < 10) c += count[curr%10];
  
  return c;
}

function letters(n) {
  var c = 0;
  for (var i = 1; i <= n; i++) {
    c += lettersIn(i);
    if (isNaN(c)) {
      throw "NaN";
    }
  }
  return c;
}


test("letters", function() {
  equal(letters(5), 19);
  equal(letters(1000), 21124);
});

test("lettersIn", function() {
  equal(lettersIn(1), 3);
  equal(lettersIn(2), 3);
  equal(lettersIn(3), 5);
  equal(lettersIn(4), 4);
  equal(lettersIn(5), 4);
  equal(lettersIn(6), 3);
  equal(lettersIn(7), 5);
  equal(lettersIn(8), 5);
  equal(lettersIn(9), 4);
  equal(lettersIn(10), 3);
  equal(lettersIn(11), 6);
  equal(lettersIn(12), 6);
  equal(lettersIn(13), 8);
  equal(lettersIn(14), 8);
  equal(lettersIn(15), 7);
  equal(lettersIn(16), 7);
  equal(lettersIn(17), 9);
  equal(lettersIn(18), 8);
  equal(lettersIn(19), 8);
  equal(lettersIn(20), 6);
  equal(lettersIn(21), 9);
  equal(lettersIn(30), 6);
  equal(lettersIn(32), 9);
  equal(lettersIn(40), 5);
  equal(lettersIn(43), 10);
  equal(lettersIn(50), 5);
  equal(lettersIn(54), 9);
  equal(lettersIn(60), 5);
  equal(lettersIn(65), 9);
  equal(lettersIn(70), 7);
  equal(lettersIn(76), 10);
  equal(lettersIn(80), 6);
  equal(lettersIn(87), 11);
  equal(lettersIn(98), 11);
  equal(lettersIn(100), 10);
  equal(lettersIn(101), 16);
  equal(lettersIn(112), 19);
  equal(lettersIn(115), 20);
  equal(lettersIn(150), 18);
  equal(lettersIn(201), 16);
  equal(lettersIn(301), 18);
  equal(lettersIn(342), 23);
  equal(lettersIn(401), 17);
  equal(lettersIn(560), 4+7+3+5);
  equal(lettersIn(613), 3+7+3+8);
  equal(lettersIn(705), 5+7+3+4);
  equal(lettersIn(777), 5+7+3+5+2+5);
  equal(lettersIn(821), 5+7+3+6+3);
  equal(lettersIn(913), 4+7+3+4+4);
  equal(lettersIn(920), 4+7+3+6);
  equal(lettersIn(999), 24);
  equal(lettersIn(998), 25);
  equal(lettersIn(989), 24);
  equal(lettersIn(1000), 11);
});