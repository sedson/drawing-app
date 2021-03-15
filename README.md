# Project 2
## Drawing with friends

## User Story
This app will be based on an html canvas drawing tool. Users will be able to create and post drawings, view drawings made by other users, and draw on top of other people's drawings.

## Models
```
User {
  _id: id
  name: String
  password: encrypted String
  color: String
}

Drawing {
  _id: id
  createdBy: String (user)
  createdAt: Timestamp
  publicEditing: Boolean
  drawing: String (maybe id -> pointing to another model)
  editLog: [{user: String, editedAt: Timestamp}]
}
```

##Routes
| HTTP | Route | Result |
| ---- | ----- | ------ |
| GET | /drawings/ | See all the drawings (each drawing links to its show page)
| GET | /drawings/username | See all the drawings made or editied by a user
| GET | /drawings/id | See one drawing including its edit history (usernames link to the userpage)
| GET | /drawings/id/edit | Edit page for a drawing. Editing a drawing means drawing on top of it. Some drawing can be edited by any user. Other drawings can only be edited by the creator
| GET | /drawings/new | Gets the new drawing page
| POST | /drawings/ | adds new drawing to the database
| PUT | /drawings/id | updates a drawing in the datatbase
| DELETE | /drawing/ | 
