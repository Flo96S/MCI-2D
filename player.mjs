import * as cl from "./canvas_lib.mjs";

export function Player(ctx, posX, posY, color, strokeCol, rot) {
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
   let offsetX = 0, offsetY = 0;

   function setRotation(rotate) {
      rotation = rotate;
   }

   function draw() {
      ctx.resetTransform();
      ctx.translate(positionX + offsetX, positionY + offsetY);
      ctx.rotate(rotation);
      cl.circle(ctx, 0, 0, playersize, playerColor, stroke, 2);
      ctx.drawImage(playerImg, 0 - 50, 0 - 50, 312 / 3, 206 / 3);
      //cl.arrow(ctx, 0, 0, '#333');
      ctx.resetTransform();
   }

   function isInside(mouseX, mouseY, id) {
      let _inside = cl.distance(positionX, positionY, mouseX, mouseY) < playersize;
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
      //offsetX += tx * 0.05;
      //offsetY += ty * 0.05;
   }

   function reset(id) {
      if (id === touchId) {
         touchId = undefined;
         inside = false;
      }
   }

   function get() {
      return (positionX, positionY);
   }

   function updateOffset(x, y) {
      //offsetX = x;
      //offsetY = y;
   }

   return { draw, isInside, move, reset, setRotation, updateOffset, get }
}