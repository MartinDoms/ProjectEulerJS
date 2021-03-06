var smallTree = [
3,
7, 4,
2, 4, 6,
8, 5, 9, 3]

var bigTree = [
75,
95, 64,
17, 47, 82,
18, 35, 87, 10,
20, 04, 82, 47, 65,
19, 01, 23, 75, 03, 34,
88, 02, 77, 73, 07, 63, 67,
99, 65, 04, 28, 06, 16, 70, 92,
41, 41, 26, 56, 83, 40, 80, 70, 33,
41, 48, 72, 33, 47, 32, 37, 16, 94, 29,
53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14,
70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57,
91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48,
63, 66, 04, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31,
04, 62, 98, 27, 23, 09, 70, 98, 73, 93, 38, 53, 60, 04, 23];


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
  }
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
  var graph = buildGraph(t);
  var destinations = getDest(graph);
  var weights = [];
  for (var i = 0; i < t.length; i++) {
    weights[i] = 9999-t[i];
  }
  
  var best = 0;
  for (var i = 0; i < destinations.length; i++) {
    var path = findBiggestPath(weights, graph, 0, destinations[i]);
    var sum = 0;
    for (var j = 0; j < path.length; j++) {
      sum += t[path[j]];
    }
    if (sum > best) best = sum;
  }
  return best;
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
});
