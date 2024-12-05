import sequelize from './sequelize';
import Task from "../db/models/task"

const syncDatabase = async () => {
  await sequelize.sync({ force: false });
  console.log('Database synchronized!');
};

export { syncDatabase, Task };
