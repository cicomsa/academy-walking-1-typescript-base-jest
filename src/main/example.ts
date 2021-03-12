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
        let neighbours = []

        if (x - 1 >= 0 && (y - 1 >= 0))
            neighbours.push(this.cells[x - 1][y - 1])

        if (y - 1 >= 0)
            neighbours.push(this.cells[x][y - 1])

        if (y - 1 >= 0 && x + 1 <= this.cells[0].length)
            neighbours.push(this.cells[x + 1][y - 1])

        if (x - 1 >= 0)
            neighbours.push(this.cells[x - 1][y])

        if (x + 1 <= this.cells[0].length)
            neighbours.push(this.cells[x + 1][y])

        if (y + 1 <= this.cells[0].length && x - 1 >= 0)
            neighbours.push(this.cells[x - 1][y + 1])

        if (y + 1 <= this.cells[0].length)
            neighbours.push(this.cells[x][y + 1])

        if (x + 1 <= this.cells[0].length && y + 1 <= this.cells[0].length)
            neighbours.push(this.cells[x + 1][y + 1])

        return neighbours.filter(cell => cell === `x`).length
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
