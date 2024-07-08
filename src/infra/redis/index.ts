require("dotenv").config();
import Redis from "ioredis";

export default class RedisClient {
  client: any;
  expire: number = 300;
  constructor() {
    // @ts-ignore
    this.client = new Redis(process.env.REDIS_RENDER);

    this.client.on("error", (err: string) => {
      console.error("Error on Redis:", err);
    });

    this.client.on("connect", () => {
      console.log("Redis connected successfully");
    });
  }

  async get(key: string) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err: string, reply: string) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  async set(key: string, value: string) {
    return new Promise((resolve, reject) => {
      this.client.set(
        key,
        value,
        "EX",
        this.expire,
        (err: string, reply: string) => {
          if (err) {
            reject(err);
          } else {
            resolve(reply);
          }
        }
      );
    });
  }
}
