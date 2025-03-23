import { Request, Response } from "express";
import { Tag } from "../entities/Tag";

export const getAll = async (_req: Request, res: Response) => {
  try {
    const tags = await Tag.find();
    res.send(tags);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export const create = async (req: Request, res: Response) => {
  const tag = new Tag();
  tag.label = req.body.label;

  try {
    await tag.save();
    res.status(201).send("Tag created with success");
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const tag = await Tag.findOneBy({ id: parseInt(req.params.id) });
    if (!tag) {
      res.status(404).send("Tag not found");
      return;
    }

    if (req.body.label) tag.label = req.body.label;

    await tag.save();
    res.status(204).send("Tag updated with success");
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const tag = await Tag.findOneBy({ id: parseInt(req.params.id) });
    if (!tag) {
      res.status(404).send("Tag not found");
      return;
    }

    await tag.remove();
    res.status(204).send("Tag removed with success");
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
