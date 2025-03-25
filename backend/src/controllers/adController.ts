import { NextFunction, Request, Response } from "express";
import { Ad } from "@/entities/Ad";

export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ads = await Ad.find({
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
  // On peut mieux faire avec un constructeur cf:https://stackoverflow.com/questions/75096217/why-cant-i-change-the-entitys-constructor-in-typeorm
  // On peut faire plus court avec l'assignation cf:https://discord.com/channels/1351484076091244596/1352602280804745296
  const ad = new Ad();
  ad.title = req.body.title;
  ad.description = req.body.description;
  ad.author = req.body.author;
  ad.price = req.body.price;
  ad.pictureUrl = req.body.picture_url;
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

    // Techniquement on peut faire un peu plus simple avec le nullish coalescing operator "??"
    // si on change const ad à let on peux egalement simplifier l'assignation

    if (req.body.title) ad.title = req.body.title;
    if (req.body.description) ad.description = req.body.description;
    if (req.body.author) ad.author = req.body.author;
    if (req.body.price) ad.price = req.body.price;
    if (req.body.picture_url) ad.pictureUrl = req.body.picture_url;
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
