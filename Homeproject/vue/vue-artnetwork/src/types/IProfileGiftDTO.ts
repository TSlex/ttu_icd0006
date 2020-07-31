import { DomainEntityBaseMetaSoftDelete } from '@/types/Domain/DomainEntityBaseMetaSoftDelete';

export interface IProfileGiftDTO {
  id: string;
  giftName: string;
  username: string;
  fromUsername: string | null;
  imageId: string;
  giftDateTime: Date;
  price: number;
  message: string | null;
}

export interface IProfileGiftPostDTO {
  username: string;
  fromUsername: string | null;
  giftCode: string;
  message: string | null;
}

export interface IProfileGiftAdminDTO extends DomainEntityBaseMetaSoftDelete {
  profileId: string;
  giftId: string;
  giftDateTime: Date | null;
  price: number;
  fromProfileId: string | null;
  message: string | null;
}
