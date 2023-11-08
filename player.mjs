import * as cl from "./canvas_lib.mjs";


export function Player(ctx, posX, posY, color, rot) {
   let playerColor = color;
   let direction = 0;
   let positionX = posX;
   let positionY = posY;
   let playersize = 35;
   let rotation = rot * (Math.PI / 180);
   let offsetX = 0, offsetY = 0;

   function setRotation(rotate) {
      rotation = rotate;
   }

   function draw() {
      ctx.resetTransform();
      ctx.translate(positionX + offsetX, positionY + offsetY);
      ctx.rotate(rotation);
      cl.circle(ctx, 0, 0, playersize, playerColor, '#000', 2);
      cl.arrow(ctx, 0, 0, '#333');
      ctx.resetTransform();
   }

   function isInside(mouseX, mouseY) {
      let inside = cl.distance(positionX, positionY, mouseX, mouseY) > playersize;
      return inside;
   }

   function move(tx, ty, id) {
      tx, ty, id
   }

   function reset() {

   }

   function updateOffset(x, y) {
      offsetX = x;
      offsetY = y;
   }

   return { draw, isInside, move, reset, setRotation, updateOffset }
}