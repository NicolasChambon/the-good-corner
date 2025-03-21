import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "sqlite",
  database: "db.good_corner.sqlite",
  entities: [],
  synchronize: true, // ne pas utiliser en production
  logging: ["error", "query"],
});

export default dataSource;
