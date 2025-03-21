import express from "express";
import sqlite3 from "sqlite3";
import "reflect-metadata";
import dataSource from "./config/db";

const db = new sqlite3.Database("../good_corner.sqlite");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.get("/ads", (_req, res) => {
  db.all("SELECT * FROM AD", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.send(rows);
    }
  });
});

app.post("/ads", (req, res) => {
  const stmt = db.prepare(
    `INSERT INTO AD (
      TITLE, 
      DESCRIPTION, 
      AUTHOR, 
      PRICE, 
      PICTURE_URL, 
      CITY
      ) 
      VALUES (?, ?, ?, ?, ?, ?)`
  );
  stmt.run(
    [
      req.body.title,
      req.body.description,
      req.body.author,
      req.body.price,
      req.body.picture_url,
      req.body.city,
    ],
    function (err) {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.status(202).send("Created with success");
      }
    }
  );
});

app.put("/ads/:id", (req, res) => {
  const stmt = db.prepare(
    `UPDATE AD SET 
      TITLE = ?, 
      DESCRIPTION = ?, 
      AUTHOR = ?, 
      PRICE = ?, 
      PICTURE_URL = ?, 
      CITY = ? 
    WHERE ID = ?`
  );
  stmt.run(
    [
      req.body.title,
      req.body.description,
      req.body.author,
      req.body.price,
      req.body.picture_url,
      req.body.city,
      req.params.id,
    ],
    (err) => {
      if (err) {
        console.error(err);
        res.status;
      }
    }
  );
});

app.delete("/ads/:id", (req, res) => {
  db.run("DELETE FROM AD WHERE ID = ?", [req.params.id], (err) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .send(
          `An error occured while deleting the ad with id ${req.params.id}`
        );
    } else {
      res.send("Deleted with success");
    }
  });
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  await dataSource.initialize();
});
