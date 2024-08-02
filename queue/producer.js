const rabbitMQConnection = require('../rabbitmq_connection');
const users = require('../users');

rabbitMQConnection()
.then((channel) => {   

    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            console.log('Message sent to the queue: ', users[i]);
            channel.sendToQueue('java-queue', Buffer.from(JSON.stringify(users[i])));
        }, 2000 * i);
    }
    
})
.catch((error)=>{
        console.log('Error in RabbitMQ connection: ', error);
})