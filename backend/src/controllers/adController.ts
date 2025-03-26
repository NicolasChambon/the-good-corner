import { NextFunction, Request, Response } from "express";
import { Ad } from "../entities/Ad";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("req", req);
  const categoryId = req.query.category;

  let where = {};
  if (categoryId) {
    const idInt = parseInt(categoryId as string);
    where = { category: { id: idInt } };
  }

  try {
    const ads = await Ad.find({
      where,
      relations: {
        category: true,
        tags: true,
      },
    });
    res.send(ads);
  } catch (err) {
    next(err);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ad = new Ad();
  ad.title = req.body.title;
  ad.description = req.body.description;
  ad.author = req.body.author;
  ad.price = req.body.price;
  ad.pictureUrl = req.body.pictureUrl;
  ad.city = req.body.city;
  ad.category = req.body.category;
  ad.tags = req.body.tags;

  try {
    await ad.save();
    res.status(201).send("Ad created with success");
  } catch (err) {
    next(err);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ad = await Ad.findOneBy({ id: parseInt(req.params.id) });
    if (!ad) {
      res.status(404).send("Ad not found");
      return;
    }

    if (req.body.title) ad.title = req.body.title;
    if (req.body.description) ad.description = req.body.description;
    if (req.body.author) ad.author = req.body.author;
    if (req.body.price) ad.price = req.body.price;
    if (req.body.pictureUrl) ad.pictureUrl = req.body.pictureUrl;
    if (req.body.city) ad.city = req.body.city;
    if (req.body.category) ad.category = req.body.category;
    if (req.body.tags) ad.tags = req.body.tags;

    await ad.save();
    res.status(204).send("Ad updated with success");
  } catch (err) {
    next(err);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ad = await Ad.findOneBy({ id: parseInt(req.params.id) });
    if (!ad) {
      res.status(404).send("Ad not found");
      return;
    }

    await ad.remove();
    res.send("Deleted with success");
  } catch (err) {
    next(err);
  }
};
