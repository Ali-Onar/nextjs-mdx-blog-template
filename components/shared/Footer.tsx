import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const socialIcons = [
    { name: "GitHub", href: "https://github.com/Ali-Onar", icon: Github },
    { name: "Twitter", href: "https://x.com/alionar60", icon: Twitter },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/ali-tunacan-onar",
      icon: Linkedin,
    },
  ];

  return (
    <footer className="bg-background border-t mt-4">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex space-x-4">
            {socialIcons.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <item.icon className="h-6 w-6" />
                <span className="sr-only">{item.name}</span>
              </a>
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              AliBlog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
