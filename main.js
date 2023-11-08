import { create_button } from "./button.mjs";
import * as cl from "./canvas_lib.mjs";
import { Obstacle } from "./obstacle.mjs";
import { Player } from "./player.mjs";
import { Joystick } from "./joystick.mjs";
import { Projectile } from "./projectile.mjs";



window.onload = () => {
   let playerPosX = 50, playerPosY = 250, playerRotation = 0;
   let x = 0;
   const ctx = cl.initCanvas('canvas');
   let shots = [];
   let fingers = [];
   let interactiveObjects = [];
   let playerOne = new Player(ctx, playerPosX, playerPosY, '#00FF0023', '#0F0', playerRotation);
   let playerTwo = new Player(ctx, 1100, 200, '#FF000023', '#F00', 180);
   let obstacleSpawnOne = new Obstacle(ctx, 270, 100, 80);
   let obstacleSpawnTwo = new Obstacle(ctx, 850, 350, -70);
   let obstacleSpawnThree = new Obstacle(ctx, 425, 300, 10);
   let stickOne = new Joystick(ctx, 75, 550);
   let firerotX = 0, firerotY = 0;

   interactiveObjects.push(playerOne);
   interactiveObjects.push(obstacleSpawnOne);
   interactiveObjects.push(obstacleSpawnTwo);
   interactiveObjects.push(obstacleSpawnThree);
   interactiveObjects.push(playerTwo);
   interactiveObjects.push(stickOne);

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
         playerPosY = playerOne.getY();
         playerPosX = playerOne.getX();
         playerRotation = stickOne.getRotation();
         playerOne.setRotation(playerRotation);
         let rots = playerOne.getRotDirection();
         firerotX = rots.x;
         firerotY = rots.y;
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
         console.log(firerotX, ":", firerotY);
         let proj = new Projectile(ctx, playerPosX, playerPosY, firerotX, firerotY);
         shots.push(proj);
      }

      for (const shot of shots) {
         let b = shot.draw();
      }
      if (shots.length > 30) {
         shots.shift();
      }

      window.requestAnimationFrame(draw);
   }

   draw();
};