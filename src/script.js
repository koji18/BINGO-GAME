function shuffle(arr) {
    var _a;
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [arr[j], arr[i]], arr[i] = _a[0], arr[j] = _a[1];
    }
    return arr;
}
var pool = Array.from({ length: 75 }, function (_, i) { return i + 1; });
shuffle(pool);
var grid = Array.from({ length: 5 }, function (_, r) {
    return Array.from({ length: 5 }, function (_, c) { return pool[r * 5 + c]; });
});
grid[2][2] = 0;
console.table(grid);
