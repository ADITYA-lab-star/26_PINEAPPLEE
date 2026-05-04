import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { GamificationService } from './gamification.service';

@ApiTags('Gamification')
@Controller('gamification')
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  @Get('leaderboard')
  @ApiOperation({ summary: 'Get the global leaderboard sorted by XP' })
  @ApiQuery({ name: 'period', required: false, enum: ['weekly', 'monthly', 'alltime'] })
  @ApiResponse({ status: 200, description: 'Returns an array of gamification stats sorted by XP.' })
  getLeaderboard(@Query('period') period?: 'weekly' | 'monthly' | 'alltime') {
    if (period) {
      return this.gamificationService.getLeaderboardByPeriod(period);
    }
    return this.gamificationService.getFullLeaderboard();
  }
}
