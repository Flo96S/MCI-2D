export function rect(ctx, x, y, w, h, fillStyle = "#fff", strokeStyle = "#000", lineWidth = 1) {
    ctx.fillStyle = fillStyle;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.fillRect(x, y, w, h);
    ctx.strokeRect(x, y, w, h);
}

export function line(ctx, x1, y1, x2, y2, strokeStyle = "#000", lineWidth = 1) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

export function arrow(ctx, x, y, strokeStyle) {
    x -= 25;
    y += 0;
    ctx.lineWidth = 0;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.moveTo(x + 5, y);
    ctx.lineTo(x + 50, y);
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.fillStyle = strokeStyle;
    ctx.moveTo(x, y);
    ctx.lineTo(x + 20, y + 20);
    ctx.lineTo(x + 20, y - 20);
    ctx.fill();
}

export function cross(ctx, x, y, size = 10, strokeStyle = "#000", lineWidth = 1) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.moveTo(x - size, y);
    ctx.lineTo(x + size, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x, y + size);
    ctx.stroke();
}

const startAngle = 0;
const endAngle = Math.PI * 2;

export function circle(ctx, x, y, radius, fillStyle = "#fff", strokeStyle = "#000", lineWidth = 1) {
    ctx.fillStyle = fillStyle;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, true);
    ctx.fill();
    ctx.stroke();
}


export function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

export function initCanvas(id) {
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return ctx;
}

export function getTransform(ctx, x, y, alpha = 0, sc = 1) {
    ctx.save();
    ctx.resetTransform();
    ctx.translate(x, y);
    ctx.rotate(alpha);
    ctx.scale(sc, sc);
    let L = ctx.getTransform();
    ctx.restore();
    return L;
}

