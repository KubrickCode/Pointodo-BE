export interface ITransaction {
  beginTransaction(isolationLevel?: string): Promise<void>;
  commitTransaction(): Promise<void>;
  rollbackTransaction(): Promise<void>;
}
