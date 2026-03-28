import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Music, Leaf, Activity } from 'lucide-react';

function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-50 h-8 w-8 rounded-full border-2 border-emerald-500 mix-blend-difference hidden md:block"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
    />
  );
}

function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Vidéo d'arrière-plan - Prête à être remplacée par votre vidéo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline="true"
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      >
        <source src="https://belloumi.zo.space/videos/video1.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la balise vidéo.
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black pointer-events-none" />
      
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-white px-4">
        <motion.h1 
          className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter text-center uppercase leading-none"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Trail Cascade <br/> <span className="text-emerald-500">Blelma</span>
        </motion.h1>
        
        <motion.div 
          className="absolute bottom-10 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-gray-400">Scroll to begin</span>
          <motion.div 
            className="h-16 w-[1px] bg-emerald-500"
            animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </div>
  );
}

function Story() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.3], [0, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.5, 0.6], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.8, 1], [0, 1, 0]);

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=2000&auto=format&fit=crop"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          style={{ scale }}
        />
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative z-10 text-center text-5xl md:text-8xl font-bold text-white px-4">
          <motion.p style={{ opacity: opacity1 }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full" dir="rtl">
            موش مجرد سباق...
          </motion.p>
          <motion.p style={{ opacity: opacity2 }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-emerald-400" dir="rtl">
            رحلة داخل الطبيعة
          </motion.p>
          <motion.p style={{ opacity: opacity3 }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-blue-400" dir="rtl">
            تحدي حقيقي
          </motion.p>
        </div>
      </div>
    </div>
  );
}

const routes = [
  { id: '6km', title: '6KM', subtitle: 'Découvrir', color: 'from-green-500/20 to-emerald-900/80', hover: 'hover:border-emerald-500', text: 'text-emerald-400' },
  { id: '16km', title: '16KM', subtitle: 'Challenger', color: 'from-blue-500/20 to-blue-900/80', hover: 'hover:border-blue-500', text: 'text-blue-400' },
  { id: '26km', title: '26KM', subtitle: 'Survivre', color: 'from-red-500/20 to-red-900/80', hover: 'hover:border-red-500', text: 'text-red-400' },
];

function Routes() {
  return (
    <div className="min-h-screen bg-black py-24 px-4 flex flex-col justify-center">
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="mb-16 text-center text-4xl font-bold text-white md:text-6xl uppercase tracking-tight">
          Choisis ton <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">destin</span>
        </h2>
        
        <div className="grid gap-6 md:grid-cols-3 h-auto md:h-[60vh]">
          {routes.map((route, i) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className={`group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b ${route.color} ${route.hover} transition-colors duration-500 py-20 md:py-0`}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
              <div className="relative z-10 text-center">
                <h3 className={`text-6xl font-black md:text-8xl ${route.text}`}>{route.title}</h3>
                <p className="mt-4 text-xl md:text-2xl font-medium text-white uppercase tracking-widest">{route.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ImmersiveVideo() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <div ref={containerRef} className="bg-black py-24 px-4 overflow-hidden">
      <motion.div 
        style={{ scale, opacity, WebkitTransform: 'translateZ(0)' }}
        className="mx-auto max-w-7xl aspect-video rounded-3xl overflow-hidden border border-white/10 relative shadow-2xl"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          className="w-full h-full object-cover"
        >
          <source src="https://belloumi.zo.space/videos/video2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8 md:p-16 pointer-events-none">
          <h2 className="text-3xl md:text-6xl font-bold text-white" dir="rtl">عش التجربة...</h2>
        </div>
      </motion.div>
    </div>
  );
}

function Mission() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-950 py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-emerald-500/30 blur-[120px] rounded-full" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-12 text-4xl font-bold text-emerald-500 md:text-6xl"
          dir="rtl"
        >
          الهدف الاجتماعي
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl leading-relaxed text-gray-300 md:text-4xl md:leading-normal font-medium"
          dir="rtl"
        >
          لا تقتصر التظاهرة على البعد الرياضي فقط بل تحمل هدفاً اجتماعياً؛ تقرّر هذه السنة <span className="text-white font-bold">إنجاز درجات في الجبل</span> لتسهيل وصول الزوّار إلى أسفل الشلال، مع المحافظة على خصوصية المنطقة وطابعها الطبيعي.
        </motion.p>
      </div>
    </div>
  );
}

const schedule = [
  { time: '07:30', title: 'بداية استقبال المشاركين', icon: '👋' },
  { time: '08:00', title: 'افتتاح التظاهرة وانطلاق التنشيط', icon: '🎉' },
  { time: '08:30', title: 'الاحماء و لوحات تنشيطية', icon: '🤸' },
  { time: '08:50', title: 'النشيد الوطني 🇹🇳', icon: '🇹🇳' },
  { time: '09:00', title: 'انطلاق سباق 26 كم', icon: '🔥', highlight: true },
  { time: '09:15', title: 'انطلاق سباق 16 كم', icon: '⚡', highlight: true },
  { time: '09:30', title: 'انطلاق سباق 6 كم', icon: '🏃', highlight: true },
  { time: '10:00', title: 'انطلاق التنشيط ولوحات فنية ورياضية متنوعة', icon: '🎨' },
  { time: '11:00', title: 'انطلاق توزيع الجوائز للمتوجين', icon: '🏆' },
  { time: '14:00', title: 'اختتام التظاهرة', icon: '🏁' },
];

function Timeline() {
  return (
    <div className="bg-black py-24 px-4">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-20 text-center text-4xl font-bold text-white md:text-6xl uppercase tracking-tight">
          Live <span className="text-emerald-500">Experience</span>
        </h2>
        
        <div className="relative border-r-2 border-white/10 pr-8 md:pr-12" dir="rtl">
          {schedule.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1 }}
              className="mb-12 relative"
            >
              <div className={`absolute -right-[41px] md:-right-[57px] top-1 flex h-6 w-6 items-center justify-center rounded-full border-4 border-black ${item.highlight ? 'bg-emerald-500' : 'bg-zinc-700'}`}>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className={`text-2xl font-black font-mono ${item.highlight ? 'text-emerald-400' : 'text-zinc-500'}`} dir="ltr">
                  {item.time}
                </div>
                <div className="flex items-center gap-4 bg-zinc-900/50 p-5 rounded-2xl border border-white/5 flex-1 hover:bg-zinc-800/50 transition-colors">
                  <span className="text-3xl">{item.icon}</span>
                  <h3 className={`text-xl md:text-2xl font-medium ${item.highlight ? 'text-white' : 'text-zinc-300'}`}>
                    {item.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

const experiences = [
  { id: 1, title: 'Tu entends la musique', icon: Music, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { id: 2, title: 'Tu respires la nature', icon: Leaf, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { id: 3, title: 'Tu ressens l\'effort', icon: Activity, color: 'text-orange-400', bg: 'bg-orange-500/10' },
];

function Experience() {
  return (
    <div className="bg-zinc-950 py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3">
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10 }}
              className={`flex flex-col items-center justify-center p-12 rounded-3xl border border-white/5 ${exp.bg} backdrop-blur-sm`}
            >
              <exp.icon className={`mb-6 h-16 w-16 ${exp.color}`} />
              <h3 className="text-2xl font-bold text-white text-center">{exp.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

const mediaItems = [
  { type: 'video', src: 'https://belloumi.zo.space/videos/video3.mp4' },
  { type: 'video', src: 'https://belloumi.zo.space/videos/video4.mp4' },
  { type: 'video', src: 'https://belloumi.zo.space/videos/video5.mp4' },
  { type: 'image', src: 'https://belloumi.zo.space/images/img01.jpg' },
  { type: 'image', src: 'https://belloumi.zo.space/images/img02.jpg' },
  { type: 'image', src: 'https://belloumi.zo.space/images/img03.jpg' },
  { type: 'image', src: 'https://belloumi.zo.space/images/img04.jpg' },
  { type: 'image', src: 'https://belloumi.zo.space/images/img05.jpg' },
  { type: 'image', src: 'https://belloumi.zo.space/images/img06.jpg' },
  { type: 'image', src: 'https://belloumi.zo.space/images/img07.jpg' },
  { type: 'image', src: 'https://belloumi.zo.space/images/img08.jpg' },
  { type: 'image', src: 'https://belloumi.zo.space/images/img09.jpg' },
  { type: 'image', src: 'https://belloumi.zo.space/images/img10.jpg' }
];

function Gallery() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="bg-black py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-16 text-center text-4xl font-bold text-white md:text-6xl uppercase tracking-tight">
          Galerie <span className="text-emerald-500">Cinéma</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaItems.map((item, i) => (
            <motion.div
              key={i}
              className="relative h-64 md:h-96 overflow-hidden rounded-2xl cursor-pointer group bg-zinc-900 shadow-xl"
              style={{ WebkitTransform: 'translateZ(0)' }}
              whileHover={{ scale: 0.98 }}
              onClick={() => setSelectedId(i)}
            >
              {item.type === 'video' ? (
                <video 
                  src={item.src}
                  autoPlay loop muted playsInline webkit-playsinline="true"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <motion.img 
                  src={item.src} 
                  loading="lazy"
                  decoding="async"
                  alt={`Gallery ${i}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[16px] border-l-white border-b-8 border-b-transparent ml-1" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedId !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
              onClick={() => setSelectedId(null)}
            >
              {mediaItems[selectedId].type === 'video' ? (
                <video 
                  src={mediaItems[selectedId].src}
                  controls autoPlay playsInline webkit-playsinline="true"
                  className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain outline-none"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <motion.img 
                  src={mediaItems[selectedId].src} 
                  loading="lazy"
                  decoding="async"
                  className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                  onClick={(e) => e.stopPropagation()}
                />
              )}
              <button 
                className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-sm transition-colors"
                onClick={() => setSelectedId(null)}
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function CTA() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center relative z-10"
      >
        <h2 className="mb-6 text-6xl md:text-9xl font-black text-white" dir="rtl">
          هل أنت مستعد؟
        </h2>
        <p className="mb-16 text-3xl md:text-5xl font-mono text-emerald-500 tracking-widest">
          12 AVRIL 2026
        </p>
        
        <div className="mt-24 flex flex-col items-center gap-6 text-zinc-400">
          <p dir="rtl" className="text-xl">لمزيد الإستفسار الإتصال :</p>
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-2xl font-mono">
            <a href="tel:28283601" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
              <span>📞</span> 28 283 601
            </a>
            <a href="tel:55382953" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
              <span>📞</span> 55 382 953
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function App() {
  return (
    <div className="bg-black text-white selection:bg-emerald-500/30 font-sans pb-24 md:pb-32">
      <Cursor />
      <Hero />
      <Story />
      <Routes />
      <ImmersiveVideo />
      <Mission />
      <Timeline />
      <Experience />
      <Gallery />
      <CTA />

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 z-50 flex justify-center pointer-events-none mix-blend-difference">
        <motion.a
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
          href="https://forms.gle/z4qqUWsdfDxTJ8RQ9"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto flex items-center gap-3 rounded-full bg-white px-8 py-4 md:px-12 md:py-5 text-xl md:text-2xl font-black text-black transition-transform hover:scale-105 active:scale-95"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            🔥
          </motion.span>
          S’inscrire maintenant
        </motion.a>
      </div>
    </div>
  );
}
