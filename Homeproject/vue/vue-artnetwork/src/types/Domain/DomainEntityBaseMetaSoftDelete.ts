export interface DomainEntityBaseMetaSoftDelete{
  id: string;

  createdBy: string;
  createdAt: Date;
  changedBy: string;
  changedAt: Date;
  deletedBy: string;
  deletedAt: Date;
}
