export type ExamTheme = 'blue' | 'amber' | 'purple' | 'emerald' | 'lime';

export interface ExamThemeConfig {
  cardBg: string;
  cardBorder: string;
  borderHover: string;
  iconBg: string;
  iconText: string;
  titleHover: string;
  subtitleText: string;
  badgeBg: string;
  badgeText: string;
  buttonBg: string;
  buttonHover: string;
  buttonText: string;
  buttonHoverTranslate: string;
  footerBorder: string;
  footerText: string;
}

export const EXAM_THEMES: Record<ExamTheme, ExamThemeConfig> = {
  blue: {
    cardBg: 'bg-blue-50/80 hover:bg-blue-100/60',
    cardBorder: 'border-blue-200',
    borderHover: 'hover:border-blue-400 hover:shadow-blue-500/10 hover:shadow-md',
    iconBg: 'bg-blue-100',
    iconText: 'text-blue-600',
    titleHover: 'group-hover:text-blue-600',
    subtitleText: 'text-blue-700',
    badgeBg: 'bg-white border border-blue-200 shadow-sm',
    badgeText: 'text-blue-950 font-black',
    buttonBg: 'bg-blue-300/70',
    buttonHover: 'hover:bg-blue-400/80',
    buttonText: 'text-blue-950 font-bold',
    buttonHoverTranslate: 'group-hover:translate-x-1',
    footerBorder: 'border-blue-200',
    footerText: 'text-blue-700 font-extrabold',
  },
  amber: {
    cardBg: 'bg-amber-50/80 hover:bg-amber-100/60',
    cardBorder: 'border-amber-200',
    borderHover: 'hover:border-amber-400 hover:shadow-amber-500/10 hover:shadow-md',
    iconBg: 'bg-amber-100',
    iconText: 'text-amber-700',
    titleHover: 'group-hover:text-amber-600',
    subtitleText: 'text-amber-700',
    badgeBg: 'bg-white border border-amber-200 shadow-sm',
    badgeText: 'text-amber-950 font-black',
    buttonBg: 'bg-amber-300/70',
    buttonHover: 'hover:bg-amber-400/80',
    buttonText: 'text-amber-950 font-bold',
    buttonHoverTranslate: 'group-hover:translate-x-1',
    footerBorder: 'border-amber-200',
    footerText: 'text-amber-700 font-extrabold',
  },
  purple: {
    cardBg: 'bg-purple-50/80 hover:bg-purple-100/60',
    cardBorder: 'border-purple-200',
    borderHover: 'hover:border-purple-400 hover:shadow-purple-500/10 hover:shadow-md',
    iconBg: 'bg-purple-100',
    iconText: 'text-purple-700',
    titleHover: 'group-hover:text-purple-600',
    subtitleText: 'text-purple-700',
    badgeBg: 'bg-white border border-purple-200 shadow-sm',
    badgeText: 'text-purple-950 font-black',
    buttonBg: 'bg-purple-300/70',
    buttonHover: 'hover:bg-purple-400/80',
    buttonText: 'text-purple-950 font-bold',
    buttonHoverTranslate: 'group-hover:translate-x-1',
    footerBorder: 'border-purple-200',
    footerText: 'text-purple-700 font-extrabold',
  },
  emerald: {
    cardBg: 'bg-lime-50/80 hover:bg-lime-100/60',
    cardBorder: 'border-lime-200',
    borderHover: 'hover:border-lime-400 hover:shadow-lime-500/10 hover:shadow-md',
    iconBg: 'bg-lime-100',
    iconText: 'text-lime-800',
    titleHover: 'group-hover:text-lime-700',
    subtitleText: 'text-lime-800',
    badgeBg: 'bg-white border border-lime-200 shadow-sm',
    badgeText: 'text-lime-950 font-black',
    buttonBg: 'bg-lime-300/70',
    buttonHover: 'hover:bg-lime-400/80',
    buttonText: 'text-lime-950 font-bold',
    buttonHoverTranslate: 'group-hover:translate-x-1',
    footerBorder: 'border-lime-200',
    footerText: 'text-lime-800 font-extrabold',
  },
  lime: {
    cardBg: 'bg-lime-50/80 hover:bg-lime-100/60',
    cardBorder: 'border-lime-200',
    borderHover: 'hover:border-lime-400 hover:shadow-lime-500/10 hover:shadow-md',
    iconBg: 'bg-lime-100',
    iconText: 'text-lime-800',
    titleHover: 'group-hover:text-lime-700',
    subtitleText: 'text-lime-800',
    badgeBg: 'bg-white border border-lime-200 shadow-sm',
    badgeText: 'text-lime-950 font-black',
    buttonBg: 'bg-lime-300/70',
    buttonHover: 'hover:bg-lime-400/80',
    buttonText: 'text-lime-950 font-bold',
    buttonHoverTranslate: 'group-hover:translate-x-1',
    footerBorder: 'border-lime-200',
    footerText: 'text-lime-800 font-extrabold',
  },
};
