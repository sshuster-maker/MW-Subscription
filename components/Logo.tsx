import Image from 'next/image';

export default function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="MessageWhiz"
      width={160}
      height={48}
      style={{ objectFit: 'contain' }}
      priority
    />
  );
}
