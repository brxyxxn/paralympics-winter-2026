import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import {
  Trophy,
  Users,
  Star,
  Snowflake,
  Flag,
  Heart,
  Target,
  Mountain,
  ChevronDown,
  ExternalLink,
  Accessibility,
  Sparkles,
  Sun,
  Moon,
  Clock,
  User,
  Timer,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Share2,
  RotateCcw,
  Zap,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { athletes } from "@/data/athletes";
import crisImg from "@assets/cris_1772402480940.png";

const funFacts = [
  {
    athlete: "Cristian Ribera",
    sport: "Esqui Cross-Country",
    iconColor: "text-yellow-500",
    fact: "Nasceu em Cerejeiras, Rondônia, e viu neve pela primeira vez aos 14 anos na Suécia. Passou por mais de 21 cirurgias nas pernas desde o nascimento. Em PyeongChang 2018, com apenas 15 anos, foi o atleta mais jovem dos Jogos e conquistou o 6º lugar - melhor resultado brasileiro da história! Durante a pandemia, treinou em casa com sacos de arroz e feijão. Sua irmã Eduarda Ribera também é atleta de esqui cross-country e seu irmão Fábio é seu treinador, eleito Treinador da Temporada 2024/25 pela CBDN.",
  },
  {
    athlete: "Aline Rocha",
    sport: "Esqui Cross-Country / Biathlon",
    iconColor: "text-pink-500",
    fact: "Nascida em Pinhão, no Paraná, sofreu um acidente de carro aos 15 anos que causou paraplegia. Antes do esqui, foi atleta de atletismo paralímpico, competiu nos Jogos Rio 2016 e venceu a Corrida de São Silvestre 5 vezes! Conheceu o treinador Fernando Orso num evento esportivo - ele se tornou seu técnico e marido. Menos de 1 ano após ver neve pela primeira vez, já competia na Copa do Mundo!",
  },
  {
    athlete: "André Barbieri",
    sport: "Snowboard",
    iconColor: "text-red-500",
    fact: "Em 2011, sofreu um grave acidente de snowboard em Mammoth Mountain, Califórnia, que resultou na amputação acima do joelho. Voltou a competir no MESMO esporte que lhe custou a perna! Chama o dia do acidente de 'ampuversary' e celebra como uma data positiva. Além de atleta, é músico e palestrante motivacional. Comparou sua jornada ao filme 'Jamaica Abaixo de Zero'.",
  },
  {
    athlete: "Wellington Silva",
    sport: "Esqui Cross-Country",
    iconColor: "text-green-600",
    fact: "Descobriu o esqui aos 13 anos de forma inusitada: enquanto andava de skate na rua em Jundiaí, foi abordado por Fábio Ribera, que o convidou para conhecer o roller esqui. Em 2020, com apenas 14 anos, viajou para um intercâmbio de base na Coreia do Sul! É o atleta mais jovem da delegação, com apenas 19 anos.",
  },
  {
    athlete: "Elena Sena",
    sport: "Esqui Cross-Country / Biathlon",
    iconColor: "text-purple-500",
    fact: "Nascida em Francisco Morato, SP, com má-formação congênita na perna direita. Começou no handebol e descobriu o vôlei sentado aos 15 anos na Escola Paralímpica do CPB, porta de entrada para o mundo paralímpico. Conquistou ouro no sprint na Copa Continental da Noruega em 2023. Estreia nos Jogos com apenas 22 anos!",
  },
  {
    athlete: "Robelson Lula",
    sport: "Esqui Cross-Country / Biathlon",
    iconColor: "text-orange-500",
    fact: "Nascido em Juru, no sertão da Paraíba, onde a temperatura média é de 30 graus! Perdeu a perna direita aos 11 anos por causa de um câncer ósseo (osteosarcoma). Descobriu o esqui após uma palestra e se tornou revelação do ranking nacional de para-rollerski em 2019. Saiu do sertão nordestino para competir na neve europeia!",
  },
  {
    athlete: "Vitória Machado",
    sport: "Snowboard",
    iconColor: "text-teal-500",
    fact: "Gaúcha de 21 anos, começou no esporte pela patinação artística antes de migrar para o snowboard. Treina no Snowland Park em Gramado, RS, apenas aos sábados! Mesmo com tempo limitado de treino, conquistou 2 ouros na Copa Europeia e recebeu convite especial da FIS para os Jogos. É a primeira mulher amputada a representar o Brasil no snowboard!",
  },
];

type ScheduleAthlete = {
  name: string;
  time: string;
  category: string;
  gender: "Feminino" | "Masculino" | "Misto";
};

type ScheduleEvent = {
  event: string;
  location: string;
  athletes: ScheduleAthlete[];
};

type ScheduleDay = {
  date: string;
  day: string;
  sport: "cross-country" | "biathlon" | "snowboard" | "cerimonia";
  events: ScheduleEvent[];
};

const crossCountrySchedule: ScheduleDay[] = [
  {
    date: "10/03",
    day: "Terça",
    sport: "cross-country",
    events: [
      {
        event: "Sprint Clássico - Qualificação",
        location: "Tesero, Val di Fiemme",
        athletes: [
          { name: "Aline Rocha", time: "09:45", category: "Sitting", gender: "Feminino" },
          { name: "Elena Sena", time: "09:45", category: "Sitting", gender: "Feminino" },
          { name: "Cristian Ribera", time: "10:15", category: "Sitting", gender: "Masculino" },
          { name: "Guilherme C. Rocha", time: "10:15", category: "Sitting", gender: "Masculino" },
          { name: "Robelson Lula", time: "10:15", category: "Sitting", gender: "Masculino" },
          { name: "Wellington Silva", time: "11:00", category: "Standing", gender: "Masculino" },
        ],
      },
      {
        event: "Sprint Clássico - Semifinais e Finais",
        location: "Tesero, Val di Fiemme",
        athletes: [
          { name: "Aline Rocha", time: "12:15", category: "Sitting", gender: "Feminino" },
          { name: "Elena Sena", time: "12:15", category: "Sitting", gender: "Feminino" },
          { name: "Cristian Ribera", time: "13:00", category: "Sitting", gender: "Masculino" },
          { name: "Guilherme C. Rocha", time: "13:00", category: "Sitting", gender: "Masculino" },
          { name: "Robelson Lula", time: "13:00", category: "Sitting", gender: "Masculino" },
          { name: "Wellington Silva", time: "14:00", category: "Standing", gender: "Masculino" },
        ],
      },
    ],
  },
  {
    date: "11/03",
    day: "Quarta",
    sport: "cross-country",
    events: [
      {
        event: "Média Distância Clássico (10km/12km)",
        location: "Tesero, Val di Fiemme",
        athletes: [
          { name: "Aline Rocha", time: "09:45", category: "Sitting", gender: "Feminino" },
          { name: "Elena Sena", time: "09:45", category: "Sitting", gender: "Feminino" },
          { name: "Cristian Ribera", time: "11:00", category: "Sitting", gender: "Masculino" },
          { name: "Guilherme C. Rocha", time: "11:00", category: "Sitting", gender: "Masculino" },
          { name: "Robelson Lula", time: "11:00", category: "Sitting", gender: "Masculino" },
          { name: "Wellington Silva", time: "12:30", category: "Standing", gender: "Masculino" },
        ],
      },
    ],
  },
  {
    date: "14/03",
    day: "Sábado",
    sport: "cross-country",
    events: [
      {
        event: "Revezamento Misto 4x2.5km",
        location: "Tesero, Val di Fiemme",
        athletes: [
          { name: "Equipe Brasil", time: "10:00", category: "Misto", gender: "Misto" },
        ],
      },
    ],
  },
  {
    date: "15/03",
    day: "Domingo",
    sport: "cross-country",
    events: [
      {
        event: "Longa Distância Livre (20km)",
        location: "Tesero, Val di Fiemme",
        athletes: [
          { name: "Aline Rocha", time: "09:45", category: "Sitting", gender: "Feminino" },
          { name: "Elena Sena", time: "09:45", category: "Sitting", gender: "Feminino" },
          { name: "Cristian Ribera", time: "11:15", category: "Sitting", gender: "Masculino" },
          { name: "Guilherme C. Rocha", time: "11:15", category: "Sitting", gender: "Masculino" },
          { name: "Robelson Lula", time: "11:15", category: "Sitting", gender: "Masculino" },
          { name: "Wellington Silva", time: "13:00", category: "Standing", gender: "Masculino" },
        ],
      },
    ],
  },
];

const biathlonSchedule: ScheduleDay[] = [
  {
    date: "07/03",
    day: "Sexta",
    sport: "biathlon",
    events: [
      {
        event: "Sprint 7.5km",
        location: "Tesero, Val di Fiemme",
        athletes: [
          { name: "Aline Rocha", time: "10:00", category: "Sitting", gender: "Feminino" },
          { name: "Elena Sena", time: "10:00", category: "Sitting", gender: "Feminino" },
          { name: "Guilherme C. Rocha", time: "10:30", category: "Sitting", gender: "Masculino" },
          { name: "Robelson Lula", time: "10:30", category: "Sitting", gender: "Masculino" },
        ],
      },
    ],
  },
  {
    date: "08/03",
    day: "Sábado",
    sport: "biathlon",
    events: [
      {
        event: "Individual 12.5km",
        location: "Tesero, Val di Fiemme",
        athletes: [
          { name: "Aline Rocha", time: "10:00", category: "Sitting", gender: "Feminino" },
          { name: "Elena Sena", time: "10:00", category: "Sitting", gender: "Feminino" },
          { name: "Guilherme C. Rocha", time: "11:00", category: "Sitting", gender: "Masculino" },
          { name: "Robelson Lula", time: "11:00", category: "Sitting", gender: "Masculino" },
        ],
      },
    ],
  },
  {
    date: "13/03",
    day: "Quinta",
    sport: "biathlon",
    events: [
      {
        event: "Sprint Pursuit",
        location: "Tesero, Val di Fiemme",
        athletes: [
          { name: "Aline Rocha", time: "10:00", category: "Sitting", gender: "Feminino" },
          { name: "Elena Sena", time: "10:00", category: "Sitting", gender: "Feminino" },
          { name: "Guilherme C. Rocha", time: "11:00", category: "Sitting", gender: "Masculino" },
          { name: "Robelson Lula", time: "11:00", category: "Sitting", gender: "Masculino" },
        ],
      },
    ],
  },
];

const snowboardSchedule: ScheduleDay[] = [
  {
    date: "07/03",
    day: "Sexta",
    sport: "snowboard",
    events: [
      {
        event: "Snowboard Cross - Classificação",
        location: "Cortina d'Ampezzo",
        athletes: [
          { name: "Vitória Machado", time: "10:00", category: "SB-LL2", gender: "Feminino" },
          { name: "André Barbieri", time: "11:00", category: "SB-LL1", gender: "Masculino" },
        ],
      },
    ],
  },
  {
    date: "08/03",
    day: "Sábado",
    sport: "snowboard",
    events: [
      {
        event: "Snowboard Cross - Finais",
        location: "Cortina d'Ampezzo",
        athletes: [
          { name: "Vitória Machado", time: "10:00", category: "SB-LL2", gender: "Feminino" },
          { name: "André Barbieri", time: "11:00", category: "SB-LL1", gender: "Masculino" },
        ],
      },
    ],
  },
  {
    date: "14/03",
    day: "Sábado",
    sport: "snowboard",
    events: [
      {
        event: "Banked Slalom",
        location: "Cortina d'Ampezzo",
        athletes: [
          { name: "Vitória Machado", time: "10:00", category: "SB-LL2", gender: "Feminino" },
          { name: "André Barbieri", time: "11:00", category: "SB-LL1", gender: "Masculino" },
        ],
      },
    ],
  },
];

const ceremonySchedule: ScheduleDay[] = [
  {
    date: "06/03",
    day: "Quinta",
    sport: "cerimonia",
    events: [
      {
        event: "Cerimônia de Abertura",
        location: "Milano",
        athletes: [{ name: "Toda a delegação", time: "20:00", category: "", gender: "Misto" }],
      },
    ],
  },
  {
    date: "15/03",
    day: "Domingo",
    sport: "cerimonia",
    events: [
      {
        event: "Cerimônia de Encerramento",
        location: "Milano",
        athletes: [{ name: "Toda a delegação", time: "20:00", category: "", gender: "Misto" }],
      },
    ],
  },
];

const historyData = [
  {
    year: 2014,
    city: "Sochi, Rússia",
    athletes: 2,
    sports: ["Esqui Alpino", "Esqui Cross-Country"],
    highlight: "Estreia histórica do Brasil nos Jogos Paralímpicos de Inverno! André Cintra (esqui alpino) e Fernando Aranha (esqui cross-country) abriram o caminho.",
    icon: "flag",
  },
  {
    year: 2018,
    city: "PyeongChang, Coreia do Sul",
    athletes: 3,
    sports: ["Esqui Cross-Country", "Snowboard"],
    highlight: "Cristian Ribera, com apenas 15 anos, conquista o 6º lugar nos 15km - melhor resultado brasileiro da história! Aline Rocha se torna a primeira mulher brasileira em Paralimpíadas de Inverno.",
    icon: "star",
  },
  {
    year: 2022,
    city: "Pequim, China",
    athletes: 6,
    sports: ["Esqui Cross-Country", "Snowboard"],
    highlight: "Maior delegação até então com 6 atletas. Aline Rocha foi 7ª na longa distância (melhor resultado feminino brasileiro). Cristian Ribera alcançou o 9º lugar no sprint, chegando às semifinais pela primeira vez. Equipe terminou em 8º no revezamento misto.",
    icon: "users",
  },
  {
    year: 2026,
    city: "Milano Cortina, Itália",
    athletes: 8,
    sports: ["Esqui Cross-Country", "Biathlon", "Snowboard"],
    highlight: "Delegação recorde com 8 atletas! Cristian Ribera chega como campeão mundial e favorito à primeira medalha paralímpica de inverno do Brasil. Estreia do biathlon.",
    icon: "trophy",
  },
];

const iconMap: Record<string, typeof Trophy> = {
  flag: Flag,
  users: Users,
  star: Star,
  trophy: Trophy,
};

function AgitosLogo({ size = 24 }: { size?: number }) {
  const s = size;
  const r = s * 0.28;
  return (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Símbolo Paralímpico - Agitos">
      <path d="M30 20 C10 20, 5 50, 25 55 C15 45, 18 28, 30 25 Z" fill="#0085C8" />
      <path d="M50 10 C30 10, 25 45, 50 50 C35 40, 38 18, 50 15 Z" fill="#F00" />
      <path d="M70 25 C50 25, 48 55, 70 60 C55 50, 58 33, 70 30 Z" fill="#00A651" />
    </svg>
  );
}

function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const headerHeight = 56;
    const targetPosition = el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let start: number | null = null;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = easeInOutCubic(progress);
      window.scrollTo(0, startPosition + distance * eased);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const navItems = [
    { label: "Início", id: "intro" },
    { label: "Atletas", id: "athletes" },
    { label: "Calendário", id: "schedule" },
    { label: "Curiosidades", id: "curiosidades" },
    { label: "Quiz", id: "quiz" },
    { label: "História", id: "history" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b" data-testid="header">
      <div className="container mx-auto px-4 max-w-5xl">
        <nav className="flex items-center justify-between gap-2 h-14">
          <div className="flex items-center gap-2" data-testid="nav-brand">
            <AgitosLogo size={22} />
            <span className="font-bold text-sm">Paralimpíadas 2026</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollTo(item.id)}
                  data-testid={`nav-${item.id}`}
                >
                  {item.label}
                </Button>
              ))}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t bg-background/95 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 max-w-5xl py-3 flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-left px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-slate-800 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
                  data-testid={`nav-mobile-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  const targetDate = new Date("2026-03-06T20:00:00+01:00").getTime();

  const calcTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const diff = targetDate - now;
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
      ended: false,
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [calcTimeLeft]);

  const units = [
    { label: "Dias", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Seg", value: timeLeft.seconds },
  ];

  return (
    <section id="intro" className="relative overflow-hidden" data-testid="section-hero">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-red-500 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-blue-500 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-green-400 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 max-w-5xl py-10 sm:py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <AgitosLogo size={28} />
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 no-default-hover-elevate no-default-active-elevate" data-testid="badge-date">
              6-15 Março 2026
            </Badge>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight" data-testid="text-hero-title">
            Brasil nas Paralimpíadas
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-teal-200 to-emerald-300">
              de Inverno 2026
            </span>
          </h1>

          <div className="max-w-2xl mx-auto mb-8 space-y-3 text-white/70 text-sm md:text-base leading-relaxed">
            <p>
              De <span className="font-bold text-white/90">Sochi 2014</span> até{" "}
              <span className="font-bold text-white/90">Milano Cortina 2026</span>, o Brasil
              construiu uma trajetória de mais de 10 anos nos esportes paralímpicos de inverno.
              O que começou com poucos pioneiros enfrentando a neve pela primeira vez se transformou
              em uma delegação cada vez mais competitiva, com{" "}
              <span className="font-bold text-white/90">8 atletas em 3 modalidades</span>.
            </p>
            <p>
              A edição de 2026 pode entrar para a história com a possibilidade real de conquista da{" "}
              <span className="font-bold text-emerald-300">primeira medalha paralímpica de inverno do Brasil</span>,
              liderada por Cristian Ribera, atual campeão mundial e número 1 do ranking no esqui
              cross-country sitting.
            </p>
            <p>
              Nesta página você encontra o <span className="font-semibold text-white/90">perfil de cada atleta</span>,
              o <span className="font-semibold text-white/90">calendário completo com horários de início das provas</span>,
              curiosidades e a <span className="font-semibold text-white/90">história de todas as participações brasileiras</span> nos
              Jogos Paralímpicos de Inverno.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-10">
            {[
              { value: "8", label: "Atletas", icon: Users },
              { value: "3", label: "Esportes", icon: Mountain },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center"
                data-testid={`stat-${stat.label.toLowerCase()}`}
              >
                <stat.icon className="w-5 h-5 text-emerald-300 mx-auto mb-1" />
                <div className="text-2xl md:text-3xl font-black text-white">{stat.value}</div>
                <div className="text-xs text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8" data-testid="section-countdown">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-5">
              <Timer className="w-4 h-4 text-white" />
              <span className="text-[10px] sm:text-xs font-bold text-white/90 uppercase tracking-widest">
                {timeLeft.ended ? "Os Jogos Comecaram!" : "Cerimonia de Abertura"}
              </span>
            </div>
            {!timeLeft.ended && (
              <div className="flex items-center justify-center gap-3 sm:gap-5">
                {units.map((unit, i) => (
                  <div key={unit.label} className="flex items-center gap-3 sm:gap-5">
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 sm:w-18 sm:h-18 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                        <AnimatePresence mode="popLayout">
                          <motion.span
                            key={unit.value}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-xl sm:text-2xl font-black text-white tabular-nums"
                          >
                            {String(unit.value).padStart(2, "0")}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-bold text-white/50 mt-1 uppercase tracking-wider">{unit.label}</span>
                    </div>
                    {i < units.length - 1 && (
                      <span className="text-xl font-black text-white/30 -mt-4">:</span>
                    )}
                  </div>
                ))}
              </div>
            )}
            {timeLeft.ended && (
              <p className="text-lg font-black text-white mt-2">Acompanhe as provas ao vivo!</p>
            )}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

function HighlightCard() {
  return (
    <section className="py-12 bg-background" data-testid="section-highlight">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative bg-gradient-to-br from-teal-50/80 via-white to-emerald-50/60 dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-800 rounded-2xl border border-teal-200 dark:border-teal-700/30 p-6 md:p-10 overflow-hidden min-h-[260px] md:min-h-[240px] shadow-md" data-testid="card-highlight">
            <div className="absolute inset-0 opacity-5 dark:opacity-10">
              <div className="absolute top-20 right-20 w-80 h-80 bg-teal-500 rounded-full blur-3xl" />
              <div className="absolute bottom-10 left-10 w-60 h-60 bg-emerald-500 rounded-full blur-3xl" />
            </div>

            <div className="relative flex flex-col-reverse md:flex-row items-center gap-6 md:gap-10">
              <div className="flex-1 text-center md:text-left">
                <span className="inline-block px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 text-xs md:text-sm font-semibold tracking-wide mb-4" data-testid="badge-highlight">
                  Principal Destaque
                </span>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-3 leading-tight" data-testid="text-highlight-title">
                  Cristian Ribera
                </h2>

                <p className="text-xs md:text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">
                  Campeão Mundial 2025 - Globo de Cristal
                </p>

                <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl" data-testid="text-highlight-description">
                  Nascido em Cerejeiras, Rondônia, Cristian viu neve pela primeira vez aos 14 anos. Passou por mais de 21 cirurgias, e hoje é o número 1 do mundo no esqui cross-country paralímpico. Chega a Milano Cortina 2026 como favorito a conquistar a primeira medalha paralímpica de inverno do Brasil.
                </p>

                <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                  <Badge variant="secondary" className="no-default-hover-elevate no-default-active-elevate text-xs">
                    Esqui Cross-Country
                  </Badge>
                  <Badge variant="secondary" className="no-default-hover-elevate no-default-active-elevate text-xs">
                    Sitting
                  </Badge>
                  <Badge variant="secondary" className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 no-default-hover-elevate no-default-active-elevate text-xs">
                    Favorito à medalha
                  </Badge>
                </div>
              </div>

              <div className="shrink-0 flex flex-col items-center gap-3">
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 overflow-hidden shadow-2xl border-4 border-white dark:border-slate-700">
                    <img src={crisImg} alt="Cristian Ribera" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-yellow-400 dark:bg-yellow-500 text-yellow-900 rounded-full p-2 shadow-lg" data-testid="icon-medal-hope">
                    <Trophy className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">3a Paralimpiada</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">N.1 do Ranking Mundial</p>
                </div>
              </div>
            </div>

            <div className="relative mt-6 pt-6 border-t border-teal-200/40 dark:border-teal-700/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "PyeongChang 2018", value: "6º lugar", detail: "15 anos de idade" },
                  { label: "Mundial 2025", value: "Ouro", detail: "Sprint sitting" },
                  { label: "Copa do Mundo", value: "Globo de Cristal", detail: "Campeão geral" },
                  { label: "Cirurgias", value: "+21", detail: "Desde o nascimento" },
                ].map((item) => (
                  <div key={item.label} className="text-center md:text-left" data-testid={`highlight-stat-${item.label}`}>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.label}</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{item.value}</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AthletesSection() {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [expandedBios, setExpandedBios] = useState<Set<number>>(new Set());
  const sportFilters = [
    { label: "Esqui Cross-Country", match: "Esqui Cross-Country" },
    { label: "Biathlon", match: "Biathlon" },
    { label: "Snowboard", match: "Snowboard" },
  ];
  const filtered = selectedSport
    ? athletes.filter((a) => a.sport.includes(selectedSport))
    : athletes;

  return (
    <section id="athletes" className="py-16 bg-background" data-testid="section-athletes">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <Badge variant="secondary" className="mb-3 no-default-hover-elevate no-default-active-elevate">
            <Users className="w-3 h-3 mr-1" />
            Delegação Brasileira
          </Badge>
          <h2 className="text-2xl md:text-3xl font-black mb-2" data-testid="text-athletes-title">
            Nossos Atletas
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Conheça os 8 atletas que representam o Brasil nos Jogos Paralímpicos de Inverno
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button
            variant={selectedSport === null ? "default" : "secondary"}
            size="sm"
            onClick={() => setSelectedSport(null)}
            data-testid="filter-all"
          >
            Todos
          </Button>
          {sportFilters.map((filter) => (
            <Button
              key={filter.match}
              variant={selectedSport === filter.match ? "default" : "secondary"}
              size="sm"
              onClick={() => setSelectedSport(filter.match)}
              data-testid={`filter-${filter.match}`}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {filtered.map((athlete, index) => {
            const isExpanded = expandedBios.has(athlete.id);
            const bioTruncated = athlete.bio.length > 100;
            const displayBio = bioTruncated && !isExpanded
              ? athlete.bio.substring(0, 100) + "..."
              : athlete.bio;

            return (
              <motion.div
                key={athlete.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link href={`/atleta/${athlete.id}`} className="block h-full">
                <div
                  className="relative bg-white dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-800 dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/30 overflow-hidden h-full flex flex-col cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  data-testid={`card-athlete-${athlete.id}`}
                >
                  <div className={`relative w-full aspect-[3/4] bg-gradient-to-br ${athlete.gradient} overflow-hidden`}>
                    <img src={athlete.photo} alt={athlete.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3">
                      <h3 className="font-black text-sm sm:text-base md:text-lg text-white leading-tight drop-shadow-lg" data-testid={`text-athlete-name-${athlete.id}`}>
                        {athlete.name}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-white/80 mt-0.5">{athlete.age} anos</p>
                    </div>
                  </div>

                  <div className="hidden sm:flex flex-col gap-1.5 px-4 py-2.5 border-b border-slate-200/50 dark:border-slate-700/30">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open("https://www.instagram.com/brasilnaneve", "_blank");
                      }}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:underline underline-offset-2 transition-colors cursor-pointer text-left"
                      data-testid={`link-cbdn-${athlete.id}`}
                    >
                      <SiInstagram className="w-3.5 h-3.5 shrink-0" />
                      <span>CBDN - @brasilnaneve</span>
                    </button>
                    {athlete.instagram && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(athlete.instagram, "_blank");
                        }}
                        className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:underline underline-offset-2 transition-colors cursor-pointer text-left"
                        data-testid={`link-instagram-${athlete.id}`}
                      >
                        <SiInstagram className="w-3.5 h-3.5 shrink-0" />
                        <span>@{athlete.instagram.split("/").filter(Boolean).pop()}</span>
                      </button>
                    )}
                  </div>

                  <div className="p-2.5 sm:p-4 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
                      <Badge variant="secondary" className="text-[9px] sm:text-[10px] no-default-hover-elevate no-default-active-elevate">
                        {athlete.sport}
                      </Badge>
                      <Badge variant="secondary" className="text-[9px] sm:text-[10px] no-default-hover-elevate no-default-active-elevate">
                        {athlete.category}
                      </Badge>
                      <Badge variant="secondary" className={`text-[9px] sm:text-[10px] no-default-hover-elevate no-default-active-elevate ${athlete.paralympics === "Estreante" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300" : ""}`}>
                        {athlete.paralympics}
                      </Badge>
                    </div>

                    <div className="flex-1">
                      <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed hidden sm:block">
                        {displayBio}
                      </p>
                      {bioTruncated && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setExpandedBios((prev) => {
                              const next = new Set(prev);
                              if (next.has(athlete.id)) {
                                next.delete(athlete.id);
                              } else {
                                next.add(athlete.id);
                              }
                              return next;
                            });
                          }}
                          className="text-xs font-medium mt-1 cursor-pointer text-teal-600 dark:text-teal-400 hidden sm:inline"
                          data-testid={`button-bio-toggle-${athlete.id}`}
                        >
                          {isExpanded ? "Ver menos" : "Ver mais"}
                        </button>
                      )}
                    </div>

                    <div className="hidden sm:block pt-3 mt-3 border-t border-slate-200/50 dark:border-slate-700/30">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        Provas
                      </h4>
                      <ul className="space-y-1">
                        {athlete.events.map((event, i) => (
                          <li key={i} className="flex items-center justify-between gap-2 text-xs">
                            <span className="text-slate-700 dark:text-slate-300">{event.name}</span>
                            <span className="shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300">{event.startTime}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AthleteScheduleRow({ athlete, index, sportColor }: { athlete: ScheduleAthlete; index: number; sportColor: string }) {
  const athleteData = athletes.find((a) => {
    const schedFirst = athlete.name.split(" ")[0].toLowerCase();
    const dataFirst = a.name.split(" ")[0].toLowerCase();
    return schedFirst === dataFirst;
  });

  const timeBgMap: Record<string, string> = {
    "teal": "bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300",
    "orange": "bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
    "sky": "bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300",
  };
  const timeIconMap: Record<string, string> = {
    "teal": "text-teal-500 dark:text-teal-400",
    "orange": "text-orange-500 dark:text-orange-400",
    "sky": "text-sky-500 dark:text-sky-400",
  };
  const timeBg = timeBgMap[sportColor] || timeBgMap["teal"];
  const timeIcon = timeIconMap[sportColor] || timeIconMap["teal"];

  const content = (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`flex items-center gap-2 sm:gap-3 py-1.5 sm:py-2 px-1 sm:px-3 rounded-xl transition-all group ${athleteData ? "hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer" : ""}`}
    >
      {athleteData ? (
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm shrink-0 group-hover:border-teal-300 dark:group-hover:border-teal-600 transition-all group-hover:shadow-md">
          <img src={athleteData.photo} alt={athlete.name} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center border-2 border-white dark:border-slate-700 shadow-sm shrink-0">
          <Flag className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className={`text-xs sm:text-sm font-bold truncate text-slate-800 dark:text-slate-200 ${athleteData ? "group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors" : ""}`}>{athlete.name}</p>
        {athlete.category && (
          <p className="text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-500 font-medium">{athlete.category}</p>
        )}
      </div>
      <div className={`flex items-center gap-1 sm:gap-1.5 ${timeBg} px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl shrink-0`}>
        <Clock className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${timeIcon}`} />
        <span className="text-[10px] sm:text-xs font-mono font-black">{athlete.time}</span>
      </div>
      {athleteData && (
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-slate-300 dark:text-slate-600 group-hover:text-teal-500 transition-colors shrink-0 hidden sm:block" />
      )}
    </motion.div>
  );

  if (athleteData) {
    return (
      <Link href={`/atleta/${athleteData.id}`} className="block" data-testid={`schedule-athlete-link-${athleteData.id}`}>
        {content}
      </Link>
    );
  }

  return content;
}

function GenderSection({ label, color, athletes: genderAthletes, startIndex, sportColor }: {
  label: string;
  color: "pink" | "blue";
  athletes: ScheduleAthlete[];
  startIndex: number;
  sportColor: string;
}) {
  const borderColor = color === "pink"
    ? "border-pink-300/60 dark:border-pink-800/40"
    : "border-blue-300/60 dark:border-blue-800/40";
  const labelBg = color === "pink"
    ? "bg-pink-100/80 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400"
    : "bg-blue-100/80 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400";
  const dotColor = color === "pink" ? "bg-pink-400" : "bg-blue-400";

  return (
    <div className={`border-l-2 ${borderColor} pl-2 sm:pl-3 ml-1 sm:ml-2`}>
      <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 mt-1">
        <div className={`w-1.5 h-1.5 rounded-full ${dotColor} -ml-[0.8125rem] sm:-ml-[0.9375rem]`} />
        <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-1.5 sm:px-2 py-0.5 rounded-lg ${labelBg}`}>
          {label}
        </span>
      </div>
      <div className="space-y-0.5">
        {genderAthletes.map((a, i) => (
          <AthleteScheduleRow key={i} athlete={a} index={startIndex + i} sportColor={sportColor} />
        ))}
      </div>
    </div>
  );
}

function ScheduleDayCard({ day, dayIndex }: { day: ScheduleDay; dayIndex: number }) {
  const sportConfig = {
    "cross-country": { gradient: "from-teal-500 to-emerald-600", bg: "bg-teal-500", accent: "teal", label: "Cross-Country" },
    "biathlon": { gradient: "from-orange-500 to-amber-600", bg: "bg-orange-500", accent: "orange", label: "Biathlon" },
    "snowboard": { gradient: "from-sky-500 to-blue-600", bg: "bg-sky-500", accent: "sky", label: "Snowboard" },
    "cerimonia": { gradient: "from-teal-500 to-emerald-600", bg: "bg-teal-500", accent: "teal", label: "Cerimonia" },
  };
  const config = sportConfig[day.sport];

  const dayNumber = day.date.split("/")[0];
  const monthNames: Record<string, string> = { "03": "MAR" };
  const monthStr = monthNames[day.date.split("/")[1]] || "MAR";

  const isCeremony = day.sport === "cerimonia";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: dayIndex * 0.08 }}
    >
      <div className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl ${isCeremony ? "shadow-md" : "shadow-sm hover:shadow-lg"}`} data-testid={`schedule-day-${day.date}`}>
        {isCeremony ? (
          <div className={`bg-gradient-to-r ${config.gradient} p-5 sm:p-6`}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex flex-col items-center justify-center border border-white/30">
                <span className="text-2xl sm:text-3xl font-black text-white leading-none">{dayNumber}</span>
                <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest">{monthStr}</span>
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1">{day.day}</p>
                <h3 className="text-lg sm:text-xl font-black text-white">{day.events[0].event}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg">
                    <Clock className="w-3 h-3 text-white" />
                    <span className="text-xs font-mono font-bold text-white">{day.events[0].athletes[0].time}</span>
                  </div>
                  <span className="text-[10px] text-white/70">{day.events[0].location}</span>
                </div>
              </div>
              <div className="hidden sm:flex w-12 h-12 rounded-full bg-white/10 items-center justify-center">
                <Sparkles className="w-6 h-6 text-white/80" />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/40 rounded-2xl">
            <div className="flex flex-col sm:flex-row sm:items-stretch">
              <div className={`flex sm:flex-col items-center sm:justify-center gap-2 sm:gap-0 sm:w-24 bg-gradient-to-r sm:bg-gradient-to-b ${config.gradient} shrink-0 px-4 py-3 sm:py-5 rounded-t-2xl sm:rounded-t-none sm:rounded-l-2xl relative`}>
                <span className="text-xl sm:text-3xl font-black text-white leading-none">{dayNumber}</span>
                <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest sm:mt-0.5">{monthStr}</span>
                <div className="hidden sm:block w-8 border-t border-white/30 my-1.5" />
                <span className="text-[10px] font-semibold text-white/70 sm:block">— {day.day}</span>
              </div>
              <div className="flex-1 py-3 sm:py-4 px-3 sm:px-5">
                {day.events.map((evt, evtIndex) => {
                  const fem = evt.athletes.filter((a) => a.gender === "Feminino");
                  const masc = evt.athletes.filter((a) => a.gender === "Masculino");
                  const misto = evt.athletes.filter((a) => a.gender === "Misto");

                  return (
                    <div key={evtIndex} data-testid={`event-${day.date}-${evtIndex}`}>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${config.bg} shrink-0`} />
                          <h4 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-200">{evt.event}</h4>
                        </div>
                        <span className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium inline-flex items-center gap-1 w-fit ml-3.5 sm:ml-0">
                          <MapPin className="w-2.5 h-2.5 shrink-0" />
                          {evt.location}
                        </span>
                      </div>

                      {misto.length > 0 && (
                        <div className="space-y-0.5">
                          {misto.map((a, i) => (
                            <AthleteScheduleRow key={i} athlete={a} index={i} sportColor={config.accent} />
                          ))}
                        </div>
                      )}

                      {fem.length > 0 && (
                        <GenderSection label="Feminino" color="pink" athletes={fem} startIndex={0} sportColor={config.accent} />
                      )}

                      {masc.length > 0 && (
                        <div className={fem.length > 0 ? "mt-2" : ""}>
                          <GenderSection label="Masculino" color="blue" athletes={masc} startIndex={fem.length} sportColor={config.accent} />
                        </div>
                      )}

                      {evtIndex < day.events.length - 1 && (
                        <div className="border-b border-dashed border-slate-200/80 dark:border-slate-700/60 my-4" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ScheduleSection() {
  const [activeTab, setActiveTab] = useState<"cross-country" | "biathlon" | "snowboard">("cross-country");

  const tabs = [
    { key: "cross-country" as const, label: "Esqui Cross-Country", shortLabel: "Cross-Country", icon: Mountain, gradient: "from-teal-500 to-emerald-500", activeClass: "bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/30 border-transparent scale-105" },
    { key: "biathlon" as const, label: "Biathlon", shortLabel: "Biathlon", icon: Target, gradient: "from-orange-500 to-amber-500", activeClass: "bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/30 border-transparent scale-105" },
    { key: "snowboard" as const, label: "Snowboard", shortLabel: "Snowboard", icon: Snowflake, gradient: "from-sky-500 to-blue-500", activeClass: "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30 border-transparent scale-105" },
  ];

  const activeSchedule =
    activeTab === "cross-country"
      ? crossCountrySchedule
      : activeTab === "biathlon"
        ? biathlonSchedule
        : snowboardSchedule;

  return (
    <section id="schedule" className="py-16 bg-gradient-to-b from-teal-50/50 to-emerald-50/30 dark:from-slate-900/50 dark:to-slate-900/30" data-testid="section-schedule">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <Badge variant="secondary" className="mb-3 no-default-hover-elevate no-default-active-elevate">
            <Snowflake className="w-3 h-3 mr-1" />
            Calendário
          </Badge>
          <h2 className="text-2xl md:text-3xl font-black mb-2" data-testid="text-schedule-title">
            Programação e Horários
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Horário de início das provas dos atletas brasileiros (horário local da Itália - CET)
          </p>
        </motion.div>

        <div className="flex justify-center mb-10 px-2">
          <div className="inline-flex flex-wrap justify-center bg-white dark:bg-slate-800/80 rounded-2xl p-1.5 border border-slate-200 dark:border-slate-700 shadow-sm gap-1 w-full sm:w-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 flex-1 sm:flex-initial px-3 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? tab.activeClass
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  }`}
                  data-testid={`schedule-tab-${tab.key}`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden truncate">{tab.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-9 sm:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-200 dark:via-slate-700 to-transparent hidden md:block" />

          <div className="space-y-4">
            <ScheduleDayCard key="abertura" day={ceremonySchedule[0]} dayIndex={0} />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {activeSchedule.map((day, dayIndex) => (
                  <ScheduleDayCard key={day.date + day.sport} day={day} dayIndex={dayIndex + 1} />
                ))}
              </motion.div>
            </AnimatePresence>
            <ScheduleDayCard key="encerramento" day={ceremonySchedule[1]} dayIndex={activeSchedule.length + 1} />
          </div>
        </div>
      </div>
    </section>
  );
}

function FunFactsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const goTo = (index: number) => {
    if (index < 0) setCurrentIndex(funFacts.length - 1);
    else if (index >= funFacts.length) setCurrentIndex(0);
    else setCurrentIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (Math.abs(distance) > 50) {
      if (distance > 0) goTo(currentIndex + 1);
      else goTo(currentIndex - 1);
    }
  };

  const item = funFacts[currentIndex];
  const athleteData = athletes.find((a) => {
    const factFirst = item.athlete.split(" ")[0].toLowerCase();
    const dataFirst = a.name.split(" ")[0].toLowerCase();
    return factFirst === dataFirst;
  });

  return (
    <section id="curiosidades" className="py-16 bg-background" data-testid="section-funfacts">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <Badge variant="secondary" className="mb-3 no-default-hover-elevate no-default-active-elevate">
            <Sparkles className="w-3 h-3 mr-1" />
            Curiosidades
          </Badge>
          <h2 className="text-2xl md:text-3xl font-black mb-2" data-testid="text-funfacts-title">
            Você Sabia?
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Histórias incríveis por trás de cada atleta
          </p>
        </motion.div>

        <div className="relative max-w-2xl mx-auto px-6 sm:px-0">
          <button
            onClick={() => goTo(currentIndex - 1)}
            aria-label="Curiosidade anterior"
            className="absolute left-0 sm:-left-5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            data-testid="funfact-prev"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-slate-300" />
          </button>

          <button
            onClick={() => goTo(currentIndex + 1)}
            aria-label="Proxima curiosidade"
            className="absolute right-0 sm:-right-5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            data-testid="funfact-next"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-slate-300" />
          </button>

          <div
            className="overflow-hidden rounded-2xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.35 }}
              >
                <div
                  className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700/40 overflow-hidden shadow-xl"
                  data-testid={`funfact-${currentIndex}`}
                >
                  <div className="flex flex-col sm:flex-row">
                    {athleteData && (
                      <div className="sm:w-48 shrink-0">
                        <div className="h-48 sm:h-full relative overflow-hidden">
                          <img
                            src={athleteData.photo}
                            alt={item.athlete}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-transparent to-black/20" />
                        </div>
                      </div>
                    )}
                    <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Sparkles className={`w-4 h-4 ${item.iconColor}`} />
                        <h3 className="font-black text-base text-slate-800 dark:text-slate-200">{item.athlete}</h3>
                      </div>
                      <Badge variant="secondary" className="text-[10px] w-fit mb-3 no-default-hover-elevate no-default-active-elevate">
                        {item.sport}
                      </Badge>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.fact}
                      </p>
                      {athleteData && (
                        <Link href={`/atleta/${athleteData.id}`} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors w-fit" data-testid={`funfact-link-${athleteData.id}`}>
                          Ver perfil completo
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-1.5 mt-5">
            {funFacts.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "w-6 h-2 bg-teal-500"
                    : "w-2 h-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
                }`}
                data-testid={`funfact-dot-${i}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

function HistorySection() {
  const gradientColors = [
    { bg: "from-teal-500 to-teal-600", ring: "ring-teal-200 dark:ring-teal-800", glow: "shadow-teal-500/20" },
    { bg: "from-emerald-500 to-emerald-600", ring: "ring-emerald-200 dark:ring-emerald-800", glow: "shadow-emerald-500/20" },
    { bg: "from-green-500 to-green-600", ring: "ring-green-200 dark:ring-green-800", glow: "shadow-green-500/20" },
    { bg: "from-yellow-500 to-amber-500", ring: "ring-yellow-200 dark:ring-yellow-800", glow: "shadow-yellow-500/30" },
  ];

  return (
    <section id="history" className="py-16 bg-gradient-to-b from-teal-50/40 to-emerald-50/20 dark:from-slate-900/50 dark:to-slate-900/30" data-testid="section-history">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-3 no-default-hover-elevate no-default-active-elevate">
            <Flag className="w-3 h-3 mr-1" />
            História
          </Badge>
          <h2 className="text-2xl md:text-3xl font-black mb-2" data-testid="text-history-title">
            Brasil nos Jogos Paralímpicos de Inverno
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            De 2 atletas em Sochi a 8 em Milano Cortina — uma trajetória de crescimento
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-teal-500 via-emerald-400 to-yellow-500 md:-translate-x-[1.5px] rounded-full" />

          <div className="space-y-0">
            {historyData.map((entry, index) => {
              const isLeft = index % 2 === 0;
              const isCurrent = entry.year === 2026;
              const Icon = iconMap[entry.icon] || Star;
              const colors = gradientColors[index] || gradientColors[0];

              return (
                <motion.div
                  key={entry.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-start md:items-center py-6 ${isLeft ? "md:flex-row-reverse" : "md:flex-row"}`}
                  data-testid={`history-entry-${entry.year}`}
                >
                  <div className={`absolute left-6 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${colors.bg} ring-4 ${colors.ring} shadow-xl ${colors.glow}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  <div className="hidden md:flex md:w-1/2 items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                      className={`${isLeft ? "mr-8" : "ml-8"}`}
                    >
                      <div className={`text-5xl font-black ${isCurrent ? "text-yellow-500 dark:text-yellow-400" : "text-slate-200 dark:text-slate-700"}`}>
                        {entry.year}
                      </div>
                    </motion.div>
                  </div>

                  <div className={`ml-14 sm:ml-16 md:ml-0 md:w-1/2 ${isLeft ? "md:pl-8" : "md:pr-8"}`}>
                    <div
                      className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl ${
                        isCurrent
                          ? "bg-gradient-to-br from-teal-50 via-white to-emerald-50 dark:from-slate-800 dark:via-slate-800/90 dark:to-slate-800 border-2 border-teal-300 dark:border-teal-700 shadow-lg"
                          : "bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-700/50 shadow-sm hover:shadow-md"
                      }`}
                    >
                      {isCurrent && (
                        <div className="absolute top-0 right-0">
                          <div className="bg-gradient-to-l from-yellow-400 to-amber-500 text-yellow-900 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl">
                            Atual
                          </div>
                        </div>
                      )}

                      <div className="p-5 sm:p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="md:hidden text-2xl font-black text-teal-700 dark:text-teal-300">{entry.year}</span>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{entry.city}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                          <div className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-gradient-to-r ${colors.bg} text-white`}>
                            <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            <span className="text-xs sm:text-sm font-black">{entry.athletes}</span>
                            <span className="text-[9px] sm:text-[10px] font-medium opacity-80">atletas</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {entry.sports.map((sport) => (
                              <span
                                key={sport}
                                className="text-[9px] sm:text-[10px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                              >
                                {sport}
                              </span>
                            ))}
                          </div>
                        </div>

                        <p className={`text-sm leading-relaxed ${
                          isCurrent
                            ? "font-semibold text-teal-800 dark:text-teal-200"
                            : "text-slate-600 dark:text-slate-400"
                        }`}>
                          {isCurrent && (
                            <Trophy className="w-4 h-4 text-yellow-500 inline mr-1.5 -mt-0.5" />
                          )}
                          {entry.highlight}
                        </p>
                      </div>

                      <div className={`h-1 w-full bg-gradient-to-r ${colors.bg}`} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const quizQuestions = [
  {
    question: "Quantos atletas brasileiros vão competir em Milano Cortina 2026?",
    options: ["4", "6", "8", "10"],
    correct: 2,
    explanation: "O Brasil leva uma delegação recorde de 8 atletas para os Jogos Paralímpicos de Inverno!",
  },
  {
    question: "Em qual ano o Brasil estreou nos Jogos Paralímpicos de Inverno?",
    options: ["2006", "2010", "2014", "2018"],
    correct: 2,
    explanation: "O Brasil estreou nos Jogos Paralímpicos de Inverno em Sochi 2014, com André Cintra e Fernando Aranha.",
  },
  {
    question: "Qual atleta brasileiro conquistou o 6º lugar em PyeongChang 2018 com apenas 15 anos?",
    options: ["André Barbieri", "Guilherme Rocha", "Cristian Ribera", "Wellington Silva"],
    correct: 2,
    explanation: "Cristian Ribera tinha apenas 15 anos quando conquistou o melhor resultado brasileiro da história!",
  },
  {
    question: "Qual modalidade estreia para o Brasil nestes Jogos?",
    options: ["Esqui Cross-Country", "Snowboard", "Biathlon", "Esqui Alpino"],
    correct: 2,
    explanation: "O biathlon (esqui + tiro esportivo) estreia para o Brasil em Milano Cortina 2026!",
  },
  {
    question: "André Barbieri perdeu a perna em qual esporte?",
    options: ["Esqui", "Futebol", "Snowboard", "Ciclismo"],
    correct: 2,
    explanation: "André perdeu a perna em um acidente de snowboard em Mammoth Mountain em 2011 e corajosamente voltou ao mesmo esporte!",
  },
  {
    question: "Quantas cirurgias Cristian Ribera fez nas pernas ao longo da vida?",
    options: ["5", "10", "21", "15"],
    correct: 2,
    explanation: "Cristian nasceu com artrogripose múltipla congênita e passou por 21 cirurgias nas pernas.",
  },
  {
    question: "De qual estado brasileiro é Robelson Lula?",
    options: ["São Paulo", "Rondônia", "Paraíba", "Rio Grande do Sul"],
    correct: 2,
    explanation: "Robelson nasceu em Juru, no sertão da Paraíba, onde a temperatura média é de 30 graus!",
  },
  {
    question: "Onde Vitória Machado treina snowboard no Brasil?",
    options: ["Serra Gaúcha ao ar livre", "Snowland em Gramado", "Pico do Itatiaia", "Não treina no Brasil"],
    correct: 1,
    explanation: "Vitória treina no Snowland Park em Gramado, RS, apenas aos sábados!",
  },
  {
    question: "Qual a primeira mulher brasileira a competir em Paralimpíadas de Inverno?",
    options: ["Vitória Machado", "Elena Sena", "Aline Rocha", "Nenhuma mulher competiu"],
    correct: 2,
    explanation: "Aline Rocha fez história em PyeongChang 2018 como a primeira mulher brasileira em Paralimpíadas de Inverno!",
  },
  {
    question: "Em qual cidade italiana será a cerimônia de abertura?",
    options: ["Roma", "Cortina d'Ampezzo", "Milano", "Turim"],
    correct: 2,
    explanation: "A cerimônia de abertura será em Milano no dia 6 de março de 2026!",
  },
];


function QuizSection() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [shuffledQuestions] = useState(() => {
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 7);
  });

  const totalQuestions = shuffledQuestions.length;
  const question = shuffledQuestions[currentQ];

  const handleSelect = (optIndex: number) => {
    if (answered) return;
    setSelected(optIndex);
    setAnswered(true);
    if (optIndex === question.correct) {
      setScore((s) => s + 1);
      setStreak((s) => {
        const newStreak = s + 1;
        setBestStreak((b) => Math.max(b, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentQ + 1 >= totalQuestions) {
      setFinished(true);
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setAnswered(false);
    setFinished(false);
    setStreak(0);
    setBestStreak(0);
  };

  const scorePercent = Math.round((score / totalQuestions) * 100);
  const getMessage = () => {
    if (scorePercent === 100) return "Perfeito! Você é um expert paralímpico!";
    if (scorePercent >= 70) return "Muito bem! Você conhece bem nossos atletas!";
    if (scorePercent >= 40) return "Bom começo! Continue acompanhando!";
    return "Que tal conhecer mais sobre nossos atletas?";
  };

  return (
    <section id="quiz" className="py-16 bg-gradient-to-b from-white to-teal-50/30 dark:from-slate-900 dark:to-slate-900/80" data-testid="section-quiz">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <Badge variant="secondary" className="mb-3 no-default-hover-elevate no-default-active-elevate">
            <Zap className="w-3 h-3 mr-1" />
            Interativo
          </Badge>
          <h2 className="text-2xl md:text-3xl font-black mb-2" data-testid="text-quiz-title">
            Quiz Paralímpico
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Teste seus conhecimentos sobre os atletas brasileiros e os Jogos Paralímpicos de Inverno!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Card className="p-0 overflow-hidden border-2 border-slate-200/60 dark:border-slate-700/40 shadow-lg">
            {!finished ? (
              <>
                <div className="bg-gradient-to-r from-teal-500 to-emerald-500 px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-white" />
                    <span className="text-xs font-bold text-white">
                      Pergunta {currentQ + 1} de {totalQuestions}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {streak > 1 && (
                      <span className="text-xs font-bold text-yellow-200 flex items-center gap-1">
                        <Zap className="w-3 h-3" /> {streak}x
                      </span>
                    )}
                    <span className="text-xs font-bold text-white/80">
                      {score}/{currentQ + (answered ? 1 : 0)}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1">
                  <motion.div
                    className="h-full bg-teal-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQ + (answered ? 1 : 0)) / totalQuestions) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentQ}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-base sm:text-lg font-bold mb-5 text-slate-800 dark:text-slate-200 leading-relaxed">
                        {question.question}
                      </p>
                      <div className="space-y-2.5">
                        {question.options.map((opt, i) => {
                          const isCorrect = i === question.correct;
                          const isSelected = i === selected;
                          let optClasses = "border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-600 hover:bg-teal-50/50 dark:hover:bg-teal-900/10 cursor-pointer";

                          if (answered) {
                            if (isCorrect) {
                              optClasses = "border-green-400 bg-green-50 dark:bg-green-900/20 dark:border-green-600";
                            } else if (isSelected && !isCorrect) {
                              optClasses = "border-red-400 bg-red-50 dark:bg-red-900/20 dark:border-red-600";
                            } else {
                              optClasses = "border-slate-200 dark:border-slate-700 opacity-50";
                            }
                          }

                          return (
                            <button
                              key={i}
                              onClick={() => handleSelect(i)}
                              disabled={answered}
                              className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ${optClasses}`}
                              data-testid={`quiz-option-${i}`}
                            >
                              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                                answered && isCorrect
                                  ? "bg-green-500 text-white"
                                  : answered && isSelected && !isCorrect
                                    ? "bg-red-500 text-white"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                              }`}>
                                {answered && isCorrect ? (
                                  <CheckCircle2 className="w-4 h-4" />
                                ) : answered && isSelected && !isCorrect ? (
                                  <XCircle className="w-4 h-4" />
                                ) : (
                                  String.fromCharCode(65 + i)
                                )}
                              </span>
                              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      <AnimatePresence>
                        {answered && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4"
                          >
                            <div className={`px-4 py-3 rounded-xl text-sm ${
                              selected === question.correct
                                ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800"
                                : "bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                            }`}>
                              <p className="font-bold mb-0.5">
                                {selected === question.correct ? "Correto!" : "Quase lá!"}
                              </p>
                              <p className="text-xs opacity-80">{question.explanation}</p>
                            </div>
                            <Button
                              onClick={handleNext}
                              className="w-full mt-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold"
                              data-testid="quiz-next"
                            >
                              {currentQ + 1 >= totalQuestions ? "Ver Resultado" : "Proxima Pergunta"}
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="p-6 sm:p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-500/25">
                    <span className="text-3xl font-black text-white">{scorePercent}%</span>
                  </div>
                </motion.div>
                <h3 className="text-xl font-black mb-1 text-slate-800 dark:text-slate-200">{getMessage()}</h3>
                <p className="text-sm text-muted-foreground mb-1">
                  Você acertou <span className="font-bold text-teal-600 dark:text-teal-400">{score}</span> de {totalQuestions} perguntas
                </p>
                {bestStreak > 1 && (
                  <p className="text-xs text-muted-foreground mb-4">
                    Melhor sequência: <span className="font-bold text-yellow-600 dark:text-yellow-400">{bestStreak}x</span> acertos seguidos
                  </p>
                )}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-4">
                  <Button
                    onClick={handleRestart}
                    variant="outline"
                    className="gap-2"
                    data-testid="quiz-restart"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Jogar Novamente
                  </Button>
                  <Button
                    onClick={() => {
                      const text = `Acertei ${score}/${totalQuestions} no Quiz Paralímpico! Teste seus conhecimentos sobre o Brasil nos Jogos Paralímpicos de Inverno 2026!`;
                      if (navigator.share) {
                        navigator.share({ title: "Quiz Paralímpico", text }).catch(() => {});
                      } else {
                        navigator.clipboard.writeText(text).then(() => {
                          alert("Resultado copiado!");
                        });
                      }
                    }}
                    className="gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white"
                    data-testid="quiz-share"
                  >
                    <Share2 className="w-4 h-4" />
                    Compartilhar Resultado
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900 text-white" data-testid="footer">
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <AgitosLogo size={20} />
          <span className="font-bold text-sm">Paralimpíadas de Inverno 2026</span>
        </div>
        <p className="text-white/60 text-xs mb-4">
          Milano Cortina, Itália - 6 a 15 de Março de 2026
        </p>
        <p className="text-white/40 text-xs">
          Feito com dedicação para acompanhar os atletas paralímpicos brasileiros.
          <br />
          Transmissão: Grupo Globo (SporTV)
        </p>

        <div className="mt-6 flex items-center justify-center gap-4">
          <a
            href="https://www.paralympic.org/milano-cortina-2026"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/50 inline-flex items-center gap-1"
            data-testid="link-paralympic-org"
          >
            <ExternalLink className="w-3 h-3" />
            Paralympic.org
          </a>
          <a
            href="https://cpb.org.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/50 inline-flex items-center gap-1"
            data-testid="link-cpb"
          >
            <ExternalLink className="w-3 h-3" />
            CPB
          </a>
        </div>
      </div>
    </footer>
  );
}

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.pageYOffset > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const startPosition = window.pageYOffset;
    const duration = 600;
    let start: number | null = null;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      window.scrollTo(0, startPosition * (1 - easeOut(progress)));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          aria-label="Voltar ao topo"
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-teal-600 text-white shadow-lg shadow-teal-600/30 flex items-center justify-center hover:bg-teal-700 active:scale-95 transition-all md:hidden"
          data-testid="button-scroll-top"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  useEffect(() => {
    const savedScroll = sessionStorage.getItem("homeScrollY");
    if (savedScroll) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScroll, 10));
      }, 50);
      sessionStorage.removeItem("homeScrollY");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background" onClick={(e) => {
      const link = (e.target as HTMLElement).closest('a[href*="/atleta/"]');
      if (link) {
        sessionStorage.setItem("homeScrollY", String(window.pageYOffset));
      }
    }}>
      <Header />
      <HeroSection />
      <HighlightCard />
      <AthletesSection />
      <ScheduleSection />
      <FunFactsSection />
      <QuizSection />
      <HistorySection />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
