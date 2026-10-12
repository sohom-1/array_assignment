const r = require("raylib");

function isPeak(array) {
    const peaks = {};
    for (let i = 0; i < array.length; i++) {
        peaks[i] = (array[i - 1] < array[i] && array[i] > array[i + 1]);
    }
    return peaks;
}

function setup() {

    const WIDTH = 400;
    const HEIGHT = 400;
    const data = [74, 9, 207, 99, 99, 56, 75, 67, 64, 89, 120, 86, 77];
    const gap = 30;
    const scalingFactor = 0.9;
    const peaks = isPeak(data);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, "Peaks");
    r.SetTargetFPS(50);

    return {
        WIDTH,
        HEIGHT,
        data,
        gap,
        scalingFactor,
        peaks,
    }
}

function findMax(world) {
    let max = 0;
    for (let i = 0; i < world.data.length; i++) {
        max = Math.max(max, world.data[i]);
    }

    return max;
}



function getCord(w, i) {
    const max = findMax(w);
    const scale = (w.HEIGHT * w.scalingFactor) / max;
    const x = i * w.gap;
    const y = w.HEIGHT - (scale * w.data[i]);

    return {
        x,
        y,
    }
}



function drawLineChartWithPeaks(world) {
    let p1;
    let p2;
    for (let i = 0; i < world.data.length - 1; i++) {
        p1 = getCord(world, i);
        p2 = getCord(world, i + 1);
        r.DrawLineV(p1, p2, r.BLACK);

        if (world.peaks[i]) {
            r.DrawCircle(p1.x, p1.y, 3, r.RED);
        }

    }
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.WHITE);
    drawLineChartWithPeaks(world);
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