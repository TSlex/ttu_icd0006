import { ProfileGender } from './Enums/ProfileGender';

export interface IProfileDTO {
  userName: string;

  profileFullName: string;
  profileWorkPlace: string;
  profileStatus: string;
  profileAbout: string;

  profileAvatarUrl: string;
  profileAvatarId: string;

  profileGender: ProfileGender;
  profileGenderOwn: string;

  lastLoginDateTime: Date;

  followersCount: number;
  followedCount: number;
  postsCount: number;
  experience: number;

  isUserBlocked: boolean;
  isUserFollows: boolean;
  isUserBlocks: boolean;
}

export interface IProfileAdminDTO {
  lastLoginDateTime: Date;
  profileFullName: string;
  profileWorkPlace: string;
  profileStatus: string;
  profileAvatarId: string;
  profileAbout: string;
  profileGender: ProfileGender;
  profileGenderOwn: string;
  followersCount: number;
  followedCount: number;
  postsCount: number;
  experience: number;
  password: string;
  id: string;
  registrationDateTime: Date;
  createdBy: string | null;
  createdAt: Date;
  changedBy: string | null;
  changedAt: Date;
  deletedBy: string | null;
  deletedAt: Date | null;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: Date;
  lockoutEnabled: boolean;
  accessFailedCount: number;
}
