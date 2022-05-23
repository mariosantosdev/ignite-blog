/* eslint-disable react-hooks/rules-of-hooks */
import { useMemo } from 'react';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

import Header from '../../components/Header';
import { calculateReading, countWords } from '../../utils/estimativeReadTime';
import { formatContent } from '../../utils/formatContent';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  const { title, author, banner, content } = post?.data;

  const formatedDate = useMemo(() => {
    return format(new Date(post?.first_publication_date), 'dd MMM yyyy', {
      locale: ptBR,
    });
  }, [post.first_publication_date]);

  const wordsLength = useMemo(() => countWords(content), [content]);
  const estimatedTime = useMemo(
    () => calculateReading(wordsLength),
    [wordsLength]
  );
  const formattedContent = useMemo(() => formatContent(content), [content]);

  return (
    <>
      <Head>
        <title>{title} - SpaceTraveling</title>
      </Head>

      <Header />

      <div className={styles.cover}>
        <Image src={banner.url} alt={title} layout="fill" objectFit="cover" />
      </div>

      <main className={`${styles.postContainer} ${commonStyles.container}`}>
        <header>
          <h1>{title}</h1>

          <div>
            <span>
              <FiCalendar />
              <p>{formatedDate}</p>
            </span>

            <span>
              <FiUser />
              <p>{author}</p>
            </span>

            <span>
              <FiClock />
              <p>{estimatedTime} min</p>
            </span>
          </div>
        </header>

        {formattedContent.map(([heading, body]) => (
          <section key={heading}>
            <h2>{heading}</h2>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: body }}
            />
          </section>
        ))}
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const { results } = await prismic.getByType('posts', { pageSize: 5 });

  return {
    paths: results.map(post => ({ params: { slug: post.uid } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('posts', String(slug));

  return {
    props: {
      post: response,
    },
  };
};
