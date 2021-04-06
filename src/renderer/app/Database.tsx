import { hot } from 'react-hot-loader/root';
import React, { useEffect, useState } from 'react';
import { remote } from 'electron';
import Database from '../../main/database/Database';
import axios from 'axios';

export const Application: React.FC<{}> = () => {
    const [paymentScheme, setPaymentScheme] = useState([]);

    useEffect(() => {
        axios
            .get('https://a.lampara.atmosclouds.com/api/accounting/payment-schemes', {
                headers: {
                    Authorization: 'Bearer ',
                },
            })
            .then((response) => {
                setPaymentScheme(response.data);
            });
    });

    const database: Database = remote.getGlobal('database');

    console.log(database);

    async function testDatabase() {
        const insert = await database.insert('test', 'test');

        console.log('Insert: ');
        console.table(insert);
        console.log('Fetch: ');
        console.table(await database.fetchAll());
    }

    return (
        <div>
            <button onClick={() => testDatabase()}>test</button>
            Database
        </div>
    );
};

export default hot(Application);
