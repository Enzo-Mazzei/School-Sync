const mongoose = require("mongoose");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/school-sync";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const databaseName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${databaseName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
[
  {
    _id: {
      $oid: "64c5499a69c6c5c7c4e169e5",
    },
    firstName: "Nicolas",
    lastName: "Stevens",
    email: "wax@gmail.com",
    passwordHash:
      "$2a$10$MISQl67Pqbh0NfPxHeNBi.SZ8FePwWumcooW0PPHVHAP/cYFyPUr2",
    role: "student",
    courses: [],
    grades: [],
    createdAt: {
      $date: "2023-07-29T17:17:14.688Z",
    },
    updatedAt: {
      $date: "2023-07-29T17:17:14.688Z",
    },
    __v: 0,
    profilePicture:
      "https://graphiste-production.s3.eu-west-3.amazonaws.com/ocmo7d3t5eu6wkh1z3v8s2025zio",
  },
  {
    _id: {
      $oid: "64c6b82db83f6c207b9738da",
    },
    firstName: "Pierre",
    lastName: "De La Bouteille",
    email: "pierre@gmail.com",
    passwordHash:
      "$2a$10$tGAYLEkYN1ayrQyXaGua3uj/PBvCdhYhSx1oeM6J6YV7/QEnBD1ke",
    role: "student",
    courses: [],
    grades: [],
    createdAt: {
      $date: "2023-07-30T19:21:17.554Z",
    },
    updatedAt: {
      $date: "2023-07-30T19:21:17.554Z",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "64c7a2771f07b20f4dafe748",
    },
    firstName: "Maxime",
    lastName: "De La Pierre",
    email: "maxime@gmail.com",
    passwordHash:
      "$2a$10$lycFsy9b8q1dq5kOGfCGl.KVp14bS3jFxMTSpCOj6uc2ybaE8ni4e",
    role: "student",
    courses: [],
    grades: [],
    createdAt: {
      $date: "2023-07-31T12:00:55.810Z",
    },
    updatedAt: {
      $date: "2023-07-31T12:00:55.810Z",
    },
    __v: 0,
  },
];
