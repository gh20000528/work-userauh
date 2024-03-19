import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/db'; 

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
  voice_attachment: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'roles',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: false,
});

export default User;