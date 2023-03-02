// nanoid
const { nanoid } = require("nanoid");
const fakeDb = require("../db/bookDb");

class handlerbook {
  // add a book`
  Addbook = (request, h) => {
    const { name, publisher } = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updateAt = createdAt;
    // cek book must required
    if (name == undefined || name == "") {
      const res = h.response({
        status: "failed",
        message: "Book name must be provided",
      });
      res.code(400);
      return res;
    }
    // tangkap -> kumpulkan->push ke fake DB
    const newbook = { id, name, publisher, createdAt, updateAt };
    console.log({ newbook });
    // push ke fake db
    fakeDb.push(newbook);

    const succes = fakeDb.filter((item) => item.id === id).length > 0;
    console.log({ succes });
    if (succes) {
      const res = h.response({
        status: succes,
        message: "Success add book",
        data: {
          bookId: id,
          name: newbook.name,
          publisher: newbook.publisher,
        },
      });
      res.code(201);
      console.log({ fakeDb });
      return res;
    }

    const res = h.response({
      status: "failed",
      message: "Failed to add book",
    });
    res.code(500);
    console.log({ fakeDb });

    return res;
  };

  //   find all books
  Findbook = (request, h) => {
    try {
      const ceklength = fakeDb.length > 0;
      console.log({ ceklength });
      console.log({ fakeDb });
      if (ceklength) {
        const books = fakeDb.map(({ id, name, publisher }) => ({
          id,
          name,
          publisher,
        }));
        const res = h.response({
          status: "success",
          message: "Success find all data",
          data: {
            books,
          },
        });
        res.code(200);
        return res;
      } else {
        const res = h.response({
          status: "success but empty data",
          message: "Success but empty data",
          data: {
            books: [],
          },
        });
        res.code(200);
        return res;
      }
    } catch (error) {
      console.log("failed", error);
      return h.code(500);
    }
  };

  // find one
  GetbookById = (request, h) => {
    try {
      const { id } = request.params;
      const book = fakeDb.find((item) => item.id === id);

      if (!book) {
        const res = h.response({
          status: "failed",
          message: "Book not found",
          statusCode: 404, // menambahkan properti "statusCode" untuk mencantumkan kode status yang diharapkan
        });
        res.code(404);
        res.status = "failed"; // menambahkan properti "status" yang merupakan properti miliknya sendiri
        return res;
      }

      const res = h.response({
        status: "success",
        message: "Success find book by id",
        data: {
          book: {
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          },
        },
      });
      res.code(200);
      res.status = "success";
      return res;
    } catch (error) {
      console.log("failed", error);
      const res = h.response({
        status: "error",
        message: "Internal Server Error",
        statusCode: 500, // menambahkan properti "statusCode" untuk mencantumkan kode status yang diharapkan
      });
      res.code(500);
      res.status = "error";
      return res;
    }
  };

  //   ubah book
  Updatebook = (request, h) => {
    const { id } = request.params;
    const { name, publisher } = request.payload;
    const updateAt = new Date().toISOString();

    // find id in array of books
    const index = fakeDb.findIndex((item) => item.id === id);
    // jika ada maka dia bernialai pada var index
    // namun jika ga ada maka dia nilai nya -1
    if (index !== -1) {
      fakeDb[index] = {
        ...fakeDb[index],
        name,
        publisher,
        updateAt,
      };

      const response = h.response({
        status: "success",
        message: "Buku berhasil diperbarui",
        data: fakeDb,
      });
      response.code(200);
      return response;
    }

    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui Buku. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  };

  //   delete book
  Deletebook = (request, h) => {
    try {
      const { id } = request.params;
      const index = fakeDb.findIndex((item) => item.id === id);
      const data = fakeDb[index];
      if (index !== -1) {
        fakeDb.splice(index, 1);
        const response = h.response({
          status: "success",
          message: "Buku berhasil dihapus",
          data: data,
        });
        response.code(200);
        return response;
      } else {
        const response = h.response({
          status: "failed",
          message: "Buku tidak ditemukan",
        });
        response.code(404);
        return response;
      }
    } catch (error) {
      const response = h.response({
        status: "failed",
        message: "Gagal hapus data",
        error,
      });
      response.code(500);
      return response;
    }
  };

  //   search for books title
  //   Search = (request, h) => {
  //     const { search } = request.params;

  //     console.log({ search });

  //     const data = fakeDb.map((item) => data);
  //     console.log({ data });
  //     if (data) {
  //       const res = h.response({
  //         status: "success",
  //       });
  //     }
  //     console.log({ data });
  //   };
}
module.exports = new handlerbook();
