import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useCallback, useState } from 'react';

import Header from '../components/Header';
import Post from '../components/Post';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const [posts, setPosts] = useState(postsPagination.results);
  const [nextPage, setNextPage] = useState(postsPagination.next_page);

  const fetchMorePosts = useCallback(() => {
    fetch(nextPage)
      .then(res => res.json())
      .then(({ next_page, results }: PostPagination) => {
        if (results.length) setPosts(prev => [...prev, ...results]);
        setNextPage(next_page);
      });
  }, [nextPage]);

  return (
    <>
      <Head>
        <title>Home - SpaceTraveling</title>
      </Head>

      <Header />

      <main className={`${styles.homeContainer} ${commonStyles.container}`}>
        {posts.map(post => (
          <Post
            key={post.uid}
            slug={post.uid}
            title={post.data.title}
            subtitle={post.data.subtitle}
            date={post.first_publication_date}
            author={post.data.author}
          />
        ))}

        {nextPage && (
          <button
            type="button"
            className={styles.buttonLoadMorePosts}
            onClick={fetchMorePosts}
          >
            Carregar mais posts
          </button>
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const { next_page, results } = await prismic.getByType('posts', {
    pageSize: 1,
  });

  return {
    props: {
      postsPagination: {
        next_page: next_page ?? '',
        results,
      },
    },
    revalidate: 60 * 60, // 1 hour
  };
};
