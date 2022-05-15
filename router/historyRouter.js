const express = require("express");
const router = express.Router();
const connection = require("./../db");
const mysql = require("mysql");

router.get("/:userID", (req, res) => {
  const { userID } = req.params;
  connection.query(
    `SELECT * FROM history WHERE userID=${userID}`,
    (err, results) => {
      if (err) {
        console.log(err);
        return res.send(err);
      }

      return res.status(200).json({
        history: results,
      });
    }
  );
});

router.post("/", (req, res) => {
  console.log(req.body);
  const { location, userID } = req.body;
  if (!location) {
    return res.status(400).json({ error: "All field are required!" });
  }
  connection.query(
    `INSERT INTO history(location, userID) VALUES(${mysql.escape(
      location
    )}, ${mysql.escape(userID)})`,
    (err, results) => {
      if (err) {
        console.log(err);
        return res.send(err);
      }

      return res.json({
        results,
      });
    }
  );
  res.status(200).json({ message: "Created!" });
});

module.exports = router;
