import {
  DataTypes, Model,
} from 'sequelize';
import db from '.';

import { NewEntity } from '../../Interfaces';
import { IMatch } from '../../Interfaces/IEntities';
import SequelizeTeam from './SequelizeTeam';

class SequelizeMatch extends Model<IMatch, NewEntity<IMatch>> {
  public id!: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

SequelizeMatch.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_id',
  },

  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },

  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_id',
  },

  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },

  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },

}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

SequelizeMatch.belongsTo(SequelizeTeam, {
  foreignKey: 'home_team_id',
  as: 'homeTeam',
});

SequelizeMatch.belongsTo(SequelizeTeam, {
  foreignKey: 'away_team_id',
  as: 'awayTeam',
});

export default SequelizeMatch;
