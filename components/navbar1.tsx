"use client"

import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LogoutUser from "@/lib/components/logoutUser";
import Image from "next/image";
import Link from "next/link";
import { User } from "@/lib/types/types";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
    logout: {
      title: string;
      url: string;
    };
  };
  userData: User;
}

const Navbar1 = ({
  logo = {
    url: "/",
    src: "https://img.icons8.com/dusk/64/pills.png",
    alt: "logo",
    title: "MediStore",
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Medicines",
      url: "/medicines",
    },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Register", url: "/register" },
    logout: { title: "logout", url: "/" },
  },
  className,
  userData,
}: Navbar1Props) => {

  return (
    <section className={cn("p-4 shadow-sm sticky top-0 bg-slate-50 z-10", className)}>
      <div className="container justify-between items-center">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <Image
                src={logo.src}
                className="max-h-8 max-w-8 dark:invert"
                width={32}
                height={32}
                alt={logo.alt}
                priority
              />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList className='flex gap-2'>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
                {userData?.role &&
                  (<Link className="ml-2 px-4 py-2 bg-white rounded-md hover:bg-gray-100 border text-sm font-medium" href={`/dashboard`}>
                    <NavigationMenuList>Dashboard</NavigationMenuList>
                  </Link>)}
              </NavigationMenu>
            </div>
          </div>

          <div className="flex gap-2 justify-end items-center">
            <Link href={`/cart`} className="transition mr-2 px-2 py-1 bg-white rounded-md hover:bg-gray-100 border-2 text-sm font-bold border-gray-500 hover:border-gray-700">
              <Image src={`/cart.png`} alt="cart-logo" width={24} height={24} />
            </Link>
            {userData ? <LogoutUser /> :
              <>
                <Button size="sm" render={<a href={auth.signup.url} />} nativeButton={false}>{auth.signup.title}</Button>
                <Button variant="outline" size="sm" render={<a href={auth.login.url} />} nativeButton={false}>{auth.login.title}</Button>
              </>
            }

            <div>
              <Link href={userData ? `/profile` : '/'}>
                <Image className="rounded-full h-10 w-10"
                  src={userData?.image || 'https://img.icons8.com/?size=100&id=z-JBA_KtSkxG&format=png&color=000000'}
                  alt={userData?.name || 'Guest'}
                  width={40}
                  height={40}
                  title={userData?.name}
                  priority
                />
              </Link>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <Image
                width={32}
                height={32}
                priority
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              />
            </a>
            <div className="flex gap-4">

              <Link href={`/cart`} className="border-slate-800 border-2 shadow-md rounded-md p-1">
                <Image src={`/cart.png`} alt="cart-logo" width={24} height={24} />
              </Link>

              <Sheet>
                <SheetTrigger render={<Button variant="outline" size="icon" />}><Menu className="size-4" /></SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className='flex gap-2'>
                      <div className="flex gap-2 font-bold items-center">
                        <Link href={userData ? `/profile` : '/'}>
                          <Image className="rounded-full h-10 w-10"
                            src={userData?.image || 'https://img.icons8.com/?size=100&id=z-JBA_KtSkxG&format=png&color=000000'}
                            alt={userData?.name || 'Guest'}
                            width={40}
                            height={40}
                            title={`Click here to update your profile`}
                            priority
                          />
                        </Link>
                        <h1>{userData?.name ? `Hello, ${userData?.name}.` : 'Guest.'}</h1>
                      </div>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 p-4">
                    <Accordion
                      className="flex w-full flex-col gap-4"
                    >
                      {menu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>
                    <div className="flex flex-col gap-3">
                      {userData ? <LogoutUser /> :
                        <>
                          <Button variant="outline" render={<a href={auth.login.url} />} nativeButton={false}>{auth.login.title}</Button>
                          <Button render={<a href={auth.signup.url} />} nativeButton={false}>{auth.signup.title}</Button>
                        </>
                      }
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground border"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};


export { Navbar1 };
