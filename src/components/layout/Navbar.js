import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex px-16 py-8 bg-green-300 bg-opacity-50">
      <Link href="/">
        <a><h2 className="flex-1 font-bold text-2xl ">weBlog</h2></a>
      </Link>
      <ul className="flex-1 flex justify-end">
        <li className="px-4 py-2">
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li className="px-4 py-2">
          <Link href="/new-post">
            <a>New Post</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;