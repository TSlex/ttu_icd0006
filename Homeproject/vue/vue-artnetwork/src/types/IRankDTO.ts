import { DomainEntityBaseMetaSoftUpdateDelete } from '@/types/Domain/DomainEntityBaseMetaSoftUpdateDelete'

export interface IRankDTO {
  rankTitle: string | null;
  rankDescription: string | null;
  rankIcon: string | null;
  rankColor: string;
  rankTextColor: string;
  maxExperience: number;
  minExperience: number;
}

export interface IRankAdminDTO extends DomainEntityBaseMetaSoftUpdateDelete {
  rankCode: string;
  rankTitleId: string | null;
  rankTitle: string | null;
  rankDescriptionId: string | null;
  rankDescription: string | null;
  rankColor: string;
  rankTextColor: string;
  rankIcon: string | null;
  maxExperience: number;
  minExperience: number;
  previousRankId: string | null;
  nextRankId: string | null;
}
