import { useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import peerPathLogo from "@/imports/PeerPath_logo.png";
import {
  Home, Users, BookOpen, Award, User, Settings, LogOut, Moon, Sun,
  Search, Bell, Plus, Heart, MessageCircle, Share2, MoreHorizontal,
  TrendingUp, Clock, Star, ChevronRight, ChevronDown, ChevronUp,
  Eye, EyeOff, ArrowLeft, Check, Flag, ThumbsUp, Bookmark,
  GraduationCap, Briefcase, Leaf, Building, HeartHandshake,
  Shield, BarChart3, FileText, AlertTriangle, UserCheck, UserX,
  Trash2, CheckCircle, XCircle, Globe, Lock, Send, Calendar, Mail,
  Zap, BadgeCheck, Hash, Menu, X, Edit3, Camera, Upload, Filter,
  TrendingDown, Activity, Target, Layers, Image
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
type Page = "landing" | "login" | "signup" | "dashboard" | "admin";
type DashView = "feed" | "categories" | "communities" | "community-detail" | "create-post" | "post-detail" | "achievements" | "profile" | "settings";
type AdminView = "overview" | "students" | "posts" | "reports" | "achievements-mgmt";

// ── Brand Tokens ──────────────────────────────────────────────────────────────
const forest = "#2C5E1E";
const terracotta = "#C4622D";
const sage = "#7A9E6B";
const cream = "#F7F2E8";
const beige = "#EDE8DC";
const forestDark = "#1A2E1A";

// ── Mock Data ─────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 1, Icon: GraduationCap, name: "Studies", color: forest, bg: "#E8F0E5", count: 4, desc: "Admissions, scholarships, exam prep and study strategies for academic success.", communities: ["University Admissions","Scholarships","Study Tips","Exam Preparation"] },
  { id: 2, Icon: Briefcase, name: "Career & Skills", color: terracotta, bg: "#F5E8DF", count: 6, desc: "Career guidance, internships, programming, design and interview preparation.", communities: ["Career Guidance","Programming","Designing","AI & Machine Learning","Internships","Interview Prep"] },
  { id: 3, Icon: Leaf, name: "Self Growth", color: sage, bg: "#EBF0E7", count: 6, desc: "Habits, productivity, communication skills and personal development journeys.", communities: ["Productivity","Time Management","Goal Setting","Communication Skills","Public Speaking","Habits & Discipline"] },
  { id: 4, Icon: Building, name: "Campus Life", color: "#8B6914", bg: "#F2EBD9", count: 4, desc: "Hostel life, campus events, university reviews and freshman guides.", communities: ["Hostel Life","Campus Events","University Reviews","Freshman Guide"] },
  { id: 5, Icon: HeartHandshake, name: "Student Support", color: "#9B4F8A", bg: "#F0E8EE", count: 6, desc: "Mental wellbeing, motivation, stress management and student challenges.", communities: ["Friendship","Parents & Family","Stress Management","Motivation","Student Challenges","Work-Life Balance"] },
];

const POSTS = [
  { id:1, type:"experience", title:"How I got a scholarship to a top UK university as a Pakistani student", excerpt:"After 2 years of rejections, I finally figured out what scholarship committees actually look for. Here is my complete journey and the things nobody tells you about the process.", author:"Aisha Malik", initials:"AM", time:"2h ago", category:"Studies", community:"Scholarships", likes:234, comments:47, isAnon:false, tags:["scholarship","UK","abroad"], helpful:true },
  { id:2, type:"question", title:"Is it worth doing an unpaid internship at a startup for experience?", excerpt:"I have two options: paid internship at a corporate company OR unpaid at a growing startup. Both are 3 months. Which would help my career more in the long run?", author:"Anonymous", initials:"?", time:"4h ago", category:"Career & Skills", community:"Internships", likes:89, comments:32, isAnon:true, tags:["internship","career","advice"], helpful:false },
  { id:3, type:"experience", title:"My experience switching from Engineering to CS — no regrets at all", excerpt:"Everyone thought I was crazy for switching in 2nd year. Here is what actually happened and how I managed the transition without losing my GPA or my sanity.", author:"Hassan Ahmed", initials:"HA", time:"1d ago", category:"Studies", community:"University Admissions", likes:412, comments:78, isAnon:false, tags:["switching","CS","engineering"], helpful:true },
  { id:4, type:"question", title:"How to deal with hostel roommate conflicts without ruining the friendship?", excerpt:"My roommate stays up until 3am and I have 8am classes every day. I have tried talking but nothing really changes. Any practical advice from people who have been through this?", author:"Zara Khan", initials:"ZK", time:"5h ago", category:"Campus Life", community:"Hostel Life", likes:156, comments:61, isAnon:false, tags:["hostel","roommate","conflict"], helpful:false },
  { id:5, type:"experience", title:"The Pomodoro technique completely changed how I study for exams", excerpt:"I went from failing my midterms to getting a 3.8 GPA in one semester. The secret was not studying more — it was studying smarter. Here is my exact system with timers and everything.", author:"Fatima Syed", initials:"FS", time:"3d ago", category:"Self Growth", community:"Productivity", likes:567, comments:93, isAnon:false, tags:["study","productivity","tips"], helpful:true },
];

const STUDENTS = [
  { id:1, name:"Aisha Malik", username:"aisha.malik", email:"aisha@lums.edu.pk", institute:"LUMS", level:"Undergraduate", status:"active", joined:"Jan 2024", posts:23, rep:1240 },
  { id:2, name:"Hassan Ahmed", username:"h.ahmed", email:"hassan@nust.edu.pk", institute:"NUST", level:"Graduate", status:"active", joined:"Feb 2024", posts:45, rep:2890 },
  { id:3, name:"Zara Khan", username:"zarakhan", email:"zara@iba.edu.pk", institute:"IBA", level:"Undergraduate", status:"suspended", joined:"Mar 2024", posts:8, rep:340 },
  { id:4, name:"Omar Farooq", username:"omar_f", email:"omar@fast.edu.pk", institute:"FAST", level:"Undergraduate", status:"pending", joined:"Jun 2024", posts:0, rep:0 },
  { id:5, name:"Fatima Syed", username:"fatima.s", email:"fatima@ucp.edu.pk", institute:"UCP", level:"Undergraduate", status:"active", joined:"Apr 2024", posts:67, rep:4120 },
];

const PENDING_POSTS = [
  { id:1, title:"How I cracked LUMS admissions interview", author:"NewStudent01", community:"University Admissions", submitted:"2h ago", type:"experience" },
  { id:2, title:"Free resources for learning Python in 2024", author:"CodeLearner", community:"Programming", submitted:"4h ago", type:"resource" },
  { id:3, title:"Is FAST better than NUST for CS?", author:"Anonymous", community:"University Reviews", submitted:"6h ago", type:"question" },
];

const REPORTS = [
  { id:1, type:"post", content:"Misleading scholarship information post", reporter:"Aisha Malik", reported:"Unknown User", reason:"Misinformation", date:"Today", status:"pending" },
  { id:2, type:"comment", content:"Offensive comment on stress management post", reporter:"Hassan Ahmed", reported:"TrollAccount", reason:"Harassment", date:"Yesterday", status:"pending" },
  { id:3, type:"post", content:"Spam promotional content in Career community", reporter:"Zara Khan", reported:"PromoBot", reason:"Spam", date:"2 days ago", status:"resolved" },
];

const BADGES = [
  { id:1, name:"Verified Student", Icon:BadgeCheck, color:forest, bg:"#E8F0E5", desc:"Completed student verification", earned:true, progress:100 },
  { id:2, name:"Top Contributor", Icon:Star, color:terracotta, bg:"#F5E8DF", desc:"Posted 50+ helpful answers", earned:true, progress:100 },
  { id:3, name:"Helpful Advisor", Icon:ThumbsUp, color:sage, bg:"#EBF0E7", desc:"Received 100+ helpful votes", earned:false, progress:68 },
  { id:4, name:"Community Champion", Icon:Zap, color:"#8B6914", bg:"#F2EBD9", desc:"Active in 5+ communities", earned:false, progress:40 },
  { id:5, name:"Mentor", Icon:Users, color:"#9B4F8A", bg:"#F0E8EE", desc:"Helped 20+ new students", earned:false, progress:25 },
  { id:6, name:"Scholar", Icon:GraduationCap, color:"#1A7A8A", bg:"#E0F0F3", desc:"Shared 10+ study resources", earned:false, progress:10 },
];

// ── Tiny Reusables ─────────────────────────────────────────────────────────────
function Ava({ name, size="md", bg=forest }: { name:string; size?:"xs"|"sm"|"md"|"lg"|"xl"; bg?:string }) {
  const s = { xs:"w-6 h-6 text-[10px]", sm:"w-8 h-8 text-xs", md:"w-10 h-10 text-sm", lg:"w-14 h-14 text-base", xl:"w-20 h-20 text-xl" };
  const init = name==="?"?"?":name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase();
  return <div className={`${s[size]} rounded-full flex items-center justify-center font-bold text-white shrink-0`} style={{backgroundColor:bg}}>{init}</div>;
}

function Pill({ label, color, bg }: { label:string; color:string; bg:string }) {
  return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{color,backgroundColor:bg}}>{label}</span>;
}

function StatusBadge({ s }: { s:string }) {
  const map: Record<string,{label:string;color:string;bg:string}> = {
    active:{label:"Active",color:"#166534",bg:"#dcfce7"},
    suspended:{label:"Suspended",color:"#92400e",bg:"#fef3c7"},
    pending:{label:"Pending",color:"#1d4ed8",bg:"#dbeafe"},
    resolved:{label:"Resolved",color:"#166534",bg:"#dcfce7"},
  };
  const m = map[s] || {label:s,color:"#6b7280",bg:"#f3f4f6"};
  return <Pill label={m.label} color={m.color} bg={m.bg} />;
}

// ── Logo Component ─────────────────────────────────────────────────────────────
function Logo({ collapsed=false }: { collapsed?:boolean }) {
  return (
    <div className={`flex items-center gap-2.5 ${collapsed?"justify-center":""}`}>
      <ImageWithFallback src={peerPathLogo} alt="PeerPath logo" className="h-9 w-auto object-contain" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LANDING PAGE
// ─────────────────────────────────────────────────────────────────────────────
function LandingPage({ nav }: { nav:(p:Page)=>void }) {
  const [faqOpen, setFaqOpen] = useState<number|null>(null);
  const faqs = [
    { q:"Who can join PeerPath?", a:"PeerPath is designed for students aged 16–25 currently enrolled in or recently graduated from any educational institution. All you need is a valid student email or institution verification." },
    { q:"Is PeerPath free to use?", a:"Yes, PeerPath is completely free for all students. Our mission is to make peer guidance accessible to every student regardless of their background or financial situation." },
    { q:"How is this different from Reddit or Quora?", a:"PeerPath is built exclusively for students by students. Our content is moderated by admins and verified student mentors, ensuring quality, relevance, and safety that generic platforms cannot provide." },
    { q:"Can I post anonymously?", a:"Yes. For sensitive topics like mental health, family situations, or personal challenges, you can post completely anonymously. Your identity is protected end-to-end." },
    { q:"How does the admin approval process work?", a:"Every post goes through a quick review by our volunteer admin team before publishing. This ensures content quality and community safety. Most posts are approved within 2–4 hours." },
  ];

  return (
    <div className="min-h-screen" style={{backgroundColor:cream,fontFamily:"'Poppins',sans-serif"}}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b" style={{backgroundColor:"rgba(247,242,232,0.92)",borderColor:"rgba(44,94,30,0.1)"}}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-7 text-sm font-medium" style={{color:"#4A5E4A"}}>
            {["Features","How It Works","Communities","FAQ"].map(l=>(
              <button key={l} className="hover:opacity-70 transition-opacity">{l}</button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={()=>nav("login")} className="text-sm font-semibold px-4 py-2 rounded-xl transition-colors hover:bg-white" style={{color:forest}}>Login</button>
            <button onClick={()=>nav("signup")} className="text-sm font-semibold px-5 py-2 rounded-xl text-white transition-opacity hover:opacity-90" style={{backgroundColor:terracotta}}>Sign Up</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6" style={{backgroundColor:"#E8F0E5",color:forest}}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Now in Beta — Join 2,400+ Students
          </div>
          <h1 className="font-black leading-[1.15] mb-5" style={{fontSize:"clamp(2.4rem,5vw,3.5rem)",color:forestDark}}>
            Students Helping<br />
            <span style={{color:terracotta}}>Students Grow</span>
          </h1>
          <p className="text-lg leading-relaxed mb-8 max-w-xl" style={{color:"#4A5E4A"}}>
            PeerPath is your student growth ecosystem. Ask questions, share real experiences, learn from seniors, and build meaningful connections that last beyond graduation.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={()=>nav("signup")} className="px-7 py-3.5 rounded-2xl text-white font-bold text-base shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl" style={{backgroundColor:terracotta}}>
              Start Your Journey →
            </button>
            <button onClick={()=>nav("login")} className="px-7 py-3.5 rounded-2xl font-bold text-base border-2 transition-all hover:bg-white" style={{borderColor:forest,color:forest}}>
              Explore PeerPath
            </button>
          </div>
          <div className="flex items-center gap-6 mt-10">
            {[{n:"2.4K+",l:"Students"},{n:"12",l:"Communities"},{n:"98%",l:"Found Help"}].map(s=>(
              <div key={s.l}>
                <p className="text-2xl font-black" style={{color:forestDark}}>{s.n}</p>
                <p className="text-xs font-medium" style={{color:sage}}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Hero visual */}
        <div className="relative hidden lg:block">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{backgroundColor:"#E8F0E5",height:"480px"}}>
            <div className="absolute inset-0 flex flex-col gap-3 p-6 overflow-hidden">
              {/* Mock post cards in hero */}
              {[
                { title:"How I got a scholarship to a UK university", type:"Experience", user:"Aisha M.", likes:234 },
                { title:"The Pomodoro technique changed my GPA from 2.1 to 3.8", type:"Experience", user:"Fatima S.", likes:567 },
                { title:"Unpaid startup vs paid corporate internship?", type:"Question", user:"Anonymous", likes:89 },
              ].map((p,i)=>(
                <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border" style={{borderColor:"rgba(44,94,30,0.08)"}}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{backgroundColor: i===2?"#9B9B9B":forest}}>{p.user.split(" ")[0][0]}</div>
                    <span className="text-xs font-semibold" style={{color:forestDark}}>{p.user}</span>
                    <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{backgroundColor:p.type==="Experience"?"#F5E8DF":"#E8EDF5",color:p.type==="Experience"?terracotta:"#4A6FA5"}}>{p.type}</span>
                  </div>
                  <p className="text-xs font-semibold leading-snug mb-2" style={{color:forestDark}}>{p.title}</p>
                  <div className="flex items-center gap-3 text-[10px]" style={{color:"#9B9B9B"}}>
                    <span className="flex items-center gap-1"><Heart className="w-3 h-3"/> {p.likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3"/> {Math.floor(p.likes/5)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-4 right-4 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg" style={{backgroundColor:terracotta}}>
              <Plus className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20" style={{backgroundColor:"white"}}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black mb-3" style={{color:forestDark}}>Everything you need to grow</h2>
            <p className="text-lg" style={{color:"#6B7B6B"}}>A complete ecosystem built for every stage of your student journey</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon:MessageCircle, title:"Ask Freely", desc:"Ask anything — academics, career, life. Get real answers from students who have been there.", color:forest, bg:"#E8F0E5" },
              { Icon:Star, title:"Share Experiences", desc:"Your story could be the guidance someone else desperately needs right now.", color:terracotta, bg:"#F5E8DF" },
              { Icon:Users, title:"Join Communities", desc:"Find your people. 20+ niche communities across 5 major student categories.", color:sage, bg:"#EBF0E7" },
              { Icon:Shield, title:"Trusted & Safe", desc:"Admin moderation, verified students, and anonymous posting keep the space honest and safe.", color:"#9B4F8A", bg:"#F0E8EE" },
            ].map(f=>(
              <div key={f.title} className="rounded-2xl p-6 border transition-shadow hover:shadow-md" style={{borderColor:"rgba(0,0,0,0.06)"}}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{backgroundColor:f.bg}}>
                  <f.Icon className="w-6 h-6" style={{color:f.color}} />
                </div>
                <h3 className="font-bold mb-2" style={{color:forestDark}}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{color:"#6B7B6B"}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20" style={{backgroundColor:cream}}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black mb-3" style={{color:forestDark}}>How PeerPath works</h2>
            <p className="text-lg" style={{color:"#6B7B6B"}}>From signup to getting real guidance in three simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step:"01", title:"Create your student profile", desc:"Sign up with your student email, verify your identity, and set up your academic profile. Takes under 3 minutes.", color:forest },
              { step:"02", title:"Join communities you care about", desc:"Browse 5 major categories and 20+ communities. Follow topics that match your goals, questions, and interests.", color:terracotta },
              { step:"03", title:"Learn, share, and grow together", desc:"Read experiences, ask questions, share your journey. Every interaction builds your reputation and helps others.", color:sage },
            ].map(s=>(
              <div key={s.step} className="relative">
                <div className="text-6xl font-black mb-4 opacity-15 leading-none" style={{color:s.color}}>{s.step}</div>
                <h3 className="text-xl font-bold mb-3" style={{color:forestDark}}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{color:"#6B7B6B"}}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20" style={{backgroundColor:"white"}}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black mb-3" style={{color:forestDark}}>Explore by category</h2>
            <p className="text-lg" style={{color:"#6B7B6B"}}>5 major categories covering every aspect of student life</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CATEGORIES.map(c=>(
              <div key={c.id} className="rounded-2xl p-5 border cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5" style={{borderColor:"rgba(0,0,0,0.06)"}}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{backgroundColor:c.bg}}>
                  <c.Icon className="w-6 h-6" style={{color:c.color}} />
                </div>
                <h3 className="font-bold text-sm mb-1" style={{color:forestDark}}>{c.name}</h3>
                <p className="text-xs" style={{color:"#9B9B9B"}}>{c.count} communities</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20" style={{backgroundColor:cream}}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black mb-3" style={{color:forestDark}}>Students love PeerPath</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote:"PeerPath helped me find a scholarship I never would have discovered on my own. A senior student's experience post literally changed my life.", name:"Aisha Malik", role:"2nd Year, LUMS", initials:"AM" },
              { quote:"I was about to quit my CS degree. After posting anonymously, I got 40 responses from students who had felt the same. That community saved me.", name:"Anonymous Student", role:"3rd Year, NUST", initials:"?" },
              { quote:"As someone who just graduated, PeerPath lets me give back to juniors the same way seniors helped me. It is genuinely rewarding.", name:"Bilal Raza", role:"Graduate, IBA", initials:"BR" },
            ].map(t=>(
              <div key={t.name} className="bg-white rounded-2xl p-6 border" style={{borderColor:"rgba(44,94,30,0.08)"}}>
                <div className="flex mb-4">
                  {[1,2,3,4,5].map(s=><Star key={s} className="w-4 h-4 fill-current" style={{color:terracotta}} />)}
                </div>
                <p className="text-sm leading-relaxed mb-5 italic" style={{color:"#4A5E4A"}}>"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <Ava name={t.initials} size="sm" bg={t.initials==="?"?"#9B9B9B":forest} />
                  <div>
                    <p className="text-sm font-bold" style={{color:forestDark}}>{t.name}</p>
                    <p className="text-xs" style={{color:"#9B9B9B"}}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20" style={{backgroundColor:"white"}}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black mb-3" style={{color:forestDark}}>Frequently asked questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f,i)=>(
              <div key={i} className="rounded-2xl border overflow-hidden" style={{borderColor:"rgba(44,94,30,0.1)"}}>
                <button onClick={()=>setFaqOpen(faqOpen===i?null:i)} className="w-full flex items-center justify-between p-5 text-left" style={{backgroundColor: faqOpen===i?"#E8F0E5":"white"}}>
                  <span className="font-semibold text-sm pr-4" style={{color:forestDark}}>{f.q}</span>
                  {faqOpen===i ? <ChevronUp className="w-5 h-5 shrink-0" style={{color:forest}} /> : <ChevronDown className="w-5 h-5 shrink-0" style={{color:"#9B9B9B"}} />}
                </button>
                {faqOpen===i && (
                  <div className="px-5 pb-5" style={{backgroundColor:"#E8F0E5"}}>
                    <p className="text-sm leading-relaxed" style={{color:"#4A5E4A"}}>{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20" style={{backgroundColor:forestDark}}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Ready to grow with your peers?</h2>
          <p className="text-lg mb-8" style={{color:"rgba(255,255,255,0.65)"}}>Join thousands of students navigating academic and career life together.</p>
          <button onClick={()=>nav("signup")} className="px-8 py-4 rounded-2xl font-bold text-white text-lg shadow-lg hover:opacity-90 transition-opacity" style={{backgroundColor:terracotta}}>
            Join PeerPath Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t" style={{backgroundColor:forestDark,borderColor:"rgba(255,255,255,0.08)"}}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <ImageWithFallback src={peerPathLogo} alt="PeerPath" className="h-8 w-auto object-contain brightness-0 invert" />
              <span className="text-sm" style={{color:"rgba(255,255,255,0.4)"}}>© 2024 PeerPath. Students helping students grow.</span>
            </div>
            <div className="flex gap-6 text-sm" style={{color:"rgba(255,255,255,0.4)"}}>
              {["Privacy","Terms","Contact"].map(l=><button key={l} className="hover:text-white transition-colors">{l}</button>)}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOGIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
function LoginPage({ nav }: { nav:(p:Page)=>void }) {
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  return (
    <div className="min-h-screen flex" style={{backgroundColor:cream}}>
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12" style={{backgroundColor:forestDark}}>
        <button onClick={()=>nav("landing")} className="self-start">
          <ImageWithFallback src={peerPathLogo} alt="PeerPath" className="h-10 w-auto object-contain brightness-0 invert" />
        </button>
        <div>
          <h2 className="text-4xl font-black text-white mb-4 leading-tight">Welcome back to your<br /><span style={{color:terracotta}}>growth journey</span></h2>
          <p className="text-lg" style={{color:"rgba(255,255,255,0.55)"}}>Your community, your experiences, your future — all in one place.</p>
          <div className="mt-10 space-y-4">
            {["Real experiences from real students","Anonymous posting when you need it","Verified peers you can trust"].map(t=>(
              <div key={t} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{backgroundColor:terracotta}}><Check className="w-3 h-3 text-white" /></div>
                <span className="text-sm" style={{color:"rgba(255,255,255,0.7)"}}>{t}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs" style={{color:"rgba(255,255,255,0.3)"}}>PeerPath · Students Helping Students Grow</p>
      </div>
      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <button onClick={()=>nav("landing")} className="lg:hidden mb-8 block">
            <ImageWithFallback src={peerPathLogo} alt="PeerPath" className="h-10 w-auto object-contain" />
          </button>
          <h1 className="text-3xl font-black mb-2" style={{color:forestDark}}>Sign in</h1>
          <p className="text-sm mb-8" style={{color:"#6B7B6B"}}>Don&apos;t have an account? <button onClick={()=>nav("signup")} className="font-semibold underline" style={{color:forest}}>Sign up free</button></p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{color:forestDark}}>Email or username</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@university.edu" className="w-full px-4 py-3 rounded-xl text-sm border outline-none transition-all focus:ring-2" style={{backgroundColor:"white",borderColor:"rgba(44,94,30,0.15)",color:forestDark,fontFamily:"'Poppins',sans-serif"}} />
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-semibold" style={{color:forestDark}}>Password</label>
                <button className="text-xs font-semibold" style={{color:forest}}>Forgot password?</button>
              </div>
              <div className="relative">
                <input type={showPwd?"text":"password"} value={pwd} onChange={e=>setPwd(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 pr-11 rounded-xl text-sm border outline-none transition-all" style={{backgroundColor:"white",borderColor:"rgba(44,94,30,0.15)",color:forestDark,fontFamily:"'Poppins',sans-serif"}} />
                <button onClick={()=>setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{color:"#9B9B9B"}}>
                  {showPwd?<EyeOff className="w-4 h-4"/>:<Eye className="w-4 h-4"/>}
                </button>
              </div>
            </div>
            <button onClick={()=>nav("dashboard")} className="w-full py-3.5 rounded-xl font-bold text-white text-sm shadow-md hover:opacity-90 transition-opacity mt-2" style={{backgroundColor:terracotta}}>
              Sign in to PeerPath
            </button>
          </div>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t" style={{borderColor:"rgba(44,94,30,0.1)"}}/></div>
            <div className="relative flex justify-center"><span className="px-3 text-xs" style={{backgroundColor:cream,color:"#9B9B9B"}}>or continue with</span></div>
          </div>
          <button className="w-full py-3 rounded-xl border text-sm font-semibold hover:bg-white transition-colors" style={{borderColor:"rgba(44,94,30,0.15)",color:forestDark}}>
            🎓 Sign in with Student ID
          </button>
          <button onClick={()=>nav("admin")} className="w-full mt-3 text-xs text-center" style={{color:"#B0B0B0"}}>Admin access →</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SIGNUP PAGE (multi-step)
// ─────────────────────────────────────────────────────────────────────────────
function SignupPage({ nav }: { nav:(p:Page)=>void }) {
  const [step, setStep] = useState(1);
  const [showPwd, setShowPwd] = useState(false);
  const steps = ["Personal Info","Education","Verification","Complete"];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12" style={{backgroundColor:cream}}>
      <button onClick={()=>nav("landing")} className="mb-8">
        <ImageWithFallback src={peerPathLogo} alt="PeerPath" className="h-10 w-auto object-contain" />
      </button>
      <div className="w-full max-w-lg">
        {/* Step indicator */}
        <div className="flex items-center justify-between mb-10">
          {steps.map((s,i)=>(
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i+1===step?"text-white":i+1<step?"text-white":"text-gray-400"}`} style={{backgroundColor: i+1<step?sage:i+1===step?forest:"#E0E0E0"}}>
                {i+1<step?<Check className="w-4 h-4"/>:i+1}
              </div>
              {i<steps.length-1 && <div className="flex-1 h-0.5 w-10" style={{backgroundColor: i+1<step?sage:"#E0E0E0"}}/>}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border" style={{borderColor:"rgba(44,94,30,0.08)"}}>
          {step===1 && (
            <div>
              <h2 className="text-2xl font-black mb-1" style={{color:forestDark}}>Create your account</h2>
              <p className="text-sm mb-6" style={{color:"#6B7B6B"}}>Step 1 of 4 — Personal Information</p>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[{l:"Full Name",p:"Your full name"},{l:"Username",p:"@username"}].map(f=>(
                    <div key={f.l}>
                      <label className="block text-xs font-semibold mb-1.5" style={{color:forestDark}}>{f.l}</label>
                      <input placeholder={f.p} className="w-full px-3.5 py-3 rounded-xl text-sm border outline-none" style={{backgroundColor:"#F7F2E8",borderColor:"rgba(44,94,30,0.12)",color:forestDark,fontFamily:"'Poppins',sans-serif"}} />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{color:forestDark}}>Email Address</label>
                  <input type="email" placeholder="you@university.edu" className="w-full px-3.5 py-3 rounded-xl text-sm border outline-none" style={{backgroundColor:"#F7F2E8",borderColor:"rgba(44,94,30,0.12)",color:forestDark,fontFamily:"'Poppins',sans-serif"}} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {["Password","Confirm Password"].map(l=>(
                    <div key={l}>
                      <label className="block text-xs font-semibold mb-1.5" style={{color:forestDark}}>{l}</label>
                      <div className="relative">
                        <input type={showPwd?"text":"password"} placeholder="••••••••" className="w-full px-3.5 py-3 pr-10 rounded-xl text-sm border outline-none" style={{backgroundColor:"#F7F2E8",borderColor:"rgba(44,94,30,0.12)",color:forestDark,fontFamily:"'Poppins',sans-serif"}} />
                        <button onClick={()=>setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{color:"#9B9B9B"}}><EyeOff className="w-4 h-4"/></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {step===2 && (
            <div>
              <h2 className="text-2xl font-black mb-1" style={{color:forestDark}}>Education Details</h2>
              <p className="text-sm mb-6" style={{color:"#6B7B6B"}}>Step 2 of 4 — Tell us about your studies</p>
              <div className="space-y-4">
                {[
                  {l:"Education Level",type:"select",opts:["Select level","High School","Undergraduate","Graduate","PhD"]},
                  {l:"Institution Name",type:"text",ph:"e.g. LUMS, NUST, IBA"},
                  {l:"Field of Study",type:"text",ph:"e.g. Computer Science"},
                  {l:"Expected Graduation Year",type:"select",opts:["Select year","2024","2025","2026","2027","2028"]},
                ].map(f=>(
                  <div key={f.l}>
                    <label className="block text-xs font-semibold mb-1.5" style={{color:forestDark}}>{f.l}</label>
                    {f.type==="select"?(
                      <select className="w-full px-3.5 py-3 rounded-xl text-sm border outline-none" style={{backgroundColor:"#F7F2E8",borderColor:"rgba(44,94,30,0.12)",color:forestDark,fontFamily:"'Poppins',sans-serif"}}>
                        {f.opts?.map(o=><option key={o}>{o}</option>)}
                      </select>
                    ):(
                      <input placeholder={f.ph} className="w-full px-3.5 py-3 rounded-xl text-sm border outline-none" style={{backgroundColor:"#F7F2E8",borderColor:"rgba(44,94,30,0.12)",color:forestDark,fontFamily:"'Poppins',sans-serif"}} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {step===3 && (
            <div>
              <h2 className="text-2xl font-black mb-1" style={{color:forestDark}}>Student Verification</h2>
              <p className="text-sm mb-6" style={{color:"#6B7B6B"}}>Step 3 of 4 — Help us verify you are a student</p>
              <div className="rounded-2xl p-4 mb-5" style={{backgroundColor:"#E8F0E5"}}>
                <p className="text-xs font-semibold" style={{color:forest}}>Why do we verify? PeerPath is exclusively for students. Verification ensures our community stays authentic and safe for everyone.</p>
              </div>
              <div className="space-y-4">
                {[
                  {l:"What is your current semester or year?",ph:"e.g. 3rd Semester / 2nd Year"},
                  {l:"Name one course you are currently enrolled in",ph:"e.g. Data Structures, Financial Accounting"},
                  {l:"What is the name of your department or faculty?",ph:"e.g. Faculty of Engineering"},
                ].map(q=>(
                  <div key={q.l}>
                    <label className="block text-xs font-semibold mb-1.5" style={{color:forestDark}}>{q.l}</label>
                    <input placeholder={q.ph} className="w-full px-3.5 py-3 rounded-xl text-sm border outline-none" style={{backgroundColor:"#F7F2E8",borderColor:"rgba(44,94,30,0.12)",color:forestDark,fontFamily:"'Poppins',sans-serif"}} />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{color:forestDark}}>Upload Student ID (optional)</label>
                  <div className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer hover:bg-green-50 transition-colors" style={{borderColor:"rgba(44,94,30,0.2)"}}>
                    <Upload className="w-6 h-6" style={{color:sage}} />
                    <p className="text-xs text-center" style={{color:"#9B9B9B"}}>Drag & drop or click to upload<br/>JPG, PNG, PDF up to 5MB</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {step===4 && (
            <div className="text-center py-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5" style={{backgroundColor:"#E8F0E5"}}>
                <CheckCircle className="w-10 h-10" style={{color:forest}} />
              </div>
              <h2 className="text-2xl font-black mb-2" style={{color:forestDark}}>You&apos;re almost in!</h2>
              <p className="text-sm mb-6 max-w-xs mx-auto" style={{color:"#6B7B6B"}}>Your account is under review. We verify every student to keep PeerPath safe. You will get an email within 24 hours.</p>
              <div className="rounded-2xl p-4 text-left mb-6" style={{backgroundColor:"#F5E8DF"}}>
                <p className="text-xs font-semibold mb-1" style={{color:terracotta}}>While you wait, you can:</p>
                {["Browse public posts and communities","Read experiences from other students","Prepare your first post idea"].map(t=>(
                  <div key={t} className="flex items-center gap-2 mt-1.5">
                    <ChevronRight className="w-3 h-3 shrink-0" style={{color:terracotta}} />
                    <span className="text-xs" style={{color:"#6B7B6B"}}>{t}</span>
                  </div>
                ))}
              </div>
              <button onClick={()=>nav("dashboard")} className="w-full py-3.5 rounded-xl font-bold text-white text-sm" style={{backgroundColor:terracotta}}>
                Explore PeerPath
              </button>
            </div>
          )}

          {step<4 && (
            <div className="flex gap-3 mt-8">
              {step>1 && <button onClick={()=>setStep(step-1)} className="flex-1 py-3 rounded-xl border font-semibold text-sm" style={{borderColor:"rgba(44,94,30,0.15)",color:forest}}>Back</button>}
              <button onClick={()=>setStep(step+1)} className="flex-1 py-3.5 rounded-xl font-bold text-white text-sm" style={{backgroundColor: step<3?forest:terracotta}}>
                {step===3?"Submit for Verification":"Continue →"}
              </button>
            </div>
          )}
        </div>
        <p className="text-center text-xs mt-4" style={{color:"#9B9B9B"}}>Already have an account? <button onClick={()=>nav("login")} className="font-semibold" style={{color:forest}}>Sign in</button></p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD LAYOUT
// ─────────────────────────────────────────────────────────────────────────────
function DashboardLayout({ children, view, setView, nav }: { children:React.ReactNode; view:DashView; setView:(v:DashView)=>void; nav:(p:Page)=>void }) {
  const [collapsed, setCollapsed] = useState(false);
  const navItems: {icon:React.ComponentType<{className?:string}>;label:string;v:DashView}[] = [
    {icon:Home,label:"Home Feed",v:"feed"},
    {icon:BookOpen,label:"Categories",v:"categories"},
    {icon:Users,label:"Communities",v:"communities"},
    {icon:Award,label:"Achievements",v:"achievements"},
    {icon:User,label:"My Profile",v:"profile"},
    {icon:Settings,label:"Settings",v:"settings"},
  ];
  return (
    <div className="flex h-screen overflow-hidden" style={{backgroundColor:cream}}>
      {/* Sidebar */}
      <aside className={`flex flex-col transition-all duration-300 ${collapsed?"w-16":"w-64"} shrink-0`} style={{backgroundColor:forestDark}}>
        <div className={`p-4 flex items-center ${collapsed?"justify-center":"justify-between"} border-b`} style={{borderColor:"rgba(255,255,255,0.07)"}}>
          {!collapsed && <ImageWithFallback src={peerPathLogo} alt="PeerPath" className="h-8 w-auto object-contain brightness-0 invert" />}
          <button onClick={()=>setCollapsed(!collapsed)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors" style={{color:"rgba(255,255,255,0.5)"}}>
            <Menu className="w-4 h-4" />
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map(({icon:Icon,label,v})=>{
            const active = view===v;
            return (
              <button key={v} onClick={()=>setView(v)} title={collapsed?label:undefined} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${collapsed?"justify-center":""}`} style={{backgroundColor: active?"rgba(196,98,45,0.2)":undefined, color: active?terracotta:"rgba(255,255,255,0.65)"}}>
                <Icon className="w-4.5 h-4.5 shrink-0" />
                {!collapsed && <span>{label}</span>}
                {active && !collapsed && <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{backgroundColor:terracotta}} />}
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t space-y-0.5" style={{borderColor:"rgba(255,255,255,0.07)"}}>
          <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors ${collapsed?"justify-center":""}`} style={{color:"rgba(255,255,255,0.5)"}}>
            <Moon className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Dark Mode</span>}
          </button>
          <button onClick={()=>nav("landing")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors ${collapsed?"justify-center":""}`} style={{color:"rgba(255,255,255,0.5)"}}>
            <LogOut className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME FEED
// ─────────────────────────────────────────────────────────────────────────────
function HomeFeed({ setView }: { setView:(v:DashView)=>void }) {
  const [tab, setTab] = useState("Trending");
  const [liked, setLiked] = useState<number[]>([]);
  const tabs = ["Trending","Latest","Top Stories","Experiences","Questions"];
  return (
    <div className="flex gap-6 p-6 max-w-6xl mx-auto">
      {/* Feed */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-2xl font-black" style={{color:forestDark}}>Good morning, Aisha 👋</h1>
            <p className="text-sm" style={{color:"#6B7B6B"}}>Here is what your community is talking about</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2.5 rounded-xl bg-white border" style={{borderColor:"rgba(44,94,30,0.1)"}}>
              <Bell className="w-5 h-5" style={{color:forestDark}} />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{backgroundColor:terracotta}} />
            </button>
            <Ava name="AM" size="sm" bg={forest} />
          </div>
        </div>
        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{color:"#9B9B9B"}} />
          <input placeholder="Search posts, experiences, communities..." className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm border outline-none bg-white" style={{borderColor:"rgba(44,94,30,0.1)",color:forestDark,fontFamily:"'Poppins',sans-serif"}} />
        </div>
        {/* Tabs */}
        <div className="flex gap-1 mb-5 bg-white rounded-2xl p-1 border" style={{borderColor:"rgba(44,94,30,0.08)"}}>
          {tabs.map(t=>(
            <button key={t} onClick={()=>setTab(t)} className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all" style={{backgroundColor:tab===t?forest:undefined, color:tab===t?"white":"#6B7B6B"}}>
              {t}
            </button>
          ))}
        </div>
        {/* Create post CTA */}
        <div className="flex items-center gap-3 bg-white rounded-2xl p-4 mb-5 border cursor-pointer hover:shadow-sm transition-shadow" style={{borderColor:"rgba(44,94,30,0.1)"}} onClick={()=>setView("create-post")}>
          <Ava name="AM" size="sm" bg={forest} />
          <div className="flex-1 px-4 py-2.5 rounded-xl text-sm" style={{backgroundColor:"#F7F2E8",color:"#9B9B9B"}}>Share an experience or ask a question...</div>
          <button className="px-4 py-2.5 rounded-xl text-white text-xs font-bold" style={{backgroundColor:terracotta}}>Post</button>
        </div>
        {/* Posts */}
        <div className="space-y-4">
          {POSTS.map(p=>(
            <div key={p.id} onClick={()=>setView("post-detail")} className="bg-white rounded-2xl p-5 border cursor-pointer hover:shadow-md transition-all group" style={{borderColor:"rgba(44,94,30,0.08)"}}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <Ava name={p.isAnon?"?":p.initials} size="sm" bg={p.isAnon?"#9B9B9B":forest} />
                  <div>
                    <p className="text-sm font-bold" style={{color:forestDark}}>
                      {p.isAnon?"Anonymous":p.author}
                      {p.isAnon && <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full font-semibold" style={{backgroundColor:"#F0E8EE",color:"#9B4F8A"}}>Anon</span>}
                    </p>
                    <p className="text-xs" style={{color:"#9B9B9B"}}>{p.community} · {p.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {p.helpful && <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{backgroundColor:"#E8F0E5",color:forest}}>✓ Helpful</span>}
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize" style={{backgroundColor:p.type==="experience"?"#F5E8DF":"#E8EDF5",color:p.type==="experience"?terracotta:"#4A6FA5"}}>{p.type}</span>
                </div>
              </div>
              <h3 className="font-bold mb-2 leading-snug group-hover:opacity-80 transition-opacity" style={{color:forestDark}}>{p.title}</h3>
              <p className="text-sm leading-relaxed mb-3 line-clamp-2" style={{color:"#6B7B6B"}}>{p.excerpt}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tags.map(t=><span key={t} className="px-2 py-0.5 rounded-full text-xs font-medium" style={{backgroundColor:beige,color:forest}}>#{t}</span>)}
              </div>
              <div className="flex items-center justify-between pt-3 border-t" style={{borderColor:"rgba(44,94,30,0.06)"}}>
                <div className="flex items-center gap-4">
                  <button onClick={e=>{e.stopPropagation();setLiked(l=>l.includes(p.id)?l.filter(x=>x!==p.id):[...l,p.id])}} className="flex items-center gap-1.5 text-sm transition-colors" style={{color:liked.includes(p.id)?terracotta:"#9B9B9B"}}>
                    <Heart className={`w-4 h-4 ${liked.includes(p.id)?"fill-current":""}`} /> {p.likes+(liked.includes(p.id)?1:0)}
                  </button>
                  <button className="flex items-center gap-1.5 text-sm" style={{color:"#9B9B9B"}}><MessageCircle className="w-4 h-4"/> {p.comments}</button>
                  <button className="flex items-center gap-1.5 text-sm" style={{color:"#9B9B9B"}}><Share2 className="w-4 h-4"/></button>
                </div>
                <button className="text-sm" style={{color:"#9B9B9B"}}><Bookmark className="w-4 h-4"/></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right sidebar */}
      <div className="w-72 shrink-0 hidden xl:block space-y-5">
        {/* Trending topics */}
        <div className="bg-white rounded-2xl p-5 border" style={{borderColor:"rgba(44,94,30,0.08)"}}>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4" style={{color:terracotta}} />
            <h3 className="font-bold text-sm" style={{color:forestDark}}>Trending Topics</h3>
          </div>
          {["#scholarship","#internship","#studytips","#NUST","#LUMS","#anxiety"].map((t,i)=>(
            <div key={t} className="flex items-center justify-between py-2 border-b last:border-0" style={{borderColor:"rgba(44,94,30,0.05)"}}>
              <span className="text-sm font-medium" style={{color:forest}}>{t}</span>
              <span className="text-xs" style={{color:"#9B9B9B"}}>{120-i*15} posts</span>
            </div>
          ))}
        </div>
        {/* Suggested communities */}
        <div className="bg-white rounded-2xl p-5 border" style={{borderColor:"rgba(44,94,30,0.08)"}}>
          <h3 className="font-bold text-sm mb-4" style={{color:forestDark}}>Suggested Communities</h3>
          {[{name:"Scholarships",members:"1.2K",icon:GraduationCap},{name:"Programming",members:"2.4K",icon:Hash},{name:"Productivity",members:"890",icon:Target}].map(c=>(
            <div key={c.name} className="flex items-center gap-3 py-2.5 border-b last:border-0" style={{borderColor:"rgba(44,94,30,0.05)"}}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor:"#E8F0E5"}}>
                <c.icon className="w-4 h-4" style={{color:forest}} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{color:forestDark}}>{c.name}</p>
                <p className="text-xs" style={{color:"#9B9B9B"}}>{c.members} members</p>
              </div>
              <button className="text-xs px-2.5 py-1 rounded-lg font-semibold" style={{backgroundColor:"#E8F0E5",color:forest}}>Join</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────────────────────────────────────
function CategoriesPage({ setView, setActiveCat }: { setView:(v:DashView)=>void; setActiveCat:(c:typeof CATEGORIES[0])=>void }) {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black mb-1" style={{color:forestDark}}>Explore Categories</h1>
        <p className="text-sm" style={{color:"#6B7B6B"}}>Find communities that match your interests and goals</p>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {CATEGORIES.map(c=>(
          <div key={c.id} onClick={()=>{setActiveCat(c);setView("communities");}} className="bg-white rounded-3xl p-6 border cursor-pointer hover:shadow-lg transition-all hover:-translate-y-0.5 group" style={{borderColor:"rgba(44,94,30,0.08)"}}>
            <div className="flex items-center justify-between mb-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{backgroundColor:c.bg}}>
                <c.Icon className="w-7 h-7" style={{color:c.color}} />
              </div>
              <div className="text-right">
                <p className="text-2xl font-black" style={{color:c.color}}>{c.count}</p>
                <p className="text-xs" style={{color:"#9B9B9B"}}>communities</p>
              </div>
            </div>
            <h3 className="text-lg font-black mb-2" style={{color:forestDark}}>{c.name}</h3>
            <p className="text-xs leading-relaxed mb-4" style={{color:"#6B7B6B"}}>{c.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {c.communities.slice(0,3).map(com=>(
                <span key={com} className="text-[10px] px-2 py-1 rounded-lg font-semibold" style={{backgroundColor:c.bg,color:c.color}}>{com}</span>
              ))}
              {c.count>3 && <span className="text-[10px] px-2 py-1 rounded-lg font-semibold" style={{backgroundColor:"#F0F0F0",color:"#9B9B9B"}}>+{c.count-3} more</span>}
            </div>
            <div className="mt-4 pt-4 border-t flex items-center justify-between" style={{borderColor:"rgba(44,94,30,0.06)"}}>
              <span className="text-xs font-semibold" style={{color:"#9B9B9B"}}>Explore communities</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" style={{color:c.color}} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMMUNITIES
// ─────────────────────────────────────────────────────────────────────────────
function CommunitiesPage({ activeCat, setView, setActiveCom }: { activeCat:typeof CATEGORIES[0]|null; setView:(v:DashView)=>void; setActiveCom:(c:string)=>void }) {
  const [search, setSearch] = useState("");
  const cat = activeCat || CATEGORIES[0];
  const allComs = cat.communities;
  const filtered = allComs.filter(c=>c.toLowerCase().includes(search.toLowerCase()));
  const memberCounts: Record<string,string> = { "University Admissions":"3.2K","Scholarships":"1.8K","Study Tips":"4.1K","Exam Preparation":"2.9K","Career Guidance":"5.6K","Programming":"7.2K","Designing":"2.4K","AI & Machine Learning":"3.8K","Internships":"4.5K","Interview Prep":"6.1K","Productivity":"3.4K","Time Management":"2.1K","Goal Setting":"1.7K","Communication Skills":"2.8K","Public Speaking":"1.4K","Habits & Discipline":"2.3K","Hostel Life":"1.9K","Campus Events":"3.1K","University Reviews":"4.7K","Freshman Guide":"5.3K","Friendship":"2.6K","Parents & Family":"1.2K","Stress Management":"4.8K","Motivation":"6.3K","Student Challenges":"3.9K","Work-Life Balance":"2.7K" };
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{backgroundColor:cat.bg}}>
          <cat.Icon className="w-6 h-6" style={{color:cat.color}} />
        </div>
        <div>
          <h1 className="text-2xl font-black" style={{color:forestDark}}>{cat.name}</h1>
          <p className="text-sm" style={{color:"#6B7B6B"}}>{cat.communities.length} communities</p>
        </div>
      </div>
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{color:"#9B9B9B"}} />
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search communities..." className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm border outline-none bg-white" style={{borderColor:"rgba(44,94,30,0.1)",color:forestDark,fontFamily:"'Poppins',sans-serif"}} />
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((com,i)=>(
          <div key={com} onClick={()=>{setActiveCom(com);setView("community-detail");}} className="bg-white rounded-2xl p-5 border cursor-pointer hover:shadow-md transition-all group" style={{borderColor:"rgba(44,94,30,0.08)"}}>
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{backgroundColor:cat.bg}}>
                <cat.Icon className="w-5 h-5" style={{color:cat.color}} />
              </div>
              <button className="text-xs px-3 py-1.5 rounded-xl font-bold text-white" style={{backgroundColor:cat.color}}>Join</button>
            </div>
            <h3 className="font-bold mb-1 text-sm" style={{color:forestDark}}>{com}</h3>
            <p className="text-xs mb-3" style={{color:"#9B9B9B"}}>{memberCounts[com]||"1.0K"} members · {(i*7+12)} posts this week</p>
            <div className="flex items-center gap-1">
              {[0,1,2,3].map(j=><div key={j} className="w-5 h-5 rounded-full -ml-1 first:ml-0 border-2 border-white flex items-center justify-center text-white text-[8px] font-bold" style={{backgroundColor:[forest,terracotta,sage,"#8B6914"][j]}}>{["A","H","Z","F"][j]}</div>)}
              <span className="text-[10px] ml-1.5" style={{color:"#9B9B9B"}}>+{Math.floor(Math.random()*200+50)} joined</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMMUNITY DETAIL
// ─────────────────────────────────────────────────────────────────────────────
function CommunityDetail({ activeCom, setView }: { activeCom:string; setView:(v:DashView)=>void }) {
  const [tab, setTab] = useState("Trending");
  const tabs = ["Trending","Newest","Experiences","Questions"];
  return (
    <div className="max-w-5xl mx-auto">
      {/* Banner */}
      <div className="relative h-40 rounded-b-3xl overflow-hidden" style={{background:`linear-gradient(135deg, ${forestDark} 0%, ${forest} 60%, ${sage} 100%)`}}>
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-2xl font-black text-white mb-1">{activeCom}</h1>
              <div className="flex items-center gap-4 text-sm" style={{color:"rgba(255,255,255,0.7)"}}>
                <span>2.4K members</span>
                <span>142 posts</span>
                <span>Active today</span>
              </div>
            </div>
            <button className="px-5 py-2.5 rounded-xl text-sm font-bold text-white" style={{backgroundColor:terracotta}}>+ Join Community</button>
          </div>
        </div>
      </div>
      <div className="p-6 flex gap-6">
        <div className="flex-1 min-w-0">
          {/* Tabs */}
          <div className="flex gap-1 bg-white rounded-2xl p-1 border mb-5" style={{borderColor:"rgba(44,94,30,0.08)"}}>
            {tabs.map(t=>(
              <button key={t} onClick={()=>setTab(t)} className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all" style={{backgroundColor:tab===t?forest:undefined,color:tab===t?"white":"#6B7B6B"}}>
                {t}
              </button>
            ))}
          </div>
          <button onClick={()=>setView("create-post")} className="w-full flex items-center gap-3 bg-white rounded-2xl p-4 border mb-5 hover:shadow-sm transition-shadow" style={{borderColor:"rgba(44,94,30,0.08)"}}>
            <Ava name="AM" size="sm" bg={forest} />
            <span className="text-sm" style={{color:"#9B9B9B"}}>Share your experience in {activeCom}...</span>
            <Plus className="w-5 h-5 ml-auto shrink-0" style={{color:terracotta}} />
          </button>
          <div className="space-y-4">
            {POSTS.slice(0,3).map(p=>(
              <div key={p.id} onClick={()=>setView("post-detail")} className="bg-white rounded-2xl p-5 border cursor-pointer hover:shadow-md transition-all" style={{borderColor:"rgba(44,94,30,0.08)"}}>
                <div className="flex items-center gap-2.5 mb-3">
                  <Ava name={p.isAnon?"?":p.initials} size="sm" bg={p.isAnon?"#9B9B9B":forest} />
                  <div>
                    <p className="text-sm font-bold" style={{color:forestDark}}>{p.isAnon?"Anonymous":p.author}</p>
                    <p className="text-xs" style={{color:"#9B9B9B"}}>{p.time}</p>
                  </div>
                  <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize" style={{backgroundColor:p.type==="experience"?"#F5E8DF":"#E8EDF5",color:p.type==="experience"?terracotta:"#4A6FA5"}}>{p.type}</span>
                </div>
                <h3 className="font-bold text-sm mb-1.5" style={{color:forestDark}}>{p.title}</h3>
                <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{color:"#6B7B6B"}}>{p.excerpt}</p>
                <div className="flex items-center gap-4 text-xs" style={{color:"#9B9B9B"}}>
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3"/> {p.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3"/> {p.comments}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Side panel */}
        <div className="w-64 shrink-0 hidden lg:block space-y-4">
          <div className="bg-white rounded-2xl p-5 border" style={{borderColor:"rgba(44,94,30,0.08)"}}>
            <h4 className="font-bold text-sm mb-3" style={{color:forestDark}}>About this community</h4>
            <p className="text-xs leading-relaxed mb-4" style={{color:"#6B7B6B"}}>A safe space for students to share scholarship opportunities, application tips, and real experiences from those who have successfully secured funding for their studies.</p>
            <div className="space-y-2">
              {[{l:"Members",v:"2,400"},{l:"Posts",v:"142"},{l:"Created",v:"Jan 2024"},{l:"Category",v:"Studies"}].map(s=>(
                <div key={s.l} className="flex justify-between text-xs">
                  <span style={{color:"#9B9B9B"}}>{s.l}</span>
                  <span className="font-semibold" style={{color:forestDark}}>{s.v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border" style={{borderColor:"rgba(44,94,30,0.08)"}}>
            <h4 className="font-bold text-sm mb-3" style={{color:forestDark}}>Top Contributors</h4>
            {["Aisha Malik","Hassan Ahmed","Fatima Syed"].map((n,i)=>(
              <div key={n} className="flex items-center gap-2.5 py-2 border-b last:border-0" style={{borderColor:"rgba(44,94,30,0.05)"}}>
                <Ava name={n} size="xs" bg={[forest,terracotta,sage][i]} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate" style={{color:forestDark}}>{n}</p>
                  <p className="text-[10px]" style={{color:"#9B9B9B"}}>{[24,18,15][i]} helpful posts</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CREATE POST
// ─────────────────────────────────────────────────────────────────────────────
function CreatePost({ setView }: { setView:(v:DashView)=>void }) {
  const [visibility, setVisibility] = useState<"public"|"anonymous">("public");
  const [category, setCategory] = useState("");
  const [submitted, setSubmitted] = useState(false);
  if(submitted) return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <div className="bg-white rounded-3xl p-10 text-center max-w-md shadow-sm border" style={{borderColor:"rgba(44,94,30,0.08)"}}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5" style={{backgroundColor:"#F5E8DF"}}>
          <Clock className="w-10 h-10" style={{color:terracotta}} />
        </div>
        <h2 className="text-2xl font-black mb-2" style={{color:forestDark}}>Post Submitted!</h2>
        <p className="text-sm mb-2" style={{color:"#6B7B6B"}}>Your post is now under admin review.</p>
        <div className="rounded-2xl p-4 mb-6 text-left" style={{backgroundColor:"#F5E8DF"}}>
          <p className="text-xs font-bold mb-1" style={{color:terracotta}}>⏳ Pending Admin Approval</p>
          <p className="text-xs" style={{color:"#6B7B6B"}}>Our moderation team reviews all posts to ensure quality and safety. Most posts are approved within 2–4 hours.</p>
        </div>
        <button onClick={()=>setView("feed")} className="w-full py-3 rounded-xl font-bold text-white text-sm" style={{backgroundColor:forest}}>Back to Feed</button>
      </div>
    </div>
  );
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={()=>setView("feed")} className="p-2 rounded-xl hover:bg-white transition-colors" style={{color:forestDark}}><ArrowLeft className="w-5 h-5"/></button>
        <h1 className="text-2xl font-black" style={{color:forestDark}}>Create a Post</h1>
      </div>
      <div className="bg-white rounded-3xl p-7 border shadow-sm" style={{borderColor:"rgba(44,94,30,0.08)"}}>
        <div className="flex items-center gap-3 mb-6 pb-5 border-b" style={{borderColor:"rgba(44,94,30,0.06)"}}>
          <Ava name="AM" size="md" bg={forest} />
          <div>
            <p className="font-bold text-sm" style={{color:forestDark}}>Aisha Malik</p>
            <p className="text-xs" style={{color:"#9B9B9B"}}>Posting as {visibility==="anonymous"?"Anonymous":"yourself"}</p>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{color:forestDark}}>Post Title *</label>
            <input placeholder="Write a clear, descriptive title..." className="w-full px-4 py-3 rounded-xl text-sm border outline-none" style={{backgroundColor:"#F7F2E8",borderColor:"rgba(44,94,30,0.12)",color:forestDark,fontFamily:"'Poppins',sans-serif"}} />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{color:forestDark}}>Description *</label>
            <textarea rows={5} placeholder="Share your experience, question, or insight in detail. The more context you provide, the more helpful the community can be..." className="w-full px-4 py-3 rounded-xl text-sm border outline-none resize-none" style={{backgroundColor:"#F7F2E8",borderColor:"rgba(44,94,30,0.12)",color:forestDark,fontFamily:"'Poppins',sans-serif"}} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{color:forestDark}}>Category *</label>
              <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm border outline-none" style={{backgroundColor:"#F7F2E8",borderColor:"rgba(44,94,30,0.12)",color:category?forestDark:"#9B9B9B",fontFamily:"'Poppins',sans-serif"}}>
                <option value="">Select category</option>
                {CATEGORIES.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{color:forestDark}}>Community *</label>
              <select className="w-full px-4 py-3 rounded-xl text-sm border outline-none" style={{backgroundColor:"#F7F2E8",borderColor:"rgba(44,94,30,0.12)",color:forestDark,fontFamily:"'Poppins',sans-serif"}}>
                <option>Select community</option>
                {category && CATEGORIES.find(c=>c.name===category)?.communities.map(com=><option key={com}>{com}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-2" style={{color:forestDark}}>Post Visibility</label>
            <div className="grid grid-cols-2 gap-3">
              {([["public","Public","Your name and profile will be visible","Globe"],["anonymous","Anonymous","Your identity will be completely hidden","Lock"]] as const).map(([v,label,desc,IconName])=>{
                const Icon = IconName==="Globe"?Globe:Lock;
                return (
                  <button key={v} onClick={()=>setVisibility(v as "public"|"anonymous")} className="flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all" style={{borderColor: visibility===v?forest:"rgba(44,94,30,0.12)",backgroundColor: visibility===v?"#E8F0E5":"white"}}>
                    <Icon className="w-5 h-5 mt-0.5 shrink-0" style={{color:visibility===v?forest:"#9B9B9B"}} />
                    <div>
                      <p className="text-xs font-bold mb-0.5" style={{color:forestDark}}>{label}</p>
                      <p className="text-[10px] leading-relaxed" style={{color:"#9B9B9B"}}>{desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="rounded-2xl p-4" style={{backgroundColor:"#FFF8F0",borderLeft:`3px solid ${terracotta}`}}>
            <p className="text-xs font-bold mb-1" style={{color:terracotta}}>📋 Admin Review Notice</p>
            <p className="text-xs" style={{color:"#6B7B6B"}}>All posts are reviewed before publishing to maintain community quality. You will receive a notification once approved (typically 2–4 hours).</p>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={()=>setView("feed")} className="flex-1 py-3 rounded-xl border font-semibold text-sm" style={{borderColor:"rgba(44,94,30,0.15)",color:forest}}>Cancel</button>
            <button onClick={()=>setSubmitted(true)} className="flex-1 py-3.5 rounded-xl font-bold text-white text-sm" style={{backgroundColor:terracotta}}>Submit for Review</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// POST DETAIL
// ─────────────────────────────────────────────────────────────────────────────
function PostDetail({ setView }: { setView:(v:DashView)=>void }) {
  const post = POSTS[0];
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const comments = [
    { id:1, author:"Hassan Ahmed", initials:"HA", time:"1h ago", text:"This is exactly the kind of experience post I needed. I have been applying for 2 years without success. Could you share which specific essays made the biggest difference?", likes:34, helpful:true },
    { id:2, author:"Fatima Syed", initials:"FS", time:"2h ago", text:"Amazing breakdown! The part about the recommendation letters really resonated with me. Most guidance online ignores this completely.", likes:18, helpful:false },
    { id:3, author:"Anonymous", initials:"?", time:"3h ago", text:"Did you face any challenges with the GRE/IELTS requirement? I am struggling with the English proficiency test part.", likes:7, helpful:false },
  ];
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button onClick={()=>setView("feed")} className="flex items-center gap-2 text-sm font-semibold mb-5" style={{color:forest}}>
        <ArrowLeft className="w-4 h-4"/> Back to Feed
      </button>
      {/* Post */}
      <div className="bg-white rounded-3xl p-7 border mb-5 shadow-sm" style={{borderColor:"rgba(44,94,30,0.08)"}}>
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <Ava name={post.initials} size="md" bg={forest} />
            <div>
              <p className="font-bold" style={{color:forestDark}}>{post.author}</p>
              <p className="text-xs" style={{color:"#9B9B9B"}}>LUMS · 3rd Year · {post.community} · {post.time}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {post.helpful && <span className="text-xs px-3 py-1 rounded-full font-bold" style={{backgroundColor:"#E8F0E5",color:forest}}>✓ Helpful Answer</span>}
            <span className="text-xs px-3 py-1 rounded-full font-semibold capitalize" style={{backgroundColor:"#F5E8DF",color:terracotta}}>{post.type}</span>
            <button className="p-2 rounded-xl hover:bg-gray-50" style={{color:"#9B9B9B"}}><MoreHorizontal className="w-4 h-4"/></button>
          </div>
        </div>
        <h1 className="text-xl font-black mb-4 leading-snug" style={{color:forestDark}}>{post.title}</h1>
        <div className="text-sm leading-relaxed space-y-3 mb-5" style={{color:"#4A5E4A"}}>
          <p>{post.excerpt}</p>
          <p>The scholarship process taught me more about myself than any class ever did. I applied to 14 scholarships over two years before landing the Chevening award. The key was not just having good grades — it was telling a story that committees could connect with on a human level.</p>
          <p>Three things that made all the difference: (1) Specificity in essays — committees read thousands of generic applications, (2) Strong mentorship references — not just professors but community leaders, (3) Demonstrating a clear return plan for Pakistan.</p>
          <p>Happy to answer any specific questions about Chevening, Commonwealth, or other UK scholarships. You can also DM me on PeerPath — I try to respond within 24 hours.</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-5">
          {post.tags.map(t=><span key={t} className="px-3 py-1 rounded-full text-xs font-semibold" style={{backgroundColor:beige,color:forest}}>#{t}</span>)}
        </div>
        <div className="flex items-center gap-4 pt-4 border-t" style={{borderColor:"rgba(44,94,30,0.07)"}}>
          <button onClick={()=>setLiked(!liked)} className="flex items-center gap-2 text-sm font-semibold transition-colors px-4 py-2 rounded-xl" style={{backgroundColor:liked?"#F5E8DF":"#F7F2E8",color:liked?terracotta:forestDark}}>
            <Heart className={`w-4 h-4 ${liked?"fill-current":""}`}/> {post.likes+(liked?1:0)} Likes
          </button>
          <button className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl" style={{backgroundColor:"#F7F2E8",color:forestDark}}>
            <Share2 className="w-4 h-4"/> Share
          </button>
          <button className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl" style={{backgroundColor:"#F7F2E8",color:forestDark}}>
            <Bookmark className="w-4 h-4"/> Save
          </button>
          <button className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl ml-auto" style={{backgroundColor:"#FFF0F0",color:"#D14040"}}>
            <Flag className="w-4 h-4"/> Report
          </button>
        </div>
      </div>
      {/* Comments */}
      <div className="bg-white rounded-3xl p-7 border shadow-sm" style={{borderColor:"rgba(44,94,30,0.08)"}}>
        <h2 className="font-black mb-5" style={{color:forestDark}}>{post.comments} Comments</h2>
        {/* Add comment */}
        <div className="flex gap-3 mb-6 pb-5 border-b" style={{borderColor:"rgba(44,94,30,0.07)"}}>
          <Ava name="AM" size="sm" bg={forest} />
          <div className="flex-1">
            <textarea value={comment} onChange={e=>setComment(e.target.value)} rows={2} placeholder="Share your thoughts or ask a follow-up..." className="w-full px-4 py-3 rounded-xl text-sm border outline-none resize-none" style={{backgroundColor:"#F7F2E8",borderColor:"rgba(44,94,30,0.12)",color:forestDark,fontFamily:"'Poppins',sans-serif"}} />
            {comment && (
              <button className="mt-2 px-4 py-2 rounded-xl text-sm font-bold text-white" style={{backgroundColor:terracotta}}>
                Post Comment
              </button>
            )}
          </div>
        </div>
        {/* Comment list */}
        <div className="space-y-5">
          {comments.map(c=>(
            <div key={c.id} className="flex gap-3">
              <Ava name={c.initials} size="sm" bg={c.initials==="?"?"#9B9B9B":forest} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold" style={{color:forestDark}}>{c.author}</span>
                  {c.helpful && <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{backgroundColor:"#E8F0E5",color:forest}}>✓ Helpful</span>}
                  <span className="text-xs ml-auto" style={{color:"#9B9B9B"}}>{c.time}</span>
                </div>
                <p className="text-sm leading-relaxed mb-2" style={{color:"#4A5E4A"}}>{c.text}</p>
                <div className="flex items-center gap-4 text-xs" style={{color:"#9B9B9B"}}>
                  <button className="flex items-center gap-1 hover:text-red-400 transition-colors"><Heart className="w-3 h-3"/> {c.likes}</button>
                  <button className="hover:opacity-70">Reply</button>
                  <button className="hover:text-red-400 flex items-center gap-1"><Flag className="w-3 h-3"/> Report</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ACHIEVEMENTS
// ─────────────────────────────────────────────────────────────────────────────
function AchievementsPage() {
  const leaderboard = [
    { rank:1, name:"Fatima Syed", rep:4120, posts:67, badge:"Top Contributor" },
    { rank:2, name:"Hassan Ahmed", rep:2890, posts:45, badge:"Helpful Advisor" },
    { rank:3, name:"Aisha Malik", rep:1240, posts:23, badge:"Verified Student" },
    { rank:4, name:"Bilal Raza", rep:980, posts:19, badge:"Verified Student" },
    { rank:5, name:"Omar Farooq", rep:540, posts:12, badge:"Verified Student" },
  ];
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black mb-1" style={{color:forestDark}}>Achievements</h1>
        <p className="text-sm" style={{color:"#6B7B6B"}}>Earn badges by contributing to your community</p>
      </div>
      {/* My progress card */}
      <div className="rounded-3xl p-6 mb-8 flex items-center gap-6" style={{background:`linear-gradient(135deg, ${forestDark} 0%, ${forest} 100%)`}}>
        <Ava name="AM" size="lg" bg="rgba(255,255,255,0.2)" />
        <div className="flex-1">
          <p className="text-sm text-white/60 mb-1">Your reputation score</p>
          <p className="text-4xl font-black text-white mb-2">1,240 pts</p>
          <div className="flex items-center gap-4 text-sm text-white/70">
            <span>23 posts</span>
            <span>47 helpful votes</span>
            <span>4 communities</span>
          </div>
        </div>
        <div className="hidden md:flex flex-col items-end gap-2">
          <p className="text-xs text-white/50">Rank</p>
          <p className="text-3xl font-black text-white">#3</p>
          <p className="text-xs text-white/50">of 2,400 students</p>
        </div>
      </div>
      {/* Badges grid */}
      <h2 className="text-lg font-black mb-4" style={{color:forestDark}}>Your Badges</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {BADGES.map(b=>(
          <div key={b.id} className={`bg-white rounded-2xl p-5 border transition-all ${b.earned?"shadow-sm":"opacity-60"}`} style={{borderColor:b.earned?b.color+"30":"rgba(44,94,30,0.08)"}}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{backgroundColor:b.earned?b.bg:"#F0F0F0"}}>
                <b.Icon className="w-6 h-6" style={{color:b.earned?b.color:"#C0C0C0"}} />
              </div>
              {b.earned && <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{backgroundColor:b.color}}><Check className="w-3.5 h-3.5 text-white"/></div>}
            </div>
            <h3 className="font-bold text-sm mb-1" style={{color:forestDark}}>{b.name}</h3>
            <p className="text-xs mb-3" style={{color:"#6B7B6B"}}>{b.desc}</p>
            {!b.earned && (
              <div>
                <div className="flex justify-between text-[10px] mb-1" style={{color:"#9B9B9B"}}>
                  <span>Progress</span><span>{b.progress}%</span>
                </div>
                <div className="h-1.5 rounded-full" style={{backgroundColor:"#F0F0F0"}}>
                  <div className="h-full rounded-full transition-all" style={{width:`${b.progress}%`,backgroundColor:b.color}} />
                </div>
              </div>
            )}
            {b.earned && <p className="text-xs font-bold" style={{color:b.color}}>✓ Earned</p>}
          </div>
        ))}
      </div>
      {/* Leaderboard */}
      <h2 className="text-lg font-black mb-4" style={{color:forestDark}}>Community Leaderboard</h2>
      <div className="bg-white rounded-3xl border overflow-hidden" style={{borderColor:"rgba(44,94,30,0.08)"}}>
        {leaderboard.map((s,i)=>(
          <div key={s.rank} className={`flex items-center gap-4 px-6 py-4 border-b last:border-0 ${s.name==="Aisha Malik"?"":"hover:bg-gray-50"} transition-colors`} style={{borderColor:"rgba(44,94,30,0.05)",backgroundColor:s.name==="Aisha Malik"?"#E8F0E5":undefined}}>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black shrink-0 ${i<3?"text-white":""}`} style={{backgroundColor:i===0?"#FFD700":i===1?"#C0C0C0":i===2?"#CD7F32":"#F0F0F0",color:i>=3?forestDark:undefined}}>
              {s.rank}
            </div>
            <Ava name={s.name} size="sm" bg={[forest,terracotta,sage,"#8B6914","#9B4F8A"][i]} />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm" style={{color:forestDark}}>{s.name} {s.name==="Aisha Malik"&&<span className="text-xs ml-1" style={{color:sage}}>(You)</span>}</p>
              <p className="text-xs" style={{color:"#9B9B9B"}}>{s.badge}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-black text-sm" style={{color:forestDark}}>{s.rep.toLocaleString()} pts</p>
              <p className="text-xs" style={{color:"#9B9B9B"}}>{s.posts} posts</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROFILE
// ─────────────────────────────────────────────────────────────────────────────
function ProfilePage() {
  const [tab, setTab] = useState("Posts");
  const tabs = ["Posts","Comments","Saved"];
  return (
    <div className="max-w-4xl mx-auto">
      {/* Cover + avatar */}
      <div className="relative h-40" style={{background:`linear-gradient(135deg, ${forestDark} 0%, ${forest} 60%, ${sage} 100%)`}}>
        <button className="absolute top-4 right-4 p-2 rounded-xl bg-black/20 backdrop-blur-sm" style={{color:"white"}}><Camera className="w-4 h-4"/></button>
      </div>
      <div className="px-6 pb-6">
        <div className="flex items-end justify-between -mt-8 mb-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl border-4 border-white flex items-center justify-center font-black text-2xl text-white shadow-lg" style={{backgroundColor:forest}}>AM</div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border-2 flex items-center justify-center shadow-sm" style={{borderColor:forest}}>
              <Camera className="w-3 h-3" style={{color:forest}} />
            </button>
          </div>
          <button className="px-4 py-2 rounded-xl border text-sm font-semibold flex items-center gap-2" style={{borderColor:"rgba(44,94,30,0.2)",color:forest}}>
            <Edit3 className="w-4 h-4"/> Edit Profile
          </button>
        </div>
        <h1 className="text-xl font-black mb-0.5" style={{color:forestDark}}>Aisha Malik</h1>
        <p className="text-sm mb-1" style={{color:"#9B9B9B"}}>@aisha.malik · Undergraduate · LUMS</p>
        <p className="text-sm leading-relaxed mb-4 max-w-lg" style={{color:"#4A5E4A"}}>3rd year Business student passionate about scholarships, entrepreneurship and helping fellow students navigate the wild world of higher education. Chevening Scholar 2024.</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <Pill label="Verified Student" color={forest} bg="#E8F0E5" />
          <Pill label="Top Contributor" color={terracotta} bg="#F5E8DF" />
          <Pill label="Scholarship Community" color={sage} bg="#EBF0E7" />
        </div>
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 py-4 border-y mb-6" style={{borderColor:"rgba(44,94,30,0.08)"}}>
          {[{n:"23",l:"Posts"},{n:"1,240",l:"Reputation"},{n:"4",l:"Communities"},{n:"189",l:"Helpful Votes"}].map(s=>(
            <div key={s.l} className="text-center">
              <p className="text-2xl font-black" style={{color:forestDark}}>{s.n}</p>
              <p className="text-xs" style={{color:"#9B9B9B"}}>{s.l}</p>
            </div>
          ))}
        </div>
        {/* Communities */}
        <div className="mb-6">
          <h3 className="font-bold text-sm mb-3" style={{color:forestDark}}>Communities</h3>
          <div className="flex flex-wrap gap-2">
            {["Scholarships","Career Guidance","Productivity","Motivation"].map(c=>(
              <div key={c} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold" style={{backgroundColor:"#E8F0E5",color:forest}}>
                <GraduationCap className="w-3 h-3"/> {c}
              </div>
            ))}
          </div>
        </div>
        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-2xl p-1 border mb-5" style={{borderColor:"rgba(44,94,30,0.08)"}}>
          {tabs.map(t=>(
            <button key={t} onClick={()=>setTab(t)} className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all" style={{backgroundColor:tab===t?forest:undefined,color:tab===t?"white":"#6B7B6B"}}>
              {t}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {POSTS.slice(0,3).map(p=>(
            <div key={p.id} className="bg-white rounded-2xl p-4 border flex items-start gap-3 hover:shadow-sm transition-shadow cursor-pointer" style={{borderColor:"rgba(44,94,30,0.08)"}}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize" style={{backgroundColor:p.type==="experience"?"#F5E8DF":"#E8EDF5",color:p.type==="experience"?terracotta:"#4A6FA5"}}>{p.type}</span>
                  <span className="text-xs" style={{color:"#9B9B9B"}}>{p.community} · {p.time}</span>
                </div>
                <h4 className="font-bold text-sm mb-1" style={{color:forestDark}}>{p.title}</h4>
                <div className="flex items-center gap-3 text-xs" style={{color:"#9B9B9B"}}>
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3"/> {p.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3"/> {p.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SETTINGS
// ─────────────────────────────────────────────────────────────────────────────
function SettingsPage() {
  const [notifications, setNotifications] = useState({replies:true,likes:false,weekly:true,community:true});
  const [dark, setDark] = useState(false);
  const [privacy, setPrivacy] = useState({anonymous:true,profile:false});
  const Section = ({title,children}:{title:string;children:React.ReactNode})=>(
    <div className="bg-white rounded-2xl p-6 border mb-4" style={{borderColor:"rgba(44,94,30,0.08)"}}>
      <h3 className="font-bold mb-5 pb-3 border-b text-sm" style={{color:forestDark,borderColor:"rgba(44,94,30,0.08)"}}>{title}</h3>
      {children}
    </div>
  );
  const Toggle = ({on,toggle,label,desc}:{on:boolean;toggle:()=>void;label:string;desc:string})=>(
    <div className="flex items-center justify-between py-3 border-b last:border-0" style={{borderColor:"rgba(44,94,30,0.05)"}}>
      <div>
        <p className="text-sm font-semibold" style={{color:forestDark}}>{label}</p>
        <p className="text-xs" style={{color:"#9B9B9B"}}>{desc}</p>
      </div>
      <button onClick={toggle} className="relative w-11 h-6 rounded-full transition-colors shrink-0" style={{backgroundColor:on?forest:"#D0D0D0"}}>
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${on?"left-6":"left-1"}`}/>
      </button>
    </div>
  );
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-black mb-6" style={{color:forestDark}}>Settings</h1>
      <Section title="Edit Profile">
        <div className="flex items-center gap-4 mb-5">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl text-white" style={{backgroundColor:forest}}>AM</div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border-2 flex items-center justify-center" style={{borderColor:forest}}><Camera className="w-3 h-3" style={{color:forest}}/></button>
          </div>
          <div>
            <p className="font-bold text-sm" style={{color:forestDark}}>Aisha Malik</p>
            <button className="text-xs font-semibold" style={{color:terracotta}}>Change photo</button>
          </div>
        </div>
        <div className="space-y-3">
          {[{l:"Full Name",v:"Aisha Malik"},{l:"Username",v:"@aisha.malik"},{l:"Bio",v:"3rd year Business student @ LUMS..."},{l:"Email",v:"aisha@lums.edu.pk"}].map(f=>(
            <div key={f.l}>
              <label className="block text-xs font-semibold mb-1" style={{color:forestDark}}>{f.l}</label>
              <input defaultValue={f.v} className="w-full px-3.5 py-2.5 rounded-xl text-sm border outline-none" style={{backgroundColor:"#F7F2E8",borderColor:"rgba(44,94,30,0.12)",color:forestDark,fontFamily:"'Poppins',sans-serif"}} />
            </div>
          ))}
          <button className="px-5 py-2.5 rounded-xl text-sm font-bold text-white mt-2" style={{backgroundColor:forest}}>Save Changes</button>
        </div>
      </Section>
      <Section title="Notifications">
        <Toggle on={notifications.replies} toggle={()=>setNotifications(n=>({...n,replies:!n.replies}))} label="Replies to my posts" desc="Get notified when someone replies to your post" />
        <Toggle on={notifications.likes} toggle={()=>setNotifications(n=>({...n,likes:!n.likes}))} label="Likes and reactions" desc="Get notified when someone likes your content" />
        <Toggle on={notifications.weekly} toggle={()=>setNotifications(n=>({...n,weekly:!n.weekly}))} label="Weekly digest" desc="A weekly summary of top posts in your communities" />
        <Toggle on={notifications.community} toggle={()=>setNotifications(n=>({...n,community:!n.community}))} label="Community updates" desc="Important announcements from your communities" />
      </Section>
      <Section title="Privacy">
        <Toggle on={privacy.anonymous} toggle={()=>setPrivacy(p=>({...p,anonymous:!p.anonymous}))} label="Allow anonymous posting" desc="You can post without revealing your identity" />
        <Toggle on={privacy.profile} toggle={()=>setPrivacy(p=>({...p,profile:!p.profile}))} label="Private profile" desc="Only approved followers can see your full profile" />
      </Section>
      <Section title="Appearance">
        <Toggle on={dark} toggle={()=>setDark(!dark)} label="Dark Mode" desc="Switch to a dark theme for comfortable night browsing" />
      </Section>
      <Section title="Password">
        {["Current Password","New Password","Confirm New Password"].map(l=>(
          <div key={l} className="mb-3">
            <label className="block text-xs font-semibold mb-1" style={{color:forestDark}}>{l}</label>
            <input type="password" placeholder="••••••••" className="w-full px-3.5 py-2.5 rounded-xl text-sm border outline-none" style={{backgroundColor:"#F7F2E8",borderColor:"rgba(44,94,30,0.12)",color:forestDark,fontFamily:"'Poppins',sans-serif"}} />
          </div>
        ))}
        <button className="px-5 py-2.5 rounded-xl text-sm font-bold text-white" style={{backgroundColor:terracotta}}>Update Password</button>
      </Section>
      <div className="bg-white rounded-2xl p-5 border" style={{borderColor:"rgba(44,94,30,0.08)"}}>
        <button className="flex items-center gap-2 text-sm font-semibold" style={{color:"#D14040"}}>
          <LogOut className="w-4 h-4"/> Sign out of PeerPath
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN LAYOUT
// ─────────────────────────────────────────────────────────────────────────────
function AdminLayout({ children, view, setView, nav }: { children:React.ReactNode; view:AdminView; setView:(v:AdminView)=>void; nav:(p:Page)=>void }) {
  const items: {Icon:React.ComponentType<{className?:string}>;label:string;v:AdminView;count?:number}[] = [
    {Icon:BarChart3,label:"Dashboard",v:"overview"},
    {Icon:Users,label:"Students",v:"students",count:4},
    {Icon:FileText,label:"Post Moderation",v:"posts",count:3},
    {Icon:AlertTriangle,label:"Reports",v:"reports",count:2},
    {Icon:Award,label:"Achievements",v:"achievements-mgmt"},
  ];
  return (
    <div className="flex h-screen overflow-hidden" style={{backgroundColor:cream}}>
      <aside className="w-64 shrink-0 flex flex-col" style={{backgroundColor:forestDark}}>
        <div className="p-5 border-b" style={{borderColor:"rgba(255,255,255,0.07)"}}>
          <ImageWithFallback src={peerPathLogo} alt="PeerPath" className="h-8 w-auto object-contain brightness-0 invert mb-2" />
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg" style={{backgroundColor:"rgba(196,98,45,0.2)"}}>
            <Shield className="w-3.5 h-3.5" style={{color:terracotta}} />
            <span className="text-xs font-bold" style={{color:terracotta}}>Admin Panel</span>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {items.map(({Icon,label,v,count})=>{
            const active=view===v;
            return (
              <button key={v} onClick={()=>setView(v)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all" style={{backgroundColor:active?"rgba(196,98,45,0.2)":undefined,color:active?terracotta:"rgba(255,255,255,0.65)"}}>
                <Icon className="w-4 h-4 shrink-0"/>
                <span className="flex-1 text-left">{label}</span>
                {count && <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{backgroundColor:terracotta}}>{count}</div>}
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t" style={{borderColor:"rgba(255,255,255,0.07)"}}>
          <div className="flex items-center gap-2.5 px-3 py-2.5 mb-2">
            <Ava name="SA" size="xs" bg={terracotta} />
            <div>
              <p className="text-xs font-bold text-white">Super Admin</p>
              <p className="text-[10px]" style={{color:"rgba(255,255,255,0.4)"}}>admin@peerpath.io</p>
            </div>
          </div>
          <button onClick={()=>nav("landing")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors" style={{color:"rgba(255,255,255,0.5)"}}>
            <ArrowLeft className="w-4 h-4"/> Back to Site
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN OVERVIEW
// ─────────────────────────────────────────────────────────────────────────────
function AdminOverview({ setView }: { setView:(v:AdminView)=>void }) {
  const stats = [
    {label:"Total Students",value:"2,418",delta:"+124 this week",color:forest,bg:"#E8F0E5",Icon:Users},
    {label:"Pending Posts",value:"3",delta:"Needs review",color:terracotta,bg:"#F5E8DF",Icon:Clock},
    {label:"Open Reports",value:"2",delta:"High priority",color:"#D14040",bg:"#FEE2E2",Icon:AlertTriangle},
    {label:"Active Communities",value:"26",label2:"",delta:"+2 this month",color:"#8B6914",bg:"#F2EBD9",Icon:Hash},
  ];
  return (
    <div className="p-6">
      <div className="mb-7">
        <h1 className="text-2xl font-black mb-1" style={{color:forestDark}}>Admin Dashboard</h1>
        <p className="text-sm" style={{color:"#6B7B6B"}}>Welcome back. Here is what needs your attention today.</p>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-7">
        {stats.map(s=>(
          <div key={s.label} className="bg-white rounded-2xl p-5 border" style={{borderColor:"rgba(44,94,30,0.08)"}}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{backgroundColor:s.bg}}>
                <s.Icon className="w-4.5 h-4.5" style={{color:s.color}} />
              </div>
            </div>
            <p className="text-3xl font-black mb-1" style={{color:forestDark}}>{s.value}</p>
            <p className="text-xs font-semibold mb-0.5" style={{color:forestDark}}>{s.label}</p>
            <p className="text-xs" style={{color:s.color}}>{s.delta}</p>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Pending posts */}
        <div className="bg-white rounded-2xl border overflow-hidden" style={{borderColor:"rgba(44,94,30,0.08)"}}>
          <div className="flex items-center justify-between p-5 border-b" style={{borderColor:"rgba(44,94,30,0.06)"}}>
            <h2 className="font-bold text-sm" style={{color:forestDark}}>Pending Posts</h2>
            <button onClick={()=>setView("posts")} className="text-xs font-semibold" style={{color:forest}}>View all →</button>
          </div>
          {PENDING_POSTS.map(p=>(
            <div key={p.id} className="flex items-start gap-3 p-4 border-b last:border-0 hover:bg-gray-50 transition-colors" style={{borderColor:"rgba(44,94,30,0.05)"}}>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate mb-0.5" style={{color:forestDark}}>{p.title}</p>
                <p className="text-[10px]" style={{color:"#9B9B9B"}}>by {p.author} · {p.community} · {p.submitted}</p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button className="p-1.5 rounded-lg" style={{backgroundColor:"#E8F0E5",color:forest}}><Check className="w-3.5 h-3.5"/></button>
                <button className="p-1.5 rounded-lg" style={{backgroundColor:"#FEE2E2",color:"#D14040"}}><X className="w-3.5 h-3.5"/></button>
              </div>
            </div>
          ))}
        </div>
        {/* Recent reports */}
        <div className="bg-white rounded-2xl border overflow-hidden" style={{borderColor:"rgba(44,94,30,0.08)"}}>
          <div className="flex items-center justify-between p-5 border-b" style={{borderColor:"rgba(44,94,30,0.06)"}}>
            <h2 className="font-bold text-sm" style={{color:forestDark}}>Recent Reports</h2>
            <button onClick={()=>setView("reports")} className="text-xs font-semibold" style={{color:forest}}>View all →</button>
          </div>
          {REPORTS.map(r=>(
            <div key={r.id} className="flex items-start gap-3 p-4 border-b last:border-0" style={{borderColor:"rgba(44,94,30,0.05)"}}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{backgroundColor:r.status==="pending"?"#FEE2E2":"#E8F0E5"}}>
                <AlertTriangle className="w-3.5 h-3.5" style={{color:r.status==="pending"?"#D14040":sage}} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate mb-0.5" style={{color:forestDark}}>{r.content}</p>
                <div className="flex items-center gap-2">
                  <StatusBadge s={r.status} />
                  <span className="text-[10px]" style={{color:"#9B9B9B"}}>{r.reason} · {r.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: USER MANAGEMENT
// ─────────────────────────────────────────────────────────────────────────────
function AdminStudents() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const filtered = STUDENTS.filter(s=>{
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter==="all" || s.status===filter;
    return matchSearch && matchFilter;
  });
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-black mb-1" style={{color:forestDark}}>User Management</h1>
        <p className="text-sm" style={{color:"#6B7B6B"}}>Review, approve, suspend and manage student accounts</p>
      </div>
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{color:"#9B9B9B"}} />
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search students..." className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border outline-none bg-white" style={{borderColor:"rgba(44,94,30,0.12)",color:forestDark,fontFamily:"'Poppins',sans-serif"}} />
        </div>
        <div className="flex gap-1 bg-white rounded-xl p-1 border" style={{borderColor:"rgba(44,94,30,0.1)"}}>
          {["all","active","suspended","pending"].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} className="px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all" style={{backgroundColor:filter===f?forest:undefined,color:filter===f?"white":"#6B7B6B"}}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl border overflow-hidden" style={{borderColor:"rgba(44,94,30,0.08)"}}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left" style={{borderColor:"rgba(44,94,30,0.07)",backgroundColor:"#F7F2E8"}}>
              {["Student","Institute","Status","Rep / Posts","Actions"].map(h=>(
                <th key={h} className="px-5 py-3.5 text-xs font-bold" style={{color:"#9B9B9B"}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(s=>(
              <tr key={s.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors" style={{borderColor:"rgba(44,94,30,0.05)"}}>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <Ava name={s.name} size="xs" bg={forest} />
                    <div>
                      <p className="font-semibold text-sm" style={{color:forestDark}}>{s.name}</p>
                      <p className="text-xs" style={{color:"#9B9B9B"}}>{s.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <p className="text-sm font-medium" style={{color:forestDark}}>{s.institute}</p>
                  <p className="text-xs" style={{color:"#9B9B9B"}}>{s.level}</p>
                </td>
                <td className="px-5 py-3.5"><StatusBadge s={s.status} /></td>
                <td className="px-5 py-3.5">
                  <p className="text-sm font-semibold" style={{color:forestDark}}>{s.rep.toLocaleString()} pts</p>
                  <p className="text-xs" style={{color:"#9B9B9B"}}>{s.posts} posts</p>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1.5">
                    {s.status==="pending" && (
                      <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white" style={{backgroundColor:forest}}>
                        <UserCheck className="w-3 h-3"/> Approve
                      </button>
                    )}
                    {s.status==="active" && (
                      <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold" style={{backgroundColor:"#FEF3C7",color:"#92400e"}}>
                        <UserX className="w-3 h-3"/> Suspend
                      </button>
                    )}
                    {s.status==="suspended" && (
                      <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold" style={{backgroundColor:"#E8F0E5",color:forest}}>
                        <UserCheck className="w-3 h-3"/> Restore
                      </button>
                    )}
                    <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold" style={{backgroundColor:"#FEE2E2",color:"#D14040"}}>
                      <XCircle className="w-3 h-3"/> Ban
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: POST MODERATION
// ─────────────────────────────────────────────────────────────────────────────
function AdminPosts() {
  const [approved, setApproved] = useState<number[]>([]);
  const [rejected, setRejected] = useState<number[]>([]);
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-black mb-1" style={{color:forestDark}}>Post Moderation</h1>
        <p className="text-sm" style={{color:"#6B7B6B"}}>Review and moderate posts before they go live</p>
      </div>
      <div className="flex gap-3 mb-5">
        {[{l:"All Posts",n:3},{l:"Pending",n:3,color:terracotta},{l:"Approved",n:0,color:forest},{l:"Rejected",n:0,color:"#D14040"}].map(t=>(
          <div key={t.l} className="bg-white rounded-xl px-4 py-2.5 border" style={{borderColor:"rgba(44,94,30,0.08)"}}>
            <span className="text-xs font-semibold" style={{color:t.color||forestDark}}>{t.l}</span>
            <span className="ml-2 text-xs font-black" style={{color:t.color||forestDark}}>{t.n}</span>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        {PENDING_POSTS.map(p=>{
          const isApproved = approved.includes(p.id);
          const isRejected = rejected.includes(p.id);
          return (
            <div key={p.id} className="bg-white rounded-2xl border overflow-hidden" style={{borderColor:"rgba(44,94,30,0.08)",opacity:isApproved||isRejected?0.6:1}}>
              <div className="p-5">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize" style={{backgroundColor:"#F5E8DF",color:terracotta}}>{p.type}</span>
                      <span className="text-xs" style={{color:"#9B9B9B"}}>{p.community} · {p.submitted}</span>
                    </div>
                    <h3 className="font-bold mb-1" style={{color:forestDark}}>{p.title}</h3>
                    <p className="text-sm" style={{color:"#9B9B9B"}}>by {p.author}</p>
                  </div>
                  {isApproved && <Pill label="✓ Approved" color={forest} bg="#E8F0E5" />}
                  {isRejected && <Pill label="✗ Rejected" color="#D14040" bg="#FEE2E2" />}
                  {!isApproved && !isRejected && <Pill label="Pending Review" color={terracotta} bg="#F5E8DF" />}
                </div>
                <div className="rounded-xl p-4 mb-4" style={{backgroundColor:"#F7F2E8"}}>
                  <p className="text-xs" style={{color:"#6B7B6B"}}>Post preview: This is a placeholder for the full post content that the admin would review before making a moderation decision...</p>
                </div>
                {!isApproved && !isRejected && (
                  <div className="flex gap-3">
                    <button onClick={()=>setApproved(a=>[...a,p.id])} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white" style={{backgroundColor:forest}}>
                      <CheckCircle className="w-4 h-4"/> Approve Post
                    </button>
                    <button onClick={()=>setRejected(r=>[...r,p.id])} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold" style={{backgroundColor:"#FEE2E2",color:"#D14040"}}>
                      <XCircle className="w-4 h-4"/> Reject Post
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold ml-auto" style={{color:"#9B9B9B",backgroundColor:"#F0F0F0"}}>
                      <Flag className="w-4 h-4"/> Flag for Review
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: REPORTS
// ─────────────────────────────────────────────────────────────────────────────
function AdminReports() {
  const [tab, setTab] = useState("Posts");
  const tabs = ["Posts","Comments"];
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-black mb-1" style={{color:forestDark}}>Reports</h1>
        <p className="text-sm" style={{color:"#6B7B6B"}}>Review reported content and take appropriate action</p>
      </div>
      <div className="flex gap-1 bg-white rounded-xl p-1 border mb-5 w-fit" style={{borderColor:"rgba(44,94,30,0.1)"}}>
        {tabs.map(t=>(
          <button key={t} onClick={()=>setTab(t)} className="px-5 py-2 rounded-lg text-sm font-semibold transition-all" style={{backgroundColor:tab===t?forest:undefined,color:tab===t?"white":"#6B7B6B"}}>
            {t}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {REPORTS.map(r=>(
          <div key={r.id} className="bg-white rounded-2xl p-5 border" style={{borderColor:"rgba(44,94,30,0.08)"}}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{backgroundColor:r.status==="pending"?"#FEE2E2":"#E8F0E5"}}>
                  <AlertTriangle className="w-5 h-5" style={{color:r.status==="pending"?"#D14040":sage}} />
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1" style={{color:forestDark}}>{r.content}</h3>
                  <div className="flex items-center gap-3 text-xs" style={{color:"#9B9B9B"}}>
                    <span>Reported by <strong style={{color:forestDark}}>{r.reporter}</strong></span>
                    <span>Against <strong style={{color:forestDark}}>{r.reported}</strong></span>
                    <span>{r.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Pill label={r.reason} color="#92400e" bg="#fef3c7" />
                <StatusBadge s={r.status} />
              </div>
            </div>
            {r.status==="pending" && (
              <div className="flex gap-2 pt-4 border-t" style={{borderColor:"rgba(44,94,30,0.06)"}}>
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold" style={{backgroundColor:"#FEF3C7",color:"#92400e"}}>
                  <UserX className="w-3.5 h-3.5"/> Suspend User
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold" style={{backgroundColor:"#FEE2E2",color:"#D14040"}}>
                  <XCircle className="w-3.5 h-3.5"/> Ban User
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold" style={{backgroundColor:"#E8F0E5",color:forest}}>
                  <Trash2 className="w-3.5 h-3.5"/> Remove Content
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold ml-auto" style={{backgroundColor:"#F0F0F0",color:"#9B9B9B"}}>
                  <CheckCircle className="w-3.5 h-3.5"/> Dismiss Report
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: ACHIEVEMENTS MANAGEMENT
// ─────────────────────────────────────────────────────────────────────────────
function AdminAchievements() {
  const [selected, setSelected] = useState("");
  const [selectedBadge, setSelectedBadge] = useState("");
  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black mb-1" style={{color:forestDark}}>Achievements Management</h1>
        <p className="text-sm" style={{color:"#6B7B6B"}}>Assign and manage student badges and achievements</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Assign badge */}
        <div className="bg-white rounded-2xl p-6 border" style={{borderColor:"rgba(44,94,30,0.08)"}}>
          <h2 className="font-bold mb-5 text-sm" style={{color:forestDark}}>Assign Badge</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{color:forestDark}}>Select Student</label>
              <select value={selected} onChange={e=>setSelected(e.target.value)} className="w-full px-3.5 py-3 rounded-xl text-sm border outline-none" style={{backgroundColor:"#F7F2E8",borderColor:"rgba(44,94,30,0.12)",color:selected?forestDark:"#9B9B9B",fontFamily:"'Poppins',sans-serif"}}>
                <option value="">Choose a student...</option>
                {STUDENTS.filter(s=>s.status==="active").map(s=><option key={s.id} value={s.name}>{s.name} ({s.username})</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-2" style={{color:forestDark}}>Select Badge</label>
              <div className="grid grid-cols-2 gap-2">
                {BADGES.map(b=>(
                  <button key={b.id} onClick={()=>setSelectedBadge(b.name)} className="flex items-center gap-2 p-3 rounded-xl border-2 text-left transition-all" style={{borderColor:selectedBadge===b.name?b.color:"rgba(44,94,30,0.1)",backgroundColor:selectedBadge===b.name?b.bg:"white"}}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{backgroundColor:b.bg}}>
                      <b.Icon className="w-3.5 h-3.5" style={{color:b.color}} />
                    </div>
                    <span className="text-xs font-semibold leading-tight" style={{color:forestDark}}>{b.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{color:forestDark}}>Reason (optional)</label>
              <textarea rows={2} placeholder="Why is this badge being assigned..." className="w-full px-3.5 py-2.5 rounded-xl text-sm border outline-none resize-none" style={{backgroundColor:"#F7F2E8",borderColor:"rgba(44,94,30,0.12)",color:forestDark,fontFamily:"'Poppins',sans-serif"}} />
            </div>
            <button className="w-full py-3 rounded-xl font-bold text-white text-sm" style={{backgroundColor: selected && selectedBadge ? terracotta : "#D0D0D0"}}>
              Assign Badge
            </button>
          </div>
        </div>
        {/* Badge overview */}
        <div className="bg-white rounded-2xl p-6 border" style={{borderColor:"rgba(44,94,30,0.08)"}}>
          <h2 className="font-bold mb-5 text-sm" style={{color:forestDark}}>All Badges</h2>
          <div className="space-y-3">
            {BADGES.map(b=>(
              <div key={b.id} className="flex items-center gap-3 p-3.5 rounded-xl border" style={{borderColor:"rgba(44,94,30,0.08)"}}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{backgroundColor:b.bg}}>
                  <b.Icon className="w-5 h-5" style={{color:b.color}} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold" style={{color:forestDark}}>{b.name}</p>
                  <p className="text-xs" style={{color:"#9B9B9B"}}>{b.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-black" style={{color:b.color}}>{[1240,89,34,12,5,3][b.id-1]}</p>
                  <p className="text-[10px]" style={{color:"#9B9B9B"}}>awarded</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("landing");
  const [dashView, setDashView] = useState<DashView>("feed");
  const [adminView, setAdminView] = useState<AdminView>("overview");
  const [activeCat, setActiveCat] = useState<typeof CATEGORIES[0]|null>(null);
  const [activeCom, setActiveCom] = useState<string>("Scholarships");

  const nav = (p: Page) => { setPage(p); if(p==="dashboard") setDashView("feed"); if(p==="admin") setAdminView("overview"); };

  if(page==="landing") return <LandingPage nav={nav} />;
  if(page==="login")   return <LoginPage nav={nav} />;
  if(page==="signup")  return <SignupPage nav={nav} />;

  if(page==="dashboard") return (
    <DashboardLayout view={dashView} setView={setDashView} nav={nav}>
      {dashView==="feed"             && <HomeFeed setView={setDashView} />}
      {dashView==="categories"       && <CategoriesPage setView={setDashView} setActiveCat={setActiveCat} />}
      {dashView==="communities"      && <CommunitiesPage activeCat={activeCat} setView={setDashView} setActiveCom={setActiveCom} />}
      {dashView==="community-detail" && <CommunityDetail activeCom={activeCom} setView={setDashView} />}
      {dashView==="create-post"      && <CreatePost setView={setDashView} />}
      {dashView==="post-detail"      && <PostDetail setView={setDashView} />}
      {dashView==="achievements"     && <AchievementsPage />}
      {dashView==="profile"          && <ProfilePage />}
      {dashView==="settings"         && <SettingsPage />}
    </DashboardLayout>
  );

  if(page==="admin") return (
    <AdminLayout view={adminView} setView={setAdminView} nav={nav}>
      {adminView==="overview"          && <AdminOverview setView={setAdminView} />}
      {adminView==="students"          && <AdminStudents />}
      {adminView==="posts"             && <AdminPosts />}
      {adminView==="reports"           && <AdminReports />}
      {adminView==="achievements-mgmt" && <AdminAchievements />}
    </AdminLayout>
  );

  return null;
}
