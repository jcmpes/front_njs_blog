import Link from 'next/link';
import { useSelector } from 'react-redux';
import { getAuth } from '../../store/selectors';

const Navbar = () => {
  const { isLogged, user } = useSelector(getAuth);

  return (
    <nav className="flex px-16 py-8">
      <Link href="/">
        <a>
          <h2 className="flex-1 font-bold text-2xl ">weBlog</h2>
        </a>
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
        <li className="px-4 py-2">
            {
                isLogged
                ?   <Link href="/new-post">
                        <a>Log Out</a>
                    </Link>
                :   <Link href="/login">
                        <a>Log In</a>
                    </Link>
            }
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
