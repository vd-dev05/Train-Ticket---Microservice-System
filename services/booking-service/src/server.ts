import Fastify from 'fastify';
import * as amqplib from 'amqplib';
import dotenv from 'dotenv';

console.time("total");
setTimeout(() => {
    dotenv.config();


const fastify = Fastify({ logger: true });

/**
 * Kết nối đến RabbitMQ và khởi tạo channel với cơ chế retry
 * @param retries Số lần thử lại kết nối
 * @returns Promise chứa connection và channel
 */


// async function connectRabbitMQ(retries: number): Promise<{ connection: amqplib.Connection, channel: amqplib.Channel }> {
//   try {
//     const connection = await amqplib.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
//     const channel = await connection.createChannel();
//     await channel.assertQueue('booking_queue', { durable: true });
//     console.log("Connected to RabbitMQ, queue 'booking_queue' asserted.");
//     return { connection, channel };
//   } catch (error) {
//     if (retries === 0) {
//       console.error("Error connecting to RabbitMQ:", error);
//       throw error;
//     }
//     console.error(`Error connecting to RabbitMQ, retries left: ${retries - 1}`, error);
//     await new Promise((res) => setTimeout(res, 5000));
//     return connectRabbitMQ(retries - 1);
//   }
// }

/**
 * Khởi tạo service Booking với Fastify và RabbitMQ
 */
async function init() {
//   const { connection, channel } = await connectRabbitMQ(5);

//   // Endpoint để gửi yêu cầu đặt vé (booking)
//   fastify.post('/api/v1/booking', async (request, reply) => {
//     const bookingData = request.body; // Dữ liệu đặt vé từ client
//     try {
//       const messageBuffer = Buffer.from(JSON.stringify(bookingData));
//       // Gửi message vào queue với option persistent
//       channel.sendToQueue('booking_queue', messageBuffer, { persistent: true });
//       fastify.log.info("Booking request sent to RabbitMQ", bookingData);
//       return { success: true, message: 'Booking request sent.' };
//     } catch (error) {
//       fastify.log.error("Error publishing booking request:", error);
//       return reply.status(500).send({ success: false, message: "Error processing booking request" });
//     }
//   });

//   // Consumer: Một endpoint hoặc process để nhận và xử lý message từ queue
//   channel.consume('booking_queue', (msg) => {
//     if (msg !== null) {
//       const content = msg.content.toString();
//       console.log("Received booking message:", content);
//       channel.ack(msg); // Xác nhận đã nhận message
//     }
//   });

  // Khởi chạy Fastify server
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3002;
  fastify.listen({ port: PORT }, (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    
   fastify.log.info(`Booking Service running on ${address}`);
  });
}

init();
console.timeEnd("total");
}, 1000);

