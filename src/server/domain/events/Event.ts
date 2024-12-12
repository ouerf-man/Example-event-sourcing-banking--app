export interface Event {
    id: string;
    accountId: string;
    type: string;
    payload: object;
    createdAt: Date;
    sequence: number;
  }
  