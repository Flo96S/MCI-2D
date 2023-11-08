import { create_button } from "./button.mjs";
import * as cl from "./canvas_lib.mjs";
import { Obstacle } from "./obstacle.mjs";
import { Player } from "./player.mjs";
import { Joystick } from "./joystick.mjs";



window.onload = () => {
   const ctx = cl.initCanvas('canvas');
   let interactiveObjects = [], strokeStyle = "#000", points = [];
   let playerOne = new Player(ctx, 50, 250, '#0f0', 180);
   let playerTwo = new Player(ctx, 1050, 450, '#f00', 0);
   let obstacleSpawnOne = new Obstacle(ctx, 250, 100, 40, 200, 20);
   let obstacleSpawnTwo = new Obstacle(ctx, 900, 75, 40, 200, -10);
   let shootPlayerOne = new create_button(ctx, 10, 800);
   let stickOne = new Joystick(ctx, 75, 75, '#999999', 180)
   let stickTwo = new Joystick(ctx, 75, 500, '#999999', 180)

   interactiveObjects.push(stickOne);
   interactiveObjects.push(stickTwo);
   interactiveObjects.push(playerOne);
   //interactiveObjects.push(playerTwo);
   interactiveObjects.push(obstacleSpawnOne);
   interactiveObjects.push(obstacleSpawnTwo);
   //interactiveObjects.push(shootPlayerOne);

   canvas.addEventListener("touchstart", (evt) => {
      evt.preventDefault();
      setFingers(evt.changedTouches, true);
   }, true);

   canvas.addEventListener("touchmove", (evt) => {
      evt.preventDefault();
      setFingers(evt.changedTouches);
   }, true);

   canvas.addEventListener("touchend", (evt) => {
      evt.preventDefault();
      rmFingers(evt.changedTouches);
   }, true);


   let fingers = []
   function setFingers(touches, isStart = false) {
      let tx1, tx2, ty1, ty2;
      for (let t of touches) {
         if (isStart) {
            for (let o of interactiveObjects) {
               o.isInside(t.pageX, t.pageY, t.identifier);
            }
         } else {
            if (tx1) {
               tx2 ??= t.pageX;
               ty2 ??= t.pageY;
               let a = Math.atan2(ty2 - ty1, tx2 - tx1);
               console.log("alpha ", a);
            }
            tx1 ??= t.pageX;
            ty1 ??= t.pageY;

            let offset = stickOne.rawValue();
            let rotation = stickTwo.getRotation();
            playerOne.updateOffset(offset, offset);
            playerOne.setRotation(rotation);
            for (let o of interactiveObjects) {
               o.move(t.pageX, t.pageY, t.identifier);
            }
         }
         fingers[t.identifier] = {
            x: t.pageX,
            y: t.pageY,
         };
         //playerOne.setRotation(stickTwo.getRotation());
         //playerOne.updateOffset(stickOne.getRaw());
      }
   }

   function rmFingers(touches) {
      for (let t of touches) {
         fingers[t.identifier] = undefined;
         for (let o of interactiveObjects) {
            o.reset(t.identifier);
         }
      }
   }

   function draw() {
      ctx.resetTransform();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const o of interactiveObjects) {
         o.draw();
      }

      for (let f in fingers) {
         if (fingers[f]) {
            let finger = fingers[f];
            cl.circle(ctx, finger.x, finger.y, 10, "red");
         }
      }

      window.requestAnimationFrame(draw);
   }

   draw();
};