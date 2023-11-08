import { create_button } from "./button.mjs";
import * as cl from "./canvas_lib.mjs";
import { Obstacle } from "./obstacle.mjs";
import { Player } from "./player.mjs";
import { Joystick } from "./joystick.mjs";
import { Projectile } from "./projectile.mjs";



window.onload = () => {
   let playerPosX = 50, playerPosY = 250;
   let x = 0;
   const ctx = cl.initCanvas('canvas');
   let shots = [];
   let fingers = [];
   let interactiveObjects = [];
   let playerOne = new Player(ctx, playerPosX, playerPosY, '#00FF0023', '#0F0', 0);
   let playerTwo = new Player(ctx, 1100, 200, '#FF000023', '#F00', 180);
   let obstacleSpawnOne = new Obstacle(ctx, 270, 100, 80);
   let obstacleSpawnTwo = new Obstacle(ctx, 850, 350, -70);
   let obstacleSpawnThree = new Obstacle(ctx, 425, 300, 10);

   interactiveObjects.push(playerOne);
   interactiveObjects.push(obstacleSpawnOne);
   interactiveObjects.push(obstacleSpawnTwo);
   interactiveObjects.push(obstacleSpawnThree);
   interactiveObjects.push(playerTwo);

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

   function setFingers(touches, isStart = false) {
      for (let t of touches) {
         if (isStart) {
            for (let o of interactiveObjects) {
               o.isInside(t.pageX, t.pageY, t.identifier);
            }
         } else {
            for (let o of interactiveObjects) {
               o.move(t.pageX, t.pageY, t.identifier);
            }
         }
         fingers[t.identifier] = {
            x: t.pageX,
            y: t.pageY,
         };

         playerPosX, playerPosY = playerOne.get();
      }
   }

   function rmFingers(touches) {
      for (let t of touches) {
         for (let o of interactiveObjects) {
            o.reset(t.identifier);
         }
         fingers[t.identifier] = undefined;
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

      x++;
      if (x >= 60) {
         x = 0;
      }
      if (x % 30 == 0) {
         let proj = new Projectile(ctx, playerPosX, playerPosY);
         shots.push(proj);
         console.log("Shoot");
      }

      for (const shot of shots) {
         shot.draw();
      }

      window.requestAnimationFrame(draw);
   }

   draw();
};