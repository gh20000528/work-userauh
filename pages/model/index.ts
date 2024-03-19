import User from './user';
import Role from './role';
import UserRole from './userRole';

// Define associations
User.belongsTo(Role, { foreignKey: 'role_id' });
Role.hasMany(User, { foreignKey: 'role_id' });

// Many-to-Many association through user_roles table
User.belongsToMany(Role, { through: UserRole, foreignKey: 'user_id', otherKey: 'role_id' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'role_id', otherKey: 'user_id' });

export { User, Role, UserRole };
