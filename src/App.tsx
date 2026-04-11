import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, Heart, Shield, Users, Clock, Calendar, MapPin, Phone, 
  Instagram, Facebook, ChevronRight, ChevronLeft, CheckCircle2, BookOpen, 
  Music, Smile, Sun, Cloud, Palette, Baby, Utensils, ArrowRight, Quote
} from 'lucide-react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const FloatingCloud = ({ className, delay = 0 }: { className: string, delay?: number }) => (
  <motion.div
    className={`absolute text-brand-grey-200 opacity-50 ${className}`}
    animate={{ y: [0, -15, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
  >
    <Cloud size={64} fill="currentColor" />
  </motion.div>
);

const testimonials = [
  {
    id: 1,
    name: "Екатерина Смирнова",
    role: "Мама Артёма, 4 года",
    text: "Замечательный садик! Сын ходит с удовольствием, каждый день рассказывает что-то новое. Очень нравятся занятия по лепке и музыке. Воспитатели — настоящие профессионалы.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 2,
    name: "Алексей Волков",
    role: "Папа Софии, 5 лет",
    text: "Долго выбирали центр для подготовки к школе и не ошиблись. За полгода София научилась читать и считать. Атмосфера очень дружелюбная, питание отличное.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 3,
    name: "Марина Лебедева",
    role: "Мама Давида, 3 года",
    text: "Прекрасное место! Ребенок быстро адаптировался благодаря чуткому отношению педагогов. Очень нравится, что группы небольшие и каждому уделяют внимание.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  }
];

const TestimonialsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div 
      className="mt-24 bg-gradient-to-br from-brand-green-50 to-brand-grey-50 rounded-[3rem] p-8 md:p-12 relative overflow-hidden border border-brand-green-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <Quote className="absolute -top-6 -left-6 text-brand-green-500/10 w-48 h-48 rotate-12" />
        <Quote className="absolute -bottom-6 -right-6 text-brand-grey-500/10 w-48 h-48 -rotate-12" />
      </div>

      <div className="text-center mb-12 relative z-10">
        <h3 className="text-3xl font-bold text-slate-900 mb-4">Что говорят родители</h3>
        <p className="text-slate-600">Мы гордимся доверием семей, которые выбирают нас.</p>
      </div>

      <div className="relative max-w-4xl mx-auto z-10">
        <div className="relative min-h-[320px] md:min-h-[240px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute w-full flex flex-col items-center text-center px-4"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-brand-green-400 text-brand-green-400" />
                ))}
              </div>
              <p className="text-xl md:text-2xl text-slate-700 font-medium italic mb-8 leading-relaxed max-w-3xl">
                "{testimonials[currentIndex].text}"
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].name}
                  className="w-14 h-14 shrink-0 rounded-full object-cover border-2 border-white shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left">
                  <h4 className="font-bold text-slate-900">{testimonials[currentIndex].name}</h4>
                  <p className="text-sm text-slate-500">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-6 mt-8">
          <button 
            onClick={prev}
            className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-brand-green-500 hover:border-brand-green-200 hover:shadow-lg transition-all active:scale-95 z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-2 z-10">
            {testimonials.map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-3 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-brand-green-500 w-8' : 'bg-slate-300 hover:bg-brand-green-300 w-3'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button 
            onClick={next}
            className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-brand-green-500 hover:border-brand-green-200 hover:shadow-lg transition-all active:scale-95 z-10"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'schedule' | 'menu'>('schedule');

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 overflow-x-hidden selection:bg-brand-green-200">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-lg border-b border-brand-grey-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-green-500 to-brand-grey-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-green-500/20">
              <Sun size={24} />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
              Ordo Kids
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            <a href="#about" className="hover:text-brand-green-500 transition-colors">О нас</a>
            <a href="#schedule" className="hover:text-brand-green-500 transition-colors">Расписание</a>
            <a href="#pricing" className="hover:text-brand-green-500 transition-colors">Цены</a>
            <a href="#contacts" className="hover:text-brand-green-500 transition-colors">Контакты</a>
          </div>
          <button className="bg-brand-green-500 hover:bg-brand-green-600 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-brand-green-500/25 hover:shadow-brand-green-500/40 active:scale-95">
            Записаться на консультацию
          </button>
        </div>
      </nav>

      <main>
        {/* 1. HERO SECTION */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-brand-grey-50/50 to-white">
          <FloatingCloud className="top-32 left-10 scale-150" delay={0} />
          <FloatingCloud className="top-64 right-20 scale-125" delay={2} />
          <FloatingCloud className="bottom-20 left-1/3 scale-100" delay={1} />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green-100 text-brand-green-700 font-medium text-sm mb-6"
                >
                  <Star size={16} className="fill-brand-green-500" />
                  <span>Набор в новые группы открыт!</span>
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight"
                >
                  Детский центр <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green-500 to-brand-grey-500">
                    «Ordo Kids»
                  </span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl text-slate-600 mb-8 leading-relaxed"
                >
                  Развивающие занятия для детей от 1 до 7 лет. Раскрываем таланты, учим дружить и познавать мир через увлекательную игру.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <button className="group bg-brand-green-500 hover:bg-brand-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-xl shadow-brand-green-500/30 hover:shadow-brand-green-500/50 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2">
                    Записаться на бесплатное занятие
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-full font-semibold text-lg transition-all hover:border-slate-300 hover:shadow-md active:scale-95 flex items-center justify-center gap-2">
                    Смотреть программу
                  </button>
                </motion.div>
              </div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-green-400 to-brand-grey-300 rounded-[3rem] rotate-3 scale-105 opacity-20 blur-2xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1587691592099-24045742c181?auto=format&fit=crop&q=80&w=1000" 
                  alt="Дети играют в детском саду" 
                  className="relative rounded-[3rem] shadow-2xl object-cover h-[500px] w-full border-8 border-white"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Badge */}
                <motion.div 
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-6 bg-white p-4 rounded-3xl shadow-xl flex items-center gap-4 border border-slate-100"
                >
                  <div className="w-12 h-12 bg-brand-green-100 rounded-full flex items-center justify-center text-brand-green-600">
                    <Heart size={24} className="fill-brand-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Счастливых детей</p>
                    <p className="text-2xl font-bold text-slate-800">200+</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. ABOUT US & ENROLLMENT */}
        <section id="about" className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
              <FadeIn>
                <div className="relative">
                  <div className="absolute -inset-4 bg-brand-green-100 rounded-[3rem] -rotate-3"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1503454537195-1dc534b25fc5?auto=format&fit=crop&q=80&w=800" 
                    alt="Дети на занятии" 
                    className="relative rounded-[2.5rem] shadow-lg object-cover aspect-square w-full"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -right-8 top-1/4 bg-white p-6 rounded-3xl shadow-xl border border-slate-100 max-w-xs">
                    <div className="flex items-center gap-3 mb-2">
                      <Star className="text-yellow-400 fill-yellow-400" size={20} />
                      <Star className="text-yellow-400 fill-yellow-400" size={20} />
                      <Star className="text-yellow-400 fill-yellow-400" size={20} />
                      <Star className="text-yellow-400 fill-yellow-400" size={20} />
                      <Star className="text-yellow-400 fill-yellow-400" size={20} />
                    </div>
                    <p className="text-slate-600 text-sm font-medium">«Лучшее место для развития нашего малыша!»</p>
                  </div>
                </div>
              </FadeIn>
              
              <div>
                <FadeIn delay={0.1}>
                  <h2 className="text-4xl font-bold text-slate-900 mb-6">Создаем среду, где хочется расти</h2>
                  <p className="text-lg text-slate-600 mb-8">
                    Мы верим, что каждый ребенок уникален. Наша задача — мягко направить его интерес, обеспечить безопасность и дать лучшие инструменты для познания мира.
                  </p>
                </FadeIn>

                <div className="grid sm:grid-cols-2 gap-6 mb-10">
                  {[
                    { icon: Smile, title: "Обучение через игру", color: "bg-sky-100 text-sky-600" },
                    { icon: Users, title: "Профессиональные педагоги", color: "bg-brand-green-100 text-brand-green-600" },
                    { icon: Baby, title: "Группы до 10 детей", color: "bg-emerald-100 text-emerald-600" },
                    { icon: Shield, title: "Безопасная и уютная среда", color: "bg-purple-100 text-purple-600" }
                  ].map((item, i) => (
                    <FadeIn key={i} delay={0.2 + i * 0.1}>
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${item.color}`}>
                          <item.icon size={24} />
                        </div>
                        <p className="font-semibold text-slate-800 mt-3">{item.title}</p>
                      </div>
                    </FadeIn>
                  ))}
                </div>

                <FadeIn delay={0.6}>
                  <div className="flex flex-wrap gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <div>
                      <p className="text-3xl font-bold text-brand-green-500">5 лет</p>
                      <p className="text-sm text-slate-500 font-medium">опыта работы</p>
                    </div>
                    <div className="w-px bg-slate-200"></div>
                    <div>
                      <p className="text-3xl font-bold text-brand-grey-500">8</p>
                      <p className="text-sm text-slate-500 font-medium">педагогов</p>
                    </div>
                    <div className="w-px bg-slate-200"></div>
                    <div>
                      <p className="text-3xl font-bold text-emerald-500">200+</p>
                      <p className="text-sm text-slate-500 font-medium">детей</p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>

            {/* Enrollment integrated into About section */}
            <div className="bg-slate-50 rounded-[3rem] p-8 md:p-12 border border-slate-100">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <FadeIn>
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Запись на пробное занятие</h2>
                    <p className="text-lg text-slate-600 mb-8">
                      Приходите познакомиться с педагогами и посмотреть нашу атмосферу. Первое занятие — бесплатно!
                    </p>
                  </FadeIn>

                  <div className="space-y-4">
                    {[
                      { day: "Вторник", time: "10:00", type: "Младшая группа (1-3 года)" },
                      { day: "Среда", time: "15:00", type: "Средняя группа (3-5 лет)" },
                      { day: "Четверг", time: "09:00", type: "Старшая группа (5-7 лет)" }
                    ].map((slot, i) => (
                      <FadeIn key={i} delay={i * 0.1}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-slate-200 bg-white hover:border-brand-green-200 transition-colors gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Calendar size={18} className="text-brand-green-500" />
                              <span className="font-bold text-slate-900">{slot.day}, {slot.time}</span>
                            </div>
                            <p className="text-slate-500 text-sm">{slot.type}</p>
                          </div>
                          <button className="bg-brand-green-100 hover:bg-brand-green-500 text-brand-green-600 hover:text-white px-6 py-2 rounded-xl font-medium transition-all active:scale-95">
                            Занять место
                          </button>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </div>
                <FadeIn delay={0.3} className="relative hidden lg:block">
                  <img 
                    src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800" 
                    alt="Ребенок рисует" 
                    className="rounded-[2.5rem] shadow-xl object-cover h-[450px] w-full"
                    referrerPolicy="no-referrer"
                  />
                </FadeIn>
              </div>
            </div>

            {/* Testimonials Slider */}
            <FadeIn delay={0.4}>
              <TestimonialsSlider />
            </FadeIn>
          </div>
        </section>

        {/* 3. OUR TEAM */}
        <section className="py-24 bg-brand-green-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <FadeIn>
                <h2 className="text-4xl font-bold text-slate-900 mb-4">Наша команда</h2>
                <p className="text-lg text-slate-600">
                  Люди, которые каждый день дарят детям заботу, знания и искренние улыбки.
                </p>
              </FadeIn>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "Анна Смирнова", role: "Старший воспитатель", age: "Дети 5–7 лет", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400" },
                { name: "Елена Попова", role: "Логопед-дефектолог", age: "Дети 3–7 лет", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400" },
                { name: "Мария Иванова", role: "Воспитатель", age: "Дети 1–3 года", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400" },
                { name: "Ольга Ким", role: "Музыкальный рук.", age: "Все группы", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" }
              ].map((member, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 border border-slate-100 text-center group hover:-translate-y-2 transition-all duration-300">
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <div className="absolute inset-0 bg-brand-green-200 rounded-full scale-110 group-hover:scale-125 transition-transform duration-300 opacity-50"></div>
                      <img src={member.img} alt={member.name} className="relative w-full h-full object-cover rounded-full border-4 border-white" referrerPolicy="no-referrer" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                    <p className="text-brand-green-500 font-medium mb-3">{member.role}</p>
                    <div className="inline-flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full text-sm text-slate-600 mb-6">
                      <Users size={14} />
                      {member.age}
                    </div>
                    <div className="flex justify-center gap-4 text-slate-400 mb-6">
                      <div className="flex flex-col items-center">
                        <Star size={18} className="text-yellow-400 fill-yellow-400 mb-1" />
                        <span className="text-xs font-medium text-slate-600">5.0</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Clock size={18} className="text-brand-grey-400 mb-1" />
                        <span className="text-xs font-medium text-slate-600">5+ лет</span>
                      </div>
                    </div>
                    <button className="w-full py-3 rounded-xl font-medium text-brand-green-600 bg-brand-green-50 hover:bg-brand-green-500 hover:text-white transition-all active:scale-95 hover:shadow-lg hover:shadow-brand-green-500/25">
                      Познакомиться с педагогом
                    </button>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 4. SCHEDULE & MENU */}
        <section id="schedule" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <FadeIn>
                <h2 className="text-4xl font-bold text-slate-900 mb-4">Распорядок дня и питание</h2>
                <p className="text-lg text-slate-600">
                  Сбалансированный график и пятиразовое полезное питание для гармоничного развития.
                </p>
              </FadeIn>
            </div>

            {/* Tabs Switcher */}
            <div className="flex justify-center mb-16">
              <div className="inline-flex p-1.5 bg-slate-100 rounded-[2rem] border border-slate-200 shadow-inner">
                <button 
                  onClick={() => setActiveTab('schedule')}
                  className={`flex items-center gap-2 px-8 py-3.5 rounded-[1.5rem] font-bold transition-all duration-300 ${activeTab === 'schedule' ? 'bg-white text-brand-green-600 shadow-md scale-[1.02]' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                >
                  <Calendar size={20} />
                  Расписание
                </button>
                <button 
                  onClick={() => setActiveTab('menu')}
                  className={`flex items-center gap-2 px-8 py-3.5 rounded-[1.5rem] font-bold transition-all duration-300 ${activeTab === 'menu' ? 'bg-white text-brand-green-600 shadow-md scale-[1.02]' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                >
                  <Utensils size={20} />
                  Меню
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'schedule' ? (
                <motion.div
                  key="schedule"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {[
                      { day: "Понедельник", color: "bg-sky-50 border-sky-200", titleColor: "text-sky-700", items: ["09:00 - Зарядка", "10:00 - Развитие речи", "11:30 - Прогулка", "15:00 - Логопед", "16:30 - Творчество"] },
                      { day: "Вторник", color: "bg-emerald-50 border-emerald-200", titleColor: "text-emerald-700", items: ["09:00 - Зарядка", "10:00 - Математика", "11:30 - Прогулка", "15:00 - Музыка", "16:30 - Игры"] },
                      { day: "Среда", color: "bg-amber-50 border-amber-200", titleColor: "text-amber-700", items: ["09:00 - Зарядка", "10:00 - Окружающий мир", "11:30 - Прогулка", "15:00 - Танцы", "16:30 - Лепка"] },
                      { day: "Четверг", color: "bg-purple-50 border-purple-200", titleColor: "text-purple-700", items: ["09:00 - Зарядка", "10:00 - Английский", "11:30 - Прогулка", "15:00 - Логопед", "16:30 - Рисование"] },
                      { day: "Пятница", color: "bg-pink-50 border-pink-200", titleColor: "text-pink-700", items: ["09:00 - Зарядка", "10:00 - Чтение", "11:30 - Прогулка", "15:00 - Театр", "16:30 - Свободная игра"] }
                    ].map((schedule, i) => (
                      <div key={i} className={`rounded-3xl p-6 border-2 ${schedule.color} h-full shadow-sm`}>
                        <h4 className={`text-xl font-bold mb-6 ${schedule.titleColor}`}>{schedule.day}</h4>
                        <ul className="space-y-4">
                          {schedule.items.map((item, j) => (
                            <li key={j} className="flex items-start gap-3 text-slate-700 font-medium text-sm">
                              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 bg-current ${schedule.titleColor} opacity-50`}></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-slate-50 rounded-[3rem] p-8 md:p-12 border border-slate-100"
                >
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { meal: "Завтрак", time: "08:30", desc: "Овсяная каша на молоке с ягодами, бутерброд с маслом и сыром, чай." },
                      { meal: "Второй завтрак", time: "10:30", desc: "Свежие фрукты (яблоки, бананы, груши), натуральный йогурт." },
                      { meal: "Обед", time: "12:30", desc: "Суп-пюре из тыквы, куриные котлетки на пару с картофельным пюре, компот." },
                      { meal: "Полдник", time: "15:30", desc: "Творожная запеканка со сметаной, какао на молоке." },
                      { meal: "Ужин", time: "17:30", desc: "Рыбное суфле, тушеные овощи, травяной чай." },
                      { meal: "Индивидуально", time: "Всегда", desc: "Возможность замены блюд при аллергии или особых диетах." }
                    ].map((item, i) => (
                      <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4 hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-brand-green-50 rounded-lg flex items-center justify-center text-brand-green-500 shrink-0 font-bold text-sm">
                          {item.time.split(':')[0]}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-slate-900 mb-1">{item.meal}</h4>
                          <p className="text-xs text-brand-green-500 font-medium mb-2">{item.time}</p>
                          <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* 7. PRICING */}
        <section id="pricing" className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <FadeIn>
                <h2 className="text-4xl font-bold mb-4">Стоимость посещения</h2>
                <p className="text-lg text-slate-400">
                  Прозрачные цены без скрытых платежей. Выберите удобный формат для вашего ребенка.
                </p>
              </FadeIn>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Half Day */}
              <FadeIn delay={0.1}>
                <div className="bg-slate-800 rounded-[2.5rem] p-8 border border-slate-700 h-full flex flex-col">
                  <h3 className="text-2xl font-bold mb-2">Полдня</h3>
                  <p className="text-slate-400 mb-6">Идеально для адаптации</p>
                  <div className="mb-8">
                    <span className="text-5xl font-extrabold">22 000 ₸</span>
                    <span className="text-slate-400"> / месяц</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="text-brand-green-400 shrink-0" size={20} />
                      <span>Время: 08:00 – 13:00</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="text-brand-green-400 shrink-0" size={20} />
                      <span>3-х разовое питание</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="text-brand-green-400 shrink-0" size={20} />
                      <span>Все развивающие занятия</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="text-brand-green-400 shrink-0" size={20} />
                      <span>Прогулка на свежем воздухе</span>
                    </li>
                  </ul>
                  <button className="w-full bg-slate-700 hover:bg-slate-600 text-white py-4 rounded-2xl font-bold transition-all hover:shadow-lg hover:-translate-y-1 active:scale-95">
                    Выбрать тариф «Полдня»
                  </button>
                </div>
              </FadeIn>

              {/* Full Day */}
              <FadeIn delay={0.2}>
                <div className="bg-gradient-to-b from-brand-green-500 to-brand-green-600 rounded-[2.5rem] p-8 border border-brand-green-400 h-full flex flex-col relative transform md:-translate-y-4 shadow-2xl shadow-brand-green-500/20">
                  <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                    Популярный выбор
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Полный день</h3>
                  <p className="text-brand-green-100 mb-6">Максимум пользы и развития</p>
                  <div className="mb-8">
                    <span className="text-5xl font-extrabold">35 000 ₸</span>
                    <span className="text-brand-green-200"> / месяц</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-grow text-white">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="text-white shrink-0" size={20} />
                      <span>Время: 08:00 – 19:00</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="text-white shrink-0" size={20} />
                      <span>5-ти разовое питание</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="text-white shrink-0" size={20} />
                      <span>Все развивающие занятия + кружки</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="text-white shrink-0" size={20} />
                      <span>Дневной сон и две прогулки</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="text-white shrink-0" size={20} />
                      <span>Консультации логопеда и психолога</span>
                    </li>
                  </ul>
                  <button className="w-full bg-white text-brand-green-600 hover:bg-brand-green-50 py-4 rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95">
                    Выбрать тариф «Полный день»
                  </button>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

      </main>

      {/* 9. FOOTER */}
      <footer id="contacts" className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-green-500 to-brand-grey-500 rounded-2xl flex items-center justify-center text-white">
                  <Sun size={24} />
                </div>
                <span className="text-2xl font-bold text-white">
                  Ordo Kids
                </span>
              </div>
              <p className="text-slate-400 mb-6">
                Счастливое детство начинается здесь. Развиваем, заботимся, любим.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-brand-green-500 hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-brand-green-500 hover:text-white transition-colors">
                  <Facebook size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Контакты</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="text-brand-green-500 shrink-0 mt-1" />
                  <span>г. Алматы, ул. Абая 150/1, ЖК "Радуга"</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={20} className="text-brand-green-500 shrink-0" />
                  <span>+7 (777) 123-45-67</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock size={20} className="text-brand-green-500 shrink-0" />
                  <span>Пн-Пт: 08:00 – 19:00</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Навигация</h4>
              <ul className="space-y-3">
                <li><a href="#about" className="hover:text-brand-green-400 transition-colors">О нас</a></li>
                <li><a href="#schedule" className="hover:text-brand-green-400 transition-colors">Расписание</a></li>
                <li><a href="#pricing" className="hover:text-brand-green-400 transition-colors">Цены</a></li>
                <li><a href="#" className="hover:text-brand-green-400 transition-colors">Отзывы</a></li>
                <li><a href="#" className="hover:text-brand-green-400 transition-colors">Галерея</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Остались вопросы?</h4>
              <p className="text-slate-400 mb-4">Оставьте свой номер, и мы перезвоним вам в течение 15 минут.</p>
              <form className="flex flex-col gap-3">
                <input 
                  type="tel" 
                  placeholder="Ваш телефон" 
                  className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-green-500 transition-colors"
                />
                <button className="bg-brand-green-500 hover:bg-brand-green-600 text-white px-4 py-3 rounded-xl font-bold transition-all active:scale-95 hover:shadow-lg hover:shadow-brand-green-500/25">
                  Перезвоните мне
                </button>
              </form>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2026 Детский центр «Ordo Kids». Все права защищены.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white transition-colors">Договор оферты</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
