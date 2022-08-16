import { getDb } from "../../../db.js";
import validateCampus from "../../../utils/campusValidation.js";

export default async function handler(req, res) {
  try {
    const db = await getDb();
    switch (req.method) {
      case "GET":
        const { limit, offset } = req.query;

        const [nbCampus] = Object.values(
          db.prepare("SELECT count(*) from campus").get()
        );
        console.log(nbCampus);

        let getQuery = "SELECT * from campus";
        if (limit) getQuery += " LIMIT ?";
        if (offset) getQuery += " OFFSET ?";

        const bindParameters = [];
        if (limit) bindParameters.push(limit);
        if (offset) bindParameters.push(offset);

        const campus = db.prepare(getQuery).all(bindParameters);
        res.status(200).json(campus);
        break;

      case "POST":
        const newCampus =
          typeof req.body === "string" ? JSON.parse(req.body) : req.body;

        if (!validateCampus(newCampus))
          return res
            .status(422)
            .json({ message: "name should be between 1 and 50 caracters" });

        const query = db.prepare("INSERT INTO campus (name) VALUES (?)");
        const queryResult = query.run(newCampus.name);
        res.status(200).json({ ...newCampus, id: queryResult.lastInsertRowid });
        break;

      default:
        break;
    }
  } catch (e) {
    res.status(500).json({ message: "not good" });
  }
}
