import { GetStaticProps } from 'next';
import Head from 'next/head';

import Header from '../components/Header';
import Post from '../components/Post';

import { getPrismicClient } from '../services/prismic';

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

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Home - SpaceTraveling</title>
      </Head>

      <Header />

      <main className={styles.container}>
        <Post
          title="Como utilizar Hooks"
          subtitle="Pensando em sincronização em vez de ciclos de vida."
          date="2021-03-15T19:25:28+0000"
          author="Joseph Oliveira"
        />
        <Post
          title="Criando um app CRA do zero"
          subtitle="Tudo sobre como criar a sua primeira aplicação utilizando Create React App"
          date="2021-03-15T19:25:28+0000"
          author="Danilo Vieira"
        />

        <button type="button" className={styles.buttonLoadMorePosts}>
          Carregar mais posts
        </button>
      </main>
    </>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient({});
//   // const postsResponse = await prismic.getByType(TODO);

//   // TODO
// };
