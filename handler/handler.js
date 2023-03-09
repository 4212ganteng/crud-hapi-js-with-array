// nanoid
const { nanoid } = require("nanoid");
const fakeDb = require("../db/bookDb");

class handlerbook {
  // add a book`
  Addbook = (request, h) => {
    const {
      name,
      pageCount,
      readPage,
      author,
      publisher,
      year,
      summary,
      reading,
    } = request.payload;
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    if (!name) {
      return h
        .response({
          status: "fail",
          message: "Gagal menambahkan buku. Mohon isi nama buku",
        })
        .code(400);
    }

    if (readPage > pageCount) {
      return h
        .response({
          status: "fail",
          message:
            "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        })
        .code(400);
    }

    const finished = readPage === pageCount;

    const newbook = {
      id,
      name,
      pageCount,
      readPage,
      finished,
      author,
      publisher,
      year,
      summary,
      reading,
      updatedAt,
      insertedAt,
    };

    fakeDb.push(newbook);

    const isSuccess = fakeDb.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
      return h
        .response({
          status: "success",
          message: "Buku berhasil ditambahkan",
          data: {
            bookId: id,
          },
        })
        .code(201);
    }

    return h
      .response({
        status: "error",
        message: "Buku gagal ditambahkan",
      })
      .code(500);
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
          status: "success",
          data: {
            books: [],
          },
        });
        res.code(200);
        return res;
      }
    } catch (error) {
      console.log("fail", error);
      return h.code(500);
    }
  };

  // find one
  GetbookById = (request, h) => {
    try {
      const { bookId } = request.params;
      const book = fakeDb.filter((item) => item.id === bookId)[0];

      if (!book) {
        const res = h.response({
          status: "fail",
          message: "Buku tidak ditemukan",
        });
        res.code(404);
        return res;
      }

      const res = h.response({
        status: "success",
        data: {
          book: {
            id: book.id,
            name: book.name,
            year: book.year,
            author: book.author,
            summary: book.summary,
            publisher: book.publisher,
            pageCount: book.pageCount,
            readPage: book.readPage,
            finished: book.pageCount === book.readPage,
            reading: book.reading,
            insertedAt: book.insertedAt,
            updatedAt: book.updatedAt,
          },
        },
      });
      res.code(200);
      return res;
    } catch (error) {
      console.log("fail", error);
      const res = h.response({
        status: "error",
        message: "Internal Server Error",
        statusCode: 500,
      });
      res.code(500);
      return res;
    }
  };

  //   ubah book
  Updatebook = (request, h) => {
    const { bookId } = request.params;
    const {
      name,
      year,
      author,
      publisher,
      pageCount,
      readPage,
      reading,
      summary,
    } = request.payload;
    const updatedAt = new Date().toISOString();
    const finished = pageCount === readPage;
    // find id in array of books
    const index = fakeDb.findIndex((item) => item.id === bookId);
    // jika ada maka dia bernialai pada var index
    // namun jika ga ada maka dia nilai nya -1
    if (index !== -1) {
      // Check if the name field is empty or not
      if (!name) {
        const response = h.response({
          status: "fail",
          message: "Gagal memperbarui buku. Mohon isi nama buku",
        });
        response.code(400);
        return response;
      }

      // Check if the readPage value is valid or not
      if (readPage > pageCount) {
        const response = h.response({
          status: "fail",
          message:
            "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        });
        response.code(400);
        return response;
      }

      fakeDb[index] = {
        ...fakeDb[index],
        name,
        year,
        author,
        finished,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt,
        summary,
      };

      const response = h.response({
        status: "success",
        message: "Buku berhasil diperbarui",
        data: {
          book: fakeDb[index],
        },
      });
      response.code(200);
      return response;
    }

    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  };

  //   delete book
  Deletebook = (request, h) => {
    try {
      const { bookId } = request.params;
      const index = fakeDb.findIndex((item) => item.id === bookId);
      if (index !== -1) {
        const deletedBook = fakeDb.splice(index, 1)[0];
        const response = h.response({
          status: "success",
          message: "Buku berhasil dihapus",
          // data: deletedBook,
        });
        response.code(200);
        return response;
      } else {
        const response = h.response({
          status: "fail",
          message: "Buku gagal dihapus. Id tidak ditemukan",
        });
        response.code(404);
        return response;
      }
    } catch (error) {
      const response = h.response({
        status: "error",
        message: "Gagal menghapus buku",
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
