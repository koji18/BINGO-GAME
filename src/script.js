function checkNoUndefined(arr) {
    if (arr.some(function (el) { return el === undefined; })) {
        throw new Error("undefinedが出た!!!");
    }
}
function shuffle(arr) {
    checkNoUndefined(arr);
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}
/*
 *ビンゴ表初期化
 */
var pool = [];
var grid = [];
reset();
function reset() {
    pool = Array.from({ length: 75 }, function (_, i) { return i + 1; });
    shuffle(pool);
    grid = Array.from({ length: 5 }, function (_, r) {
        return Array.from({ length: 5 }, function (_, c) { return pool[r * 5 + c]; });
    });
    grid[2][2] = 0;
    shuffle(pool);
    //grid配列を表示
    renderGrid(grid);
    //bingoを非表示にする
    var bingoElement = document.getElementById('bingo');
    if (bingoElement) {
        bingoElement.textContent = '';
    }
}
/*
 *ビンゴ表表示
 */
function renderGrid(grid) {
    // table開始タグ
    var tableHTML = '<table>';
    for (var _i = 0, grid_1 = grid; _i < grid_1.length; _i++) {
        var row = grid_1[_i];
        tableHTML += '<tr>';
        for (var _a = 0, row_1 = row; _a < row_1.length; _a++) {
            var cell = row_1[_a];
            tableHTML += "<td>".concat(cell, "</td>");
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';
    var container = document.getElementById('grid-container');
    if (container) {
        container.innerHTML = tableHTML;
    }
}
/*
 *ビンゴ判定
 */
function bingo() {
    var first = pool.shift();
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            if (first === grid[i][j]) {
                grid[i][j] = 0;
            }
        }
    }
    var element = document.getElementById('bingoNumber');
    if (element) {
        element.textContent = String(first);
    }
    var xZero = 0;
    var yZero = 0;
    var dZero = 0;
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            if (grid[i][j] === 0) {
                xZero++;
            }
            else {
                xZero = 0;
            }
            if (grid[j][i] === 0) {
                yZero++;
            }
            else {
                yZero = 0;
            }
            if ((grid[0][0] == 0 && grid[1][1] == 0 && grid[3][3] == 0 && grid[4][4] == 0) || (grid[0][4] == 0 && grid[1][3] == 0 && grid[3][1] == 0 && grid[4][0] == 0)) {
                dZero = 1;
            }
            if ((xZero === 5) || (yZero === 5) || (dZero === 1)) {
                var bingoCheck = document.getElementById('bingo');
                if (bingoCheck) {
                    bingoCheck.textContent = String("BINGO!!!");
                }
            }
        }
    }
    renderGrid(grid);
}
