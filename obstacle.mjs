import * as cl from "./canvas_lib.mjs";

export function Obstacle(ctx, x, y, xsize, ysize, rot) {
   let rotation = rot * (Math.PI / 180);

   function draw() {
      ctx.resetTransform();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      cl.rect(ctx, 0, 0, xsize, ysize, '#00f', '00f', 1);
      ctx.resetTransform();
   }

   function isInside(mouseX, mouseY) {
      //inside = cl.distance(x, y, mouseX, mouseY) > radius;
      return false;
   }

   function move() {

   }

   function reset() {

   }

   return { draw, isInside, move, reset }
}