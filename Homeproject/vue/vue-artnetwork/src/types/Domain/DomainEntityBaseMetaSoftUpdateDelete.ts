export interface DomainEntityBaseMetaSoftUpdateDelete{
  id: string;
  masterId: string;

  createdBy: string;
  createdAt: Date;
  changedBy: string;
  changedAt: Date;
  deletedBy: string;
  deletedAt: Date;
}
