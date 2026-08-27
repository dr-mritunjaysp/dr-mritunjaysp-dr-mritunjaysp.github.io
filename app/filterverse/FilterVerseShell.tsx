"use client";

import Link from "next/link";
import { Aperture, ChevronRight } from "lucide-react";
import { menuItems } from "./menu-structure";
import "./filterverse-shell.css";

export function FilterVerseShell() {
  const activeItem = menuItems[0];

  return (
    <section className="filter-verse-shell" aria-label="Computer Vision workspace">
      <header className="filter-verse-header">
        <Link className="filter-verse-brand" href="/filterverse" aria-label="Computer Vision home">
          <span className="filter-verse-mark" aria-hidden="true"><Aperture size={25} /></span>
          <span>
            <strong>Computer&nbsp;Vision</strong>
            <small>Image Processing Workspace</small>
          </span>
        </Link>
      </header>

      <div className="filter-verse-layout">
        <nav className="filter-verse-nav" aria-label="Computer Vision sections">
          <div className="filter-verse-nav-group">
            <p>Menu</p>
            <div className="filter-verse-nav-list">
              <button type="button" className="active" aria-current="page">
                <span className="filter-verse-menu-number">01</span>
                <span>
                  <strong>{activeItem[1]}</strong>
                  <small>{activeItem[2]}</small>
                </span>
                <ChevronRight size={15} aria-hidden="true" />
              </button>
            </div>
          </div>
        </nav>

        <main className="filter-verse-stage">
          <section className="fv-empty-stage">
            <span className="filter-verse-kicker">Filter Verse / Menu 01</span>
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
