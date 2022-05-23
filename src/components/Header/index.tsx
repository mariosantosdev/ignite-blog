import Image from 'next/image';

import styles from './header.module.scss';

export default function Header(): JSX.Element {
  return (
    <div className={styles.container}>
      <Image alt="Logo" src="/logo.svg" width={239} height={27} />
    </div>
  );
}
