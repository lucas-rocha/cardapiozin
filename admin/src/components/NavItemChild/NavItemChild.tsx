import Link from "next/link";
import { FC } from "react";

interface NavItemChildProps {
  text: string;
  href: string;
}

const NavItemChild: FC<NavItemChildProps> = ({ text, href }) => {
  return (
    <ul className="my-4">
      <li className="text-center px-5 py-1">
        <Link href={href} className="flex items-center gap-3 hover:underline">
          <div className="w-1 h-1 bg-table-head rounded"></div>
          <p className="font-normal">{text}</p>
        </Link>
      </li>
    </ul>
  )
}

export default NavItemChild