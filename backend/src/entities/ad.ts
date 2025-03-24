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
import { Category } from "@/entities/Category";
import { Tag } from "@/entities/Tag";

@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  author!: string;

  @Column("int")
  price!: number;

  @Column()
  pictureUrl!: string;

  @Column()
  city!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Category, (category) => category.ads, { nullable: false })
  category!: Category;

  @ManyToMany(() => Tag)
  @JoinTable({
    name: "ad_tag",
    joinColumn: { name: "adId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "tagId", referencedColumnName: "id" },
  })
  tags!: Tag[];
}
