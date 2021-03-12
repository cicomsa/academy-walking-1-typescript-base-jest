import {Game, Grid} from "../main/example";

describe('game of life', () => {
    it.each`
        actual                                   | next
        ${['x', '', '', '', '', '']}             | ${['', '', '', '', '', '']}
        ${['x', '', '', '', '', '', '', '', '']} | ${['', '', '', '', '', '', '', '', '']}
    `("a live cell with less than two live neighbours dies", ({actual, next}) => {
        const grid = new Grid(actual)
        const game: Game = new Game(grid);
        const nextGeneratedGrid: Grid = new Grid(next)

        expect(game.play()).toEqual(nextGeneratedGrid)
    })
})
