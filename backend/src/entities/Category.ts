import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ad } from "@/entities/Ad";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  label!: string;

  @OneToMany(() => Ad, (ad) => ad.category)
  ads!: Ad[];
}
