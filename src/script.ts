function shuffle<T>(arr: T[]): T[] {
    for(let i = arr.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i]!, arr[j]!] = [arr[j]!, arr[i]!];
    } 
    return arr;
}

const pool = Array.from({ length: 75 }, (_, i) => i + 1);
shuffle(pool);

const grid: number[][] = Array.from({ length: 5 }, (_, r) =>
    Array.from({ length: 5 }, (_, c) => pool[r * 5 + c]!)
)

grid[2]![2] = 0;

console.table(grid);
