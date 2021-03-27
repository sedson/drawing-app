# Drawing with Friends

A simple drawing app where users can post doodles to a shared gallery.

[drawing-with-friends.online](https://drawing-with-friends.online)

![screenshot](/public/img/cover.png)

## Thanks

Charles Broskoski's [Drawing](http://charlesbroskoski.com/drawings/) project was a big inspiration.


## Implementation

The frontend uses javascript and HTML Canvas. Canvas has a native function `toDataURL()` which returns a base64-encocoded string representing the png data of the current canvas state. I am storing this string in my database and then streaming it back when the client requests an image.

The backend is a NodeJS app. I am using Mongoose and Mongo for data modeling and storage, Express for my API, and EJS for templating. I built the app following MVC and RESTful principles.

The live site is currently served by Nginx and lives on a DigitalOcean droplet running Ubuntu. I wanted to try a manual deployment to get familiar with using a remote machine and managing an environment without much auto configuration.

## Features

Users can:
- Create an account
- Create and post drawings
- Draw on top of exisiting drawings
- Manage drawings (lock/unlock and delete)
- Log in and log out
- Draw on touch screens

## Goals

My goal is to allow friends to doodle together. Currently the app has one global collection where all users' drawings are posted. To better encourage an intimate, friendly feel I want to implement galleries that would act as private rooms for groups of users.
