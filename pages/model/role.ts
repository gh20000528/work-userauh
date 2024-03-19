import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/db';


class Role extends Model {}

Role.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
}, {
  sequelize,
  modelName: 'Role',
  tableName: 'roles',
  timestamps: false,
});

export default Role;