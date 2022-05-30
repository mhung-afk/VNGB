import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from 'src/admin/admin.module';
import { AuthGuard } from './guard/auth.guard';
import { CacheService } from './services/cache.service';
import { TokenService } from './services/token.service';

const TokenModule = JwtModule.registerAsync({
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: {
      algorithm: 'HS256',
    },
  }),
  inject: [ConfigService],
});

@Module({
  imports: [TokenModule, CacheModule.register(), forwardRef(() => AdminModule)],
  providers: [AuthGuard, CacheService, TokenService],
  exports: [CacheService, TokenService, AuthGuard],
})
export class CommonModule {}
