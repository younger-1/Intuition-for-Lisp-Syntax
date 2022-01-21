/*
 * An Intuition for Lisp Syntax
 * https://stopa.io/post/265
 */

// drawPoint({x: 0, y: 1}, 'yellow')
// drawLine({x: 0, y: 0}, {x: 1, y: 1}, 'blue')
// drawCircle(point, radius, 'red')
// rotate(shape, 90)

const variables = {}
const fns = {
    // normal
    drawPoint: (x, color) => [x, color],
    drawLine: (x, y, color) => [x, y, color],
    drawCircle: (x, r, color) => [x, r, color],
    rotate: (s, pi) => {
        console.log(s, pi);
        return [s, pi];
    },
    // special
    do: (...args) => args[args.length - 1],
    def: (name, value) => {
        variables[name] = value;
    },
}

// user data
data = [
    "do",
    // const p1 = drawPoint({ x: 0, y: 0 }, "blue")
    // const p2 = drawPoint({ x: 1, y: 1 }, "blue")
    // const myline = drawLine(p1, p2, "yellow")
    ["def", "p1", ["drawPoint", { x: 0, y: 0 }, "blue"]],
    ["def", "p2", ["drawPoint", { x: 1, y: 1 }, "blue"]],
    ["def", "myline", ["drawLine", "p1", "p2", "yellow"]],
    ["rotate", "myline", 90],
]


// main
const parseInstruction = (ins) => {
    if (variables[ins]) {
        return variables[ins];
    }
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
[ [ { x: 0, y: 0 }, 'blue' ], [ { x: 1, y: 1 }, 'blue' ], 'yellow' ] 90
*/
