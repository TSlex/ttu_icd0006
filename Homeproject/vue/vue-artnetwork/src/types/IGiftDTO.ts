export interface IGiftDTO {
  id: string;
  giftName: string;
  username: string;
  fromUsername: string | null;
  imageId: string;
  giftDateTime: Date;
  price: number;
  message: string | null;
}
