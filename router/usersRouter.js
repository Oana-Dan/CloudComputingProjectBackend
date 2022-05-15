const express = require("express");
const router = express.Router();
const connection = require("./../db");
const mysql = require("mysql");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }

    return res.status(200).json({
      users: results,
    });
  });
});

router.get("/:email", (req, res) => {
  const { email } = req.params;
  connection.query(
    `SELECT * FROM users WHERE email = ${mysql.escape(email)} `,
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send(err);
      }

      return res.status(200).json({
        results,
      });
    }
  );
});

router.post("/", (req, res) => {
  console.log(req.body);
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({ error: "All field are required!" });
  }
  connection.query(
    `INSERT INTO users(email, password, username) VALUES(${mysql.escape(
      email
    )}, ${mysql.escape(password)}, ${mysql.escape(username)})`,
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
