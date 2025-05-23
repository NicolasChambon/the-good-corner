import { Query, Resolver, Arg, Mutation, ID } from "type-graphql";
import { Tag } from "../entities/Tag";
import { Field, InputType } from "type-graphql";

@InputType()
class CreateTagInput {
  @Field()
  label!: string;
}

@Resolver(Tag)
export class TagResolver {
  @Query(() => [Tag])
  async getAllTags(): Promise<Tag[]> {
    try {
      const tags = await Tag.find({
        relations: ["ads"],
      });
      tags.forEach((tag) => {
        if (!tag.ads) {
          tag.ads = [];
        }
      });
      return tags;
    } catch (err) {
      throw new Error(`Error fetching tags. ${err}`);
    }
  }

  @Mutation(() => Tag)
  async createTag(@Arg("data") data: CreateTagInput): Promise<Tag> {
    const tag = new Tag();
    tag.label = data.label;

    try {
      await tag.save();
      return tag;
    } catch (err) {
      throw new Error(`Error creating tag: ${err}`);
    }
  }

  @Mutation(() => ID)
  async deleteTag(@Arg("id") id: number): Promise<number> {
    try {
      const tag = await Tag.findOneBy({
        id,
      });

      if (!tag) {
        throw new Error("Tag not found");
      }

      await Tag.delete({ id });
      return id;
    } catch (err) {
      throw new Error(`Error deleting tag: ${err}`);
    }
  }
}
