import { json } from "express";
import * as itemService from "../services/item.service.js";

export const createItem = async (req, res, next) => {
  try {
    
    const data =JSON.parse(req.body.data);
    if (req.file) data.image = `/uploads/items/${req.file.originalname}`;
    const item = await itemService.createItem(data, req.headers.user_id);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

export const getItems = async (req, res, next) => {
  try {
    const items = await itemService.getItems(req.query, req.headers.user_id);
    res.json(items);
  } catch (err) {
    next(err);
  }
};

export const getItem = async (req, res, next) => {
  try {
    const item = await itemService.getItemById(req.params.id,req.headers.user_id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    if (req.file) data.image = `/uploads/items/${req.file.originalname}`;
    const item = await itemService.updateItem(req.params.id, data, req.headers.user_id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const item = await itemService.deleteItem(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted" });
  } catch (err) {
    next(err);
  }
};
