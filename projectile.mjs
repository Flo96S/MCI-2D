import * as cl from "./canvas_lib.mjs";

export function Projectile(ctx, x, y) {
   let speed = 20;
   let posX = x, posY = y;
   let size = 10;

   function draw() {
      ctx.resetTransform();
      //ctx.translate(x, y);
      //ctx.rotate(rotation);
      cl.circle(ctx, posX, posY, size, '#000', '#FF0', 2);
      ctx.resetTransform();
      posX += speed;
   }

   function isInside(mouseX, mouseY) {
      //inside = cl.distance(x, y, mouseX, mouseY) > radius;
      return false;
   }

   function move() {
      if (posX > 2000) return;
      posX += speed;
      posY += 0;

   }

   function reset() {

   }

   return { draw, isInside, move, reset }
}