"use client";

import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  Code2,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  Mail,
  Menu,
  Moon,
  Search,
  Sparkles,
  Sun,
  UsersRound,
  X,
} from "lucide-react";
import {
  SiGooglescholar,
  SiGithub,
  SiOrcid,
  SiWhatsapp,
  SiYoutube,
} from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import { useEffect, useMemo, useState } from "react";

type SectionKey =
  | "home"
  | "blog"
  | "publications"
  | "projects"
  | "cv"
  | "teaching"
  | "people"
  | "news"
  | "award-fdp"
  | "repositories"
  | "books"
  | "profiles";

type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  citations: number;
  tags: string[];
  abstract: string;
  doi?: string;
};

const primaryNav = [
  { label: "Blog", href: "/blog", key: "blog" },
  { label: "Publications", href: "/publications", key: "publications" },
  { label: "Projects", href: "/projects", key: "projects" },
  { label: "CV", href: "/cv", key: "cv" },
  { label: "Teaching", href: "/teaching", key: "teaching" },
  { label: "People", href: "/people", key: "people" },
] as const;

const moreNav = [
  { label: "News", href: "/news", key: "news", icon: CalendarDays },
  { label: "Awards & FDP", href: "/award-fdp", key: "award-fdp", icon: Award },
  {
    label: "Repositories",
    href: "/repositories",
    key: "repositories",
    icon: SiGithub,
  },
  { label: "Books", href: "/books", key: "books", icon: BookOpen },
  { label: "Profiles", href: "/profiles", key: "profiles", icon: CircleUserRound },
] as const;

const publications: Publication[] = [
  {
    title: "Quantum computing applications for Internet of Things",
    authors: "Mritunjay Shall Peelam, Anjaney Asreet Rout, and Vinay Chamola",
    venue: "IET Quantum Communication",
    year: 2024,
    citations: 75,
    tags: ["Q2 Journal", "Scopus Indexed", "Impact Factor: 2.8"],
    doi: "https://doi.org/10.1049/qtc2.12079",
    abstract:
      "A broad study of how quantum computing can improve IoT speed, accuracy, network optimisation, sensing, and post-quantum security.",
  },
  {
    title:
      "QIoTChain: Quantum IoT-blockchain fusion for advanced data protection in Industry 4.0",
    authors:
      "Aditya Kumar Sharma, Mritunjay Shall Peelam, Brijesh Kumar Chaurasia, and Vinay Chamola",
    venue: "IET Blockchain",
    year: 2024,
    citations: 64,
    tags: ["Q2 Journal", "Scopus Indexed"],
    doi: "https://doi.org/10.1049/blc2.12059",
    abstract:
      "An analysis of quantum-IoT data protection combining post-quantum cryptography, distributed ledgers, and Industry 4.0 systems.",
  },
  {
    title:
      "A review on emergency vehicle management for intelligent transportation systems",
    authors:
      "Mritunjay Shall Peelam, Mehul Gera, Vinay Chamola, and Sherali Zeadally",
    venue: "IEEE Transactions on Intelligent Transportation Systems",
    year: 2024,
    citations: 55,
    tags: ["Q1 Journal", "SCIE Indexed", "Impact Factor: 8.4"],
    abstract:
      "A comprehensive review of emergency vehicle management, intelligent routing, communication, safety, and deployment challenges in smart cities.",
  },
  {
    title:
      "Metaverse for education: Developments, challenges, and future direction",
    authors:
      "Vinay Chamola, Mritunjay Shall Peelam, Uday Mittal, and collaborators",
    venue: "Computer Applications in Engineering Education",
    year: 2025,
    citations: 63,
    tags: ["Q1 Journal", "SCIE Indexed", "Impact Factor: 2.2"],
    abstract:
      "A structured review of immersive learning through AI, VR, AR, XR, IoT, and the Metaverse, including practical adoption challenges.",
  },
  {
    title:
      "Unlocking the potential of interconnected blockchains: A comprehensive study of Cosmos blockchain interoperability",
    authors:
      "Mritunjay Shall Peelam, Brijesh Kumar Chaurasia, Aditya Kumar Sharma, Vinay Chamola, and Biplab Sikdar",
    venue: "IEEE Access",
    year: 2024,
    citations: 47,
    tags: ["Q2 Journal", "SCIE Indexed", "Impact Factor: 3.6"],
    abstract:
      "A study of Cosmos, Tendermint, IBC, and secure cross-chain communication with an empirical view of network performance.",
  },
  {
    title:
      "Explorative implementation of quantum key distribution algorithms for secure consumer electronics networks",
    authors: "Mritunjay Shall Peelam, Siva Sai, and Vinay Chamola",
    venue: "IEEE Transactions on Consumer Electronics",
    year: 2024,
    citations: 38,
    tags: ["Q1 Journal", "SCIE Indexed", "Impact Factor: 10.9"],
    abstract:
      "An experimental exploration of quantum key distribution for stronger privacy and resilient key exchange in consumer electronics networks.",
  },
  {
    title:
      "Future of connectivity: A comprehensive review of innovations and challenges in 7G smart networks",
    authors:
      "Vinay Chamola, Mritunjay Shall Peelam, Mohsen Guizani, and Dusit Niyato",
    venue: "IEEE Open Journal of the Communications Society",
    year: 2025,
    citations: 47,
    tags: ["Q1 Journal", "ESCI Indexed", "Impact Factor: 6.1"],
    abstract:
      "A review of AI-native 7G connectivity, distributed intelligence, reinforcement learning, LLMs, and emerging edge applications.",
  },
  {
    title:
      "Enhancing security using quantum blockchain in consumer IoT networks",
    authors: "Mritunjay Shall Peelam, Vinay Chamola, and Biplab Sikdar",
    venue: "IEEE Transactions on Consumer Electronics",
    year: 2024,
    citations: 35,
    tags: ["Q1 Journal", "SCIE Indexed", "Impact Factor: 10.9"],
    abstract:
      "Quantum-resistant protocols and migration strategies for secure, scalable, and reliable blockchain-backed consumer IoT systems.",
  },
  {
    title:
      "DemocracyGuard: Blockchain-based secure voting framework for digital democracy",
    authors:
      "Mritunjay Shall Peelam, Gaurav Kumar, Kunjan Shah, and Vinay Chamola",
    venue: "Expert Systems",
    year: 2025,
    citations: 36,
    tags: ["Q2 Journal", "SCIE Indexed", "Impact Factor: 2.3"],
    abstract:
      "A decentralized online voting framework designed to strengthen transparency, verifiability, privacy, and election integrity.",
  },
  {
    title:
      "A comprehensive survey on data converters for IoT applications: Scope, issues and future directions",
    authors: "Mritunjay Shall Peelam and collaborators",
    venue: "International Journal of Circuit Theory and Applications",
    year: 2024,
    citations: 22,
    tags: ["Journal", "Scopus Indexed"],
    abstract:
      "A survey of data-converter architectures, design trade-offs, and open challenges for resource-constrained IoT applications.",
  },
  {
    title:
      "V-Track: Blockchain-enabled IoT system for reliable vehicle location verification",
    authors: "Mritunjay Shall Peelam, Kunjan Shah, and Vinay Chamola",
    venue: "Digital Communications and Networks",
    year: 2024,
    citations: 20,
    tags: ["Q1 Journal", "SCIE Indexed", "Impact Factor: 7.5"],
    abstract:
      "A decentralized vehicle location-verification architecture combining GPS, IoT sensing, and blockchain records.",
  },
  {
    title:
      "Blockchain-enabled vehicle lifecycle management with predictive maintenance using federated learning",
    authors:
      "Mritunjay Shall Peelam, Kunjan Shah, Vinay Chamola, and Biplab Sikdar",
    venue: "IEEE Transactions on Consumer Electronics",
    year: 2024,
    citations: 17,
    tags: ["Q1 Journal", "SCIE Indexed", "Impact Factor: 10.9"],
    abstract:
      "A tamper-resistant vehicle history and predictive-maintenance system that uses federated learning to protect user data.",
  },
  {
    title: "Enhancing security using quantum computing (ESUQC)",
    authors: "Mritunjay Shall Peelam and Rahul Johari",
    venue:
      "Machine Learning, Advances in Computing, Renewable Energy and Communication",
    year: 2021,
    citations: 12,
    tags: ["Conference", "Scopus Indexed"],
    abstract:
      "An early exploration of quantum algorithms and quantum-mechanical properties for stronger computational security.",
  },
  {
    title:
      "Blockchain-Based Game Theoretical Framework for V2V and V2G Energy Trading in Carbon-Intelligent Internet of Vehicles",
    authors:
      "Mritunjay Shall Peelam, Vinay Chamola, Siva Sai, and Pranay Jalan",
    venue: "IEEE Internet of Things Journal",
    year: 2025,
    citations: 10,
    tags: ["Q1 Journal", "SCIE Indexed", "Impact Factor: 8.9"],
    abstract:
      "A Hyperledger Fabric and game-theory framework for fair, secure, and cost-efficient energy trading among vehicles and the grid.",
  },
  {
    title:
      "Blockchain-enabled intrusion detection systems for real-time vehicle monitoring",
    authors:
      "Mritunjay Shall Peelam, Vinay Chamola, and Brijesh Kumar Chaurasia",
    venue: "Vehicular Communications",
    year: 2025,
    citations: 12,
    tags: ["Q1 Journal", "SCIE Indexed", "Impact Factor: 6.5"],
    abstract:
      "A resilient blockchain-network intrusion detection approach for identifying cyber threats in real-time vehicle monitoring.",
  },
  {
    title:
      "Decentralized trust: NFT and blockchain-enabled evidence system using fog computing",
    authors:
      "Mritunjay Shall Peelam, Vinay Chamola, Aditya Kumar Sharma, and Brijesh Kumar Chaurasia",
    venue: "Blockchain: Research and Applications",
    year: 2025,
    citations: 12,
    tags: ["Q1 Journal", "ESCI Indexed", "Impact Factor: 5.6"],
    abstract:
      "A secure evidence-management architecture using blockchain immutability, NFTs, and low-latency fog computing.",
  },
  {
    title:
      "Machine Learning Techniques for Wi-Fi CSI-based Recognition and Sensing: A Comprehensive Review",
    authors:
      "Siva Sai, Devansh Sharma, Mritunjay Shall Peelam, Vinay Chamola, Mohsen Guizani, and Dusit Niyato",
    venue: "IEEE Internet of Things Journal",
    year: 2026,
    citations: 8,
    tags: ["Q1 Journal", "SCIE Indexed", "Impact Factor: 8.9"],
    abstract:
      "A review of device-free Wi-Fi CSI sensing for activity, gesture, fall, gait, pose, and indoor-location recognition.",
  },
  {
    title:
      "Blockchain-Enabled Secure V2V and V2G Energy Trading for Carbon-Aware Internet of Energy Networks",
    authors: "Mritunjay Shall Peelam and Vinay Chamola",
    venue: "IEEE Network",
    year: 2026,
    citations: 2,
    tags: ["Q1 Journal", "SCIE Indexed", "Impact Factor: 6.3"],
    abstract:
      "A secure and transparent energy-trading framework for electric vehicles in decentralized carbon-aware energy networks.",
  },
  {
    title:
      "Enhancing Quantum-Resistant Data Privacy in Vehicular Cloud Networks Using NIST-Qualified FALCON Algorithm",
    authors:
      "Shall Mritunjay Peelam, Brijesh Kumar Chaurasia, Man Mohan Shukla, and Vinay Chamola",
    venue: "Vehicular Communications",
    year: 2025,
    citations: 0,
    tags: ["Q1 Journal", "SCIE Indexed", "Impact Factor: 6.5"],
    abstract:
      "An implementation study of FALCON post-quantum signatures for confidentiality, integrity, and resilient vehicular cloud communication.",
  },
  {
    title:
      "Blockchain-based framework for global IMEI blacklist management and mobile device theft prevention",
    authors: "Mritunjay Shall Peelam and Vinay Chamola",
    venue: "Blockchain: Research and Applications",
    year: 2025,
    citations: 1,
    tags: ["Q1 Journal", "ESCI Indexed", "Impact Factor: 5.6"],
    abstract:
      "A unified, tamper-resistant global IMEI blacklist on a permissioned Proof-of-Authority blockchain.",
  },
  {
    title:
      "Enhancing Vehicle Lifecycle Management Through Blockchain-Driven Predictive Maintenance and Federated Learning",
    authors:
      "Mritunjay Shall Peelam, Kunjan Shah, Vinay Chamola, and Biplab Sikdar",
    venue: "2024 IEEE GLOBECOM Workshops",
    year: 2024,
    citations: 1,
    tags: ["Conference", "Scopus Indexed"],
    abstract:
      "A GLOBECOM workshop paper combining transparent vehicle records with privacy-preserving predictive maintenance.",
  },
];

const news = [
  {
    date: "May 17, 2026",
    text: "Recognized by Wiley for a Top Viewed Article 2025 in Expert Systems for “DemocracyGuard.”",
    badge: "New",
  },
  {
    date: "Mar 03, 2026",
    text: "Post-Doctoral Fellowship Offer — IIT (BHU), Varanasi.",
  },
  { date: "Jul 17, 2025", text: "Successfully completed Ph.D. defense." },
  {
    date: "Apr 19, 2025",
    text: "Outstanding Research Article Award at the BITS Pilani Doctoral Colloquium.",
  },
  {
    date: "Apr 15, 2025",
    text: "Recognized among the Top 10 Most-Cited Papers in IET Quantum Communication.",
  },
];

const travelPosts = [
  {
    title: "Badrinath",
    date: "November 24, 2025",
    image: "/media/badrinath.jpg",
    description:
      "बद्रीनाथ धाम की शांत यात्रा, हिमालय की दिव्यता और आस्था से भरे अनुभवों की एक छोटी झलक।",
  },
  {
    title: "Kedarnath",
    date: "April 08, 2026",
    image: "/media/kedarnath.jpg",
    description:
      "केदारनाथ धाम की यात्रा, हिमालय की शांति और भगवान शिव की भक्ति से जुड़े सुंदर अनुभवों की झलक।",
  },
  {
    title: "Chakarata",
    date: "April 09, 2026",
    image: "/media/chakarata.jpg",
    description:
      "चकराता की शांत वादियों, ठंडी हवाओं और पहाड़ी सौंदर्य से जुड़े यादगार अनुभवों की झलक।",
  },
];

const courses = [
  {
    title: "Software Engineering",
    year: "2026",
    image: "/media/software-engineering.jpg",
    description:
      "SDLC, requirements, design, testing, maintenance, and teamwork for reliable software systems.",
    topics: ["Introduction", "Life Cycle Models", "Requirements", "Testing"],
  },
  {
    title: "Operating Systems",
    year: "2026",
    image: "/media/operating-systems.jpg",
    description:
      "Processes, memory, scheduling, synchronization, storage, and resource control.",
    topics: ["Processes", "Scheduling", "Memory", "File Systems"],
  },
  {
    title: "Data Structures",
    year: "2026",
    image: "/media/data-structures.jpg",
    description:
      "Core data structures, design trade-offs, and efficient problem solving.",
    topics: ["Arrays", "Linked Lists", "Trees", "Graphs"],
  },
  {
    title: "Computer Organization",
    year: "2026",
    image: "/media/computer-organization.jpg",
    description:
      "Digital logic, instruction execution, memory hierarchy, and processor design.",
    topics: ["Logic", "CPU", "Memory", "I/O"],
  },
];

const cvSections = {
  Education: [
    {
      period: "2022 — 2025",
      title: "Ph.D. in Electrical and Electronics Engineering",
      place: "Birla Institute of Technology and Science, Pilani",
      detail:
        "Design and Development of Blockchain-based Schemes for Enabling Intelligent Transportation Systems. Supervised by Prof. Vinay Chamola.",
    },
    {
      period: "2019 — 2021",
      title: "M.Tech. in Computer Science and Engineering",
      place:
        "University School of Information, Communication and Technology, New Delhi",
      detail: "Graduated with 87.60%.",
    },
    {
      period: "2008 — 2012",
      title: "B.Tech. in Computer Science and Engineering",
      place: "Institution of Electronics and Telecommunication Engineers",
      detail: "Graduated with a CGPA of 7.60/10.",
    },
  ],
  Experience: [
    {
      period: "2025 — Present",
      title: "Assistant Professor (Selection Grade)",
      place: "UPES Dehradun",
      detail:
        "Teaching, research mentoring, curriculum development, and research in intelligent transportation and secure smart systems.",
    },
    {
      period: "2021 — 2022",
      title: "Assistant Professor",
      place: "Pranveer Singh Institute of Technology, Kanpur",
      detail:
        "Taught Java, C, C++, data structures, and core computing subjects.",
    },
    {
      period: "2012 — 2019",
      title: "Programming Language Trainer",
      place: "Tejas Engineers Academy, New Delhi",
      detail:
        "Trained students in C, C++, Java, and core computer science subjects.",
    },
  ],
};

function Header({
  section,
  theme,
  onTheme,
  onSearch,
}: {
  section: SectionKey;
  theme: "light" | "dark";
  onTheme: () => void;
  onSearch: () => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="nav-pill" aria-label="Main navigation">
        <a className="brand-mark" href="/" aria-label="Home">
          <span />
          <span />
          <span />
          <span />
        </a>

        <div className={`nav-links ${mobileOpen ? "is-open" : ""}`}>
          {primaryNav.map((item) => (
            <a
              key={item.key}
              className={section === item.key ? "active" : ""}
              href={item.href}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="more-wrap">
            <button
              className={
                moreNav.some((item) => item.key === section) ? "active" : ""
              }
              onClick={() => setMoreOpen((value) => !value)}
              aria-expanded={moreOpen}
              aria-haspopup="menu"
            >
              More <ChevronDown size={14} />
            </button>
            {moreOpen && (
              <div className="more-menu" role="menu">
                {moreNav.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      href={item.href}
                      key={item.key}
                      role="menuitem"
                      onClick={() => {
                        setMoreOpen(false);
                        setMobileOpen(false);
                      }}
                    >
                      <Icon size={15} />
                      {item.label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="nav-actions">
          <button onClick={onSearch} aria-label="Search" className="icon-button">
            <Search size={19} />
          </button>
          <button
            onClick={onTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="theme-button"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            className="mobile-button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      <div className="rainbow-progress" />
    </header>
  );
}

function SectionTitle({
  children,
  count,
  eyebrow,
}: {
  children: React.ReactNode;
  count?: number;
  eyebrow?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{children}</h2>
      </div>
      {typeof count === "number" && (
        <span className="count-badge" aria-label={`${count} items`}>
          {count}
        </span>
      )}
    </div>
  );
}

function PublicationCard({
  publication,
  index,
  open,
  onToggle,
  compact = false,
}: {
  publication: Publication;
  index: number;
  open: boolean;
  onToggle: () => void;
  compact?: boolean;
}) {
  return (
    <article className={`publication-card ${compact ? "compact" : ""}`}>
      <div className="publication-number">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="publication-body">
        <h3>{publication.title}</h3>
        <p className="authors">
          {publication.authors.split("Mritunjay Shall Peelam").map((part, i, arr) => (
            <span key={`${part}-${i}`}>
              {part}
              {i < arr.length - 1 && <strong>Mritunjay Shall Peelam</strong>}
            </span>
          ))}
        </p>
        <p className="venue">
          <em>{publication.venue}</em>, {publication.year}
        </p>
        <div className="tag-row">
          {publication.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
          <a
            className="citation-tag"
            href="https://scholar.google.com/citations?user=MdGRPEIAAAAJ&hl=en"
            target="_blank"
            rel="noreferrer"
          >
            Citations: {publication.citations}
          </a>
        </div>
        {!compact && (
          <>
            <div className="publication-actions">
              <button onClick={onToggle} aria-expanded={open}>
                Abs
              </button>
              {publication.doi && (
                <a href={publication.doi} target="_blank" rel="noreferrer">
                  DOI
                </a>
              )}
              <a
                href="https://scholar.google.com/citations?user=MdGRPEIAAAAJ&hl=en"
                target="_blank"
                rel="noreferrer"
              >
                Scholar
              </a>
            </div>
            {open && <p className="abstract">{publication.abstract}</p>}
          </>
        )}
      </div>
    </article>
  );
}

function SocialStrip() {
  const socials = [
    {
      label: "Download CV",
      href: "/documents/Dr-Mritunjay-resume.pdf",
      icon: FileText,
    },
    {
      label: "Email",
      href: "mailto:mritunjay.peelam@ddn.upes.ac.in",
      icon: Mail,
    },
    {
      label: "Google Scholar",
      href: "https://scholar.google.com/citations?user=MdGRPEIAAAAJ",
      icon: SiGooglescholar,
    },
    {
      label: "ORCID",
      href: "https://orcid.org/0000-0002-8022-3815",
      icon: SiOrcid,
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/918745080986",
      icon: SiWhatsapp,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mritunjay-shall-peelam",
      icon: FaLinkedinIn,
    },
    {
      label: "YouTube",
      href: "https://youtube.com/@msptutorial7884",
      icon: SiYoutube,
    },
  ];

  return (
    <section className="social-panel" aria-label="Contact and research profiles">
      <div className="social-icons">
        {socials.map(({ label, href, icon: Icon }) => (
          <a
            href={href}
            key={label}
            aria-label={label}
            title={label}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
          >
            <Icon />
          </a>
        ))}
      </div>
      <div className="metrics">
        <span>
          <strong>13,535</strong> Visitors
        </span>
        <span>
          Citations <strong>584</strong>
        </span>
        <span>
          H-index <strong>12</strong>
        </span>
        <span>
          i10-index <strong>16</strong>
        </span>
      </div>
      <p>
        The best way to reach me is via email —{" "}
        <a href="mailto:mritunjay.peelam@ddn.upes.ac.in">
          mritunjay.peelam@ddn.upes.ac.in
        </a>
        .
      </p>
    </section>
  );
}

function HomePage() {
  const [opened, setOpened] = useState<number | null>(null);

  return (
    <>
      <section className="hero">
        <div className="portrait-ring">
          <img
            src="/media/profile.png"
            alt="Dr. Mritunjay Shall Peelam"
            width={190}
            height={190}
          />
        </div>
        <h1>Dr. Mritunjay Shall Peelam</h1>
        <div className="credentials">
          <p>
            <span className="twin-dot" />
            <span>
              <strong>Assistant Professor (Selection Grade)</strong> at{" "}
              <a href="https://www.upes.ac.in/">UPES Dehradun, Uttarakhand</a>
            </span>
          </p>
          <p>
            <span className="twin-dot" />
            <span>
              <strong>Ph.D.</strong> from{" "}
              <a href="https://www.bits-pilani.ac.in/">
                BITS Pilani, Pilani Campus
              </a>
            </span>
          </p>
          <p>
            <span className="twin-dot" />
            <span>
              <strong>M.Tech.</strong> from{" "}
              <a href="https://www.ipu.ac.in/">USICT, New Delhi, India</a>
            </span>
          </p>
          <p>
            <span className="twin-dot" />
            <span>
              <strong>Research Areas:</strong> Blockchain, IoT, Edge AI,
              Multimodal ML
            </span>
          </p>
        </div>
      </section>

      <article className="bio copy">
        <p>
          I am currently an Assistant Professor (Selection Grade) at{" "}
          <a href="https://www.upes.ac.in/">UPES Dehradun, Uttarakhand</a>.
          Previously, I worked as an Assistant Professor at Pranveer Singh
          Institute of Technology (PSIT), Kanpur, and as a Programming Language
          Trainer at Tejas Engineers Academy, New Delhi, where I trained
          students in core computer science subjects.
        </p>
        <p>
          I completed my Ph.D. from{" "}
          <a href="https://www.bits-pilani.ac.in/">BITS Pilani</a> under the
          supervision of Prof. Vinay Chamola. My research focuses on
          blockchain-based solutions for intelligent transportation systems,
          integrating Blockchain, Internet of Things (IoT), Edge AI, Federated
          Learning, and Multimodal Machine Learning.
        </p>
        <p>
          I have published research articles in IEEE Internet of Things
          Journal, IEEE Transactions on Intelligent Transportation Systems,
          IEEE Transactions on Consumer Electronics, IEEE Access, Wiley, and
          Elsevier, and presented work at international venues including IEEE
          GLOBECOM.
        </p>
        <p>
          My work is centered on solving real-world problems with secure,
          scalable, and intelligent systems—especially in transportation,
          connected environments, and distributed computing.
        </p>
      </article>

      <section className="home-section">
        <SectionTitle eyebrow="Highlights">News</SectionTitle>
        <div className="news-table">
          {news.map((item) => (
            <div className="news-row" key={`${item.date}-${item.text}`}>
              <time>{item.date}</time>
              <p>
                {item.badge && <span className="new-badge">{item.badge}</span>}
                {item.text}
              </p>
            </div>
          ))}
        </div>
        <a className="text-link" href="/news">
          View all news <ChevronRight size={16} />
        </a>
      </section>

      <section className="home-section">
        <SectionTitle eyebrow="Recent activity">Latest Updates</SectionTitle>
        <div className="updates-grid">
          <a href="/award-fdp" className="update-card">
            <span>May 17, 2026</span>
            <strong>Wiley Top Viewed Article 2025</strong>
            <small>News</small>
          </a>
          <a href="/teaching" className="update-card">
            <span>May 08, 2026</span>
            <strong>Operating System Important Interview Questions</strong>
            <small>Teaching</small>
          </a>
        </div>
      </section>

      <section className="home-section">
        <SectionTitle count={publications.length} eyebrow="Selected work">
          Publications
        </SectionTitle>
        <div className="publication-list">
          {publications.slice(0, 5).map((publication, index) => (
            <PublicationCard
              compact
              key={publication.title}
              publication={publication}
              index={index}
              open={opened === index}
              onToggle={() => setOpened(opened === index ? null : index)}
            />
          ))}
        </div>
        <a className="primary-link" href="/publications">
          Explore all 21 publications <ChevronRight size={17} />
        </a>
      </section>

      <SocialStrip />
    </>
  );
}

function PublicationsPage() {
  const [opened, setOpened] = useState<number | null>(0);
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("all");

  const filtered = useMemo(
    () =>
      publications.filter((publication) => {
        const matchesText =
          `${publication.title} ${publication.authors} ${publication.venue}`
            .toLowerCase()
            .includes(query.toLowerCase());
        return matchesText && (year === "all" || publication.year === Number(year));
      }),
    [query, year],
  );

  return (
    <section className="page-section">
      <PageIntro
        eyebrow="Research record"
        title="Publications"
        description="Peer-reviewed work spanning blockchain, IoT, intelligent transportation, quantum security, Edge AI, and next-generation networks."
      />
      <div className="publication-toolbar">
        <label className="filter-input">
          <Search size={17} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search publications"
            aria-label="Search publications"
          />
        </label>
        <select
          value={year}
          onChange={(event) => setYear(event.target.value)}
          aria-label="Filter by year"
        >
          <option value="all">All years</option>
          {[2026, 2025, 2024, 2021].map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
        <span className="result-count">{filtered.length} publications</span>
      </div>
      <div className="publication-list">
        {filtered.map((publication) => {
          const originalIndex = publications.indexOf(publication);
          return (
            <PublicationCard
              key={publication.title}
              publication={publication}
              index={originalIndex}
              open={opened === originalIndex}
              onToggle={() =>
                setOpened(opened === originalIndex ? null : originalIndex)
              }
            />
          );
        })}
      </div>
    </section>
  );
}

function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

function BlogPage() {
  return (
    <section className="page-section">
      <PageIntro
        eyebrow="Nature notes"
        title="Travel Blog"
        description="Roads do not only lead to places; they lead us back to ourselves."
      />
      <div className="travel-grid">
        {travelPosts.map((post) => (
          <article className="travel-card" key={post.title}>
            <div className="travel-image">
              <img src={post.image} alt={`${post.title} travel`} />
              <span>{post.date}</span>
            </div>
            <div>
              <p className="eyebrow">Himalayan journal</p>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <span className="text-link">
                Read travel note <ChevronRight size={15} />
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function TeachingPage() {
  return (
    <section className="page-section">
      <div className="teaching-hero">
        <p className="eyebrow">Learning studio</p>
        <h1>MSP Tutorial</h1>
        <strong>Dr. Mritunjay Shall Peelam</strong>
        <p>
          Education is where curiosity becomes discipline, and discipline
          becomes transformation.
        </p>
      </div>
      <div className="course-grid">
        {courses.map((course) => (
          <article className="course-card" key={course.title}>
            <img src={course.image} alt="" />
            <div>
              <span className="course-year">{course.year}</span>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <div className="topic-row">
                {course.topics.map((topic) => (
                  <span key={topic}>{topic}</span>
                ))}
              </div>
              <a
                href={
                  course.title === "Operating Systems"
                    ? "/teaching#operating-systems"
                    : "/teaching"
                }
                className="text-link"
              >
                Course resources <ChevronRight size={15} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CvPage() {
  return (
    <section className="page-section cv-page">
      <div className="cv-hero">
        <img src="/media/profile-color.jpg" alt="Dr. Mritunjay Shall Peelam" />
        <div>
          <p className="eyebrow">Academic curriculum vitae</p>
          <h1>Dr. Mritunjay Shall Peelam</h1>
          <strong>Assistant Professor (Selection Grade), UPES Dehradun</strong>
          <p>
            Ph.D. researcher working at the intersection of blockchain,
            intelligent transportation, IoT, Edge AI, federated learning, and
            multimodal machine learning.
          </p>
          <div className="cv-actions">
            <a
              className="primary-link"
              href="/documents/Dr-Mritunjay-resume.pdf"
              target="_blank"
            >
              <Download size={17} /> Download PDF
            </a>
            <a
              className="secondary-link"
              href="mailto:mritunjay.peelam@ddn.upes.ac.in"
            >
              <Mail size={17} /> Email
            </a>
          </div>
        </div>
      </div>

      <div className="cv-section">
        <SectionTitle eyebrow="Training">Education</SectionTitle>
        <Timeline items={cvSections.Education} />
      </div>
      <div className="cv-section">
        <SectionTitle eyebrow="Academic journey">Experience</SectionTitle>
        <Timeline items={cvSections.Experience} />
      </div>
      <div className="cv-section">
        <SectionTitle eyebrow="Capabilities">Research & Skills</SectionTitle>
        <div className="skill-grid">
          {[
            ["Research", "Blockchain, IoT, Edge AI, Federated Learning"],
            ["Programming", "C, C++, Java, Python, JavaScript, Go, C#"],
            ["Core Subjects", "Data Structures, OS, DBMS, Networks, Algorithms"],
            ["Tools", "LaTeX, Overleaf, Matplotlib, Cryptography, ML"],
          ].map(([title, text]) => (
            <div className="skill-card" key={title}>
              <Code2 size={19} />
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="cv-section">
        <SectionTitle eyebrow="Recognition">Selected Awards</SectionTitle>
        <div className="award-grid">
          {[
            "Wiley Top Viewed Article 2025",
            "Outstanding Research Article Award — BITS Pilani",
            "Top 10 Most-Cited Paper — IET Quantum Communication",
            "IETE Academic Top 10",
          ].map((title) => (
            <div className="award-card" key={title}>
              <Award size={20} />
              <strong>{title}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline({
  items,
}: {
  items: Array<{
    period: string;
    title: string;
    place: string;
    detail: string;
  }>;
}) {
  return (
    <div className="timeline">
      {items.map((item) => (
        <article key={`${item.period}-${item.title}`}>
          <span className="timeline-dot" />
          <time>{item.period}</time>
          <h3>{item.title}</h3>
          <strong>{item.place}</strong>
          <p>{item.detail}</p>
        </article>
      ))}
    </div>
  );
}

function NewsPage() {
  return (
    <section className="page-section">
      <PageIntro
        eyebrow="Milestones"
        title="News"
        description="Academic appointments, recognition, research milestones, and professional development."
      />
      <div className="news-cards">
        {news.map((item, index) => (
          <article key={item.text}>
            <div className="news-icon">
              {index === 0 ? <Award /> : <Sparkles />}
            </div>
            <div>
              <time>{item.date}</time>
              <h2>{item.text}</h2>
              <p>
                A highlight from ongoing academic, research, and professional
                work.
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function AwardsPage() {
  const achievements = [
    {
      year: "2026",
      title: "Wiley Top Viewed Article 2025",
      detail:
        "Recognized for DemocracyGuard: Blockchain-based secure voting framework for digital democracy.",
    },
    {
      year: "2026",
      title: "E&ICT Academy, IIT Guwahati FDP",
      detail:
        "Advanced Architectures and Real-Time Systems for Intelligent Embedded Applications.",
    },
    {
      year: "2025",
      title: "Outstanding Research Article Award",
      detail:
        "BITS Pilani Doctoral Colloquium recognition for work on emergency vehicle management.",
    },
    {
      year: "2025",
      title: "Top 10 Most-Cited Paper",
      detail:
        "Recognition from IET Quantum Communication for Quantum Computing Applications for IoT.",
    },
    {
      year: "2022",
      title: "Project Management",
      detail: "Faculty development programme from E&ICT Academy, IIT Kanpur.",
    },
    {
      year: "2020",
      title: "Quantum Computing",
      detail:
        "Professional development programme at Malaviya National Institute of Technology Jaipur.",
    },
  ];
  return (
    <section className="page-section">
      <PageIntro
        eyebrow="Recognition & development"
        title="Awards & FDP"
        description="Research recognition, academic awards, faculty development programmes, and continuing education."
      />
      <div className="achievement-grid">
        {achievements.map((item) => (
          <article key={item.title}>
            <span>{item.year}</span>
            <Award />
            <h2>{item.title}</h2>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProfilesPage() {
  const profiles = [
    {
      name: "Google Scholar",
      note: "Publications, citations, h-index, and research record",
      href: "https://scholar.google.com/citations?user=MdGRPEIAAAAJ",
      icon: SiGooglescholar,
    },
    {
      name: "ORCID",
      note: "Persistent researcher identity · 0000-0002-8022-3815",
      href: "https://orcid.org/0000-0002-8022-3815",
      icon: SiOrcid,
    },
    {
      name: "LinkedIn",
      note: "Academic experience and professional network",
      href: "https://www.linkedin.com/in/mritunjay-shall-peelam",
      icon: FaLinkedinIn,
    },
    {
      name: "GitHub",
      note: "Code, experiments, teaching resources, and repositories",
      href: "https://github.com/shall786",
      icon: SiGithub,
    },
    {
      name: "YouTube",
      note: "MSP Tutorial lectures and computer science learning",
      href: "https://youtube.com/@msptutorial7884",
      icon: SiYoutube,
    },
  ];
  return (
    <section className="page-section">
      <PageIntro
        eyebrow="Research identity"
        title="Profiles"
        description="Verified academic, professional, and teaching profiles across the web."
      />
      <div className="profile-link-grid">
        {profiles.map(({ name, note, href, icon: Icon }) => (
          <a href={href} target="_blank" rel="noreferrer" key={name}>
            <Icon />
            <div>
              <h2>{name}</h2>
              <p>{note}</p>
            </div>
            <ExternalLink size={17} />
          </a>
        ))}
      </div>
    </section>
  );
}

function RepositoriesPage() {
  const repos = [
    {
      title: "Academic Portfolio",
      detail:
        "The independent, theme-free portfolio implementation and content source.",
      tags: ["Next.js", "TypeScript", "CSS"],
    },
    {
      title: "Blockchain Research Experiments",
      detail:
        "Reproducible work around distributed ledgers, IoT, and intelligent transportation systems.",
      tags: ["Blockchain", "IoT", "Research"],
    },
    {
      title: "MSP Tutorial Resources",
      detail:
        "Teaching notes and supporting material for core computer science subjects.",
      tags: ["Education", "Operating Systems", "Software Engineering"],
    },
  ];
  return (
    <section className="page-section">
      <PageIntro
        eyebrow="Open work"
        title="Repositories"
        description="Code, research experiments, and teaching resources maintained across GitHub."
      />
      <div className="repo-grid">
        {repos.map((repo) => (
          <a
            href="https://github.com/shall786"
            target="_blank"
            rel="noreferrer"
            key={repo.title}
          >
            <SiGithub size={23} />
            <h2>{repo.title}</h2>
            <p>{repo.detail}</p>
            <div className="topic-row">
              {repo.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function BooksPage() {
  return (
    <section className="page-section">
      <PageIntro
        eyebrow="Reading shelf"
        title="Books"
        description="Selected references supporting teaching, systems research, cryptography, and intelligent computing."
      />
      <div className="books-grid">
        {[
          ["Operating System Concepts", "Silberschatz, Galvin & Gagne"],
          ["Modern Operating Systems", "Andrew S. Tanenbaum"],
          ["Computer Networking: A Top-Down Approach", "Kurose & Ross"],
          ["Introduction to Algorithms", "Cormen, Leiserson, Rivest & Stein"],
          ["Mastering Blockchain", "Imran Bashir"],
          ["Deep Learning", "Goodfellow, Bengio & Courville"],
        ].map(([title, author], index) => (
          <article key={title}>
            <div className={`book-cover cover-${index + 1}`}>
              <BookOpen />
            </div>
            <h2>{title}</h2>
            <p>{author}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ComingSoonPage({ kind }: { kind: "Projects" | "People" }) {
  return (
    <section className="coming-soon">
      <div className="coming-icon">
        {kind === "Projects" ? <BriefcaseBusiness /> : <UsersRound />}
      </div>
      <p className="eyebrow">{kind}</p>
      <h1>Coming soon</h1>
      <p>
        This section is being prepared and will be available with the next
        content update.
      </p>
      <a className="secondary-link" href="/">
        Return home
      </a>
    </section>
  );
}

function SearchDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const items = useMemo(
    () => [
      ...primaryNav.map((item) => ({
        title: item.label,
        href: item.href,
        meta: "Page",
      })),
      ...moreNav.map((item) => ({
        title: item.label,
        href: item.href,
        meta: "Page",
      })),
      ...publications.map((publication) => ({
        title: publication.title,
        href: "/publications",
        meta: `${publication.year} · ${publication.venue}`,
      })),
    ],
    [],
  );
  const results = query.trim()
    ? items
        .filter((item) =>
          `${item.title} ${item.meta}`
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
        )
        .slice(0, 8)
    : items.slice(0, 6);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="search-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="search-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Search portfolio"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="search-field">
          <Search size={20} />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search pages and publications"
            aria-label="Search pages and publications"
          />
          <button onClick={onClose} aria-label="Close search">
            <X size={19} />
          </button>
        </div>
        <div className="search-results">
          {results.map((item, index) => (
            <a href={item.href} key={`${item.title}-${index}`}>
              <div>
                <strong>{item.title}</strong>
                <span>{item.meta}</span>
              </div>
              <ChevronRight size={17} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <span>
        © 2026 <strong>Dr. Mritunjay Shall Peelam</strong>
      </span>
      <span>Independent portfolio · Last updated July 31, 2026</span>
    </footer>
  );
}

export function PortfolioApp({ section = "home" }: { section?: string }) {
  const safeSection = (
    [
      "home",
      ...primaryNav.map((item) => item.key),
      ...moreNav.map((item) => item.key),
    ].includes(section)
      ? section
      : "home"
  ) as SectionKey;
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-theme");
    const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored === "dark" || (!stored && preferredDark) ? "dark" : "light";
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("portfolio-theme", next);
  };

  let content: React.ReactNode;
  switch (safeSection) {
    case "publications":
      content = <PublicationsPage />;
      break;
    case "blog":
      content = <BlogPage />;
      break;
    case "teaching":
      content = <TeachingPage />;
      break;
    case "cv":
      content = <CvPage />;
      break;
    case "projects":
      content = <ComingSoonPage kind="Projects" />;
      break;
    case "people":
      content = <ComingSoonPage kind="People" />;
      break;
    case "news":
      content = <NewsPage />;
      break;
    case "award-fdp":
      content = <AwardsPage />;
      break;
    case "repositories":
      content = <RepositoriesPage />;
      break;
    case "books":
      content = <BooksPage />;
      break;
    case "profiles":
      content = <ProfilesPage />;
      break;
    default:
      content = <HomePage />;
  }

  return (
    <div className="site-frame">
      <Header
        section={safeSection}
        theme={theme}
        onTheme={toggleTheme}
        onSearch={() => setSearchOpen(true)}
      />
      <main className="site-main">{content}</main>
      <Footer />
      {searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} />}
    </div>
  );
}
