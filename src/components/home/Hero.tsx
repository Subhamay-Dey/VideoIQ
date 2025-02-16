// import React from "react";
// import { Button } from "../ui/button";

// export default function HeroSection() {
//   return (
//     <header className="  py-24 text-center">
//       <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
//         Summarize Any Podcast Instantly
//       </h1>
//       <p className="text-xl">
//         Use AI to get concise summaries and top questions from your favorite
//         podcasts.
//       </p>
//       <div className="mt-2">
//         <Button className="mt-4 w-40">Try it Now</Button>
//       </div>
//     </header>
//   );
// }

"use client"

import { HeroSection } from "../ui/hero-section"
import { Icons } from "@/components/ui/icons"

export function Hero() {
  return (
    <HeroSection
      badge={{
        text: "Introducing our new components",
        action: {
          text: "Learn more",
          href: "/docs",
        },
      }}
      title="Build faster with beautiful components"
      description="Premium UI components built with React and Tailwind CSS. Save time and ship your next project faster with our ready-to-use components."
      actions={[
        {
          text: "Get Started",
          href: "/docs/getting-started",
          variant: "default",
        },
        {
          text: "GitHub",
          href: "https://github.com/your-repo",
          variant: "glow",
          icon: <Icons.gitHub className="h-5 w-5" />,
        },
      ]}
      image={{
        light: "https://www.launchuicomponents.com/app-light.png",
        dark: "https://www.launchuicomponents.com/app-dark.png",
        alt: "UI Components Preview",
      }}
    />
  )
}
