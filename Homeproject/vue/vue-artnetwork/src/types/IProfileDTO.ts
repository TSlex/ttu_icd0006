export interface IProfileDTO {
  userName: string;

  profileFullName: string;
  profileWorkPlace: string;
  profileStatus: string;
  profileAbout: string;

  profileAvatarUrl: string;
  profileAvatarId: string;

  profileGender: number;
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
  profileGender: number;
  profileGenderOwn: string;
  followersCount: number;
  followedCount: number;
  postsCount: number;
  experience: number;
  password: string;
  id: string;
  registrationDateTime: Date;
  createdBy: string;
  createdAt: Date;
  changedBy: string;
  changedAt: Date;
  deletedBy: string;
  deletedAt: Date;
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
