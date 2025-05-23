import { Query, Resolver, Arg, Mutation, ID } from "type-graphql";
import { Category } from "../entities/Category";
import { Field, InputType } from "type-graphql";

@InputType()
class CreateCategoryInput {
  @Field()
  label!: string;
}

@Resolver(Category)
export class CategoryResolver {
  @Query(() => [Category])
  async getAllCategories(): Promise<Category[]> {
    try {
      const categories = await Category.find({
        relations: {
          ads: true,
        },
      });
      return categories;
    } catch (err) {
      throw new Error(`Error fetching categories: ${err}`);
    }
  }

  @Mutation(() => Category)
  async createCategory(
    @Arg("data") data: CreateCategoryInput
  ): Promise<Category> {
    const category = new Category();
    category.label = data.label;

    try {
      await category.save();
      return category;
    } catch (err) {
      throw new Error(`Error creating category: ${err}`);
    }
  }

  @Mutation(() => ID)
  async deleteCategory(@Arg("id") id: number): Promise<number> {
    try {
      const category = await Category.findOneBy({ id });

      if (!category) {
        throw new Error("Category not found");
      }

      await Category.delete({ id });
      return id;
    } catch (err) {
      throw new Error(`Error deleting category: ${err}`);
    }
  }
}
