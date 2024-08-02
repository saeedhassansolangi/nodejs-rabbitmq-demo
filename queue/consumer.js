const rabbitMQConnection = require('../rabbitmq_connection');

rabbitMQConnection()
.then((channel) => {   

    channel.consume('java-queue', (message) => {
        console.log('Received message: ', message.content.toString());
        channel.ack(message); // acknowledge the message so that it is removed from the queue

    });
    
})
.catch((error)=>{
        console.log('Error in RabbitMQ connection: ', error);
})
