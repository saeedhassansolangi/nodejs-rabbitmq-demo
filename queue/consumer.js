const rabbitMQConnection = require('../rabbitmq_connection');

rabbitMQConnection()
.then((channel) => {   

    channel.consume('node-queue', (message) => {
        if(message) {
            handleMessages(message);
            channel.ack(message); // acknowledge the message so that it is removed from the queue
        }else {
            console.log('No message to consume');
        }
    });
    
})
.catch((error)=>{
        console.log('Error in RabbitMQ connection: ', error);
})


function handleMessages(message) {
    console.log('Received message: ', message.content.toString());
    try {
        const user = JSON.parse(message.content.toString());
        console.log('User: ', user);
    } catch (error) {
        console.log('Message is not a JSON object');
        console.log("Message: ", message.content.toString());
    }
}