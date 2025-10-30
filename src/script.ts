function checkNoUndefined<T>(arr: (T | undefined)[]): asserts arr is T[] {
    if(arr.some(el => el === undefined)) {
        throw new Error("undefinedが出た!!!");
    }
}


function shuffle(arr: number[]): number[] {
    checkNoUndefined(arr);

    for(let i = arr.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j] as number;
        arr[j] = temp as number;
    }
    return arr;
}

/*
 *ビンゴ表初期化
 */

const pool = Array.from({ length: 75 }, (_, i) => i + 1);
shuffle(pool);
// console.log(pool);

const grid = Array.from({ length: 5 }, (_, r) =>
    Array.from({ length: 5 }, (_, c) => pool[r * 5 + c])
)

grid[2]![2] = 0;
shuffle(pool);
// console.table(grid);
/*
 *ビンゴ表表示
 */
 function renderGrid(grid: (number | undefined)[][]) {
    // table開始タグ
    let tableHTML = '<table border="1" cellspacing="0" cellpadding="4">';
    for (const row of grid) {
      tableHTML += '<tr>';
      for (const cell of row) {
        tableHTML += `<td>${cell}</td>`;
      }
      tableHTML += '</tr>';
    }
    tableHTML += '</table>';
  
    const container = document.getElementById('grid-container');
    if (container) {
      container.innerHTML = tableHTML;
    }
  }
  
  // grid配列を表示
  renderGrid(grid);

/*
 *ビンゴ判定
 */
 function bingo() {

    let first = pool.shift();
    for (let i = 0; i < 5; i++){
        for (let j = 0; j < 5; j++){
            if(first === grid[i]![j]){
                grid[i]![j] = 0;
            }
        }
    }
    const element = document.getElementById('bingoNumber');
    if (element) {
        element.textContent = String(first);
    }

    let xZero = 0;
    let yZero = 0;
    let dZero = 0;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if(grid[i]![j] === 0) {
                xZero++;
            }
            else {
                xZero = 0;
            }
            if(grid[j]![i] === 0) {
                yZero++;
            }
            else {
                yZero = 0;
            }
            if((grid[0]![0] == 0 && grid[1]![1] == 0 && grid[3]![3] == 0 && grid[4]![4] == 0) || (grid[0]![4] == 0 && grid[1]![3] == 0 && grid[3]![1] == 0 && grid[4]![0] == 0)) {
                dZero = 1;
            }

            if((xZero === 5) || (yZero === 5) || (dZero === 1)) {
                const bingoCheck = document.getElementById('bingo');
                if (bingoCheck) {
                    bingoCheck.textContent = String("BINGO!!!");
                }
            }
        }
    }
    console.table(grid);
    renderGrid(grid);
 }