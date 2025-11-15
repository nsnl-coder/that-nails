export * from './db.type';
export * from './jwt.type';

export interface HttpResponse<T> {
  data: T;
}
