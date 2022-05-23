import { FiCalendar, FiUser } from 'react-icons/fi';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { useMemo } from 'react';
import styles from './post.module.scss';

interface PostProps {
  title: string;
  subtitle: string;
  date: string;
  author: string;
}

export default function Post({
  title,
  subtitle,
  date,
  author,
}: PostProps): JSX.Element {
  const formatedDate = useMemo(() => {
    return format(new Date(date), 'dd MMM yyyy', { locale: ptBR });
  }, [date]);

  return (
    <div className={styles.postContainer}>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <footer>
        <span>
          <FiCalendar />
          <time>{formatedDate}</time>
        </span>

        <span>
          <FiUser />
          <p>{author}</p>
        </span>
      </footer>
    </div>
  );
}
