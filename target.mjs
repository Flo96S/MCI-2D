import * as cl from "./canvas_lib.mjs"

const radius = 40;

/**
 * 
 * @param ctx 
 * @param x 
 * @param y 
 * @returns
 */
export function CreateTarget(ctx, _x, _y, _callback) {
   let inside = false;
   let callback = _callback;
   let x = _x, y = _y;
   let sizeY = 75;

   function draw(_y) {
      y = _y;
      if (inside) {
         cl.rect(ctx, x, y, 10, sizeY, '#c0c0c0', '#c0c0c0', 1);
         //cl.circle(ctx, x, y, radius, '#191919', '#333', 2);
      } else {
         cl.rect(ctx, x, y, 10, sizeY, '#c0c0c0', '#0000ff', 1);
         //cl.rect(ctx, x, y, 10, 50, '#00BB00', '#00FF00', 1);
         //cl.circle(ctx, x, y, radius, '#191919', '#333', 2);
      }
   }

   function isInside(mouseX, mouseY) {
      inside = mouseX > x && mouseX < sizeY + x && mouseY > y && mouseY < y + sizeY;
      return inside;
   }

   function getX() {
      return x;
   }

   function getY() {
      return y;
   }

   function move(tx, ty, id) {

   }

   function reset(tx, ty, id) {

   }

   return { draw, isInside, move, reset, getX, getY }
}