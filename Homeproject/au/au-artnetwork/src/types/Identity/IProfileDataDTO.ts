import { ProfileGender } from "types/Enums/ProfileGender";

export interface IProfileDataDTO {
  username: string;
  profileFullName: string;
  profileWorkPlace: string;
  profileAbout: string;
  phoneNumber: string;
  profileGender: ProfileGender;
  profileGenderOwn: string;
}
