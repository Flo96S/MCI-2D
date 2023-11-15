import * as cl from "./canvas_lib.mjs";

export function CreateText(ctx, x, y, _text) {
   let text = _text;
   text = "Hello";
   function draw(_text) {
      text = _text;
      ctx.textAlign = 'center';
      ctx.resetTransform();
      ctx.font = '36px sans-serif';
      ctx.fillText(text, x, y);
   }

   function updateText(_text) {
      text = _text;
   }

   function isInside(mouseX, mouseY) {
      return false;
   }

   function move() {
   }

   function reset() {
   }

   return { draw, isInside, move, reset, updateText }
}