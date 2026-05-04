import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Enable CORS for frontend integration
  app.enableCors({
    origin: '*', // Allows local development requests
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Accept', 'x-user-role', 'x-user-id'],
  });

  // 2. Enable Global Validation Pipe for strict DTO enforcement
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips away non-decorated payload properties
      forbidNonWhitelisted: true, // Throws 400 if unknown properties are passed
      transform: true, // Automatically transforms payloads to DTO instances
    }),
  );

  // 3. Initialize Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('TeamForge API')
    .setDescription('The Student Project Collaboration Platform REST API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Exposed at http://localhost:3000/api

  // Generate swagger.json
  const docsDir = path.join(process.cwd(), 'docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir);
  }
  fs.writeFileSync(path.join(docsDir, 'swagger.json'), JSON.stringify(document, null, 2));

  await app.listen(3000);
  console.log(`🚀 Backend is running on: http://localhost:3000`);
  console.log(`📚 Swagger documentation is available at: http://localhost:3000/api`);
}
bootstrap();
