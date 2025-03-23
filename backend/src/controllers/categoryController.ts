import { Request, Response } from "express";
import { Category } from "../entities/Category";

export const getAll = async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export const create = async (req: Request, res: Response) => {
  const category = new Category();
  category.label = req.body.label;

  try {
    await category.save();
    res.status(201).send("Category created with success");
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const category = await Category.findOneBy({ id: parseInt(req.params.id) });
    if (!category) {
      res.status(404).send("Category not found");
      return;
    }

    if (req.body.label) category.label = req.body.label;

    await category.save();
    res.status(204).send("Category updated with success");
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const category = await Category.findOneBy({ id: parseInt(req.params.id) });
    if (!category) {
      res.status(404).send("Category not found");
      return;
    }

    await category.remove();
    res.status(204).send("Category removed with success");
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
