import { Query, Resolver, Arg, Mutation } from "type-graphql";
import { Ad } from "../entities/Ad";
import { FindOperator, Like } from "typeorm";
import { Field, InputType, ID } from "type-graphql";

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
  category!: number;

  @Field(() => [ID])
  tags!: number[];
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

  @Mutation(() => ID)
  async createAd(@Arg("data") data: CreateAdInput) {
    const ad = Ad.create({
      ...data,
      category: { id: data.category },
      tags: data.tags.map((tagId) => ({ id: tagId })),
    });

    try {
      await ad.save();
      return ad.id;
    } catch (err) {
      throw new Error(`Error creating ad: ${err}`);
    }
  }

  // @Mutation(() => ID)
  // async updateAd(
  //   @Arg("id") id: number,
  //   @Arg("data") data: Partial<CreateAdInput>
  // ) {
  //   try {
  //     const ad = await Ad.findOneBy({ id });

  //     if (!ad) {
  //       throw new Error("Ad not found");
  //     }

  //     if (data.title) ad.title = data.title;
  //     if (data.description) ad.description = data.description;
  //     if (data.author) ad.author = data.author;
  //     if (data.price) ad.price = data.price;
  //     if (data.pictureUrl) ad.pictureUrl = data.pictureUrl;
  //     if (data.city) ad.city = data.city;
  //     if (data.tags) ad.tags = data.tags.map((tagId) => ({ id: tagId }));
  //     if (data.category) ad.category = { id: data.category };

  //     await ad.save();

  //     return ad.id;
  //   } catch (err) {
  //     throw new Error(`Error updating ad: ${err}`);
  //   }
  // }

  @Mutation(() => ID)
  async deleteAd(@Arg("id") id: number) {
    try {
      const ad = await Ad.findOneBy({ id });

      if (!ad) {
        throw new Error("Ad not found");
      }

      await ad.remove();
      return ad.id;
    } catch (err) {
      throw new Error(`Error deleting ad: ${err}`);
    }
  }
}
