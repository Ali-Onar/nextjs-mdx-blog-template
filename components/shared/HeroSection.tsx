// HeroSection.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

function HeroSection() {
  return (
    <section className="shadow-md bg-background py-12 md:py-24 lg:py-40 border-b rounded-xl">
      <div className="flex flex-col gap-4 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
          Hello, I&apos;m Ali Onar
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Welcome to my blog template. Built using Next.js 14, MDX, Tailwind
          CSS, and ShadCN.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/blog">View my Blog</Link>
            </Button>
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <a
                href="https://github.com/Ali-Onar"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
