export default function Header({ name, logo }) {
  return (
    <header className="pt-20 pb-12">
      <div className="text-2xl text-center dark:text-white">
        <a href="/">
          <img src={logo} alt={`${name} logo`} className="logo mx-auto mb-4" />
          <span>{name}</span>
        </a>
      </div>
    </header>
  );
}