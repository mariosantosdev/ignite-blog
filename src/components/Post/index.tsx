import { useMemo } from 'react';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useRouter } from 'next/router';

import styles from './post.module.scss';

interface PostProps {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  author: string;
}

export default function Post({
  slug,
  title,
  subtitle,
  date,
  author,
}: PostProps): JSX.Element {
  const router = useRouter();

  const formatedDate = useMemo(() => {
    return format(new Date(date), 'dd MMM yyyy', { locale: ptBR });
  }, [date]);

  return (
    <div
      role="button"
      tabIndex={-1}
      className={styles.postContainer}
      onClick={() => router.push(`/post/${slug}`)}
      aria-hidden="true"
    >
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
