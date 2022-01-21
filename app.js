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

// main
data = {
    instructions: [
        { functionName: "drawPoint", args: [{ x: 0, y: 0 }, "blue"] },
        { functionName: "drawPoint", args: [{ x: 1, y: 1 }, "blue"] },
        { functionName: "drawLine", args: [{ x: 0, y: 0 }, { x: 1, y: 1 }, "yellow"] },
    ]
}

data.instructions.forEach((ins) => fns[ins.functionName](...ins.args));
