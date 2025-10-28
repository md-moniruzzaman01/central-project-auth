import Logger from '@libs/logger';
import { connectToRabbitMQ } from '@libs/rabbitmq';
import app from 'app';
import config from 'config';
import { Server } from 'http';
import mongoose from 'mongoose';

process.on('uncaughtException', (error) => {
  console.log(error);
  process.exit(1);
});

let server: Server;
async function bootstrap() {
  try {
    await connectToRabbitMQ();
    await mongoose.connect(config.database_url as string);
    Logger.info(`🛢   Database is connected successfully`);

    server = app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`);
    });
  } catch (err) {
    console.log('Failed to connect database', err);
  }

  process.on('unhandledRejection', (error) => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();
