"use client";

import { useEffect, useRef, useState } from "react";

const slides = [
  ["Where AI Actually Helps","A summer of building, testing, and learning","title"],
  ["A five-minute conversation led to this internship","A little background","history"],
  ["The first two weeks were about finding my footing","I moved beyond writing and question-answering to explore interactive tools people could actually use. Building became easier; judging what was worth building did not.","three"],
  ["In five days, the experiment became a real product","Each version reflected a better understanding of the user and the task. I learn visually, so I needed to see and manipulate the work, not send everything into a black box.","timeline"],
  ["I built three tools, and each tested something different","Hold this map as we move from a fast prototype to COL’s core mission.","tools"],
  ["The first app was a testing ground","The code came quickly; deciding what the product should be required judgment.","turn"],
  ["When Nick returned from China, the first mission changed","COL Policy Intelligence became my first COL-facing application.","policy"],
  ["The next mission: IOOS impact","The challenge shifted from monitoring policy to building a defensible economic-impact evidence system.","pivot"],
  ["Live demo","One source. One chain of evidence. One human reviewer.","demo"],
  ["The strongest case is not one giant number","IOOS creates value when better information changes a decision or reduces risk.","value"],
  ["Three lessons mattered more than the three products","The builds changed how I think about useful AI experiments.","lessons"],
  ["The technical barrier is lower than it looks","A workflow that once required five services now fits inside one conversation and one database.","workflow"],
  ["COL can make useful AI experiments routine","Start with one bounded workflow, a clear reviewer, and a prompt anyone can use.","routine"],
  ["The first answer starts the conversation","Use a short loop: show, ask, check, refine, repeat.","prompt"],
  ["What Will COL Try First?","Name one useful workflow, one person who will review it, and one small experiment COL can begin.","close"],
] as const;

const triples: Record<string,string[][]> = {
  three:[["Explore broadly","Compare tools to learn their strengths and weaknesses."],["Look for friction","Start with work that repeatedly eats up twenty or thirty minutes."],["Build something real","Return to a recurring problem you already understand."]],
  tools:[["01 · Zoning / Atlas","Can AI quickly create an interface that feels usable?"],["02 · Policy Intelligence","Can AI organize incoming information for human review?"],["03 · IOOS evidence base","Can AI help assemble a defensible economic-impact case?"]],
  lessons:[["01 · Explore broadly","Trying different tools reveals the problem worth solving."],["02 · Human judgment","AI accelerates production; it cannot decide whether the result is useful."],["03 · Start small","The barrier is low enough for bounded, reviewable experiments."]],
  routine:[["01 · Choose the task","Start with bounded work that takes time and has a clear result."],["02 · Name the reviewer","Keep a person accountable for sources and the final call."],["03 · Share the learning","Save useful prompts, failed attempts, and reusable methods."]],
};

export default function Home(){
  const [index,setIndex]=useState(0),[copied,setCopied]=useState(false),[overview,setOverview]=useState(false);
  const [direction,setDirection]=useState<"forward"|"backward">("forward");
  const [revealed,setRevealed]=useState(1);
  const lock=useRef(false); const [title,body,type]=slides[index];
  const staged=type==="history"||type==="timeline"||Boolean(triples[type]);
  const go=(n:number)=>{setDirection(n<0?"backward":"forward");if(n>0&&staged&&revealed<3){setRevealed(v=>v+1);return}if(n<0&&staged&&revealed>1){setRevealed(v=>v-1);return}setRevealed(1);setIndex(i=>Math.max(0,Math.min(14,i+n)))};
  useEffect(()=>{const wheel=(e:WheelEvent)=>{if(Math.abs(e.deltaY)<18||lock.current)return;e.preventDefault();lock.current=true;go(e.deltaY>0?1:-1);setTimeout(()=>lock.current=false,650)};const key=(e:KeyboardEvent)=>{if((e.target as HTMLElement).matches("button,a,input,textarea,iframe"))return;if(["ArrowRight","ArrowDown","PageDown"," "].includes(e.key)){e.preventDefault();go(1)}if(["ArrowLeft","ArrowUp","PageUp"].includes(e.key)){e.preventDefault();go(-1)}};addEventListener("wheel",wheel,{passive:false});addEventListener("keydown",key);return()=>{removeEventListener("wheel",wheel);removeEventListener("keydown",key)}},[staged,revealed]);

  return <main className={`deck scene-${type}`}>
    <div className="sea" aria-hidden="true"/>
    <header><span>{index===10?"PART TWO: FOR COL":"DAY 2 · SESSION 05"}</span><button onClick={()=>setOverview(true)}>Overview</button></header>
    <section key={index} className={`slide ${direction}`} aria-labelledby="slide-title">
      <div className="copy"><p className="eyebrow">{index===0||index===14?"WHERE AI ACTUALLY HELPS":""}</p><h1 id="slide-title">{title}</h1><p className="lede">{body}</p></div>
      {type==="title"&&<p className="byline">Boulder Retreat 2026 · Eliot Fisher</p>}
      {type==="history"&&<><div className="photo-row">{[["/deck/image.jpeg","LIFEGUARDING · EAST HAMPTON"],["/deck/image3.png","STONY BROOK · LONG ISLAND"],["/deck/image4.png","MIIS · MONTEREY"]].map(([src,label],i)=><figure className={`staged-item ${i<revealed?"revealed":""}`} key={src}><img src={src} alt={label}/><figcaption>{label}</figcaption></figure>)}</div><p className="callout">What can AI do now—and where could it create lasting value for COL?</p></>}
      {triples[type]&&<div className="triple">{triples[type].map(([h,p],i)=><article className={`staged-item ${i<revealed?"revealed":""}`} key={h} style={{"--i":i} as React.CSSProperties}><h2>{h}</h2><p>{p}</p></article>)}</div>}
      {type==="timeline"&&<div className="photo-row timeline">{[["/deck/image5.png","JUNE 1 · Question box"],["/deck/image6.png","JUNE 4 · Property first"],["/deck/image7.png","JUNE 5 · Clear product"]].map(([src,label],i)=><figure className={`staged-item ${i<revealed?"revealed":""}`} key={src}><img src={src} alt={label}/><figcaption>{label}</figcaption></figure>)}</div>}
      {type==="turn"&&<blockquote><strong>AI can make a weak idea look finished.</strong><span>Claude and ChatGPT became my first working pair. The tools accelerated every redesign, but human judgment still determined whether the result was useful.</span></blockquote>}
      {type==="policy"&&<div className="browser-frame"><div className="browser-bar" aria-hidden="true"><i/><i/><i/><span>COL Policy Intelligence</span></div><img className="screen" src="/deck/image8.png" alt="COL Policy Intelligence application"/></div>}
      {type==="pivot"&&<div className="pivot"><article><small>COL POLICY INTELLIGENCE</small><h2>Monitor federal policy</h2><p>Collect, normalize, deduplicate, and rank new policy items for human review.</p></article><b>FOCUS<br/>SHIFT →</b><article><small>IOOS ECONOMIC IMPACT</small><h2>Build the evidence base</h2><p>Organize sources, trace claims, compare cases, and support defensible conclusions.</p></article></div>}
      {type==="demo"&&<><div className="demo-source"><span>Source for the demo</span><code>https://doi.org/10.1093/icesjms/fsae126</code><button onClick={async()=>{await navigator.clipboard.writeText("https://doi.org/10.1093/icesjms/fsae126");setCopied(true);setTimeout(()=>setCopied(false),1800)}}>{copied?"Copied":"Copy DOI"}</button></div><div className="demo-box"><iframe src="https://ocean-evidence-commons.eliotfi.chatgpt.site/" title="Ocean Evidence Commons demo"/></div></>}
      {type==="value"&&<><div className="diagram-row"><img src="/deck/image2.jpeg" alt="Hurricane observing systems diagram"/><img src="/deck/image3.jpeg" alt="Animal Telemetry Network diagram"/></div><p className="callout">The prototype guides discussion. Source checks and human review remain essential.</p></>}
      {type==="workflow"&&<div className="workflow"><div><img src="/deck/image9.png" alt="Original MARACOOS Impact Hub"/><b>GitHub · Streamlit · Vercel · Railway · Supabase</b></div><span>became →</span><strong>ChatGPT Sites<br/>&amp;<br/>Supabase</strong></div>}
      {type==="prompt"&&<div className="prompt"><strong>START HERE<br/><em>Pick one task that takes 20 minutes</em></strong><p>“Help me improve this. First, ask me the questions you need to understand the task, the audience, and what a good result looks like.”</p></div>}
    </section>
    <footer><span>CENTER FOR OCEAN LEADERSHIP</span><img src="/deck/image2.png" alt="UCP UCAR Community Programs"/></footer>
    <nav className="advance" aria-label="Slide navigation"><button onClick={()=>go(-1)} disabled={!index}>← <span>Back</span></button><button className="count" onClick={()=>setOverview(true)}>{String(index+1).padStart(2,"0")} / 15</button><button onClick={()=>go(1)} disabled={index===14}><span>Forward</span> →</button></nav>
    <div className="slide-dots" aria-label={`Slide ${index+1} of 15`}>{slides.map((s,i)=><button key={s[0]} className={i===index?"active":""} aria-label={`Go to slide ${i+1}: ${s[0]}`} aria-current={i===index?"step":undefined} onClick={()=>{setDirection(i<index?"backward":"forward");setRevealed(1);setIndex(i)}}/>)}</div>
    <div className="progress"><i style={{width:`${(index+1)/15*100}%`}}/></div>
    {overview&&<div className="overview" role="dialog" aria-modal="true"><button className="x" onClick={()=>setOverview(false)}>Close ×</button><ol>{slides.map((s,i)=><li key={s[0]}><button onClick={()=>{setRevealed(1);setIndex(i);setOverview(false)}}><b>{String(i+1).padStart(2,"0")}</b>{s[0]}</button></li>)}</ol></div>}
  </main>
}
