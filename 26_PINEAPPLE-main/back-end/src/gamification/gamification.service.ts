import { Injectable, Logger } from '@nestjs/common';
import { GamificationRepository } from './gamification.repository';

@Injectable()
export class GamificationService {
  private readonly logger = new Logger(GamificationService.name);

  constructor(private readonly gamificationRepository: GamificationRepository) {}

  getLeaderboardByPeriod(period: 'weekly' | 'monthly' | 'alltime') {
    return this.gamificationRepository.getLeaderboard(period);
  }

  getFullLeaderboard() {
    return this.gamificationRepository.getFullLeaderboard();
  }
}
