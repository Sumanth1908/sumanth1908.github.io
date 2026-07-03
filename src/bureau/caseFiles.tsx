import type { ReactNode } from 'react';
import { Bullets, Field, Gauge, TechStamps } from './paperParts';
import {
  contactInfo,
  experiences,
  projects,
  skills,
  education,
  awards,
  type Experience,
  type ProjectEntry,
} from '../data/resume';

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

export interface PageSpec {
  form: string;
  title: string;
  /** Body may need the jump() navigator (e.g. index pages). */
  body: ReactNode | ((jump: (page: number) => void) => ReactNode);
}

export interface FolderSpec {
  id: string;
  tab: string;
  /** Shorter label for the hanger tab in the drawer (falls back to `tab`). */
  tabShort?: string;
  tabSub?: string;
  memo: ReactNode;
  pages: PageSpec[];
}

const shortCompany = (company: string) => (company === 'Electronic Arts' ? 'EA' : company);

export interface ArchiveLink {
  key: string;
  label: string;
  sub: string;
  path: string;
}

export interface DrawerSpec {
  id: string;
  code: string;
  label: string;
  sub: string;
  folders: FolderSpec[];
  /** Archive drawers navigate to prior editions of the site instead of opening a dossier. */
  links?: ArchiveLink[];
}

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

const monogram = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

const period = (start: string, end: string, current: boolean) =>
  `${start} — ${current ? 'Present' : end}`;

/* ------------------------------------------------------------------ */
/* Drawer 01 — FIELD RECORDS (experience)                               */
/* ------------------------------------------------------------------ */

function experienceFolder(exp: Experience): FolderSpec {
  const logPages = chunk(exp.responsibilities, 3);
  return {
    id: `exp-${monogram(exp.company)}`,
    tab: exp.company,
    tabShort: shortCompany(exp.company),
    tabSub: exp.position,
    memo: (
      <>
        <div className="memo-monogram">{monogram(exp.company)}</div>
        <div className="memo-title">{exp.company}</div>
        <div className="memo-lines">
          <Field k="POST" v={exp.position} />
          <Field k="STATION" v={exp.location} />
          <Field k="PERIOD" v={period(exp.startDate, exp.endDate, exp.current)} />
        </div>
        <div className={`stamp ${exp.current ? 'stamp-red' : 'stamp-blue'} memo-stamp`}>
          {exp.current ? 'ACTIVE DUTY' : 'TERM SERVED'}
        </div>
      </>
    ),
    pages: [
      {
        form: 'FORM 27-A · ASSIGNMENT BRIEF',
        title: exp.position,
        body: (
          <>
            <Field k="EMPLOYER" v={exp.company} />
            <Field k="STATION" v={exp.location} />
            <Field k="PERIOD" v={period(exp.startDate, exp.endDate, exp.current)} />
            <p className="pp-body">{exp.description}</p>
          </>
        ),
      },
      ...logPages.map((items, i) => ({
        form: `FORM 27-B · DUTY LOG — SHEET ${i + 1}`,
        title: 'Recorded Contributions',
        body: <Bullets items={items} />,
      })),
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Drawer 02 — OPERATIONS (projects, foldered by employer)              */
/* ------------------------------------------------------------------ */

function projectPages(p: ProjectEntry): PageSpec[] {
  const contribPages = chunk(p.responsibilities, 2);
  return [
    {
      form: 'FORM 51-A · OPERATION SUMMARY',
      title: p.title,
      body: (
        <>
          <p className="pp-subtitle">{p.subtitle}</p>
          <p className="pp-body">{p.description}</p>
          <Field k="EQUIPMENT" v={<TechStamps tech={p.technologies} />} />
        </>
      ),
    },
    ...contribPages.map((items, i) => ({
      form: `FORM 51-B · FIELD NOTES — SHEET ${i + 1}`,
      title: `${p.title} — Role`,
      body: <Bullets items={items} />,
    })),
  ];
}

function operationsFolder(company: string): FolderSpec {
  const ops = projects.filter((p) => p.company === company);
  const pages: PageSpec[] = [];
  const indexEntries: { title: string; sub: string; page: number }[] = [];

  for (const p of ops) {
    indexEntries.push({ title: p.title, sub: p.subtitle, page: pages.length + 2 });
    pages.push(...projectPages(p));
  }

  const indexPage: PageSpec = {
    form: 'FORM 50 · INDEX OF OPERATIONS',
    title: `${company} — Operations`,
    body: (jump) => (
      <ol className="pp-index">
        {indexEntries.map((e) => (
          <li key={e.title}>
            <button type="button" className="pp-index-link" onClick={() => jump(e.page - 1)}>
              <span className="pp-index-title">{e.title}</span>
              <span className="pp-index-dots" aria-hidden="true" />
              <span className="pp-index-page">p.{e.page}</span>
            </button>
          </li>
        ))}
      </ol>
    ),
  };

  return {
    id: `ops-${monogram(company)}`,
    tab: company,
    tabShort: shortCompany(company),
    tabSub: `${ops.length} operation${ops.length > 1 ? 's' : ''}`,
    memo: (
      <>
        <div className="memo-monogram">{monogram(company)}</div>
        <div className="memo-title">{company}</div>
        <div className="memo-lines">
          <Field k="DIVISION" v="Operations" />
          <Field k="DOSSIERS" v={String(ops.length)} />
          <Field k="SHEETS" v={String(pages.length + 1)} />
        </div>
        <div className="stamp stamp-blue memo-stamp">FILED</div>
      </>
    ),
    pages: [indexPage, ...pages],
  };
}

/* ------------------------------------------------------------------ */
/* Drawer 03 — APTITUDE (skills)                                        */
/* ------------------------------------------------------------------ */

const aptitudeFolder: FolderSpec = {
  id: 'aptitude',
  tab: 'Evaluation',
  tabSub: 'skills assessment',
  memo: (
    <>
      <div className="memo-monogram">SJ</div>
      <div className="memo-title">Aptitude Report</div>
      <div className="memo-lines">
        <Field k="SUBJECT" v={contactInfo.name} />
        <Field k="SERVICE" v="10+ years" />
        <Field k="EXAMINER" v="Bureau HR-7" />
      </div>
      <div className="stamp stamp-blue memo-stamp">EVALUATED</div>
    </>
  ),
  pages: [
    {
      form: 'FORM 88-K · APTITUDE EVALUATION',
      title: 'Technical Proficiency',
      body: (
        <div className="gauge-list">
          {skills
            .filter((s) => s.category === 'technical')
            .map((s) => (
              <Gauge key={s.name} name={s.name} level={s.level} />
            ))}
        </div>
      ),
    },
    {
      form: 'FORM 88-K · APTITUDE EVALUATION — CONT.',
      title: 'Additional Competencies',
      body: (
        <>
          <div className="gauge-list">
            {skills
              .filter((s) => s.category === 'additional')
              .map((s) => (
                <Gauge key={s.name} name={s.name} level={s.level} />
              ))}
          </div>
          <p className="pp-remarks">
            <span className="pp-remarks-label">Examiner’s remarks —</span> Results-oriented engineer;
            builds intelligent, AI-driven systems with a focus on performance, reliability and scale.
            Strong advocate of continuous learning, currently concentrated on Agentic AI and
            data-driven architectures. Recommend without reservation.
          </p>
        </>
      ),
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Drawer 04 — TRAINING (education + commendations)                     */
/* ------------------------------------------------------------------ */

const edu = education[0];

const trainingFolder: FolderSpec = {
  id: 'training',
  tab: 'Academy Record',
  tabSub: 'education',
  memo: (
    <>
      <div className="memo-monogram">{monogram(edu.institution)}</div>
      <div className="memo-title">{edu.institution}</div>
      <div className="memo-lines">
        <Field k="STATION" v={edu.location} />
        <Field k="PERIOD" v={`${edu.startDate} — ${edu.endDate}`} />
      </div>
      <div className="stamp stamp-blue memo-stamp">COMMENDED</div>
    </>
  ),
  pages: [
    {
      form: 'FORM 12 · TRAINING RECORD',
      title: 'Bachelor of Engineering',
      body: (
        <>
          <Field k="INSTITUTE" v={edu.institution} />
          <Field k="DISCIPLINE" v="Electronics & Communications Engineering" />
          <Field k="STATION" v={edu.location} />
          <Field k="PERIOD" v={`${edu.startDate} — ${edu.endDate}`} />
          <p className="pp-body">{edu.description}</p>
        </>
      ),
    },
    {
      form: 'FORM 12-C · COMMENDATIONS',
      title: 'Honors & Citations',
      body: (
        <div className="pp-commendations">
          {awards.map((a) => (
            <div className="commendation" key={a.title}>
              <div className="commendation-head">
                <span className="commendation-medal" aria-hidden="true">
                  ★
                </span>
                <span className="commendation-title">{a.title}</span>
                <span className="commendation-date">
                  {a.issuer}, {a.date}
                </span>
              </div>
              <p className="pp-body">{a.description}</p>
            </div>
          ))}
        </div>
      ),
    },
  ],
};

/* ------------------------------------------------------------------ */
/* The cabinet                                                          */
/* ------------------------------------------------------------------ */

export const drawers: DrawerSpec[] = [
  {
    id: 'field-records',
    code: '01',
    label: 'Field Records',
    sub: 'employment history',
    folders: experiences.map(experienceFolder),
  },
  {
    id: 'operations',
    code: '02',
    label: 'Operations',
    sub: 'projects & builds',
    folders: ['Electronic Arts', 'Amazon', 'Teradata'].map(operationsFolder),
  },
  {
    id: 'aptitude',
    code: '03',
    label: 'Aptitude',
    sub: 'skills assessment',
    folders: [aptitudeFolder],
  },
  {
    id: 'training',
    code: '04',
    label: 'Training',
    sub: 'education & honors',
    folders: [trainingFolder],
  },
  {
    id: 'archive',
    code: '05',
    label: 'Archive',
    sub: 'prior editions',
    folders: [],
    links: [
      { key: 'console', label: 'Console Edition', sub: 'ops dashboard — click to load', path: '/console' },
      { key: 'radio', label: 'Radio Edition', sub: 'shortwave set — click to load', path: '/radio' },
      { key: 'cosmic', label: 'Cosmic Edition', sub: '2025 site — click to load', path: '/legacy' },
    ],
  },
];
