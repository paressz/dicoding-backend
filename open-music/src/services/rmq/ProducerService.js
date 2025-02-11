const amqp = require('amqplib');

const ProducerService = {
  sendMessage: async (queue, message) => {
    try {
      const conn = await amqp.connect(process.env.RABBITMQ_SERVER);
      const ch = await conn.createChannel();
      await ch.assertQueue(queue, { durable: true });
      ch.sendToQueue(queue, Buffer.from(message));
      setTimeout(() => conn.close(), 1000);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
};
module.exports = ProducerService;