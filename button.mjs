import * as cl from "./canvas_lib.mjs"

const radius = 40;

/**
 * 
 * @param ctx 
 * @param x 
 * @param y 
 * @returns
 */
export function create_button(ctx, x, y) {
    let inside = false;

    function draw() {
        if (inside) {
            cl.circle(ctx, x, y, radius, '#191919', '#333', 2);
        } else {
            cl.circle(ctx, x, y, radius, '#191919', '#333', 2);
        }
    }

    function isInside(mouseX, mouseY) {
        inside = cl.distance(x, y, mouseX, mouseY) > radius;
        return inside;
    }

    return { draw, isInside }
}