import * as express from "express";

import chalk from "chalk";

import Debug from "debug";

import Axios from "axios";

import { db, storage } from "../../database/index";

import download from "../middlewares/download";

const debug = Debug("firebaseback:itemsController");

const getItems = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  debug(chalk.blue("Haciendo un get a firebaseback/items/all"));

  const querySnapshot = await db.collection("items").get();

  const itemsList = querySnapshot.docs.map((doc) => {
    const item = doc.data();
    item.id = doc.id;
    return item;
  });

  res.json(itemsList);
};

const postItem = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  debug(chalk.blue("Haciendo un post a firebaseback/items/post"));
  debug(chalk.blue("Nos llega el item ->"));
  debug(chalk.blue(JSON.stringify(req.body)));

  await db.collection("items").add(req.body);

  const bucket = storage.bucket("gs://consulta-bd.appspot.com");
  const file = bucket.file(`files/${req.body.name}.jpg`);

  const url = req.body.file;

  const response = await Axios({
    method: "GET",
    url,
    responseType: "stream",
  });

  const contentType = response.headers["content-type"];

  console.log(contentType);

  const writeStream = file.createWriteStream({
    metadata: {
      contentType,
      metadata: {
        myValue: 123,
      },
    },
  });

  await response.data.pipe(writeStream);
  /* await download(req.body.file, req.body.name); */

  /* const bucket = storage.bucket("gs://consulta-bd.appspot.com");

  await bucket.upload(req.body.file); */

  const querySnapshot = await db.collection("items").get();

  const itemsList = querySnapshot.docs.map((doc) => {
    const item = doc.data();
    item.id = doc.id;
    return item;
  });

  res.json(itemsList);
};

const updateItem = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  debug(chalk.blue("Haciendo un put a firebaseback/items/update/:id"));
  debug(chalk.blue("Nos llega el item ->"));
  debug(chalk.blue(JSON.stringify(req.body)));

  await db.collection("items").doc(req.params.id).update(req.body);

  const doc = await db.collection("items").doc(req.params.id).get();

  const item = { id: doc.id, ...doc.data() };

  res.json(item);
};

const deleteItem = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  debug(chalk.blue("Haciendo un put a firebaseback/items/delete"));
  debug(chalk.blue("Nos llega el item Id ->"));
  debug(chalk.blue(JSON.stringify(req.params.id)));

  await db.collection("items").doc(req.params.id).delete();

  res.json({ item: "Borrado" });
};

export { getItems, postItem, updateItem, deleteItem };
