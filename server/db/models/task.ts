import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

class Task extends Model {}

Task.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pendente',
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field:'deleted_at'
    },
    createdAt: {
      type:DataTypes.DATE,
      field:'created_at'
    },
    updatedAt: {
      type:DataTypes.DATE,
      field:'updated_at'
    }

  },
  {
    sequelize,
    modelName: 'Task',
  }
);

export default Task;