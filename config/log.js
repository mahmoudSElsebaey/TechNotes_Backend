// const { createLogger, transports, format } = require("winston");
// require("winston-mongodb");

// const logger = createLogger({
//   transports: [
//     new transports.File({
//       filename: "Logs/reqlog.log",
//       level: "info",
//       format: format.combine(format.timestamp(), format.json()),
//     }),

//     new transports.File({
//       filename: "Logs/errLog.log",
//       level: "error",
//       format: format.combine(format.timestamp(), format.json()),
//     }),

//     new transports.MongoDB({
//       filename: "Logs/errLog.log",
//       db: process.env.DATABASE_URI,
//       level: "error",
//       options: {
//         useUnifiedTopology: true,
//       },
//       collection: "finalProjectData",
//       format: format.combine(format.timestamp(), format.json()),
//     }),
//   ],
// });

// module.exports = logger;
