const amqplib = require('amqplib');

const username = 'saeed';
const password = 'saeed';
const host = 'localhost';
const port = '5672';
const connectionURL = `amqp://${username}:${password}@${host}:${port}`;
console.log("creating connection with RabbitMQ server: ", connectionURL);

async function connect() {
    try {
        const connection = await amqplib.connect(connectionURL);
        const channel = await connection.createChannel(); 
        await channel.assertQueue('node-queue'); // if queue does not exist, it will create it
        console.log("Connected to RabbitMQ server");
        return channel;
    }
    catch (error) {
        console.log('Error in RabbitMQ connection: ', error);
        process.exit(1);
    }

}

module.exports = connect
