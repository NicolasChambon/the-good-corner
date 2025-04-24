import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ad } from "./Ad";
import { Field, ObjectType } from "type-graphql";

@Entity("Tag")
@ObjectType()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column({ unique: true })
  @Field()
  label!: string;

  @ManyToMany(() => Ad, (ad) => ad.tags)
  @Field(() => [Ad])
  ads!: Ad[];
}
