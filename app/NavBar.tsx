import Link from "next/link";
import { GiCrowNest } from "react-icons/gi";

const NavBar = () => {
    const links = [
        { label: 'Dashboard', href: '/', id: 1 },
        { label: 'Issues', href: '/issues', id: 2 },
    ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
        <Link href="/"><GiCrowNest size='35'/></Link>
        <ul className="flex space-x-6">
            {links.map(link=>
                    <Link 
                    key={link.id} 
                    className="text-zinc-500 hover:text-zinc-800 transition-colors" 
                    href={link.href}>
                        {link.label}
                    </Link>
            )}
        </ul>
    </nav>
  )
}

export default NavBar