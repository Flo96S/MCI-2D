import * as cl from "./canvas_lib.mjs"

const radius = 40;

/**
 * 
 * @param ctx 
 * @param x 
 * @param y 
 * @returns
 */
export function CreateTarget(ctx, x, y, _callback) {
   let inside = false;
   let callback = _callback;

   function draw() {
      if (inside) {
         cl.rect(ctx, x, y, 10, 50, '#c0c0c0', '#c0c0c0', 1);
         //cl.circle(ctx, x, y, radius, '#191919', '#333', 2);
      } else {
         cl.rect(ctx, x, y, 10, 50, '#c0c0c0', '#0000ff', 1);
         //cl.rect(ctx, x, y, 10, 50, '#00BB00', '#00FF00', 1);
         //cl.circle(ctx, x, y, radius, '#191919', '#333', 2);
      }
   }

   function isInside(mouseX, mouseY) {
      inside = cl.distance(x, y, mouseX, mouseY) > radius;
      if (inside) {
         callback;
      }
      return inside;
   }

   function move(tx, ty, id) {

   }

   function reset(tx, ty, id) {

   }

   return { draw, isInside, move, reset }
}