"use client";
import Link from "next/link";
import { usePathname } from "next/dist/client/components/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Companions", href: "/companions" },
  { label: "My Journey", href: "/my-journey" },
];

const NavItems = () => {
  const pathname = usePathname();
  return (
    <nav className="Items-center flex gap-4">
      {navItems.map(({ label, href }) => (
        <Link
          href={href}
          key={href}
          className={cn(pathname === href && "text-primary font-semibold")}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};
export default NavItems;
