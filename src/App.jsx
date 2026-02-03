import React, { useState } from 'react';
import {
  Moon, Sun, TrendingUp, Users, Activity,
  Shield, CreditCard, Building2, Zap, LayoutGrid,
  ChevronDown
} from 'lucide-react';

// --- Data ---
const roadmapStages = [
  {
    id: 0,
    stage: "Этап 0",
    title: "Старт",
    subtitle: "Открытая биржа ресурсов",
    icon: <LayoutGrid className="w-6 h-6" />,
    description: "Идея этапа: можно зайти, купить/продать, следить за ценами и графиками.",
    details: {
      what: [
        "Рынок: список активов, цена, процент, маленький график.",
        "Экран актива: большой график + кнопки Купить/Продать.",
        "События мира: появляются в ленте и создают поводы действовать.",
        "Фонды (начало): вступить/создать, участники, общий прогресс.",
        "Профиль: баланс, портфель, история действий."
      ],
      why: "Быстро «вкатиться» и почувствовать: рынок живой."
    }
  },
  {
    id: 1,
    stage: "Этап 1",
    title: "Живой рынок",
    subtitle: "Чтобы не было ощущения фейка",
    icon: <Activity className="w-6 h-6" />,
    description: "Идея этапа: события становятся естественными и «как в жизни».",
    details: {
      what: [
        "Новости 3 типов: Сигналы (намёки), Факты (события), Разбор (аналитика).",
        "Индикаторы рынка: перекос покупок/продаж.",
        "Жар рынка (спокойно/штормит).",
        "Глубина рынка (тонкий/нормальный/жирный)."
      ],
      why: "Чтобы решения не были «угадайкой», а новости имели причину."
    }
  },
  {
    id: 2,
    stage: "Этап 2",
    title: "Сезоны и смысл",
    subtitle: "Сериальность прогресса",
    icon: <TrendingUp className="w-6 h-6" />,
    description: "Идея этапа: начало → развитие → финал → новый сезон.",
    details: {
      what: [
        "Короткие сезоны с подведением итогов.",
        "Зал славы: топ фондов, топ игроков, главные события.",
        "Награды: титулы, значки, рамки профиля."
      ],
      why: "Начать «с чистого листа» и иметь повод для гордости."
    }
  },
  {
    id: 3,
    stage: "Этап 3",
    title: "Фонды",
    subtitle: "Главная игра",
    icon: <Users className="w-6 h-6" />,
    description: "Идея этапа: фонд — это не «чат», а сила, стиль и коллективные действия.",
    details: {
      what: [
        "Роли: спикер, казначей, аналитик, рекрутер.",
        "Совместные операции: коллективные действия создают эпизоды в ленте.",
        "Новые рейтинги: «кто влияет», «кто активнее», «кто стабильнее»."
      ],
      why: "«Быть частью» сильнее, чем торговать в одиночку."
    }
  },
  {
    id: 4,
    stage: "Этап 4",
    title: "Доверие и Инфовойны",
    subtitle: "Влияние через информацию",
    icon: <Shield className="w-6 h-6" />,
    description: "Идея этапа: игроки влияют на рынок не только сделками, но и словом.",
    details: {
      what: [
        "Заявления/слухи от фондов (стоят ресурсов).",
        "Рейтинг доверия автора.",
        "Богатая лента мира: видно, кто создаёт повестку."
      ],
      why: "Политика, интриги и стиль игры через влияние."
    }
  },
  {
    id: 5,
    stage: "Этап 5",
    title: "Кредиты и переводы",
    subtitle: "Глубина и социалка",
    icon: <CreditCard className="w-6 h-6" />,
    description: "Идея этапа: аккуратная экономическая глубина без абьюза.",
    details: {
      what: [
        "Кредит под залог портфеля (с рисками).",
        "Переводы внутри фонда (с лимитами и задержками).",
        "Защита честности игры."
      ],
      why: "Больше стратегий и взаимопомощи."
    }
  },
  {
    id: 6,
    stage: "Этап 6",
    title: "Компании и IPO",
    subtitle: "Экономика мира",
    icon: <Building2 className="w-6 h-6" />,
    description: "Идея этапа: мир становится «экономикой», а не только ресурсами.",
    details: {
      what: [
        "Компании (торгуемые сразу и выходящие на IPO).",
        "Управленческие решения владельцев.",
        "Корпоративные сюжеты: взлёты, скандалы, успехи."
      ],
      why: "Долгие цели: «я построил компанию»."
    }
  },
  {
    id: 7,
    stage: "Этап 7",
    title: "Биржа как биржа",
    subtitle: "Хардкор механики",
    icon: <Zap className="w-6 h-6" />,
    description: "Идея этапа: ощущение настоящих рынков для профи.",
    details: {
      what: [
        "Кредитное плечо (с ограничениями).",
        "Ликвидации и каскады (драматичные события).",
        "Маркетмейкеры для ликвидности."
      ],
      why: "Максимальный реализм."
    }
  },
  {
    id: 8,
    stage: "Этап 8",
    title: "CORE CITY",
    subtitle: "Город и Недвижимость",
    icon: <Building2 className="w-6 h-6 text-amber-500" />,
    description: "Идея этапа: капитал превращается в мир.",
    details: {
      what: [
        "Участки, объекты, стройки.",
        "Бизнес-цепочки.",
        "Смысл «зачем мне много денег»."
      ],
      why: "Вторая жизнь внутри World Exchange."
    }
  }
];

// --- Components ---

const BackgroundGrid = ({ isDark }) => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <div className={`absolute inset-0 opacity-[0.03] ${isDark ? 'bg-[url("https://www.transparenttextures.com/patterns/graphy.png")] invert' : 'bg-[url("https://www.transparenttextures.com/patterns/graphy.png")]'}`}></div>
    {/* Abstract Line Graph Decoration */}
    <svg className="absolute bottom-0 left-0 w-full h-1/3 opacity-10" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path fill="none" stroke={isDark ? "#FCD34D" : "#D4AF37"} strokeWidth="2" d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,197.3C672,224,768,224,864,197.3C960,171,1056,117,1152,101.3C1248,85,1344,107,1392,117.3L1440,128" />
    </svg>
  </div>
);

const ThemeToggle = ({ isDark, toggle }) => (
  <button
    onClick={toggle}
    className={`fixed top-6 right-6 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ${isDark ? 'bg-[#1A1D24] text-[#FCD34D] border border-[#2A2E37] hover:bg-white/10' : 'bg-white text-[#D4AF37] border border-[#E5E0D8] hover:bg-black/5'}`}
  >
    {isDark ? <Sun size={20} /> : <Moon size={20} />}
  </button>
);

const Hero = ({ isDark }) => {
  const scrollToRoadmap = () => {
    const element = document.getElementById('roadmap');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 pb-10 z-10">
      <div className="mb-6 animate-float">
        <div className={`w-24 h-24 rounded-2xl flex items-center justify-center transform rotate-3 shadow-2xl ${isDark ? 'bg-gradient-to-br from-[#1A1D24] to-gray-900 border border-[#2A2E37]' : 'bg-gradient-to-br from-white to-[#F5F2EB] border border-[#E5E0D8]'}`}>
          <div className={`text-4xl font-bold tracking-tighter ${isDark ? 'text-[#FCD34D]' : 'text-[#D4AF37]'}`}>CC</div>
        </div>
      </div>

      <h1 className={`text-5xl md:text-8xl font-black tracking-tighter mb-4 ${isDark ? 'text-white' : 'text-[#2D2A26]'}`}>
        CORE<span className={isDark ? 'text-[#FCD34D]' : 'text-[#D4AF37]'}>CITY</span>
      </h1>

      <p className={`text-sm md:text-base uppercase tracking-[0.2em] font-medium mb-10 opacity-70 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        World Exchange Game
      </p>

      <div className={`max-w-3xl text-lg md:text-xl font-light leading-relaxed mb-12 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        Онлайн-игра в формате «живой биржи», где цены двигают только <span className="font-semibold underline decoration-2 decoration-amber-400 underline-offset-4">сделки игроков</span>, а новости рождаются из рынка.
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={scrollToRoadmap}
          className={`px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl ${isDark ? 'bg-[#FCD34D] text-black hover:bg-yellow-400' : 'bg-[#D4AF37] text-white hover:bg-yellow-600'}`}>
          Смотреть Roadmap
        </button>
      </div>

      <div className={`mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full text-left`}>
        <div className={`glass-panel p-8 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-white/60 border-black/5 text-gray-700'}`}>
          <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#2D2A26]'}`}>Уникальность</h3>
          <p>Никакой «пластмассы»: события не двигают цену сами по себе. Цена меняется <b>ТОЛЬКО</b> от ваших решений. Новости — это лишь объяснение того, что вы натворили.</p>
        </div>
        <div className={`glass-panel p-8 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-white/60 border-black/5 text-gray-700'}`}>
          <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#2D2A26]'}`}>Эмоция</h3>
          <p>«Я нажал — и мир изменился».<br />«Мы фондом продавили рынок».<br />Рынок как социальная сцена.</p>
        </div>
      </div>

      <div className="absolute bottom-10 animate-bounce opacity-50 text-gray-500 cursor-pointer" onClick={scrollToRoadmap}>
        <ChevronDown />
      </div>
    </section>
  );
};

const UIPreview = ({ isDark }) => (
  <section className="py-20 px-4 z-10 relative">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-[#2D2A26]'}`}>
            Интерфейс
          </h2>
          <p className={`text-lg mb-6 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Telegram-мини-приложение с суперсовременным минималистичным интерфейсом.
            Графики — только линии (без свечей), аккуратно и понятно.
          </p>
          <ul className={`space-y-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <li className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#FCD34D]' : 'bg-[#D4AF37]'}`}></div>
              <span>Везде карточки, воздух, быстрые действия</span>
            </li>
            <li className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#FCD34D]' : 'bg-[#D4AF37]'}`}></div>
              <span>Заходишь на 30–60 секунд → видишь эффект</span>
            </li>
          </ul>
        </div>

        {/* Mockup of the UI */}
        <div className="md:w-1/2 flex justify-center perspective-1000">
          <div className={`relative w-80 h-[500px] rounded-[30px] border-8 shadow-2xl overflow-hidden flex flex-col transition-all duration-500 transform hover:rotate-1 ${isDark ? 'bg-[#0F1115] border-gray-800' : 'bg-[#F5F2EB] border-gray-300'}`}>
            {/* Header Mockup */}
            <div className="p-4 flex justify-between items-center border-b border-opacity-10 border-gray-500">
              <div className={`w-8 h-8 rounded-lg ${isDark ? 'bg-white/10' : 'bg-black/10'}`}></div>
              <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-black'}`}>MARKET</div>
              <div className={`w-8 h-8 rounded-full ${isDark ? 'bg-[#FCD34D]' : 'bg-[#D4AF37]'}`}></div>
            </div>
            {/* Content Mockup */}
            <div className="flex-1 p-4 space-y-4">
              {/* Graph Mockup */}
              <div className={`h-32 rounded-xl p-3 flex flex-col justify-end relative overflow-hidden ${isDark ? 'bg-white/5' : 'bg-white'}`}>
                <div className={`absolute top-3 left-3 text-xs opacity-50 ${isDark ? 'text-white' : 'text-black'}`}>OIL / CRDT</div>
                <div className={`text-xl font-mono font-bold ${isDark ? 'text-[#FCD34D]' : 'text-[#D4AF37]'}`}>124.50</div>
                <svg className="w-full h-12 overflow-visible">
                  <path d="M0 40 Q 20 20, 40 30 T 100 10 T 180 30 T 260 5" fill="none" stroke={isDark ? "#FCD34D" : "#D4AF37"} strokeWidth="2" />
                </svg>
              </div>
              {/* List Mockup */}
              {[1, 2, 3].map((i) => (
                <div key={i} className={`h-16 rounded-xl flex items-center justify-between p-3 ${isDark ? 'bg-white/5' : 'bg-white'}`}>
                  <div className="flex gap-2">
                    <div className={`w-10 h-10 rounded-lg opacity-20 ${isDark ? 'bg-white' : 'bg-black'}`}></div>
                    <div className="space-y-1">
                      <div className={`w-16 h-2 rounded ${isDark ? 'bg-white/20' : 'bg-black/10'}`}></div>
                      <div className={`w-10 h-2 rounded ${isDark ? 'bg-white/10' : 'bg-black/5'}`}></div>
                    </div>
                  </div>
                  <div className={`w-16 h-8 rounded-lg ${isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'} flex items-center justify-center text-xs font-bold`}>+2.4%</div>
                </div>
              ))}
            </div>
            {/* Bottom Bar */}
            <div className={`h-16 border-t border-opacity-10 border-gray-500 flex justify-around items-center px-4 ${isDark ? 'bg-[#1A1D24]' : 'bg-white'}`}>
              {[1, 2, 3, 4].map(i => <div key={i} className={`w-6 h-6 rounded-full opacity-30 ${isDark ? 'bg-white' : 'bg-black'}`}></div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const RoadmapCard = ({ stage, isDark, index }) => {
  const isLeft = index % 2 === 0;
  return (
    <div className={`flex flex-col md:flex-row items-stretch gap-8 mb-24 relative group ${isLeft ? '' : 'md:flex-row-reverse'}`}>

      {/* Center Line Dot */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-500/20 transform md:-translate-x-1/2 hidden md:block"></div>
      <div className={`absolute left-4 md:left-1/2 top-0 w-8 h-8 rounded-full border-4 transform -translate-x-1/2 z-20 flex items-center justify-center shadow-xl transition-colors duration-500 ${isDark ? 'bg-[#0F1115] border-[#FCD34D] text-[#FCD34D]' : 'bg-[#F5F2EB] border-[#D4AF37] text-[#D4AF37]'}`}>
        {stage.id}
      </div>

      {/* Content Card */}
      <div className={`flex-1 md:w-1/2 relative pl-12 md:pl-0`}>
        <div className={`glass-panel p-8 rounded-2xl border h-full transition-transform duration-300 hover:scale-[1.02] ${isDark ? 'bg-[#1A1D24]/80 border-white/5 hover:border-[#FCD34D]/50' : 'bg-white/80 border-gray-200 hover:border-[#D4AF37]/50'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {stage.title}
            </div>
            <div className={`${isDark ? 'text-[#FCD34D]' : 'text-[#D4AF37]'}`}>
              {stage.icon}
            </div>
          </div>

          <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#2D2A26]'}`}>
            {stage.subtitle}
          </h3>

          <p className={`text-sm font-medium italic mb-6 opacity-80 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {stage.description}
          </p>

          <div className="space-y-6">
            <div>
              <h4 className={`text-xs font-bold uppercase mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Что будет</h4>
              <ul className="space-y-2">
                {stage.details.what.map((item, idx) => (
                  <li key={idx} className={`text-sm flex items-start gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${isDark ? 'bg-[#FCD34D]' : 'bg-[#D4AF37]'}`}></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`p-4 rounded-lg border ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
              <h4 className={`text-xs font-bold uppercase mb-1 ${isDark ? 'text-[#FCD34D]' : 'text-[#D4AF37]'}`}>Зачем это игроку</h4>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {stage.details.why}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for Desktop Alternating Layout */}
      <div className="hidden md:block flex-1 md:w-1/2"></div>
    </div>
  );
};

const Roadmap = ({ isDark }) => (
  <section id="roadmap" className="py-20 px-4 z-10 relative">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-20">
        <h2 className={`text-4xl md:text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-[#2D2A26]'}`}>
          ROADMAP
        </h2>
        <div className={`w-24 h-1 mx-auto rounded-full ${isDark ? 'bg-[#FCD34D]' : 'bg-[#D4AF37]'}`}></div>
      </div>

      <div className="relative">
        {/* Mobile vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-500/20 md:hidden"></div>

        {roadmapStages.map((stage, index) => (
          <RoadmapCard key={stage.id} stage={stage} isDark={isDark} index={index} />
        ))}
      </div>
    </div>
  </section>
);

const Footer = ({ isDark }) => (
  <footer className={`py-20 px-4 text-center relative z-10 border-t ${isDark ? 'bg-black border-gray-800' : 'bg-gray-100 border-gray-200'}`}>
    <div className="max-w-2xl mx-auto">
      <h2 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-[#2D2A26]'}`}>
        Итог
      </h2>
      <p className={`text-lg mb-8 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        Сначала это простая и очень удобная биржа ресурсов. Потом — живой мир, где события рождаются из действий людей, фонды создают истории, появляются интриги и влияние.
      </p>
      <div className={`text-xs uppercase tracking-widest opacity-50 mb-12 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
        Дальше — компании, IPO, город и экономика мира.
      </div>

      <button className={`px-10 py-5 rounded-xl font-bold text-lg shadow-xl transition-all transform hover:scale-105 ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>
        Присоединиться
      </button>

      <div className="mt-16 text-sm opacity-30">
        &copy; 2024 CORECITY. All rights reserved.
      </div>
    </div>
  </footer>
);

export default function App() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={`min-h-screen transition-colors duration-500 selection:bg-amber-500 selection:text-white ${isDark ? 'bg-[#0F1115] text-[#E2E8F0]' : 'bg-[#F5F2EB] text-[#2D2A26]'}`}>
      <style>
        {`
                    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
                    
                    body {
                        font-family: 'Manrope', sans-serif;
                    }

                    .font-mono {
                        font-family: 'JetBrains Mono', monospace;
                    }

                    /* Custom Scrollbar */
                    ::-webkit-scrollbar {
                        width: 8px;
                    }
                    ::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    ::-webkit-scrollbar-thumb {
                        background: rgba(156, 163, 175, 0.5);
                        border-radius: 4px;
                    }

                    /* Animations */
                    @keyframes float {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                        100% { transform: translateY(0px); }
                    }
                    
                    .animate-float {
                        animation: float 6s ease-in-out infinite;
                    }

                    .glass-panel {
                        backdrop-filter: blur(12px);
                        -webkit-backdrop-filter: blur(12px);
                        transition: all 0.3s ease;
                    }
                `}
      </style>
      <BackgroundGrid isDark={isDark} />
      <ThemeToggle isDark={isDark} toggle={toggleTheme} />
      <Hero isDark={isDark} />
      <UIPreview isDark={isDark} />
      <Roadmap isDark={isDark} />
      <Footer isDark={isDark} />
    </div>
  );
}
