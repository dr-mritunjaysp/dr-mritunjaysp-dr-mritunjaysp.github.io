"use client";

import { useState } from "react";
import Link from "next/link";
import { Aperture, ChevronRight } from "lucide-react";
import { topicMenus, workspaceMenus } from "./menu-structure";
import "./filterverse-shell.css";

type ActiveId = (typeof topicMenus)[number][0] | (typeof workspaceMenus)[number][0];

export function FilterVerseShell() {
  const [activeId, setActiveId] = useState<ActiveId>("overview");
  const allMenus = [...topicMenus, ...workspaceMenus];
  const activeItem = allMenus.find(([id]) => id === activeId) ?? topicMenus[0];
  const activeIndex = allMenus.findIndex(([id]) => id === activeId) + 1;

  const selectSection = (id: string) => {
    setActiveId(id as ActiveId);
    window.requestAnimationFrame(() => {
      document.querySelector(".filter-verse-stage")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <section className="filter-verse-shell" aria-label="Filter Verse workspace">
      <header className="filter-verse-header">
        <Link className="filter-verse-brand" href="/filterverse" aria-label="Filter Verse home">
          <span className="filter-verse-mark" aria-hidden="true"><Aperture size={25} /></span>
          <span>
            <strong>Filter Verse</strong>
            <small>Image Processing Workspace</small>
          </span>
        </Link>
      </header>

      <div className="filter-verse-mobile-menu">
        <label htmlFor="filter-verse-topic">Explore Filter Verse</label>
        <select id="filter-verse-topic" value={activeId} onChange={(event) => selectSection(event.target.value)}>
          <optgroup label="Computer Vision menus">
            {topicMenus.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
          </optgroup>
          <optgroup label="Workspace menus">
            {workspaceMenus.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
          </optgroup>
        </select>
      </div>

      <div className="filter-verse-layout">
        <nav className="filter-verse-nav" aria-label="Filter Verse sections">
          <MenuGroup
            title="Computer Vision menus"
            items={topicMenus}
            activeId={activeId}
            prefix=""
            onSelect={(id) => setActiveId(id as ActiveId)}
          />
          <MenuGroup
            title="Workspace menus"
            items={workspaceMenus}
            activeId={activeId}
            prefix="W"
            onSelect={(id) => setActiveId(id as ActiveId)}
          />
        </nav>

        <main className="filter-verse-stage" aria-live="polite">
          <section className="fv-empty-stage">
            <span className="filter-verse-kicker">Filter Verse / Menu {String(activeIndex).padStart(2, "0")}</span>
            <div className="fv-empty-orbit" aria-hidden="true">
              <span />
              <i />
            </div>
            <h1>{activeItem[1]}</h1>
            <p>This menu is kept ready for your next instruction.</p>
            <span className="fv-empty-status"><i aria-hidden="true" /> No content added</span>
          </section>
        </main>
      </div>
    </section>
  );
}

function MenuGroup({
  title,
  items,
  activeId,
  prefix,
  onSelect,
}: {
  title: string;
  items: ReadonlyArray<readonly [string, string, string]>;
  activeId: string;
  prefix: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="filter-verse-nav-group">
      <p>{title}</p>
      <div className="filter-verse-nav-list">
        {items.map(([id, label, description], index) => (
          <button
            key={id}
            type="button"
            className={activeId === id ? "active" : ""}
            aria-current={activeId === id ? "page" : undefined}
            onClick={() => onSelect(id)}
          >
            <span className="filter-verse-menu-number">{prefix}{String(index + 1).padStart(2, "0")}</span>
            <span>
              <strong>{label}</strong>
              <small>{description}</small>
            </span>
            <ChevronRight size={15} aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
}
