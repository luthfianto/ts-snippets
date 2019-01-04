import amqplib = require("amqplib");

export default class Queuer {
    private channel: amqplib.Channel;
    private queueName: string;

    private constructor() {
    }

    public static async create(
        connectionString: string,
        queueName: string,
    ) {
        console.log({ connectionString, queueName });

        const queuer = new Queuer();
        await queuer.initialize(connectionString, queueName);

        return queuer;
    }

    private async initialize(connectionString: string, queueName: string) {
        this.queueName = queueName;

        const connection = await amqplib.connect(connectionString);
        const channel = await connection.createChannel();
        channel.prefetch(+process.env.RABBIT_PREFETCH || 10);

        const expires = +process.env.RABBIT_EXPIRES_NUM || 3600 * 24 * 1000;
        const opts: {} = Boolean(+process.env.RABBIT_EXPIRES_USE || 0) ? { expires } : {};

        channel.assertQueue(queueName, { durable: true, ...opts });
        
        this.channel = channel;
    }

    public async publish(payload: unknown) {
        if (!payload) {
            return;
        }

        const content = JSON.stringify(payload);
        this.channel.sendToQueue(this.queueName, Buffer.from(content), { persistent: true });
    }

}
