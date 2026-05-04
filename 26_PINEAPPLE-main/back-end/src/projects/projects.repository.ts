import { Injectable } from '@nestjs/common';
import { CreateProjectDto, ProjectStatus, ProjectDifficulty } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

export interface ProjectMember {
  name: string;
  initials: string;
  role: string;
}

export interface Project {
  id: string;
  name: string;
  desc: string;
  objectives?: string;
  skills: string[];
  duration?: string;
  difficulty?: string;
  progress: number;
  collaborators: number;
  owner: string;
  members: ProjectMember[];
  isCompleted?: boolean;
  totalTasks?: number;
  completedTasks?: number;
  isUserCreated?: boolean;
  status: ProjectStatus;
  ownerId: string;
}

@Injectable()
export class ProjectsRepository {
  private projects: Project[] = [];

  constructor() {
    this.projects = [
      {
        id: "1",
        name: "AI Study Planner",
        desc: "An intelligent study scheduling app that adapts to student learning patterns.",
        skills: ["React", "Python", "ML"],
        progress: 35,
        collaborators: 4,
        owner: "Arjun Sharma",
        members: [
          { name: "Arjun Sharma", initials: "AS", role: "Owner" },
          { name: "Priya Patel", initials: "PP", role: "Developer" },
          { name: "Rohan Mehta", initials: "RM", role: "Designer" },
          { name: "Sneha Iyer", initials: "SI", role: "QA" },
        ],
        status: ProjectStatus.Open,
        ownerId: "arjun.sharma@teamforge.io"
      },
      {
        id: "2",
        name: "Campus Events App",
        desc: "Discover and organize campus events with real-time updates and RSVP management.",
        skills: ["React", "Node.js", "Firebase"],
        progress: 60,
        collaborators: 6,
        owner: "Vikram Nair",
        members: [
          { name: "Vikram Nair", initials: "VN", role: "Owner" },
          { name: "Ananya Reddy", initials: "AR", role: "Backend Dev" },
          { name: "Kiran Bose", initials: "KB", role: "Frontend Dev" },
          { name: "Meera Pillai", initials: "MP", role: "DevOps" },
        ],
        status: ProjectStatus.InProgress,
        ownerId: "vikram.nair@teamforge.io"
      },
      {
        id: "3",
        name: "EcoTracker",
        desc: "Track and reduce your carbon footprint with gamified challenges.",
        skills: ["React", "API", "Charts"],
        progress: 80,
        collaborators: 5,
        owner: "Ananya Reddy",
        members: [
          { name: "Ananya Reddy", initials: "AR", role: "Owner" },
          { name: "Kiran Bose", initials: "KB", role: "Developer" },
          { name: "Meera Pillai", initials: "MP", role: "Data Analyst" },
          { name: "Rohan Mehta", initials: "RM", role: "UI/UX" },
        ],
        status: ProjectStatus.InProgress,
        ownerId: "ananya.reddy@teamforge.io"
      },
      {
        id: "4",
        name: "Budget Buddy",
        desc: "Smart personal finance tracker for students with expense categorization.",
        skills: ["TypeScript", "Supabase"],
        progress: 45,
        collaborators: 3,
        owner: "Kiran Bose",
        members: [
          { name: "Kiran Bose", initials: "KB", role: "Owner" },
          { name: "Vikram Nair", initials: "VN", role: "Developer" },
          { name: "Sneha Iyer", initials: "SI", role: "Tester" },
        ],
        status: ProjectStatus.InProgress,
        ownerId: "kiran.bose@teamforge.io"
      },
      {
        id: "5",
        name: "Study Group Finder",
        desc: "Match with study partners based on courses, schedule, and learning style.",
        skills: ["React", "Node.js"],
        progress: 20,
        collaborators: 2,
        owner: "Priya Patel",
        members: [
          { name: "Priya Patel", initials: "PP", role: "Owner" },
          { name: "Arjun Sharma", initials: "AS", role: "Developer" },
        ],
        status: ProjectStatus.Open,
        ownerId: "priya.patel@teamforge.io"
      },
      {
        id: "6",
        name: "Code Review Hub",
        desc: "Peer code review platform for student developers with feedback scoring.",
        skills: ["React", "Git API", "Python"],
        progress: 10,
        collaborators: 1,
        owner: "Rohan Mehta",
        members: [{ name: "Rohan Mehta", initials: "RM", role: "Owner" }],
        status: ProjectStatus.Open,
        ownerId: "rohan.mehta@teamforge.io"
      },
      {
        id: "7",
        name: "Health & Wellness",
        desc: "Student wellness tracker with mental health resources and daily check-ins.",
        skills: ["React Native", "Firebase"],
        progress: 55,
        collaborators: 4,
        owner: "Sneha Iyer",
        members: [
          { name: "Sneha Iyer", initials: "SI", role: "Owner" },
          { name: "Ananya Reddy", initials: "AR", role: "Developer" },
          { name: "Vikram Nair", initials: "VN", role: "Designer" },
          { name: "Priya Patel", initials: "PP", role: "Advisor" },
        ],
        status: ProjectStatus.InProgress,
        ownerId: "sneha.iyer@teamforge.io"
      },
      {
        id: "8",
        name: "Research Collab",
        desc: "Collaborative research paper writing with version control and citations.",
        skills: ["React", "LaTeX", "Node.js"],
        progress: 30,
        collaborators: 3,
        owner: "Meera Pillai",
        members: [
          { name: "Meera Pillai", initials: "MP", role: "Owner" },
          { name: "Rohan Mehta", initials: "RM", role: "Researcher" },
          { name: "Kiran Bose", initials: "KB", role: "Developer" },
        ],
        status: ProjectStatus.InProgress,
        ownerId: "meera.pillai@teamforge.io"
      },
      {
        id: "9",
        name: "Smart Attendance Tracker",
        desc: "Automated attendance capture and reporting dashboard for classes.",
        skills: ["React", "Node.js", "MongoDB"],
        progress: 100,
        collaborators: 4,
        owner: "Priya Patel",
        isCompleted: true,
        totalTasks: 6,
        completedTasks: 6,
        members: [
          { name: "Priya Patel", initials: "PP", role: "Owner" },
          { name: "Arjun Sharma", initials: "AS", role: "Frontend Dev" },
          { name: "Ananya Reddy", initials: "AR", role: "Backend Dev" },
          { name: "Vikram Nair", initials: "VN", role: "QA" },
        ],
        status: ProjectStatus.Completed,
        ownerId: "priya.patel@teamforge.io"
      },
    ];
  }

  findAll(): Project[] {
    return this.projects;
  }

  findById(id: string): Project | undefined {
    return this.projects.find((project) => project.id === id);
  }

  findByOwnerId(ownerId: string): Project[] {
    return this.projects.filter((project) => project.ownerId === ownerId);
  }

  create(ownerId: string, createProjectDto: CreateProjectDto, status: ProjectStatus): Project {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      ownerId,
      name: createProjectDto.title,
      desc: createProjectDto.description,
      skills: createProjectDto.requiredSkills,
      difficulty: createProjectDto.difficulty,
      duration: createProjectDto.duration,
      progress: 0,
      collaborators: 1,
      owner: "Project Owner", // Should come from user service, placeholder for now
      members: [{ name: "Project Owner", initials: "PO", role: "Owner" }],
      status,
    };
    this.projects.push(newProject);
    return newProject;
  }

  update(id: string, updateProjectDto: UpdateProjectDto): Project | undefined {
    const index = this.projects.findIndex((project) => project.id === id);
    if (index === -1) {
      return undefined;
    }

    if(updateProjectDto.title) this.projects[index].name = updateProjectDto.title;
    if(updateProjectDto.description) this.projects[index].desc = updateProjectDto.description;
    if(updateProjectDto.requiredSkills) this.projects[index].skills = updateProjectDto.requiredSkills;

    this.projects[index] = {
      ...this.projects[index],
      ...updateProjectDto,
    };

    return this.projects[index];
  }

  delete(id: string): boolean {
    const initialLength = this.projects.length;
    this.projects = this.projects.filter((project) => project.id !== id);
    return this.projects.length < initialLength;
  }
}
