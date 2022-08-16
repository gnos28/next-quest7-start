import { getDb } from "../../../db.js";
import validateCampus from "../../../utils/campusValidation.js";

export default async function handler(req, res) {
  try {
    const db = await getDb();
    const { id } = req.query;
    const campus = db.prepare("SELECT * from campus where id = ?").get(id);

    if (!campus) return res.status(404).json({ message: "campus not found" });
    let query;
    let queryResult;

    switch (req.method) {
      case "GET":
        res.status(200).json(campus);
        break;

      case "PATCH":
        const updatedCampus =
          typeof req.body === "string" ? JSON.parse(req.body) : req.body;

        if (!validateCampus(updatedCampus))
          return res
            .status(422)
            .json({ message: "name should be between 1 and 50 caracters" });

        query = db.prepare("UPDATE campus SET name=? where id=?");
        queryResult = query.run(updatedCampus.name, id);

        if (queryResult.changes == 1) {
          res.status(200).json({ id, name: updatedCampus.name });
        } else res.status(500).json({ message: "something went wrong !" });
        break;

      case "DELETE":
        query = db.prepare("DELETE FROM campus WHERE id=?");
        queryResult = query.run(id);

        res.status(204).end();
        break;

      default:
        res.status(500).json({ message: "only GET / PATCH / DELETE request" });
        break;
    }
  } catch (e) {
    res.status(500).json({ message: "something went wrong !" });
  }
}
