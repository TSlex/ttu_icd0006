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
