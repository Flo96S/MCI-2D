import * as cl from "./canvas_lib.mjs";

//Known bug! If you use the joystick and then try to move the character, then the joystick will lock in the current position

const radius = 50;

/**
 * 
 * @param ctx 
 * @param x 
 * @param y 
 * @param options: {color:"#f00", touched:"#100", callback: function, linecolor:"#000"} 
 * @returns
 */
export function Joystick(ctx, x, y, defaultrot) {
   let L = cl.getTransform(ctx, x, y, 0, 20); // LKS des zu greifenden Obj.
   let inside = false, touchId;
   let x1 = x, y1 = y, thumbX = x, thumbY = y;
   let cpx1, cpy1;
   let directionrot = defaultrot;

   function draw() {
      if (inside) {
         cl.circle(ctx, x1, y1, radius, '#97979755', '#555', 2);
         cl.circle(ctx, thumbX, thumbY, radius / 2, '#BBBBBB', '#555', 2);
      } else {
         cl.circle(ctx, x1, y1, radius, '#97979733', '#000', 2);
         cl.circle(ctx, thumbX, thumbY, radius / 2, '#BBBBBB', '#000', 2);
      }
   }

   function isInside(mouseX, mouseY, id) {
      console.log(id);
      if (touchId !== undefined && touchId != id) {
         return;
      }
      inside = cl.distance(x1, y1, mouseX, mouseY) < radius / 2;
      if (inside) {
         touchId = id;
      }
      return inside;
   }

   function move(tx, ty, id) {
      //only move inner stick
      if (touchId === id && inside) {
         let newX = thumbX + tx - x1;
         let newY = thumbY + ty - y1;
         let distance = Math.hypot(newX - x1, newY - y1);
         const deadzone = radius * 0.8;
         if (distance < deadzone) {
            thumbX = x1;
            thumbY = y1;
         } else if (distance <= radius) {
            thumbX = newX;
            thumbY = newY;
         } else {
            let angle = Math.atan2(newY - y1, newX - x1);
            directionrot = angle;
            thumbX = x1 + Math.cos(angle) * radius;
            thumbY = y1 + Math.sin(angle) * radius;
         }
      }
   }

   function rawValue() {
      return directionrot;
   }

   function getRotation() {
      return directionrot;
   }

   function reset(id) {
      if (touchId === id) {
         inside = false;
         thumbX = x1;
         thumbY = y1;
         touchId = undefined;
      }
   }

   return { draw, isInside, move, reset, getRotation, rawValue }
}