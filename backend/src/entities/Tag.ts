import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ad } from "./Ad";

@Entity("Tag")
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  label!: string;

  @ManyToMany(() => Ad, (ad) => ad.tags)
  ads!: Ad[];
}
