export interface OurUser {
    timesheetCount?: number;
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
    enabled: boolean;
    authorities: { authority: string }[];
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
  }
  