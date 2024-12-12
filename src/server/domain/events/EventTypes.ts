export const EVENT_TYPES = {
    DEPOSIT: 'Deposit',
    WITHDRAW: 'Withdraw',
    TRANSFER: 'Transfer',
  } as const;
  
  export type EventType = typeof EVENT_TYPES[keyof typeof EVENT_TYPES];
  