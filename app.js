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
// code is data and data is code!
data = [
    "do",
    ["def", "p1", ["drawPoint", { x: 0, y: 0 }, "blue"]],
    ["def", "p2", ["drawPoint", { x: 1, y: 1 }, "blue"]],
    ["def", "p3", ["drawPoint", { x: 1, y: 0 }, "blue"]],
    ["rotate", ["drawLine", "p1", "p2", "yellow"], 90],
    ["def", "drawTriangle",
        ["fn", ["left", "top", "right", "color"],
            ["do",
                ["drawLine", "left", "top", "color"],
                ["drawLine", "top", "right", "color"],
                ["drawLine", "left", "right", "color"],
            ],
        ],
    ],
    ["drawTriangle", "p1", "p2", "p3", "yellow"],
]


// main
// 将形参映射到实参：map parameters to arguments
const mapArgsWithValues = (args, values) => {
    return args.reduce((res, k, idx) => {
        res[k] = values[idx];
        return res;
    }, {});
}
const parseFnInstruction = (args, body, oldVariables) => {
    return (...values) => {
        const newVariables = { ...oldVariables, ...mapArgsWithValues(args, values) };
        return parseInstruction(body, newVariables);
    };
}
const parseInstruction = (ins, variables) => {
    if (variables[ins]) {
        return variables[ins];
    }
    if (!Array.isArray(ins)) {
        // this must be a primitive argument, like {x: 0, y: 0}
        return ins;
    }
    const [fName, ...args] = ins;
    if (fName == "fn") {
        return parseFnInstruction(...args, variables);
    }
    const fn = fns[fName] || variables[fName];
    return fn(...args.map((arg) => parseInstruction(arg, variables)));
};
parseInstruction(data, variables);

// output
/*
[ [ { x: 0, y: 0 }, 'blue' ], [ { x: 1, y: 1 }, 'blue' ], 'yellow' ] 90
*/
