import { FC, ReactNode } from 'react';

type ListItemProps = {
  children: ReactNode;
};

export const ListItem: FC<ListItemProps> = ({ children }) => (
  <div>{children}</div>
);
