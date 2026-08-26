import { PortfolioApp } from "../PortfolioApp";
import type { Metadata } from "next";

export async function generateMetadata({params}:{params:Promise<{section:string}>}):Promise<Metadata>{
  const {section}=await params;
  if(section!=="filterverse")return {};
  const title="FilterVerse · Image Processing Filter Laboratory";
  const description="Explore image processing with local image upload, live filters, visual comparisons, editable kernels, Fourier spectra, and interactive lessons.";
  return {title,description,openGraph:{title,description,url:"/filterverse",images:[]},twitter:{card:"summary",title,description,images:[]}};
}

export function generateStaticParams() {
  return [
    "blog",
    "publications",
    "projects",
    "sorting-visualizer",
    "vision-pen",
    "filterverse",
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
