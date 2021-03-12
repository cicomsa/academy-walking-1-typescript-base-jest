export class Grid {
    private cells: string[];

    constructor(cells: string[]) {
        this.cells = cells
    }
}

export class Game {
    private grid: Grid;

    constructor(grid: Grid) {
        this.grid = grid
    }

    playNext() {
        return new Grid(['', '', '', '', '', ''])
    }
}
