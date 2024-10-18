export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Quizzes",
      href: "/quizzes",
    },
    {
      label: "Categories",
      href: "/categories",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Quizzes",
      href: "/Quizzes",
    },
    {
      label: "Categories",
      href: "/categories",
    },
  ],
  links: {
    quiz: "/quizzes",
    github: "https://github.com/nextui-org/nextui",
    discord: "https://discord.gg/M3zq6VUj",
    sponsor: "https://generatiatech.ro/",
  },
};
