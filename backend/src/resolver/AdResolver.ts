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

@InputType()
class UpdateAdInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  author?: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  pictureUrl?: string;

  @Field({ nullable: true })
  city?: string;

  @Field(() => ID, { nullable: true })
  category?: number;

  @Field(() => [ID], { nullable: true })
  tags?: number[];
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

  @Mutation(() => ID)
  async updateAd(@Arg("id") id: number, @Arg("data") data: UpdateAdInput) {
    try {
      let ad = await Ad.findOneBy({ id });

      if (!ad) {
        throw new Error("Ad not found");
      }

      ad = Object.assign(ad, data, {
        category: { id: data.category },
        tags: data.tags?.map((tagId) => ({ id: tagId })),
      });

      await ad.save();

      return ad.id;
    } catch (err) {
      throw new Error(`Error updating ad: ${err}`);
    }
  }

  @Mutation(() => ID)
  async deleteAd(@Arg("id") id: number) {
    try {
      const ad = await Ad.findOneBy({ id });

      if (!ad) {
        throw new Error("Ad not found");
      }

      await Ad.delete({ id });
      return id;
    } catch (err) {
      throw new Error(`Error deleting ad: ${err}`);
    }
  }
}
