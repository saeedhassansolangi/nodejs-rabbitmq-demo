const rabbitMQConnection = require('../rabbitmq_connection');
const users = require('../users');


const EXCHANGE = "java-exchange";

const TEXT_ROUTING_KEY = "java-queue-binding-exchange";
const JSON_ROUTING_KEY = "json_java_queue_binding_exchange";
const TEXT_QUEUE = "java-queue";
const JSON_QUEUE = "json_java_queue";

rabbitMQConnection()
.then(async (channel) => {   
    await channel.assertExchange(EXCHANGE);

    await channel.assertQueue(TEXT_QUEUE);
    await channel.assertQueue(JSON_QUEUE);
    
    await channel.bindQueue(TEXT_QUEUE, EXCHANGE, TEXT_ROUTING_KEY);
    await channel.bindQueue(JSON_QUEUE, EXCHANGE, JSON_ROUTING_KEY);

    channel.publish(EXCHANGE, TEXT_ROUTING_KEY, Buffer.from("Hello from Node.js in text format"), { persistent: true });
    console.log('Message published to java-queue-binding-exchange');

    let userAtIndex =  Math.floor(Math.random() * users.length);
    let user = users[userAtIndex];
    console.log("sending user with index:", userAtIndex, ", user: ", user);
    channel.publish(EXCHANGE, JSON_ROUTING_KEY, Buffer.from(JSON.stringify(user)), { persistent: true });
    console.log('Message published to json_java_queue_binding_exchange');

})
.catch((error)=>{
        console.log('Error in RabbitMQ connection: ', error);
})