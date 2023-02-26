import { AppDataSource } from "../../ormconfig";


interface IOptions {
    host: string;
  }
  
export class Database {
    dataSource = AppDataSource;

    createConnection() {
        const { options } = this.dataSource;
        const newOptions = options as IOptions;
        newOptions.host = 'localhost';

        this.dataSource.setOptions(newOptions);
        return this.dataSource.initialize();
    }
}
