import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import SequelizeTeam from '../database/models/SequelizeTeam';
import MockModel from './mocks/Team.mocks';
import { ITeam } from '../Interfaces/teams/ITeam';

chai.use(chaiHttp);

const { expect } = chai;

describe('Team Test', () => {

  describe('GET /teams', () => {
    
    const team = { id: 1, teamName: 'Avaí/Kindermann' };
    const mockModel = new MockModel(team);

    it('should return a list of teams', async () => {
      sinon.stub(SequelizeTeam, 'findAll').resolves([SequelizeTeam.build(team)]);
      const chaiHttpResponse: Response = await chai
        .request(app)
        .get('/teams');

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(mockModel.findAll());
    });

    it('should return a team by id', async () => {
      sinon.stub(SequelizeTeam, 'findByPk').resolves(SequelizeTeam.build(mockModel.findById(1)));
      const chaiHttpResponse: Response = await chai
        .request(app)
        .get('/teams/1');

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(mockModel.findById(1));
    });


    it('should return 404 when team is not found', async () => {
      sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
      const chaiHttpResponse: Response = await chai
        .request(app)
        .get('/teams/1');

      expect(chaiHttpResponse).to.have.status(404);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Team with id 1 not found' });
    })


    afterEach(() => {
      sinon.restore();
    });
  });

  describe('', () => {
    afterEach(() => {
      sinon.restore();
    });
  });

});
