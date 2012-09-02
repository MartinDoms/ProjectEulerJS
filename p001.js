function sumOf35(x) {
	var result = 0;
	for (var i = 0; i < x; i++) {
		if (i % 3 == 0 || i % 5 == 0) {
			result += i;
		}
	}
	return result;
}

test("sumOf35", function() {
	equal(sumOf35(10), 23);
	equal(sumOf35(1000), 233168);
});