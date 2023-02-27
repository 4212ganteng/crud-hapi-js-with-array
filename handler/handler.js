// nanoid
const { nanoid } = require("nanoid");
const fakeDb = require("../db/noteDb");

class handlerNote {
  // add a note`
  Addnote = (request, h) => {
    const { title, tags, body } = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updateAt = createdAt;

    // tangkap -> kumpulkan->push ke fake DB
    const newNote = { id, title, tags, body, createdAt, updateAt };
    console.log({ newNote });
    // push ke fake db
    fakeDb.push(newNote);

    const succes = fakeDb.filter((item) => item.id === id).length > 0;
    console.log({ succes });
    if (succes) {
      const res = h.response({
        status: succes,
        message: "Success add note",
        data: {
          noteId: id,
          title: newNote.title,
          tags: newNote.tags,
          body: newNote.body,
        },
      });
      res.code(201);
      console.log({ fakeDb });
      return res;
    }

    const res = h.response({
      status: "failed",
      message: "Failed to add note",
    });
    res.code(500);
    console.log({ fakeDb });

    return res;
  };

  //   find all notes
  FindNote = (request, h) => {
    try {
      const ceklength = fakeDb.length > 0;
      console.log({ ceklength });
      console.log({ fakeDb });
      if (ceklength) {
        const res = h.response({
          status: "success",
          message: "Success find all data",
          data: fakeDb,
        });
        res.code(201);
        return res;
      } else {
        const res = h.response({
          status: "success but empty data",
          message: "Success but empty data",
          data: fakeDb,
        });
        res.code(201);
        return res;
      }
    } catch (error) {
      console.log("failed", error);
      return h.code(500);
    }
  };

  //   ubah note
  UpdateNote = (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload;
    const updateAt = new Date().toISOString();

    // find id in array of notes
    const index = fakeDb.findIndex((item) => item.id === id);
    // jika ada maka dia bernialai pada var index
    // namun jika ga ada maka dia nilai nya -1
    if (index !== -1) {
      fakeDb[index] = {
        ...fakeDb[index],
        title,
        tags,
        body,
        updateAt,
      };

      const response = h.response({
        status: "success",
        message: "Catatan berhasil diperbarui",
        data: fakeDb,
      });
      response.code(200);
      return response;
    }

    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui catatan. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  };

  //   delete note
  DeleteNote = (request, h) => {
    try {
      const { id } = request.params;
      const index = fakeDb.findIndex((item) => item.id === id);
      const data = fakeDb[index];
      if (index !== -1) {
        fakeDb.splice(index, 1);
        const response = h.response({
          status: "success",
          message: "Catatan berhasil dihapus",
          data: data,
        });
        response.code(200);
        return response;
      }
    } catch (error) {
      const response = h.response({
        status: "failed",
        message: "Gagal hapis data",
        error,
      });
      response.code(500);
      return response;
    }
  };
}
module.exports = new handlerNote();
