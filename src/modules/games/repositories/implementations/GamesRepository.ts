import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../../ormconfig';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = AppDataSource.getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder('games')
      .where("title like '%:param%'", { param })
      .getMany()
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query('SELECT COUNT(*) FROM games'); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return await AppDataSource.getRepository(User)
      .createQueryBuilder('users')
      .innerJoinAndSelect('users.id', 'users_games_games')
      .getMany();
      // Complete usando query builder
  }
}
