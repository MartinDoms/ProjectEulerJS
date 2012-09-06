
Array.prototype.contains = function(n) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === n) return true;
  }
  return false;
}
Array.prototype.remove = function(n) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == n) {
      this.splice(i,1);
    }
  }
}
Array.prototype.copy = function() {
	var result = [];
	for (var i = 0; i < this.length; i++) {
		result[i] = this[i];
	}
	return result;
}

function getDest(graph) {
  var d = [];
  for (var i = graph.length-1; i > 0; i--) {
    if (graph[i].length == 0) d.push(i);
    else break;
  }
  return d;
}

function levelFrom(n) {
  var l = 1;
  for (var i = 0; i < n; l++,i+=l) {}
  return l;
}

function totalLevels(arr) {
  var l = 0;
  for (var i = 0; i < arr.length; l++,i+=l) {}
  return l;
}

function buildGraph(arr) {
  var graph = [];
  var levels = totalLevels(arr);
  for (var i = 0; i < arr.length; i++) {
    var level = levelFrom(i);
    if (!graph[i]) graph[i] = [];
    if (i + level < arr.length) graph[i].push(i + level);
    if (i + level + 1 < arr.length) graph[i].push(i + level + 1);
    if (levels == level) graph[i].push(arr.length);
  }
  graph[graph.length] = [];
  return graph;
}

function minDistIndex(activeNodes, dist) {
  var minIndex = 0;
  var min = 999999;
  for (var i = 0; i < activeNodes.length; i++) {
    if (dist[activeNodes[i]] < min) {
      min = dist[activeNodes[i]];
      minIndex = activeNodes[i];
    }
  }
  return minIndex;
}

function findBiggestPath(weights, adjList, source, destination) {
  var dist = [];
  var prev = [];
  for (var i = 0; i < adjList.length; i++) {
    dist[i] = 999999;
    prev[i] = undefined;
  }
  dist[source] = 0;

  var q = [];
  for (var i = 0; i < adjList.length; i++) q[i] = i;

  var mi;
  while (q.length != 0) {
    mi = minDistIndex(q,dist);
    var u = adjList[mi];
    if (mi == destination) 
      break;
    q.remove(mi);

    if (dist[mi] == 999999) break;

    var neighbours = adjList[mi];
    for (var n = 0; n < neighbours.length; n++) {
      var v = neighbours[n];
      var alt = dist[mi] + weights[v];
      if (alt < dist[v]) {
        dist[v] = alt;
        prev[v] = mi;
      }
    }
  }
  
  var path = [];
  while (prev[mi]) {
    path.push(mi);
    mi = prev[mi];
  }
  path.push(mi);
  path.push(source);
  return path;
}

function biggestSum(t) {
  var arr = t.copy();
  var graph = buildGraph(arr);
  arr[arr.length] = 0;

  var weights = [];
  for (var i = 0; i < arr.length; i++) {
    weights[i] = 9999-arr[i];
  }
  
  var path = findBiggestPath(weights, graph, 0, arr.length-1);
  var sum = 0;
  for (var j = 0; j < path.length; j++) {
    sum += arr[path[j]];
  }
  return sum;
}


test("levelFrom", function() {
  equal(levelFrom(0), 1);
  equal(levelFrom(1), 2);
  equal(levelFrom(2), 2);
  equal(levelFrom(3), 3);
  equal(levelFrom(4), 3);
  equal(levelFrom(5), 3);
  equal(levelFrom(6), 4);
  equal(levelFrom(9), 4);
  equal(levelFrom(10), 5);
});

test("totalLevels", function() {
  equal(totalLevels([1]), 1);
  equal(totalLevels([1,2,3]), 2);
  equal(totalLevels(smallTree), 4);
  equal(totalLevels(bigTree), 15);
});

test("biggestSum", function() {
  equal(biggestSum(smallTree),23);
  equal(biggestSum(bigTree), 1074);
  equal(biggestSum(reallyBigTree), 7273);
});

