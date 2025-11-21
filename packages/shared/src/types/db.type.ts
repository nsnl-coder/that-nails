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

export interface UserTable {
  id: Generated<number>;
  full_name: string;
  email: string | null;
  password: string | null;
  phone: string;
  is_phone_verified: Generated<boolean>;
  is_email_verified: Generated<boolean>;
  created_at: Generated<Date>;
  password_updated_at: Date | null;
}

export interface TokenTable {
  id: Generated<number>;
  user_id: Generated<number>;
  emailOrPhone: string;
  token: string;
  expires_at: Date;
  created_at: Generated<Date>;
}

export interface SalonTable {
  id: Generated<number>;
  name: string;
  address: string;
  phone: string;
  email: string;
  created_at: Generated<Date>;
}

export interface SalonUserTable {
  salon_id: number;
  user_id: number;
  role: USER_ROLE.OWNER | USER_ROLE.EMPLOYEE;
  created_at: Generated<Date>;
}

export interface RootUserTable {
  user_id: number;
}

export interface CheckinTable {
  id: Generated<number>;
  phone: string;
  created_at: Date;
}

export interface CategoryTable {
  id: Generated<number>;
  salon_id: number;
  name: string;
  order: Generated<number>;
  created_at: Generated<Date>;
}

export interface ServiceTable {
  id: Generated<number>;
  name: string;
  price: number;
  salon_id: number;
  category_id: number | null;
  order: Generated<number>;
  duration: Generated<number>;
  created_at: Generated<Date>;
}

export interface AppointmentTable {
  id: Generated<number>;
  customer_id: number;
  salon_id: number;
  status: APPOINTMENT_STATUS;
  appointment_date: Date;
  created_at: Generated<Date>;
  guests: {
    technician_id: number;
    services: {
      service_name: string;
      service_id: number;
      duration: number;
      price: number;
    }[];
  }[];
}

export interface DB {
  checkins: CheckinTable;
  users: UserTable;
  root_users: RootUserTable;
  salon_users: SalonUserTable;
  services: ServiceTable;
  categories: CategoryTable;
  salons: SalonTable;
  appointments: AppointmentTable;
}
