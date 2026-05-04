import { Injectable } from '@nestjs/common';

@Injectable()
export class GamificationRepository {
  private leaderboard: any;

  constructor() {
    this.leaderboard = {
      weekly: [
        { rank: 1, user: "Rohan Mehta", initials: "RM", xp: 420, rep: 89, tasks: 7, projects: 2 },
        { rank: 2, user: "Sneha Iyer", initials: "SI", xp: 380, rep: 82, tasks: 6, projects: 1 },
        { rank: 3, user: "Priya Patel", initials: "PP", xp: 320, rep: 93, tasks: 5, projects: 2 },
        { rank: 4, user: "Arjun Sharma", initials: "AS", xp: 280, rep: 87, tasks: 4, projects: 1 },
        { rank: 5, user: "Vikram Nair", initials: "VN", xp: 220, rep: 78, tasks: 4, projects: 1 },
        { rank: 6, user: "Ananya Reddy", initials: "AR", xp: 180, rep: 75, tasks: 3, projects: 1 },
        { rank: 7, user: "Kiran Bose", initials: "KB", xp: 160, rep: 71, tasks: 2, projects: 1 },
        { rank: 8, user: "Meera Pillai", initials: "MP", xp: 120, rep: 68, tasks: 2, projects: 1 },
      ],
      monthly: [
        { rank: 1, user: "Priya Patel", initials: "PP", xp: 1540, rep: 93, tasks: 18, projects: 4 },
        { rank: 2, user: "Dr. Divya Krishnan", initials: "DK", xp: 1380, rep: 96, tasks: 16, projects: 5 },
        { rank: 3, user: "Arjun Sharma", initials: "AS", xp: 1200, rep: 87, tasks: 14, projects: 3 },
        { rank: 4, user: "Rohan Mehta", initials: "RM", xp: 1050, rep: 89, tasks: 12, projects: 3 },
        { rank: 5, user: "Sneha Iyer", initials: "SI", xp: 890, rep: 82, tasks: 10, projects: 2 },
        { rank: 6, user: "Vikram Nair", initials: "VN", xp: 760, rep: 78, tasks: 8, projects: 2 },
        { rank: 7, user: "Ananya Reddy", initials: "AR", xp: 640, rep: 75, tasks: 7, projects: 2 },
        { rank: 8, user: "Kiran Bose", initials: "KB", xp: 520, rep: 71, tasks: 5, projects: 1 },
      ],
      alltime: [
        { rank: 1, user: "Dr. Divya Krishnan", initials: "DK", xp: 4200, rep: 96, tasks: 42, projects: 8 },
        { rank: 2, user: "Priya Patel", initials: "PP", xp: 3850, rep: 93, tasks: 38, projects: 7 },
        { rank: 3, user: "Rohan Mehta", initials: "RM", xp: 3400, rep: 89, tasks: 35, projects: 6 },
        { rank: 4, user: "Arjun Sharma", initials: "AS", xp: 2450, rep: 87, tasks: 24, projects: 5 },
        { rank: 5, user: "Sneha Iyer", initials: "SI", xp: 2100, rep: 82, tasks: 20, projects: 4 },
        { rank: 6, user: "Vikram Nair", initials: "VN", xp: 1900, rep: 78, tasks: 18, projects: 4 },
        { rank: 7, user: "Ananya Reddy", initials: "AR", xp: 1750, rep: 75, tasks: 16, projects: 3 },
        { rank: 8, user: "Kiran Bose", initials: "KB", xp: 1500, rep: 71, tasks: 14, projects: 3 },
      ],
    };
  }

  getLeaderboard(period: 'weekly' | 'monthly' | 'alltime') {
    return this.leaderboard[period] || [];
  }
  
  getFullLeaderboard() {
    return this.leaderboard;
  }
}
