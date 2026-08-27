"use client";

import { useState } from "react";
import Link from "next/link";
import "./filterverse-shell.css";

const menuItems = [
  ["overview", "Overview", "Start here"],
  ["upload", "Image Upload", "Choose an image"],
  ["explorer", "Filter Explorer", "Browse filters"],
  ["live-lab", "Live Lab", "Interactive workspace"],
  ["compare", "Compare Filters", "Compare results"],
  ["mind-map", "Mind Map", "Explore concepts"],
  ["mathematics", "Mathematics", "Learn the theory"],
  ["numerical", "Numerical Lab", "Work through values"],
  ["custom-kernel", "Custom Kernel", "Design a kernel"],
  ["pipeline", "Pipeline", "Arrange processing steps"],
  ["analysis", "Image Analysis", "Inspect image data"],
  ["learning", "Learning Center", "Study and practice"],
] as const;

export function FilterVerseShell() {
  const [activeId, setActiveId] = useState<(typeof menuItems)[number][0]>("overview");
  const activeItem = menuItems.find(([id]) => id === activeId) ?? menuItems[0];

  return (
    <section className="filter-verse-shell" aria-label="Filter Verse workspace">
      <header className="filter-verse-header">
        <Link className="filter-verse-brand" href="/filterverse" aria-label="Filter Verse home">
          <span className="filter-verse-mark" aria-hidden="true">FV</span>
          <span>
            <strong>Filter Verse</strong>
            <small>Image Processing Workspace</small>
          </span>
        </Link>
        <span className="filter-verse-status">Menu structure ready</span>
      </header>

      <div className="filter-verse-layout">
        <nav className="filter-verse-nav" aria-label="Filter Verse sections">
          <p>Workspace</p>
          <div className="filter-verse-nav-list">
            {menuItems.map(([id, label, description], index) => (
              <button
                key={id}
                type="button"
                className={activeId === id ? "active" : ""}
                aria-current={activeId === id ? "page" : undefined}
                onClick={() => setActiveId(id)}
              >
                <span className="filter-verse-menu-number">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <strong>{label}</strong>
                  <small>{description}</small>
                </span>
              </button>
            ))}
          </div>
        </nav>

        <main className="filter-verse-stage" aria-live="polite">
          <span className="filter-verse-kicker">Filter Verse / {activeItem[1]}</span>
          <h1>{activeItem[1]}</h1>
          <p>
            This section is ready for your instructions. No filter tools or processing features have been added yet.
          </p>
          <div className="filter-verse-placeholder">
            <span aria-hidden="true">{String(menuItems.findIndex(([id]) => id === activeId) + 1).padStart(2, "0")}</span>
            <div>
              <strong>Ready to design</strong>
              <small>Tell me what you want to build in this menu.</small>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
