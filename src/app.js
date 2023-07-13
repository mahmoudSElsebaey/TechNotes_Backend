// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// // const hbs = require("hbs");

// const app = express();
// const port = process.env.PORT || 5000;

// app.use('/',express.static(path.join(__dirname,'public')))
// app.use('/',require('../routes/root'))


// // //>>>>>> handle cors for all routes
// // app.use(cors());

// // app.get("/json", (req, res) => {
// //   res.json({ message: "test json" });
// // });

// // //>>>>>> DB connection
// // require("../db/server");

// // //>>>>>> Static file
// // const publicDerctory = path.join(__dirname, "../public");
// // app.use(express.static(publicDerctory));

// // //>>>>>> handle 404 in case the request accepts html, json or text as a response
// // app.use((req, res, next) => {
// //   const error = new Error("Not Found");
// //   error.status = 404;
// //   next(error);
// // });

// // //>>>>>> Error handling middleware for different response types
// // app.use((err, req, res, next) => {
// //   res.status(err.status);

// //   const responseType = req.accepts(["html", "json", "text"]);

// //   if (responseType === "html") {
// //     res.sendFile(path.join(__dirname, "../public/error404.html"));
// //   } else if (responseType === "json") {
// //     res.json({ error: err.message });
// //   } else {
// //     res.send(err.message);
// //   }
// // });

// //>>>>>> listen to port 5000
// app.listen(port, () => {
//   console.log("Successfully to listen to port " + port);
// });
