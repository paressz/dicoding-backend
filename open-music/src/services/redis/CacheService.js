const redis = require('redis');

class CacheService {
  constructor() {
    this.client = redis.createClient({
      socket: { host: process.env.REDIS_SERVER }
    });
    this.client.on('connect', () => console.error('conn'));
    this.client.on('error', (err) => console.error(err));
    this.client.connect();
  }

  async set(k, v){
    await this.client.set(k, v, { EX: 1800 });
    console.log(`redis: set ${k} to ${v}`);
  }

  async get(k) {
    const res = await this.client.get(k);
    console.log(`redis: get ${k} ${res}`);
    if (!res) throw new Error(`Could not find ${k}`);
    return res;
  }
  async delete(k) {
    await this.client.del(k);
    console.log(`redis: delete ${k}`);
  }
}
module.exports = CacheService;