# D3-Physics
A small game made by Isai Rincon using Arcade Physics in Phaser.

**Link to game:** https://squarefeller.github.io/D3-Physics/

Gameplay/Experience requirements:
- **The game uses both continuous and discrete inputs from the player:** The player moves left and right with the arrow keys and jumps with the spacebar. These are discrete inputs that, even if held down for a period of time, will not change their effect. I hope that using drag on the mouse counts as continuous input. This is scene on every level complete screen since the player must drag the ball on the left to the right in order to progress. A drag, to me, does not feel as discrete as keyboard inputs, so I hope it counts as a continous input. 
- **The player’s goal can only be achieved indirectly (by allowing the physics engine to move key objects into position/contact):** In every level, the player is unable to directly control the soccer ball's trajectory and path. They must collide with the ball and hope that it goes in the direction they intend it to go. The soccer ball is not being directly controlled by the player, so I hope it counts for the goal being indirectly achieved.
- **3+ physics-based gameplay scenes (possibly implemented with a single Phaser Scene subclass):** There are 3 levels in my game and they are all treated as Phaser Scenes in code. In the code they are named "Level 1", "Level 2", and "Level 3". 
- **Other scenes are used to separate and contextualize the gameplay scenes:** There is a level complete screen after each level that tries to contextualize the game as a soccer player improving and moving up in the professional soccer world. These scenes also serve as breaks between the levels that tell the player how long they took and requires an input from them in order to proceed to the next. 

Assets/Code Acknowledgments and Notes:
- All of the assets were made in Phaser, except the image I took on my phone that serves as the image held within the frame for the Next Slide Studio logo.
- Nathaniel Chu, my friend and classmate, assisted greatly with the code for keeping track of time in my levels. 
- The examples from [Phaser labs](https://labs.phaser.io/index.html) were very helpful in understanding Arcade Physics and getting the mouse drag input. 
- Note: I could have dealt with the collision physics better, especially in the last level, so there is quite a bit of jank when it comes to the physics. 
- Note: I would have loved to do more with this demo, such as include sound and better image assets, but getting to grips with physics and external factors made this demo quite a bit more difficult.
