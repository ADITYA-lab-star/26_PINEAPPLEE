import { Injectable } from '@nestjs/common';
import { CreateApplicationDto, ApplicationStatus } from './dto/create-application.dto';
import { IssueBadgeDto, BadgeType } from './dto/issue-badge.dto';

export interface MentorApplication {
  id: string;
  name: string;
  initials: string;
  university: string;
  submittedAt: string;
  expertise: string;
  specialization: string;
  linkedin: string;
  years: number;
  motivation: string;
  status: string;
  userId?: string;
  timestamp?: Date;
}

export interface RecommendationBadge {
  id: string;
  mentorId: string;
  collaboratorId: string;
  badgeType: BadgeType;
  comment: string;
  timestamp: Date;
}

@Injectable()
export class MentorshipRepository {
  private applications: MentorApplication[] = [];
  private badges: RecommendationBadge[] = [];

  constructor() {
    const now = new Date();

    this.applications = [
      {
        id: "mentor-app-1",
        name: "Arjun Sharma",
        initials: "AS",
        university: "IIT Delhi",
        submittedAt: "Mar 6, 2026",
        expertise: "Full-stack Development, React, Node.js",
        specialization: "Full-stack Development",
        linkedin: "https://linkedin.com/in/arjunsharma",
        years: 5,
        motivation: "I want to help students navigate the challenges I faced early in my career, especially around building real production systems from scratch.",
        status: "pending",
        userId: "arjun.sharma@teamforge.io",
      },
      {
        id: "mentor-app-2",
        name: "Kavya Menon",
        initials: "KM",
        university: "NIT Surathkal",
        submittedAt: "Mar 5, 2026",
        expertise: "Data Science, Python, MLOps",
        specialization: "Data Science",
        linkedin: "https://linkedin.com/in/kavyamenon",
        years: 6,
        motivation: "I enjoy mentoring junior developers and helping them build confidence with practical projects, especially in data-driven products.",
        status: "approved",
      },
      {
        id: "mentor-app-3",
        name: "Harsh Verma",
        initials: "HV",
        university: "IIIT Hyderabad",
        submittedAt: "Mar 4, 2026",
        expertise: "DevOps, Cloud Architecture, Kubernetes",
        specialization: "DevOps & Cloud",
        linkedin: "https://linkedin.com/in/harshverma",
        years: 3,
        motivation: "I want to guide teams on deployment and CI/CD. I can support projects with infrastructure and platform reliability best practices.",
        status: "rejected",
      },
      {
        id: "mentor-app-4",
        name: "Meera Pillai",
        initials: "MP",
        university: "NIT Calicut",
        submittedAt: "Mar 8, 2026",
        expertise: "Backend Engineering, PostgreSQL, System Design",
        specialization: "Backend Engineering",
        linkedin: "https://linkedin.com/in/meerapillai",
        years: 7,
        motivation: "I want to mentor students on building reliable backend systems and help them learn how to ship production-ready APIs and services.",
        status: "pending",
      },
      {
        id: "mentor-app-5",
        name: "Ritwik Saha",
        initials: "RS",
        university: "IIT Kharagpur",
        submittedAt: "Mar 7, 2026",
        expertise: "Frontend Architecture, React, Accessibility",
        specialization: "Frontend Engineering",
        linkedin: "https://linkedin.com/in/ritwiksaha",
        years: 4,
        motivation: "I enjoy helping teams improve UI architecture, accessibility, and code quality. I want to mentor contributors through real project reviews.",
        status: "approved",
      },
      {
        id: "mentor-app-6",
        name: "Nisha Rao",
        initials: "NR",
        university: "VIT Vellore",
        submittedAt: "Mar 9, 2026",
        expertise: "Data Engineering, Spark, ETL Pipelines",
        specialization: "Data Engineering",
        linkedin: "https://linkedin.com/in/nisharao",
        years: 5,
        motivation: "I want to support student teams working with analytics and data platforms, and help them build scalable and maintainable data workflows.",
        status: "pending",
      },
    ];
  }

  createApplication(userId: string, dto: CreateApplicationDto, initialStatus: ApplicationStatus): MentorApplication {
    const newApp: MentorApplication = {
      id: `app-${Date.now()}`,
      userId,
      name: "User",
      initials: "U",
      university: "University",
      submittedAt: new Date().toLocaleDateString(),
      expertise: "Expertise",
      specialization: "Specialization",
      linkedin: dto.linkedinURL,
      years: dto.experienceYears,
      motivation: dto.motivation,
      status: initialStatus,
      timestamp: new Date(),
    };
    this.applications.push(newApp);
    return newApp;
  }

  getApplicationByUserId(userId: string): MentorApplication | undefined {
    return this.applications.find((app) => app.userId === userId);
  }

  getAllApplications(): MentorApplication[] {
    return this.applications;
  }

  updateApplicationStatus(applicationId: string, status: ApplicationStatus): MentorApplication | undefined {
    const index = this.applications.findIndex((app) => app.id === applicationId);
    if (index === -1) {
      return undefined;
    }
    this.applications[index].status = status;
    return this.applications[index];
  }

  issueBadge(mentorId: string, dto: IssueBadgeDto): RecommendationBadge {
    const newBadge: RecommendationBadge = {
      id: `badge-${Date.now()}`,
      mentorId,
      collaboratorId: dto.collaboratorId,
      badgeType: dto.badgeType,
      comment: dto.comment,
      timestamp: new Date(),
    };
    this.badges.push(newBadge);
    return newBadge;
  }

  getBadgesByUserId(userId: string): RecommendationBadge[] {
    return this.badges
      .filter((badge) => badge.collaboratorId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()); // Reverse Chronological
  }
}
