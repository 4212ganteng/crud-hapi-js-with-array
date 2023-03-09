const handlerbook = require("../handler/handler");

const routes = [
  // add new book
  {
    method: "POST",
    path: "/books",
    handler: handlerbook.Addbook,
  },
  //   find all
  {
    method: "GET",
    path: "/books",
    handler: handlerbook.Findbook,
  },
  //   find one
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: handlerbook.GetbookById,
  },
  //   update book
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: handlerbook.Updatebook,
  },
  //   Delete book
  {
    method: "DELETE",
    path: "/books/{bookId}",
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
