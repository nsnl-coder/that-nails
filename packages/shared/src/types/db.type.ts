import { Generated, Selectable } from 'kysely';
import { APPOINTMENT_STATUS, USER_ROLE } from '../enum';

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
  role: USER_ROLE;
}

export interface CategoryTable {
  id: Generated<number>;
  name: string;
  order: Generated<number>;
  created_at: Generated<Date>;
}

export interface ServiceTable {
  id: Generated<number>;
  name: string;
  price: number;
  order: Generated<number>;
  duration: Generated<number>;
  category_id: number;
  created_at: Generated<Date>;
}

export interface AppointmentTable {
  id: Generated<number>;
  user_id: number;
  service_id: number;
  status: APPOINTMENT_STATUS;
  appointment_date: Date;
  created_at: Generated<Date>;
}

export interface AppointmentServiceTable {
  id: Generated<number>;
  appointment_id: number;
  service_id: number;
  created_at: Generated<Date>;
  duration: Generated<number>;
}

export interface DB {
  checkins: CheckinTable;
  users: UserTable;
  services: ServiceTable;
  categories: CategoryTable;
}
