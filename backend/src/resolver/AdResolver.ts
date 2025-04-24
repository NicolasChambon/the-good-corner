import { Query, Resolver } from "type-graphql";
import { Ad } from "../entities/Ad";
import { NextFunction, Request, Response } from "express";
import { FindOperator, Like } from "typeorm";

@Resolver(Ad)
export class AdResolver {
  @Query(() => [Ad])
  async getAllAds(req: Request, res: Response, next: NextFunction) {
    const categoryId = req.query.category;
    const search = req.query.search;
    const whereOptions: {
      category?: { id: number };
      title?: FindOperator<string>;
    } = {};

    if (categoryId && categoryId !== "null") {
      whereOptions.category = { id: parseInt(categoryId as string) };
    }
    if (search && search !== "null") {
      whereOptions.title = Like(`%${search}%`);
    }
    try {
      const ads = await Ad.find({
        where: whereOptions,
        relations: {
          category: true,
          tags: true,
        },
      });
      res.send(ads);
    } catch (err) {
      next(err);
    }
  }
}
