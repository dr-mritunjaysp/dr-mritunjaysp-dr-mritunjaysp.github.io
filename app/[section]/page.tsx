import { PortfolioApp } from "../PortfolioApp";

export function generateMetadata({ params }: { params: Promise<{ section: string }> }) {
  return params.then(({ section }) => {
    if (section === "filterverse") {
      return {
        title: "Computer Vision · Image Processing Workspace",
        description: "A responsive Computer Vision workspace ready for new tools and learning experiences.",
      };
    }
    if (section === "finger-counter") {
      return {
        title: "Finger Counter · Animated Hand Tracking",
        description: "Raise fingers on camera and see the total appear as a full-screen animated number using private, on-device hand tracking.",
      };
    }
    return {};
  });
}

export function generateStaticParams() {
  return [
    "blog",
    "publications",
    "projects",
    "sorting-visualizer",
    "vision-pen",
    "filterverse",
    "finger-counter",
    "inkora",
    "pen-app",
    "penapp",
    "msp-live-frame",
    "mspliveframe",
    "mriframe",
    "finger-frame",
    "cv",
    "teaching",
    "people",
    "news",
    "award-fdp",
    "game",
    "daily-mantra",
    "bhagwatgita",
    "ramayan",
    "quantum-computation",
    "blockchain",
    "poems",
    "motivations",
    "repositories",
    "books",
    "profiles",
  ].map((section) => ({ section }));
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  return <PortfolioApp section={section} />;
}
