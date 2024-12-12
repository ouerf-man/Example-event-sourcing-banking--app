export interface Event {
    id: string;
    accountId: string;
    type: string;
    payload: any;
    createdAt: Date;
    sequence: number;
  }
  