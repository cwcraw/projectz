module.exports = knex => {
    return {
      createTask: require("./createBookmark")(knex),
    };
  };