import { DomainEntityBaseMetaSoftDelete } from '@/types/Domain/DomainEntityBaseMetaSoftDelete';

export interface IProfileRankAdminDTO extends DomainEntityBaseMetaSoftDelete {
  profileId: string;
  rankId: string;
}
