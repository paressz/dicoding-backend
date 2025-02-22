const amqp = require('amqplib');
const Mailer = require('./mailer');
const Service = require('./service');
const Listener = require('./listener');
require('dotenv').config();
const init = async () => {
  try {
    const mailer = new Mailer();
    const service = new Service();
    const listener = new Listener(service, mailer);
    const conn = await amqp.connect(process.env.RABBITMQ_SERVER);
    const ch = await conn.createChannel();
    await ch.assertQueue('export_playlist', { durable: true });
    ch.consume('export_playlist', listener.listen.bind(listener), { noAck: true });
  } catch (e) {
    console.error(`failed to connect to rmq: ${e}`);
  }
};

init();