import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class PaymentScheme {
    @PrimaryColumn({ type: 'uuid' })
    id: string;

    @Column()
    title: string;
}
