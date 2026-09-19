import type { Metadata } from "next";
import { PortfolioApp } from "../../PortfolioApp";

export const metadata: Metadata = {
  title: "Data Structures and Algorithms | MSP Tutorial",
  description:
    "Syllabus, unit materials, question papers, and sample questions for Data Structures and Algorithms.",
};

export default function DataStructuresAndAlgorithmsPage() {
  return <PortfolioApp section="data-structures-and-algorithms" />;
}
