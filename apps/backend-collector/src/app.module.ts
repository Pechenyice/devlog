import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

//config
import configuration from './config/configuration';

//provide
import { AppController } from './app.controller';
import { AppService } from './app.service';

//modules
import { CollectorModule } from './modules/collector/collector.module';
import { TasksModule } from './modules/tasks/tasks.module';

const EXTERNAL_MODULES = [CollectorModule, TasksModule];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        autoLoadEntities: true,
        migrations: ['./migrations/*.js'],
        migrationsTableName: 'migrations_typeorm',
        migrationsRun: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ScheduleModule.forRoot(),
    ...EXTERNAL_MODULES,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
