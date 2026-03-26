import Link from 'next/link';
import { FaGithub, FaHouseChimney } from '@lumir/react-kit/svgs';

import { getGithubUsers } from '@/utils/fetch';

import styles from './links.module.scss';

export default async function Links() {
  const { html_url: htmlUrl } = await getGithubUsers();

  return (
    <ul className={styles.links}>
      <li>
        <Link href="/">
          <FaHouseChimney />
          <span>Home</span>
        </Link>
      </li>
      <li>
        <Link href={htmlUrl}>
          <FaGithub />
          <span>GitHub</span>
        </Link>
      </li>
    </ul>
  );
}
