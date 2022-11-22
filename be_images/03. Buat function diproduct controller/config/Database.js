import { Sequelize } from "sequelize";

const db = new Sequelize("product_images", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
