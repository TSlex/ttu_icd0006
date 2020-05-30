import { DomainEntityBaseMetaSoftUpdateDelete } from '@/types/Domain/DomainEntityBaseMetaSoftUpdateDelete'

export interface IGiftDTO {
  giftName: string;
  giftCode: string;
  giftImageId: string | null;
  price: number;
}

export interface IGiftAdminDTO extends DomainEntityBaseMetaSoftUpdateDelete {
  giftNameId: string;
  giftName: string;
  giftCode: string;
  giftImageId: string | null;
  price: number;
}
