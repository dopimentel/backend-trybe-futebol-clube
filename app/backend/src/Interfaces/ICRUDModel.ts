export type NewEntity<T> = Omit<T, 'id'>;
export type ID = number;

export interface ICRUDModelCreator<T> {
  create(data: Partial<T>): Promise<T>,
}

export interface ICRUDModelReader<T> {
  findAll(options: unknown): Promise<T[]>,
  findById(id: ID): Promise<T | null>,
  findByEmail(email: string): Promise<T | null>,
}

export interface ICRUDModelUpdater<T> {
  update(id: ID, data: Partial<T>): Promise<T | null>,
}

export interface ICRUDModelDeleter {
  delete(id: ID): Promise<number>,
}

export interface ICRUDModel<T>
  extends ICRUDModelCreator<T>, ICRUDModelReader<T>, ICRUDModelUpdater<T>,
  ICRUDModelDeleter { }
