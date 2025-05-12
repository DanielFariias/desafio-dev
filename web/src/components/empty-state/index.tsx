import React from 'react';

import { Inbox } from 'lucide-react';

import styles from './styles.module.scss';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  icon = <Inbox size={48} />,
}: EmptyStateProps) {
  return (
    <div className={styles.wrapper}>
      {icon}
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
}
