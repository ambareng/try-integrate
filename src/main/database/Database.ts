import { createConnection, Connection } from 'typeorm';
import path from 'path';
import { defaultStorageFolder } from '..';
import Patient from './models/Patient';
import { PaymentScheme } from './models/PaymentScheme';

export default class Database {
    private connection: Connection;

    constructor() {
        this.init();
    }

    public async init(): Promise<void> {
        this.connection = await createConnection({
            type: 'sqlite',
            database: path.join(defaultStorageFolder, 'doc_app.sqlite'),
            entities: [PaymentScheme],
        });

        if (this.connection.isConnected) {
            this.connection.synchronize();
        }
    }

    public async insert(id: string, title: string): Promise<PaymentScheme> {
        const repository = this.connection.getRepository(PaymentScheme);
        const paymentScheme: PaymentScheme = { id: id, title: title };

        return repository.save(paymentScheme);
    }

    public async fetchAll(): Promise<PaymentScheme[]> {
        const repository = this.connection.getRepository(PaymentScheme);

        return repository.find();
    }
}
