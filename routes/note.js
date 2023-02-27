const handlerNote = require("../handler/handler");

const routes = [
  // add new note
  {
    method: "POST",
    path: "/note",
    handler: handlerNote.Addnote,
  },
  //   find all
  {
    method: "GET",
    path: "/",
    handler: handlerNote.FindNote,
  },
  //   update note
  {
    method: "PUT",
    path: "/note/{id}",
    handler: handlerNote.UpdateNote,
  },
  //   Delete note
  {
    method: "DELETE",
    path: "/note/{id}",
    handler: handlerNote.DeleteNote,
  },
];

module.exports = routes;
