import Image from 'next/image';
import Link from 'next/link';

import styles from './header.module.scss';

export default function Header(): JSX.Element {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a>
          <Image alt="logo" src="/logo.svg" width={239} height={27} />
        </a>
      </Link>
    </div>
  );
}
