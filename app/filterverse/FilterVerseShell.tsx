"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Aperture,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  FlaskConical,
  Sigma,
  Sparkles,
} from "lucide-react";
import { unitLessons, workspaceMenus, type UnitLesson } from "./unit1-content";
import "./filterverse-shell.css";

const workspaceCopy: Record<(typeof workspaceMenus)[number][0], string> = {
  upload: "Bring an image into Filter Verse and prepare it for future experiments.",
  explorer: "A home for browsing filters by purpose, behavior and visual effect.",
  "live-lab": "The interactive processing canvas will live here when you define its controls.",
  compare: "A dedicated view for comparing original and processed images side by side.",
  "mind-map": "A visual map connecting acquisition, representation, enhancement and interpretation.",
  mathematics: "A focused reference for formulas, symbols and derivations used across the lessons.",
  numerical: "A workspace for solving histogram, transform and kernel calculations step by step.",
  "custom-kernel": "A future editor for constructing and testing neighborhood masks.",
  pipeline: "A future builder for arranging image-processing operations in sequence.",
  analysis: "A future inspection panel for dimensions, channels, data types and image statistics.",
  learning: "The Unit 1 lesson collection is now available above; quizzes and practice can be added here next.",
};

type ActiveId = UnitLesson["id"] | (typeof workspaceMenus)[number][0];

function LessonView({
  lesson,
  onNext,
  nextLabel,
}: {
  lesson: UnitLesson;
  onNext?: () => void;
  nextLabel?: string;
}) {
  return (
    <article className="fv-lesson">
      <header className="fv-lesson-hero">
        <div className="fv-lesson-meta">
          <span><BookOpen size={15} aria-hidden="true" /> {lesson.eyebrow}</span>
          <span>Source coverage · slides {lesson.slides}</span>
        </div>
        <h1>{lesson.title}</h1>
        <p>{lesson.intro}</p>
      </header>

      <section className="fv-concept-grid" aria-label={`${lesson.label} key concepts`}>
        {lesson.concepts.map((concept) => (
          <article className="fv-concept-card" key={concept.title}>
            {concept.tag && <span>{concept.tag}</span>}
            <h2>{concept.title}</h2>
            <p>{concept.text}</p>
          </article>
        ))}
      </section>

      {lesson.formulas && (
        <section className="fv-content-block fv-formula-section" aria-labelledby={`${lesson.id}-formula-title`}>
          <div className="fv-section-heading">
            <span className="fv-section-icon"><Sigma size={19} aria-hidden="true" /></span>
            <div>
              <small>Keep the model precise</small>
              <h2 id={`${lesson.id}-formula-title`}>Core formulas</h2>
            </div>
          </div>
          <div className="fv-formula-grid">
            {lesson.formulas.map((formula) => (
              <article className="fv-formula-card" key={formula.label}>
                <strong>{formula.label}</strong>
                <code>{formula.expression}</code>
                <p>{formula.note}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {lesson.steps && (
        <section className="fv-content-block" aria-labelledby={`${lesson.id}-steps-title`}>
          <div className="fv-section-heading">
            <span className="fv-section-icon"><Sparkles size={19} aria-hidden="true" /></span>
            <div>
              <small>Follow the logic</small>
              <h2 id={`${lesson.id}-steps-title`}>Process</h2>
            </div>
          </div>
          <ol className="fv-process-list">
            {lesson.steps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {lesson.table && (
        <section className="fv-content-block" aria-labelledby={`${lesson.id}-table-title`}>
          <div className="fv-section-heading">
            <span className="fv-section-icon"><FlaskConical size={19} aria-hidden="true" /></span>
            <div>
              <small>See the numbers</small>
              <h2 id={`${lesson.id}-table-title`}>Worked example</h2>
            </div>
          </div>
          <div className="fv-table-wrap">
            <table>
              <caption>{lesson.table.caption}</caption>
              <thead>
                <tr>{lesson.table.headers.map((header) => <th key={header} scope="col">{header}</th>)}</tr>
              </thead>
              <tbody>
                {lesson.table.rows.map((row, rowIndex) => (
                  <tr key={`${lesson.id}-row-${rowIndex}`}>
                    {row.map((cell, cellIndex) => cellIndex === 0
                      ? <th key={cell} scope="row">{cell}</th>
                      : <td key={`${cell}-${cellIndex}`}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="fv-takeaway" aria-labelledby={`${lesson.id}-takeaways-title`}>
        <div>
          <small>Before you continue</small>
          <h2 id={`${lesson.id}-takeaways-title`}>Remember these ideas</h2>
        </div>
        <ul>
          {lesson.takeaways.map((takeaway) => (
            <li key={takeaway}><Check size={17} aria-hidden="true" /> <span>{takeaway}</span></li>
          ))}
        </ul>
      </section>

      {onNext && nextLabel && (
        <button className="fv-next-lesson" type="button" onClick={onNext}>
          <span>
            <small>Continue learning</small>
            <strong>{nextLabel}</strong>
          </span>
          <ArrowRight size={21} aria-hidden="true" />
        </button>
      )}
    </article>
  );
}

export function FilterVerseShell() {
  const [activeId, setActiveId] = useState<ActiveId>("overview");
  const activeLesson = unitLessons.find((lesson) => lesson.id === activeId);
  const activeWorkspace = workspaceMenus.find(([id]) => id === activeId);
  const lessonIndex = activeLesson ? unitLessons.findIndex((lesson) => lesson.id === activeLesson.id) : -1;
  const nextLesson = lessonIndex >= 0 ? unitLessons[lessonIndex + 1] : undefined;

  const selectSection = (id: string) => {
    setActiveId(id as ActiveId);
    window.requestAnimationFrame(() => {
      document.querySelector(".filter-verse-stage")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <section className="filter-verse-shell" aria-label="Filter Verse image processing learning workspace">
      <header className="filter-verse-header">
        <Link className="filter-verse-brand" href="/filterverse" aria-label="Filter Verse home">
          <span className="filter-verse-mark" aria-hidden="true"><Aperture size={25} /></span>
          <span>
            <strong>Filter Verse</strong>
            <small>Computer Vision Learning Studio</small>
          </span>
        </Link>
        <div className="filter-verse-status">
          <span>Unit 1</span>
          <strong>217 slides distilled</strong>
        </div>
      </header>

      <div className="filter-verse-mobile-menu">
        <label htmlFor="filter-verse-topic">Explore Filter Verse</label>
        <select id="filter-verse-topic" value={activeId} onChange={(event) => selectSection(event.target.value)}>
          <optgroup label="Unit 1 lessons">
            {unitLessons.map((lesson) => <option key={lesson.id} value={lesson.id}>{lesson.label}</option>)}
          </optgroup>
          <optgroup label="Workspace">
            {workspaceMenus.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
          </optgroup>
        </select>
      </div>

      <div className="filter-verse-layout">
        <nav className="filter-verse-nav" aria-label="Filter Verse sections">
          <div className="filter-verse-nav-group">
            <p>Unit 1 lessons</p>
            <div className="filter-verse-nav-list">
              {unitLessons.map((lesson, index) => (
                <button
                  key={lesson.id}
                  type="button"
                  className={activeId === lesson.id ? "active" : ""}
                  aria-current={activeId === lesson.id ? "page" : undefined}
                  onClick={() => setActiveId(lesson.id)}
                >
                  <span className="filter-verse-menu-number">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <strong>{lesson.label}</strong>
                    <small>{lesson.nav}</small>
                  </span>
                  <ChevronRight size={15} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          <div className="filter-verse-nav-group fv-workspace-nav">
            <p>Workspace · kept for your next update</p>
            <div className="filter-verse-nav-list">
              {workspaceMenus.map(([id, label, description], index) => (
                <button
                  key={id}
                  type="button"
                  className={activeId === id ? "active" : ""}
                  aria-current={activeId === id ? "page" : undefined}
                  onClick={() => setActiveId(id)}
                >
                  <span className="filter-verse-menu-number">W{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <strong>{label}</strong>
                    <small>{description}</small>
                  </span>
                  <ChevronRight size={15} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </nav>

        <main className="filter-verse-stage" aria-live="polite">
          {activeLesson ? (
            <LessonView
              lesson={activeLesson}
              nextLabel={nextLesson?.label}
              onNext={nextLesson ? () => selectSection(nextLesson.id) : undefined}
            />
          ) : activeWorkspace ? (
            <section className="fv-workspace-stage">
              <span className="filter-verse-kicker">Filter Verse / Workspace</span>
              <div className="fv-workspace-icon"><FlaskConical size={31} aria-hidden="true" /></div>
              <h1>{activeWorkspace[1]}</h1>
              <p>{workspaceCopy[activeWorkspace[0]]}</p>
              <div className="filter-verse-placeholder">
                <span aria-hidden="true">W{String(workspaceMenus.findIndex(([id]) => id === activeId) + 1).padStart(2, "0")}</span>
                <div>
                  <strong>Menu retained and ready</strong>
                  <small>This workspace has been kept for your next instruction.</small>
                </div>
              </div>
            </section>
          ) : null}
        </main>
      </div>
    </section>
  );
}
