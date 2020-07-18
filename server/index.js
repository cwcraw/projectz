const express = require("express");
const graphqlHTTP = require("express-graphql");

const { schema, root } = require("./schema.js");
// const { buildSchema } = require("graphql");
const config = require("../config.js");
const knex = require("knex")(config.db);
const dbOps = require("../models/dbOps")(knex);
// const cors = require('cors'); // <- May need this later







// SERVER
const app = express();
// app.use(cors()) // <-- May need this later
app.use(express.static('/server '));
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);
});