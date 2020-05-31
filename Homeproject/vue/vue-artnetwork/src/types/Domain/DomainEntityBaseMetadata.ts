export interface DomainEntityBaseMetadata{
  id: string;

  createdBy: string | null;
  createdAt: Date;
  changedBy: string | null;
  changedAt: Date;
  deletedBy: string | null;
  deletedAt: Date | null;
}
