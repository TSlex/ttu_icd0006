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
