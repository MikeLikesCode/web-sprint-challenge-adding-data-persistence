const db = require("../../data/dbConfig");

async function getAll() {
  return await db("resources");
}

async function getBy(id) {
  return await db("resources").where("resource_id", id).first();
}

async function addResource(resource) {
  const [id] = await db("resources").insert(resource);
  const result = await getBy(id);

  return result;
}

module.exports = {
  getAll,
  addResource,
};
