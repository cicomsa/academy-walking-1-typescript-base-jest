export class Grid {
    private cells: string[][];

    constructor(cells: string[][]) {
        this.cells = cells
    }

    nextGeneration() {
        const nextGenerationCells = this.cells.map(row => row.map(() => ' '))
        return new Grid(nextGenerationCells);
    }

    countAliveNeighbours(x: number, y: number) {
        this.combinations().forEach(combination => {

        })

            const row = this.cells[x + i];
            console.log(`i ${i} row ${row}`);
            if (row) neighbors.push(row[y + j])

        return neighbors.filter(cell => cell === 'x').length
    }

    combinations() {
        return [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1]
        ]
    }
}

export class Game {
    private grid: Grid;

    constructor(grid: Grid) {
        this.grid = grid
    }

    play() {
        return this.grid.nextGeneration();
    }
}
