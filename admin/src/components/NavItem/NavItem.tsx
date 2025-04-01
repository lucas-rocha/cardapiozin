'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import clsx from 'clsx';

interface NavItemProps {
  text: string;
  href: string;
  hasChild?: boolean;
  defaultSrc: string;
  activeSrc: string;
  alt: string;
  children?: React.ReactNode;
}

const NavItem: FC<NavItemProps> = ({ text, href, hasChild, defaultSrc, activeSrc, alt, children}) => {
  const [isActiveChild, setIsActiveChild] = useState(false)
  const pathname = usePathname();
  const isActive = pathname === href;

  const src = isActive ? activeSrc : defaultSrc;

  const handleClick = () => {
    if(children) {
      setIsActiveChild(!isActiveChild)
    }
  }
  
  return (
    <li className="list-none">
      {hasChild ? 
        <div
          onClick={handleClick}
          className={clsx("flex items-center gap-3 w-44 h-11 p-4 rounded-lg cursor-pointer text-colortext", { 'bg-brandcolor': isActive, 'text-white': isActive  })}
        >
          <Image src={src} alt={alt} width={24} height={24} />
          {text}
        </div>
      :
        <Link 
          href={href}
          onClick={handleClick}
          className={clsx("flex items-center gap-3 w-44 h-11 p-4 rounded-lg text-colortext", { 'bg-brandcolor': isActive, 'text-white': isActive  })}>
          <Image src={src} alt={alt} width={24} height={24} />
          {text}
        </Link>
      }
      {(isActiveChild || isActive)? children : ''}
    </li>
  )
}

export default NavItem;