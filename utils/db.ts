import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', '890528gh', '123123123', {
  host: '127.0.0.1',
  dialect: 'postgres',
});

export default sequelize;
