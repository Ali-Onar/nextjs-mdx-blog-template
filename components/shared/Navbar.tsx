"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Github, Twitter, Linkedin, BookOpen, Menu, Rss } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const socialIcons = [
    { name: "GitHub", href: "https://github.com/Ali-Onar", icon: Github },
    { name: "Twitter", href: "https://x.com/alionar60", icon: Twitter },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/ali-tunacan-onar", icon: Linkedin },
  ];

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="ml-1 text-lg font-semibold">AliBlog</span>
            </Link>
            <Link
              href="/blog"
              className="text-md hidden md:flex font-medium text-muted-foreground hover:text-primary"
            >
              Blog
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {socialIcons.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.name}</span>
              </a>
            ))}
          </div>
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <span className="sr-only">
                    <SheetTitle>Navigation Menu</SheetTitle>
                  </span>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-4">
                  <Link
                    href="/"
                    className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BookOpen className="h-5 w-5 mr-2" />
                    Home
                  </Link>
                  <Link
                    href="/blog"
                    className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Rss className="h-5 w-5 mr-2" />
                    Blog
                  </Link>
                  {socialIcons.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <item.icon className="h-5 w-5 mr-2" />
                      {item.name}
                    </a>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
