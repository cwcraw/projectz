const { buildSchema } = require("graphql");
const config = require("../config.js");
const knex = require("knex")(config.db);
const dbOps = require("../models/dbOps")(knex);

const schema = buildSchema(`

`)

// The root provides the resolver functions for 
//each type of query or mutation.
const root = {

}

module.exports = { schema, root };