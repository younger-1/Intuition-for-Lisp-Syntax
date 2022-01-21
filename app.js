/*
 * An Intuition for Lisp Syntax
 * https://stopa.io/post/265
 */

// drawPoint({x: 0, y: 1}, 'yellow')
// drawLine({x: 0, y: 0}, {x: 1, y: 1}, 'blue')
// drawCircle(point, radius, 'red')
// rotate(shape, 90)

const fns = {
    drawPoint: (x, color) => console.log(x, color),
    drawLine: (x, y, color) => console.log(x, y, color),
    drawCircle: (x, r, color) => console.log(x, r, color),
    rotate: (s, pi) => console.log(s, pi),
}

// user data
data = {
    instructions: [
        ["drawPoint", { x: 0, y: 0 }, "blue"],
        ["drawPoint", { x: 1, y: 1 }, "blue"],
        ["drawLine", { x: 0, y: 0 }, { x: 1, y: 1 }, "yellow"],
    ]
}

// main
data.instructions.forEach(([fname, ...args]) => fns[fname](...args));

// output
/*
{ x: 0, y: 0 } blue
{ x: 1, y: 1 } blue
{ x: 0, y: 0 } { x: 1, y: 1 } yellow
*/
