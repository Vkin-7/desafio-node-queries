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
    return await this.repository
      .createQueryBuilder('games')
      .where("LOWER(games.title) LIKE LOWER(:param)", { param: `%${param}%` })
      .getMany()
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query('SELECT COUNT(*) FROM games'); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return await AppDataSource.getRepository(User)
      .createQueryBuilder('users')
      .innerJoin('users_games_games', 'ugg', 'ugg.usersId = users.id')
      .innerJoin('games', 'g', 'g.id = ugg.gamesId')
      .where(`g.id = '${id}'`)
      .getMany();
      // Complete usando query builder
  }
}
