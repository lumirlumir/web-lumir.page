import Image from 'next/image';

import styles from './Loading.module.scss';

export default function Loading({ content }) {
  return (
    <div className={styles.loading}>
      <div>
        <div>
          <Image
            src="/images/loading.gif"
            width={48}
            height={48}
            alt="GitHub GIF loading image"
            unoptimized
          />
        </div>
        <div className={styles.content}>{content} 불러오는 중...</div>
      </div>
    </div>
  );
}
