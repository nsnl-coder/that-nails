import { Generated, Selectable } from 'kysely';

type Jsonify<T> = T extends Date
  ? string
  : T extends Array<infer U>
  ? Jsonify<U>[]
  : T extends object
  ? { [K in keyof T]: Jsonify<T[K]> }
  : T;

export type JsonSelectable<T> = Jsonify<Selectable<T>>;

export interface CheckinTable {
  id: Generated<number>;
  phone: string;
  created_at: Date;
}

export interface UserTable {
  id: Generated<number>;
  full_name: string;
  email?: string;
  phone: string;
  created_at: Generated<Date>;
}

export interface DB {
  checkins: CheckinTable;
  users: UserTable;
}
