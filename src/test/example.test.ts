import {Game, Grid} from "../main/example";

describe('game of life', () => {
    const scenario1 = {
        actual: [
            ['x', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ],
        next: [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ]

    }

    const scenario2 = {
        actual: [
            ['x', ' ', ' ', ' '],
            [' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ']
        ],
        next: [
            [' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ']
        ]

    }
    it.each`
        actual | next
        ${scenario1.actual} | ${scenario1.next} 
        ${scenario2.actual} | ${scenario2.next} 
  
    `("a live cell with less than two live neighbours dies", ({actual, next}) => {
        const grid = new Grid(actual)
        const game: Game = new Game(grid);
        const nextGeneratedGrid: Grid = new Grid(next)

        expect(game.play()).toEqual(nextGeneratedGrid)
    })

    it(" a live cell with two or three live neighbors, lives", () =>{
        const grid : Grid = new Grid([
            [' ', 'x', 'x'],
            ['x', ' ', ' '],
            [' ', ' ', ' ']
        ])

        const game: Game = new Game(grid);
        const nextGeneratedGrid: Grid = new Grid([
            [' ', 'x', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ])

        expect(game.play()).toEqual(nextGeneratedGrid)
    });
})

describe('Grid', () => {
    it.each`
        x    | y        | neighbours
        ${0} | ${0}     | ${1}
        ${0} | ${1}     | ${0}
    `("returns the neighbours of a given cell", ({ x, y, neighbours}) => {
        const grid = new Grid([
            [' ', 'x', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ])

        expect(grid.countAliveNeighbours(x, y)).toEqual(neighbours);
    })
})


