import { Injectable } from '@nestjs/common';
import { CreateUserDto, UserRole, UserStatus } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface UserProfile {
  username?: string;
  university?: string;
  bio?: string;
  linkedin?: string;
  phone?: string;
  skills?: string[];
  xp?: number;
  rep?: number;
  projects?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  skills: string[];
  linkedIn?: string;
  status: UserStatus;
  flags: boolean;
  initials: string;
  profile?: UserProfile;
}

@Injectable()
export class UsersRepository {
  private users: User[] = [];

  constructor() {
    this.users = [
      {
        id: 'arjun.sharma@teamforge.io',
        name: "Arjun Sharma",
        email: "arjun.sharma@teamforge.io",
        initials: "AS",
        role: UserRole.ProjectOwner,
        skills: [],
        status: UserStatus.Active,
        flags: false,
        profile: { username: "arjunsharma", university: "IIT Delhi", xp: 2450, rep: 87, projects: 5 }
      },
      {
        id: 'rohan.mehta@teamforge.io',
        name: "Rohan Mehta",
        email: "rohan.mehta@teamforge.io",
        initials: "RM",
        role: UserRole.Collaborator,
        skills: [],
        status: UserStatus.Active,
        flags: false,
        profile: { username: "rohanmehta", university: "NIT Trichy", xp: 3400, rep: 89, projects: 6 }
      },
      {
        id: 'sneha.iyer@teamforge.io',
        name: "Sneha Iyer",
        email: "sneha.iyer@teamforge.io",
        initials: "SI",
        role: UserRole.ProjectOwner,
        skills: [],
        status: UserStatus.Active,
        flags: false,
        profile: { username: "snehaiyer", university: "VIT Vellore", xp: 2100, rep: 82, projects: 4 }
      },
      {
        id: 'priya.patel@teamforge.io',
        name: "Priya Patel",
        email: "priya.patel@teamforge.io",
        initials: "PP",
        role: UserRole.Mentor,
        skills: [],
        status: UserStatus.Active,
        flags: false,
        profile: { username: "priyapatel", university: "BITS Pilani", xp: 3850, rep: 93, projects: 7 }
      },
      {
        id: 'vikram.nair@teamforge.io',
        name: "Vikram Nair",
        email: "vikram.nair@teamforge.io",
        initials: "VN",
        role: UserRole.ProjectOwner,
        skills: [],
        status: UserStatus.Warned,
        flags: true,
        profile: { username: "vikramnair", university: "IIT Madras", xp: 1800, rep: 71, projects: 3 }
      },
      {
        id: 'ananya.reddy@teamforge.io',
        name: "Ananya Reddy",
        email: "ananya.reddy@teamforge.io",
        initials: "AR",
        role: UserRole.ProjectOwner,
        skills: [],
        status: UserStatus.Active,
        flags: false,
        profile: { username: "ananyareddy", university: "Manipal Institute of Technology", xp: 2900, rep: 85, projects: 5 }
      },
      {
        id: 'kiran.bose@teamforge.io',
        name: "Kiran Bose",
        email: "kiran.bose@teamforge.io",
        initials: "KB",
        role: UserRole.Collaborator,
        skills: [],
        status: UserStatus.Suspended,
        flags: true,
        profile: { username: "kiranbose", university: "IIIT Hyderabad", xp: 950, rep: 60, projects: 2 }
      },
      {
        id: 'meera.pillai@teamforge.io',
        name: "Meera Pillai",
        email: "meera.pillai@teamforge.io",
        initials: "MP",
        role: UserRole.Collaborator,
        skills: [],
        status: UserStatus.Active,
        flags: false,
        profile: { username: "meerapillai", university: "NIT Calicut", xp: 1200, rep: 68, projects: 3 }
      },
    ];
  }

  findAll(): User[] {
    return this.users;
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  create(createUserDto: CreateUserDto): User {
    const initials = createUserDto.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    const newUser: User = {
      id: createUserDto.email || Date.now().toString(),
      ...createUserDto,
      initials,
      skills: createUserDto.skills || [],
      status: createUserDto.status || UserStatus.Active,
      flags: createUserDto.flags || false,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, updateUserDto: UpdateUserDto): User | undefined {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return undefined;
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateUserDto,
    };

    return this.users[userIndex];
  }

  delete(id: string): boolean {
    const initialLength = this.users.length;
    this.users = this.users.filter((user) => user.id !== id);
    return this.users.length < initialLength;
  }
}
