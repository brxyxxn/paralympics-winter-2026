import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import {
  ArrowLeft,
  Target,
  Heart,
  Calendar,
  Trophy,
  Sun,
  Moon,
} from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { athletes } from "@/data/athletes";

export default function AthleteDetail() {
  const [, params] = useRoute("/atleta/:id");
  const { theme, toggleTheme } = useTheme();
  const [bioExpanded, setBioExpanded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params?.id]);

  const athlete = athletes.find((a) => a.id === Number(params?.id));

  useEffect(() => {
    if (athlete) {
      document.title = `${athlete.name} - Brasil nas Paralimpíadas de Inverno 2026`;
    }
    return () => {
      document.title = "Brasil nas Paralimpíadas de Inverno - Milano Cortina 2026";
    };
  }, [athlete]);

  if (!athlete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background" data-testid="athlete-not-found">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-red-500">Atleta não encontrado</h2>
          <Link href="/">
            <Button variant="outline" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao início
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const bioTruncated = athlete.history.length > 200;
  const displayHistory = bioTruncated && !bioExpanded
    ? athlete.history.substring(0, 200) + "..."
    : athlete.history;

  return (
    <div className="min-h-screen bg-background" data-testid="page-athlete-detail">
      <div className={`relative bg-gradient-to-br ${athlete.gradient} overflow-hidden`}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 max-w-5xl">
          <div className="flex items-center justify-between pt-4 pb-2">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/80 hover:text-white hover:bg-white/10"
                data-testid="button-back"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
              className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          <div className="grid md:grid-cols-[260px_1fr] gap-6 md:gap-10 items-end pb-8 pt-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative mx-auto md:mx-0"
            >
              <div className="rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl w-[200px] h-[250px] md:w-[240px] md:h-[300px] lg:w-[260px] lg:h-[320px]">
                <img
                  src={athlete.photo}
                  alt={athlete.name}
                  className="w-full h-full object-cover"
                  data-testid="img-athlete-photo"
                />
              </div>
              {(athlete.highlight.includes("Campeão") || athlete.highlight.includes("Campeã")) && (
                <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 rounded-full p-3 shadow-lg">
                  <Trophy className="w-6 h-6" />
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white text-center md:text-left pb-2"
            >
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-black mb-3 drop-shadow-lg"
                data-testid="text-athlete-name"
              >
                {athlete.name}
              </h1>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm no-default-hover-elevate no-default-active-elevate">
                  {athlete.sport}
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm no-default-hover-elevate no-default-active-elevate">
                  {athlete.category}
                </Badge>
                <Badge className={`backdrop-blur-sm no-default-hover-elevate no-default-active-elevate ${athlete.paralympics === "Estreante" ? "bg-emerald-400/30 text-white border-emerald-300/30" : "bg-white/20 text-white border-white/30"}`}>
                  {athlete.paralympics}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-white/80 justify-center md:justify-start mb-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {athlete.age} anos
                </span>
              </div>

              {athlete.highlight && (
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4" data-testid="athlete-highlight">
                  <span className="inline-flex items-center gap-1.5 bg-yellow-400/20 text-yellow-200 px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                    <Trophy className="w-3.5 h-3.5" />
                    {athlete.highlight}
                  </span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <a
                  href="https://www.instagram.com/brasilnaneve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-white/70 hover:text-white transition-colors"
                  data-testid="link-cbdn"
                >
                  <SiInstagram className="w-4 h-4 shrink-0" />
                  <span className="truncate">CBDN - @brasilnaneve</span>
                </a>
                {athlete.instagram && (
                  <a
                    href={athlete.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors text-xs sm:text-sm"
                    data-testid="link-instagram"
                  >
                    <SiInstagram className="w-4 h-4 shrink-0" />
                    @{athlete.instagram.split("/").filter(Boolean).pop()}
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl py-8 md:py-12 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 md:p-8"
          data-testid="section-history"
        >
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
            <Heart className="w-4 h-4" />
            História
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">
            {displayHistory}
          </p>
          {bioTruncated && (
            <button
              onClick={() => setBioExpanded(!bioExpanded)}
              className="text-sm font-medium mt-2 cursor-pointer text-teal-600 dark:text-teal-400"
              data-testid="button-history-toggle"
            >
              {bioExpanded ? "Ver menos" : "Ver mais"}
            </button>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 md:p-8"
          data-testid="section-events"
        >
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Provas e Horários
          </h2>
          <ul className="space-y-3">
            {athlete.events.map((event, i) => (
              <li
                key={i}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3 py-2.5 border-b border-slate-200/50 dark:border-slate-700/30 last:border-0"
                data-testid={`event-item-${i}`}
              >
                <span className="font-medium text-slate-800 dark:text-slate-200 text-sm md:text-base">
                  {event.name}
                </span>
                <span className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 w-fit">
                  {event.startTime}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center pt-4"
        >
          <Link href="/">
            <Button variant="outline" size="lg" data-testid="button-back-bottom">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para todos os atletas
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
