import * as cl from "./canvas_lib.mjs";

export function Player(ctx, posX, posY, color, strokeCol, rot, id) {
   const playerImg = new Image();
   let inside = false;
   let touchId;
   playerImg.src = 'img/char.png';
   let playerColor = color;
   let stroke = strokeCol;
   let positionX = posX;
   let positionY = posY;
   let playersize = 35;
   let rotation = rot * (Math.PI / 180);
   let playerid = id;

   function setRotation(rotate) {
      rotation = rotate;
   }

   function draw() {
      ctx.resetTransform();
      ctx.translate(positionX, positionY);
      ctx.rotate(rotation);
      cl.circle(ctx, 0, 0, playersize, playerColor, stroke, 2);
      ctx.drawImage(playerImg, 0 - 50, 0 - 50, 312 / 3, 206 / 3);
      //cl.arrow(ctx, 0, 0, '#333');
      ctx.resetTransform();
   }

   function isInside(mouseX, mouseY, id, type = 0) {
      let _inside = cl.distance(positionX, positionY, mouseX, mouseY) < playersize;
      if (type == 1) {
         //Got shot
         console.log("Got shot");
      }
      if (touchId === undefined && _inside) {
         touchId = id;
         inside = _inside;
      }
      return _inside;
   }

   function move(tx, ty, id) {
      if (id === touchId && inside) {
         positionX = tx;
         positionY = ty;
      }
   }

   function reset(id) {
      if (id === touchId) {
         touchId = undefined;
         inside = false;
      }
   }

   function getY() {
      return positionX, positionY;
   }

   function getX() {
      return positionX;
   }

   function getRotDirection() {
      return { x: Math.cos(rotation), y: Math.sin(rotation) };
   }


   return { draw, isInside, move, reset, setRotation, getRotDirection, getY, getX }
}