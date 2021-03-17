# Project 1 – ASCII Adventure Game

This is a single-player retro adventure game about trying to build a really cool outfit. Players can move around a map, pick up little trinkets, and trade them for randomly generated articles of clothing.

![Screenshot](images/screenshot.png)

## User Story

Users can expect to:
1. Start the game by clicking play
1. Read an intro to the game with classic RPG typing text
1. Move a character across tiles using keyboard arrow keys
1. Move into a new section of the world when they reach the edge of the map.
1. Not be able to move to unreachable tiles - like walls and rocks
1. See stats about the tiles that have been visited.
1. Use a pickup button to add items to their inventory.
1. Move into special tiles to trigger events like talking to characters
1. Trade items for new articles of clothing
1. See inventory and outfit on the screen
1. Get feedback on whether their outfit is "cool enough"
1. Be directed to a winning screen if their outfit is cool


## Wireframes

Elements of game
![Basic](images/wf1.png)

Modal Dialog for special events
![With Dialog](images/wf2.png)


## MVP

-  Map of world is small and stored in a predetermined text datafile.
-  User interacts with 5 to 10 different objects – whose positions are randomized – to find a lost item.

## Stretch Goals

-  Map of world is an image file. The app would read this image pixel by pixel and build the gameplay map based on a lookup table of colors that correspond to object types.
-  User interacts with 10 to 20 different dynamic objects to find 2 items.

## Super Stretchy Goals (maybe for after)

-  Map of world is procedurally generated following a clear set of rules. Dynamic objects are spawned based on probabilities and rules.
-  There are many many objects to find and user can keep playing as long as they want.
-  Buildings that the player can enter - look dark from outside, but when enter, the rest of the map goes dark.
-  Design a custom font so that instead of ASCII i can get a series of custom sprites with color very easily


a vintage pink cap
a glossy smock
glossy cargo pants
vintage pink cyber boots
