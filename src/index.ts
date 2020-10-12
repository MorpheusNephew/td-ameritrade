import dotenv from 'dotenv';
import Client from './client';

dotenv.config();

const client = new Client(process.env.TD_CONSUMER_KEY as string, 'http://127.0.0.1');

console.log(client);

client.authenticate();
