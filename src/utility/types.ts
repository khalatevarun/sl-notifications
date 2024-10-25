export type Notification = {
    type: 'alert'|'info'|'success';
    content: {
      text: string;
    };
    timestamp: number;
    read: boolean;
  }

export type NotificationType = {
    label: string;
    value: string;
  }
  