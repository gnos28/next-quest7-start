import { getDb } from "../../../db.js";

export default async function handler(req, res) {
  try {

    console.log("req", req.query);


    if (req.method === "GET") {
      const { id } = req.query;
      const db = await getDb();
      console.log("getDb", db);
      const campus = db
        .prepare("SELECT * from campus where id = ?").get(id)

      if (!campus)
        return res.status(404).json({ message: "campus not found" });
      res.status(200).json(campus);
    } else res.status(500).json({ message: "only GET request" });
  } catch (e) {
    res.status(500).json({ message: "something went wrong !" });
  }
}
