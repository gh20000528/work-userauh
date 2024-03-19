import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/db';

class UserRole extends Model {}

UserRole.init({
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'roles',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'UserRole',
  tableName: 'user_roles',
  timestamps: false,
});

export default UserRole;