import express from "express";

import {
  getItems,
  postItem,
  updateItem,
  deleteItem,
} from "../controller/itemsController";

const router = express.Router();

router.get("/all", getItems);
router.post("/post", postItem);
router.put("/update/:id", updateItem);
router.delete("/delete/:id", deleteItem);

export default router;
