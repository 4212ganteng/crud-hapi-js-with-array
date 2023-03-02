const handlerbook = require("../handler/handler");

const routes = [
  // add new book
  {
    method: "POST",
    path: "/book",
    handler: handlerbook.Addbook,
  },
  //   find all
  {
    method: "GET",
    path: "/",
    handler: handlerbook.Findbook,
  },
  //   find one
  {
    method: "GET",
    path: "/{id}",
    handler: handlerbook.GetbookById,
  },
  //   update book
  {
    method: "PUT",
    path: "/book/{id}",
    handler: handlerbook.Updatebook,
  },
  //   Delete book
  {
    method: "DELETE",
    path: "/book/{id}",
    handler: handlerbook.Deletebook,
  },
  //   search by title
  //   {
  //     method: "GET",
  //     path: "/book/{search?}",
  //     handler: handlerbook.Search,
  //   },
];

module.exports = routes;
