export type Project = {
  number: string;
  name: string;
  category: string;
  description: string;
  href: string;
  drawing: "sora" | "image" | "gpts";
};

export const projects: Project[] = [
  {
    number: "01",
    name: "Sora",
    category: "VIDEO & AUDIO",
    description: "Sora 1 & 2. Video, sound, and a new way into the story.",
    href: "https://openai.com/index/sora-2/",
    drawing: "sora",
  },
  {
    number: "02",
    name: "Image generation",
    category: "CREATIVE TOOLS",
    description: "Making and editing images in ChatGPT.",
    href: "https://openai.com/index/introducing-4o-image-generation/",
    drawing: "image",
  },
  {
    number: "03",
    name: "Custom GPTs",
    category: "PLATFORM",
    description:
      "Little versions of ChatGPT, made for your corner of the world.",
    href: "https://openai.com/index/introducing-gpts/",
    drawing: "gpts",
  },
];

export const experiments = [
  {
    name: "next-genai-streaming",
    description: "React helpers for streaming text and audio.",
    tag: "DEVELOPER TOOLS",
    href: "https://github.com/kumquatexpress/next-genai-streaming",
  },
  {
    name: "WordSmith",
    description: "A word game built in Unity. An early experiment in play.",
    tag: "GAMES",
    href: "https://github.com/kumquatexpress/WordSmith",
  },
  {
    name: "Clairvoyance",
    description: "Finding patterns in League of Legends team compositions.",
    tag: "DATA & PLAY",
    href: "https://github.com/kumquatexpress/clairvoyance-app",
  },
];

export const writings = [
  {
    name: "On Large Things",
    topic: "Scale, perspective, and looking up.",
    date: "MAY 2020",
    href: "https://medium.com/@boyangniu/on-large-things-a1a60930bd7",
  },
  {
    name: "On Walking, Accompanied",
    topic: "A walk with a classical soundtrack.",
    date: "MAY 2020",
    href: "https://medium.com/@boyangniu/on-walking-accompanied-47c3d46a0c95",
  },
];
