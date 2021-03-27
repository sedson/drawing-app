# Drawing with Friends

A simple drawing app where users can post doodles to a shared gallery.

[drawing-with-friends.online]('https://drawing-with-friends.online')

## Implementation

The frontend drawing feature uses HTML Canvas. Canvas has a native function `toDataURL()` that returns a base64-encocoded string representing the current canvas state as a png (or jpeg). I am storing this string in my database and then streaming it back when the client requests images.

The backend is a NodeJS app. I am using Mongoose and Mongo for data modeling and storing, Express for routing, and EJS for templating. I built the app following REST and MVP guide

The live site is currently served by Nginx and lives on a DigitalOcean droplet running Ubuntu. I wanted to try a manual deployment to get familiar with using a remote machine and managing an environment without much auto configuration.

## Features

Users can:
- Create an account and choose a crayon colol
- Create and post drawings
- Edit exisiting drawing
- Manage drawings (lock/unlock and delete)
- Log out and Log in

## Goals

My goal is to allow friends to doodle together. Currently the app has one global collection, where all users drawings are posted. To better encourage an intimate, friendly feel I want to implement galleries that would act as private rooms for groups of users.
