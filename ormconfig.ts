import { DataSource } from "typeorm"
import { Game } from "./src/modules/games/entities/Game"
import { User } from "./src/modules/users/entities/User"

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'queries_challenge',
  synchronize: true,
  dropSchema: true,
  logging: false,
  entities: [
      Game,
      User
  ],
  subscribers: [],
  migrations: ['./src/database/migrations/*.ts'],
});