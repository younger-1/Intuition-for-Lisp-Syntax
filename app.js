/*
 * An Intuition for Lisp Syntax
 * https://stopa.io/post/265
 */

// drawPoint({x: 0, y: 1}, 'yellow')
// drawLine({x: 0, y: 0}, {x: 1, y: 1}, 'blue')
// drawCircle(point, radius, 'red')
// rotate(shape, 90)

const fns = {
    // normal
    drawPoint: (x, color) => console.log(x, color),
    drawLine: (x, y, color) => console.log(x, y, color),
    drawCircle: (x, r, color) => console.log(x, r, color),
    rotate: (s, pi) => console.log(s, pi),
    // special
    do: (...args) => args[args.length - 1],
}

// user data

data = [
    "do",
    ["drawPoint", { x: 0, y: 0 }, "blue"],
    ["drawPoint", { x: 1, y: 1 }, "blue"],
    // rotate(drawLine({ x: 0, y: 0 }, { x: 1, y: 1 }, 'yellow'), 90)
    ["rotate", ["drawLine", { x: 0, y: 0 }, { x: 1, y: 1 }, 'yellow'], 90],
]


// main
const parseInstruction = (ins) => {
    if (!Array.isArray(ins)) {
        // this must be a primitive argument, like {x: 0, y: 0}
        return ins;
    }
    const [fName, ...args] = ins;
    return fns[fName](...args.map(parseInstruction));
};
parseInstruction(data);

// output
/*
{ x: 0, y: 0 } blue
{ x: 1, y: 1 } blue
{ x: 0, y: 0 } { x: 1, y: 1 } yellow
undefined 90
*/
