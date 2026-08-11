"use client";

import { useEffect, useState } from "react";

const experiments = [
  { date: "June 1", label: "Question box", image: "/deck/image5.png", copy: "A general code question box proved that the interface could be built quickly." },
  { date: "June 4", label: "Property first", image: "/deck/image6.png", copy: "The property became the starting point as the user and task came into focus." },
  { date: "June 5", label: "Clear product", image: "/deck/image7.png", copy: "The workflow and visual identity finally felt like one coherent product." },
];

const evidence = [
  ["01", "IOOS observation", "Buoys, gliders, HF radar, satellites, coastal stations"],
  ["02", "Better information", "More timely, accurate, and usable ocean intelligence"],
  ["03", "Decision", "A person changes timing, route, response, or resource allocation"],
  ["04", "Economic value", "Avoided costs, reduced risk, time saved, or improved outcomes"],
];

export default function Home() {
  const [activeBuild, setActiveBuild] = useState(0);
  const [mission, setMission] = useState<"policy" | "ioos">("policy");
  const [checks, setChecks] = useState({ sources: true, confidence: false, reviewer: false });
  const [demoLoaded, setDemoLoaded] = useState(false);
  const [builder, setBuilder] = useState({ task: "", reviewer: "", goal: "" });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => setProgress((scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)) * 100);
    update(); addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, []);

  return <main>
    <div className="reading-progress"><i style={{ width: `${progress}%` }} /></div>
    <nav className="site-nav" aria-label="Page navigation"><a href="#top" className="wordmark">CENTER FOR OCEAN LEADERSHIP</a><div><a href="#story">Story</a><a href="#impact">Impact</a><a href="#challenge">Try first</a></div></nav>

    <section className="hero" id="top">
      <div className="contours" aria-hidden="true" />
      <div className="hero-copy"><p className="eyebrow">FROM FIVE MINUTES TO REAL IMPACT</p><h1>A five-minute conversation led to an AI internship.</h1><p>A summer of building, testing, and learning where AI actually helps.</p><a className="scroll-cue" href="#story">Follow the story <span>↓</span></a></div>
      <div className="ocean-line" aria-hidden="true"><i/><i/><i/></div>
      <footer><span>Boulder Retreat 2026 · Eliot Fisher</span><img src="/deck/image2.png" alt="UCP UCAR Community Programs"/></footer>
    </section>

    <section className="origin section" id="story">
      <div className="section-head"><p className="eyebrow">01 · ORIGIN STORY</p><h2>Three coasts shaped the question.</h2><p>From Tucson to Stony Brook, land planning, MIIS, and summers lifeguarding—the path was not linear. One reunion conversation connected it all.</p></div>
      <div className="coastal-route" aria-label="Three locations from Eliot's background">
        <article><span>01</span><img src="/deck/image.jpeg" alt="Lifeguard chairs on the beach in East Hampton"/><div><small>EAST HAMPTON</small><h3>Lifeguarding</h3><p>A recurring connection to coastal communities and public safety.</p></div></article>
        <article><span>02</span><img src="/deck/image3.png" alt="Stony Brook University wolf logo"/><div><small>LONG ISLAND</small><h3>Stony Brook</h3><p>Marine science, a shellfish hatchery, and the reunion where Eliot met Nick.</p></div></article>
        <article><span>03</span><img src="/deck/image4.png" alt="Middlebury Institute of International Studies in Monterey"/><div><small>MONTEREY</small><h3>MIIS</h3><p>Graduate study and the question: where could AI create lasting value for COL?</p></div></article>
      </div>
    </section>

    <section className="build-story section">
      <div className="section-head"><p className="eyebrow">02 · EXPERIMENT</p><h2>In five days, the idea became a product.</h2><p>Each version reflected a better understanding of the user and the task. Building became easier; judging what was worth building did not.</p></div>
      <div className="build-stage">
        <div className="build-tabs" role="tablist" aria-label="Product evolution">{experiments.map((item,i)=><button key={item.date} role="tab" aria-selected={activeBuild===i} onClick={()=>setActiveBuild(i)}><b>{item.date}</b><span>{item.label}</span></button>)}</div>
        <div className="build-frame"><div className="build-text"><p className="eyebrow">{experiments[activeBuild].date}</p><h3>{experiments[activeBuild].label}</h3><p>{experiments[activeBuild].copy}</p></div><img key={experiments[activeBuild].image} src={experiments[activeBuild].image} alt={`${experiments[activeBuild].date}: ${experiments[activeBuild].label} interface`}/></div>
      </div>
    </section>

    <section className="reality"><div><p className="eyebrow">REALITY CHECK</p><h2>AI can make a weak idea look finished.</h2><p>The tools accelerated every redesign. Human judgment still determined whether the result was useful.</p></div><div className="false-interface" aria-hidden="true"><i/><i/><i/><i/></div></section>

    <section className="missions section">
      <div className="section-head"><p className="eyebrow">03 · MISSION PIVOT</p><h2>One internship. Two distinct missions.</h2><p>Both applications still exist. The work shifted from monitoring federal policy to organizing a defensible IOOS evidence base.</p></div>
      <div className="mission-switch" role="tablist"><button aria-selected={mission==="policy"} onClick={()=>setMission("policy")}>Policy Intelligence</button><button aria-selected={mission==="ioos"} onClick={()=>setMission("ioos")}>IOOS Economic Impact</button></div>
      <div className="mission-view" key={mission}>{mission==="policy"?<><div><p className="eyebrow">COL POLICY INTELLIGENCE</p><h3>Monitor federal policy</h3><p>Collect, normalize, deduplicate, and rank new policy items for human review. Every item must still be verified against its official source.</p></div><img src="/deck/image8.png" alt="COL Policy Intelligence application screenshot"/></>:<><div><p className="eyebrow">IOOS ECONOMIC IMPACT</p><h3>Build the evidence base</h3><p>Organize sources, trace claims, compare cases, and support defensible conclusions about how IOOS creates value.</p></div><img src="/deck/image9.png" alt="MARACOOS Impact Hub evidence interface"/></>}</div>
    </section>

    <section className="live section">
      <div className="section-head"><p className="eyebrow">04 · LIVE PRODUCT</p><h2>One source. One chain of evidence. One human reviewer.</h2><p>Try the evidence system directly, or open it in a separate window for the full experience.</p></div>
      <div className={`live-window ${demoLoaded?'loaded':''}`}>{demoLoaded?<iframe src="https://ocean-evidence-commons.eliotfi.chatgpt.site/" title="Ocean Evidence Commons live application"/>:<><img src="/deck/demo-fallback.png" alt="Ocean Evidence Commons demo preview"/><div><button onClick={()=>setDemoLoaded(true)}>Load the evidence app</button><a href="https://ocean-evidence-commons.eliotfi.chatgpt.site/" target="_blank" rel="noreferrer">Open in a new window ↗</a></div></>}</div>
    </section>

    <section className="impact section" id="impact">
      <div className="section-head"><p className="eyebrow">05 · EVIDENCE EXPLORER</p><h2>The strongest case is not one giant number.</h2><p>IOOS creates value when better information changes a decision or reduces risk. Follow the causal chain.</p></div>
      <div className="evidence-chain">{evidence.map(([n,title,copy],i)=><article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p>{i<3&&<b aria-hidden="true">→</b>}</article>)}</div>
      <div className="diagram-pair"><button onClick={()=>window.open('/deck/image2.jpeg','_blank')}><img src="/deck/image2.jpeg" alt="Observing systems used to improve hurricane prediction diagram"/></button><button onClick={()=>window.open('/deck/image3.jpeg','_blank')}><img src="/deck/image3.jpeg" alt="U.S. Animal Telemetry Network value diagram"/></button></div>
    </section>

    <section className="human section">
      <div className="section-head"><p className="eyebrow">06 · HUMAN IN THE LOOP</p><h2>Useful AI makes its uncertainty visible.</h2><p>Turn on the context a reviewer needs before a claim becomes COL-facing work.</p></div>
      <div className="reviewer"><div className="review-controls">{Object.entries({sources:"Source citations",confidence:"Confidence notes",reviewer:"Reviewer check"}).map(([key,label])=><button key={key} aria-pressed={checks[key as keyof typeof checks]} onClick={()=>setChecks(v=>({...v,[key]:!v[key as keyof typeof v]}))}><i/>{label}</button>)}</div><article><small>CLAIM PREVIEW</small><h3>Improved observations can reduce uncertainty in high-stakes coastal decisions.</h3><p>Evidence is strongest when the source, attribution pathway, and human decision are documented together.</p>{checks.sources&&<aside><b>Sources</b><span>Hurricane observing systems · U.S. Animal Telemetry Network</span></aside>}{checks.confidence&&<aside><b>Confidence</b><span>Moderate — pathway supported; value depends on the decision context.</span></aside>}{checks.reviewer&&<aside className="approved"><b>Reviewer check</b><span>Ready for discussion after source verification.</span></aside>}</article></div>
    </section>

    <section className="challenge section" id="challenge">
      <div className="challenge-copy"><p className="eyebrow">WHERE AI ACTUALLY HELPS</p><h2>What will COL try first?</h2><p>Name one useful workflow, one person who will review it, and one small experiment COL can begin.</p></div>
      <form onSubmit={e=>e.preventDefault()}><label>Task worth improving<input value={builder.task} onChange={e=>setBuilder({...builder,task:e.target.value})} placeholder="A bounded, repeatable task"/></label><label>Human reviewer<input value={builder.reviewer} onChange={e=>setBuilder({...builder,reviewer:e.target.value})} placeholder="Who makes the final call?"/></label><label>Learning goal<input value={builder.goal} onChange={e=>setBuilder({...builder,goal:e.target.value})} placeholder="What will the experiment test?"/></label><div><button type="button" onClick={()=>setBuilder({task:"",reviewer:"",goal:""})}>Reset</button><span>Saved only in this browser session.</span></div></form>
      <footer><span>CENTER FOR OCEAN LEADERSHIP</span><img src="/deck/image2.png" alt="UCP UCAR Community Programs"/></footer>
    </section>
  </main>;
}
