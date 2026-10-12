const r = require("raylib");

function setup() {
    const WIDTH = 400;
    const HEIGHT = 400;
    // const data = [12, 45, 78, 23, 91, 56, 34, 67, 89, 40];
    const data = [74, 9, 27, 99, 99, 56, 10, 67, 64, 40, 120, 86, 77];
    const barWidth = 30;
    const gap = 2;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, "Averages");
    r.SetTargetFPS(50);
    return {
        WIDTH,
        HEIGHT,
        data,
        barWidth,
        gap,
    };
}

function calTotal(array) {
    let total = 0;
    for (let i = 0; i < array.length; i++) {
        total += array[i];
    }
    return total;
}

function findMax(world) {
    let max = 0;
    for (let i = 0; i < world.data.length; i++) {
        max = world.data[i] > max ? world.data[i] : max;
    }
    return max;
}

function calAverage(array) {
    let total = calTotal(array);
    return total / array.length;
}

function drawAvgLine(world) {
    const max = findMax(world);
    const average = calAverage(world.data);
    const height = (world.HEIGHT * 0.9) * average / max;
    const x1 = 0;
    const y1 = world.HEIGHT - height;
    const x2 = world.WIDTH;
    const y2 = world.HEIGHT - height;

    r.DrawLine(x1, y1, x2, y2, r.RED);
}

function drawBar(world) {
    const max = findMax(world);
    const scale = (world.HEIGHT * 0.9) / max;
    let x = 0;
    let y;
    const width = world.barWidth < 1 ? 1 : world.barWidth;
    let height;

    for (let i = 0; i < world.data.length; i++) {
        height = scale * world.data[i];
        y = world.HEIGHT - height;

        r.DrawRectangle(x, y, width, height, r.BLUE);
        x = x + Math.abs(world.barWidth) + world.gap;

    }
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.WHITE);

    drawBar(world);
    drawAvgLine(world);

    r.EndDrawing();
}


function loop(world) {
    while (!r.WindowShouldClose()) {
        draw(world);
    }
}

function main() {
    const world = setup()
    loop(world);
}

main();