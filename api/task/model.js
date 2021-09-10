const db = require("../../data/dbConfig");

async function getAll(){
    const rows = await db("projects as p")
    .select('t.*', 'project_name', 'project_description')
    .join('tasks as t', 'p.project_id', '=', 't.project_id');

    const results = rows.map((row) => {
      return {
      task_id:row.task_id,
      task_description:row.task_description,
      task_notes:row.task_notes,
      task_completed: row.task_completed == 0 ? false : true,
      project_name: row.project_name,
      project_description:row.project_description
    }
    });
  
    return results;
}

async function getBy(id){
    return await db("projects as p")
    .select('t.*', 'project_name', 'project_description')
    .join('tasks as t', 'p.project_id', '=', 't.project_id')
    .where('p.project_id', id)
    .first();
}

async function addTask(task){
    const [id] = await db("tasks").insert(task);
    const row = await getBy(id);

    const result = {
        task_id: row.task_id,
        task_description: row.task_description,
        task_notes: row.task_notes,
        task_completed: row.task_completed == 0 ? false : true,
        project_id: row.project_id
    }

    return result
}

module.exports = {
    getAll,
    addTask
}