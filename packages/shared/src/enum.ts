export enum SOCKET_EVENT {
  CHECKIN_CREATED = 'checkin_created',
}

export enum USER_ROLE {
  ROOT = 'root',
  CUSTOMER = 'customer',
  OWNER = 'owner',
  EMPLOYEE = 'employee',
  MULTIPLE_ROLES = 'multiple_roles',
}

export enum APPOINTMENT_STATUS {
  PENDING = 'pending',
  COMPLETED = 'completed',
  NO_SHOW = 'no_show',
  CANCELLED = 'cancelled',
}

export enum JWT_TOKEN {
  AUTH = 'auth-token',
  RESET_PASSWORD = 'forgot-password-token',
}
