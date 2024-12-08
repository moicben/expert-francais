import Link from 'next/link';

export default function Header({ name, logo }) {
  return (
    <header className="pt-20 pb-12">
      <div className="text-2xl text-center dark:text-white">
        <Link href="/">
            <img src={logo} alt={`${name} logo`} className="logo mx-auto mb-4" />
            <span>{name}</span>
        </Link>
      </div>
    </header>
  );
}