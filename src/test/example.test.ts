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

    // it(" a live cell with two or three live neighbors, lives", () =>{
    //     // [
    //     //     [' ', 'x', 'x'],
    //     //     ['x', ' ', ' ']
    //     //     [' ', ' ', ' ']
    //     // ]
    //     const grid = new Grid(['', 'x', 'x', 'x', '', '', ''])
    //     const game: Game = new Game(grid);
    //     const nextGeneratedGrid: Grid = new Grid(['', '', 'x', '', '', '', ''])
    //
    //     expect(game.play()).toEqual(nextGeneratedGrid)
    // });
})


