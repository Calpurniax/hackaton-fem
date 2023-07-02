export interface userXYearProps {
  year: string;
  internet_users: number;
}

export interface totalUsersProps {
  userXYear: userXYearProps[];
  currentYear: string;
}
