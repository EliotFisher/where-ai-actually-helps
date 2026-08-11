"use client";

import { useEffect, useRef, useState } from "react";

const slides = [
  ["Where AI Actually Helps","A summer of building, testing, and learning","title"],
  ["A five-minute conversation led to this internship","A little background","history"],
  ["The first two weeks turned exploration into three real tests","I moved beyond question-answering to build interfaces, organize information, and test where human judgment still mattered.","orientation"],
  ["In five days, the experiment became a real product","Each version reflected a better understanding of the user and the task. I learn visually, so I needed to see and manipulate the work, not send everything into a black box.","timeline"],
  ["The first app was a testing ground","The code came quickly; deciding what the product should be required judgment.","turn"],
  ["Policy Intelligence made the value of AI concrete","The useful part was not faster writing. It was turning a scattered stream of policy updates into a reviewable queue for COL.","policy"],
  ["The next mission: IOOS impact","The challenge shifted from monitoring policy to building a defensible economic-impact evidence system.","pivot"],
  ["Live demo","One source. One chain of evidence. One human reviewer.","demo"],
  ["The strongest case is not one giant number","IOOS creates value when better information changes a decision or reduces risk.","value"],
  ["Three lessons mattered more than the three products","The builds changed how I think about useful AI experiments.","lessons"],
  ["A simple two-part system was enough","ChatGPT Sites provides the interface. Supabase is the shared online database that stores sources, claims, and review status.","workflow"],
  ["Two decisions would turn these experiments into COL value","Choose whether Policy Intelligence should become a COL tool, then refine the IOOS economics project for all regions and pursue support from NOAA or the RAs.","recommendations"],
  ["Use AI without losing judgment or authenticity","AI should improve the work without flattening COL’s voice.","guardrails"],
  ["Where should COL use AI?","Three questions for discussion","discussion"],
] as const;

const triples: Record<string,string[][]> = {
  orientation:[["01 · Zoning / Atlas","Can AI quickly create an interface that feels usable?"],["02 · Policy Intelligence","Can AI organize incoming information for human review?"],["03 · IOOS evidence base","Can AI help assemble a defensible economic-impact case?"]],
  lessons:[["01 · Explore broadly","Trying different tools reveals the problem worth solving."],["02 · Human judgment","AI accelerates production; it cannot decide whether the result is useful."],["03 · Start small","The barrier is low enough for bounded, reviewable experiments."]],
};

export default function Home(){
  const [index,setIndex]=useState(0),[copied,setCopied]=useState(false),[overview,setOverview]=useState(false);
  const [direction,setDirection]=useState<"forward"|"backward">("forward");
  const [revealed,setRevealed]=useState(1);
  const lock=useRef(false); const [title,body,type]=slides[index];
  const last=slides.length-1;
  const staged=type==="history"||type==="timeline"||type==="discussion"||Boolean(triples[type]);
  const go=(n:number)=>{setDirection(n<0?"backward":"forward");if(n>0&&staged&&revealed<3){setRevealed(v=>v+1);return}if(n<0&&staged&&revealed>1){setRevealed(v=>v-1);return}setRevealed(1);setIndex(i=>Math.max(0,Math.min(last,i+n)))};
  useEffect(()=>{const wheel=(e:WheelEvent)=>{if(Math.abs(e.deltaY)<18||lock.current)return;e.preventDefault();lock.current=true;go(e.deltaY>0?1:-1);setTimeout(()=>lock.current=false,650)};const key=(e:KeyboardEvent)=>{if((e.target as HTMLElement).matches("button,a,input,textarea,iframe"))return;if(["ArrowRight","ArrowDown","PageDown"," "].includes(e.key)){e.preventDefault();go(1)}if(["ArrowLeft","ArrowUp","PageUp"].includes(e.key)){e.preventDefault();go(-1)}};addEventListener("wheel",wheel,{passive:false});addEventListener("keydown",key);return()=>{removeEventListener("wheel",wheel);removeEventListener("keydown",key)}},[staged,revealed]);

  return <main className={`deck scene-${type}`} onPointerMove={e=>{const x=e.clientX/window.innerWidth-.5,y=e.clientY/window.innerHeight-.5;e.currentTarget.style.setProperty("--pointer-x",`${(x+.5)*100}%`);e.currentTarget.style.setProperty("--pointer-y",`${(y+.5)*100}%`);e.currentTarget.style.setProperty("--drift-x",`${x*-18}px`);e.currentTarget.style.setProperty("--drift-y",`${y*-12}px`)}} onPointerLeave={e=>{e.currentTarget.style.removeProperty("--pointer-x");e.currentTarget.style.removeProperty("--pointer-y");e.currentTarget.style.removeProperty("--drift-x");e.currentTarget.style.removeProperty("--drift-y")}}>
    <div className="sea" aria-hidden="true"/>
    <div className="ambient" aria-hidden="true"><i/><i/><i/></div>
    <header><span>{index>=11?"PART TWO: FOR COL":"DAY 2 · SESSION 05"}</span><button onClick={()=>setOverview(true)}>Overview</button></header>
    <section key={index} className={`slide ${direction}`} aria-labelledby="slide-title">
      <div className="copy"><p className="eyebrow">{index===0||index===last?"WHERE AI ACTUALLY HELPS":""}</p><h1 id="slide-title">{title}</h1><p className="lede">{body}</p></div>
      {type==="title"&&<p className="byline">Boulder Retreat 2026 · Eliot Fisher</p>}
      {type==="history"&&<><div className="photo-row">{[["/deck/image.jpeg","LIFEGUARDING · EAST HAMPTON"],["/deck/image3.png","STONY BROOK · LONG ISLAND"],["/deck/image4.png","MIIS · MONTEREY"]].map(([src,label],i)=><figure className={`staged-item ${i<revealed?"revealed":""}`} key={src}><img src={src} alt={label}/><figcaption>{label}</figcaption></figure>)}</div><p className="callout">What can AI do now—and where could it create lasting value for COL?</p></>}
      {triples[type]&&<div className="triple">{triples[type].map(([h,p],i)=><article className={`staged-item ${i<revealed?"revealed":""}`} key={h} style={{"--i":i} as React.CSSProperties}><h2>{h}</h2><p>{p}</p></article>)}</div>}
      {type==="timeline"&&<div className="photo-row timeline">{[["/deck/image5.png","JUNE 1 · Question box"],["/deck/image6.png","JUNE 4 · Property first"],["/deck/image7.png","JUNE 5 · Clear product"]].map(([src,label],i)=><figure className={`staged-item ${i<revealed?"revealed":""}`} key={src}><img src={src} alt={label}/><figcaption>{label}</figcaption></figure>)}</div>}
      {type==="turn"&&<blockquote><strong>AI can make a weak idea look finished.</strong><span>Claude and ChatGPT became my first working pair. The tools accelerated every redesign, but human judgment still determined whether the result was useful.</span></blockquote>}
      {type==="policy"&&<><div className="browser-frame"><div className="browser-bar" aria-hidden="true"><i/><i/><i/><span>COL Policy Intelligence</span></div><img className="screen" src="/deck/image8.png" alt="COL Policy Intelligence application"/></div><div className="policy-value"><span>One shared intake</span><span>Less chance of missing an item</span><span>Human review stays in control</span></div></>}
      {type==="pivot"&&<div className="pivot"><article><small>COL POLICY INTELLIGENCE</small><h2>Monitor federal policy</h2><p>Collect, normalize, deduplicate, and rank new policy items for human review.</p></article><b>FOCUS<br/>SHIFT →</b><article><small>IOOS ECONOMIC IMPACT</small><h2>Build the evidence base</h2><p>Organize sources, trace claims, compare cases, and support defensible conclusions.</p></article></div>}
      {type==="demo"&&<><div className="demo-source"><span>Source for the demo</span><code>https://doi.org/10.1093/icesjms/fsae126</code><button onClick={async()=>{await navigator.clipboard.writeText("https://doi.org/10.1093/icesjms/fsae126");setCopied(true);setTimeout(()=>setCopied(false),1800)}}>{copied?"Copied":"Copy DOI"}</button></div><div className="demo-box"><iframe src="https://ocean-evidence-commons.eliotfi.chatgpt.site/" title="Ocean Evidence Commons demo"/></div></>}
      {type==="value"&&<><div className="diagram-row"><img src="/deck/image2.jpeg" alt="Hurricane observing systems diagram"/><img src="/deck/image3.jpeg" alt="Animal Telemetry Network diagram"/></div><p className="callout">The prototype guides discussion. Source checks and human review remain essential.</p></>}
      {type==="workflow"&&<div className="workflow simple-workflow"><article><small>THE INTERFACE</small><h2>ChatGPT Sites</h2><p>The place people see, search, and review the evidence.</p></article><span>works with</span><article><small>THE SHARED DATABASE</small><h2>Supabase</h2><p>The online home for sources, claims, regions, and review status.</p></article></div>}
      {type==="recommendations"&&<div className="recommendations"><article><b>01</b><small>DECIDE</small><h2>Should COL continue Policy Intelligence?</h2><p>Name an owner, confirm the audience, and decide whether the review queue solves a recurring COL need.</p></article><article><b>02</b><small>REFINE + EXPAND</small><h2>Take IOOS economics to all regions</h2><p>Strengthen the evidence workflow, test it with RAs, and explore a NOAA or regional funding pitch.</p></article><p>Support both with a lightweight shared AI practice: brief roundups, reusable prompts, and lessons learned.</p></div>}
      {type==="guardrails"&&<div className="guardrails"><article><h2>AI helps with</h2><ul><li>Synthesis</li><li>Prototyping</li><li>Pattern finding</li><li>Repetitive tasks</li></ul></article><article><h2>Watch for</h2><ul><li>False confidence</li><li>Generic content</li><li>Extra editing</li><li>Weak source traceability</li><li>Overreliance</li></ul></article><strong>Public-facing work should be verified, personalized, and unmistakably COL.</strong></div>}
      {type==="discussion"&&<div className="discussion">{["Which 2–3 AI workflows would create the most value for COL in FY27?","Where could AI strengthen existing services, research, or programs—and potentially become something COL offers partners?","Where should COL deliberately preserve human judgment, authenticity, and review?"].map((question,i)=><article className={`staged-item ${i<revealed?"revealed":""}`} key={question}><b>0{i+1}</b><p>{question}</p></article>)}</div>}
    </section>
    <footer><span>CENTER FOR OCEAN LEADERSHIP</span><img src="/deck/image2.png" alt="UCP UCAR Community Programs"/></footer>
    <nav className="advance" aria-label="Slide navigation"><button onClick={()=>go(-1)} disabled={!index}>← <span>Back</span></button><button className="count" onClick={()=>setOverview(true)}>{String(index+1).padStart(2,"0")} / {slides.length}</button><button onClick={()=>go(1)} disabled={index===last}><span>Forward</span> →</button></nav>
    <div className="slide-dots" aria-label={`Slide ${index+1} of ${slides.length}`}>{slides.map((s,i)=><button key={s[0]} className={i===index?"active":""} aria-label={`Go to slide ${i+1}: ${s[0]}`} aria-current={i===index?"step":undefined} onClick={()=>{setDirection(i<index?"backward":"forward");setRevealed(1);setIndex(i)}}/>)}</div>
    <div className="progress"><i style={{width:`${(index+1)/slides.length*100}%`}}/></div>
    {overview&&<div className="overview" role="dialog" aria-modal="true"><button className="x" onClick={()=>setOverview(false)}>Close ×</button><ol>{slides.map((s,i)=><li key={s[0]}><button onClick={()=>{setRevealed(1);setIndex(i);setOverview(false)}}><b>{String(i+1).padStart(2,"0")}</b>{s[0]}</button></li>)}</ol></div>}
  </main>
}
