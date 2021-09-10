const db = require("../../data/dbConfig");

async function getAll() {
  const rows = await db("projects");

  const results = rows.map((row) => {
    return {
      project_id: row.project_id,
      project_name: row.project_name,
      project_description: row.project_description,
      project_completed: row.project_completed == 0 ? false : true,
    };
  });

  return results;
}

async function getBy(id) {
  return await db("projects").where("project_id", id).first();
}

async function addProject(project) {
  const [id] = await db("projects").insert(project);
  const row = await getBy(id);

  const results = {
    project_id: row.project_id,
    project_name: row.project_name,
    project_description: row.project_description,
    project_completed: row.project_completed == 0 ? false : true,
  };

  return results;
}

module.exports = {
  getAll,
  addProject,
};
