
module.exports = knex => {
    return async params => {
      const start_date = params.start_date;
      const due_date = params.due_date;
      const finished = params.finished;
      const desc = params.desc;
  
      let outputId = await knex("bookmarks")
        .insert(params)
        .returning("id");
  
      return outputId;
    };
  };