"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const scenes = [
  { title: "Where AI Actually Helps", kicker: "CENTER FOR OCEAN LEADERSHIP", body: "A summer of building, testing, and learning", type: "hero" },
  { title: "A five-minute conversation led to this internship", kicker: "A little background", type: "history" },
  { title: "The first two weeks were about finding my footing", body: "I moved beyond writing and question-answering to explore interactive tools people could actually use. Building became easier; judging what was worth building did not.", type: "three", items: [["Explore broadly", "I compared ChatGPT, Claude, Gemini, and NotebookLM while learning how skills, connectors, and coding agents worked."], ["Look for friction", "Start with work that repeatedly eats up twenty or thirty minutes."], ["Build something real", "That advice brought me back to a problem I knew from land planning."]] },
  { title: "In five days, the experiment became a real product", body: "Each version reflected a better understanding of the user and the task.", type: "timeline" },
  { title: "I built three tools, and each tested something different", body: "Hold this map as we move from a fast prototype to COL’s core mission.", type: "three", items: [["01 · Zoning / Atlas", "Can AI quickly create an interface that feels usable?"], ["02 · Policy Intelligence", "Can AI organize incoming information for human review?"], ["03 · IOOS evidence base", "Can AI help assemble a defensible economic-impact case?"]] },
  { title: "The first app was a testing ground", body: "The code came quickly; deciding what the product should be required judgment.", type: "turn" },
  { title: "When Nick returned from China, the first mission changed", body: "COL Policy Intelligence became my first COL-facing application.", type: "policy" },
  { title: "The next mission: IOOS impact", body: "The challenge shifted from monitoring policy to building a defensible economic-impact evidence system.", type: "shift" },
  { title: "Live demo", body: "One source. One chain of evidence. One human reviewer.", type: "demo" },
  { title: "The strongest case is not one giant number", body: "IOOS creates value when better information changes a decision or reduces risk.", type: "value" },
  { title: "Three lessons mattered more than the three products", body: "The builds changed how I think about useful AI experiments.", type: "three", items: [["01 · Explore broadly", "Trying different tools helps reveal the problem that is actually worth solving."], ["02 · Human judgment", "AI accelerates production, but it cannot decide whether the result is useful."], ["03 · Start small", "The technical barrier is now low enough for bounded, reviewable experiments."]] },
  { title: "The technical barrier is lower than it looks", body: "A workflow that once required five services now fits inside one conversation and one database.", type: "tools" },
  { title: "COL can make useful AI experiments routine", body: "Start with one bounded workflow, a clear reviewer, and a prompt anyone can use.", type: "three", items: [["01 · Choose the task", "Start with bounded work that takes time and has a clear result."], ["02 · Name the reviewer", "Keep a person accountable for sources, sensitive information, and the final call."], ["03 · Share the learning", "Save useful prompts, failed attempts, and methods the rest of COL can reuse."]] },
  { title: "The first answer starts the conversation", body: "Use a short loop: show, ask, check, refine, repeat.", type: "prompt" },
  { title: "What Will COL Try First?", body: "Name one useful workflow, one person who will review it, and one small experiment COL can begin.", type: "exercise" },
] as const;

const notes = [
  "Frame the talk as a learning story rather than a product pitch.",
  "Introduce the three locations, then the five-minute reunion conversation and the two questions it created.",
  "The breakthrough was asking which recurring problem was worth solving.",
  "June 1: question box. June 4: property first. June 5: coherent product.",
  "Use this as the map from a fast prototype to COL’s core mission.",
  "Pause. The tools made redesign fast, but judgment determined usefulness.",
  "This was the bridge from coding experiments to an organizational need.",
  "These are two separate applications. The project focus shifted.",
  "Spend five to ten minutes. Start with a real source and show where the reviewer decides.",
  "Use the infrastructure analogy. Comparative cases show the causal chain better than one total.",
  "The lessons are the durable output: explore, review, and start small.",
  "Curiosity and a clear outcome are often enough to begin.",
  "Bounded workflow, named reviewer, visible shared learning.",
  "Invite the audience to photograph or copy the prompt.",
  "Ask for two or three real tasks and choose one to discuss.",
];

function Visual({ type }: { type: string }) {
  if (type === "history") return <div className="history">{[["/deck/image.jpeg","LIFEGUARDING · EAST HAMPTON"],["/deck/image3.png","STONY BROOK · LONG ISLAND"],["/deck/image4.png","MIIS · MONTEREY"]].map(([src,label],i)=><figure key={src} style={{"--i":i} as React.CSSProperties}><img src={src} alt={label}/><figcaption>{label}</figcaption></figure>)}</div>;
  if (type === "timeline") return <div className="timeline">{[["JUNE 1","/deck/image5.png","Question box"],["JUNE 4","/deck/image6.png","Property first"],["JUNE 5","/deck/image7.png","Clear product"]].map(([d,src,label],i)=><figure key={d} style={{"--i":i} as React.CSSProperties}><b>{d}</b><img src={src} alt={`${d}: ${label}`}/><figcaption>{label}</figcaption></figure>)}</div>;
  if (type === "policy") return <img className="wide-shot" src="/deck/image8.png" alt="COL Policy Intelligence application screenshot"/>;
  if (type === "value") return <div className="diagrams"><button onClick={()=>window.open('/deck/image2.jpeg','_blank')}><img src="/deck/image2.jpeg" alt="Observing systems used to improve hurricane prediction diagram"/></button><button onClick={()=>window.open('/deck/image3.jpeg','_blank')}><img src="/deck/image3.jpeg" alt="U.S. Animal Telemetry Network value diagram"/></button></div>;
  if (type === "tools") return <div className="tool-flow"><div><small>EARLIER BUILD</small><img src="/deck/image9.png" alt="Original MARACOOS Impact Hub screenshot from the earlier build"/><strong>GitHub · Streamlit · Vercel · Railway · Supabase</strong></div><span>became →</span><strong>ChatGPT Sites<br/>&amp;<br/>Supabase</strong></div>;
  return null;
}

export default function Home() {
  const [index, setIndex] = useState(0), [overview, setOverview] = useState(false), [presenter, setPresenter] = useState(false);
  const [seconds, setSeconds] = useState(0), [running, setRunning] = useState(false), [privateNote, setPrivateNote] = useState("");
  const demoRef = useRef<HTMLIFrameElement>(null);
  const scene = scenes[index];
  const go = (delta:number) => setIndex(i => Math.max(0, Math.min(scenes.length - 1, i + delta)));
  useEffect(()=>{ const id = running ? window.setInterval(()=>setSeconds(s=>s+1),1000) : 0; return ()=>clearInterval(id); },[running]);
  useEffect(()=>{ setPrivateNote(localStorage.getItem(`note-${index}`)||""); },[index]);
  useEffect(()=>{ const onKey=(e:KeyboardEvent)=>{ const target=e.target as HTMLElement; if(target.matches('input, textarea, iframe, button, a')) return; if(e.key==='ArrowRight'||e.key===' '||e.key==='PageDown'){e.preventDefault();go(1)} if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();go(-1)} if(e.key.toLowerCase()==='p') setPresenter(v=>!v); if(e.key==='Escape') setOverview(false); }; addEventListener('keydown',onKey); return()=>removeEventListener('keydown',onKey); },[]);
  const time=useMemo(()=>`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`,[seconds]);
  const fullscreen=()=>document.documentElement.requestFullscreen?.();
  return <main>
    <section className={`scene scene-${scene.type}`} aria-labelledby="scene-title">
      <div className="wave"/>
      <header><span>{index===10?'PART TWO: FOR COL':'DAY 2 · SESSION 05'}</span><button onClick={fullscreen}>Present</button></header>
      <div className="content" key={index}>
        <p className="kicker">{('kicker' in scene ? scene.kicker : '') || (index===14?'WHERE AI ACTUALLY HELPS':'')}</p>
        <h1 id="scene-title">{scene.title}</h1>
        {'body' in scene && <p className="lede">{scene.body}</p>}
        {scene.type==='hero' && <p className="byline">Boulder Retreat 2026 · Eliot Fisher</p>}
        {scene.type==='history' && <><Visual type="history"/><p className="closing">That opportunity led to two questions: What can AI do now and where could it create lasting value for COL?</p></>}
        {scene.type==='three' && <div className="three">{'items' in scene && scene.items.map((it,i)=><article key={it[0]} style={{"--i":i} as React.CSSProperties}><h2>{it[0]}</h2><p>{it[1]}</p></article>)}</div>}
        {scene.type==='timeline' && <Visual type="timeline"/>}
        {scene.type==='turn' && <blockquote><strong>AI can make a weak idea look finished.</strong><span>Claude and ChatGPT became my first working pair. The tools accelerated every redesign, but human judgment still determined whether the result was useful.</span></blockquote>}
        {scene.type==='policy' && <Visual type="policy"/>}
        {scene.type==='shift' && <div className="shift"><article><b>COL POLICY INTELLIGENCE</b><h2>Monitor federal policy</h2><p>Collect, normalize, deduplicate, and rank new policy items for human review.</p></article><span>FOCUS<br/>SHIFT →</span><article><b>IOOS ECONOMIC IMPACT</b><h2>Build the evidence base</h2><p>Organize sources, trace claims, compare cases, and support defensible conclusions.</p></article></div>}
        {scene.type==='demo' && <div className="demo"><iframe ref={demoRef} src="https://ocean-evidence-commons.eliotfi.chatgpt.site/" title="Ocean Evidence Commons live demo"/><div className="demo-fallback"><img src="/deck/demo-fallback.png" alt="Static fallback matching the live-demo scene from the source presentation"/><a href="https://ocean-evidence-commons.eliotfi.chatgpt.site/" target="_blank" rel="noreferrer">Open live demo ↗</a></div></div>}
        {scene.type==='value' && <><Visual type="value"/><p className="closing">The prototype is ready to guide a discussion. It is not ready to operate without source checks and human review.</p></>}
        {scene.type==='tools' && <Visual type="tools"/>}
        {scene.type==='prompt' && <div className="prompt"><strong>START HERE<br/><em>Pick one task that takes 20 minutes</em></strong><blockquote>“Help me improve this. First, ask me the questions you need to understand the task, the audience, and what a good result looks like.”</blockquote><p>Then review the result, point out what is wrong or missing, and ask for the next version.</p></div>}
      </div>
      <footer><span>CENTER FOR OCEAN LEADERSHIP</span><img src="/deck/image2.png" alt="UCP UCAR Community Programs"/></footer>
    </section>
    <nav className="controls" aria-label="Presentation controls"><button onClick={()=>go(-1)} disabled={!index} aria-label="Previous scene">←</button><button onClick={()=>setOverview(true)}>{String(index+1).padStart(2,'0')} / 15</button><button onClick={()=>go(1)} disabled={index===14} aria-label="Next scene">→</button></nav>
    <div className="progress" aria-hidden="true"><i style={{width:`${(index+1)/15*100}%`}}/></div>
    {overview && <div className="overview" role="dialog" aria-modal="true" aria-label="Scene overview"><button className="close" onClick={()=>setOverview(false)}>Close ×</button><ol>{scenes.map((s,i)=><li key={s.title}><button onClick={()=>{setIndex(i);setOverview(false)}}><b>{String(i+1).padStart(2,'0')}</b>{s.title}</button></li>)}</ol></div>}
    {presenter && <aside className="presenter" aria-label="Presenter mode"><button className="close" onClick={()=>setPresenter(false)}>×</button><small>CURRENT · {index+1}/15</small><h2>{scene.title}</h2><small>NEXT</small><p>{scenes[index+1]?.title || 'End'}</p><div className="timer">{time}</div><div><button onClick={()=>setRunning(v=>!v)}>{running?'Pause':'Start'}</button><button onClick={()=>{setRunning(false);setSeconds(0)}}>Reset</button></div><textarea aria-label="Private presenter notes" value={privateNote} onChange={e=>{setPrivateNote(e.target.value);localStorage.setItem(`note-${index}`,e.target.value)}} placeholder="Private notes…"/><p className="deck-note">{notes[index]}</p><div><button onClick={()=>go(-1)}>Prev</button><button onClick={()=>go(1)}>Next</button><button onClick={()=>setOverview(true)}>Overview</button><button onClick={fullscreen}>Fullscreen</button></div></aside>}
  </main>;
}
