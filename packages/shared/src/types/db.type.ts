import { Generated } from 'kysely';

export interface CheckinTable {
  id: Generated<number>;
  phone: string;
  created_at: Date;
}

export interface DB {
  checkins: CheckinTable;
}
