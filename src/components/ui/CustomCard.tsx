// components/CustomCard.tsx
import { LucideIcon, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
import Link from "next/link";

type Theme = "blue" | "purple";

interface Props {
  href: string; // The link destination
  theme: Theme; // The theme styling
  icon: LucideIcon; // The icon to display
  title: string; // Card title
  description: string; // Card description
  linkText?: string; // Text for the link (optional)
  buttonText?: string; // Text for the button (optional)
  fullWidth?: boolean;
}

export default function CustomCard({
  href,
  theme,
  icon: Icon,
  title,
  description,
  linkText,
  buttonText,
  fullWidth,
}: Props) {
  const themes = {
    blue: {
      iconColor: "text-blue-500",
      bgColor: "bg-background/50",
      shadowColor: "hover:shadow-blue-500",
      buttonColor: "bg-blue-500 hover:bg-blue-600",
    },
    purple: {
      iconColor: "text-purple-500",
      bgColor: "bg-background/50",
      shadowColor: "hover:shadow-purple-500",
      buttonColor: "bg-purple-500 hover:bg-purple-600",
    },
  };

  const { iconColor, bgColor, shadowColor, buttonColor } = themes[theme];

  return (
    <Link
      href={href}
      className={`block group ${fullWidth ? "w-full col-span-full" : ""}`}
    >
      <Card
        className={`h-full border-muted/50 ${bgColor} backdrop-blur-sm hover:${bgColor}/80 transition-all hover:shadow-lg ${shadowColor} flex flex-col items-center text-center ${
          fullWidth ? "w-full col-span-full" : ""
        }`}
      >
        <CardHeader className="space-y-4">
          <div
            className={`size-12 rounded-full ${iconColor}/10 flex items-center justify-center mx-auto`}
          >
            <Icon className={`size-6 ${iconColor}`} />
          </div>
          <CardTitle className="text-2xl font-bold group-hover:text-blue-400 transition-colors">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col items-center">
          <p className="text-muted-foreground/80 mb-6 leading-relaxed max-w-md">
            {description}
          </p>
          {linkText && (
            <div className="flex items-center text-blue-400 font-semibold">
              {linkText}
              <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
          
        </CardContent>
      </Card>
    </Link>
  );
}
