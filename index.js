const Hapi = require("@Hapi/hapi");
const routes = require("./routes/note");

// setup server
const initServer = async () => {
  try {
    const server = await Hapi.server({
      port: 9000,
      host: "localhost",
      //   cors
      routes: {
        cors: {
          origin: ["*"],
        },
      },
    });
    await server.start();
    console.log("server runing on port: %s", server.info.uri);

    // Runing routes
    server.route(routes);
  } catch (error) {
    console.log("server error: %s", error);
  }
};

// call the server
initServer();
