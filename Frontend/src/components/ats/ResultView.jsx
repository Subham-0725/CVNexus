import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  LayoutList,
  Mail,
  Phone,
  AlertTriangle,
  BookOpen,
} from "lucide-react";

function tierLabel(tier) {
  if (tier === "good") return { text: "Good", className: "text-[#00D084]" };
  if (tier === "moderate")
    return { text: "Moderate", className: "text-amber-600" };
  return { text: "Needs work", className: "text-rose-600" };
}

const PILLAR_ROWS = [
  {
    key: "jobAdMatch",
    label: "Job ad match",
    hint: "How well your résumé reflects words and skills from this posting.",
  },
  {
    key: "roleTitleFit",
    label: "Role & title fit",
    hint: "Whether your target job title shows up where recruiters skim first.",
  },
  {
    key: "completeness",
    label: "Completeness",
    hint: "Key sections, contact info, and basics employers expect to see.",
  },
  {
    key: "atsReadability",
    label: "ATS readability",
    hint: "How likely hiring software can read your file cleanly (layout & text).",
  },
  {
    key: "impactAndBullets",
    label: "Impact & bullets",
    hint: "Clear bullets, numbers, and strong verbs in your experience.",
  },
];

function PillarBar({ value, label, hint }) {
  const v = Math.max(0, Math.min(100, Number(value) || 0));
  const barColor =
    v >= 72 ? "bg-[#00D084]" : v >= 48 ? "bg-amber-500" : "bg-rose-500";
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-baseline gap-3">
        <span className="text-sm font-medium text-zinc-800">{label}</span>
        <span className="text-sm tabular-nums font-semibold text-zinc-600">
          {v}
        </span>
      </div>
      <div className="h-2 rounded-full bg-zinc-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`}
          style={{ width: `${v}%` }}
        />
      </div>
      <p className="text-xs text-zinc-500 leading-relaxed">{hint}</p>
    </div>
  );
}

function SectionList({ title, subtitle, items, icon: Icon, tone }) {
  if (!items?.length) return null;
  const border =
    tone === "rose"
      ? "border-rose-100"
      : tone === "emerald"
        ? "border-emerald-100"
        : "border-zinc-100";
  const titleCls =
    tone === "rose"
      ? "text-rose-600"
      : tone === "emerald"
        ? "text-emerald-600"
        : "text-zinc-700";

  return (
    <div className={`p-6 bg-white border ${border} rounded-2xl shadow-sm space-y-3`}>
      <div>
        <h3
          className={`text-sm font-semibold tracking-tight flex items-center gap-2 ${titleCls}`}
        >
          {Icon && <Icon size={18} className="flex-shrink-0" />}
          {title}
        </h3>
        {subtitle && (
          <p
            className={`text-xs text-zinc-500 mt-1.5 leading-relaxed ${Icon ? "pl-[26px]" : ""}`}
          >
            {subtitle}
          </p>
        )}
      </div>
      <ul className="space-y-2.5 text-zinc-700 text-[15px] leading-relaxed list-none pl-0">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2.5">
            <span className="text-[#00D084] font-bold mt-0.5 flex-shrink-0">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ResultView({ result, onReset }) {
  const {
    score,
    scoreTier,
    scoreModel,
    pillars,
    matchedSkills,
    missingSkills,
    feedback,
    feedbackRaw,
    feedbackError,
    breakdown,
    jobSignals,
    structure,
  } = result;

  const pillarValues = pillars || breakdown?.pillars || {};

  const [animatedScore, setAnimatedScore] = useState(0);

  const tier = scoreTier || (score >= 75 ? "good" : score >= 50 ? "moderate" : "bad");
  const { text: tierText, className: tierClass } = tierLabel(tier);

  const isGoodScore = tier === "good";
  const colorHex = isGoodScore ? "#00D084" : tier === "moderate" ? "#D97706" : "#E11D48";
  const colorClass = isGoodScore ? "text-[#00D084]" : tier === "moderate" ? "text-amber-600" : "text-rose-600";

  useEffect(() => {
    let current = 0;
    const step = Math.max(score / 30, 0.5);
    const timer = setInterval(() => {
      current += step;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, 20);
    return () => clearInterval(timer);
  }, [score]);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (animatedScore / 100) * circumference;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const pillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 200 },
    },
  };

  const cov = structure?.sectionCoverage || {};
  const fmtFlags = structure?.formattingFlags || [];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto space-y-6"
    >
      <motion.div
        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
        className="flex flex-col md:flex-row items-center justify-between p-8 bg-white border border-zinc-100 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      >
        <div className="space-y-2 mb-6 md:mb-0 text-center md:text-left">
          <h1 className="text-3xl font-serif text-zinc-900 tracking-tight">
            Analysis Complete
          </h1>
          <p className="text-zinc-500">
            Real-world style check: job posting match, layout, completeness, and
            impact — then personalized tips below.
          </p>
          {scoreModel && (
            <p className="text-xs text-zinc-400">
              Model: {scoreModel.replace(/-/g, " ")} · Each employer’s system
              differs; this is an independent estimate.
            </p>
          )}
          <p className={`text-sm font-semibold ${tierClass}`}>
            Match strength: {tierText}
          </p>
        </div>

        <div className="relative flex items-center justify-center w-32 h-32">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r={radius}
              fill="none"
              stroke="#f4f4f5"
              strokeWidth="8"
            />
            <motion.circle
              cx="64"
              cy="64"
              r={radius}
              fill="none"
              stroke={colorHex}
              strokeWidth="8"
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: "easeOut" }}
              strokeDasharray={circumference}
            />
          </svg>
          <div
            className={`text-4xl font-light tracking-tighter absolute flex items-start ${colorClass}`}
          >
            {animatedScore}
            <span className="text-lg font-medium mt-1">%</span>
          </div>
        </div>
      </motion.div>

      {pillarValues?.jobAdMatch != null && (
        <motion.div
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
          className="p-8 bg-white border border-zinc-100 rounded-[2rem] shadow-sm space-y-6"
        >
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">
              How your score breaks down
            </h2>
            <p className="text-sm text-zinc-500 mt-1 leading-relaxed">
              Five areas most résumé screeners care about — similar to what tools
              like Jobscan expose, without tying you to one vendor’s rules.
            </p>
          </div>
          <div className="space-y-5">
            {PILLAR_ROWS.map(({ key, label, hint }) => (
              <PillarBar
                key={key}
                label={label}
                hint={hint}
                value={pillarValues[key]}
              />
            ))}
          </div>
          {((breakdown.deductions?.keywordStuffing ?? 0) > 0 ||
            (breakdown.deductions?.formatRiskPoints ?? 0) > 0) && (
            <div className="text-xs text-zinc-500 pt-2 border-t border-zinc-100 space-y-1">
              {(breakdown.deductions?.keywordStuffing ?? 0) > 0 && (
                <p>
                  Keyword repetition adjustment: −
                  {breakdown.deductions.keywordStuffing} pts (reduces gaming the
                  score).
                </p>
              )}
              {(breakdown.deductions?.formatRiskPoints ?? 0) > 0 && (
                <p>
                  Layout / parse-risk note:{" "}
                  {breakdown.deductions.formatRiskPoints} raw penalty units
                  reflected in “ATS readability.”
                </p>
              )}
            </div>
          )}
        </motion.div>
      )}

      {structure?.contentQuality && (
        <motion.div
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
          className="flex flex-wrap gap-3 text-xs text-zinc-600 px-1"
        >
          <span className="px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200/80">
            ~{structure.stats?.wordCount ?? "—"} words
          </span>
          <span className="px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200/80">
            ~{structure.contentQuality.bulletLineCount} bullet-style lines
            (experience)
          </span>
          <span className="px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200/80">
            ~{structure.contentQuality.metricSignals} metric-style hints
            (numbers, %, $…)
          </span>
          <span className="px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200/80">
            ~{structure.contentQuality.strongVerbLines} lines led with strong
            action verbs
          </span>
        </motion.div>
      )}

      {jobSignals?.educationMentioned &&
        !structure?.sectionCoverage?.education &&
        !structure?.contentQuality?.mentionsEducation && (
          <motion.p
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            className="text-sm text-amber-800 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3"
          >
            This job ad mentions education requirements, but we didn’t see a
            clear education section or degree line. Adding one (if accurate) usually
            helps both ATS and humans.
          </motion.p>
        )}

      {structure && (
        <motion.div
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
          className="p-8 bg-white border border-zinc-100 rounded-[2rem] shadow-sm space-y-4"
        >
          <h2 className="text-sm uppercase tracking-wider text-zinc-500 font-bold flex items-center gap-2">
            <LayoutList size={18} /> Resume structure &amp; contact
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              ["Summary", cov.summary],
              ["Experience", cov.experience],
              ["Education", cov.education],
              ["Skills", cov.skills],
              ["Projects", cov.projects],
              ["Certifications", cov.certifications],
            ].map(([name, ok]) => (
              <span
                key={name}
                className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                  ok
                    ? "bg-emerald-50 border-emerald-100 text-emerald-800"
                    : "bg-zinc-50 border-zinc-200 text-zinc-500"
                }`}
              >
                {name}
                {ok ? " ✓" : ""}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-zinc-600">
            <span className="inline-flex items-center gap-2">
              <Mail size={16} className="text-zinc-400" />
              {structure.contact?.emailValid
                ? structure.contact.emails?.[0]
                : "No email detected"}
            </span>
            <span className="inline-flex items-center gap-2">
              <Phone size={16} className="text-zinc-400" />
              {structure.contact?.phoneValid
                ? structure.contact.phones?.[0]
                : "No phone detected"}
            </span>
            {structure.experienceMonths != null && (
              <span>
                Est. experience: ~{Math.round(structure.experienceMonths / 12)}{" "}
                yrs ({structure.experienceMonths} mo)
              </span>
            )}
          </div>
          {fmtFlags.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-zinc-100">
              {fmtFlags.map((f, i) => (
                <div
                  key={i}
                  className="flex gap-2 text-sm text-amber-800 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2"
                >
                  <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                  <span>{f.detail}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
          className="p-8 bg-white border border-zinc-100 rounded-[2rem] shadow-sm space-y-5"
        >
          <h2 className="text-sm font-semibold text-emerald-700 flex items-center gap-2">
            <CheckCircle2 size={18} /> On your résumé — matches the job ad
          </h2>
          <p className="text-xs text-zinc-500 -mt-2 mb-1">
            Words or skills from the posting that we found in your file.
          </p>
          <motion.div
            variants={containerVariants}
            className="flex flex-wrap gap-2.5"
          >
            {matchedSkills?.length > 0 ? (
              matchedSkills.map((s) => (
                <motion.span
                  key={s}
                  variants={pillVariants}
                  className="px-3.5 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium rounded-lg"
                >
                  {s}
                </motion.span>
              ))
            ) : (
              <span className="text-zinc-400 text-sm italic">
                We didn’t spot many overlaps with the job ad yet — check the
                feedback below for ideas.
              </span>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
          className="p-8 bg-white border border-zinc-100 rounded-[2rem] shadow-sm space-y-5"
        >
          <h2 className="text-sm font-semibold text-rose-600 flex items-center gap-2">
            <XCircle size={18} /> On the job ad — not clearly on your résumé
          </h2>
          <p className="text-xs text-zinc-500 -mt-2 mb-1">
            If these truly apply to you, say so plainly on your résumé (don’t
            copy-paste blindly).
          </p>
          <motion.div
            variants={containerVariants}
            className="flex flex-wrap gap-2.5"
          >
            {missingSkills?.length > 0 ? (
              missingSkills.map((s) => (
                <motion.span
                  key={s}
                  variants={pillVariants}
                  className="px-3.5 py-1.5 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium rounded-lg"
                >
                  {s}
                </motion.span>
              ))
            ) : (
              <span className="text-zinc-400 text-sm italic">
                Nice — few obvious gaps vs. the wording we pulled from the job
                ad.
              </span>
            )}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
        className="p-8 bg-[#F8FAFC] border border-[#00D084]/20 rounded-[2rem] relative overflow-hidden space-y-6"
      >
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#00D084]" />
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#00B875] font-semibold text-base">
            <Sparkles size={20} /> Your personalized feedback
          </div>
          <p className="text-sm text-zinc-600 leading-relaxed max-w-2xl">
            Written in everyday language — no HR jargon. Read{" "}
            <span className="font-medium text-zinc-800">In plain English</span>{" "}
            first; the sections below go a little deeper.
          </p>
        </div>

        {feedbackError && (
          <p className="text-zinc-600 text-sm leading-relaxed">
            {feedbackError === "AI_NOT_CONFIGURED"
              ? "Written tips aren’t available right now (server setup). Your score and the green/red lists above still help."
              : "Written tips are temporarily unavailable. Your score and the lists above still show how your résumé lines up with the job ad."}
          </p>
        )}

        {feedback?.in_simple_terms && (
          <div className="rounded-2xl bg-white border border-emerald-200/80 shadow-sm p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm">
              <BookOpen size={18} />
              In plain English
            </div>
            <p className="text-zinc-800 text-[17px] leading-[1.65] font-normal">
              {feedback.in_simple_terms}
            </p>
          </div>
        )}

        {feedback?.executive_summary && (
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              A bit more detail
            </p>
            <p className="text-zinc-700 leading-relaxed text-[15px]">
              {feedback.executive_summary}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SectionList
            title="What’s already working"
            subtitle="Strengths for this role, said simply."
            items={feedback?.what_you_have}
            icon={CheckCircle2}
            tone="emerald"
          />
          <SectionList
            title="What to add or spell out"
            subtitle="Things the employer asked for that we didn’t see clearly — only add what’s true for you."
            items={feedback?.what_to_add}
            icon={XCircle}
            tone="rose"
          />
          <SectionList
            title="How to make it stronger"
            subtitle="Easy upgrades: clearer results, better order, stronger wording."
            items={feedback?.enhancements}
            tone="zinc"
          />
          <SectionList
            title="File & layout tips"
            subtitle="So hiring software (ATS) can read your résumé without getting confused."
            items={feedback?.ats_formatting}
            tone="zinc"
          />
        </div>

        <SectionList
          title="Extra tips"
          subtitle="Interview prep, gaps, or other honest suggestions."
          items={feedback?.other_suggestions}
          tone="zinc"
        />

        {!feedback?.executive_summary &&
          !feedback?.in_simple_terms &&
          feedbackRaw && (
            <p className="text-zinc-700 leading-relaxed text-[15px] whitespace-pre-wrap">
              {feedbackRaw}
            </p>
          )}
      </motion.div>

      <motion.div
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
        className="flex justify-center pt-6 pb-10"
      >
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-zinc-500 hover:text-zinc-900 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-full transition-all shadow-sm hover:shadow active:scale-95"
        >
          <RotateCcw size={16} /> Scan Another Resume
        </button>
      </motion.div>
    </motion.div>
  );
}
