export class Grid {
    private cells: string[];

    constructor(cells: string[]) {
        this.cells = cells
    }

    nextGeneration() {
        const nextGenerationCells = this.cells.map(cell => '');
        return new Grid(nextGenerationCells);
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
