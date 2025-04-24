import { Query, Resolver, Arg, Mutation } from "type-graphql";
import { Ad } from "../entities/Ad";
import { FindOperator, Like } from "typeorm";
import { Field, InputType, ID } from "type-graphql";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";

@InputType()
class CreateAdInput {
  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field()
  author!: string;

  @Field()
  price!: number;

  @Field()
  pictureUrl!: string;

  @Field()
  city!: string;

  @Field(() => ID)
  category!: Category;

  @Field(() => [ID])
  tags!: Tag[];
}

@Resolver(Ad)
export class AdResolver {
  @Query(() => [Ad])
  async getAllAds(
    @Arg("category", { nullable: true }) categoryId: number,
    @Arg("search", { nullable: true }) search: string
  ): Promise<Ad[]> {
    const whereOptions: {
      category?: { id: number };
      title?: FindOperator<string>;
    } = {};

    if (categoryId) {
      whereOptions.category = { id: categoryId };
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
      return ads;
    } catch (err) {
      throw new Error(`Error fetching ads: ${err}`);
    }
  }

  @Query(() => Ad)
  async getOneAd(@Arg("id") id: number): Promise<Ad | null> {
    try {
      const ad = await Ad.findOne({
        where: { id },
        relations: {
          category: true,
          tags: true,
        },
      });
      if (!ad) {
        throw new Error("Ad not found");
      }
      return ad;
    } catch (err) {
      throw new Error(`Error fetching ad: ${err}`);
    }
  }

  @Mutation(() => Ad)
  async createAd(@Arg("data") data: CreateAdInput): Promise<Ad> {
    const ad = new Ad();
    ad.title = data.title;
    ad.description = data.description;
    ad.author = data.author;
    ad.price = data.price;
    ad.pictureUrl = data.pictureUrl;
    ad.city = data.city;
    ad.category = data.category;
    ad.tags = data.tags;

    try {
      await ad.save();
      return ad;
    } catch (err) {
      throw new Error(`Error creating ad: ${err}`);
    }
  }
}
