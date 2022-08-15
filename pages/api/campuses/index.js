import { getDb } from "../../../db.js";

export default async function handler(req, res) {
  try {

    const db = await getDb();
    switch (req.method) {
      case "GET":
        const campus = db.prepare("SELECT * from campus").all();
        res.status(200).json(campus);
        break;
      case "POST":
        const newCampus = JSON.parse(req.body)

        if (newCampus.name.length < 1 || newCampus.name.length > 50)
          return res.status(422).json({ message: "name should be between 1 and 50 caracters" });


        const query = db.prepare("INSERT INTO campus (name) VALUES (?)")
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
