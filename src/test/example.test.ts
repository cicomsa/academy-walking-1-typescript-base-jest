import { Game, Grid } from "../main/example";

describe('game of life', () => {
    it("kills a cell that is underpopulated in the array", () => {
        const grid = new Grid(['x', '', '', '', '', ''])
        const game: Game = new Game(grid);
        const nextGeneratedGrid: Grid = new Grid(['', '', '', '', '', ''])

        expect(game.playNext()).toEqual(nextGeneratedGrid)
    })
})
