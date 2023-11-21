import database from "/infra/database.js";

async function status(request, response) {
  const result = await database.query("SELECT 1 + 1 as SUM_RESULT;");
  console.log(result.rows);

  response
    .status(200)
    .json({ message: "alunos do curso.dev são pessoas acima da média" });
}

export default status;
