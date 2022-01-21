// drawPoint({x: 0, y: 1}, 'yellow')
// drawLine({x: 0, y: 0}, {x: 1, y: 1}, 'blue')
// drawCircle(point, radius, 'red')
// rotate(shape, 90)

const fns = {
    drawLine: (x, y, color) => console.log(x, y, color),
}

// main
data = {
    instructions: [
        { functionName: "drawLine", args: [{ x: 0, y: 0 }, { x: 1, y: 1 }, "blue"] },
    ]
}

data.instructions.forEach((ins) => fns[ins.functionName](...ins.args));
