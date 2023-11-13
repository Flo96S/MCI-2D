import * as cl from "./canvas_lib.mjs";

export function Projectile(ctx, x, y, rotX, rotY, shotid) {
   let speed = 20;
   let posX = x, posY = y;
   let size = 5;
   let _rotX = rotX, _rotY = rotY;
   let shotby = shotid;


   function draw() {
      ctx.resetTransform();
      //ctx.translate(x, y);
      //ctx.rotate(rotation);
      cl.circle(ctx, posX, posY, size, '#FFF', '#FF0', 2);
      ctx.resetTransform();
      posX += speed * _rotX;
      posY += speed * _rotY;
   }

   function isInside(mouseX, mouseY) {
      inside = cl.distance(x, y, mouseX, mouseY) > radius;
      return inside;
   }

   function move() {
      if (posX > 2000) return;
      posX += speed * _rotX;
      posY += 0 * _rotY;
   }

   function getShotBy() {
      return shotby;
   }

   function getX() {
      return posX;
   }

   function getY() {
      return posY;
   }

   function reset() {

   }

   return { draw, isInside, move, reset, getX, getY, getShotBy }
}