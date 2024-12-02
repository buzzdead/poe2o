"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

// Navigation Items Configuration
type NavItem = {label: string, href: string}
const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Gems", href: "/gems" },
  { label: "Classes", href: "/classes" },
  { label: "Skill Tree", href: "/skilltree"},
  { label: "My Character", href: "/mycharacter"}
];

export function NavigationMenuDemo() {
  const pathname = usePathname();

  return (
    <div className="justify-center align-middle w-full flex mb-4">
      <NavigationMenu>
        <NavigationMenuList>
          {navItems.map((item) => (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    pathname === item.href && "bg-accent text-accent-foreground"
                  )}
                >
                  {item.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
