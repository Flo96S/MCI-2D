import { create_button } from "./button.mjs";
import * as cl from "./canvas_lib.mjs";
import { Obstacle } from "./obstacle.mjs";
import { Player } from "./player.mjs";
import { Joystick } from "./joystick.mjs";
import { Projectile } from "./projectile.mjs";
import { CreateTarget } from "./target.mjs";
import { CreateText } from "./text.mjs";



window.onload = () => {
   let deviceW = window.innerWidth;
   let deviceH = window.innerHeight;
   let max = deviceH - 150, min = 30;
   let PointsPlayerOne = 0;
   let PointsPlayerTwo = 0;

   let playerTwoPosX = deviceW - 75, playerTwoPosY = getRandom(), playerTwoRotation = 180;
   let playerTwoRotX = -1, playerTwoRotY = 0;
   let playerPosX = 50, playerPosY = getRandom(), playerRotation = 0;
   let x = 0;
   const ctx = cl.initCanvas('canvas');
   let shots = [];
   let fingers = [];
   let interactiveObjects = [];
   let playerOne = new Player(ctx, playerPosX, playerPosY, '#00FF0023', '#0F0', playerRotation, 1);
   let playerTwo = new Player(ctx, playerTwoPosX, playerTwoPosY, '#FF000023', '#F00', playerTwoRotation, 2);
   let obstacleSpawnOne = new Obstacle(ctx, deviceW * 0.2, 100, 80);
   let obstacleSpawnTwo = new Obstacle(ctx, deviceW * 0.7, 350, -70);
   let obstacleSpawnThree = new Obstacle(ctx, deviceW * 0.4, 300, 10);
   let stickOne = new Joystick(ctx, 75, 550);
   let stickTwo = new Joystick(ctx, deviceW - 70, 550);
   let firerotX = 1, firerotY = 0;
   let textOne = new CreateText(ctx, 20, 40, "0");
   let textTwo = new CreateText(ctx, deviceW - 50, 40, "0");

   interactiveObjects.push(playerOne);
   interactiveObjects.push(obstacleSpawnOne);
   interactiveObjects.push(obstacleSpawnTwo);
   interactiveObjects.push(obstacleSpawnThree);
   interactiveObjects.push(playerTwo);
   interactiveObjects.push(stickOne);
   interactiveObjects.push(stickTwo);

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

   function HitTarget() {
      alert("hit target");
   }

   function getRandom() {
      return Math.floor(Math.random() * (max - min) + min);
   }

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
         playerTwoPosX = playerTwo.getX();
         playerTwoRotY = playerTwo.getY();
         playerRotation = stickOne.getRotation();
         playerTwoRotation = stickTwo.getRotation();
         playerOne.setRotation(playerRotation);
         playerTwo.setRotation(playerTwoRotation);
         let rots = playerOne.getRotDirection();
         let rotsPT = playerTwo.getRotDirection();
         firerotX = rots.x;
         firerotY = rots.y;
         playerTwoRotX = rotsPT.x;
         playerTwoRotY = rotsPT.y;
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
      if (x % 30 == 0) { //Adjust shoot frequenz
         let projOne = new Projectile(ctx, playerPosX, playerPosY, firerotX, firerotY, 1);
         let projTwo = new Projectile(ctx, playerTwoPosX, playerTwoPosY, playerTwoRotX, playerTwoRotY, 2);
         shots.push(projOne);
         shots.push(projTwo);
      }

      for (const shot of shots) {
         shot.draw();
         //Check collision
      }

      //Check for collision
      for (const shot of shots) {
         let x = shot.getX();
         let y = shot.getY();
         let id = shot.getShotBy();
         if (id == 1) {
            let inside = playerTwo.isInside(x, y, 1);
            if (inside) {
               PointsPlayerOne += 1;
               let index = shots.indexOf(shot);
               shots.splice(index, 1);
            }
         } else if (id == 2) {
            let inside = playerOne.isInside(x, y, 1);
            if (inside) {
               PointsPlayerTwo += 1;
               let index = shots.indexOf(shot);
               shots.splice(index, 1);
            }
         }
      }

      if (shots.length > 30) {
         shots.shift();
      }
      textOne.draw(PointsPlayerOne);
      textTwo.draw(PointsPlayerTwo);

      window.requestAnimationFrame(draw);
   }

   draw();
};