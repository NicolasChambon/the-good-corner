import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { Tag } from "./Tag";
import { Field, ID, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  @Field()
  title!: string;

  @Column()
  @Field()
  description!: string;

  @Column()
  @Field()
  author!: string;

  @Column("int")
  @Field()
  price!: number;

  @Column()
  @Field()
  pictureUrl!: string;

  @Column()
  @Field()
  city!: string;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @ManyToOne(() => Category, (category) => category.ads, { nullable: false })
  @Field(() => Category)
  category!: Category;

  @ManyToMany(() => Tag, (tag) => tag.ads)
  @JoinTable({
    name: "ad_tag",
    joinColumn: { name: "adId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "tagId", referencedColumnName: "id" },
  })
  @Field(() => [Tag])
  tags!: Tag[];
}
