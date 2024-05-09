'use client';

import Link from 'next/link';

export default function CreateBtn() {
  return (
    <div>
      <Link href={'/game/create'}>방만들기</Link>
    </div>
  );
}
