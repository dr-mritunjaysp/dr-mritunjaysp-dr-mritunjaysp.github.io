"use client";

import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  ChevronRight,
  Code2,
  Download,
  ExternalLink,
  FileText,
  Mail,
  Menu,
  Search,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";
import Link from "next/link";
import {
  SiGooglescholar,
  SiGithub,
  SiOrcid,
  SiWhatsapp,
  SiYoutube,
} from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import { useEffect, useMemo, useRef, useState } from "react";
import { LiveUpdateRefresh } from "./LiveUpdateRefresh";
import { LottieIcon } from "./LottieIcon";
import { ScrollJumpButton } from "./ScrollJumpButton";
import { subscribeVisitorCounter, subscribeScholarMetrics } from "./firebase";
import type { ScholarMetrics } from "./firebase";

type SectionKey =
  | "home"
  | "blog"
  | "publications"
  | "projects"
  | "cv"
  | "teaching"
  | "people"
  | "award-fdp"
  | "game"
  | "daily-mantra"
  | "bhagwatgita"
  | "ramayan"
  | "quantum-computation"
  | "blockchain"
  | "poems"
  | "motivations"
  | "news"
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
  { label: "Awards & FDP", href: "/award-fdp", key: "award-fdp" },
  { label: "Game", href: "/game", key: "game" },
  { label: "Daily Mantra", href: "/daily-mantra", key: "daily-mantra" },
  { label: "Bhagwatgita", href: "/bhagwatgita", key: "bhagwatgita" },
  { label: "Ramayan", href: "/ramayan", key: "ramayan" },
  {
    label: "Quantum Computing",
    href: "/quantum-computation",
    key: "quantum-computation",
  },
  { label: "Blockchain", href: "/blockchain", key: "blockchain" },
  { label: "Poems", href: "/poems", key: "poems" },
  { label: "Motivations", href: "/motivations", key: "motivations" },
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
    {
      period: "2008",
      title: "Class XII",
      place: "Guru Nanak Inter College, Mirzapur",
      detail: "BHSIEUP · 65.00%.",
    },
    {
      period: "2006",
      title: "Class X",
      place: "Sarvoday Public School, Pandari, Mirzapur",
      detail: "BHSIEUP · 67.50%.",
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
    {
      period: "2012",
      title: "Java and Advanced Java Intern",
      place: "HCL CDC, New Delhi",
      detail:
        "Hands-on exposure to practical software development with Java technologies.",
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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(
        scrollable > 0
          ? Math.min(100, (window.scrollY / scrollable) * 100)
          : 0,
      );
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".more-wrap")) {
        setMoreOpen(false);
      }
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    document.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="site-header">
      <nav className="nav-pill" aria-label="Main navigation">
        <Link className="desktop-page-brand" href="/" aria-label="Home">
          <strong>Dr. Mritunjay</strong>&nbsp;Shall Peelam
        </Link>

        <div className={`nav-links ${mobileOpen ? "is-open" : ""}`}>
          <Link
            className={`nav-home-link ${section === "home" ? "active" : ""}`}
            href="/"
            title="Home"
            aria-label="Home"
            onClick={() => setMobileOpen(false)}
          >
            <LottieIcon
              path="/lottie/home-button.json"
              className="home-lottie-icon"
            />
          </Link>
          {primaryNav.map((item) => (
            <Link
              key={item.key}
              className={section === item.key ? "active" : ""}
              href={item.href}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div
            className="more-wrap"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button
              className={
                moreNav.some((item) => item.key === section) ? "active" : ""
              }
              onClick={(e) => {
                e.stopPropagation();
                setMoreOpen((value) => !value);
              }}
              aria-expanded={moreOpen}
              aria-haspopup="menu"
            >
              More{" "}
              <span className="navbar-dropdown-arrow" aria-hidden="true">
                ▾
              </span>
            </button>
            {moreOpen && (
              <div className="more-menu" role="menu">
                {moreNav.map((item) => (
                  <Link
                    href={item.href}
                    key={item.key}
                    role="menuitem"
                    className={section === item.key ? "active" : ""}
                    onClick={(e) => {
                      e.stopPropagation();
                      setMoreOpen(false);
                      setMobileOpen(false);
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="nav-actions">
          <button onClick={onSearch} aria-label="Search" className="search-button">
            <span>Search</span>
            <LottieIcon
              path="/lottie/search-icon.json"
              className="search-lottie-icon"
            />
          </button>
          <button
            onClick={onTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="theme-button"
          >
            <LottieIcon
              path="/lottie/theme-toggle.json"
              className="theme-toggle-lottie"
            />
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
      <div
        className="rainbow-progress"
        style={{ width: `${scrollProgress}%` }}
      />
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

function AnimatedCount({
  value,
  fallback = "…",
  className = "",
}: {
  value: number;
  fallback?: string;
  className?: string;
}) {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const [tickColor, setTickColor] = useState<string | null>(null);
  const [isTicking, setIsTicking] = useState<boolean>(false);

  useEffect(() => {
    if (value <= 0) return;

    const targetVal = value;
    const tickColors = ["#48dbfb", "#1dd1a1", "#feca57", "#ff6b6b", "#a855f7", "#22c55e"];
    let colorIdx = 0;
    const duration = 2400;
    const frameDelay = 20;
    const maxFrames = Math.floor(duration / frameDelay);
    const step = Math.max(1, Math.ceil(targetVal / maxFrames));
    let cur = 0;

    setIsTicking(true);

    const timer = setInterval(() => {
      cur += step;
      if (cur >= targetVal) {
        cur = targetVal;
        clearInterval(timer);
        setDisplayValue(targetVal);
        setTickColor(null);
        setIsTicking(false);
      } else {
        const nextColor = tickColors[colorIdx % tickColors.length];
        colorIdx++;
        setTickColor(nextColor);
        setDisplayValue(cur);
      }
    }, frameDelay);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span
      className={`animated-count ${isTicking ? "is-ticking" : ""} ${className}`}
      style={
        tickColor
          ? ({
              color: tickColor,
              WebkitTextFillColor: tickColor,
              textShadow: `0 0 8px ${tickColor}`,
            } as React.CSSProperties)
          : undefined
      }
    >
      {displayValue > 0 ? displayValue.toLocaleString() : fallback}
    </span>
  );
}

function SocialStrip() {
  const [visitorTotal, setVisitorTotal] = useState<number>(0);
  const [scholar, setScholar] = useState<ScholarMetrics>({
    total_citations: 584,
    h_index: 12,
    i10_index: 16,
  });

  useEffect(() => {
    const unsubCounter = subscribeVisitorCounter({
      onTotal: (total) => setVisitorTotal(total),
    });
    const unsubScholar = subscribeScholarMetrics((m) => {
      setScholar((prev) => ({
        total_citations: m.total_citations ?? prev.total_citations,
        h_index: m.h_index ?? prev.h_index,
        i10_index: m.i10_index ?? prev.i10_index,
      }));
    });
    return () => {
      unsubCounter();
      unsubScholar();
    };
  }, []);

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
      <div className="social site-social-strip">
        <div className="social-icons contact-icons">
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
        <div className="visitor-counter">
          <span className="visitor-counter-item">
            <span className="visitor-counter-eye" aria-hidden="true">
              <img src="/media/view.gif" alt="" width={34} height={34} />
            </span>
            <AnimatedCount
              value={visitorTotal}
              className="visitor-counter-value"
            />
          </span>
          <span className="visitor-counter-text">
            <span className="visitor-counter-separator" aria-hidden="true"> | </span>
            <span className="visitor-counter-metric">
              Citations :{" "}
              <AnimatedCount
                value={scholar.total_citations ?? 584}
                fallback="584"
                className="visitor-counter-metric-value"
              />
            </span>
            <span className="visitor-counter-separator" aria-hidden="true"> | </span>
            <span className="visitor-counter-metric">
              H-index :{" "}
              <AnimatedCount
                value={scholar.h_index ?? 12}
                fallback="12"
                className="visitor-counter-metric-value"
              />
            </span>
            <span className="visitor-counter-separator" aria-hidden="true"> | </span>
            <span className="visitor-counter-metric">
              i10-index :{" "}
              <AnimatedCount
                value={scholar.i10_index ?? 16}
                fallback="16"
                className="visitor-counter-metric-value"
              />
            </span>
          </span>
        </div>
        <div className="contact-note">
          The best way to reach me is via email —{" "}
          <a href="mailto:mritunjay.peelam@ddn.upes.ac.in">
            mritunjay.peelam@ddn.upes.ac.in
          </a>
          .
        </div>
      </div>
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
        <h1>
          <span className="font-weight-bold">
            Dr. Mritunjay Shall Peelam
          </span>
        </h1>
        <div className="credentials">
          <p>
            <LottieIcon
              path="/lottie/tiktok-bullet-loader.json"
              className="about-bullet-lottie"
            />
            <span>
              <strong>Assistant Professor (Selection Grade)</strong> at{" "}
              <a href="https://www.upes.ac.in/">UPES Dehradun, Uttarakhand</a>
            </span>
          </p>
          <p>
            <LottieIcon
              path="/lottie/tiktok-bullet-loader.json"
              className="about-bullet-lottie"
            />
            <span>
              <strong>Ph.D.</strong> from{" "}
              <a href="https://www.bits-pilani.ac.in/">
                BITS Pilani, Pilani Campus
              </a>
            </span>
          </p>
          <p>
            <LottieIcon
              path="/lottie/tiktok-bullet-loader.json"
              className="about-bullet-lottie"
            />
            <span>
              <strong>M.Tech.</strong> from{" "}
              <a href="https://www.ipu.ac.in/">USICT, New Delhi, India</a>
            </span>
          </p>
          <p>
            <LottieIcon
              path="/lottie/tiktok-bullet-loader.json"
              className="about-bullet-lottie"
            />
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
          I consider myself a researcher focused on solving real-world
          problems using advanced technologies. I am particularly interested
          in developing secure, scalable, and intelligent systems, especially
          in domains such as transportation and smart environments.
        </p>
        <p>
          As part of my research, I am primarily interested in Blockchain,
          IoT, Edge AI, Federated Learning, and Multimodal Machine Learning. I
          also work on topics related to intelligent systems, distributed
          computing, and emerging technologies.
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
        <Link className="text-link" href="/news">
          View all news <ChevronRight size={16} />
        </Link>
      </section>

      <section className="home-section">
        <SectionTitle eyebrow="Recent activity">Latest Updates</SectionTitle>
        <div className="updates-grid">
          <Link href="/award-fdp" className="update-card">
            <span>May 17, 2026</span>
            <strong>Wiley Top Viewed Article 2025</strong>
            <small>News</small>
          </Link>
          <Link href="/teaching" className="update-card">
            <span>May 08, 2026</span>
            <strong>Operating System Important Interview Questions</strong>
            <small>Teaching</small>
          </Link>
        </div>
      </section>

      <section className="home-section">
        <SectionTitle count={publications.length} eyebrow="Selected work">
          Publications
        </SectionTitle>
        <div className="publication-list">
          {publications.map((publication, index) => (
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
        <Link className="primary-link" href="/publications">
          Search and filter publications <ChevronRight size={17} />
        </Link>
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
              <Link
                href={
                  course.title === "Operating Systems"
                    ? "/teaching#operating-systems"
                    : "/teaching"
                }
                className="text-link"
              >
                Course resources <ChevronRight size={15} />
              </Link>
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
      <div className="cv-section">
        <SectionTitle eyebrow="Continuing education">
          Certificates & FDP
        </SectionTitle>
        <div className="detail-grid">
          {[
            [
              "2026",
              "Advanced Architectures and Real-Time Systems for Intelligent Embedded Applications",
              "E&ICT Academy, IIT Guwahati",
            ],
            [
              "2025",
              "Intelligent Systems and Emerging Technologies in Computing and Electronics",
              "UPES Dehradun with NIT Jamshedpur",
            ],
            ["2022", "Project Management", "E&ICT Academy, IIT Kanpur"],
            [
              "2022",
              "Quantum Computing — Building Concepts Advanced FDP",
              "Amity University Uttar Pradesh",
            ],
            [
              "2020",
              "Quantum Computing",
              "Malaviya National Institute of Technology Jaipur",
            ],
          ].map(([year, title, issuer]) => (
            <article key={title}>
              <span>{year}</span>
              <h3>{title}</h3>
              <p>{issuer}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="cv-section">
        <SectionTitle eyebrow="Academic contribution">
          Professional Service
        </SectionTitle>
        <div className="copy cv-copy-list">
          <p>
            Reviewer for <em>Expert Systems</em>,{" "}
            <em>Intelligent Transportation Systems</em>,{" "}
            <em>Cognitive Computation</em>,{" "}
            <em>Computers and Electrical Engineering</em>, and{" "}
            <em>IET Blockchain</em>.
          </p>
          <p>
            Presented research at international venues including IEEE Global
            Communications Conference (GLOBECOM).
          </p>
          <p>
            Active in academic mentoring, teaching, and interdisciplinary
            research collaborations.
          </p>
        </div>
      </div>
      <div className="cv-section">
        <SectionTitle eyebrow="Communication">Languages</SectionTitle>
        <div className="detail-grid compact-details">
          <article>
            <h3>Hindi</h3>
            <p>Native / Professional proficiency</p>
          </article>
          <article>
            <h3>English</h3>
            <p>Professional proficiency</p>
          </article>
        </div>
      </div>
      <div className="cv-section">
        <SectionTitle eyebrow="Contact record">Personal Details</SectionTitle>
        <div className="profile-details">
          <p>
            <strong>Date of Birth</strong>
            <span>04 April 1992</span>
          </p>
          <p>
            <strong>Gender</strong>
            <span>Male</span>
          </p>
          <p>
            <strong>Marital Status</strong>
            <span>Married</span>
          </p>
          <p>
            <strong>Current Address</strong>
            <span>
              Village and Post Pandari, District Mirzapur, Uttar Pradesh,
              India — 231001
            </span>
          </p>
          <p>
            <strong>Additional Emails</strong>
            <span>
              mritunjay.peelam@pilani.bits-pilani.ac.in ·
              mritunjay.peelam@ddn.upes.ac.in
            </span>
          </p>
        </div>
      </div>
      <div className="cv-section">
        <SectionTitle eyebrow="Academic referees">References</SectionTitle>
        <div className="detail-grid reference-grid">
          {[
            [
              "Prof. Vinay Chamola",
              "BITS Pilani · vinay.chamola@pilani.bits-pilani.ac.in",
            ],
            [
              "Prof. Biplab Sikdar",
              "National University of Singapore · bsikdar@nus.edu.sg",
            ],
            [
              "Prof. Mohsen Guizani",
              "MBZUAI · mohsen.guizani@mbzuai.ac.ae",
            ],
            [
              "Prof. G. Sai Sesha Chalapathi",
              "BITS Pilani · gssc@pilani.bits-pilani.ac.in",
            ],
            [
              "Prof. Tejasvi Alladi",
              "BITS Pilani · tejasvi.alladi@pilani.bits-pilani.ac.in",
            ],
            [
              "Prof. Brijesh Kumar Chaurasia",
              "PSIT Kanpur · brijesh.chaurasia@psit.ac.in",
            ],
          ].map(([name, reference]) => (
            <article key={name}>
              <h3>{name}</h3>
              <p>{reference}</p>
            </article>
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

function GamePage() {
  const games = [
    {
      kicker: "Classic Arcade",
      title: "Snake",
      description:
        "Eat food, grow longer, and survive as long as you can without hitting the walls or yourself.",
      overview:
        "Snake is a timeless reflex game: each food pickup grows your body, makes navigation tighter, and turns every move into a strategy decision.",
    },
    {
      kicker: "Royal Board Game",
      title: "Ludo King",
      description:
        "Roll the dice, race four tokens home, capture rivals, and use safe stars to protect your lead.",
      overview:
        "A local 2–4 player match with animated turns, captures, safe squares, home lanes, bonus rolls, and a winner celebration.",
    },
  ];

  return (
    <section className="page-section">
      <PageIntro
        eyebrow="Play"
        title="Game"
        description="A small set of browser games from the original portfolio."
      />
      <div className="game-grid">
        {games.map((game) => (
          <article className="game-card" key={game.title}>
            <p className="eyebrow">{game.kicker}</p>
            <h2>{game.title}</h2>
            <p>{game.description}</p>
            <div className="game-overview">
              <strong>Overview</strong>
              <p>{game.overview}</p>
            </div>
            <span className="primary-link">Play Now</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function DailyMantraPage() {
  const mantras = [
    [
      "Shiva Tandava Stotram",
      "Powerful Sanskrit verses celebrating Lord Shiva’s cosmic dance.",
    ],
    ["Shiv Stotram", "Sacred Sanskrit verses with Hindi and English meaning."],
    ["Shri Hari Stotram", "Devotional praise of Lord Vishnu."],
    [
      "Sankat Vinashan Ganapati Stotram",
      "A prayer to Lord Ganesha for overcoming obstacles.",
    ],
    ["Hanuman Chalisa", "Forty devotional verses in praise of Lord Hanuman."],
  ];

  return (
    <section className="page-section">
      <PageIntro
        eyebrow="Sacred collection"
        title="Daily Mantra"
        description="Sacred mantra cards with Sanskrit verses and Hindi and English meanings."
      />
      <div className="mantra-grid">
        {mantras.map(([title, description]) => (
          <article key={title}>
            <LottieIcon
              path="/lottie/tiktok-bullet-loader.json"
              className="mantra-lottie"
            />
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ComingSoonPage({ kind }: { kind: string }) {
  return (
    <section className="coming-soon">
      <div className="coming-icon">
        {kind === "Projects" ? (
          <BriefcaseBusiness />
        ) : kind === "People" ? (
          <UsersRound />
        ) : (
          <Sparkles />
        )}
      </div>
      <p className="eyebrow">{kind}</p>
      <h1>Coming soon</h1>
      <p>
        This section is being prepared and will be available with the next
        content update.
      </p>
      <Link className="secondary-link" href="/">
        Return home
      </Link>
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
            <Link href={item.href} key={`${item.title}-${index}`}>
              <div>
                <strong>{item.title}</strong>
                <span>{item.meta}</span>
              </div>
              <ChevronRight size={17} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const footerFish = [
  {
    top: "8px",
    size: "20px",
    duration: "112s",
    delay: "-38s",
    from: "-8vw",
    midA: "34vw",
    midB: "67vw",
    midC: "91vw",
    to: "108vw",
    face: 1,
    driftY: "5px",
    riseY: "-4px",
    opacity: 0.54,
    filter: "hue-rotate(18deg) saturate(1.22)",
    playback: 0.28,
  },
  {
    top: "24px",
    size: "17px",
    duration: "136s",
    delay: "-84s",
    from: "108vw",
    midA: "72vw",
    midB: "39vw",
    midC: "13vw",
    to: "-8vw",
    face: -1,
    driftY: "4px",
    riseY: "-3px",
    opacity: 0.48,
    filter: "hue-rotate(150deg) saturate(1.18) brightness(1.06)",
    playback: 0.24,
  },
  {
    top: "15px",
    size: "23px",
    duration: "128s",
    delay: "-12s",
    from: "-12vw",
    midA: "29vw",
    midB: "62vw",
    midC: "89vw",
    to: "112vw",
    face: 1,
    driftY: "6px",
    riseY: "-5px",
    opacity: 0.6,
    filter: "hue-rotate(285deg) saturate(1.16)",
    playback: 0.3,
  },
  {
    top: "31px",
    size: "18px",
    duration: "104s",
    delay: "-62s",
    from: "110vw",
    midA: "76vw",
    midB: "43vw",
    midC: "16vw",
    to: "-10vw",
    face: -1,
    driftY: "4px",
    riseY: "-3px",
    opacity: 0.5,
    filter: "hue-rotate(55deg) saturate(1.24) brightness(1.03)",
    playback: 0.26,
  },
  {
    top: "3px",
    size: "16px",
    duration: "148s",
    delay: "-111s",
    from: "104vw",
    midA: "69vw",
    midB: "38vw",
    midC: "12vw",
    to: "-9vw",
    face: -1,
    driftY: "3px",
    riseY: "-3px",
    opacity: 0.46,
    filter: "hue-rotate(215deg) saturate(1.08)",
    playback: 0.22,
  },
  {
    top: "37px",
    size: "21px",
    duration: "119s",
    delay: "-47s",
    from: "-10vw",
    midA: "31vw",
    midB: "63vw",
    midC: "87vw",
    to: "106vw",
    face: 1,
    driftY: "5px",
    riseY: "-4px",
    opacity: 0.52,
    filter: "hue-rotate(325deg) saturate(1.12) brightness(1.04)",
    playback: 0.27,
  },
  {
    top: "12px",
    size: "26px",
    duration: "98s",
    delay: "-23s",
    from: "-15vw",
    midA: "25vw",
    midB: "58vw",
    midC: "83vw",
    to: "115vw",
    face: 1,
    driftY: "7px",
    riseY: "-6px",
    opacity: 0.62,
    filter: "hue-rotate(200deg) saturate(1.3) brightness(1.1)",
    playback: 0.32,
  },
  {
    top: "28px",
    size: "19px",
    duration: "142s",
    delay: "-75s",
    from: "106vw",
    midA: "70vw",
    midB: "35vw",
    midC: "10vw",
    to: "-12vw",
    face: -1,
    driftY: "5px",
    riseY: "-4px",
    opacity: 0.55,
    filter: "hue-rotate(80deg) saturate(1.2)",
    playback: 0.25,
  },
  {
    top: "18px",
    size: "22px",
    duration: "110s",
    delay: "-50s",
    from: "-10vw",
    midA: "33vw",
    midB: "66vw",
    midC: "90vw",
    to: "110vw",
    face: 1,
    driftY: "4px",
    riseY: "-3px",
    opacity: 0.58,
    filter: "hue-rotate(340deg) saturate(1.25)",
    playback: 0.29,
  },
  {
    top: "6px",
    size: "15px",
    duration: "130s",
    delay: "-95s",
    from: "105vw",
    midA: "68vw",
    midB: "36vw",
    midC: "14vw",
    to: "-6vw",
    face: -1,
    driftY: "3px",
    riseY: "-2px",
    opacity: 0.44,
    filter: "hue-rotate(160deg) saturate(1.1)",
    playback: 0.21,
  },
  {
    top: "34px",
    size: "25px",
    duration: "105s",
    delay: "-15s",
    from: "-12vw",
    midA: "28vw",
    midB: "60vw",
    midC: "85vw",
    to: "112vw",
    face: 1,
    driftY: "6px",
    riseY: "-5px",
    opacity: 0.65,
    filter: "hue-rotate(40deg) saturate(1.35) brightness(1.05)",
    playback: 0.31,
  },
  {
    top: "9px",
    size: "42px",
    duration: "46s",
    delay: "-9s",
    from: "0",
    midA: "0",
    midB: "0",
    midC: "0",
    to: "0",
    face: 1,
    driftY: "4px",
    riseY: "-4px",
    opacity: 0.72,
    filter: "hue-rotate(95deg) saturate(1.28) brightness(1.08)",
    playback: 0.23,
    wander: true,
  },
];

function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-wave-background" aria-hidden="true">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 1600 260"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="footer-wave-back-gradient" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(126, 194, 255, 0.46)" />
              <stop offset="100%" stopColor="rgba(74, 139, 226, 0.2)" />
            </linearGradient>
            <linearGradient id="footer-wave-mid-gradient" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(91, 166, 247, 0.58)" />
              <stop offset="100%" stopColor="rgba(48, 116, 217, 0.34)" />
            </linearGradient>
            <linearGradient id="footer-wave-front-gradient" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(62, 144, 238, 0.68)" />
              <stop offset="100%" stopColor="rgba(35, 101, 205, 0.54)" />
            </linearGradient>
            <path
              id="footer-wave-back"
              fill="url(#footer-wave-back-gradient)"
              d="M-320 46 C-120 10 38 68 230 38 C430 8 586 58 778 34 C1002 6 1138 70 1328 42 C1496 18 1608 28 1760 56 L1760 260 L-320 260 Z"
            />
            <path
              id="footer-wave-mid"
              fill="url(#footer-wave-mid-gradient)"
              d="M-320 80 C-98 38 56 100 250 64 C454 28 604 92 798 58 C1012 26 1146 104 1340 68 C1508 40 1610 54 1760 86 L1760 260 L-320 260 Z"
            />
            <path
              id="footer-wave-front"
              fill="url(#footer-wave-front-gradient)"
              d="M-320 112 C-98 70 50 132 252 94 C470 52 612 120 810 86 C1018 52 1160 132 1358 96 C1518 70 1624 84 1760 118 L1760 260 L-320 260 Z"
            />
          </defs>
          <g>
            <use href="#footer-wave-back" opacity=".62">
              <animateTransform
                attributeName="transform"
                type="translate"
                dur="7s"
                values="240 0; -280 14; 240 0"
                keyTimes="0; .5; 1"
                repeatCount="indefinite"
              />
            </use>
            <use href="#footer-wave-mid" opacity=".72">
              <animateTransform
                attributeName="transform"
                type="translate"
                dur="5s"
                values="-260 0; 230 -12; -260 0"
                keyTimes="0; .55; 1"
                repeatCount="indefinite"
              />
            </use>
            <use href="#footer-wave-front" opacity=".78">
              <animateTransform
                attributeName="transform"
                type="translate"
                dur="3.8s"
                values="80 0; -170 -10; 80 0"
                keyTimes="0; .45; 1"
                repeatCount="indefinite"
              />
            </use>
          </g>
        </svg>
        <div className="footer-sea-life">
          {footerFish.map((fish, index) => (
            <LottieIcon
              key={index}
              path="/lottie/fish.json"
              speed={fish.playback}
              className={`footer-fish ${fish.wander ? "footer-fish-wander" : ""}`}
              style={
                {
                  "--fish-top": fish.top,
                  "--fish-size": fish.size,
                  "--fish-duration": fish.duration,
                  "--fish-delay": fish.delay,
                  "--fish-from": fish.from || "0",
                  "--fish-mid-a": fish.midA || "0",
                  "--fish-mid-b": fish.midB || "0",
                  "--fish-mid-c": fish.midC || "0",
                  "--fish-to": fish.to || "0",
                  "--fish-face": fish.face || 1,
                  "--fish-drift-y": fish.driftY || "4px",
                  "--fish-rise-y": fish.riseY || "-4px",
                  "--fish-opacity": fish.opacity,
                  "--fish-filter": fish.filter || "none",
                } as React.CSSProperties
              }
            />
          ))}
          <span className="footer-jellyfish footer-jellyfish-1" />
          <span className="footer-jellyfish footer-jellyfish-2" />
          <span className="footer-jellyfish footer-jellyfish-3" />
          <span className="footer-jellyfish footer-jellyfish-4" />
          <span className="footer-bubble footer-bubble-1" />
          <span className="footer-bubble footer-bubble-2" />
          <span className="footer-bubble footer-bubble-3" />
          <span className="footer-bubble footer-bubble-4" />
          <span className="footer-bubble footer-bubble-5" />
          <span className="footer-bubble footer-bubble-6" />
        </div>
      </div>
      <div className="footer-wave-content">
        <div className="footer-wave-container">
          © Copyright 2026 Dr. Mritunjay Shall Peelam. Last updated: July 31, 2026.
        </div>
      </div>
    </footer>
  );
}

export function PortfolioApp({ section = "home" }: { section?: string }) {
  const safeSection = (
    [
      "home",
      ...primaryNav.map((item) => item.key),
      ...moreNav.map((item) => item.key),
      "news",
      "repositories",
      "books",
      "profiles",
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
    document.documentElement.dataset.theme = initial;
    const frame = window.requestAnimationFrame(() => setTheme(initial));
    return () => window.cancelAnimationFrame(frame);
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
    case "game":
      content = <GamePage />;
      break;
    case "daily-mantra":
      content = <DailyMantraPage />;
      break;
    case "bhagwatgita":
      content = <ComingSoonPage kind="Bhagwatgita" />;
      break;
    case "ramayan":
      content = <ComingSoonPage kind="Ramayan" />;
      break;
    case "quantum-computation":
      content = <ComingSoonPage kind="Quantum Computing" />;
      break;
    case "blockchain":
      content = <ComingSoonPage kind="Blockchain" />;
      break;
    case "poems":
      content = <ComingSoonPage kind="Poems" />;
      break;
    case "motivations":
      content = <ComingSoonPage kind="Motivations" />;
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
      <LiveUpdateRefresh />
      <Header
        section={safeSection}
        theme={theme}
        onTheme={toggleTheme}
        onSearch={() => setSearchOpen(true)}
      />
      <main className="site-main">{content}</main>
      <Footer />
      <ScrollJumpButton pageKey={safeSection} />
      {searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} />}
    </div>
  );
}
