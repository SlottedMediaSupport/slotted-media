import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, CartesianGrid, ReferenceLine } from "recharts";

/* ══════════════════════════════════════════════════════════════
   SLOTTED MEDIA — Full Product Suite
   Homepage → SlotWise | HealthPulse | Digital Twin
   ══════════════════════════════════════════════════════════════ */

const FONTS = "https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Source+Sans+3:wght@400;500;600;700&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&family=Newsreader:ital,wght@0,400;1,400;1,500&display=swap";
const F = { serif:"'Newsreader',serif", sans:"'DM Sans',sans-serif", mono:"'JetBrains Mono',monospace", hd:"'Sora',sans-serif", bd:"'Source Sans 3',sans-serif", mn:"'DM Mono',monospace" };

// Zone config
const ZC = { A:{color:"#22c55e",bg:"rgba(34,197,94,0.08)",border:"rgba(34,197,94,0.25)"}, B:{color:"#f59e0b",bg:"rgba(245,158,11,0.08)",border:"rgba(245,158,11,0.25)"}, C:{color:"#6366f1",bg:"rgba(99,102,241,0.08)",border:"rgba(99,102,241,0.25)"} };
// HP colors
const HP = { bg:"#FAF8F5",card:"#FFFFFF",cardAlt:"#F6F3EF",border:"#E8E3DB",borderLight:"#F0ECE5",text:"#2C2825",textMid:"#6B6560",textLight:"#9E9890",green:"#2D8B55",greenBg:"#E8F5EC",red:"#C4392E",redBg:"#FCEAE8",amber:"#B8860B",amberBg:"#FFF5DD",blue:"#3B6FB5",copper:"#B87333",copperBg:"#FDF0E5" };
// DT colors
const DT = { bg:"#0D1117",panel:"#161B22",panelBorder:"#21262D",text:"#E6EDF3",textMid:"#8B949E",textDim:"#484F58",coral:"#FF6B6B",green:"#3FB950",amber:"#D29922",cyan:"#58A6FF",purple:"#BC8CFF",gray:"#484F58" };
// TK colors
const TK = { bg:"#0c0f16",panel:"#131720",panelBorder:"#1e2433",surface:"#181d28",text:"#dce1ea",textMid:"#7d8598",textDim:"#4a5168",teal:"#2dd4bf",orange:"#fb923c",red:"#f87171",blue:"#60a5fa",green:"#4ade80",yellow:"#facc15",purple:"#a78bfa" };

// Sample data
const SW_SAMPLE = [{id:"SKU-1001",name:"Widget A",picks:342,weight:2.1,category:"Electronics"},{id:"SKU-1002",name:"Bracket B",picks:189,weight:0.8,category:"Hardware"},{id:"SKU-1003",name:"Seal Kit C",picks:27,weight:0.3,category:"Hardware"},{id:"SKU-1004",name:"Motor D",picks:412,weight:15.0,category:"Electronics"},{id:"SKU-1005",name:"Filter E",picks:95,weight:0.5,category:"Consumables"},{id:"SKU-1006",name:"Valve F",picks:256,weight:3.2,category:"Hardware"},{id:"SKU-1007",name:"Hose G",picks:178,weight:1.1,category:"Consumables"},{id:"SKU-1008",name:"Panel H",picks:8,weight:22.0,category:"Electronics"},{id:"SKU-1009",name:"Clip Set I",picks:501,weight:0.2,category:"Hardware"},{id:"SKU-1010",name:"Pump J",picks:45,weight:28.0,category:"Equipment"},{id:"SKU-1011",name:"Gasket K",picks:320,weight:0.1,category:"Consumables"},{id:"SKU-1012",name:"Sensor P",picks:367,weight:0.3,category:"Electronics"},{id:"SKU-1013",name:"Bearing M",picks:210,weight:1.8,category:"Hardware"},{id:"SKU-1014",name:"Fuse T",picks:445,weight:0.05,category:"Electronics"}];

const HP_SAMPLE = [{id:"SKU-1001",name:"Widget A",category:"Electronics",unitCost:12.50,qtyOnHand:340,avgDailySales:11.4,lastSold:1,leadTime:7},{id:"SKU-1002",name:"Bracket B",category:"Hardware",unitCost:3.20,qtyOnHand:890,avgDailySales:6.3,lastSold:1,leadTime:14},{id:"SKU-1003",name:"Seal Kit C",category:"Hardware",unitCost:8.75,qtyOnHand:45,avgDailySales:0.9,lastSold:8,leadTime:21},{id:"SKU-1004",name:"Motor D",category:"Electronics",unitCost:145.00,qtyOnHand:12,avgDailySales:1.4,lastSold:2,leadTime:30},{id:"SKU-1005",name:"Filter E",category:"Consumables",unitCost:4.50,qtyOnHand:1200,avgDailySales:3.2,lastSold:1,leadTime:7},{id:"SKU-1006",name:"Valve F",category:"Hardware",unitCost:22.00,qtyOnHand:160,avgDailySales:8.5,lastSold:1,leadTime:10},{id:"SKU-1007",name:"Hose G",category:"Consumables",unitCost:6.80,qtyOnHand:520,avgDailySales:5.9,lastSold:1,leadTime:5},{id:"SKU-1008",name:"Panel H",category:"Electronics",unitCost:210.00,qtyOnHand:3,avgDailySales:0.1,lastSold:45,leadTime:45},{id:"SKU-1009",name:"Clip Set I",category:"Hardware",unitCost:1.20,qtyOnHand:4200,avgDailySales:16.7,lastSold:1,leadTime:3},{id:"SKU-1010",name:"Pump J",category:"Equipment",unitCost:380.00,qtyOnHand:5,avgDailySales:0.15,lastSold:30,leadTime:60},{id:"SKU-1011",name:"Coupler U",category:"Hardware",unitCost:11.00,qtyOnHand:0,avgDailySales:3.1,lastSold:15,leadTime:12},{id:"SKU-1012",name:"Actuator W",category:"Equipment",unitCost:275.00,qtyOnHand:0,avgDailySales:0.5,lastSold:30,leadTime:35},{id:"SKU-1013",name:"Sensor P",category:"Electronics",unitCost:28.00,qtyOnHand:145,avgDailySales:12.2,lastSold:1,leadTime:10},{id:"SKU-1014",name:"O-Ring V",category:"Consumables",unitCost:0.30,qtyOnHand:12000,avgDailySales:8.5,lastSold:1,leadTime:3}];

// Rack types for DT
var RACK_TYPES = [{name:"Pushback",color:"#FF6B6B"},{name:"Case flow",color:"#D29922"},{name:"Handstack",color:"#58A6FF"},{name:"VNA 24\"",color:"#3FB950"},{name:"VNA 11\"",color:"#BC8CFF"},{name:"Empty/Unslotted",color:"#484F58"}];

// ── Shared hooks ──
function useInView(t) { var ref=useRef(null); var s=useState(false); var v=s[0]; var setV=s[1]; useEffect(function(){var el=ref.current;if(!el)return;var o=new IntersectionObserver(function(entries){if(entries[0].isIntersecting)setV(true);},{threshold:t||0.1});o.observe(el);return function(){o.disconnect();};},[t]); return [ref,v]; }
function Reveal(props) { var r=useInView(); var ref=r[0]; var v=r[1]; return React.createElement("div",{ref:ref,style:Object.assign({opacity:v?1:0,transform:v?"translateY(0)":"translateY(28px)",transition:"opacity 0.9s ease "+(props.delay||0)+"s, transform 0.9s ease "+(props.delay||0)+"s"},props.style||{})},props.children); }
function AnimNum(props) { var s=useState(0); var c=s[0]; var setC=s[1]; var r=useInView(); var ref=r[0]; var v=r[1]; useEffect(function(){if(!v)return;var x=0;var step=props.end/50;var id=setInterval(function(){x+=step;if(x>=props.end){setC(props.end);clearInterval(id);}else setC(Math.floor(x));},20);return function(){clearInterval(id);};},[v,props.end]); return React.createElement("span",{ref:ref},c+(props.suffix||"")); }
function Badge(props) { return React.createElement("span",{style:{display:"inline-block",padding:"3px 10px",borderRadius:6,fontSize:11,fontWeight:700,fontFamily:F.mono,color:props.color,background:props.color+"18",border:"1px solid "+props.color+"35"}},props.children); }

// ── Analysis engines ──
function swClassify(sku,th){return sku.picks>=th.aFloor?"A":sku.picks>=th.bFloor?"B":"C";}
function swWeight(w){return w<=5?"Light":w<=20?"Medium":"Heavy";}
function swSlot(z,w){if(z==="A")return w==="Heavy"?"Floor pallet, near dock":"Eye-level bin, closest";if(z==="B")return w==="Heavy"?"Floor pallet, mid":"Standard bin, mid aisle";return"Upper shelf, deep";}

function hpAnalyze(items){return items.map(function(item){var val=item.qtyOnHand*item.unitCost;var doh=item.avgDailySales>0?item.qtyOnHand/item.avgDailySales:9999;var rop=item.avgDailySales*item.leadTime*1.2;var isOut=item.qtyOnHand===0;var low=!isOut&&item.qtyOnHand<=rop;var over=doh>120;var dead=item.lastSold>60;var hs=100;if(isOut)hs=0;else if(dead)hs=15;else if(over)hs=Math.max(20,60-(doh-120)/5);else if(low)hs=45;else if(doh>90)hs=55;else if(doh>60)hs=70;else if(doh>30)hs=85;var st="Healthy",sc=HP.green;if(isOut){st="Stockout";sc=HP.red;}else if(dead){st="Dead Stock";sc=HP.red;}else if(low){st="Low Stock";sc=HP.amber;}else if(over){st="Overstock";sc=HP.amber;}var age="0-30d";if(doh>90)age="90+d";else if(doh>60)age="61-90d";else if(doh>30)age="31-60d";var turn=item.avgDailySales>0?(item.avgDailySales*365)/Math.max(item.qtyOnHand,1):0;return Object.assign({},item,{inventoryValue:val,daysOnHand:Math.round(doh),turnoverRatio:Math.round(turn*10)/10,reorderPoint:Math.round(rop),isStockout:isOut,stockoutRisk:low,isOverstock:over,isDead:dead,annualCarryCost:val*0.25,healthScore:Math.round(hs),status:st,statusColor:sc,ageBucket:age,dailySaleValue:item.avgDailySales*item.unitCost});});}
function hpAbc(items){var sorted=items.slice().sort(function(a,b){return b.dailySaleValue-a.dailySaleValue;});var tot=sorted.reduce(function(s,i){return s+i.dailySaleValue;},0);var cum=0;return sorted.map(function(i2){cum+=i2.dailySaleValue;return Object.assign({},i2,{abc:tot>0?(cum/tot<=0.7?"A":cum/tot<=0.9?"B":"C"):"C"});});}

// ── DT bay generator ──
function generateBays(cfg) {
  var bays = [];
  var aisleNames = [];
  for (var a = 0; a < cfg.numAisles; a++) {
    var aisleNum = cfg.startAisle + a;
    var name = cfg.aislePrefix + aisleNum;
    aisleNames.push(name);
    for (var side = 0; side < 2; side++) {
      var sideLabel = side === 0 ? "L" : "R";
      var count = cfg.baysPerSide + Math.floor(Math.random() * 4) - 2;
      for (var b = 0; b < count; b++) {
        var lines = Math.floor(Math.random() * Math.random() * 8000);
        if (Math.random() < 0.15) lines = 0;
        var typeIdx = lines === 0 ? 5 : Math.random() < 0.55 ? 2 : Math.random() < 0.35 ? 0 : Math.random() < 0.5 ? 1 : Math.random() < 0.6 ? 3 : 4;
        // Filter to only enabled types
        if (cfg.enabledTypes && !cfg.enabledTypes[RACK_TYPES[typeIdx].name] && typeIdx !== 5) {
          var enabled = Object.keys(cfg.enabledTypes).filter(function(k) { return cfg.enabledTypes[k]; });
          if (enabled.length > 0) {
            var picked = enabled[Math.floor(Math.random() * enabled.length)];
            typeIdx = RACK_TYPES.findIndex(function(t) { return t.name === picked; });
            if (typeIdx < 0) typeIdx = 2;
          }
        }
        bays.push({ id: name + "-" + sideLabel + (b + 1).toString().padStart(2, "0"), aisle: name, side: sideLabel, position: b, lines: lines, type: RACK_TYPES[typeIdx], sku: lines > 0 ? "SKU-" + (1000 + Math.floor(Math.random() * 9000)) : null });
      }
    }
  }
  return { bays: bays, aisleNames: aisleNames };
}

function getHeatColor(r) { if(r<=0)return DT.gray;if(r<0.2)return"#1A4D2E";if(r<0.35)return"#2D8B45";if(r<0.5)return"#3FB950";if(r<0.65)return"#85C941";if(r<0.75)return"#D29922";if(r<0.85)return"#E8871E";if(r<0.95)return"#E85D3A";return"#FF4444"; }
function fmt(n) { return n >= 1000 ? Math.round(n/1000) + "k" : n.toString(); }


/* ══════════════════════════════════════════════════════════════
   HOMEPAGE
   ══════════════════════════════════════════════════════════════ */
function Homepage(props) {
  var onNavigate = props.onNavigate;
  var products = [
    { id:"sw", name:"SlotWise", tag:"Warehouse Slotting Optimizer", desc:"Analyzes pick frequency and product weight to recommend optimal warehouse slot placement — putting your highest-velocity SKUs closest to the dock.", icon:"⬡", accent:"#22c55e", grad:"linear-gradient(135deg,#22c55e,#16a34a)", features:["ABC zone classification","Weight-based placement","Visual warehouse map","CSV import/export"], metrics:[{v:"3",l:"Zones"},{v:"∞",l:"SKU capacity"}] },
    { id:"hp", name:"HealthPulse", tag:"Inventory Health Dashboard", desc:"Monitors turnover, catches stockouts, eliminates dead stock, and tracks carrying costs — total inventory visibility.", icon:"◈", accent:"#B87333", grad:"linear-gradient(135deg,#B87333,#D4943E)", features:["Health score engine","Stockout & risk alerts","Aging & turnover charts","ABC classification"], metrics:[{v:"5",l:"Alert types"},{v:"4",l:"Analysis views"}] },
    { id:"dt", name:"RadarView", tag:"Warehouse Digital Twin", desc:"Full radar visualization of your warehouse floor — heat-mapped bays, rack type analysis, aisle performance, and real-time alerts.", icon:"📡", accent:"#FF6B6B", grad:"linear-gradient(135deg,#FF6B6B,#E85D3A)", features:["Bay-level heat mapping","Rack type visualization","Aisle performance bars","Design your own layout"], metrics:[{v:"790",l:"Bays mapped"},{v:"14",l:"Aisles"}] },
    { id:"tk", name:"Toolkit", tag:"Inventory Calculators & Analysis", desc:"Three essential calculators in one: Reorder Point & Safety Stock, ABC/XYZ Classification, and Dead Stock Identifier — the ops manager's daily toolkit.", icon:"⧉", accent:"#2dd4bf", grad:"linear-gradient(135deg,#2dd4bf,#0d9488)", features:["Reorder point & EOQ calculator","ABC/XYZ matrix classification","Dead stock identifier","Configurable thresholds"], metrics:[{v:"3",l:"Tools in one"},{v:"9",l:"Matrix cells"}] },
    { id:"df", name:"Forecast", tag:"Demand Forecasting Engine", desc:"Uses 24 months of history to project demand 3-12 months out — with trend detection, seasonality decomposition, and confidence intervals.", icon:"📈", accent:"#818cf8", grad:"linear-gradient(135deg,#818cf8,#6366f1)", features:["Trend detection & classification","Seasonal index by month","Confidence interval bands","Multi-SKU comparison"], metrics:[{v:"12",l:"Month horizon"},{v:"5",l:"Trend types"}] },
    { id:"wp", name:"WavePlan", tag:"Order Wave Planner", desc:"Groups orders into optimized pick waves by zone proximity — minimizing travel distance and maximizing picks per trip.", icon:"🌊", accent:"#f59e0b", grad:"linear-gradient(135deg,#f59e0b,#d97706)", features:["3 wave strategies","Zone-based grouping","Travel distance optimization","Per-wave order detail"], metrics:[{v:"3",l:"Strategies"},{v:"48",l:"Orders demo"}] },
    { id:"rp", name:"Putaway", tag:"Receiving & Putaway Planner", desc:"Suggests optimal putaway locations for inbound POs based on rack type, zone priority, and available capacity — reducing put time and improving slotting.", icon:"📥", accent:"#f472b6", grad:"linear-gradient(135deg,#f472b6,#db2777)", features:["PO line intake","Zone-priority placement","Capacity-aware suggestions","Rack type matching"], metrics:[{v:"3",l:"Zone priorities"},{v:"20",l:"Locations demo"}] },
    { id:"lc", name:"LandedCost", tag:"Landed Cost Calculator", desc:"Calculates true cost per unit including purchase price, freight, duties, insurance, and handling — compare suppliers and shipping methods side by side.", icon:"💰", accent:"#a3e635", grad:"linear-gradient(135deg,#a3e635,#65a30d)", features:["Multi-component cost build-up","Supplier comparison","Per-unit & per-shipment views","Duty & tariff calculator"], metrics:[{v:"7",l:"Cost components"},{v:"3",l:"Suppliers max"}] },
    { id:"fc", name:"FreightComp", tag:"Carrier & Freight Rate Comparison", desc:"Compare shipping costs across carriers, modes (LTL, FTL, parcel, ocean), and lanes — find the cheapest route for every shipment.", icon:"🚛", accent:"#38bdf8", grad:"linear-gradient(135deg,#38bdf8,#0284c7)", features:["Multi-carrier comparison","LTL / FTL / Parcel / Ocean","Lane-based rate lookup","Cost-per-unit breakdown"], metrics:[{v:"4",l:"Modes"},{v:"5",l:"Carriers demo"}] },
    { id:"kpi", name:"KPI Hub", tag:"Executive KPI Dashboard", desc:"Consolidates metrics across all tools into one executive view — inventory value, health score, fill rate, dead stock exposure, and forecast accuracy.", icon:"📊", accent:"#c084fc", grad:"linear-gradient(135deg,#c084fc,#9333ea)", features:["Cross-tool metric rollup","Trend sparklines","Target vs actual gauges","Executive summary view"], metrics:[{v:"12",l:"KPIs tracked"},{v:"1",l:"Executive view"}] },
    { id:"lp", name:"LaborPlan", tag:"Labor Planning Calculator", desc:"Estimates picker hours needed based on order volume, picks per hour, and shift schedules — plan staffing before the work hits the floor.", icon:"👷", accent:"#f97316", grad:"linear-gradient(135deg,#f97316,#ea580c)", features:["Shift schedule builder","Picks-per-hour modeling","Overtime threshold alerts","Headcount recommendations"], metrics:[{v:"3",l:"Shift types"},{v:"∞",l:"Scenarios"}] },
    { id:"cc", name:"CycleCount", tag:"Cycle Count Scheduler", desc:"Prioritizes which locations to count based on ABC class, last count date, and discrepancy history — keeping inventory accurate without shutting down.", icon:"📋", accent:"#14b8a6", grad:"linear-gradient(135deg,#14b8a6,#0d9488)", features:["ABC-weighted scheduling","Discrepancy tracking","Count calendar view","Accuracy trending"], metrics:[{v:"3",l:"Priority tiers"},{v:"365",l:"Day planning"}] },
  ];

  return (
    <div style={{ background:"#0A0A0E", fontFamily:F.sans, color:"#fff", minHeight:"100vh" }}>
      <style>{`@keyframes heroFade{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}@keyframes gridPulse{0%,100%{opacity:0.025}50%{opacity:0.045}}`}</style>
      <nav style={{ padding:"0 32px", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:64 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ display:"flex", gap:3 }}><div style={{ width:6,height:18,borderRadius:2,background:"rgba(240,195,95,0.3)" }}/><div style={{ width:6,height:18,borderRadius:2,background:"#F0C35F" }}/><div style={{ width:6,height:18,borderRadius:2,background:"rgba(240,195,95,0.3)" }}/></div>
            <span style={{ fontSize:18, fontWeight:700 }}>Slotted<span style={{ color:"#F0C35F" }}>Media</span></span>
          </div>
          <a href="#products" style={{ fontSize:13, fontWeight:600, color:"#0A0A0E", background:"#F0C35F", borderRadius:8, padding:"8px 20px", textDecoration:"none" }}>Explore Tools</a>
        </div>
      </nav>

      <section style={{ padding:"120px 32px 80px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, animation:"gridPulse 8s ease-in-out infinite", backgroundImage:"linear-gradient(rgba(240,195,95,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(240,195,95,0.12) 1px, transparent 1px)", backgroundSize:"60px 60px" }} />
        <div style={{ position:"relative", maxWidth:860, margin:"0 auto" }}>
          <h1 style={{ fontFamily:F.serif, fontSize:"clamp(42px,7vw,76px)", fontWeight:400, lineHeight:1.06, letterSpacing:"-0.03em", margin:"0 0 24px", animation:"heroFade 0.8s ease-out 0.12s both" }}>
            Tools that put every<br /><span style={{ fontStyle:"italic", color:"#F0C35F" }}>product, pallet, and pick</span><br />in its place.
          </h1>
          <p style={{ fontSize:"clamp(16px,2vw,20px)", color:"rgba(255,255,255,0.5)", lineHeight:1.6, maxWidth:540, margin:"0 auto 40px", animation:"heroFade 0.8s ease-out 0.24s both" }}>
            Slotted Media builds focused, powerful tools for warehouse and inventory teams.
          </p>
          <a href="#products" style={{ fontSize:16, fontWeight:600, color:"#0A0A0E", background:"#F0C35F", borderRadius:10, padding:"14px 34px", textDecoration:"none", animation:"heroFade 0.8s ease-out 0.36s both" }}>Explore Our Tools</a>
        </div>
      </section>

      <section id="products" style={{ padding:"60px 32px 120px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <Reveal><div style={{ textAlign:"center", marginBottom:56 }}>
            <span style={{ fontFamily:F.mono, fontSize:11, color:"#F0C35F", letterSpacing:1.5, textTransform:"uppercase" }}>OUR PRODUCTS</span>
            <h2 style={{ fontFamily:F.serif, fontSize:"clamp(30px,5vw,48px)", fontWeight:400, margin:"14px 0 12px" }}>Twelve tools. <span style={{ fontStyle:"italic", color:"#F0C35F" }}>Zero bloat.</span></h2>
          </div></Reveal>

          {products.map(function(p, idx) {
            return (
              <Reveal key={p.id} delay={idx * 0.12}>
                <div style={{ background:"#111115", border:"1px solid rgba(255,255,255,0.06)", borderRadius:24, overflow:"hidden", marginBottom:20, transition:"all 0.4s" }}
                  onMouseEnter={function(e){e.currentTarget.style.borderColor=p.accent+"40";e.currentTarget.style.boxShadow="0 12px 48px "+p.accent+"12";}}
                  onMouseLeave={function(e){e.currentTarget.style.borderColor="rgba(255,255,255,0.06)";e.currentTarget.style.boxShadow="none";}}>
                  <div style={{ display:"flex", flexWrap:"wrap" }}>
                    <div style={{ flex:1, minWidth:300, padding:"40px 36px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20 }}>
                        <div style={{ width:46, height:46, borderRadius:14, background:p.grad, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, color:"#fff", fontWeight:800, boxShadow:"0 4px 20px "+p.accent+"25" }}>{p.icon}</div>
                        <div>
                          <div style={{ fontSize:20, fontWeight:700, letterSpacing:-0.3 }}>{p.name}</div>
                          <div style={{ fontFamily:F.mono, fontSize:10, color:p.accent, letterSpacing:0.5, textTransform:"uppercase" }}>{p.tag}</div>
                        </div>
                      </div>
                      <p style={{ fontSize:15, color:"rgba(255,255,255,0.5)", lineHeight:1.7, margin:"0 0 24px", maxWidth:440 }}>{p.desc}</p>
                      <div style={{ display:"flex", gap:28, marginBottom:24 }}>
                        {p.metrics.map(function(m, i) {
                          return (
                            <div key={i}>
                              <div style={{ fontFamily:F.serif, fontSize:28, fontWeight:400, color:p.accent, fontStyle:"italic" }}>{m.v}</div>
                              <div style={{ fontFamily:F.mono, fontSize:9, color:"rgba(255,255,255,0.3)", letterSpacing:0.5, textTransform:"uppercase", marginTop:2 }}>{m.l}</div>
                            </div>
                          );
                        })}
                      </div>
                      <button onClick={function(){onNavigate(p.id+"-onboard");}} style={{ fontSize:14, fontWeight:600, color:"#0A0A0E", background:p.accent, borderRadius:10, padding:"12px 26px", border:"none", cursor:"pointer", boxShadow:"0 4px 20px "+p.accent+"25" }}>Launch {p.name} →</button>
                    </div>
                    <div style={{ flex:1, minWidth:260, padding:"40px 32px", background:p.accent+"04", borderLeft:"1px solid rgba(255,255,255,0.04)" }}>
                      <div style={{ fontFamily:F.mono, fontSize:9, color:"rgba(255,255,255,0.25)", letterSpacing:1.2, textTransform:"uppercase", marginBottom:16 }}>KEY CAPABILITIES</div>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                        {p.features.map(function(feat, i) {
                          return (
                            <div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 12px", borderRadius:8, background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.04)" }}>
                              <div style={{ width:5, height:5, borderRadius:2, background:p.accent, flexShrink:0 }} />
                              <span style={{ fontSize:12, color:"rgba(255,255,255,0.55)" }}>{feat}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <footer style={{ padding:"24px 32px", borderTop:"1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:14, fontWeight:600 }}>Slotted<span style={{ color:"#F0C35F" }}>Media</span></span>
          <span style={{ fontFamily:F.mono, fontSize:11, color:"rgba(255,255,255,0.2)" }}>© 2026 Slotted Media</span>
        </div>
      </footer>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════
   SLOTWISE (Compact: Onboarding + Dashboard)
   ══════════════════════════════════════════════════════════════ */
function SWFlow(props) {
  var onHome = props.onHome;
  var s = useState("landing"); var phase = s[0]; var setPhase = s[1];
  var s2 = useState(null); var config = s2[0]; var setConfig = s2[1];
  var s3 = useState({size:"",count:"",strategy:"balanced"}); var a = s3[0]; var setA = s3[1];
  var s4 = useState(0); var step = s4[0]; var setStep = s4[1];
  var s5 = useState(true); var useSample = s5[0];
  // Dashboard state
  var s6 = useState(SW_SAMPLE); var skus = s6[0]; var setSkus = s6[1];
  var s7 = useState(20); var aP = s7[0]; var setAP = s7[1];
  var s8 = useState(30); var bP = s8[0]; var setBP = s8[1];
  var s9 = useState("picks"); var sortBy = s9[0]; var setSortBy = s9[1];
  var s10 = useState("desc"); var sortDir = s10[0]; var setSortDir = s10[1];
  var s11 = useState("ALL"); var filterZone = s11[0]; var setFilterZone = s11[1];
  var s12 = useState("table"); var view = s12[0]; var setView = s12[1];
  var s13 = useState(false); var showImport = s13[0]; var setShowImport = s13[1];
  var s14 = useState(""); var csvText = s14[0]; var setCsvText = s14[1];
  // Viz animation
  var vizSt = useState(0); var vizStep = vizSt[0]; var setVizStep = vizSt[1];
  useEffect(function(){ var id = setInterval(function(){ setVizStep(function(x){ return (x+1) % 60; }); }, 120); return function(){ clearInterval(id); }; }, []);
  // Scroll to top on phase change
  useEffect(function(){ window.scrollTo(0, 0); }, [phase]);

  function goToPhase(p) { setPhase(p); }

  function launch(sample) {
    var recA = a.strategy==="aggressive"?15:a.strategy==="conservative"?30:20;
    var recB = a.strategy==="aggressive"?25:a.strategy==="conservative"?35:30;
    setAP(recA); setBP(recB);
    if (sample) setSkus(SW_SAMPLE); else { setSkus([]); setShowImport(true); }
    goToPhase("dash");
  }

  // All hooks must be before any conditional returns (React rules of hooks)
  var thresholds = useMemo(function(){var sorted=skus.slice().sort(function(x,y){return y.picks-x.picks;});var ai=Math.max(0,Math.ceil(sorted.length*aP/100)-1);var bi=Math.max(ai+1,Math.ceil(sorted.length*(aP+bP)/100)-1);return{aFloor:sorted[ai]?sorted[ai].picks:0,bFloor:sorted[Math.min(bi,sorted.length-1)]?sorted[Math.min(bi,sorted.length-1)].picks:0};},[skus,aP,bP]);
  var analyzed = useMemo(function(){return skus.map(function(sk){var z=swClassify(sk,thresholds);var w=swWeight(sk.weight);return Object.assign({},sk,{zone:z,weightClass:w,slot:swSlot(z,w)});});},[skus,thresholds]);
  var filtered = useMemo(function(){var list=filterZone==="ALL"?analyzed:analyzed.filter(function(sk){return sk.zone===filterZone;});return list.slice().sort(function(x,y){var av=x[sortBy],bv=y[sortBy];if(typeof av==="string"){av=av.toLowerCase();bv=bv.toLowerCase();}return sortDir==="asc"?(av<bv?-1:av>bv?1:0):(av>bv?-1:av<bv?1:0);});},[analyzed,filterZone,sortBy,sortDir]);
  var stats = useMemo(function(){var zones={A:[],B:[],C:[]};analyzed.forEach(function(sk){zones[sk.zone].push(sk);});var tp=analyzed.reduce(function(acc,sk){return acc+sk.picks;},0);return{zones:zones,totalPicks:tp,total:analyzed.length};},[analyzed]);
  function handleImport(){try{var lines=csvText.trim().split("\n").filter(function(l){return l.trim();});if(lines.length<2)return;var h=lines[0].split(",").map(function(x){return x.trim().toLowerCase();});var p=lines.slice(1).map(function(line,i2){var v=line.split(",").map(function(x){return x.trim();});var o={};h.forEach(function(hh,j){o[hh]=v[j]||"";});return{id:o.id||"SKU-"+(i2+1),name:o.name||"Item "+(i2+1),picks:parseInt(o.picks||"0")||0,weight:parseFloat(o.weight||"1")||1,category:o.category||"General"};});if(p.length){setSkus(p);setShowImport(false);setCsvText("");}}catch(e){}}

  /* ── LANDING PAGE ── */
  if (phase === "landing") {
    var swFeatures = [
      {icon:"⬡",title:"ABC Zone Classification",desc:"Automatically classifies SKUs into A, B, and C zones by pick frequency. Adjustable thresholds with real-time recalculation.",accent:"#22c55e"},
      {icon:"⚖️",title:"Weight-Based Placement",desc:"Heavy items go to floor level, light items to eye-height bins. Reduces injury risk and increases pick speed.",accent:"#eab308"},
      {icon:"🗺️",title:"Visual Warehouse Map",desc:"See your entire warehouse as a color-coded zone map. SKU boxes scale by pick volume. Click any item for details.",accent:"#6366f1"},
      {icon:"📤",title:"CSV Import / Export",desc:"Paste your SKU data or import a CSV. Export slotted results with zone assignments and placement recommendations.",accent:"#f59e0b"},
      {icon:"📊",title:"Adjustable Zone Ratios",desc:"Slide Zone A from 5% to 50%. The engine instantly reclassifies every SKU and updates slot recommendations.",accent:"#8b5cf6"},
      {icon:"🏷️",title:"Slot Recommendations",desc:"For every SKU: specific slot type, position relative to dock, and the reasoning behind the placement.",accent:"#22c55e"},
    ];
    var swSteps = [
      {step:"01",title:"Upload your SKU data",desc:"Paste a CSV or enter data manually. All you need is SKU ID, name, pick count, and weight.",time:"60 sec"},
      {step:"02",title:"Choose your zone strategy",desc:"Aggressive, balanced, or conservative. See the ABC split visualized instantly before committing.",time:"30 sec"},
      {step:"03",title:"Review classifications",desc:"Every SKU gets a zone, weight class, and a specific slot recommendation. Sort, filter, and explore.",time:"2 min"},
      {step:"04",title:"Fine-tune thresholds",desc:"Drag the Zone A and B sliders. Watch every SKU reclassify in real-time for your specific layout.",time:"1 min"},
      {step:"05",title:"Export and implement",desc:"Download a CSV with every SKU's new slot assignment. Walk the floor with the visual map.",time:"30 sec"},
    ];
    // Zone viz data
    var vzZones = [{label:"A",color:"#22c55e",items:6,x:0},{label:"B",color:"#eab308",items:8,x:1},{label:"C",color:"#6366f1",items:10,x:2}];

    return (
      <div style={{background:"#060810",color:"#e8edf5",fontFamily:"'Outfit',sans-serif",minHeight:"100vh",overflow:"hidden"}}>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Crimson+Pro:ital,wght@0,400;0,500;0,600;1,400;1,500&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <style>{`@keyframes heroFadeLP{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}@keyframes gridDriftLP{0%,100%{opacity:0.03}50%{opacity:0.06}}@keyframes glowPulseLP{0%,100%{box-shadow:0 0 20px rgba(34,197,94,0.1)}50%{box-shadow:0 0 40px rgba(34,197,94,0.2)}}@keyframes floatBadgeLP{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}::selection{background:rgba(34,197,94,0.3)}`}</style>

        {/* Nav */}
        <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(6,8,16,0.75)",backdropFilter:"blur(20px) saturate(180%)",borderBottom:"1px solid rgba(34,197,94,0.08)"}}>
          <div style={{maxWidth:1200,margin:"0 auto",padding:"0 40px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",alignItems:"center"}}>
            <button onClick={onHome} style={{background:"transparent",border:"none",color:"#4a5168",cursor:"pointer",fontSize:12,marginRight:12}}>← Home</button>
            <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={onHome}>
              <div style={{width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,#22c55e,#16a34a)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:900}}>⬡</div>
              <span style={{fontSize:18,fontWeight:800,letterSpacing:-0.5}}>Slot<span style={{color:"#22c55e"}}>Wise</span></span>
              <span style={{fontSize:12,color:"rgba(255,255,255,0.2)",marginLeft:4}}>by Slotted Media</span>
            </div>
            </div>
            <button onClick={function(){setPhase("onboard");}} style={{fontSize:13,fontWeight:700,color:"#060810",background:"#22c55e",padding:"8px 20px",borderRadius:8,border:"none",cursor:"pointer"}}>Get Started</button>
          </div>
        </nav>

        {/* Hero */}
        <section style={{padding:"160px 40px 100px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,opacity:0.5,backgroundImage:"linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px)",backgroundSize:"80px 80px",animation:"gridDriftLP 10s ease-in-out infinite"}}/>
          <div style={{position:"absolute",top:-200,left:"50%",transform:"translateX(-50%)",width:800,height:800,borderRadius:"50%",background:"radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)"}}/>
          <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",gap:80,position:"relative"}}>
            <div style={{flex:1,maxWidth:560}}>
              <div style={{animation:"heroFadeLP 0.8s ease-out both"}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 16px",borderRadius:100,background:"rgba(34,197,94,0.08)",border:"1px solid rgba(34,197,94,0.15)",marginBottom:28,animation:"floatBadgeLP 3s ease-in-out infinite"}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:"#22c55e"}}/>
                  <span style={{fontFamily:"'IBM Plex Mono'",fontSize:11,color:"#22c55e",fontWeight:600,letterSpacing:0.8}}>WAREHOUSE SLOTTING OPTIMIZER</span>
                </div>
              </div>
              <h1 style={{fontSize:"clamp(44px,6vw,72px)",fontWeight:900,lineHeight:1.04,letterSpacing:"-0.04em",margin:"0 0 24px",animation:"heroFadeLP 0.8s ease-out 0.1s both"}}>
                Every SKU in its<br/><span style={{color:"transparent",backgroundClip:"text",WebkitBackgroundClip:"text",backgroundImage:"linear-gradient(135deg,#22c55e,#4ade80,#22c55e)"}}>perfect slot.</span>
              </h1>
              <p style={{fontFamily:"'Crimson Pro',serif",fontSize:"clamp(18px,2.5vw,22px)",color:"rgba(255,255,255,0.5)",lineHeight:1.65,margin:"0 0 36px",maxWidth:480,animation:"heroFadeLP 0.8s ease-out 0.2s both"}}>
                SlotWise analyzes pick frequency and product weight to recommend optimal warehouse slot placement — putting your highest-velocity SKUs exactly where pickers need them.
              </p>
              <div style={{display:"flex",gap:12,animation:"heroFadeLP 0.8s ease-out 0.3s both"}}>
                <button onClick={function(){setPhase("onboard");}} style={{fontSize:16,fontWeight:700,color:"#060810",background:"#22c55e",padding:"14px 32px",borderRadius:10,border:"none",cursor:"pointer",boxShadow:"0 4px 24px rgba(34,197,94,0.25)"}}>Start Optimizing Free</button>
              </div>
            </div>
            {/* Warehouse viz */}
            <div style={{flex:1,display:"flex",justifyContent:"center",animation:"heroFadeLP 1s ease-out 0.4s both"}}>
              <div style={{background:"rgba(34,197,94,0.02)",border:"1px solid rgba(34,197,94,0.1)",borderRadius:20,padding:24,animation:"glowPulseLP 4s ease-in-out infinite"}}>
                <div style={{position:"relative",width:360,height:280}}>
                  <svg width="360" height="280" style={{position:"absolute",inset:0}}>
                    <defs><pattern id="bpG2" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(34,197,94,0.07)" strokeWidth="0.5"/></pattern></defs>
                    <rect width="360" height="280" fill="url(#bpG2)"/>
                    {vzZones.map(function(z,i){return <g key={z.label}><rect x={15+i*115} y={15} width={105} height={245} rx={6} fill={z.color+"08"} stroke={z.color+"25"} strokeWidth="1" strokeDasharray="4 3"/><text x={67+i*115} y={38} textAnchor="middle" style={{fontFamily:"'IBM Plex Mono'",fontSize:10,fill:z.color,fontWeight:600,letterSpacing:1}}>ZONE {z.label}</text></g>;})}
                  </svg>
                  {vzZones.map(function(z){return Array.from({length:z.items}).map(function(_,i){
                    var row=Math.floor(i/2);var col=i%2;var bx=25+z.x*115+col*48;var by=48+row*48;
                    var isAct=(vizStep+z.x*3+i)%12<4;
                    return <div key={z.label+i} style={{position:"absolute",left:bx,top:by,width:40,height:35,borderRadius:4,background:isAct?z.color+"22":"rgba(255,255,255,0.02)",border:"1.5px solid "+(isAct?z.color+"55":"rgba(255,255,255,0.05)"),transition:"all 0.4s",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      {isAct&&<div style={{width:18,height:12,borderRadius:3,background:z.color+"40",border:"1px solid "+z.color+"60"}}/>}
                    </div>;
                  });})}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem / Solution */}
        <section style={{padding:"80px 40px"}}>
          <div style={{maxWidth:1000,margin:"0 auto"}}>
            <Reveal><div style={{textAlign:"center",marginBottom:56}}>
              <span style={{fontFamily:"'IBM Plex Mono'",fontSize:11,color:"#22c55e",letterSpacing:2,textTransform:"uppercase"}}>THE PROBLEM</span>
              <h2 style={{fontSize:"clamp(30px,4vw,46px)",fontWeight:900,letterSpacing:"-0.03em",margin:"12px 0"}}>Your pickers are walking <span style={{color:"#22c55e"}}>distances</span> they don't need to.</h2>
              <p style={{fontFamily:"'Crimson Pro',serif",fontSize:19,color:"rgba(255,255,255,0.4)",maxWidth:580,margin:"0 auto",lineHeight:1.6,fontStyle:"italic"}}>Most warehouses slot by gut feel — high-volume items buried in the back, heavy products on high shelves, fast movers scattered across aisles.</p>
            </div></Reveal>
            <div style={{display:"grid",gridTemplateColumns:"1fr 40px 1fr",gap:0}}>
              <Reveal delay={0.1}><div style={{background:"rgba(239,68,68,0.04)",border:"1px solid rgba(239,68,68,0.12)",borderRadius:20,padding:"32px 28px"}}>
                <div style={{fontFamily:"'IBM Plex Mono'",fontSize:11,color:"#ef4444",fontWeight:600,letterSpacing:1.5,marginBottom:18}}>BEFORE SLOTWISE</div>
                {["Pickers walk unnecessary distances in wasted travel","Heavy items on upper shelves cause injuries and slowdowns","New hires take weeks to learn optimal pick paths","ABC analysis done annually in spreadsheets (if at all)","No visibility into which slots are costing you money"].map(function(item,i){return <div key={i} style={{display:"flex",gap:12,marginBottom:12}}><div style={{width:18,height:18,borderRadius:5,background:"rgba(239,68,68,0.12)",border:"1px solid rgba(239,68,68,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#ef4444",flexShrink:0,marginTop:2}}>✗</div><span style={{fontSize:14,color:"rgba(255,255,255,0.5)",lineHeight:1.5}}>{item}</span></div>;})}
              </div></Reveal>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{fontSize:20,color:"rgba(34,197,94,0.4)"}}>→</div></div>
              <Reveal delay={0.2}><div style={{background:"rgba(34,197,94,0.04)",border:"1px solid rgba(34,197,94,0.12)",borderRadius:20,padding:"32px 28px"}}>
                <div style={{fontFamily:"'IBM Plex Mono'",fontSize:11,color:"#22c55e",fontWeight:600,letterSpacing:1.5,marginBottom:18}}>AFTER SLOTWISE</div>
                {["ABC zones place top SKUs nearest the dock","Weight-based rules put heavy items at floor level","Visual warehouse map — anyone can find anything instantly","Real-time zone classification updates as demand shifts","CSV import/export integrates with any WMS in minutes"].map(function(item,i){return <div key={i} style={{display:"flex",gap:12,marginBottom:12}}><div style={{width:18,height:18,borderRadius:5,background:"rgba(34,197,94,0.12)",border:"1px solid rgba(34,197,94,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#22c55e",flexShrink:0,marginTop:2}}>✓</div><span style={{fontSize:14,color:"rgba(255,255,255,0.6)",lineHeight:1.5}}>{item}</span></div>;})}
              </div></Reveal>
            </div>
          </div>
        </section>

        {/* Features */}
        <section style={{padding:"80px 40px",background:"rgba(34,197,94,0.02)",borderTop:"1px solid rgba(34,197,94,0.06)"}}>
          <div style={{maxWidth:1100,margin:"0 auto"}}>
            <Reveal><div style={{textAlign:"center",marginBottom:48}}>
              <span style={{fontFamily:"'IBM Plex Mono'",fontSize:11,color:"#22c55e",letterSpacing:2,textTransform:"uppercase"}}>FEATURES</span>
              <h2 style={{fontSize:"clamp(28px,4vw,42px)",fontWeight:900,letterSpacing:"-0.03em",margin:"12px 0"}}>Everything your slotting needs. <span style={{color:"#22c55e"}}>Nothing it doesn't.</span></h2>
            </div></Reveal>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:14}}>
              {swFeatures.map(function(f2,i){return <Reveal key={f2.title} delay={i*0.08}><div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:16,padding:"28px 24px",transition:"all 0.4s",cursor:"default"}}
                onMouseEnter={function(e){e.currentTarget.style.borderColor=f2.accent+"40";e.currentTarget.style.transform="translateY(-4px)";}}
                onMouseLeave={function(e){e.currentTarget.style.borderColor="rgba(255,255,255,0.06)";e.currentTarget.style.transform="none";}}>
                <div style={{fontSize:26,marginBottom:14}}>{f2.icon}</div>
                <h3 style={{fontSize:17,fontWeight:800,letterSpacing:"-0.02em",margin:"0 0 8px",color:f2.accent}}>{f2.title}</h3>
                <p style={{fontFamily:"'Crimson Pro',serif",fontSize:15,color:"rgba(255,255,255,0.42)",lineHeight:1.6,margin:0}}>{f2.desc}</p>
              </div></Reveal>;})}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section style={{padding:"80px 40px"}}>
          <div style={{maxWidth:900,margin:"0 auto"}}>
            <Reveal><div style={{textAlign:"center",marginBottom:56}}>
              <span style={{fontFamily:"'IBM Plex Mono'",fontSize:11,color:"#22c55e",letterSpacing:2,textTransform:"uppercase"}}>HOW IT WORKS</span>
              <h2 style={{fontSize:"clamp(28px,4vw,42px)",fontWeight:900,letterSpacing:"-0.03em",margin:"12px 0"}}>From <span style={{color:"#22c55e"}}>data to decisions</span> in minutes.</h2>
            </div></Reveal>
            {swSteps.map(function(ss,i){return <Reveal key={ss.step} delay={i*0.08}><div style={{display:"flex",gap:24,marginBottom:6,padding:"24px 28px",borderRadius:14,border:"1px solid transparent",transition:"all 0.3s"}}
              onMouseEnter={function(e){e.currentTarget.style.background="rgba(34,197,94,0.03)";e.currentTarget.style.borderColor="rgba(34,197,94,0.1)";}}
              onMouseLeave={function(e){e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="transparent";}}>
              <div style={{width:52,height:52,borderRadius:14,flexShrink:0,background:"rgba(34,197,94,0.06)",border:"1px solid rgba(34,197,94,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'IBM Plex Mono'",fontSize:17,fontWeight:700,color:"#22c55e"}}>{ss.step}</div>
              <div style={{flex:1}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}><h3 style={{fontSize:18,fontWeight:800,margin:0,letterSpacing:"-0.02em"}}>{ss.title}</h3><span style={{fontFamily:"'IBM Plex Mono'",fontSize:11,color:"#22c55e",fontWeight:500}}>{ss.time}</span></div>
              <p style={{fontFamily:"'Crimson Pro',serif",fontSize:16,color:"rgba(255,255,255,0.4)",lineHeight:1.6,margin:0}}>{ss.desc}</p></div>
            </div></Reveal>;})}
          </div>
        </section>

        {/* CTA */}
        <section style={{padding:"80px 40px",textAlign:"center"}}>
          <Reveal>
            <h2 style={{fontSize:"clamp(30px,5vw,48px)",fontWeight:900,letterSpacing:"-0.03em",margin:"0 0 16px"}}>Ready to get <span style={{color:"#22c55e"}}>slotted</span>?</h2>
            <p style={{fontFamily:"'Crimson Pro',serif",fontSize:19,color:"rgba(255,255,255,0.4)",lineHeight:1.6,margin:"0 0 36px"}}>Start free with sample data. Import your own SKUs when you're ready.</p>
            <button onClick={function(){setPhase("onboard");}} style={{fontSize:16,fontWeight:700,color:"#060810",background:"#22c55e",padding:"16px 40px",borderRadius:12,border:"none",cursor:"pointer",boxShadow:"0 4px 24px rgba(34,197,94,0.25)",fontFamily:"'Outfit',sans-serif"}}>Start Optimizing Free →</button>
            <div style={{display:"flex",justifyContent:"center",gap:24,marginTop:24}}>
              {["Free forever tier","No credit card","Setup in minutes"].map(function(ss2){return <div key={ss2} style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:5,height:5,borderRadius:"50%",background:"#22c55e"}}/><span style={{fontFamily:"'IBM Plex Mono'",fontSize:11,color:"rgba(255,255,255,0.3)",letterSpacing:0.5}}>{ss2}</span></div>;})}
            </div>
          </Reveal>
        </section>

        {/* Footer */}
        <footer style={{padding:"24px 40px",borderTop:"1px solid rgba(255,255,255,0.04)"}}>
          <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={onHome}>
              <span style={{fontSize:14,fontWeight:700}}>Slot<span style={{color:"#22c55e"}}>Wise</span></span>
              <span style={{fontSize:12,color:"rgba(255,255,255,0.2)"}}>by Slotted Media</span>
            </div>
            <span style={{fontFamily:"'IBM Plex Mono'",fontSize:11,color:"rgba(255,255,255,0.15)"}}>© 2026 Slotted Media</span>
          </div>
        </footer>
      </div>
    );
  }

  if (phase === "onboard") {
    return (
      <div style={{ minHeight:"100vh", background:"#0c0e13", fontFamily:F.sans, color:"#e0e0e0" }}>
        <link href={FONTS} rel="stylesheet" />
        <div style={{ maxWidth:650, margin:"0 auto", padding:"40px 32px" }}>
          <button onClick={function(){goToPhase("landing");}} style={{ background:"transparent", border:"none", color:"#666", cursor:"pointer", fontSize:12, marginBottom:20 }}>← Back to SlotWise</button>
          {step === 0 && (<div>
            <div style={{ fontSize:38, marginBottom:14 }}>⬡</div>
            <h2 style={{ fontSize:24, fontWeight:700, color:"#fff", margin:"0 0 8px" }}>SlotWise Setup</h2>
            <p style={{ fontSize:14, color:"#888", lineHeight:1.7, margin:"0 0 24px" }}>Configure zone classification for your warehouse.</p>
            <div style={{ marginBottom:20 }}><label style={{ fontSize:12, color:"#aaa", display:"block", marginBottom:10 }}>Warehouse size?</label>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>{["Small (<10k sqft)","Medium (10-50k)","Large (50k+)","Multi-Site"].map(function(s15){return <button key={s15} onClick={function(){setA(Object.assign({},a,{size:s15}));}} style={{flex:1,minWidth:120,padding:"12px",borderRadius:8,border:"1.5px solid "+(a.size===s15?"#22c55e":"rgba(255,255,255,0.08)"),background:a.size===s15?"rgba(34,197,94,0.08)":"rgba(255,255,255,0.02)",color:a.size===s15?"#22c55e":"#aaa",cursor:"pointer",fontSize:13,fontWeight:600}}>{s15}</button>;})}</div>
            </div>
            <div style={{ marginBottom:20 }}><label style={{ fontSize:12, color:"#aaa", display:"block", marginBottom:10 }}>Strategy?</label>
              <div style={{ display:"flex", gap:8 }}>{[{v:"aggressive",l:"Aggressive (15%)"},{v:"balanced",l:"Balanced (20%)"},{v:"conservative",l:"Conservative (30%)"}].map(function(o){return <button key={o.v} onClick={function(){setA(Object.assign({},a,{strategy:o.v}));}} style={{flex:1,padding:"12px",borderRadius:8,border:"1.5px solid "+(a.strategy===o.v?"#22c55e":"rgba(255,255,255,0.08)"),background:a.strategy===o.v?"rgba(34,197,94,0.08)":"rgba(255,255,255,0.02)",color:a.strategy===o.v?"#22c55e":"#aaa",cursor:"pointer",fontSize:13,fontWeight:600}}>{o.l}</button>;})}</div>
            </div>
            <div style={{ display:"flex", gap:12, marginTop:28 }}>
              <button onClick={function(){launch(true);}} style={{ flex:1, padding:"14px", borderRadius:10, border:"none", background:"#22c55e", color:"#fff", cursor:"pointer", fontSize:14, fontWeight:700 }}>🧪 Sample Data</button>
              <button onClick={function(){launch(false);}} style={{ flex:1, padding:"14px", borderRadius:10, border:"1px solid rgba(255,255,255,0.1)", background:"transparent", color:"#ccc", cursor:"pointer", fontSize:14, fontWeight:600 }}>📤 Start Empty</button>
            </div>
          </div>)}
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div style={{ minHeight:"100vh", background:"#0c0e13", fontFamily:F.sans, color:"#e0e0e0" }}>
      <link href={FONTS} rel="stylesheet" />
      <div style={{ background:"#111318", borderBottom:"1px solid rgba(255,255,255,0.06)", padding:"16px 32px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <button onClick={onHome} style={{ background:"transparent", border:"none", color:"#666", cursor:"pointer", fontSize:12 }}>← Home</button>
            <div style={{ width:32, height:32, borderRadius:8, background:"linear-gradient(135deg,#22c55e,#16a34a)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, color:"#fff", fontWeight:800 }}>⬡</div>
            <span style={{ fontFamily:F.hd, fontSize:16, fontWeight:700 }}>SlotWise</span>
          </div>
          <div style={{ display:"flex", gap:6 }}>
            <button onClick={function(){setShowImport(!showImport);}} style={{ padding:"6px 14px", borderRadius:6, border:"1px solid rgba(99,102,241,0.3)", background:"rgba(99,102,241,0.08)", color:"#6366f1", cursor:"pointer", fontSize:11, fontWeight:600 }}>↑ Import</button>
          </div>
        </div>
      </div>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"20px 32px" }}>
        {showImport && <div style={{ background:"rgba(99,102,241,0.05)", border:"1px solid rgba(99,102,241,0.2)", borderRadius:10, padding:16, marginBottom:16 }}>
          <textarea value={csvText} onChange={function(e){setCsvText(e.target.value);}} placeholder="id,name,picks,weight,category" style={{ width:"100%", height:60, background:"#0a0c10", color:"#ccc", border:"1px solid rgba(255,255,255,0.1)", borderRadius:6, padding:10, fontFamily:F.mn, fontSize:11, resize:"vertical", boxSizing:"border-box" }} />
          <button onClick={handleImport} style={{ marginTop:6, padding:"6px 16px", borderRadius:6, border:"none", background:"#6366f1", color:"#fff", cursor:"pointer", fontSize:11, fontWeight:700 }}>Import</button>
        </div>}
        {skus.length === 0 && !showImport && <div style={{ textAlign:"center", padding:50 }}><button onClick={function(){setSkus(SW_SAMPLE);}} style={{ padding:"10px 24px", borderRadius:8, border:"1px solid rgba(255,255,255,0.1)", background:"transparent", color:"#999", cursor:"pointer", fontSize:13 }}>Load Sample Data</button></div>}
        {skus.length > 0 && (<div>
          <div style={{ display:"flex", gap:10, marginBottom:16, flexWrap:"wrap" }}>
            {[{l:"SKUs",v:stats.total,c:"#6366f1"},{l:"Picks",v:stats.totalPicks.toLocaleString(),c:"#22c55e"},{l:"Zone A",v:stats.zones.A.length,c:"#22c55e"},{l:"Zone B",v:stats.zones.B.length,c:"#f59e0b"},{l:"Zone C",v:stats.zones.C.length,c:"#6366f1"}].map(function(k,i){return <div key={i} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:10,padding:"12px 14px",flex:1,minWidth:100,borderTop:"2.5px solid "+k.c}}><div style={{fontFamily:F.mn,fontSize:9,color:"#888",letterSpacing:1,textTransform:"uppercase",marginBottom:3}}>{k.l}</div><div style={{fontSize:20,fontWeight:800,color:"#f0f0f0"}}>{k.v}</div></div>;})}
          </div>
          <div style={{ display:"flex", gap:12, marginBottom:14, alignItems:"end", flexWrap:"wrap" }}>
            <div><label style={{ fontSize:11, color:"#999" }}>A</label><div style={{ display:"flex", alignItems:"center", gap:6 }}><input type="range" min={5} max={50} value={aP} onChange={function(e){setAP(+e.target.value);}} style={{ width:80, accentColor:"#22c55e" }} /><span style={{ fontFamily:F.mn, fontSize:13, color:"#22c55e", fontWeight:700 }}>{aP}%</span></div></div>
            <div><label style={{ fontSize:11, color:"#999" }}>B</label><div style={{ display:"flex", alignItems:"center", gap:6 }}><input type="range" min={10} max={60} value={bP} onChange={function(e){setBP(+e.target.value);}} style={{ width:80, accentColor:"#f59e0b" }} /><span style={{ fontFamily:F.mn, fontSize:13, color:"#f59e0b", fontWeight:700 }}>{bP}%</span></div></div>
            <div style={{ marginLeft:"auto", display:"flex", gap:5 }}>
              {["ALL","A","B","C"].map(function(z){var ac=filterZone===z;return <button key={z} onClick={function(){setFilterZone(z);}} style={{padding:"5px 10px",borderRadius:6,border:"1px solid "+(ac?(z==="ALL"?"#555":ZC[z].color):"rgba(255,255,255,0.1)"),background:ac?(z==="ALL"?"rgba(255,255,255,0.08)":ZC[z].bg):"transparent",color:ac?(z==="ALL"?"#fff":ZC[z].color):"#777",cursor:"pointer",fontSize:11,fontWeight:600,fontFamily:F.mn}}>{z==="ALL"?"All":z}</button>;})}
            </div>
          </div>
          <div style={{ background:"rgba(255,255,255,0.015)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:10, overflow:"hidden" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
              <thead><tr style={{ background:"rgba(255,255,255,0.03)" }}>
                {[{k:"id",l:"SKU"},{k:"name",l:"Name"},{k:"picks",l:"Picks"},{k:"weight",l:"Wt"},{k:"zone",l:"Zone"},{k:"slot",l:"Slot"}].map(function(col){return <th key={col.k} onClick={function(){if(sortBy===col.k)setSortDir(sortDir==="asc"?"desc":"asc");else{setSortBy(col.k);setSortDir("desc");}}} style={{padding:"9px 12px",textAlign:"left",cursor:"pointer",color:sortBy===col.k?"#22c55e":"#888",fontFamily:F.mn,fontSize:10,letterSpacing:0.8,textTransform:"uppercase",borderBottom:"1px solid rgba(255,255,255,0.06)",userSelect:"none"}}>{col.l}</th>;})}
              </tr></thead>
              <tbody>{filtered.map(function(sk,i){return <tr key={sk.id} style={{background:i%2===0?"transparent":"rgba(255,255,255,0.015)",borderLeft:"3px solid "+ZC[sk.zone].color}}>
                <td style={{padding:"8px 12px",fontFamily:F.mn,fontSize:11,color:"#aaa"}}>{sk.id}</td>
                <td style={{padding:"8px 12px",fontWeight:600,color:"#ddd"}}>{sk.name}</td>
                <td style={{padding:"8px 12px",fontFamily:F.mn,fontWeight:700,color:"#fff"}}>{sk.picks}</td>
                <td style={{padding:"8px 12px",fontFamily:F.mn,color:"#aaa"}}>{sk.weight}</td>
                <td style={{padding:"8px 12px"}}><Badge color={ZC[sk.zone].color}>{sk.zone}</Badge></td>
                <td style={{padding:"8px 12px",fontSize:12,color:"#ccc"}}>{sk.slot}</td>
              </tr>;})}</tbody>
            </table>
          </div>
        </div>)}
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════
   HEALTHPULSE (Compact: Onboarding + Dashboard)
   ══════════════════════════════════════════════════════════════ */
function HPFlow(props) {
  var onHome = props.onHome;
  var s = useState("landing"); var phase = s[0]; var setPhase = s[1];
  var s2 = useState({bizType:"",carryRate:"25"}); var a = s2[0]; var setA = s2[1];
  var s3 = useState(HP_SAMPLE); var items = s3[0]; var setItems = s3[1];
  var s4 = useState("overview"); var tab = s4[0]; var setTab = s4[1];
  var s5 = useState("healthScore"); var sortBy = s5[0]; var setSortBy = s5[1];
  var s6 = useState("asc"); var sortDir = s6[0]; var setSortDir = s6[1];
  var s7 = useState("ALL"); var filterStatus = s7[0]; var setFilterStatus = s7[1];
  var s8 = useState(false); var showImport = s8[0]; var setShowImport = s8[1];
  var s9 = useState(""); var csvText = s9[0]; var setCsvText = s9[1];

  useEffect(function(){ window.scrollTo(0, 0); }, [phase]);

  function launch(sample) { if(sample) setItems(HP_SAMPLE); else { setItems([]); setShowImport(true); } setPhase("dash"); }
  function handleImport(){try{var lines=csvText.trim().split("\n").filter(function(l){return l.trim();});if(lines.length<2)return;var h=lines[0].split(",").map(function(x){return x.trim().toLowerCase().replace(/ /g,"");});var p=lines.slice(1).map(function(line,i){var v=line.split(",").map(function(x){return x.trim();});var o={};h.forEach(function(hh,j){o[hh]=v[j]||"";});return{id:o.id||"SKU-"+(i+1),name:o.name||"Item "+(i+1),category:o.category||"General",unitCost:parseFloat(o.unitcost||o.cost||"1")||1,qtyOnHand:parseInt(o.qtyonhand||o.qty||"0")||0,avgDailySales:parseFloat(o.avgdailysales||"1")||1,lastSold:parseInt(o.lastsold||"1")||1,leadTime:parseInt(o.leadtime||"14")||14};});if(p.length){setItems(p);setShowImport(false);setCsvText("");}}catch(e){}}

  var data = useMemo(function(){return hpAbc(hpAnalyze(items));},[items]);
  var health = useMemo(function(){return data.length>0?Math.round(data.reduce(function(s10,i2){return s10+i2.healthScore;},0)/data.length):0;},[data]);
  var kpis = useMemo(function(){var tv=data.reduce(function(s10,i2){return s10+i2.inventoryValue;},0);return{totalValue:tv,stockouts:data.filter(function(d){return d.isStockout;}).length,lowStock:data.filter(function(d){return d.stockoutRisk;}).length,overstock:data.filter(function(d){return d.isOverstock;}).length,dead:data.filter(function(d){return d.isDead;}).length};},[data]);
  var filtered = useMemo(function(){var list=filterStatus==="ALL"?data:data.filter(function(d){return d.status===filterStatus;});return list.slice().sort(function(x,y){var av=x[sortBy],bv=y[sortBy];if(typeof av==="string"){av=av.toLowerCase();bv=bv.toLowerCase();}return sortDir==="asc"?(av<bv?-1:av>bv?1:0):(av>bv?-1:av<bv?1:0);});},[data,filterStatus,sortBy,sortDir]);
  var alerts = kpis.stockouts + kpis.lowStock + kpis.overstock + kpis.dead;
  var hColor = health>=75?HP.green:health>=50?HP.amber:HP.red;
  var circ = 2*Math.PI*54;

  /* ── LANDING PAGE ── */
  if (phase === "landing") {
    return (
      <div style={{background:HP.bg,color:HP.text,fontFamily:"'Playfair Display',Georgia,serif",minHeight:"100vh",overflow:"hidden"}}>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Libre+Franklin:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet" />
        <link href={FONTS} rel="stylesheet" />
        <style>{`@keyframes hpReveal{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}@keyframes hpPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}@keyframes hpGlow{0%,100%{box-shadow:0 0 30px rgba(184,115,51,0.08)}50%{box-shadow:0 0 60px rgba(184,115,51,0.15)}}::selection{background:rgba(184,115,51,0.2)}`}</style>

        {/* Nav */}
        <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(250,248,245,0.85)",backdropFilter:"blur(20px) saturate(180%)",borderBottom:"1px solid "+HP.border}}>
          <div style={{maxWidth:1100,margin:"0 auto",padding:"0 40px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",alignItems:"center"}}>
            <button onClick={onHome} style={{background:"transparent",border:"none",color:HP.textLight,cursor:"pointer",fontSize:12,fontFamily:"'Libre Franklin',sans-serif",marginRight:12}}>← Home</button>
            <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={onHome}>
              <div style={{width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,"+HP.copper+",#D4943E)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:800}}>◈</div>
              <span style={{fontFamily:"'Libre Franklin',sans-serif",fontSize:18,fontWeight:700,color:HP.text}}>Health<span style={{color:HP.copper}}>Pulse</span></span>
              <span style={{fontFamily:"'Fira Code',monospace",fontSize:10,color:HP.textLight,marginLeft:4}}>by Slotted Media</span>
            </div>
            </div>
            <button onClick={function(){setPhase("onboard");}} style={{fontFamily:"'Libre Franklin',sans-serif",fontSize:13,fontWeight:700,color:"#fff",background:HP.copper,padding:"8px 22px",borderRadius:8,border:"none",cursor:"pointer"}}>Get Started</button>
          </div>
        </nav>

        {/* Hero */}
        <section style={{padding:"160px 40px 80px",position:"relative"}}>
          <div style={{position:"absolute",top:0,right:0,width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(184,115,51,0.06) 0%,transparent 70%)"}}/>
          <div style={{maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",gap:80,position:"relative"}}>
            <div style={{flex:1,maxWidth:540}}>
              <div style={{animation:"hpReveal 0.8s ease-out both"}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 16px",borderRadius:100,background:HP.copperBg,border:"1px solid "+HP.copper+"30",marginBottom:28}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:HP.copper}}/>
                  <span style={{fontFamily:"'Fira Code',monospace",fontSize:11,color:HP.copper,fontWeight:500,letterSpacing:0.5}}>INVENTORY HEALTH DASHBOARD</span>
                </div>
              </div>
              <h1 style={{fontSize:"clamp(40px,5.5vw,64px)",fontWeight:700,lineHeight:1.1,letterSpacing:"-0.03em",margin:"0 0 24px",color:HP.text,animation:"hpReveal 0.8s ease-out 0.1s both"}}>
                Know your inventory's<br/><span style={{fontStyle:"italic",color:HP.copper}}>vital signs.</span>
              </h1>
              <p style={{fontFamily:"'Libre Franklin',sans-serif",fontSize:"clamp(16px,2vw,19px)",color:HP.textMid,lineHeight:1.7,margin:"0 0 36px",maxWidth:460,animation:"hpReveal 0.8s ease-out 0.2s both"}}>
                HealthPulse monitors turnover, catches stockouts before they happen, flags dead stock, and tracks carrying costs — giving you total visibility into every SKU's health.
              </p>
              <div style={{display:"flex",gap:12,animation:"hpReveal 0.8s ease-out 0.3s both"}}>
                <button onClick={function(){setPhase("onboard");}} style={{fontFamily:"'Libre Franklin',sans-serif",fontSize:16,fontWeight:700,color:"#fff",background:HP.copper,padding:"14px 32px",borderRadius:10,border:"none",cursor:"pointer",boxShadow:"0 4px 20px rgba(184,115,51,0.2)"}}>Start Health Check</button>
              </div>
            </div>
            {/* Health gauge viz */}
            <div style={{flex:1,display:"flex",justifyContent:"center",animation:"hpReveal 1s ease-out 0.4s both"}}>
              <div style={{background:HP.card,border:"1px solid "+HP.border,borderRadius:24,padding:36,boxShadow:"0 8px 40px rgba(0,0,0,0.04)",animation:"hpGlow 5s ease-in-out infinite"}}>
                <svg width="220" height="220" viewBox="0 0 220 220">
                  <circle cx="110" cy="110" r="90" fill="none" stroke={HP.borderLight} strokeWidth="14"/>
                  <circle cx="110" cy="110" r="90" fill="none" stroke={HP.copper} strokeWidth="14" strokeDasharray={2*Math.PI*90} strokeDashoffset={2*Math.PI*90*0.28} strokeLinecap="round" transform="rotate(-90 110 110)" style={{transition:"stroke-dashoffset 2s"}}/>
                  <text x="110" y="100" textAnchor="middle" style={{fontFamily:"'Playfair Display',serif",fontSize:52,fontWeight:700,fill:HP.text}}>72</text>
                  <text x="110" y="128" textAnchor="middle" style={{fontFamily:"'Libre Franklin',sans-serif",fontSize:14,fill:HP.textLight}}>Health Score</text>
                  <text x="110" y="148" textAnchor="middle" style={{fontFamily:"'Fira Code',monospace",fontSize:11,fill:HP.copper}}>SAMPLE DATA</text>
                </svg>
                <div style={{display:"flex",justifyContent:"center",gap:20,marginTop:16}}>
                  {[{v:"2",l:"Stockouts",c:HP.red},{v:"3",l:"Low Stock",c:HP.amber},{v:"1",l:"Dead",c:HP.red}].map(function(k){
                    return <div key={k.l} style={{textAlign:"center"}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:k.c}}>{k.v}</div><div style={{fontFamily:"'Fira Code',monospace",fontSize:9,color:HP.textLight,letterSpacing:0.5}}>{k.l}</div></div>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What it monitors */}
        <section style={{padding:"60px 40px 80px"}}>
          <div style={{maxWidth:1100,margin:"0 auto"}}>
            <Reveal><div style={{textAlign:"center",marginBottom:48}}>
              <span style={{fontFamily:"'Fira Code',monospace",fontSize:11,color:HP.copper,letterSpacing:2,textTransform:"uppercase"}}>WHAT IT MONITORS</span>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,4vw,42px)",fontWeight:700,letterSpacing:"-0.02em",margin:"12px 0",color:HP.text}}>Five dimensions of <span style={{fontStyle:"italic",color:HP.copper}}>inventory health.</span></h2>
            </div></Reveal>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12}}>
              {[
                {icon:"🚫",title:"Stockout Detection",desc:"Catches zero-stock items instantly and flags SKUs approaching reorder point.",color:HP.red},
                {icon:"📉",title:"Low Stock Alerts",desc:"Warns when on-hand quantity drops below safety stock before it becomes a stockout.",color:HP.amber},
                {icon:"📈",title:"Overstock Flagging",desc:"Identifies SKUs with excess days-on-hand — capital tied up that could be working elsewhere.",color:HP.amber},
                {icon:"💀",title:"Dead Stock ID",desc:"Finds items with no sales activity or extreme days-on-hand. Shows value at risk.",color:HP.red},
                {icon:"📊",title:"ABC Classification",desc:"Classifies every SKU by daily sale value — A items get tight control, C items get periodic review.",color:HP.blue},
              ].map(function(f,i){return <Reveal key={f.title} delay={i*0.08}><div style={{background:HP.card,border:"1px solid "+HP.border,borderRadius:16,padding:"24px 18px",transition:"all 0.3s",cursor:"default"}}
                onMouseEnter={function(e){e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.06)";}}
                onMouseLeave={function(e){e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                <div style={{fontSize:28,marginBottom:12}}>{f.icon}</div>
                <h3 style={{fontFamily:"'Libre Franklin',sans-serif",fontSize:14,fontWeight:700,color:f.color,margin:"0 0 8px"}}>{f.title}</h3>
                <p style={{fontFamily:"'Libre Franklin',sans-serif",fontSize:13,color:HP.textMid,lineHeight:1.6,margin:0}}>{f.desc}</p>
              </div></Reveal>;})}
            </div>
          </div>
        </section>

        {/* Dashboard preview */}
        <section style={{padding:"60px 40px",background:HP.card,borderTop:"1px solid "+HP.border,borderBottom:"1px solid "+HP.border}}>
          <div style={{maxWidth:1000,margin:"0 auto"}}>
            <Reveal><div style={{textAlign:"center",marginBottom:48}}>
              <span style={{fontFamily:"'Fira Code',monospace",fontSize:11,color:HP.copper,letterSpacing:2,textTransform:"uppercase"}}>THE DASHBOARD</span>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(26px,3.5vw,38px)",fontWeight:700,margin:"12px 0",color:HP.text}}>Three views. <span style={{fontStyle:"italic",color:HP.copper}}>Complete clarity.</span></h2>
            </div></Reveal>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
              {[
                {title:"Overview",desc:"Health score gauge, KPI cards (inventory value, carrying cost, avg DOH), alert counts with clickable badges, and an inventory aging bar chart.",icon:"🎯"},
                {title:"All Items",desc:"Full sortable table with every SKU — quantity, days-on-hand, inventory value, health score bar, status badge, and ABC class. Filter by status.",icon:"📋"},
                {title:"Alerts",desc:"Items grouped by severity: Stockouts, Low Stock, Overstock, Dead Stock. Each group shows affected SKUs with value and recommended action.",icon:"🔔"},
              ].map(function(v,i){return <Reveal key={v.title} delay={i*0.1}><div style={{background:HP.bg,border:"1px solid "+HP.border,borderRadius:16,padding:"28px 22px"}}>
                <div style={{fontSize:28,marginBottom:12}}>{v.icon}</div>
                <h3 style={{fontFamily:"'Libre Franklin',sans-serif",fontSize:17,fontWeight:700,margin:"0 0 10px",color:HP.copper}}>{v.title}</h3>
                <p style={{fontFamily:"'Libre Franklin',sans-serif",fontSize:13,color:HP.textMid,lineHeight:1.7,margin:0}}>{v.desc}</p>
              </div></Reveal>;})}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section style={{padding:"60px 40px 80px"}}>
          <div style={{maxWidth:800,margin:"0 auto"}}>
            <Reveal><div style={{textAlign:"center",marginBottom:48}}>
              <span style={{fontFamily:"'Fira Code',monospace",fontSize:11,color:HP.copper,letterSpacing:2,textTransform:"uppercase"}}>SETUP</span>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(26px,3.5vw,38px)",fontWeight:700,margin:"12px 0",color:HP.text}}>From CSV to <span style={{fontStyle:"italic",color:HP.copper}}>complete visibility</span> in minutes.</h2>
            </div></Reveal>
            {[
              {n:"01",title:"Choose your business type",desc:"Distribution, E-Commerce, Manufacturing, Retail, or Multi-Site. Each has different DOH targets and carrying cost benchmarks."},
              {n:"02",title:"Set your thresholds",desc:"Carrying cost rate and target days-on-hand. These drive the health score calculation and alert triggers."},
              {n:"03",title:"Load your data",desc:"Use sample data to explore, or paste a CSV with SKU ID, unit cost, quantity, daily sales, lead time, and last sold date."},
              {n:"04",title:"Monitor and act",desc:"The dashboard updates in real-time. Click any alert to see affected SKUs. Export results for your team."},
            ].map(function(st,i){return <Reveal key={st.n} delay={i*0.08}><div style={{display:"flex",gap:24,marginBottom:8,padding:"20px 24px",borderRadius:14,border:"1px solid transparent",transition:"all 0.3s"}}
              onMouseEnter={function(e){e.currentTarget.style.background=HP.card;e.currentTarget.style.borderColor=HP.border;}}
              onMouseLeave={function(e){e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="transparent";}}>
              <div style={{width:48,height:48,borderRadius:14,flexShrink:0,background:HP.copperBg,border:"1px solid "+HP.copper+"25",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Fira Code',monospace",fontSize:16,fontWeight:600,color:HP.copper}}>{st.n}</div>
              <div><h3 style={{fontFamily:"'Libre Franklin',sans-serif",fontSize:17,fontWeight:700,margin:"0 0 6px",color:HP.text}}>{st.title}</h3>
              <p style={{fontFamily:"'Libre Franklin',sans-serif",fontSize:14,color:HP.textMid,lineHeight:1.6,margin:0}}>{st.desc}</p></div>
            </div></Reveal>;})}
          </div>
        </section>

        {/* CTA */}
        <section style={{padding:"60px 40px 80px",textAlign:"center"}}>
          <Reveal>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,4vw,44px)",fontWeight:700,margin:"0 0 16px",color:HP.text}}>Give your inventory a <span style={{fontStyle:"italic",color:HP.copper}}>health check.</span></h2>
            <p style={{fontFamily:"'Libre Franklin',sans-serif",fontSize:17,color:HP.textMid,margin:"0 0 32px"}}>Start free with sample data. Import yours when ready.</p>
            <button onClick={function(){setPhase("onboard");}} style={{fontFamily:"'Libre Franklin',sans-serif",fontSize:16,fontWeight:700,color:"#fff",background:HP.copper,padding:"16px 40px",borderRadius:12,border:"none",cursor:"pointer",boxShadow:"0 4px 20px rgba(184,115,51,0.2)"}}>Start Health Check →</button>
            <div style={{display:"flex",justifyContent:"center",gap:24,marginTop:20}}>
              {["Free forever","No credit card","Works with any WMS"].map(function(t2){return <div key={t2} style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:5,height:5,borderRadius:"50%",background:HP.copper}}/><span style={{fontFamily:"'Fira Code',monospace",fontSize:11,color:HP.textLight,letterSpacing:0.3}}>{t2}</span></div>;})}
            </div>
          </Reveal>
        </section>

        <footer style={{padding:"24px 40px",borderTop:"1px solid "+HP.border}}>
          <div style={{maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}} onClick={onHome}>
              <span style={{fontFamily:"'Libre Franklin',sans-serif",fontSize:14,fontWeight:700,color:HP.text}}>Health<span style={{color:HP.copper}}>Pulse</span></span>
              <span style={{fontFamily:"'Fira Code',monospace",fontSize:10,color:HP.textLight}}>by Slotted Media</span>
            </div>
            <span style={{fontFamily:"'Fira Code',monospace",fontSize:11,color:HP.textLight}}>© 2026 Slotted Media</span>
          </div>
        </footer>
      </div>
    );
  }

  if (phase === "onboard") {
    return (
      <div style={{ minHeight:"100vh", background:HP.bg, fontFamily:F.bd, color:HP.text }}>
        <link href={FONTS} rel="stylesheet" />
        <div style={{ maxWidth:650, margin:"0 auto", padding:"40px 32px" }}>
          <button onClick={function(){setPhase("landing");}} style={{ background:"transparent", border:"none", color:HP.textLight, cursor:"pointer", fontSize:12, marginBottom:20 }}>← Back to HealthPulse</button>
          <div style={{ fontSize:38, marginBottom:14, color:HP.copper }}>◈</div>
          <h2 style={{ fontFamily:F.hd, fontSize:24, fontWeight:800, margin:"0 0 8px" }}>HealthPulse Setup</h2>
          <p style={{ fontSize:14, color:HP.textMid, lineHeight:1.7, margin:"0 0 24px" }}>Configure health monitoring for your inventory.</p>
          <div style={{ marginBottom:20 }}><label style={{ fontSize:12, color:HP.textMid, fontWeight:600, display:"block", marginBottom:10 }}>Business type?</label>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>{["Distribution","E-Commerce","Manufacturing","Retail","Multi-Site"].map(function(s10){return <button key={s10} onClick={function(){setA(Object.assign({},a,{bizType:s10}));}} style={{flex:1,minWidth:100,padding:"12px",borderRadius:8,border:"1.5px solid "+(a.bizType===s10?HP.copper:HP.border),background:a.bizType===s10?HP.copperBg:HP.card,color:a.bizType===s10?HP.copper:HP.textMid,cursor:"pointer",fontSize:13,fontWeight:600}}>{s10}</button>;})}</div>
          </div>
          <div style={{ display:"flex", gap:12, marginTop:28 }}>
            <button onClick={function(){launch(true);}} style={{ flex:1, padding:"14px", borderRadius:10, border:"none", background:HP.copper, color:"#fff", cursor:"pointer", fontSize:14, fontWeight:700 }}>🧪 Sample Data</button>
            <button onClick={function(){launch(false);}} style={{ flex:1, padding:"14px", borderRadius:10, border:"1px solid "+HP.border, background:"transparent", color:HP.textMid, cursor:"pointer", fontSize:14, fontWeight:600 }}>📤 Start Empty</button>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div style={{ minHeight:"100vh", background:HP.bg, fontFamily:F.bd, color:HP.text }}>
      <link href={FONTS} rel="stylesheet" />
      <header style={{ background:HP.card, borderBottom:"1px solid "+HP.border, padding:"16px 32px" }}>
        <div style={{ maxWidth:1320, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <button onClick={onHome} style={{ background:"transparent", border:"none", color:HP.textLight, cursor:"pointer", fontSize:12 }}>← Home</button>
            <div style={{ width:32, height:32, borderRadius:8, background:"linear-gradient(135deg,"+HP.copper+",#D4943E)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, color:"#fff", fontWeight:800 }}>◈</div>
            <span style={{ fontFamily:F.hd, fontSize:16, fontWeight:700 }}>HealthPulse</span>
          </div>
          <button onClick={function(){setShowImport(!showImport);}} style={{ padding:"6px 14px", borderRadius:8, border:"1px solid "+HP.border, background:HP.card, color:HP.textMid, cursor:"pointer", fontSize:11, fontWeight:600 }}>↑ Import</button>
        </div>
      </header>
      <div style={{ maxWidth:1320, margin:"0 auto", padding:"20px 32px" }}>
        {showImport && <div style={{ background:HP.card, border:"1px solid "+HP.border, borderRadius:10, padding:16, marginBottom:16 }}>
          <textarea value={csvText} onChange={function(e){setCsvText(e.target.value);}} placeholder="id,name,category,unitCost,qtyOnHand,avgDailySales,leadTime,lastSold" style={{ width:"100%", height:60, background:"#fff", color:HP.text, border:"1px solid "+HP.border, borderRadius:6, padding:10, fontFamily:F.mn, fontSize:11, resize:"vertical", boxSizing:"border-box" }} />
          <button onClick={handleImport} style={{ marginTop:6, padding:"6px 16px", borderRadius:6, border:"none", background:HP.blue, color:"#fff", cursor:"pointer", fontSize:11, fontWeight:700 }}>Import</button>
        </div>}
        {items.length === 0 && !showImport && <div style={{ textAlign:"center", padding:50 }}><button onClick={function(){setItems(HP_SAMPLE);}} style={{ padding:"10px 24px", borderRadius:8, border:"1px solid "+HP.border, background:"transparent", color:HP.textMid, cursor:"pointer", fontSize:13 }}>Load Sample Data</button></div>}
        {items.length > 0 && (<div>
          {/* Tabs */}
          <div style={{ display:"flex", gap:4, marginBottom:20, background:HP.cardAlt, borderRadius:10, padding:4, width:"fit-content" }}>
            {[{id:"overview",l:"Overview"},{id:"items",l:"All Items"},{id:"alerts",l:"Alerts ("+alerts+")"}].map(function(t){return <button key={t.id} onClick={function(){setTab(t.id);}} style={{padding:"7px 16px",borderRadius:8,border:"none",cursor:"pointer",fontFamily:F.bd,fontSize:12,fontWeight:600,background:tab===t.id?HP.card:"transparent",color:tab===t.id?HP.text:HP.textLight}}>{t.l}</button>;})}
          </div>
          {/* Overview */}
          {tab === "overview" && (<div>
            <div style={{ display:"flex", gap:12, marginBottom:16, flexWrap:"wrap" }}>
              <div style={{ background:HP.card, border:"1px solid "+HP.border, borderRadius:14, padding:"18px 24px", display:"flex", alignItems:"center", gap:20, minWidth:220 }}>
                <svg width="100" height="100" viewBox="0 0 140 140"><circle cx="70" cy="70" r="54" fill="none" stroke={HP.borderLight} strokeWidth="10"/><circle cx="70" cy="70" r="54" fill="none" stroke={hColor} strokeWidth="10" strokeDasharray={circ} strokeDashoffset={circ-(health/100)*circ} strokeLinecap="round" transform="rotate(-90 70 70)" style={{transition:"stroke-dashoffset 1s"}}/><text x="70" y="66" textAnchor="middle" style={{fontFamily:F.hd,fontSize:28,fontWeight:800,fill:HP.text}}>{health}</text><text x="70" y="84" textAnchor="middle" style={{fontFamily:F.bd,fontSize:11,fill:HP.textLight}}>{health>=75?"Good":health>=50?"Fair":"Poor"}</text></svg>
                <div><div style={{ fontFamily:F.hd, fontSize:14, fontWeight:700 }}>Health Score</div><div style={{ fontSize:12, color:HP.textLight }}>{data.length} SKUs</div></div>
              </div>
              <div style={{ display:"flex", gap:8, flex:1, flexWrap:"wrap" }}>
                {[{l:"Value",v:"$"+Math.round(kpis.totalValue).toLocaleString()},{l:"Stockouts",v:kpis.stockouts,c:kpis.stockouts>0?HP.red:HP.green},{l:"Low Stock",v:kpis.lowStock,c:kpis.lowStock>0?HP.amber:HP.green},{l:"Overstock",v:kpis.overstock,c:kpis.overstock>0?HP.amber:HP.green},{l:"Dead Stock",v:kpis.dead,c:kpis.dead>0?HP.red:HP.green}].map(function(k,i){return <div key={i} style={{background:HP.card,border:"1px solid "+HP.border,borderRadius:10,padding:"12px 14px",flex:1,minWidth:90}}><div style={{fontFamily:F.bd,fontSize:10,fontWeight:600,color:HP.textLight,letterSpacing:0.5,textTransform:"uppercase",marginBottom:4}}>{k.l}</div><div style={{fontFamily:F.hd,fontSize:20,fontWeight:700,color:k.c||HP.text}}>{k.v}</div></div>;})}
              </div>
            </div>
          </div>)}
          {/* Items */}
          {tab === "items" && (<div>
            <div style={{ display:"flex", gap:6, marginBottom:12, flexWrap:"wrap" }}>
              {["ALL","Healthy","Low Stock","Overstock","Stockout","Dead Stock"].map(function(s10){return <button key={s10} onClick={function(){setFilterStatus(s10);}} style={{padding:"5px 12px",borderRadius:8,border:"1px solid "+(filterStatus===s10?HP.copper:HP.border),background:filterStatus===s10?HP.copperBg:HP.card,color:filterStatus===s10?HP.copper:HP.textMid,cursor:"pointer",fontSize:11,fontWeight:600}}>{s10==="ALL"?"All":s10}</button>;})}
            </div>
            <div style={{ background:HP.card, border:"1px solid "+HP.border, borderRadius:14, overflow:"hidden" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                <thead><tr style={{ background:HP.cardAlt }}>
                  {[{k:"id",l:"SKU"},{k:"name",l:"Name"},{k:"qtyOnHand",l:"Qty"},{k:"daysOnHand",l:"DOH"},{k:"healthScore",l:"Health"},{k:"status",l:"Status"}].map(function(col){return <th key={col.k} onClick={function(){if(sortBy===col.k)setSortDir(sortDir==="asc"?"desc":"asc");else{setSortBy(col.k);setSortDir(col.k==="name"?"asc":"desc");}}} style={{padding:"9px 12px",textAlign:"left",cursor:"pointer",fontFamily:F.mn,fontSize:10,letterSpacing:0.5,textTransform:"uppercase",color:sortBy===col.k?HP.copper:HP.textLight,borderBottom:"1px solid "+HP.border,userSelect:"none"}}>{col.l}</th>;})}
                </tr></thead>
                <tbody>{filtered.map(function(d){return <tr key={d.id} style={{borderBottom:"1px solid "+HP.borderLight}}>
                  <td style={{padding:"9px 12px",fontFamily:F.mn,fontSize:11,color:HP.textMid}}>{d.id}</td>
                  <td style={{padding:"9px 12px",fontWeight:600}}>{d.name}</td>
                  <td style={{padding:"9px 12px",fontFamily:F.mn}}>{d.qtyOnHand.toLocaleString()}</td>
                  <td style={{padding:"9px 12px",fontFamily:F.mn,color:d.daysOnHand>90?HP.red:d.daysOnHand>60?HP.amber:HP.text}}>{d.daysOnHand>9000?"∞":d.daysOnHand}</td>
                  <td style={{padding:"9px 12px"}}><div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:32,height:4,borderRadius:2,background:HP.borderLight,overflow:"hidden"}}><div style={{width:d.healthScore+"%",height:"100%",borderRadius:2,background:d.healthScore>=75?HP.green:d.healthScore>=50?HP.amber:HP.red}}/></div><span style={{fontFamily:F.mn,fontSize:10,color:HP.textMid}}>{d.healthScore}</span></div></td>
                  <td style={{padding:"9px 12px"}}><Badge color={d.statusColor}>{d.status}</Badge></td>
                </tr>;})}</tbody>
              </table>
            </div>
          </div>)}
          {/* Alerts */}
          {tab === "alerts" && (<div>
            {[{s:"Stockout",t:"🚫 Stockout",co:HP.red,bg:HP.redBg},{s:"Low Stock",t:"⚠️ Low Stock",co:HP.amber,bg:HP.amberBg},{s:"Overstock",t:"📈 Overstock",co:HP.amber,bg:HP.amberBg},{s:"Dead Stock",t:"💀 Dead Stock",co:HP.red,bg:HP.redBg}].map(function(g){var gi=data.filter(function(d){return d.status===g.s;});if(!gi.length)return null;return <div key={g.s} style={{marginBottom:14,background:g.bg,borderRadius:12,overflow:"hidden",border:"1px solid "+g.co+"20"}}>
              <div style={{padding:"12px 18px",borderBottom:"1px solid "+g.co+"20"}}><div style={{fontFamily:F.hd,fontSize:13,fontWeight:700,color:g.co}}>{g.t} — {gi.length}</div></div>
              <div style={{background:"rgba(255,255,255,0.5)"}}>
                {gi.map(function(d){return <div key={d.id} style={{display:"flex",justifyContent:"space-between",padding:"9px 18px",borderBottom:"1px solid "+g.co+"10",fontSize:12}}>
                  <span><span style={{fontFamily:F.mn,fontSize:10,color:HP.textMid,marginRight:8}}>{d.id}</span><span style={{fontWeight:600}}>{d.name}</span></span>
                  <span style={{fontFamily:F.mn,fontWeight:600,color:g.co}}>${Math.round(d.inventoryValue).toLocaleString()}</span>
                </div>;})}
              </div>
            </div>;})}
            {alerts === 0 && <div style={{ textAlign:"center", padding:40, background:HP.greenBg, borderRadius:12 }}><div style={{ fontFamily:F.hd, fontSize:16, fontWeight:700, color:HP.green }}>✅ All Clear</div></div>}
          </div>)}
        </div>)}
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════
   DIGITAL TWIN — Setup Designer + Radar View
   ══════════════════════════════════════════════════════════════ */
function DTFlow(props) {
  var onHome = props.onHome;
  var s = useState("landing"); var phase = s[0]; var setPhase = s[1];

  // Setup config
  var s2 = useState({
    warehouseName: "Main Warehouse",
    widthFt: 120, depthFt: 80,
    aislePrefix: "A", startAisle: 11, numAisles: 14,
    baysPerSide: 22, dockDoors: 3,
    enabledTypes: { "Pushback":true, "Case flow":true, "Handstack":true, "VNA 24\"":true, "VNA 11\"":false },
  });
  var cfg = s2[0]; var setCfg = s2[1];
  function setField(k, v) { setCfg(function(prev) { return Object.assign({}, prev, {[k]: v}); }); }
  function toggleType(name) {
    setCfg(function(prev) {
      var next = Object.assign({}, prev.enabledTypes);
      next[name] = !next[name];
      return Object.assign({}, prev, { enabledTypes: next });
    });
  }

  // Radar state
  var s3 = useState([]); var bays = s3[0]; var setBays = s3[1];
  var s4 = useState([]); var aisleNames = s4[0]; var setAisleNames = s4[1];
  var s5 = useState("lines"); var colorBy = s5[0]; var setColorBy = s5[1];
  var s6 = useState("All Types"); var rackFilter = s6[0]; var setRackFilter = s6[1];
  var s7 = useState(""); var searchTerm = s7[0]; var setSearchTerm = s7[1];
  var s8 = useState("legend"); var sidebarTab = s8[0]; var setSidebarTab = s8[1];
  var s9 = useState(null); var hoveredBay = s9[0]; var setHoveredBay = s9[1];
  var s10 = useState(null); var selectedBay = s10[0]; var setSelectedBay = s10[1];
  var s11 = useState({x:0,y:0}); var tooltipPos = s11[0]; var setTooltipPos = s11[1];
  var s12 = useState({x:0,y:0}); var viewOffset = s12[0]; var setViewOffset = s12[1];
  var s13 = useState(1); var zoom = s13[0]; var setZoom = s13[1];
  var dragRef = useRef({dragging:false,startX:0,startY:0,startOX:0,startOY:0});
  useEffect(function(){ window.scrollTo(0, 0); }, [phase]);

  function handleGenerate() {
    var result = generateBays(cfg);
    setBays(result.bays);
    setAisleNames(result.aisleNames);
    setPhase("radar");
  }

  function handleReset() {
    setPhase("setup");
    setBays([]);
    setAisleNames([]);
    setColorBy("lines");
    setRackFilter("All Types");
    setSearchTerm("");
    setSelectedBay(null);
    setHoveredBay(null);
    setViewOffset({x:0,y:0});
    setZoom(1);
  }

  var stats = useMemo(function(){
    var totalLines = bays.reduce(function(s14,b){return s14+b.lines;},0);
    var active = bays.filter(function(b){return b.lines>0;}).length;
    var maxLines = Math.max.apply(null, bays.map(function(b){return b.lines;}).concat([1]));
    var typeCounts = {};
    RACK_TYPES.forEach(function(t){typeCounts[t.name]=0;});
    bays.forEach(function(b){typeCounts[b.type.name]=(typeCounts[b.type.name]||0)+1;});
    var linesByAisle = {};
    bays.forEach(function(b){linesByAisle[b.aisle]=(linesByAisle[b.aisle]||0)+b.lines;});
    return {totalLines:totalLines, locations:bays.length, active:active, maxLines:maxLines, typeCounts:typeCounts, linesByAisle:linesByAisle};
  },[bays]);

  var filteredIds = useMemo(function(){
    var list = bays;
    if(rackFilter!=="All Types") list=list.filter(function(b){return b.type.name===rackFilter;});
    if(searchTerm){var t=searchTerm.toLowerCase();list=list.filter(function(b){return b.id.toLowerCase().includes(t)||(b.sku&&b.sku.toLowerCase().includes(t));});}
    var s14=new Set();list.forEach(function(b){s14.add(b.id);});return s14;
  },[bays,rackFilter,searchTerm]);

  var aisleLinesSorted = useMemo(function(){
    return aisleNames.map(function(n){return{name:n,lines:stats.linesByAisle[n]||0};}).sort(function(a2,b2){return b2.lines-a2.lines;});
  },[aisleNames,stats]);
  var maxAL = useMemo(function(){return Math.max.apply(null,aisleLinesSorted.map(function(a2){return a2.lines;}).concat([1]));},[aisleLinesSorted]);

  /* ── SETUP WIZARD (multi-step) ─── */
  var setupStepState = useState(0);
  var setupStep = setupStepState[0];
  var setSetupStep = setupStepState[1];
  var SETUP_TABS = ["Identity", "Layout", "Rack Types", "Slotting Rules", "Travel & Output", "Generate"];

  // Extra config fields for questionnaire
  var extraState = useState({
    locFormat: "", pickIdentifier: "Pick", levels: "A,B,C,D,E,F,G,H,J",
    hasSections: "no", sectionPriority: "travel distance",
    hasXY: "yes", xyUnit: "feet",
    levelPriorityCF: "B,C,A", levelPriorityHS: "C,D,B,E,A,F,G,H,J",
    levelPriorityVNA: "C,D,B,E,A,F,G,H,J,K,L,M,N,P,Q,R,S,T",
    hsPhase1: "C,D,B,E,A", hsPhase2: "F,G,H,J",
    vnaSplit: "On-hand qty > 2 = wide bay, ≤ 2 = narrow bay",
    skuSortPB: "lines", skuSortCF: "lines", skuSortHS: "lines", skuSortVNA: "onhand",
    locSortMethod: "travel distance", slotSeparate: "yes",
    baseX: "0", baseY: "0", distMethod: "manhattan",
    heatMetric: "lines", showEmpty: "yes", wantComparison: "yes",
    numScenarios: "1", scenarioDesc: "",
  });
  var extra = extraState[0];
  var setExtra = extraState[1];
  function setEx(k, v) { setExtra(function(prev) { return Object.assign({}, prev, {[k]: v}); }); }

  function InputField(props) {
    return React.createElement("div", { style: { marginBottom: 14 } },
      React.createElement("label", { style: { fontSize: 12, color: DT.textMid, display: "block", marginBottom: 6, fontWeight: 500 } }, props.label),
      props.note ? React.createElement("div", { style: { fontSize: 11, color: DT.textDim, marginBottom: 6, fontStyle: "italic" } }, props.note) : null,
      props.type === "select" ?
        React.createElement("select", { value: props.value, onChange: function(e) { props.onChange(e.target.value); }, style: { width: "100%", padding: "9px 12px", background: DT.bg, border: "1px solid " + DT.panelBorder, borderRadius: 8, color: DT.text, fontFamily: F.bd, fontSize: 13, outline: "none", boxSizing: "border-box" } }, props.options.map(function(o) { return React.createElement("option", { key: o, value: o }, o); })) :
      props.type === "toggle" ?
        React.createElement("div", { style: { display: "flex", gap: 8 } }, ["yes", "no"].map(function(v) {
          var active = props.value === v;
          return React.createElement("button", { key: v, onClick: function() { props.onChange(v); }, style: { flex: 1, padding: "9px", borderRadius: 8, border: "1.5px solid " + (active ? DT.coral : DT.panelBorder), background: active ? DT.coral + "15" : "transparent", color: active ? DT.coral : DT.textDim, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: F.bd } }, v === "yes" ? "Yes" : "No");
        })) :
        React.createElement("input", { value: props.value, onChange: function(e) { props.onChange(e.target.value); }, placeholder: props.placeholder || "", style: { width: "100%", padding: "9px 12px", background: DT.bg, border: "1px solid " + DT.panelBorder, borderRadius: 8, color: DT.text, fontFamily: props.mono ? F.mn : F.bd, fontSize: 13, outline: "none", boxSizing: "border-box" } })
    );
  }

  function SetupPanel(props) {
    return React.createElement("div", { style: { background: DT.panel, border: "1px solid " + DT.panelBorder, borderRadius: 14, padding: "22px 24px", marginBottom: 16 } },
      React.createElement("div", { style: { fontFamily: F.mn, fontSize: 10, color: DT.textDim, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 } }, props.title),
      props.children
    );
  }

  /* ── LANDING PAGE ── */
  if (phase === "landing") {
    return (
      <div style={{background:DT.bg,color:DT.text,fontFamily:"'Space Grotesk',sans-serif",minHeight:"100vh",overflow:"hidden"}}>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href={FONTS} rel="stylesheet" />
        <style>{`@keyframes dtScan{0%{transform:translateY(-100%)}100%{transform:translateY(100%)}}@keyframes dtReveal{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}@keyframes dtPulse{0%,100%{opacity:0.4}50%{opacity:1}}@keyframes dtGlitch{0%,90%,100%{transform:translateX(0)}92%{transform:translateX(-2px)}94%{transform:translateX(2px)}96%{transform:translateX(-1px)}98%{transform:translateX(1px)}}::selection{background:rgba(255,107,107,0.25)}`}</style>

        {/* Nav */}
        <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(13,17,23,0.8)",backdropFilter:"blur(20px) saturate(180%)",borderBottom:"1px solid "+DT.panelBorder}}>
          <div style={{maxWidth:1200,margin:"0 auto",padding:"0 40px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",alignItems:"center"}}>
            <button onClick={onHome} style={{background:"transparent",border:"none",color:"#4a5168",cursor:"pointer",fontSize:12,marginRight:12}}>← Home</button>
            <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={onHome}>
              <div style={{width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,"+DT.coral+",#E85D3A)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:800}}>📡</div>
              <span style={{fontFamily:"'Space Grotesk'",fontSize:18,fontWeight:700}}>Radar<span style={{color:DT.coral}}>View</span></span>
              <span style={{fontFamily:"'JetBrains Mono'",fontSize:10,color:DT.textDim,marginLeft:4}}>by Slotted Media</span>
            </div>
            </div>
            <button onClick={function(){setPhase("setup");}} style={{fontFamily:"'Space Grotesk'",fontSize:13,fontWeight:700,color:"#fff",background:DT.coral,padding:"8px 22px",borderRadius:8,border:"none",cursor:"pointer"}}>Design Your Twin</button>
          </div>
        </nav>

        {/* Hero */}
        <section style={{padding:"160px 40px 80px",position:"relative",overflow:"hidden"}}>
          {/* Scan line effect */}
          <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden"}}>
            <div style={{width:"100%",height:1,background:"linear-gradient(90deg,transparent,"+DT.coral+"40,transparent)",animation:"dtScan 4s linear infinite"}}/>
          </div>
          <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,107,107,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,107,0.03) 1px, transparent 1px)",backgroundSize:"60px 60px"}}/>
          <div style={{position:"absolute",top:-100,right:-100,width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,107,107,0.05) 0%,transparent 70%)"}}/>

          <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",gap:80,position:"relative"}}>
            <div style={{flex:1,maxWidth:540}}>
              <div style={{animation:"dtReveal 0.8s ease-out both"}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 16px",borderRadius:100,background:DT.coral+"12",border:"1px solid "+DT.coral+"25",marginBottom:28}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:DT.coral,animation:"dtPulse 2s ease-in-out infinite"}}/>
                  <span style={{fontFamily:"'JetBrains Mono'",fontSize:11,color:DT.coral,fontWeight:500,letterSpacing:0.8}}>WAREHOUSE DIGITAL TWIN</span>
                </div>
              </div>
              <h1 style={{fontFamily:"'Instrument Serif',serif",fontSize:"clamp(44px,6vw,70px)",fontWeight:400,lineHeight:1.08,letterSpacing:"-0.02em",margin:"0 0 24px",animation:"dtReveal 0.8s ease-out 0.1s both"}}>
                See your warehouse<br/><span style={{fontStyle:"italic",color:DT.coral}}>from above.</span>
              </h1>
              <p style={{fontFamily:"'Space Grotesk'",fontSize:"clamp(16px,2vw,19px)",color:DT.textMid,lineHeight:1.7,margin:"0 0 36px",maxWidth:460,animation:"dtReveal 0.8s ease-out 0.2s both"}}>
                RadarView renders your entire warehouse as an interactive heat map — every aisle, every bay, every rack type. Design your layout, then watch the data come alive.
              </p>
              <div style={{display:"flex",gap:12,animation:"dtReveal 0.8s ease-out 0.3s both"}}>
                <button onClick={function(){setPhase("setup");}} style={{fontFamily:"'Space Grotesk'",fontSize:16,fontWeight:700,color:"#fff",background:DT.coral,padding:"14px 32px",borderRadius:10,border:"none",cursor:"pointer",boxShadow:"0 4px 24px rgba(255,107,107,0.2)"}}>Design Your Twin →</button>
              </div>
            </div>
            {/* Radar viz preview */}
            <div style={{flex:1,display:"flex",justifyContent:"center",animation:"dtReveal 1s ease-out 0.4s both"}}>
              <div style={{background:DT.panel,border:"1px solid "+DT.panelBorder,borderRadius:20,padding:28,width:360}}>
                <div style={{fontFamily:"'JetBrains Mono'",fontSize:9,color:DT.textDim,letterSpacing:1,marginBottom:12}}>RADAR PREVIEW · A11-A24</div>
                <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:16}}>
                  {Array.from({length:14}).map(function(_,i){
                    return <div key={i} style={{display:"flex",flexDirection:"column",gap:2,alignItems:"center"}}>
                      <div style={{fontFamily:"'JetBrains Mono'",fontSize:7,color:DT.textDim,marginBottom:2}}>A{11+i}</div>
                      <div style={{display:"flex",gap:1}}>
                        {[0,1].map(function(s2){return <div key={s2} style={{display:"flex",flexDirection:"column",gap:1}}>
                          {Array.from({length:8}).map(function(_2,j){
                            var heat = Math.random();
                            var col = heat < 0.15 ? DT.gray : heat < 0.3 ? "#1A4D2E" : heat < 0.5 ? "#2D8B45" : heat < 0.65 ? "#3FB950" : heat < 0.75 ? "#85C941" : heat < 0.85 ? "#D29922" : heat < 0.93 ? "#E8871E" : "#FF4444";
                            return <div key={j} style={{width:5,height:3,borderRadius:0.5,background:col}}/>;
                          })}
                        </div>;})}
                      </div>
                    </div>;
                  })}
                </div>
                {/* Mini legend */}
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{height:6,flex:1,borderRadius:3,background:"linear-gradient(90deg,#1A4D2E,#2D8B45,#3FB950,#85C941,#D29922,#E8871E,#FF4444)",marginRight:8}}/>
                  <div style={{display:"flex",gap:8,fontFamily:"'JetBrains Mono'",fontSize:8,color:DT.textDim}}>
                    <span>Low</span><span>High</span>
                  </div>
                </div>
                <div style={{display:"flex",gap:8,marginTop:12,justifyContent:"center"}}>
                  {RACK_TYPES.filter(function(t2){return t2.name!=="Empty/Unslotted";}).map(function(t2){
                    return <div key={t2.name} style={{display:"flex",alignItems:"center",gap:3}}>
                      <div style={{width:6,height:6,borderRadius:"50%",background:t2.color}}/>
                      <span style={{fontFamily:"'JetBrains Mono'",fontSize:7,color:DT.textDim}}>{t2.name.split(" ")[0]}</span>
                    </div>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section style={{padding:"60px 40px 80px"}}>
          <div style={{maxWidth:1100,margin:"0 auto"}}>
            <Reveal><div style={{textAlign:"center",marginBottom:48}}>
              <span style={{fontFamily:"'JetBrains Mono'",fontSize:11,color:DT.coral,letterSpacing:2,textTransform:"uppercase"}}>CAPABILITIES</span>
              <h2 style={{fontFamily:"'Instrument Serif',serif",fontSize:"clamp(28px,4vw,44px)",fontWeight:400,margin:"12px 0"}}>Your warehouse, <span style={{fontStyle:"italic",color:DT.coral}}>digitized.</span></h2>
            </div></Reveal>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
              {[
                {icon:"🔥",title:"Bay-Level Heat Mapping",desc:"Every bay colored by lines shipped intensity — from cold green to hot red. Instantly spot your busiest and emptiest areas.",color:DT.coral},
                {icon:"🏗️",title:"Rack Type Visualization",desc:"Toggle to color bays by rack type — Pushback, Case flow, Handstack, VNA 24\", VNA 11\". See your rack mix at a glance.",color:DT.cyan},
                {icon:"📊",title:"Aisle Performance Bars",desc:"Sidebar shows total lines shipped per aisle as horizontal bar charts. Identify your highest and lowest performing aisles.",color:DT.green},
                {icon:"🔍",title:"Search & Filter",desc:"Search by SKU, filter by rack type. Non-matching bays dim out so you can focus on exactly what you need.",color:DT.amber},
                {icon:"📐",title:"6-Step Design Wizard",desc:"Configure every detail: aisle naming, bay counts, rack types, level priorities, slotting rules, and travel distance settings.",color:"#a78bfa"},
                {icon:"🖱️",title:"Interactive Navigation",desc:"Click-drag to pan, scroll to zoom, hover for tooltips, click bays for detail. Minimap shows your position in the full layout.",color:DT.coral},
              ].map(function(f2,i){return <Reveal key={f2.title} delay={i*0.08}><div style={{background:DT.panel,border:"1px solid "+DT.panelBorder,borderRadius:16,padding:"28px 22px",transition:"all 0.4s",cursor:"default"}}
                onMouseEnter={function(e){e.currentTarget.style.borderColor=f2.color+"40";e.currentTarget.style.transform="translateY(-4px)";}}
                onMouseLeave={function(e){e.currentTarget.style.borderColor=DT.panelBorder;e.currentTarget.style.transform="none";}}>
                <div style={{fontSize:28,marginBottom:14}}>{f2.icon}</div>
                <h3 style={{fontFamily:"'Space Grotesk'",fontSize:16,fontWeight:700,color:f2.color,margin:"0 0 8px"}}>{f2.title}</h3>
                <p style={{fontFamily:"'Space Grotesk'",fontSize:13,color:DT.textMid,lineHeight:1.6,margin:0}}>{f2.desc}</p>
              </div></Reveal>;})}
            </div>
          </div>
        </section>

        {/* Setup wizard preview */}
        <section style={{padding:"60px 40px",background:DT.panel,borderTop:"1px solid "+DT.panelBorder,borderBottom:"1px solid "+DT.panelBorder}}>
          <div style={{maxWidth:900,margin:"0 auto"}}>
            <Reveal><div style={{textAlign:"center",marginBottom:48}}>
              <span style={{fontFamily:"'JetBrains Mono'",fontSize:11,color:DT.coral,letterSpacing:2,textTransform:"uppercase"}}>SETUP PROCESS</span>
              <h2 style={{fontFamily:"'Instrument Serif',serif",fontSize:"clamp(26px,3.5vw,38px)",fontWeight:400,margin:"12px 0"}}>Design your twin in <span style={{fontStyle:"italic",color:DT.coral}}>six steps.</span></h2>
            </div></Reveal>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
              {[
                {n:"01",title:"Identity",desc:"Name your warehouse, set dimensions, configure location numbering format and XY coordinates."},
                {n:"02",title:"Layout",desc:"Set aisle prefix, starting number, total aisles, bays per side, section zones, and dock doors."},
                {n:"03",title:"Rack Types",desc:"Toggle which rack types you use. Set level priority order per type with phased slotting support."},
                {n:"04",title:"Slotting Rules",desc:"Configure SKU sort order and location sort method per rack type. Separate or combined matching."},
                {n:"05",title:"Travel & Output",desc:"Set base XY coordinates, distance method, heat metric, and scenario count."},
                {n:"06",title:"Generate",desc:"Review your full configuration summary, then generate the radar view with one click."},
              ].map(function(st2,i){return <Reveal key={st2.n} delay={i*0.06}><div style={{background:DT.bg,border:"1px solid "+DT.panelBorder,borderRadius:14,padding:"22px 18px"}}>
                <div style={{fontFamily:"'JetBrains Mono'",fontSize:22,fontWeight:700,color:DT.coral,marginBottom:10}}>{st2.n}</div>
                <h3 style={{fontFamily:"'Space Grotesk'",fontSize:15,fontWeight:700,margin:"0 0 6px"}}>{st2.title}</h3>
                <p style={{fontFamily:"'Space Grotesk'",fontSize:12,color:DT.textMid,lineHeight:1.6,margin:0}}>{st2.desc}</p>
              </div></Reveal>;})}
            </div>
          </div>
        </section>

        {/* Sidebar preview */}
        <section style={{padding:"60px 40px 80px"}}>
          <div style={{maxWidth:1000,margin:"0 auto"}}>
            <Reveal><div style={{textAlign:"center",marginBottom:48}}>
              <span style={{fontFamily:"'JetBrains Mono'",fontSize:11,color:DT.coral,letterSpacing:2,textTransform:"uppercase"}}>SIDEBAR ANALYTICS</span>
              <h2 style={{fontFamily:"'Instrument Serif',serif",fontSize:"clamp(26px,3.5vw,38px)",fontWeight:400,margin:"12px 0"}}>Three tabs of <span style={{fontStyle:"italic",color:DT.coral}}>warehouse intelligence.</span></h2>
            </div></Reveal>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
              {[
                {title:"Legend",desc:"Heat scale gradient, rack type breakdown with bay counts, and lines-by-aisle horizontal bar charts.",icon:"🔥",color:DT.coral},
                {title:"Analytics",desc:"Avg lines per bay, utilization %, empty bay count, peak bay value, zone distribution with progress bars.",icon:"📈",color:DT.cyan},
                {title:"Alerts",desc:"Empty bay count, overloaded bays (>90% peak), and underperforming bays (<100 lines) with severity badges.",icon:"⚠️",color:DT.amber},
              ].map(function(t2,i){return <Reveal key={t2.title} delay={i*0.1}><div style={{background:DT.panel,border:"1px solid "+DT.panelBorder,borderRadius:16,padding:"28px 22px",borderTop:"3px solid "+t2.color}}>
                <div style={{fontSize:28,marginBottom:12}}>{t2.icon}</div>
                <h3 style={{fontFamily:"'Space Grotesk'",fontSize:17,fontWeight:700,color:t2.color,margin:"0 0 8px"}}>{t2.title}</h3>
                <p style={{fontFamily:"'Space Grotesk'",fontSize:13,color:DT.textMid,lineHeight:1.6,margin:0}}>{t2.desc}</p>
              </div></Reveal>;})}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{padding:"60px 40px 80px",textAlign:"center"}}>
          <Reveal>
            <h2 style={{fontFamily:"'Instrument Serif',serif",fontSize:"clamp(30px,5vw,48px)",fontWeight:400,margin:"0 0 16px"}}>Ready to see your warehouse <span style={{fontStyle:"italic",color:DT.coral}}>from a new angle</span>?</h2>
            <p style={{fontFamily:"'Space Grotesk'",fontSize:17,color:DT.textMid,margin:"0 0 32px"}}>Configure your layout, generate the radar view, and start making data-driven decisions.</p>
            <button onClick={function(){setPhase("setup");}} style={{fontFamily:"'Space Grotesk'",fontSize:16,fontWeight:700,color:"#fff",background:DT.coral,padding:"16px 40px",borderRadius:12,border:"none",cursor:"pointer",boxShadow:"0 4px 24px rgba(255,107,107,0.2)"}}>Design Your Digital Twin →</button>
            <div style={{display:"flex",justifyContent:"center",gap:24,marginTop:20}}>
              {["6-step setup wizard","Interactive radar view","No data required to start"].map(function(t3){return <div key={t3} style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:5,height:5,borderRadius:"50%",background:DT.coral}}/><span style={{fontFamily:"'JetBrains Mono'",fontSize:11,color:DT.textDim,letterSpacing:0.3}}>{t3}</span></div>;})}
            </div>
          </Reveal>
        </section>

        <footer style={{padding:"24px 40px",borderTop:"1px solid "+DT.panelBorder}}>
          <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}} onClick={onHome}>
              <span style={{fontFamily:"'Space Grotesk'",fontSize:14,fontWeight:700}}>Radar<span style={{color:DT.coral}}>View</span></span>
              <span style={{fontFamily:"'JetBrains Mono'",fontSize:10,color:DT.textDim}}>by Slotted Media</span>
            </div>
            <span style={{fontFamily:"'JetBrains Mono'",fontSize:11,color:DT.textDim}}>© 2026 Slotted Media</span>
          </div>
        </footer>
      </div>
    );
  }

  if (phase === "setup") {
    return (
      <div style={{ minHeight:"100vh", background:DT.bg, fontFamily:F.bd, color:DT.text }}>
        <link href={FONTS} rel="stylesheet" />
        <style>{`input[type=range]{accent-color:${DT.coral}} select{appearance:none;}`}</style>
        <header style={{ background:DT.panel, borderBottom:"1px solid "+DT.panelBorder, padding:"14px 28px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <button onClick={function(){setPhase("landing");}} style={{ background:"transparent", border:"none", color:DT.textDim, cursor:"pointer", fontSize:12 }}>← Back to RadarView</button>
              <span style={{ fontSize:16 }}>📡</span>
              <div><h1 style={{ fontFamily:F.hd, fontSize:17, fontWeight:800, margin:0 }}>Design Your Digital Twin</h1><p style={{ fontFamily:F.mn, fontSize:10, color:DT.textDim, margin:0 }}>INTERACTIVE SETUP QUESTIONNAIRE</p></div>
            </div>
            <div style={{ fontFamily:F.mn, fontSize:10, color:DT.textDim }}>Step {setupStep + 1} of {SETUP_TABS.length}</div>
          </div>
        </header>
        {/* Step tabs */}
        <div style={{ background:DT.panel, borderBottom:"1px solid "+DT.panelBorder, padding:"0 28px", display:"flex", gap:0 }}>
          {SETUP_TABS.map(function(tab, i) {
            var active = setupStep === i;
            var done = i < setupStep;
            return (
              <button key={i} onClick={function() { setSetupStep(i); }} style={{
                padding:"12px 16px", border:"none", cursor:"pointer", fontFamily:F.mn, fontSize:10, fontWeight:600, letterSpacing:0.3,
                background:"transparent", color: active ? DT.coral : done ? DT.green : DT.textDim,
                borderBottom: active ? "2px solid "+DT.coral : "2px solid transparent",
              }}>{done ? "✓ " : ""}{tab}</button>
            );
          })}
        </div>

        <div style={{ maxWidth:800, margin:"0 auto", padding:"28px 28px" }}>
          {/* ── Step 0: Identity ── */}
          {setupStep === 0 && (<div>
            <SetupPanel title="WAREHOUSE IDENTITY">
              <InputField label="Warehouse / Facility Name" value={cfg.warehouseName} onChange={function(v){setField("warehouseName",v);}} placeholder="e.g., Main Distribution Center" />
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                {[{k:"widthFt",l:"Width (ft)",min:40,max:400},{k:"depthFt",l:"Depth (ft)",min:30,max:300}].map(function(s14){return <div key={s14.k}><label style={{fontSize:12,color:DT.textMid,display:"block",marginBottom:6}}>{s14.l}</label><div style={{display:"flex",alignItems:"center",gap:10}}><input type="range" min={s14.min} max={s14.max} value={cfg[s14.k]} onChange={function(e){setField(s14.k,+e.target.value);}} style={{flex:1}}/><span style={{fontFamily:F.mn,fontSize:16,fontWeight:700,color:DT.coral,minWidth:50,textAlign:"right"}}>{cfg[s14.k]}'</span></div></div>;})}
              </div>
              <div style={{ fontFamily:F.mn, fontSize:11, color:DT.textDim, marginTop:8 }}>Total area: {(cfg.widthFt * cfg.depthFt).toLocaleString()} sq ft</div>
            </SetupPanel>
            <SetupPanel title="LOCATION NUMBERING">
              <InputField label="Location numbering format" note="e.g., A22-041-B where A22=Aisle, 041=Bay, B=Level" value={extra.locFormat} onChange={function(v){setEx("locFormat",v);}} placeholder="e.g., A22-041-B" mono />
              <InputField label="How do you identify Pick vs. Reserve locations?" value={extra.pickIdentifier} onChange={function(v){setEx("pickIdentifier",v);}} placeholder="e.g., column G = Pick" />
              <InputField label="List all level designations used" note="Comma-separated, e.g., A,B,C,D,E,F,G,H,J" value={extra.levels} onChange={function(v){setEx("levels",v);}} mono />
            </SetupPanel>
            <SetupPanel title="XY COORDINATES">
              <InputField label="Do you have XY coordinates for each pick location?" type="toggle" value={extra.hasXY} onChange={function(v){setEx("hasXY",v);}} />
              <InputField label="What unit are XY coordinates in?" type="select" value={extra.xyUnit} onChange={function(v){setEx("xyUnit",v);}} options={["feet","inches","meters","grid units"]} />
            </SetupPanel>
          </div>)}

          {/* ── Step 1: Layout ── */}
          {setupStep === 1 && (<div>
            <SetupPanel title="AISLE CONFIGURATION">
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:14 }}>
                <div><label style={{fontSize:12,color:DT.textMid,display:"block",marginBottom:6}}>Prefix</label><input value={cfg.aislePrefix} onChange={function(e){setField("aislePrefix",e.target.value);}} style={{width:"100%",padding:"8px 10px",background:DT.bg,border:"1px solid "+DT.panelBorder,borderRadius:6,color:DT.text,fontFamily:F.mn,fontSize:14,outline:"none",boxSizing:"border-box"}}/></div>
                <div><label style={{fontSize:12,color:DT.textMid,display:"block",marginBottom:6}}>Start #</label><div style={{display:"flex",alignItems:"center",gap:6}}><input type="range" min={1} max={30} value={cfg.startAisle} onChange={function(e){setField("startAisle",+e.target.value);}} style={{flex:1}}/><span style={{fontFamily:F.mn,fontSize:14,fontWeight:700,color:DT.coral}}>{cfg.startAisle}</span></div></div>
                <div><label style={{fontSize:12,color:DT.textMid,display:"block",marginBottom:6}}>Total Aisles</label><div style={{display:"flex",alignItems:"center",gap:6}}><input type="range" min={2} max={24} value={cfg.numAisles} onChange={function(e){setField("numAisles",+e.target.value);}} style={{flex:1}}/><span style={{fontFamily:F.mn,fontSize:14,fontWeight:700,color:DT.coral}}>{cfg.numAisles}</span></div></div>
                <div><label style={{fontSize:12,color:DT.textMid,display:"block",marginBottom:6}}>Bays / Side</label><div style={{display:"flex",alignItems:"center",gap:6}}><input type="range" min={5} max={40} value={cfg.baysPerSide} onChange={function(e){setField("baysPerSide",+e.target.value);}} style={{flex:1}}/><span style={{fontFamily:F.mn,fontSize:14,fontWeight:700,color:DT.coral}}>{cfg.baysPerSide}</span></div></div>
              </div>
              <div style={{ fontFamily:F.mn, fontSize:11, color:DT.textDim, marginTop:8 }}>
                Range: {cfg.aislePrefix}{cfg.startAisle} – {cfg.aislePrefix}{cfg.startAisle + cfg.numAisles - 1} · ~{cfg.numAisles * cfg.baysPerSide * 2} total bays
              </div>
            </SetupPanel>
            <SetupPanel title="SECTIONS / ZONES">
              <InputField label="Do your locations have section or zone numbers?" type="toggle" value={extra.hasSections} onChange={function(v){setEx("hasSections",v);}} />
              {extra.hasSections === "yes" && <InputField label="How should sections be prioritized?" note="e.g., by proximity to dock (lowest travel distance first)" value={extra.sectionPriority} onChange={function(v){setEx("sectionPriority",v);}} />}
            </SetupPanel>
            <SetupPanel title="DOCK CONFIGURATION">
              <div><label style={{fontSize:12,color:DT.textMid,display:"block",marginBottom:6}}>Number of Dock Doors</label><div style={{display:"flex",alignItems:"center",gap:10}}><input type="range" min={1} max={8} value={cfg.dockDoors} onChange={function(e){setField("dockDoors",+e.target.value);}} style={{width:200}}/><span style={{fontFamily:F.mn,fontSize:16,fontWeight:700,color:DT.coral}}>{cfg.dockDoors}</span></div></div>
            </SetupPanel>
          </div>)}

          {/* ── Step 2: Rack Types ── */}
          {setupStep === 2 && (<div>
            <SetupPanel title="RACK TYPES IN USE (toggle on/off)">
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(140px, 1fr))", gap:8, marginBottom:16 }}>
                {RACK_TYPES.filter(function(t){return t.name!=="Empty/Unslotted";}).map(function(t) {
                  var enabled = cfg.enabledTypes[t.name];
                  return (
                    <div key={t.name} onClick={function(){toggleType(t.name);}} style={{ padding:"14px", borderRadius:10, cursor:"pointer", border:"1.5px solid "+(enabled ? t.color+"60" : DT.panelBorder), background:enabled ? t.color+"12" : "transparent" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                        <div style={{ width:12, height:12, borderRadius:"50%", background:enabled ? t.color : DT.textDim }} />
                        <span style={{ fontSize:13, fontWeight:600, color:enabled ? t.color : DT.textDim }}>{t.name}</span>
                      </div>
                      <div style={{ fontFamily:F.mn, fontSize:10, color:DT.textDim }}>{enabled ? "✓ Enabled" : "Disabled"}</div>
                    </div>
                  );
                })}
              </div>
            </SetupPanel>
            <SetupPanel title="LEVEL PRIORITY ORDER (per rack type)">
              <InputField label="Case Flow level priority" note="Order in which levels are filled, e.g., B,C,A" value={extra.levelPriorityCF} onChange={function(v){setEx("levelPriorityCF",v);}} mono />
              <InputField label="Handstack level priority" note="Levels filled in phases. Phase 1 first, then Phase 2." value={extra.levelPriorityHS} onChange={function(v){setEx("levelPriorityHS",v);}} mono />
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <InputField label="Handstack Phase 1 levels" value={extra.hsPhase1} onChange={function(v){setEx("hsPhase1",v);}} mono />
                <InputField label="Handstack Phase 2 levels" value={extra.hsPhase2} onChange={function(v){setEx("hsPhase2",v);}} mono />
              </div>
              <InputField label="VNA level priority" note="Applied to both wide and narrow bay VNA" value={extra.levelPriorityVNA} onChange={function(v){setEx("levelPriorityVNA",v);}} mono />
            </SetupPanel>
            <SetupPanel title="RACK ASSIGNMENT RULES">
              <InputField label="How do you determine which rack type a SKU goes into?" note="e.g., based on dimensions + quantity in pick location" value={cfg.rackRule || ""} onChange={function(v){setField("rackRule",v);}} />
              <InputField label="What criteria split wide-bay vs. narrow-bay VNA?" note="e.g., on-hand quantity > 2 = wide bay, ≤ 2 = narrow bay" value={extra.vnaSplit} onChange={function(v){setEx("vnaSplit",v);}} />
            </SetupPanel>
          </div>)}

          {/* ── Step 3: Slotting Rules ── */}
          {setupStep === 3 && (<div>
            <SetupPanel title="SKU SORTING (per rack type)">
              {[{k:"skuSortPB",l:"Pushback",n:"How to sort SKUs before matching to pushback locations"},{k:"skuSortCF",l:"Case Flow",n:""},{k:"skuSortHS",l:"Handstack",n:""},{k:"skuSortVNA",l:"VNA (both types)",n:"Typically sorted by on-hand quantity for slow movers"}].map(function(s14){
                return <InputField key={s14.k} label={s14.l + " — SKU sort order"} note={s14.n} type="select" value={extra[s14.k]} onChange={function(v){setEx(s14.k,v);}} options={["lines","Lines shipped (high to low)","On-hand qty (high to low)","Program first, then lines","Program first, then on-hand qty","onhand","Custom"]} />;
              })}
            </SetupPanel>
            <SetupPanel title="LOCATION SORTING">
              <InputField label="Primary location sort method" type="select" value={extra.locSortMethod} onChange={function(v){setEx("locSortMethod",v);}} options={["travel distance","section priority, then travel distance","Custom"]} note="How locations are ordered before matching with SKUs" />
            </SetupPanel>
            <SetupPanel title="MATCHING RULES">
              <InputField label="Run slotting separately per rack type or combined?" type="toggle" value={extra.slotSeparate} onChange={function(v){setEx("slotSeparate",v);}} />
              <div style={{ fontSize:11, color:DT.textDim, marginTop:-8, marginBottom:14 }}>{extra.slotSeparate === "yes" ? "Each rack type is independently sorted and matched, then results are combined." : "All SKUs and locations are pooled together for a single matching pass."}</div>
            </SetupPanel>
          </div>)}

          {/* ── Step 4: Travel & Output ── */}
          {setupStep === 4 && (<div>
            <SetupPanel title="BASE POINT (picker starting location)">
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                <InputField label="Base X coordinate" value={extra.baseX} onChange={function(v){setEx("baseX",v);}} mono />
                <InputField label="Base Y coordinate" value={extra.baseY} onChange={function(v){setEx("baseY",v);}} mono />
              </div>
              <InputField label="Travel distance calculation method" type="select" value={extra.distMethod} onChange={function(v){setEx("distMethod",v);}} options={["manhattan","euclidean","custom"]} note="Manhattan (|X1-X2| + |Y1-Y2|) is most common for grid-layout warehouses" />
            </SetupPanel>
            <SetupPanel title="RADAR VIEW PREFERENCES">
              <InputField label="Heat map metric" type="select" value={extra.heatMetric} onChange={function(v){setEx("heatMetric",v);}} options={["lines","Lines shipped per bay","On-hand quantity","Travel distance"]} />
              <InputField label="Show empty/unslotted bays?" type="toggle" value={extra.showEmpty} onChange={function(v){setEx("showEmpty",v);}} />
              <InputField label="Generate before/after travel comparison?" type="toggle" value={extra.wantComparison} onChange={function(v){setEx("wantComparison",v);}} />
            </SetupPanel>
            <SetupPanel title="SLOTTING SCENARIOS">
              <InputField label="How many scenarios to run?" type="select" value={extra.numScenarios} onChange={function(v){setEx("numScenarios",v);}} options={["1","2","3","4","5"]} />
              <InputField label="Describe each scenario's key difference" note="e.g., Scenario 1: sort by lines only. Scenario 2: sort by program first, then lines." value={extra.scenarioDesc} onChange={function(v){setEx("scenarioDesc",v);}} placeholder="Describe your scenarios..." />
            </SetupPanel>
          </div>)}

          {/* ── Step 5: Generate ── */}
          {setupStep === 5 && (<div>
            <div style={{ background:DT.coral+"0d", border:"1px solid "+DT.coral+"25", borderRadius:14, padding:"22px 24px", marginBottom:20 }}>
              <div style={{ fontFamily:F.hd, fontSize:14, fontWeight:700, color:DT.coral, marginBottom:12 }}>Configuration Summary</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px 24px", fontFamily:F.mn, fontSize:12 }}>
                {[
                  {l:"Facility", v:cfg.warehouseName},
                  {l:"Size", v:cfg.widthFt+"' × "+cfg.depthFt+"' ("+((cfg.widthFt*cfg.depthFt)/1000).toFixed(0)+"k sqft)"},
                  {l:"Aisles", v:cfg.numAisles+" ("+cfg.aislePrefix+cfg.startAisle+"–"+cfg.aislePrefix+(cfg.startAisle+cfg.numAisles-1)+")"},
                  {l:"Total Bays", v:"~"+(cfg.numAisles*cfg.baysPerSide*2)},
                  {l:"Dock Doors", v:cfg.dockDoors.toString()},
                  {l:"Rack Types", v:Object.keys(cfg.enabledTypes).filter(function(k){return cfg.enabledTypes[k];}).join(", ")},
                  {l:"Sections", v:extra.hasSections==="yes"?"Yes ("+extra.sectionPriority+")":"No"},
                  {l:"XY Coords", v:extra.hasXY==="yes"?"Yes ("+extra.xyUnit+")":"No"},
                  {l:"Distance", v:extra.distMethod},
                  {l:"Heat Metric", v:extra.heatMetric},
                  {l:"Scenarios", v:extra.numScenarios},
                  {l:"Slot Method", v:extra.slotSeparate==="yes"?"Separate per rack type":"Combined"},
                ].map(function(r, i) {
                  return React.createElement("div", { key: i, style: { display:"flex", justifyContent:"space-between", padding:"4px 0", borderBottom:"1px solid "+DT.coral+"15" } },
                    React.createElement("span", { style: { color: DT.textDim } }, r.l),
                    React.createElement("span", { style: { color: DT.text, fontWeight: 600, textAlign:"right" } }, r.v)
                  );
                })}
              </div>
            </div>
            <button onClick={handleGenerate} style={{
              width:"100%", padding:"16px", borderRadius:12, border:"none", cursor:"pointer",
              background:"linear-gradient(135deg,"+DT.coral+",#E85D3A)", color:"#fff",
              fontFamily:F.hd, fontSize:16, fontWeight:700,
              boxShadow:"0 4px 24px rgba(255,107,107,0.25)", transition:"all 0.3s",
            }}
              onMouseEnter={function(e){e.target.style.transform="translateY(-2px)";}}
              onMouseLeave={function(e){e.target.style.transform="none";}}
            >Generate Radar View →</button>
          </div>)}

          {/* Nav buttons */}
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:24 }}>
            {setupStep > 0 ? (
              <button onClick={function(){setSetupStep(function(s14){return s14-1;});}} style={{ padding:"10px 24px", borderRadius:8, border:"1px solid "+DT.panelBorder, background:"transparent", color:DT.textMid, cursor:"pointer", fontSize:13, fontWeight:600 }}>← Back</button>
            ) : <div />}
            {setupStep < SETUP_TABS.length - 1 && (
              <button onClick={function(){setSetupStep(function(s14){return s14+1;});}} style={{ padding:"10px 28px", borderRadius:8, border:"none", background:DT.coral, color:"#fff", cursor:"pointer", fontSize:13, fontWeight:700 }}>Continue →</button>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ── RADAR VIEW ─── */
  var showing = filteredIds.size;
  var bayW=10, bayH=6, bayGap=1, aisleGap=28, sideGap=4;

  function onMouseDown(e){dragRef.current={dragging:true,startX:e.clientX,startY:e.clientY,startOX:viewOffset.x,startOY:viewOffset.y};}
  function onMouseMove(e){if(dragRef.current.dragging)setViewOffset({x:dragRef.current.startOX+(e.clientX-dragRef.current.startX),y:dragRef.current.startOY+(e.clientY-dragRef.current.startY)});}
  function onMouseUp(){dragRef.current.dragging=false;}

  return (
    <div style={{ minHeight:"100vh", background:DT.bg, fontFamily:F.bd, color:DT.text, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <link href={FONTS} rel="stylesheet" />
      {/* Header */}
      <header style={{ background:DT.panel, borderBottom:"1px solid "+DT.panelBorder, padding:"10px 18px", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:6 }}>
          <div>
            <div style={{ fontFamily:F.mn, fontSize:9, color:DT.textDim }}>{cfg.warehouseName} — Digital Twin</div>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}><span style={{fontSize:13}}>📡</span><h1 style={{fontFamily:F.hd,fontSize:15,fontWeight:800,margin:0}}>RADAR VIEW</h1></div>
          </div>
          <div style={{ display:"flex", gap:6, alignItems:"center" }}>
            {[{l:Object.values(stats.typeCounts).filter(function(c){return c>0;}).length+" TYPES",c:DT.cyan},{l:stats.active+" BAYS",c:DT.green},{l:stats.locations+" LOCS",c:DT.green}].map(function(b,i){return <span key={i} style={{fontFamily:F.mn,fontSize:9,fontWeight:600,padding:"3px 10px",borderRadius:980,border:"1px solid "+b.c+"40",color:b.c}}>{b.l}</span>;})}
            <button onClick={function(){setPhase("setup");}} style={{fontFamily:F.mn,fontSize:9,fontWeight:700,padding:"3px 12px",borderRadius:980,border:"1px solid "+DT.cyan+"40",background:DT.cyan+"12",color:DT.cyan,cursor:"pointer"}}>⚙ EDIT</button>
            <button onClick={handleReset} style={{fontFamily:F.mn,fontSize:9,fontWeight:700,padding:"3px 12px",borderRadius:980,border:"1px solid "+DT.coral+"40",background:DT.coral+"12",color:DT.coral,cursor:"pointer"}}>↺ RESET</button>
            <button onClick={onHome} style={{fontFamily:F.mn,fontSize:9,fontWeight:700,padding:"3px 12px",borderRadius:980,border:"1px solid "+DT.panelBorder,background:"transparent",color:DT.textDim,cursor:"pointer"}}>← HOME</button>
          </div>
        </div>
      </header>
      {/* Stats bar */}
      <div style={{ background:DT.bg, padding:"8px 18px", borderBottom:"1px solid "+DT.panelBorder, display:"flex", alignItems:"baseline", gap:24, flexWrap:"wrap" }}>
        {[{v:stats.totalLines.toLocaleString(),l:"TOTAL LINES",c:DT.coral},{v:stats.locations.toString(),l:"LOCATIONS",c:DT.coral},{v:stats.active.toString(),l:"ACTIVE",c:DT.coral},{v:showing.toString(),l:"SHOWING",c:DT.text}].map(function(s14,i){return <div key={i} style={{display:"flex",alignItems:"baseline",gap:5}}><span style={{fontFamily:F.hd,fontSize:20,fontWeight:800,color:s14.c}}>{s14.v}</span><span style={{fontFamily:F.mn,fontSize:9,color:DT.textDim,letterSpacing:0.5}}>{s14.l}</span></div>;})}
      </div>
      {/* Toolbar */}
      <div style={{ background:DT.panel, padding:"7px 18px", borderBottom:"1px solid "+DT.panelBorder, display:"flex", alignItems:"center", gap:10, flexWrap:"wrap", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:5, background:DT.bg, borderRadius:6, padding:"0 8px", border:"1px solid "+DT.panelBorder }}>
          <span style={{color:DT.textDim,fontSize:12}}>🔍</span>
          <input value={searchTerm} onChange={function(e){setSearchTerm(e.target.value);}} placeholder="Search SKU..." style={{background:"transparent",border:"none",color:DT.text,fontFamily:F.bd,fontSize:12,padding:"6px 0",width:120,outline:"none"}}/>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:5 }}>
          <span style={{fontFamily:F.mn,fontSize:10,color:DT.textDim,fontWeight:600}}>COLOR</span>
          <select value={colorBy} onChange={function(e){setColorBy(e.target.value);}} style={{background:DT.bg,border:"1px solid "+DT.panelBorder,borderRadius:6,color:DT.text,fontFamily:F.bd,fontSize:11,padding:"5px 8px",outline:"none"}}>
            <option value="lines">Lines Shipped</option><option value="type">Rack Type</option>
          </select>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:5 }}>
          <span style={{fontFamily:F.mn,fontSize:10,color:DT.textDim,fontWeight:600}}>RACK</span>
          <select value={rackFilter} onChange={function(e){setRackFilter(e.target.value);}} style={{background:DT.bg,border:"1px solid "+DT.panelBorder,borderRadius:6,color:DT.text,fontFamily:F.bd,fontSize:11,padding:"5px 8px",outline:"none"}}>
            <option>All Types</option>{RACK_TYPES.map(function(t){return <option key={t.name}>{t.name}</option>;})}
          </select>
        </div>
      </div>

      {/* Main area */}
      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>
        {/* Canvas */}
        <div style={{ flex:1, overflow:"hidden", position:"relative", cursor:"grab" }}
          onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
          onWheel={function(e){setZoom(function(z){return Math.max(0.3,Math.min(2.5,z-e.deltaY*0.001));});}}
        >
          <div style={{ transform:"translate("+viewOffset.x+"px,"+viewOffset.y+"px) scale("+zoom+")", transformOrigin:"center top", padding:"20px 30px", display:"flex", gap:aisleGap, minWidth:"max-content" }}>
            {aisleNames.map(function(aisle){
              var ab = bays.filter(function(b){return b.aisle===aisle;});
              var left = ab.filter(function(b){return b.side==="L";}).sort(function(a2,b2){return a2.position-b2.position;});
              var right = ab.filter(function(b){return b.side==="R";}).sort(function(a2,b2){return a2.position-b2.position;});
              return (
                <div key={aisle} style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                  <div style={{fontFamily:F.mn,fontSize:9,color:DT.textDim,fontWeight:600,marginBottom:5,letterSpacing:0.5}}>{aisle}</div>
                  <div style={{display:"flex",gap:sideGap}}>
                    {[left, right].map(function(side, si) {
                      return (
                        <div key={si} style={{display:"flex",flexDirection:"column",gap:bayGap}}>
                          {side.map(function(bay) {
                            var isFilt = filteredIds.has(bay.id);
                            var isHov = hoveredBay && hoveredBay.id === bay.id;
                            var isSel = selectedBay && selectedBay.id === bay.id;
                            var ratio = stats.maxLines > 0 ? bay.lines / stats.maxLines : 0;
                            var bgColor = !isFilt ? "rgba(30,35,45,0.4)" : colorBy === "type" ? bay.type.color + (bay.lines > 0 ? "CC" : "30") : getHeatColor(ratio);
                            return (
                              <div key={bay.id}
                                onMouseEnter={function(e){setHoveredBay(bay);setTooltipPos({x:e.clientX,y:e.clientY});}}
                                onMouseLeave={function(){setHoveredBay(null);}}
                                onClick={function(e){e.stopPropagation();setSelectedBay(bay);}}
                                style={{ width:bayW, height:bayH, borderRadius:1.5, background:bgColor, border:isSel?"1.5px solid #fff":isHov?"1px solid rgba(255,255,255,0.5)":"none", opacity:isFilt?1:0.25, cursor:"pointer", transition:"opacity 0.15s", boxShadow:isSel?"0 0 8px rgba(255,255,255,0.3)":"none" }}
                              />
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          {/* Tooltip */}
          {hoveredBay && (
            <div style={{ position:"fixed", left:tooltipPos.x+14, top:tooltipPos.y-10, background:DT.panel, border:"1px solid "+DT.panelBorder, borderRadius:8, padding:"9px 12px", zIndex:100, pointerEvents:"none", boxShadow:"0 8px 24px rgba(0,0,0,0.5)", minWidth:150 }}>
              <div style={{ fontFamily:F.hd, fontSize:11, fontWeight:700, marginBottom:5 }}>{hoveredBay.id}</div>
              <div style={{ display:"grid", gridTemplateColumns:"auto 1fr", gap:"2px 10px", fontSize:10 }}>
                <span style={{color:DT.textDim}}>Lines:</span><span style={{color:DT.coral,fontWeight:700,fontFamily:F.mn}}>{hoveredBay.lines.toLocaleString()}</span>
                <span style={{color:DT.textDim}}>Type:</span><span style={{color:hoveredBay.type.color,fontWeight:600}}>{hoveredBay.type.name}</span>
                <span style={{color:DT.textDim}}>SKU:</span><span style={{fontFamily:F.mn,color:DT.textMid}}>{hoveredBay.sku||"Empty"}</span>
              </div>
            </div>
          )}
          {/* Minimap */}
          <div style={{ position:"absolute", bottom:12, left:"50%", transform:"translateX(-50%)", background:DT.panel, border:"1px solid "+DT.panelBorder, borderRadius:6, padding:6, boxShadow:"0 4px 16px rgba(0,0,0,0.4)" }}>
            <div style={{ display:"flex", gap:2 }}>
              {aisleNames.map(function(aisle2){var ab2=bays.filter(function(b){return b.aisle===aisle2;});var mx=ab2.length>0?Math.max.apply(null,ab2.map(function(b){return b.lines;})):0;var r2=stats.maxLines>0?mx/stats.maxLines:0;return <div key={aisle2} style={{display:"flex",gap:1}}><div style={{width:2,height:14,borderRadius:1,background:getHeatColor(r2*0.5)}}/><div style={{width:2,height:14,borderRadius:1,background:getHeatColor(r2)}}/></div>;})}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ width:260, background:DT.panel, borderLeft:"1px solid "+DT.panelBorder, display:"flex", flexDirection:"column", flexShrink:0 }}>
          <div style={{ display:"flex", borderBottom:"1px solid "+DT.panelBorder }}>
            {["legend","analytics","alerts"].map(function(t2){var active=sidebarTab===t2;return <button key={t2} onClick={function(){setSidebarTab(t2);}} style={{flex:1,padding:"9px 4px",border:"none",cursor:"pointer",fontFamily:F.mn,fontSize:8,fontWeight:600,letterSpacing:0.5,textTransform:"uppercase",background:"transparent",color:active?DT.coral:DT.textDim,borderBottom:active?"2px solid "+DT.coral:"2px solid transparent"}}>{t2.toUpperCase()}</button>;})}
          </div>
          <div style={{ flex:1, overflow:"auto", padding:"14px 12px" }}>
            {sidebarTab === "legend" && (<div>
              <div style={{marginBottom:16}}>
                <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:6}}><span style={{fontSize:11}}>🔥</span><span style={{fontFamily:F.hd,fontSize:11,fontWeight:700,color:DT.coral}}>HEAT SCALE</span></div>
                <div style={{height:12,borderRadius:4,marginBottom:4,background:"linear-gradient(90deg,#1A4D2E,#2D8B45,#3FB950,#85C941,#D29922,#E8871E,#E85D3A,#FF4444)"}}/><div style={{display:"flex",justifyContent:"space-between",fontFamily:F.mn,fontSize:8,color:DT.textDim}}><span>0</span><span>Low</span><span>Med</span><span>High</span><span>Peak</span></div>
              </div>
              <div style={{marginBottom:16}}>
                <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:8}}><span style={{fontSize:11}}>🏗</span><span style={{fontFamily:F.hd,fontSize:11,fontWeight:700,color:DT.coral}}>RACK TYPES</span></div>
                {RACK_TYPES.map(function(t2){var c=stats.typeCounts[t2.name]||0;return <div key={t2.name} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid "+DT.panelBorder}}><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:10,height:10,borderRadius:"50%",background:t2.color}}/><span style={{fontSize:12}}>{t2.name}</span></div><span style={{fontFamily:F.mn,fontSize:11,color:DT.textMid}}>{c}</span></div>;})}
              </div>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:8}}><span style={{fontSize:11}}>📊</span><span style={{fontFamily:F.hd,fontSize:11,fontWeight:700,color:DT.coral}}>LINES BY AISLE</span></div>
                {aisleLinesSorted.map(function(a2){var pct=maxAL>0?a2.lines/maxAL*100:0;return <div key={a2.name} style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}><span style={{fontFamily:F.mn,fontSize:10,color:DT.textMid,width:24,textAlign:"right"}}>{a2.name}</span><div style={{flex:1,height:8,background:DT.bg,borderRadius:3,overflow:"hidden"}}><div style={{width:pct+"%",height:"100%",background:DT.coral,borderRadius:3}}/></div><span style={{fontFamily:F.mn,fontSize:9,color:DT.textDim,width:32,textAlign:"right"}}>{fmt(a2.lines)}</span></div>;})}
              </div>
            </div>)}
            {sidebarTab === "analytics" && (<div>
              <div style={{fontFamily:F.hd,fontSize:11,fontWeight:700,color:DT.coral,marginBottom:12}}>METRICS</div>
              {[{l:"Avg Lines/Bay",v:stats.active>0?Math.round(stats.totalLines/stats.active).toLocaleString():"0"},{l:"Utilization",v:Math.round(stats.active/Math.max(stats.locations,1)*100)+"%"},{l:"Empty Bays",v:(stats.locations-stats.active).toString()},{l:"Peak Bay",v:stats.maxLines.toLocaleString()}].map(function(m,i){return <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid "+DT.panelBorder}}><span style={{fontSize:11,color:DT.textMid}}>{m.l}</span><span style={{fontFamily:F.mn,fontSize:12,fontWeight:700,color:DT.text}}>{m.v}</span></div>;})}
            </div>)}
            {sidebarTab === "alerts" && (<div>
              <div style={{fontFamily:F.hd,fontSize:11,fontWeight:700,color:DT.coral,marginBottom:12}}>ALERTS</div>
              {[{i:"🚫",t:"Empty Bays",c:stats.locations-stats.active,co:DT.coral},{i:"🔥",t:"Overloaded",c:bays.filter(function(b2){return b2.lines>stats.maxLines*0.9;}).length,co:DT.amber},{i:"❄️",t:"Underperforming",c:bays.filter(function(b2){return b2.lines>0&&b2.lines<100;}).length,co:DT.cyan}].map(function(a2,i){return <div key={i} style={{padding:"10px 12px",borderRadius:8,marginBottom:6,background:a2.co+"10",border:"1px solid "+a2.co+"25"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:5}}><span style={{fontSize:12}}>{a2.i}</span><span style={{fontFamily:F.hd,fontSize:11,fontWeight:700,color:a2.co}}>{a2.t}</span></div><span style={{fontFamily:F.hd,fontSize:16,fontWeight:800,color:a2.co}}>{a2.c}</span></div></div>;})}
            </div>)}
          </div>
          {/* Selected bay */}
          {selectedBay && (
            <div style={{ borderTop:"1px solid "+DT.panelBorder, padding:"12px", background:DT.bg, flexShrink:0 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                <span style={{fontFamily:F.hd,fontSize:12,fontWeight:700}}>{selectedBay.id}</span>
                <button onClick={function(){setSelectedBay(null);}} style={{background:"transparent",border:"none",color:DT.textDim,cursor:"pointer",fontSize:13}}>✕</button>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"auto 1fr", gap:"3px 12px", fontSize:11 }}>
                <span style={{color:DT.textDim}}>Lines:</span><span style={{color:DT.coral,fontWeight:700,fontFamily:F.mn}}>{selectedBay.lines.toLocaleString()}</span>
                <span style={{color:DT.textDim}}>Rack:</span><span style={{color:selectedBay.type.color,fontWeight:600}}>{selectedBay.type.name}</span>
                <span style={{color:DT.textDim}}>SKU:</span><span style={{fontFamily:F.mn,color:DT.textMid}}>{selectedBay.sku||"Empty"}</span>
                <span style={{color:DT.textDim}}>Aisle:</span><span>{selectedBay.aisle} · {selectedBay.side==="L"?"Left":"Right"}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════
   INVENTORY TOOLKIT — ROP/Safety Stock, ABC/XYZ, Dead Stock
   ══════════════════════════════════════════════════════════════ */
var TK_SAMPLE = [
  {id:"SKU-1001",name:"Widget A",category:"Electronics",unitCost:12.50,avgDailyDemand:11.4,demandStdDev:3.2,leadTime:7,leadTimeVar:2,qtyOnHand:340,monthlyDemand:[380,320,360,345,310,390,370,340,355,365,350,330],lastSold:1},
  {id:"SKU-1002",name:"Bracket B",category:"Hardware",unitCost:3.20,avgDailyDemand:6.3,demandStdDev:1.8,leadTime:14,leadTimeVar:3,qtyOnHand:890,monthlyDemand:[185,200,195,180,190,210,195,188,192,205,198,185],lastSold:1},
  {id:"SKU-1003",name:"Seal Kit C",category:"Hardware",unitCost:8.75,avgDailyDemand:0.9,demandStdDev:0.5,leadTime:21,leadTimeVar:5,qtyOnHand:45,monthlyDemand:[30,25,28,22,18,15,12,10,8,6,4,2],lastSold:8},
  {id:"SKU-1004",name:"Motor D",category:"Electronics",unitCost:145.00,avgDailyDemand:1.4,demandStdDev:0.8,leadTime:30,leadTimeVar:7,qtyOnHand:12,monthlyDemand:[45,42,38,44,40,48,43,46,41,47,44,42],lastSold:2},
  {id:"SKU-1005",name:"Filter E",category:"Consumables",unitCost:4.50,avgDailyDemand:3.2,demandStdDev:0.9,leadTime:7,leadTimeVar:1,qtyOnHand:1200,monthlyDemand:[95,100,98,92,96,105,100,97,94,102,99,95],lastSold:1},
  {id:"SKU-1006",name:"Valve F",category:"Hardware",unitCost:22.00,avgDailyDemand:8.5,demandStdDev:4.1,leadTime:10,leadTimeVar:3,qtyOnHand:160,monthlyDemand:[240,280,220,300,250,210,290,260,230,270,285,245],lastSold:1},
  {id:"SKU-1007",name:"Hose G",category:"Consumables",unitCost:6.80,avgDailyDemand:5.9,demandStdDev:1.2,leadTime:5,leadTimeVar:1,qtyOnHand:520,monthlyDemand:[175,180,178,182,176,185,179,181,177,183,180,178],lastSold:1},
  {id:"SKU-1008",name:"Panel H",category:"Electronics",unitCost:210.00,avgDailyDemand:0.1,demandStdDev:0.1,leadTime:45,leadTimeVar:10,qtyOnHand:3,monthlyDemand:[3,2,1,0,0,1,0,0,0,0,0,0],lastSold:45},
  {id:"SKU-1009",name:"Clip Set I",category:"Hardware",unitCost:1.20,avgDailyDemand:16.7,demandStdDev:3.5,leadTime:3,leadTimeVar:1,qtyOnHand:4200,monthlyDemand:[500,510,495,520,505,530,515,508,498,525,512,502],lastSold:1},
  {id:"SKU-1010",name:"Pump J",category:"Equipment",unitCost:380.00,avgDailyDemand:0.15,demandStdDev:0.12,leadTime:60,leadTimeVar:15,qtyOnHand:5,monthlyDemand:[5,4,3,5,4,6,4,3,5,4,5,3],lastSold:30},
  {id:"SKU-1011",name:"Gasket K",category:"Consumables",unitCost:0.90,avgDailyDemand:10.6,demandStdDev:2.1,leadTime:5,leadTimeVar:1,qtyOnHand:6800,monthlyDemand:[310,325,320,315,330,340,328,322,318,335,326,319],lastSold:1},
  {id:"SKU-1012",name:"Relay L",category:"Electronics",unitCost:18.50,avgDailyDemand:4.5,demandStdDev:2.8,leadTime:12,leadTimeVar:4,qtyOnHand:88,monthlyDemand:[120,180,90,200,110,160,140,85,190,95,170,130],lastSold:1},
  {id:"SKU-1013",name:"Bearing M",category:"Hardware",unitCost:7.60,avgDailyDemand:7.0,demandStdDev:1.5,leadTime:10,leadTimeVar:2,qtyOnHand:310,monthlyDemand:[200,215,210,220,205,225,215,210,208,218,212,207],lastSold:1},
  {id:"SKU-1014",name:"Cable N",category:"Electronics",unitCost:5.40,avgDailyDemand:2.9,demandStdDev:0.6,leadTime:8,leadTimeVar:2,qtyOnHand:220,monthlyDemand:[85,88,90,86,92,87,91,89,88,90,87,86],lastSold:2},
  {id:"SKU-1015",name:"Wrench O",category:"Tools",unitCost:32.00,avgDailyDemand:0.4,demandStdDev:0.3,leadTime:14,leadTimeVar:3,qtyOnHand:18,monthlyDemand:[15,12,10,8,6,5,3,2,1,1,0,0],lastSold:12},
  {id:"SKU-1016",name:"Sensor P",category:"Electronics",unitCost:28.00,avgDailyDemand:12.2,demandStdDev:5.5,leadTime:10,leadTimeVar:3,qtyOnHand:145,monthlyDemand:[300,420,280,450,350,390,310,480,340,400,290,370],lastSold:1},
];

var Z_SCORES = {"90%":1.28,"95%":1.65,"97.5%":1.96,"99%":2.33,"99.5%":2.58};

function TKFlow(props) {
  var onHome = props.onHome;
  var phState = useState("landing"); var phase = phState[0]; var setPhase = phState[1];
  var st1 = useState("rop"); var activeTool = st1[0]; var setActiveTool = st1[1];
  var st2 = useState(TK_SAMPLE); var items = st2[0]; var setItems = st2[1];
  var st3 = useState("95%"); var serviceLevel = st3[0]; var setServiceLevel = st3[1];
  var st4 = useState(25); var orderCost = st4[0]; var setOrderCost = st4[1];
  var st5 = useState(25); var carryPct = st5[0]; var setCarryPct = st5[1];
  var st6 = useState(60); var deadWindow = st6[0]; var setDeadWindow = st6[1];
  var st7 = useState(50); var declineThreshold = st7[0]; var setDeclineThreshold = st7[1];
  var st8 = useState(false); var showImport = st8[0]; var setShowImport = st8[1];
  var st9 = useState(""); var csvText = st9[0]; var setCsvText = st9[1];
  var st10 = useState(0); var setupStep = st10[0]; var setSetupStep = st10[1];

  function handleImport() {
    try {
      var lines = csvText.trim().split("\n").filter(function(l){return l.trim();});
      if (lines.length < 2) return;
      var h = lines[0].split(",").map(function(x){return x.trim().toLowerCase().replace(/ /g,"");});
      var parsed = lines.slice(1).map(function(line, idx) {
        var v = line.split(",").map(function(x){return x.trim();});
        var o = {}; h.forEach(function(hh,j){o[hh]=v[j]||"";});
        return {
          id: o.id||o.sku||"SKU-"+(idx+1),
          name: o.name||o.description||"Item "+(idx+1),
          category: o.category||o.group||"General",
          unitCost: parseFloat(o.unitcost||o.cost||o.price||"1")||1,
          avgDailyDemand: parseFloat(o.avgdailydemand||o.avgdemand||o.demand||"1")||1,
          demandStdDev: parseFloat(o.demandstddev||o.stddev||o.variability||"0.5")||0.5,
          leadTime: parseInt(o.leadtime||o.lt||"14")||14,
          leadTimeVar: parseInt(o.leadtimevar||o.ltvar||"3")||3,
          qtyOnHand: parseInt(o.qtyonhand||o.qty||o.onhand||o.stock||"100")||0,
          monthlyDemand: (o.monthlydemand||"").split(";").map(function(x){return parseInt(x)||0;}).length >= 6
            ? (o.monthlydemand||"").split(";").map(function(x){return parseInt(x)||0;})
            : Array(12).fill(Math.round(parseFloat(o.avgdailydemand||o.demand||"1")*30)||30),
          lastSold: parseInt(o.lastsold||o.dayssincelastsale||"1")||1,
        };
      });
      if (parsed.length) { setItems(parsed); setShowImport(false); setCsvText(""); }
    } catch(e) { /* */ }
  }

  function launchWithSample() { setItems(TK_SAMPLE); setPhase("dash"); }
  function launchEmpty() { setItems([]); setShowImport(true); setPhase("dash"); }
  useEffect(function(){ window.scrollTo(0, 0); }, [phase]);

  if (phase === "landing") { return (
    <div style={{minHeight:"100vh",background:TK.bg,fontFamily:F.sans,color:TK.text}}>
      <link href={FONTS} rel="stylesheet" />
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(12,15,22,0.8)",backdropFilter:"blur(20px)",borderBottom:"1px solid "+TK.panelBorder}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 40px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center"}}>
          <button onClick={onHome} style={{background:"transparent",border:"none",color:"#4a5168",cursor:"pointer",fontSize:12,marginRight:12}}>← Home</button>
          <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={onHome}><div style={{width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,"+TK.teal+",#0d9488)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:800}}>⧉</div><span style={{fontFamily:F.hd,fontSize:18,fontWeight:800}}>Inventory <span style={{color:TK.teal}}>Toolkit</span></span></div>
          </div>
          <button onClick={function(){setPhase("onboard");}} style={{fontSize:13,fontWeight:700,color:"#0c0f16",background:TK.teal,padding:"8px 22px",borderRadius:8,border:"none",cursor:"pointer"}}>Get Started</button>
        </div>
      </nav>
      <section style={{padding:"160px 40px 60px",maxWidth:1100,margin:"0 auto"}}>
        <Reveal><div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 16px",borderRadius:100,background:TK.teal+"12",border:"1px solid "+TK.teal+"25",marginBottom:28}}><div style={{width:6,height:6,borderRadius:"50%",background:TK.teal}}/><span style={{fontFamily:F.mn,fontSize:11,color:TK.teal,fontWeight:600,letterSpacing:0.8}}>THREE CALCULATORS · ONE DATASET</span></div></Reveal>
        <Reveal delay={0.1}><h1 style={{fontFamily:F.hd,fontSize:"clamp(40px,5.5vw,64px)",fontWeight:900,lineHeight:1.06,letterSpacing:"-0.04em",margin:"0 0 24px"}}>The ops manager's<br/><span style={{color:TK.teal}}>daily toolkit.</span></h1></Reveal>
        <Reveal delay={0.2}><p style={{fontSize:18,color:TK.textMid,lineHeight:1.7,margin:"0 0 36px",maxWidth:520}}>Reorder Point & Safety Stock, ABC/XYZ Classification, and Dead Stock Identifier — three essential inventory calculators sharing one dataset.</p></Reveal>
        <Reveal delay={0.3}><button onClick={function(){setPhase("onboard");}} style={{fontSize:16,fontWeight:700,color:"#0c0f16",background:TK.teal,padding:"14px 32px",borderRadius:10,border:"none",cursor:"pointer",boxShadow:"0 4px 24px rgba(45,212,191,0.2)"}}>Open Toolkit →</button></Reveal>
      </section>
      <section style={{padding:"40px 40px 80px",maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
          {[{icon:"📐",title:"Reorder Point & Safety Stock",desc:"Configurable service level (90-99.5%), order cost, carrying %. Calculates safety stock, ROP, and EOQ for every SKU with live formulas.",color:TK.teal},{icon:"🏷️",title:"ABC/XYZ Analysis",desc:"ABC by annual value (Pareto 70/90/100), XYZ by coefficient of variation. 3×3 matrix with management recommendations per cell.",color:TK.orange},{icon:"💀",title:"Dead Stock Identifier",desc:"Configurable dead window and decline threshold. Groups items by Dead/Declining/Slow Moving with value at risk and recommended actions.",color:TK.red}].map(function(f2,i){return <Reveal key={f2.title} delay={i*0.1}><div style={{background:TK.panel,border:"1px solid "+TK.panelBorder,borderRadius:16,padding:"28px 22px",borderTop:"3px solid "+f2.color}}>
            <div style={{fontSize:28,marginBottom:12}}>{f2.icon}</div>
            <h3 style={{fontFamily:F.hd,fontSize:16,fontWeight:700,color:f2.color,margin:"0 0 8px"}}>{f2.title}</h3>
            <p style={{fontSize:13,color:TK.textMid,lineHeight:1.6,margin:0}}>{f2.desc}</p>
          </div></Reveal>;})}
        </div>
      </section>
      <section style={{padding:"20px 40px 80px",textAlign:"center"}}><Reveal><button onClick={function(){setPhase("onboard");}} style={{fontSize:16,fontWeight:700,color:"#0c0f16",background:TK.teal,padding:"16px 40px",borderRadius:12,border:"none",cursor:"pointer"}}>Get Started →</button></Reveal></section>
    </div>
  ); }

  /* ── ONBOARDING ── */
  if (phase === "onboard") {
    var steps = [
      { title:"Welcome", icon:"⧉" },
      { title:"Configure", icon:"⚙️" },
      { title:"Launch", icon:"🚀" },
    ];
    return (
      <div style={{minHeight:"100vh",background:TK.bg,fontFamily:F.sans,color:TK.text}}>
        <link href={FONTS} rel="stylesheet" />
        <style>{`input[type=range]{accent-color:${TK.teal}}`}</style>
        {/* Progress bar */}
        <div style={{background:TK.panel,borderBottom:"1px solid "+TK.panelBorder,padding:"14px 32px"}}>
          <div style={{display:"flex",alignItems:"center",gap:4,maxWidth:400}}>
            {steps.map(function(st,i){return (
              <div key={i} style={{display:"flex",alignItems:"center",flex:1}}>
                <div style={{width:26,height:26,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,fontFamily:F.mn,background:i<setupStep?TK.teal:i===setupStep?"rgba(45,212,191,0.15)":TK.surface,color:i<setupStep?"#0c0f16":i===setupStep?TK.teal:TK.textDim,border:i===setupStep?"1.5px solid "+TK.teal:"1.5px solid transparent"}}>{i<setupStep?"✓":i+1}</div>
                {i<2&&<div style={{flex:1,height:2,margin:"0 4px",background:i<setupStep?TK.teal:TK.panelBorder}}/>}
              </div>
            );})}
          </div>
        </div>

        <div style={{maxWidth:680,margin:"0 auto",padding:"40px 32px"}}>
          <button onClick={onHome} style={{background:"transparent",border:"none",color:TK.textDim,cursor:"pointer",fontSize:12,marginBottom:20}}>← Home</button>

          {/* Step 0: Welcome */}
          {setupStep === 0 && (<div>
            <div style={{fontSize:42,marginBottom:14}}>⧉</div>
            <h2 style={{fontFamily:F.hd,fontSize:26,fontWeight:800,color:TK.text,margin:"0 0 8px"}}>Inventory Toolkit</h2>
            <p style={{fontSize:15,color:TK.textMid,lineHeight:1.7,margin:"0 0 28px"}}>Three essential calculators for operations teams — all running from the same dataset.</p>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:28}}>
              {[
                {icon:"📐",name:"Reorder Point & Safety Stock",desc:"Calculates safety stock, reorder point (ROP), and economic order quantity (EOQ) for every SKU based on demand variability, lead time, and your target service level.",color:TK.teal},
                {icon:"🏷️",name:"ABC/XYZ Analysis",desc:"Classifies SKUs into a 3×3 matrix — ABC by annual value (Pareto) and XYZ by demand variability (coefficient of variation). Each cell gets a specific management recommendation.",color:TK.orange},
                {icon:"💀",name:"Dead Stock Identifier",desc:"Flags items with zero movement, declining demand trends, or slow velocity. Shows value at risk and recommended actions like liquidation, markdown, or reorder reduction.",color:TK.red},
              ].map(function(tool) {
                return (
                  <div key={tool.name} style={{background:TK.panel,border:"1px solid "+TK.panelBorder,borderRadius:14,padding:"20px 16px",borderTop:"3px solid "+tool.color}}>
                    <div style={{fontSize:24,marginBottom:10}}>{tool.icon}</div>
                    <div style={{fontFamily:F.hd,fontSize:13,fontWeight:700,color:tool.color,marginBottom:8}}>{tool.name}</div>
                    <p style={{fontSize:12,color:TK.textMid,lineHeight:1.6,margin:0}}>{tool.desc}</p>
                  </div>
                );
              })}
            </div>

            <div style={{background:TK.surface,border:"1px solid "+TK.panelBorder,borderRadius:12,padding:"16px 20px",marginBottom:24}}>
              <div style={{fontFamily:F.mn,fontSize:10,color:TK.textDim,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>DATA YOU'LL NEED</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 24px",fontSize:13,color:TK.textMid}}>
                {[
                  {l:"SKU ID & Name",req:true},
                  {l:"Unit Cost / Price",req:true},
                  {l:"Average Daily Demand",req:true},
                  {l:"Current Qty On Hand",req:true},
                  {l:"Demand Std Deviation",req:false},
                  {l:"Lead Time (days)",req:false},
                  {l:"Lead Time Variability",req:false},
                  {l:"Days Since Last Sale",req:false},
                  {l:"Monthly Demand (12 months)",req:false},
                  {l:"Category / Group",req:false},
                ].map(function(d,i) {
                  return (
                    <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"4px 0"}}>
                      <div style={{width:8,height:8,borderRadius:4,background:d.req?TK.teal:TK.panelBorder,flexShrink:0}}/>
                      <span>{d.l}</span>
                      {d.req && <span style={{fontFamily:F.mn,fontSize:9,color:TK.teal,fontWeight:600}}>REQUIRED</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            <button onClick={function(){setSetupStep(1);}} style={{width:"100%",padding:"14px",borderRadius:10,border:"none",background:TK.teal,color:"#0c0f16",cursor:"pointer",fontFamily:F.hd,fontSize:15,fontWeight:700}}>Get Started →</button>
          </div>)}

          {/* Step 1: Configure */}
          {setupStep === 1 && (<div>
            <div style={{fontFamily:F.mn,fontSize:11,color:TK.teal,letterSpacing:1.5,marginBottom:8}}>STEP 2 OF 3</div>
            <h2 style={{fontFamily:F.hd,fontSize:22,fontWeight:800,margin:"0 0 6px"}}>Default Thresholds</h2>
            <p style={{fontSize:14,color:TK.textMid,margin:"0 0 24px"}}>Set your starting parameters. You can adjust all of these in the dashboard too.</p>

            <div style={{background:TK.panel,border:"1px solid "+TK.panelBorder,borderRadius:14,padding:"20px 22px",marginBottom:16}}>
              <div style={{fontFamily:F.mn,fontSize:10,color:TK.textDim,letterSpacing:1.5,textTransform:"uppercase",marginBottom:14}}>REORDER POINT SETTINGS</div>
              <div style={{marginBottom:14}}>
                <label style={{fontSize:12,color:TK.textMid,display:"block",marginBottom:6,fontWeight:500}}>Target Service Level</label>
                <div style={{display:"flex",gap:8}}>
                  {Object.keys(Z_SCORES).map(function(k){
                    var active = serviceLevel === k;
                    return <button key={k} onClick={function(){setServiceLevel(k);}} style={{flex:1,padding:"10px 6px",borderRadius:8,border:"1.5px solid "+(active?TK.teal:TK.panelBorder),background:active?TK.teal+"15":"transparent",color:active?TK.teal:TK.textDim,cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:F.mn}}>{k}</button>;
                  })}
                </div>
                <div style={{fontSize:11,color:TK.textDim,marginTop:6}}>Higher service level = more safety stock = fewer stockouts but more carrying cost.</div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                <div>
                  <label style={{fontSize:12,color:TK.textMid,display:"block",marginBottom:6}}>Order Cost per PO ($)</label>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <input type="range" min={5} max={100} value={orderCost} onChange={function(e){setOrderCost(+e.target.value);}} style={{flex:1}}/>
                    <span style={{fontFamily:F.mn,fontSize:16,fontWeight:700,color:TK.teal,minWidth:40,textAlign:"right"}}>${orderCost}</span>
                  </div>
                  <div style={{fontSize:11,color:TK.textDim,marginTop:4}}>Cost to place a purchase order (admin, freight, receiving).</div>
                </div>
                <div>
                  <label style={{fontSize:12,color:TK.textMid,display:"block",marginBottom:6}}>Annual Carrying Cost %</label>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <input type="range" min={10} max={40} value={carryPct} onChange={function(e){setCarryPct(+e.target.value);}} style={{flex:1}}/>
                    <span style={{fontFamily:F.mn,fontSize:16,fontWeight:700,color:TK.teal,minWidth:40,textAlign:"right"}}>{carryPct}%</span>
                  </div>
                  <div style={{fontSize:11,color:TK.textDim,marginTop:4}}>Warehousing, insurance, obsolescence, capital cost. Industry avg: 20-30%.</div>
                </div>
              </div>
            </div>

            <div style={{background:TK.panel,border:"1px solid "+TK.panelBorder,borderRadius:14,padding:"20px 22px",marginBottom:24}}>
              <div style={{fontFamily:F.mn,fontSize:10,color:TK.textDim,letterSpacing:1.5,textTransform:"uppercase",marginBottom:14}}>DEAD STOCK SETTINGS</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                <div>
                  <label style={{fontSize:12,color:TK.textMid,display:"block",marginBottom:6}}>Dead Stock Window</label>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <input type="range" min={14} max={180} value={deadWindow} onChange={function(e){setDeadWindow(+e.target.value);}} style={{flex:1}}/>
                    <span style={{fontFamily:F.mn,fontSize:16,fontWeight:700,color:TK.red,minWidth:50,textAlign:"right"}}>{deadWindow} days</span>
                  </div>
                  <div style={{fontSize:11,color:TK.textDim,marginTop:4}}>No sales in this many days = flagged as dead stock.</div>
                </div>
                <div>
                  <label style={{fontSize:12,color:TK.textMid,display:"block",marginBottom:6}}>Decline Threshold</label>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <input type="range" min={20} max={80} value={declineThreshold} onChange={function(e){setDeclineThreshold(+e.target.value);}} style={{flex:1}}/>
                    <span style={{fontFamily:F.mn,fontSize:16,fontWeight:700,color:TK.orange,minWidth:40,textAlign:"right"}}>{declineThreshold}%</span>
                  </div>
                  <div style={{fontSize:11,color:TK.textDim,marginTop:4}}>Demand drop from first half to second half of history.</div>
                </div>
              </div>
            </div>

            <div style={{display:"flex",justifyContent:"space-between"}}>
              <button onClick={function(){setSetupStep(0);}} style={{padding:"10px 22px",borderRadius:8,border:"1px solid "+TK.panelBorder,background:"transparent",color:TK.textMid,cursor:"pointer",fontSize:13}}>← Back</button>
              <button onClick={function(){setSetupStep(2);}} style={{padding:"10px 28px",borderRadius:8,border:"none",background:TK.teal,color:"#0c0f16",cursor:"pointer",fontSize:13,fontWeight:700}}>Continue →</button>
            </div>
          </div>)}

          {/* Step 2: Launch */}
          {setupStep === 2 && (<div>
            <div style={{fontFamily:F.mn,fontSize:11,color:TK.teal,letterSpacing:1.5,marginBottom:8}}>STEP 3 OF 3</div>
            <h2 style={{fontFamily:F.hd,fontSize:22,fontWeight:800,margin:"0 0 6px"}}>Ready to Launch!</h2>
            <p style={{fontSize:14,color:TK.textMid,margin:"0 0 24px"}}>Choose how to load your data. You can always import or change data later from the dashboard.</p>

            {/* Config summary */}
            <div style={{background:TK.surface,border:"1px solid "+TK.panelBorder,borderRadius:12,padding:"16px 20px",marginBottom:20}}>
              <div style={{fontFamily:F.mn,fontSize:10,color:TK.textDim,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>YOUR CONFIGURATION</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px 20px",fontFamily:F.mn,fontSize:12}}>
                <div><span style={{color:TK.textDim}}>Service Level: </span><span style={{color:TK.teal,fontWeight:700}}>{serviceLevel}</span></div>
                <div><span style={{color:TK.textDim}}>Order Cost: </span><span style={{color:TK.teal,fontWeight:700}}>${orderCost}</span></div>
                <div><span style={{color:TK.textDim}}>Carrying %: </span><span style={{color:TK.teal,fontWeight:700}}>{carryPct}%</span></div>
                <div><span style={{color:TK.textDim}}>Dead Window: </span><span style={{color:TK.red,fontWeight:700}}>{deadWindow}d</span></div>
                <div><span style={{color:TK.textDim}}>Decline: </span><span style={{color:TK.orange,fontWeight:700}}>{declineThreshold}%</span></div>
              </div>
            </div>

            <div style={{display:"flex",gap:14}}>
              <div onClick={launchWithSample} style={{flex:1,padding:"24px 20px",borderRadius:14,cursor:"pointer",background:TK.teal+"12",border:"1.5px solid "+TK.teal+"30",transition:"all 0.2s"}}
                onMouseEnter={function(e){e.currentTarget.style.borderColor=TK.teal;}} onMouseLeave={function(e){e.currentTarget.style.borderColor=TK.teal+"30";}}>
                <div style={{fontSize:28,marginBottom:10}}>🧪</div>
                <div style={{fontFamily:F.hd,fontSize:16,fontWeight:700,color:TK.teal,marginBottom:6}}>Sample Data</div>
                <div style={{fontSize:13,color:TK.textMid}}>Explore with 16 pre-loaded SKUs across Electronics, Hardware, Consumables, and Equipment.</div>
              </div>
              <div onClick={launchEmpty} style={{flex:1,padding:"24px 20px",borderRadius:14,cursor:"pointer",background:TK.surface,border:"1.5px solid "+TK.panelBorder,transition:"all 0.2s"}}
                onMouseEnter={function(e){e.currentTarget.style.borderColor=TK.textDim;}} onMouseLeave={function(e){e.currentTarget.style.borderColor=TK.panelBorder;}}>
                <div style={{fontSize:28,marginBottom:10}}>📤</div>
                <div style={{fontFamily:F.hd,fontSize:16,fontWeight:700,color:TK.text,marginBottom:6}}>Import Your Data</div>
                <div style={{fontSize:13,color:TK.textMid}}>Paste a CSV with your SKU data. The import panel will open automatically on the dashboard.</div>
              </div>
            </div>

            <div style={{marginTop:24}}>
              <button onClick={function(){setSetupStep(1);}} style={{padding:"10px 22px",borderRadius:8,border:"1px solid "+TK.panelBorder,background:"transparent",color:TK.textMid,cursor:"pointer",fontSize:13}}>← Back</button>
            </div>
          </div>)}
        </div>
      </div>
    );
  }

  var Z = Z_SCORES[serviceLevel] || 1.65;

  // ROP
  var ropData = useMemo(function(){
    return items.map(function(it){
      var ss = Math.ceil(Z*it.demandStdDev*Math.sqrt(it.leadTime)+Z*it.avgDailyDemand*it.leadTimeVar);
      var rop = Math.ceil(it.avgDailyDemand*it.leadTime+ss);
      var eoq = Math.ceil(Math.sqrt(2*it.avgDailyDemand*365*orderCost/(it.unitCost*carryPct/100)));
      var dos = it.avgDailyDemand>0?Math.round(it.qtyOnHand/it.avgDailyDemand):9999;
      var status = it.qtyOnHand===0?"Stockout":it.qtyOnHand<=ss?"Critical":it.qtyOnHand<=rop?"Reorder":"OK";
      var sc = status==="OK"?TK.green:status==="Reorder"?TK.orange:TK.red;
      return Object.assign({},it,{safetyStock:ss,rop:rop,eoq:eoq,daysOfStock:dos,ropStatus:status,ropSC:sc});
    });
  },[items,Z,orderCost,carryPct]);

  // ABC/XYZ
  var abcData = useMemo(function(){
    var withVal = items.map(function(it){
      var av = Math.round(it.avgDailyDemand*365*it.unitCost);
      var avg = it.monthlyDemand.reduce(function(s,v){return s+v;},0)/it.monthlyDemand.length;
      var variance = it.monthlyDemand.reduce(function(s,v){return s+Math.pow(v-avg,2);},0)/it.monthlyDemand.length;
      var cv = avg>0?Math.round(Math.sqrt(variance)/avg*100)/100:999;
      return Object.assign({},it,{annualValue:av,cv:cv,avgMonthly:Math.round(avg)});
    });
    var sorted = withVal.slice().sort(function(a,b){return b.annualValue-a.annualValue;});
    var total = sorted.reduce(function(s,i2){return s+i2.annualValue;},0);
    var cum = 0;
    sorted.forEach(function(it2){
      cum+=it2.annualValue;
      var pct=total>0?cum/total:1;
      it2.abc=pct<=0.7?"A":pct<=0.9?"B":"C";
      it2.abcC=it2.abc==="A"?TK.teal:it2.abc==="B"?TK.orange:TK.blue;
      it2.xyz=it2.cv<0.5?"X":it2.cv<1.0?"Y":"Z";
      it2.xyzC=it2.xyz==="X"?TK.green:it2.xyz==="Y"?TK.yellow:TK.red;
      it2.matrix=it2.abc+it2.xyz;
    });
    return sorted;
  },[items]);

  // Dead Stock
  var deadData = useMemo(function(){
    return items.map(function(it){
      var isDead = it.lastSold>=deadWindow;
      var half = Math.floor(it.monthlyDemand.length/2);
      var first = it.monthlyDemand.slice(0,half).reduce(function(s,v){return s+v;},0);
      var second = it.monthlyDemand.slice(half).reduce(function(s,v){return s+v;},0);
      var decPct = first>0?Math.round((1-second/first)*100):0;
      var isDec = decPct>=declineThreshold&&!isDead;
      var isSlow = !isDead&&!isDec&&it.lastSold>=14;
      var risk = isDead?"Dead Stock":isDec?"Declining":isSlow?"Slow Moving":"Active";
      var rc = isDead?TK.red:isDec?TK.orange:isSlow?TK.yellow:TK.green;
      var val = it.qtyOnHand*it.unitCost;
      var dos = it.avgDailyDemand>0?Math.round(it.qtyOnHand/it.avgDailyDemand):9999;
      return Object.assign({},it,{isDead:isDead,isDec:isDec,decPct:decPct,risk:risk,riskC:rc,invValue:Math.round(val),dos:dos});
    }).sort(function(a,b){var o={Dead:0,"Dead Stock":0,Declining:1,"Slow Moving":2,Active:3};return(o[a.risk]||3)-(o[b.risk]||3);});
  },[items,deadWindow,declineThreshold]);

  var deadStats = useMemo(function(){
    var d = deadData.filter(function(x){return x.risk==="Dead Stock";});
    var dc = deadData.filter(function(x){return x.risk==="Declining";});
    return {deadN:d.length,deadV:d.reduce(function(s,x){return s+x.invValue;},0),decN:dc.length,decV:dc.reduce(function(s,x){return s+x.invValue;},0)};
  },[deadData]);

  var matrixRec = {"AX":"Tight control, JIT","AY":"Safety stock + forecast","AZ":"High buffer, watch closely","BX":"Standard reorder","BY":"Moderate buffer","BZ":"Increase safety stock","CX":"Min-max reorder","CY":"Periodic review","CZ":"Consider discontinuing"};

  return (
    <div style={{minHeight:"100vh",background:TK.bg,fontFamily:F.sans,color:TK.text}}>
      <link href={FONTS} rel="stylesheet" />
      <style>{`input[type=range]{accent-color:${TK.teal}}`}</style>

      <header style={{background:TK.panel,borderBottom:"1px solid "+TK.panelBorder,padding:"14px 24px"}}>
        <div style={{maxWidth:1400,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <button onClick={onHome} style={{background:"transparent",border:"none",color:TK.textDim,cursor:"pointer",fontSize:12}}>← Home</button>
            <div style={{width:34,height:34,borderRadius:10,background:"linear-gradient(135deg,"+TK.teal+",#0d9488)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:800}}>⧉</div>
            <div>
              <h1 style={{fontFamily:F.hd,fontSize:17,fontWeight:800,margin:0}}>Inventory Toolkit</h1>
              <p style={{fontFamily:F.mn,fontSize:10,color:TK.textDim,margin:0}}>{items.length} SKUs LOADED</p>
            </div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={function(){setShowImport(!showImport);}} style={{padding:"6px 14px",borderRadius:8,border:"1px solid "+TK.teal+"30",background:TK.teal+"10",color:TK.teal,cursor:"pointer",fontSize:11,fontWeight:600}}>↑ Import CSV</button>
            <button onClick={function(){setItems(TK_SAMPLE);}} style={{padding:"6px 14px",borderRadius:8,border:"1px solid "+TK.panelBorder,background:"transparent",color:TK.textDim,cursor:"pointer",fontSize:11}}>Reset Sample</button>
          </div>
        </div>
      </header>

      {/* Tool tabs */}
      <div style={{background:TK.panel,borderBottom:"1px solid "+TK.panelBorder,padding:"0 24px"}}>
        <div style={{maxWidth:1400,margin:"0 auto",display:"flex",gap:0}}>
          {[{id:"rop",icon:"📐",label:"Reorder Point & Safety Stock"},{id:"abc",icon:"🏷️",label:"ABC/XYZ Analysis"},{id:"dead",icon:"💀",label:"Dead Stock Identifier"}].map(function(t){
            var active = activeTool===t.id;
            return <button key={t.id} onClick={function(){setActiveTool(t.id);}} style={{padding:"11px 18px",border:"none",cursor:"pointer",fontFamily:F.sans,fontSize:13,fontWeight:600,background:"transparent",color:active?TK.teal:TK.textDim,borderBottom:active?"2px solid "+TK.teal:"2px solid transparent",display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:14}}>{t.icon}</span>{t.label}</button>;
          })}
        </div>
      </div>

      <div style={{maxWidth:1400,margin:"0 auto",padding:"20px 24px"}}>

        {/* Import Panel */}
        {showImport && (
          <div style={{background:TK.surface,border:"1px solid "+TK.panelBorder,borderRadius:12,padding:20,marginBottom:20}}>
            <div style={{fontFamily:F.hd,fontSize:14,fontWeight:700,marginBottom:10}}>Import Your Data</div>
            <div style={{fontSize:12,color:TK.textMid,marginBottom:8}}>Paste CSV with headers. Supported columns:</div>
            <div style={{fontFamily:F.mn,fontSize:11,color:TK.teal,marginBottom:10,lineHeight:1.8}}>
              <strong>Required:</strong> id, name, unitCost, avgDailyDemand, qtyOnHand<br/>
              <strong>Recommended:</strong> category, demandStdDev, leadTime, leadTimeVar, lastSold<br/>
              <strong>Optional:</strong> monthlyDemand (12 values separated by semicolons, e.g., 100;120;95;110;...)
            </div>
            <textarea value={csvText} onChange={function(e){setCsvText(e.target.value);}} placeholder={"id,name,category,unitCost,avgDailyDemand,demandStdDev,leadTime,leadTimeVar,qtyOnHand,lastSold\nSKU-001,Widget,Electronics,12.50,11.4,3.2,7,2,340,1"} style={{width:"100%",height:100,background:TK.bg,color:TK.text,border:"1px solid "+TK.panelBorder,borderRadius:8,padding:12,fontFamily:F.mn,fontSize:11,resize:"vertical",boxSizing:"border-box"}} />
            <div style={{display:"flex",gap:8,marginTop:10}}>
              <button onClick={handleImport} style={{padding:"9px 22px",borderRadius:8,border:"none",background:TK.teal,color:"#0c0f16",cursor:"pointer",fontSize:12,fontWeight:700}}>Import Data</button>
              <button onClick={function(){setShowImport(false);}} style={{padding:"9px 16px",borderRadius:8,border:"1px solid "+TK.panelBorder,background:"transparent",color:TK.textMid,cursor:"pointer",fontSize:12}}>Cancel</button>
            </div>
          </div>
        )}

        {/* ══ ROP ══ */}
        {activeTool==="rop" && (<div>
          <div style={{display:"flex",gap:14,marginBottom:18,flexWrap:"wrap"}}>
            <div style={{background:TK.panel,border:"1px solid "+TK.panelBorder,borderRadius:12,padding:"14px 18px",display:"flex",gap:20,alignItems:"end",flexWrap:"wrap",flex:1}}>
              <div><label style={{fontSize:10,color:TK.textMid,display:"block",marginBottom:3,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5}}>Service Level</label><select value={serviceLevel} onChange={function(e){setServiceLevel(e.target.value);}} style={{background:TK.surface,color:TK.text,border:"1px solid "+TK.panelBorder,borderRadius:6,padding:"6px 10px",fontFamily:F.sans,fontSize:12,outline:"none"}}>{Object.keys(Z_SCORES).map(function(k){return <option key={k} value={k}>{k} (Z={Z_SCORES[k]})</option>;})}</select></div>
              <div><label style={{fontSize:10,color:TK.textMid,display:"block",marginBottom:3,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5}}>Order Cost</label><div style={{display:"flex",alignItems:"center",gap:6}}><input type="range" min={5} max={100} value={orderCost} onChange={function(e){setOrderCost(+e.target.value);}} style={{width:90}}/><span style={{fontFamily:F.mn,fontSize:13,fontWeight:700,color:TK.teal}}>${orderCost}</span></div></div>
              <div><label style={{fontSize:10,color:TK.textMid,display:"block",marginBottom:3,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5}}>Carrying %</label><div style={{display:"flex",alignItems:"center",gap:6}}><input type="range" min={10} max={40} value={carryPct} onChange={function(e){setCarryPct(+e.target.value);}} style={{width:90}}/><span style={{fontFamily:F.mn,fontSize:13,fontWeight:700,color:TK.teal}}>{carryPct}%</span></div></div>
            </div>
            {[{l:"Need Reorder",v:ropData.filter(function(d){return d.ropStatus!=="OK";}).length,c:TK.orange},{l:"Critical",v:ropData.filter(function(d){return d.ropStatus==="Critical"||d.ropStatus==="Stockout";}).length,c:TK.red},{l:"Healthy",v:ropData.filter(function(d){return d.ropStatus==="OK";}).length,c:TK.green}].map(function(s,i){return <div key={i} style={{background:TK.panel,border:"1px solid "+TK.panelBorder,borderRadius:12,padding:"14px 18px",minWidth:110,textAlign:"center"}}><div style={{fontFamily:F.hd,fontSize:26,fontWeight:800,color:s.c}}>{s.v}</div><div style={{fontFamily:F.mn,fontSize:9,color:TK.textDim,textTransform:"uppercase",letterSpacing:0.5}}>{s.l}</div></div>;})}
          </div>
          <div style={{background:TK.panel,border:"1px solid "+TK.panelBorder,borderRadius:12,overflow:"hidden"}}>
            <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
              <thead><tr style={{background:TK.surface}}>
                {["SKU","Name","Demand/Day","Lead Time","Safety Stock","ROP","EOQ","On Hand","Days","Status"].map(function(h){return <th key={h} style={{padding:"9px 12px",textAlign:"left",fontFamily:F.mn,fontSize:9,color:TK.textDim,letterSpacing:0.5,textTransform:"uppercase",borderBottom:"1px solid "+TK.panelBorder}}>{h}</th>;})}
              </tr></thead>
              <tbody>{ropData.map(function(d){return <tr key={d.id} style={{borderBottom:"1px solid "+TK.panelBorder}}>
                <td style={{padding:"8px 12px",fontFamily:F.mn,fontSize:11,color:TK.textMid}}>{d.id}</td>
                <td style={{padding:"8px 12px",fontWeight:600}}>{d.name}</td>
                <td style={{padding:"8px 12px",fontFamily:F.mn}}>{d.avgDailyDemand} <span style={{fontSize:9,color:TK.textDim}}>±{d.demandStdDev}</span></td>
                <td style={{padding:"8px 12px",fontFamily:F.mn}}>{d.leadTime}d</td>
                <td style={{padding:"8px 12px",fontFamily:F.mn,fontWeight:700,color:TK.teal}}>{d.safetyStock}</td>
                <td style={{padding:"8px 12px",fontFamily:F.mn,fontWeight:700,color:TK.orange}}>{d.rop}</td>
                <td style={{padding:"8px 12px",fontFamily:F.mn,color:TK.blue}}>{d.eoq}</td>
                <td style={{padding:"8px 12px",fontFamily:F.mn,color:d.qtyOnHand<=d.safetyStock?TK.red:TK.text}}>{d.qtyOnHand.toLocaleString()}</td>
                <td style={{padding:"8px 12px",fontFamily:F.mn,color:d.daysOfStock<d.leadTime?TK.red:TK.textMid}}>{d.daysOfStock>9000?"∞":d.daysOfStock+"d"}</td>
                <td style={{padding:"8px 12px"}}><Badge color={d.ropSC}>{d.ropStatus}</Badge></td>
              </tr>;})}</tbody>
            </table></div>
          </div>
          <div style={{marginTop:14,background:TK.surface,border:"1px solid "+TK.panelBorder,borderRadius:12,padding:"14px 18px"}}>
            <div style={{fontFamily:F.mn,fontSize:9,color:TK.textDim,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>FORMULAS</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,fontFamily:F.mn,fontSize:11,color:TK.textMid}}>
              <div><span style={{color:TK.teal,fontWeight:700}}>Safety Stock</span> = Z x σd x √LT + Z x d̄ x σLT</div>
              <div><span style={{color:TK.orange,fontWeight:700}}>ROP</span> = (d̄ x LT) + Safety Stock</div>
              <div><span style={{color:TK.blue,fontWeight:700}}>EOQ</span> = √(2 x D x S / H)</div>
            </div>
          </div>
        </div>)}

        {/* ══ ABC/XYZ ══ */}
        {activeTool==="abc" && (<div>
          <div style={{display:"flex",gap:12,marginBottom:18,flexWrap:"wrap"}}>
            {["A","B","C"].map(function(cls){
              var items2 = abcData.filter(function(d){return d.abc===cls;});
              var co = cls==="A"?TK.teal:cls==="B"?TK.orange:TK.blue;
              var val = items2.reduce(function(s,d){return s+d.annualValue;},0);
              return <div key={cls} style={{flex:1,minWidth:140,background:TK.panel,border:"1px solid "+TK.panelBorder,borderRadius:12,padding:"14px 18px",borderLeft:"3px solid "+co}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                  <span style={{fontFamily:F.hd,fontSize:22,fontWeight:800,color:co}}>Class {cls}</span>
                  <span style={{fontFamily:F.mn,fontSize:11,color:TK.textDim}}>{items2.length} SKUs</span>
                </div>
                <div style={{fontFamily:F.mn,fontSize:12,color:TK.textMid}}>${val.toLocaleString()}/yr</div>
              </div>;
            })}
          </div>

          {/* Matrix */}
          <div style={{background:TK.panel,border:"1px solid "+TK.panelBorder,borderRadius:12,padding:"16px 18px",marginBottom:18}}>
            <div style={{fontFamily:F.hd,fontSize:13,fontWeight:700,marginBottom:12}}>ABC/XYZ Matrix</div>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr><th style={{padding:8}} />{["X (Stable)","Y (Variable)","Z (Erratic)"].map(function(h,i){return <th key={h} style={{padding:8,fontSize:10,color:[TK.green,TK.yellow,TK.red][i],fontFamily:F.mn,fontWeight:700}}>{h}</th>;})}</tr></thead>
              <tbody>{["A","B","C"].map(function(abc){
                var abcCo = abc==="A"?TK.teal:abc==="B"?TK.orange:TK.blue;
                return <tr key={abc}>
                  <td style={{padding:8,fontFamily:F.mn,fontSize:12,fontWeight:700,color:abcCo}}>Class {abc}</td>
                  {["X","Y","Z"].map(function(xyz){
                    var ct = abcData.filter(function(d){return d.abc===abc&&d.xyz===xyz;}).length;
                    var rec = matrixRec[abc+xyz]||"";
                    return <td key={xyz} style={{padding:6,textAlign:"center"}}>
                      <div style={{background:ct>0?abcCo+"15":"transparent",borderRadius:8,padding:"8px 4px",border:ct>0?"1px solid "+abcCo+"25":"1px solid "+TK.panelBorder}}>
                        <div style={{fontFamily:F.hd,fontSize:18,fontWeight:800,color:ct>0?abcCo:TK.textDim}}>{ct}</div>
                        <div style={{fontFamily:F.mn,fontSize:8,color:TK.textDim}}>{abc}{xyz}</div>
                        {ct>0 && <div style={{fontSize:9,color:TK.textMid,marginTop:2}}>{rec}</div>}
                      </div>
                    </td>;
                  })}
                </tr>;
              })}</tbody>
            </table>
          </div>

          {/* Table */}
          <div style={{background:TK.panel,border:"1px solid "+TK.panelBorder,borderRadius:12,overflow:"hidden"}}>
            <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
              <thead><tr style={{background:TK.surface}}>
                {["SKU","Name","Annual Value","Avg/Mo","CV","ABC","XYZ","Matrix","Recommendation"].map(function(h){return <th key={h} style={{padding:"9px 12px",textAlign:"left",fontFamily:F.mn,fontSize:9,color:TK.textDim,letterSpacing:0.5,textTransform:"uppercase",borderBottom:"1px solid "+TK.panelBorder}}>{h}</th>;})}
              </tr></thead>
              <tbody>{abcData.map(function(d){return <tr key={d.id} style={{borderBottom:"1px solid "+TK.panelBorder}}>
                <td style={{padding:"8px 12px",fontFamily:F.mn,fontSize:11,color:TK.textMid}}>{d.id}</td>
                <td style={{padding:"8px 12px",fontWeight:600}}>{d.name}</td>
                <td style={{padding:"8px 12px",fontFamily:F.mn,fontWeight:700}}>${d.annualValue.toLocaleString()}</td>
                <td style={{padding:"8px 12px",fontFamily:F.mn,color:TK.textMid}}>{d.avgMonthly}</td>
                <td style={{padding:"8px 12px",fontFamily:F.mn,color:d.cv>1?TK.red:d.cv>0.5?TK.yellow:TK.green}}>{d.cv}</td>
                <td style={{padding:"8px 12px"}}><Badge color={d.abcC}>{d.abc}</Badge></td>
                <td style={{padding:"8px 12px"}}><Badge color={d.xyzC}>{d.xyz}</Badge></td>
                <td style={{padding:"8px 12px"}}><span style={{fontFamily:F.mn,fontSize:12,fontWeight:700,color:d.abcC}}>{d.matrix}</span></td>
                <td style={{padding:"8px 12px",fontSize:12,color:TK.textMid}}>{matrixRec[d.matrix]||""}</td>
              </tr>;})}</tbody>
            </table></div>
          </div>
        </div>)}

        {/* ══ DEAD STOCK ══ */}
        {activeTool==="dead" && (<div>
          <div style={{display:"flex",gap:14,marginBottom:18,flexWrap:"wrap"}}>
            <div style={{background:TK.panel,border:"1px solid "+TK.panelBorder,borderRadius:12,padding:"14px 18px",display:"flex",gap:20,alignItems:"end",flexWrap:"wrap"}}>
              <div><label style={{fontSize:10,color:TK.textMid,display:"block",marginBottom:3,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5}}>Dead Window</label><div style={{display:"flex",alignItems:"center",gap:6}}><input type="range" min={14} max={180} value={deadWindow} onChange={function(e){setDeadWindow(+e.target.value);}} style={{width:100}}/><span style={{fontFamily:F.mn,fontSize:13,fontWeight:700,color:TK.red}}>{deadWindow}d</span></div></div>
              <div><label style={{fontSize:10,color:TK.textMid,display:"block",marginBottom:3,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5}}>Decline %</label><div style={{display:"flex",alignItems:"center",gap:6}}><input type="range" min={20} max={80} value={declineThreshold} onChange={function(e){setDeclineThreshold(+e.target.value);}} style={{width:100}}/><span style={{fontFamily:F.mn,fontSize:13,fontWeight:700,color:TK.orange}}>{declineThreshold}%</span></div></div>
            </div>
            {[{l:"Dead Stock",v:deadStats.deadN,val:deadStats.deadV,c:TK.red,i:"💀"},{l:"Declining",v:deadStats.decN,val:deadStats.decV,c:TK.orange,i:"📉"},{l:"At-Risk Value",v:"$"+(deadStats.deadV+deadStats.decV).toLocaleString(),c:TK.red,i:"💰"}].map(function(s,i){return <div key={i} style={{background:TK.panel,border:"1px solid "+TK.panelBorder,borderRadius:12,padding:"14px 18px",minWidth:110,textAlign:"center"}}><div style={{fontSize:16,marginBottom:2}}>{s.i}</div><div style={{fontFamily:F.hd,fontSize:22,fontWeight:800,color:s.c}}>{s.v}</div><div style={{fontFamily:F.mn,fontSize:9,color:TK.textDim,textTransform:"uppercase",letterSpacing:0.5}}>{s.l}</div>{s.val!==undefined&&typeof s.val==="number"&&<div style={{fontFamily:F.mn,fontSize:10,color:s.c,marginTop:2}}>${s.val.toLocaleString()}</div>}</div>;})}
          </div>

          {[{risk:"Dead Stock",co:TK.red,desc:"No sales activity. Consider liquidation or write-off."},{risk:"Declining",co:TK.orange,desc:"Demand dropping. Reduce reorder quantities and consider promotions."},{risk:"Slow Moving",co:TK.yellow,desc:"Low steady movement. Monitor closely for further decline."}].map(function(g){
            var gi = deadData.filter(function(d){return d.risk===g.risk;});
            if(!gi.length) return null;
            return <div key={g.risk} style={{marginBottom:14,background:g.co+"10",borderRadius:12,overflow:"hidden",border:"1px solid "+g.co+"25"}}>
              <div style={{padding:"12px 18px",borderBottom:"1px solid "+g.co+"20"}}>
                <div style={{fontFamily:F.hd,fontSize:13,fontWeight:700,color:g.co}}>{g.risk} — {gi.length} items</div>
                <div style={{fontSize:11,color:TK.textMid,marginTop:2}}>{g.desc}</div>
              </div>
              <div style={{background:"rgba(12,15,22,0.6)"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                  <thead><tr>{["SKU","Name","Last Sold","Trend","Qty","Value at Risk","Action"].map(function(h){return <th key={h} style={{padding:"8px 14px",textAlign:"left",fontFamily:F.mn,fontSize:9,color:TK.textDim,letterSpacing:0.5,textTransform:"uppercase",borderBottom:"1px solid "+g.co+"15"}}>{h}</th>;})}</tr></thead>
                  <tbody>{gi.map(function(d){return <tr key={d.id} style={{borderBottom:"1px solid "+g.co+"10"}}>
                    <td style={{padding:"8px 14px",fontFamily:F.mn,fontSize:11,color:TK.textMid}}>{d.id}</td>
                    <td style={{padding:"8px 14px",fontWeight:600}}>{d.name}</td>
                    <td style={{padding:"8px 14px",fontFamily:F.mn,color:d.lastSold>30?TK.red:TK.textMid}}>{d.lastSold}d ago</td>
                    <td style={{padding:"8px 14px"}}>{d.isDec?<span style={{fontFamily:F.mn,fontSize:11,color:TK.orange}}>↓ {d.decPct}%</span>:d.isDead?<span style={{fontFamily:F.mn,fontSize:11,color:TK.red}}>No movement</span>:<span style={{fontFamily:F.mn,fontSize:11,color:TK.yellow}}>Slow</span>}</td>
                    <td style={{padding:"8px 14px",fontFamily:F.mn}}>{d.qtyOnHand.toLocaleString()}</td>
                    <td style={{padding:"8px 14px",fontFamily:F.mn,fontWeight:700,color:g.co}}>${d.invValue.toLocaleString()}</td>
                    <td style={{padding:"8px 14px",fontSize:12,fontWeight:600,color:TK.teal}}>{d.isDead?"Liquidate / Write off":d.isDec?"Reduce orders, promote":"Monitor, lower ROP"}</td>
                  </tr>;})}</tbody>
                </table>
              </div>
            </div>;
          })}

          {deadData.filter(function(d){return d.risk==="Active";}).length>0 && (
            <div style={{background:TK.green+"12",borderRadius:12,padding:"14px 18px",border:"1px solid "+TK.green+"25"}}>
              <div style={{fontFamily:F.hd,fontSize:13,fontWeight:700,color:TK.green}}>✅ {deadData.filter(function(d){return d.risk==="Active";}).length} SKUs are actively selling with healthy demand.</div>
            </div>
          )}
        </div>)}
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════
   DEMAND FORECASTING
   ══════════════════════════════════════════════════════════════ */
var DF_MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var DF_SAMPLE = [
  {id:"SKU-1001",name:"Widget A",category:"Electronics",unitCost:12.50,history:[380,320,360,345,310,390,370,340,355,365,350,330,390,335,365,350,325,400,380,350,360,375,355,340]},
  {id:"SKU-1002",name:"Bracket B",category:"Hardware",unitCost:3.20,history:[185,200,195,180,190,210,195,188,192,205,198,185,190,205,200,185,195,215,200,192,197,210,203,190]},
  {id:"SKU-1003",name:"Seal Kit C",category:"Hardware",unitCost:8.75,history:[60,55,52,48,45,40,38,35,30,28,25,22,20,18,16,14,12,10,9,8,7,6,5,4]},
  {id:"SKU-1004",name:"Motor D",category:"Electronics",unitCost:145.00,history:[45,42,38,44,40,48,43,46,41,47,44,42,48,44,40,46,42,50,45,48,43,49,46,44]},
  {id:"SKU-1005",name:"Filter E",category:"Consumables",unitCost:4.50,history:[95,100,98,92,96,105,100,97,94,102,99,95,98,103,101,95,99,108,103,100,97,105,102,98]},
  {id:"SKU-1006",name:"Valve F",category:"Hardware",unitCost:22.00,history:[240,280,220,300,250,210,290,260,230,270,285,245,255,295,225,310,260,220,300,270,240,280,290,250]},
  {id:"SKU-1007",name:"Hose G",category:"Consumables",unitCost:6.80,history:[150,160,170,175,180,185,190,195,200,205,210,215,220,225,230,235,240,245,250,255,260,265,270,275]},
  {id:"SKU-1008",name:"Panel H",category:"Electronics",unitCost:210.00,history:[3,2,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0]},
  {id:"SKU-1009",name:"Clip Set I",category:"Hardware",unitCost:1.20,history:[500,510,495,520,505,530,515,508,498,525,512,502,515,525,505,535,520,545,530,522,512,540,527,516]},
  {id:"SKU-1010",name:"Pump J",category:"Equipment",unitCost:380.00,history:[5,4,3,5,4,6,4,3,5,4,5,3,4,5,3,6,4,5,3,4,5,4,3,5]},
  {id:"SKU-1011",name:"Gasket K",category:"Consumables",unitCost:0.90,history:[310,325,320,315,330,340,328,322,318,335,326,319,325,340,335,320,335,345,333,327,323,340,331,324]},
  {id:"SKU-1012",name:"Relay L",category:"Electronics",unitCost:18.50,history:[120,180,90,200,110,160,140,85,190,95,170,130,125,185,95,205,115,165,145,90,195,100,175,135]},
  {id:"SKU-1013",name:"Bearing M",category:"Hardware",unitCost:7.60,history:[180,185,190,195,200,205,210,215,220,225,230,235,238,242,246,250,254,258,262,266,270,274,278,282]},
  {id:"SKU-1014",name:"Sensor P",category:"Electronics",unitCost:28.00,history:[300,420,280,450,350,390,310,480,340,400,290,370,320,440,295,460,360,400,325,490,350,410,305,380]},
  {id:"SKU-1015",name:"Lubricant R",category:"Consumables",unitCost:9.20,history:[120,115,110,105,100,95,90,85,80,75,70,65,60,58,55,52,50,48,45,43,40,38,36,34]},
  {id:"SKU-1016",name:"Fuse T",category:"Electronics",unitCost:0.45,history:[440,455,460,445,465,450,458,442,470,448,462,452,445,460,465,450,470,455,463,447,475,453,467,457]},
];

function dfForecast(history, horizonMonths) {
  var n = history.length;
  if (n < 3) return {trend:"insufficient",forecast:[],slope:0,avgDemand:0,cv:0,seasonality:[],confidence:[]};
  var avg = history.reduce(function(s,v){return s+v;},0)/n;
  var stdDev = Math.sqrt(history.reduce(function(s,v){return s+Math.pow(v-avg,2);},0)/n);
  var cv = avg > 0 ? Math.round(stdDev/avg*100)/100 : 999;
  var sumX=0,sumY=0,sumXY=0,sumX2=0;
  for(var i=0;i<n;i++){sumX+=i;sumY+=history[i];sumXY+=i*history[i];sumX2+=i*i;}
  var slope=(n*sumXY-sumX*sumY)/(n*sumX2-sumX*sumX);
  var intercept=(sumY-slope*sumX)/n;
  var trendPct=avg>0?(slope*n)/avg*100:0;
  var trend=Math.abs(trendPct)<10?"stable":trendPct>0?"growing":"declining";
  if(cv>0.8)trend="erratic";
  var last6=history.slice(-6);var last6a=last6.reduce(function(s,v){return s+v;},0)/last6.length;
  if(last6a<1&&avg<2)trend="dead";
  var seasonality=[];
  if(n>=12){for(var m=0;m<12;m++){var mv=[];for(var j=m;j<n;j+=12)mv.push(history[j]);var ma2=mv.reduce(function(s,v){return s+v;},0)/mv.length;seasonality.push(avg>0?Math.round(ma2/avg*100)/100:1);}}
  else seasonality=Array(12).fill(1);
  var fc=[],conf=[];var lastMonth=n%12;
  for(var f=0;f<horizonMonths;f++){var tv=intercept+slope*(n+f);var si=(lastMonth+f)%12;var sf=seasonality[si];var pred=Math.max(0,Math.round(tv*sf));var ciW=stdDev*(1+f*0.15);fc.push(pred);conf.push({lower:Math.max(0,Math.round(pred-1.96*ciW)),upper:Math.round(pred+1.96*ciW)});}
  return {trend:trend,forecast:fc,slope:Math.round(slope*100)/100,avgDemand:Math.round(avg),cv:cv,seasonality:seasonality,confidence:conf,stdDev:Math.round(stdDev),trendPct:Math.round(trendPct)};
}

function DFFlow(props) {
  var onHome = props.onHome;
  var phSt = useState("landing"); var phase = phSt[0]; var setPhase = phSt[1];
  var items = DF_SAMPLE;
  var st1 = useState(items[0].id); var selectedId = st1[0]; var setSelectedId = st1[1];
  var st2 = useState(6); var horizon = st2[0]; var setHorizon = st2[1];
  var st3 = useState("trend"); var sortBy = st3[0]; var setSortBy = st3[1];
  useEffect(function(){ window.scrollTo(0, 0); }, [phase]);

  var selected = items.find(function(i2){return i2.id===selectedId;})||items[0];
  var allFc = useMemo(function(){
    return items.map(function(item){var fc=dfForecast(item.history,horizon);var nxt=fc.forecast.length>0?fc.forecast[0]:0;var last=item.history[item.history.length-1];var chg=last>0?Math.round((nxt-last)/last*100):0;return Object.assign({},item,fc,{nextFc:nxt,changePct:chg});});
  },[items,horizon]);
  var sorted = useMemo(function(){
    return allFc.slice().sort(function(a,b){if(sortBy==="trend"){var o={growing:0,stable:1,erratic:2,declining:3,dead:4};return(o[a.trend]||5)-(o[b.trend]||5);}if(sortBy==="change")return b.changePct-a.changePct;return b.avgDemand-a.avgDemand;});
  },[allFc,sortBy]);
  var selFc = allFc.find(function(f){return f.id===selectedId;})||allFc[0];
  var chartData = useMemo(function(){
    var data2=[]; var h=selected.history; var showH=Math.min(h.length,18); var hs=h.length-showH;
    for(var i=hs;i<h.length;i++) data2.push({month:DF_MONTHS[i%12]+(i<12?" Y1":" Y2"),actual:h[i]});
    var lm=(h.length-1)%12;
    for(var f2=0;f2<selFc.forecast.length;f2++){var fi=(lm+1+f2)%12;data2.push({month:DF_MONTHS[fi]+" (fc)",forecast:selFc.forecast[f2],upper:selFc.confidence[f2]?selFc.confidence[f2].upper:null,lower:selFc.confidence[f2]?selFc.confidence[f2].lower:null});}
    if(data2.length>showH&&data2[showH-1])data2[showH-1].forecast=data2[showH-1].actual;
    return data2;
  },[selFc,selected]);
  var trendCounts = useMemo(function(){var c={growing:0,stable:0,declining:0,erratic:0,dead:0};allFc.forEach(function(f){c[f.trend]=(c[f.trend]||0)+1;});return c;},[allFc]);
  var tColor = selFc.trend==="growing"?"#4ade80":selFc.trend==="stable"?"#2dd4bf":selFc.trend==="declining"?"#fb923c":selFc.trend==="erratic"?"#facc15":"#f87171";

  if (phase === "landing") { return (
    <div style={{minHeight:"100vh",background:"#0c0f16",fontFamily:F.sans,color:"#dce1ea"}}>
      <link href={FONTS} rel="stylesheet" />
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(12,15,22,0.8)",backdropFilter:"blur(20px)",borderBottom:"1px solid #1e2433"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 40px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center"}}>
          <button onClick={onHome} style={{background:"transparent",border:"none",color:"#4a5168",cursor:"pointer",fontSize:12,marginRight:12}}>← Home</button>
          <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={onHome}><div style={{width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,#818cf8,#6366f1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:800}}>📈</div><span style={{fontFamily:F.hd,fontSize:18,fontWeight:800}}>Demand <span style={{color:"#818cf8"}}>Forecast</span></span></div>
          </div>
          <button onClick={function(){setPhase("onboard");}} style={{fontSize:13,fontWeight:700,color:"#fff",background:"#818cf8",padding:"8px 22px",borderRadius:8,border:"none",cursor:"pointer"}}>Get Started</button>
        </div>
      </nav>
      <section style={{padding:"160px 40px 60px",maxWidth:1100,margin:"0 auto"}}>
        <Reveal><h1 style={{fontFamily:F.hd,fontSize:"clamp(40px,5.5vw,64px)",fontWeight:900,lineHeight:1.06,letterSpacing:"-0.04em",margin:"0 0 24px"}}>See what's coming<br/><span style={{color:"#818cf8"}}>before it arrives.</span></h1></Reveal>
        <Reveal delay={0.1}><p style={{fontSize:18,color:"#7d8598",lineHeight:1.7,margin:"0 0 36px",maxWidth:520}}>Uses 24 months of history to project demand 3-12 months out — with trend detection, seasonality decomposition, and confidence intervals.</p></Reveal>
        <Reveal delay={0.2}><button onClick={function(){setPhase("onboard");}} style={{fontSize:16,fontWeight:700,color:"#fff",background:"#818cf8",padding:"14px 32px",borderRadius:10,border:"none",cursor:"pointer",boxShadow:"0 4px 24px rgba(129,140,248,0.2)"}}>Launch Forecasting →</button></Reveal>
      </section>
      <section style={{padding:"40px 40px 80px",maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:12}}>
          {[{icon:"📊",title:"Trend Detection",desc:"Growing, stable, declining, erratic, or dead — classified with exact trend percentages.",color:"#4ade80"},{icon:"🌡️",title:"Seasonality",desc:"12-month seasonal index showing peak and slow months from historical patterns.",color:"#facc15"},{icon:"📐",title:"Confidence Bands",desc:"95% intervals that widen with forecast horizon so you know how far to trust each number.",color:"#818cf8"},{icon:"🔮",title:"SKU Comparison",desc:"Sort all SKUs by trend, change %, or demand. Click any for full detail with charts.",color:"#60a5fa"}].map(function(f2,i){return <Reveal key={f2.title} delay={i*0.08}><div style={{background:"#131720",border:"1px solid #1e2433",borderRadius:14,padding:"24px 18px",borderTop:"3px solid "+f2.color}}>
            <div style={{fontSize:24,marginBottom:10}}>{f2.icon}</div>
            <h3 style={{fontFamily:F.hd,fontSize:14,fontWeight:700,color:f2.color,margin:"0 0 6px"}}>{f2.title}</h3>
            <p style={{fontSize:12,color:"#7d8598",lineHeight:1.5,margin:0}}>{f2.desc}</p>
          </div></Reveal>;})}
        </div>
      </section>
      <section style={{padding:"20px 40px 80px",textAlign:"center"}}><Reveal><button onClick={function(){setPhase("onboard");}} style={{fontSize:16,fontWeight:700,color:"#fff",background:"#818cf8",padding:"16px 40px",borderRadius:12,border:"none",cursor:"pointer"}}>Get Started →</button></Reveal></section>
    </div>
  ); }

  if (phase === "onboard") { return (
    <div style={{minHeight:"100vh",background:"#0c0f16",fontFamily:F.sans,color:"#dce1ea"}}>
      <link href={FONTS} rel="stylesheet" />
      <div style={{maxWidth:680,margin:"0 auto",padding:"40px 32px"}}>
        <button onClick={onHome} style={{background:"transparent",border:"none",color:"#4a5168",cursor:"pointer",fontSize:12,marginBottom:20}}>← Home</button>
        <div style={{fontSize:42,marginBottom:14}}>📈</div>
        <h2 style={{fontFamily:F.hd,fontSize:26,fontWeight:800,margin:"0 0 8px"}}>Demand Forecasting</h2>
        <p style={{fontSize:15,color:"#7d8598",lineHeight:1.7,margin:"0 0 28px"}}>Project demand 3-12 months into the future using trend analysis, seasonality detection, and confidence intervals.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:24}}>
          {[{icon:"📊",title:"Trend Detection",desc:"Linear regression classifies each SKU as growing, stable, declining, erratic, or dead — with exact trend percentages."},{icon:"🌡️",title:"Seasonality Index",desc:"Decomposes 24 months of history into a 12-month seasonal pattern showing peak and slow months."},{icon:"📐",title:"Confidence Intervals",desc:"95% confidence bands that widen with forecast horizon — so you know how much to trust each projection."},{icon:"🔮",title:"Multi-SKU Comparison",desc:"Side-by-side SKU list sorted by trend, change %, or demand. Click any SKU for full detail view."}].map(function(f){
            return <div key={f.title} style={{background:"#131720",border:"1px solid #1e2433",borderRadius:12,padding:"16px 14px"}}><div style={{fontSize:22,marginBottom:8}}>{f.icon}</div><div style={{fontFamily:F.hd,fontSize:13,fontWeight:700,color:"#818cf8",marginBottom:6}}>{f.title}</div><p style={{fontSize:12,color:"#7d8598",lineHeight:1.5,margin:0}}>{f.desc}</p></div>;
          })}
        </div>
        <div style={{background:"#181d28",border:"1px solid #1e2433",borderRadius:12,padding:"16px 20px",marginBottom:24}}>
          <div style={{fontFamily:F.mn,fontSize:10,color:"#4a5168",letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>WHAT YOU'LL NEED</div>
          <div style={{fontSize:13,color:"#7d8598",lineHeight:1.8}}>Ideally 12-24 months of monthly demand data per SKU. The demo loads 16 SKUs with 24 months of history covering growing, stable, declining, erratic, and dead demand patterns.</div>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:10}}>
          <label style={{fontSize:12,color:"#7d8598",alignSelf:"center"}}>Forecast Horizon:</label>
          <input type="range" min={3} max={12} value={horizon} onChange={function(e){setHorizon(+e.target.value);}} style={{width:120,accentColor:"#818cf8"}}/>
          <span style={{fontFamily:F.mn,fontSize:16,fontWeight:700,color:"#818cf8"}}>{horizon} months</span>
        </div>
        <button onClick={function(){setPhase("dash");}} style={{width:"100%",padding:"14px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#818cf8,#6366f1)",color:"#fff",cursor:"pointer",fontFamily:F.hd,fontSize:15,fontWeight:700,marginTop:16}}>Launch Forecasting Engine →</button>
      </div>
    </div>
  ); }

  var DFC = {indigo:"#818cf8",teal:"#2dd4bf"};

  return (
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:F.sans,color:C.text}}>
      <link href={FONTS} rel="stylesheet" />
      <style>{`input[type=range]{accent-color:#818cf8}`}</style>
      <header style={{background:C.panel,borderBottom:"1px solid "+C.panelBorder,padding:"14px 24px"}}>
        <div style={{maxWidth:1400,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <button onClick={onHome} style={{background:"transparent",border:"none",color:C.textDim,cursor:"pointer",fontSize:12}}>← Home</button>
            <div style={{width:34,height:34,borderRadius:10,background:"linear-gradient(135deg,#818cf8,#6366f1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:800}}>📈</div>
            <div><h1 style={{fontFamily:F.hd,fontSize:17,fontWeight:800,margin:0}}>Demand Forecasting</h1><p style={{fontFamily:F.mn,fontSize:10,color:C.textDim,margin:0}}>{items.length} SKUs · {horizon}-MONTH HORIZON</p></div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:11,color:C.textMid}}>Horizon</span>
            <input type="range" min={3} max={12} value={horizon} onChange={function(e){setHorizon(+e.target.value);}} style={{width:100}}/>
            <span style={{fontFamily:F.mn,fontSize:14,fontWeight:700,color:"#818cf8"}}>{horizon} mo</span>
          </div>
        </div>
      </header>

      {/* Trend bar */}
      <div style={{background:C.bg,padding:"10px 24px",borderBottom:"1px solid "+C.panelBorder}}>
        <div style={{maxWidth:1400,margin:"0 auto",display:"flex",gap:10,flexWrap:"wrap"}}>
          {[{l:"Growing",v:trendCounts.growing,c:C.green,i:"📈"},{l:"Stable",v:trendCounts.stable,c:"#2dd4bf",i:"➡️"},{l:"Erratic",v:trendCounts.erratic,c:C.yellow,i:"⚡"},{l:"Declining",v:trendCounts.declining,c:C.orange,i:"📉"},{l:"Dead",v:trendCounts.dead,c:C.red,i:"💀"}].map(function(s){
            return <div key={s.l} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 12px",borderRadius:8,background:s.v>0?s.c+"12":"transparent",border:"1px solid "+(s.v>0?s.c+"25":C.panelBorder)}}><span style={{fontSize:12}}>{s.i}</span><span style={{fontFamily:F.hd,fontSize:16,fontWeight:800,color:s.v>0?s.c:C.textDim}}>{s.v}</span><span style={{fontFamily:F.mn,fontSize:9,color:C.textDim}}>{s.l}</span></div>;
          })}
        </div>
      </div>

      <div style={{maxWidth:1400,margin:"0 auto",padding:"20px 24px",display:"flex",gap:16}}>
        {/* SKU list */}
        <div style={{width:300,flexShrink:0,maxHeight:"calc(100vh - 220px)",overflow:"auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
            <span style={{fontFamily:F.mn,fontSize:9,color:C.textDim,letterSpacing:1,textTransform:"uppercase"}}>ALL SKUS</span>
            <select value={sortBy} onChange={function(e){setSortBy(e.target.value);}} style={{background:C.surface,color:C.text,border:"1px solid "+C.panelBorder,borderRadius:5,padding:"2px 6px",fontFamily:F.mn,fontSize:9,outline:"none"}}><option value="trend">Trend</option><option value="change">Change %</option><option value="demand">Demand</option></select>
          </div>
          {sorted.map(function(item){
            var isSel=item.id===selectedId;
            var tc2=item.trend==="growing"?C.green:item.trend==="stable"?"#2dd4bf":item.trend==="declining"?C.orange:item.trend==="erratic"?C.yellow:C.red;
            return <div key={item.id} onClick={function(){setSelectedId(item.id);}} style={{padding:"10px 12px",borderRadius:10,marginBottom:3,cursor:"pointer",background:isSel?"#818cf815":"transparent",border:"1px solid "+(isSel?"#818cf840":"transparent")}}
              onMouseEnter={function(e){if(!isSel)e.currentTarget.style.background=C.surface;}} onMouseLeave={function(e){if(!isSel)e.currentTarget.style.background=isSel?"#818cf815":"transparent";}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                <span style={{fontWeight:600,fontSize:13}}>{item.name}</span>
                <Badge color={tc2}>{item.trend}</Badge>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",fontFamily:F.mn,fontSize:10,color:C.textMid}}>
                <span>Avg: {item.avgDemand}/mo</span>
                <span>Next: <span style={{color:tc2,fontWeight:700}}>{item.nextFc}</span></span>
                <span style={{color:item.changePct>0?C.green:item.changePct<-10?C.red:C.textDim}}>{item.changePct>0?"+":""}{item.changePct}%</span>
              </div>
            </div>;
          })}
        </div>

        {/* Detail */}
        <div style={{flex:1}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div><h2 style={{fontFamily:F.hd,fontSize:18,fontWeight:800,margin:"0 0 3px"}}>{selected.name}</h2><div style={{fontFamily:F.mn,fontSize:11,color:C.textMid}}>{selected.id} · {selected.category}</div></div>
            <div style={{display:"flex",gap:8}}>
              {[{l:"Avg",v:selFc.avgDemand+"/mo",c:C.text},{l:"Trend",v:(selFc.trendPct>0?"+":"")+selFc.trendPct+"%",c:tColor},{l:"CV",v:selFc.cv.toString(),c:selFc.cv>0.8?C.red:selFc.cv>0.5?C.yellow:C.green}].map(function(s,i){return <div key={i} style={{textAlign:"center",padding:"6px 12px",borderRadius:8,background:C.panel,border:"1px solid "+C.panelBorder}}><div style={{fontFamily:F.hd,fontSize:15,fontWeight:800,color:s.c}}>{s.v}</div><div style={{fontFamily:F.mn,fontSize:8,color:C.textDim,textTransform:"uppercase"}}>{s.l}</div></div>;})}
            </div>
          </div>

          {/* Chart */}
          <div style={{background:C.panel,border:"1px solid "+C.panelBorder,borderRadius:14,padding:"18px 18px 10px",marginBottom:14}}>
            <div style={{fontFamily:F.hd,fontSize:13,fontWeight:700,marginBottom:12}}>History & {horizon}-Month Forecast</div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.panelBorder}/>
                <XAxis dataKey="month" tick={{fontFamily:F.mn,fontSize:8,fill:C.textDim}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontFamily:F.mn,fontSize:8,fill:C.textDim}} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{background:C.panel,border:"1px solid "+C.panelBorder,borderRadius:8,fontFamily:F.bd,fontSize:12}}/>
                <Area type="monotone" dataKey="upper" stroke="none" fill="#818cf8" fillOpacity={0.08} name="Upper"/>
                <Area type="monotone" dataKey="lower" stroke="none" fill={C.bg} fillOpacity={1} name="Lower"/>
                <Line type="monotone" dataKey="actual" stroke={DFC.teal} strokeWidth={2.5} dot={{r:3,fill:DFC.teal}} name="Actual" connectNulls={false}/>
                <Line type="monotone" dataKey="forecast" stroke={DFC.indigo} strokeWidth={2.5} strokeDasharray="6 4" dot={{r:3,fill:DFC.indigo}} name="Forecast" connectNulls={false}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Forecast table */}
          <div style={{background:C.panel,border:"1px solid "+C.panelBorder,borderRadius:14,padding:"14px 16px"}}>
            <div style={{fontFamily:F.hd,fontSize:13,fontWeight:700,marginBottom:10}}>Forecast Detail</div>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr>{["Month","Forecast","Lower","Upper","Range"].map(function(h){return <th key={h} style={{padding:"6px 8px",textAlign:"left",fontFamily:F.mn,fontSize:9,color:C.textDim,borderBottom:"1px solid "+C.panelBorder,textTransform:"uppercase"}}>{h}</th>;})}</tr></thead>
              <tbody>{selFc.forecast.map(function(val,i){
                var mi=((selected.history.length-1)%12+1+i)%12;var ci=selFc.confidence[i]||{lower:0,upper:0};
                return <tr key={i} style={{borderBottom:"1px solid "+C.panelBorder}}>
                  <td style={{padding:"6px 8px",fontFamily:F.mn,color:C.textMid}}>{DF_MONTHS[mi]}</td>
                  <td style={{padding:"6px 8px",fontFamily:F.mn,fontWeight:700,color:"#818cf8"}}>{val.toLocaleString()}</td>
                  <td style={{padding:"6px 8px",fontFamily:F.mn,color:C.textDim}}>{ci.lower.toLocaleString()}</td>
                  <td style={{padding:"6px 8px",fontFamily:F.mn,color:C.textDim}}>{ci.upper.toLocaleString()}</td>
                  <td style={{padding:"6px 8px",fontFamily:F.mn,fontSize:10,color:C.textDim}}>±{Math.round((ci.upper-ci.lower)/2)}</td>
                </tr>;
              })}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════
   ORDER WAVE PLANNER
   ══════════════════════════════════════════════════════════════ */
var WP_ZONE_COLORS = {A:"#2dd4bf",B:"#f59e0b",C:"#818cf8"};
var WP_SKUS = [
  {id:"SKU-1001",name:"Widget A",aisle:12,bay:5,zone:"A"},{id:"SKU-1002",name:"Bracket B",aisle:14,bay:12,zone:"A"},
  {id:"SKU-1003",name:"Seal Kit C",aisle:18,bay:8,zone:"B"},{id:"SKU-1004",name:"Motor D",aisle:22,bay:3,zone:"C"},
  {id:"SKU-1005",name:"Filter E",aisle:11,bay:15,zone:"A"},{id:"SKU-1006",name:"Valve F",aisle:16,bay:22,zone:"B"},
  {id:"SKU-1007",name:"Hose G",aisle:13,bay:9,zone:"A"},{id:"SKU-1008",name:"Panel H",aisle:24,bay:2,zone:"C"},
  {id:"SKU-1009",name:"Clip Set I",aisle:11,bay:7,zone:"A"},{id:"SKU-1010",name:"Pump J",aisle:20,bay:18,zone:"C"},
  {id:"SKU-1011",name:"Gasket K",aisle:12,bay:20,zone:"A"},{id:"SKU-1012",name:"Relay L",aisle:15,bay:4,zone:"B"},
  {id:"SKU-1013",name:"Bearing M",aisle:17,bay:11,zone:"B"},{id:"SKU-1014",name:"Cable N",aisle:19,bay:6,zone:"B"},
  {id:"SKU-1015",name:"Sensor P",aisle:21,bay:14,zone:"C"},{id:"SKU-1016",name:"Fuse T",aisle:11,bay:3,zone:"A"},
  {id:"SKU-1017",name:"Coupling U",aisle:23,bay:10,zone:"C"},{id:"SKU-1018",name:"Lube R",aisle:13,bay:16,zone:"A"},
  {id:"SKU-1019",name:"Fitting Q",aisle:16,bay:8,zone:"B"},{id:"SKU-1020",name:"Wrench O",aisle:20,bay:5,zone:"C"},
];

function wpGenerateOrders() {
  var orders=[];
  for(var i=0;i<48;i++){var lc=1+Math.floor(Math.random()*6);var lines=[];var used=new Set();
    for(var l=0;l<lc;l++){var sku;do{sku=WP_SKUS[Math.floor(Math.random()*WP_SKUS.length)];}while(used.has(sku.id)&&used.size<WP_SKUS.length);used.add(sku.id);var qty=1+Math.floor(Math.random()*10);lines.push(Object.assign({},sku,{qty:qty,travelDist:Math.abs(sku.aisle-11)*40+sku.bay*8}));}
    var tt=lines.reduce(function(s,ll){return s+ll.travelDist;},0);var zones={};lines.forEach(function(ll){zones[ll.zone]=true;});
    orders.push({id:"ORD-"+(10001+i),lines:lines,lineCount:lc,totalPicks:lines.reduce(function(s,ll){return s+ll.qty;},0),totalTravel:tt,zones:Object.keys(zones),primaryZone:lines.sort(function(a,b){return a.travelDist-b.travelDist;})[0].zone,aisles:lines.map(function(ll){return ll.aisle;}).filter(function(v,idx,arr){return arr.indexOf(v)===idx;})});
  }
  return orders;
}

function wpPlanWaves(orders,maxPicks,maxOrders,strategy) {
  var sorted;
  if(strategy==="zone")sorted=orders.slice().sort(function(a,b){if(a.primaryZone!==b.primaryZone)return a.primaryZone<b.primaryZone?-1:1;return a.totalTravel-b.totalTravel;});
  else if(strategy==="travel")sorted=orders.slice().sort(function(a,b){return a.totalTravel-b.totalTravel;});
  else sorted=orders.slice().sort(function(a,b){return b.lineCount-a.lineCount;});
  var waves=[]; var cur={orders:[],picks:0,travel:0,zones:{}};
  sorted.forEach(function(order){
    if(cur.picks+order.totalPicks>maxPicks||cur.orders.length>=maxOrders){if(cur.orders.length>0)waves.push(cur);cur={orders:[],picks:0,travel:0,zones:{}};}
    cur.orders.push(order);cur.picks+=order.totalPicks;cur.travel+=order.totalTravel;order.zones.forEach(function(z){cur.zones[z]=(cur.zones[z]||0)+1;});
  });
  if(cur.orders.length>0)waves.push(cur);
  return waves.map(function(w,i){var zl=Object.keys(w.zones).sort();var aisles={};w.orders.forEach(function(o){o.aisles.forEach(function(a){aisles[a]=(aisles[a]||0)+1;});});var ua=Object.keys(aisles).length;
    return{id:"Wave "+(i+1),num:i+1,orders:w.orders,orderCount:w.orders.length,picks:w.picks,totalLines:w.orders.reduce(function(s,o){return s+o.lineCount;},0),travel:w.travel,zones:zl,zoneMap:w.zones,uniqueAisles:ua};
  });
}

function WPFlow(props) {
  var onHome = props.onHome;
  var phSt = useState("landing"); var phase = phSt[0]; var setPhase = phSt[1];
  var ordersInit = useMemo(function(){return wpGenerateOrders();},[]);
  var st1 = useState(ordersInit); var orders = st1[0];
  var st2 = useState(80); var maxPicks = st2[0]; var setMaxPicks = st2[1];
  var st3 = useState(15); var maxOrders = st3[0]; var setMaxOrders = st3[1];
  var st4 = useState("zone"); var strategy = st4[0]; var setStrategy = st4[1];
  var st5 = useState(null); var selectedWave = st5[0]; var setSelectedWave = st5[1];
  useEffect(function(){ window.scrollTo(0, 0); }, [phase]);

  var waves = useMemo(function(){return wpPlanWaves(orders,maxPicks,maxOrders,strategy);},[orders,maxPicks,maxOrders,strategy]);
  var stats = useMemo(function(){var tp=waves.reduce(function(s,w){return s+w.picks;},0);var tt=waves.reduce(function(s,w){return s+w.travel;},0);return{totalPicks:tp,totalTravel:tt,avgPicks:waves.length>0?Math.round(tp/waves.length):0,avgAisles:waves.length>0?(waves.reduce(function(s,w){return s+w.uniqueAisles;},0)/waves.length).toFixed(1):"0",waveCount:waves.length};},[waves]);
  var waveChart = useMemo(function(){return waves.map(function(w){return{name:"W"+w.num,picks:w.picks,orders:w.orderCount};});},[waves]);
  var selWave = selectedWave!==null?waves[selectedWave]:null;

  if (phase === "landing") { return (
    <div style={{minHeight:"100vh",background:"#0c0f16",fontFamily:F.sans,color:"#dce1ea"}}>
      <link href={FONTS} rel="stylesheet" />
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(12,15,22,0.8)",backdropFilter:"blur(20px)",borderBottom:"1px solid #1e2433"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 40px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center"}}>
          <button onClick={onHome} style={{background:"transparent",border:"none",color:"#4a5168",cursor:"pointer",fontSize:12,marginRight:12}}>← Home</button>
          <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={onHome}><div style={{width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,#f59e0b,#d97706)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:800}}>🌊</div><span style={{fontFamily:F.hd,fontSize:18,fontWeight:800}}>Wave<span style={{color:"#f59e0b"}}>Plan</span></span></div>
          </div>
          <button onClick={function(){setPhase("onboard");}} style={{fontSize:13,fontWeight:700,color:"#fff",background:"#f59e0b",padding:"8px 22px",borderRadius:8,border:"none",cursor:"pointer"}}>Get Started</button>
        </div>
      </nav>
      <section style={{padding:"160px 40px 60px",maxWidth:1100,margin:"0 auto"}}>
        <Reveal><h1 style={{fontFamily:F.hd,fontSize:"clamp(40px,5.5vw,64px)",fontWeight:900,lineHeight:1.06,letterSpacing:"-0.04em",margin:"0 0 24px"}}>Smarter waves.<br/><span style={{color:"#f59e0b"}}>Shorter walks.</span></h1></Reveal>
        <Reveal delay={0.1}><p style={{fontSize:18,color:"#7d8598",lineHeight:1.7,margin:"0 0 36px",maxWidth:520}}>Group orders into optimized pick waves by zone proximity, travel distance, or line density — minimizing picker movement and maximizing throughput.</p></Reveal>
        <Reveal delay={0.2}><button onClick={function(){setPhase("onboard");}} style={{fontSize:16,fontWeight:700,color:"#fff",background:"#f59e0b",padding:"14px 32px",borderRadius:10,border:"none",cursor:"pointer",boxShadow:"0 4px 24px rgba(245,158,11,0.2)"}}>Plan Your Waves →</button></Reveal>
      </section>
      <section style={{padding:"40px 40px 80px",maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
          {[{icon:"🗺️",title:"By Zone",desc:"Groups orders by primary warehouse zone first, then by travel distance within each zone. Keeps pickers in concentrated areas.",color:"#2dd4bf"},{icon:"🦶",title:"By Travel",desc:"Sorts all orders by total travel distance, nearest-first. Minimizes total walking distance across every wave.",color:"#f59e0b"},{icon:"📦",title:"By Lines",desc:"Prioritizes high-line orders so each wave maximizes picks. Best for throughput when travel is secondary.",color:"#818cf8"}].map(function(f2,i){return <Reveal key={f2.title} delay={i*0.1}><div style={{background:"#131720",border:"1px solid #1e2433",borderRadius:16,padding:"28px 22px",borderTop:"3px solid "+f2.color}}>
            <div style={{fontSize:28,marginBottom:12}}>{f2.icon}</div>
            <h3 style={{fontFamily:F.hd,fontSize:16,fontWeight:700,color:f2.color,margin:"0 0 8px"}}>{f2.title}</h3>
            <p style={{fontSize:13,color:"#7d8598",lineHeight:1.6,margin:0}}>{f2.desc}</p>
          </div></Reveal>;})}
        </div>
      </section>
      <section style={{padding:"20px 40px 80px",textAlign:"center"}}><Reveal><button onClick={function(){setPhase("onboard");}} style={{fontSize:16,fontWeight:700,color:"#fff",background:"#f59e0b",padding:"16px 40px",borderRadius:12,border:"none",cursor:"pointer"}}>Get Started →</button></Reveal></section>
    </div>
  ); }

  if (phase === "onboard") { return (
    <div style={{minHeight:"100vh",background:"#0c0f16",fontFamily:F.sans,color:"#dce1ea"}}>
      <link href={FONTS} rel="stylesheet" />
      <div style={{maxWidth:680,margin:"0 auto",padding:"40px 32px"}}>
        <button onClick={function(){setPhase("landing");}} style={{background:"transparent",border:"none",color:"#4a5168",cursor:"pointer",fontSize:12,marginBottom:20}}>← Back to WavePlan</button>
        <div style={{fontSize:42,marginBottom:14}}>🌊</div>
        <h2 style={{fontFamily:F.hd,fontSize:26,fontWeight:800,margin:"0 0 8px"}}>Order Wave Planner</h2>
        <p style={{fontSize:15,color:"#7d8598",lineHeight:1.7,margin:"0 0 28px"}}>Group orders into optimized pick waves that minimize travel distance and maximize picks per trip.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:24}}>
          {[{icon:"🗺️",title:"By Zone",desc:"Groups orders by warehouse zone to keep pickers in concentrated areas.",color:"#2dd4bf"},{icon:"🦶",title:"By Travel",desc:"Sorts orders by total travel distance — nearest locations first.",color:"#f59e0b"},{icon:"📦",title:"By Lines",desc:"Prioritizes high-line orders for maximum picks per wave.",color:"#818cf8"}].map(function(s){
            return <div key={s.title} style={{background:"#131720",border:"1px solid #1e2433",borderRadius:12,padding:"16px 14px",borderTop:"3px solid "+s.color}}><div style={{fontSize:22,marginBottom:8}}>{s.icon}</div><div style={{fontFamily:F.hd,fontSize:12,fontWeight:700,color:s.color,marginBottom:6}}>{s.title}</div><p style={{fontSize:11,color:"#7d8598",lineHeight:1.5,margin:0}}>{s.desc}</p></div>;
          })}
        </div>
        <div style={{background:"#131720",border:"1px solid #1e2433",borderRadius:12,padding:"16px 20px",marginBottom:24}}>
          <div style={{fontFamily:F.mn,fontSize:10,color:"#4a5168",letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>CONFIGURE WAVE LIMITS</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            <div><label style={{fontSize:12,color:"#7d8598",display:"block",marginBottom:6}}>Max Picks per Wave</label><div style={{display:"flex",alignItems:"center",gap:8}}><input type="range" min={20} max={200} step={10} value={maxPicks} onChange={function(e){setMaxPicks(+e.target.value);}} style={{flex:1,accentColor:"#f59e0b"}}/><span style={{fontFamily:F.mn,fontSize:16,fontWeight:700,color:"#f59e0b"}}>{maxPicks}</span></div></div>
            <div><label style={{fontSize:12,color:"#7d8598",display:"block",marginBottom:6}}>Max Orders per Wave</label><div style={{display:"flex",alignItems:"center",gap:8}}><input type="range" min={5} max={30} value={maxOrders} onChange={function(e){setMaxOrders(+e.target.value);}} style={{flex:1,accentColor:"#f59e0b"}}/><span style={{fontFamily:F.mn,fontSize:16,fontWeight:700,color:"#f59e0b"}}>{maxOrders}</span></div></div>
          </div>
        </div>
        <div style={{fontSize:12,color:"#7d8598",marginBottom:24,lineHeight:1.6}}>The demo generates 48 orders across 3 zones (A/B/C) spanning aisles 11-24. Each order has 1-6 pick lines with random quantities.</div>
        <button onClick={function(){setPhase("dash");}} style={{width:"100%",padding:"14px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#f59e0b,#d97706)",color:"#fff",cursor:"pointer",fontFamily:F.hd,fontSize:15,fontWeight:700}}>Plan Waves →</button>
      </div>
    </div>
  ); }

  return (
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:F.sans,color:C.text}}>
      <link href={FONTS} rel="stylesheet" />
      <style>{`input[type=range]{accent-color:#f59e0b}`}</style>
      <header style={{background:C.panel,borderBottom:"1px solid "+C.panelBorder,padding:"14px 24px"}}>
        <div style={{maxWidth:1400,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <button onClick={onHome} style={{background:"transparent",border:"none",color:C.textDim,cursor:"pointer",fontSize:12}}>← Home</button>
            <div style={{width:34,height:34,borderRadius:10,background:"linear-gradient(135deg,#f59e0b,#d97706)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:800}}>🌊</div>
            <div><h1 style={{fontFamily:F.hd,fontSize:17,fontWeight:800,margin:0}}>Order Wave Planner</h1><p style={{fontFamily:F.mn,fontSize:10,color:C.textDim,margin:0}}>{orders.length} ORDERS · {stats.waveCount} WAVES</p></div>
          </div>
        </div>
      </header>

      {/* Controls */}
      <div style={{background:C.panel,padding:"10px 24px",borderBottom:"1px solid "+C.panelBorder}}>
        <div style={{maxWidth:1400,margin:"0 auto",display:"flex",gap:20,alignItems:"end",flexWrap:"wrap"}}>
          <div><label style={{fontSize:10,color:C.textMid,display:"block",marginBottom:3,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5}}>Strategy</label>
            <div style={{display:"flex",gap:5}}>{[{v:"zone",l:"By Zone"},{v:"travel",l:"By Travel"},{v:"lines",l:"By Lines"}].map(function(s){var ac=strategy===s.v;return <button key={s.v} onClick={function(){setStrategy(s.v);setSelectedWave(null);}} style={{padding:"6px 14px",borderRadius:8,border:"1.5px solid "+(ac?"#f59e0b":C.panelBorder),background:ac?"rgba(245,158,11,0.12)":"transparent",color:ac?"#f59e0b":C.textDim,cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:F.sans}}>{s.l}</button>;})}</div>
          </div>
          <div><label style={{fontSize:10,color:C.textMid,display:"block",marginBottom:3,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5}}>Max Picks</label><div style={{display:"flex",alignItems:"center",gap:6}}><input type="range" min={20} max={200} step={10} value={maxPicks} onChange={function(e){setMaxPicks(+e.target.value);setSelectedWave(null);}} style={{width:100}}/><span style={{fontFamily:F.mn,fontSize:13,fontWeight:700,color:"#f59e0b"}}>{maxPicks}</span></div></div>
          <div><label style={{fontSize:10,color:C.textMid,display:"block",marginBottom:3,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5}}>Max Orders</label><div style={{display:"flex",alignItems:"center",gap:6}}><input type="range" min={5} max={30} value={maxOrders} onChange={function(e){setMaxOrders(+e.target.value);setSelectedWave(null);}} style={{width:100}}/><span style={{fontFamily:F.mn,fontSize:13,fontWeight:700,color:"#f59e0b"}}>{maxOrders}</span></div></div>
          <div style={{marginLeft:"auto",display:"flex",gap:14}}>
            {[{l:"Waves",v:stats.waveCount,c:"#f59e0b"},{l:"Picks",v:stats.totalPicks,c:"#2dd4bf"},{l:"Avg/Wave",v:stats.avgPicks,c:"#4ade80"},{l:"Aisles",v:stats.avgAisles,c:"#60a5fa"}].map(function(s,i){return <div key={i} style={{textAlign:"center"}}><div style={{fontFamily:F.hd,fontSize:18,fontWeight:800,color:s.c}}>{s.v}</div><div style={{fontFamily:F.mn,fontSize:8,color:C.textDim,textTransform:"uppercase"}}>{s.l}</div></div>;})}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1400,margin:"0 auto",padding:"20px 24px",display:"flex",gap:16}}>
        {/* Wave cards */}
        <div style={{width:320,flexShrink:0,maxHeight:"calc(100vh - 240px)",overflow:"auto"}}>
          {waves.map(function(w,i){
            var isSel=selectedWave===i;
            return <div key={i} onClick={function(){setSelectedWave(isSel?null:i);}} style={{padding:"12px 14px",borderRadius:12,marginBottom:5,cursor:"pointer",background:isSel?"rgba(245,158,11,0.12)":"transparent",border:"1px solid "+(isSel?"rgba(245,158,11,0.4)":"transparent")}}
              onMouseEnter={function(e){if(!isSel)e.currentTarget.style.background=C.surface;}} onMouseLeave={function(e){if(!isSel)e.currentTarget.style.background=isSel?"rgba(245,158,11,0.12)":"transparent";}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <span style={{fontFamily:F.hd,fontSize:14,fontWeight:700}}>{w.id}</span>
                <div style={{display:"flex",gap:3}}>{w.zones.map(function(z){return <span key={z} style={{display:"inline-block",width:16,height:16,borderRadius:4,background:(WP_ZONE_COLORS[z]||"#60a5fa")+"25",color:WP_ZONE_COLORS[z]||"#60a5fa",fontSize:9,fontFamily:F.mn,fontWeight:700,textAlign:"center",lineHeight:"16px"}}>{z}</span>;})}</div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:6}}>
                {[{l:"Orders",v:w.orderCount,c:C.text},{l:"Picks",v:w.picks,c:"#f59e0b"},{l:"Lines",v:w.totalLines,c:"#2dd4bf"},{l:"Aisles",v:w.uniqueAisles,c:"#60a5fa"}].map(function(s){return <div key={s.l} style={{textAlign:"center"}}><div style={{fontFamily:F.mn,fontSize:13,fontWeight:700,color:s.c}}>{s.v}</div><div style={{fontFamily:F.mn,fontSize:7,color:C.textDim,textTransform:"uppercase"}}>{s.l}</div></div>;})}
              </div>
              <div style={{marginTop:6}}><div style={{height:3,background:C.panelBorder,borderRadius:2,overflow:"hidden"}}><div style={{width:Math.min(100,w.travel/40)+"%",height:"100%",background:w.travel>3000?C.red:w.travel>2000?C.orange:C.green,borderRadius:2}}/></div><div style={{fontFamily:F.mn,fontSize:8,color:C.textDim,textAlign:"right",marginTop:1}}>{w.travel.toLocaleString()} ft</div></div>
            </div>;
          })}
        </div>

        {/* Detail */}
        <div style={{flex:1}}>
          {/* Chart */}
          <div style={{background:C.panel,border:"1px solid "+C.panelBorder,borderRadius:14,padding:"16px 18px",marginBottom:16}}>
            <div style={{fontFamily:F.hd,fontSize:13,fontWeight:700,marginBottom:10}}>Picks per Wave</div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={waveChart}><XAxis dataKey="name" tick={{fontFamily:F.mn,fontSize:8,fill:C.textDim}} axisLine={false} tickLine={false}/><YAxis tick={{fontFamily:F.mn,fontSize:8,fill:C.textDim}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{background:C.panel,border:"1px solid "+C.panelBorder,borderRadius:8,fontFamily:F.bd,fontSize:12}}/><Bar dataKey="picks" name="Picks" radius={[4,4,0,0]}>{waveChart.map(function(_,i2){return <Cell key={i2} fill={selectedWave===i2?"#f59e0b":"rgba(245,158,11,0.4)"}/>;})}</Bar></BarChart>
            </ResponsiveContainer>
          </div>

          {/* Wave detail */}
          {selWave ? (
            <div style={{background:C.panel,border:"1px solid "+C.panelBorder,borderRadius:14,overflow:"hidden"}}>
              <div style={{padding:"12px 16px",borderBottom:"1px solid "+C.panelBorder,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontFamily:F.hd,fontSize:15,fontWeight:700}}>{selWave.id}</span>
                <span style={{fontFamily:F.mn,fontSize:11,color:C.textMid}}>{selWave.orderCount} orders · {selWave.picks} picks · {selWave.uniqueAisles} aisles</span>
              </div>
              <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                <thead><tr style={{background:C.surface}}>{["Order","Lines","Picks","Zone","Aisles","Travel (ft)"].map(function(h){return <th key={h} style={{padding:"8px 12px",textAlign:"left",fontFamily:F.mn,fontSize:9,color:C.textDim,borderBottom:"1px solid "+C.panelBorder,textTransform:"uppercase"}}>{h}</th>;})}</tr></thead>
                <tbody>{selWave.orders.map(function(o){var zc=WP_ZONE_COLORS[o.primaryZone]||"#60a5fa";return <tr key={o.id} style={{borderBottom:"1px solid "+C.panelBorder}}>
                  <td style={{padding:"8px 12px",fontFamily:F.mn,fontSize:12,fontWeight:600}}>{o.id}</td>
                  <td style={{padding:"8px 12px",fontFamily:F.mn}}>{o.lineCount}</td>
                  <td style={{padding:"8px 12px",fontFamily:F.mn,fontWeight:700,color:"#f59e0b"}}>{o.totalPicks}</td>
                  <td style={{padding:"8px 12px"}}><Badge color={zc}>Zone {o.primaryZone}</Badge></td>
                  <td style={{padding:"8px 12px",fontFamily:F.mn,color:C.textMid}}>{o.aisles.sort().join(", ")}</td>
                  <td style={{padding:"8px 12px",fontFamily:F.mn,color:o.totalTravel>400?C.orange:C.textMid}}>{o.totalTravel}</td>
                </tr>;})}</tbody>
              </table></div>
            </div>
          ) : (
            <div style={{background:C.surface,border:"1px dashed "+C.panelBorder,borderRadius:14,padding:"50px 40px",textAlign:"center"}}>
              <div style={{fontSize:28,marginBottom:10}}>👆</div>
              <div style={{fontFamily:F.hd,fontSize:15,fontWeight:700,marginBottom:6}}>Select a Wave</div>
              <p style={{fontSize:13,color:C.textMid}}>Click any wave card to see its orders, picks, and travel breakdown.</p>
            </div>
          )}

          <div style={{marginTop:14,background:C.surface,border:"1px solid "+C.panelBorder,borderRadius:10,padding:"12px 16px"}}>
            <div style={{fontFamily:F.mn,fontSize:9,color:C.textDim,letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>STRATEGY: {strategy.toUpperCase()}</div>
            <div style={{fontSize:12,color:C.textMid,lineHeight:1.6}}>
              {strategy==="zone"&&"Orders grouped by primary zone, then sorted by travel distance. Minimizes cross-zone picker movement."}
              {strategy==="travel"&&"Orders sorted by total travel distance, nearest-first. Minimizes total walking distance per wave."}
              {strategy==="lines"&&"Orders sorted by line count, highest-first. Maximizes picks per wave for throughput."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════
   RECEIVING & PUTAWAY PLANNER
   ══════════════════════════════════════════════════════════════ */
var RP_COLORS = {bg:"#0c0f16",panel:"#131720",panelBorder:"#1e2433",surface:"#181d28",text:"#dce1ea",textMid:"#7d8598",textDim:"#4a5168",pink:"#f472b6",green:"#4ade80",amber:"#fb923c",red:"#f87171",blue:"#60a5fa",teal:"#2dd4bf"};
var RP_RACK_TYPES = ["Pushback","Case flow","Handstack","VNA 24\"","VNA 11\""];
var RP_RACK_COLORS = {"Pushback":"#FF6B6B","Case flow":"#D29922","Handstack":"#58A6FF","VNA 24\"":"#3FB950","VNA 11\"":"#BC8CFF"};

function rpGenLocations() {
  var locs = [];
  var zones = [{name:"A",aisles:[11,12,13],priority:1},{name:"B",aisles:[14,15,16,17],priority:2},{name:"C",aisles:[18,19,20,21,22,23,24],priority:3}];
  zones.forEach(function(zone) {
    zone.aisles.forEach(function(aisle) {
      var bays = 8 + Math.floor(Math.random() * 10);
      for (var b = 1; b <= bays; b++) {
        var rackType = RP_RACK_TYPES[Math.floor(Math.random() * RP_RACK_TYPES.length)];
        var cap = rackType === "Pushback" ? 48 : rackType === "Case flow" ? 24 : rackType === "Handstack" ? 12 : 6;
        var used = Math.floor(Math.random() * cap);
        var travelDist = Math.abs(aisle - 11) * 40 + b * 8;
        locs.push({
          id: "A" + aisle + "-" + b.toString().padStart(3, "0"),
          aisle: aisle, bay: b, zone: zone.name, zonePriority: zone.priority,
          rackType: rackType, capacity: cap, used: used, available: cap - used,
          travelDist: travelDist,
        });
      }
    });
  });
  return locs;
}

function rpGenPO() {
  var items = [
    {sku:"SKU-2001",name:"Resistor Pack",qty:240,rackFit:"Handstack",dims:"4x4x2 in",weight:0.3},
    {sku:"SKU-2002",name:"Hydraulic Pump",qty:12,rackFit:"Pushback",dims:"20x16x18 in",weight:28},
    {sku:"SKU-2003",name:"Wire Harness",qty:80,rackFit:"Case flow",dims:"12x8x6 in",weight:1.5},
    {sku:"SKU-2004",name:"Control Board",qty:45,rackFit:"Handstack",dims:"8x6x2 in",weight:0.8},
    {sku:"SKU-2005",name:"Drive Belt",qty:500,rackFit:"Case flow",dims:"10x4x4 in",weight:0.6},
    {sku:"SKU-2006",name:"Transformer",qty:8,rackFit:"VNA 24\"",dims:"24x18x20 in",weight:45},
    {sku:"SKU-2007",name:"LED Module",qty:150,rackFit:"Handstack",dims:"6x4x2 in",weight:0.2},
    {sku:"SKU-2008",name:"Compressor",qty:4,rackFit:"Pushback",dims:"30x24x24 in",weight:85},
    {sku:"SKU-2009",name:"Relay Board",qty:90,rackFit:"VNA 11\"",dims:"3x3x1 in",weight:0.1},
    {sku:"SKU-2010",name:"Coolant Line",qty:200,rackFit:"Case flow",dims:"36x4x4 in",weight:1.2},
  ];
  return {poNumber:"PO-78432",vendor:"Global Parts Supply",eta:"2026-04-02",lines:items};
}

function RPFlow(props) {
  var onHome = props.onHome;
  var phSt = useState("landing"); var phase = phSt[0]; var setPhase = phSt[1];
  var locsInit = useMemo(function(){return rpGenLocations();},[]);
  var poInit = useMemo(function(){return rpGenPO();},[]);
  var st1 = useState(locsInit); var locations = st1[0];
  var st2 = useState(poInit); var po = st2[0];
  var st3 = useState(null); var selectedLine = st3[0]; var setSelectedLine = st3[1];
  var st4 = useState("zone"); var sortMethod = st4[0]; var setSortMethod = st4[1];
  useEffect(function(){ window.scrollTo(0, 0); }, [phase]);

  var suggestions = useMemo(function() {
    return po.lines.map(function(line) {
      var matches = locations.filter(function(loc) { return loc.rackType === line.rackFit && loc.available >= Math.min(line.qty, loc.capacity); });
      if (sortMethod === "zone") { matches.sort(function(a, b) { return a.zonePriority !== b.zonePriority ? a.zonePriority - b.zonePriority : a.travelDist - b.travelDist; }); }
      else { matches.sort(function(a, b) { return a.travelDist - b.travelDist; }); }
      var top3 = matches.slice(0, 3); var bestMatch = top3[0] || null;
      var status = bestMatch ? (bestMatch.zonePriority === 1 ? "Optimal" : bestMatch.zonePriority === 2 ? "Good" : "Acceptable") : "No Match";
      var statusColor = status === "Optimal" ? RP_COLORS.green : status === "Good" ? RP_COLORS.amber : status === "Acceptable" ? RP_COLORS.blue : RP_COLORS.red;
      return Object.assign({}, line, { suggestions: top3, bestMatch: bestMatch, status: status, statusColor: statusColor });
    });
  }, [po, locations, sortMethod]);
  var summary = useMemo(function() {
    var optimal = suggestions.filter(function(s) { return s.status === "Optimal"; }).length;
    var good = suggestions.filter(function(s) { return s.status === "Good"; }).length;
    var acceptable = suggestions.filter(function(s) { return s.status === "Acceptable"; }).length;
    var noMatch = suggestions.filter(function(s) { return s.status === "No Match"; }).length;
    var totalUnits = po.lines.reduce(function(s, l) { return s + l.qty; }, 0);
    return { optimal: optimal, good: good, acceptable: acceptable, noMatch: noMatch, totalUnits: totalUnits, totalLines: po.lines.length };
  }, [suggestions, po]);
  var selSug = selectedLine !== null ? suggestions[selectedLine] : null;

  if (phase === "landing") { return (
    <div style={{minHeight:"100vh",background:"#0c0f16",fontFamily:F.sans,color:"#dce1ea"}}>
      <link href={FONTS} rel="stylesheet" />
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(12,15,22,0.8)",backdropFilter:"blur(20px)",borderBottom:"1px solid #1e2433"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 40px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center"}}>
          <button onClick={onHome} style={{background:"transparent",border:"none",color:"#4a5168",cursor:"pointer",fontSize:12,marginRight:12}}>← Home</button>
          <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={onHome}><div style={{width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,#f472b6,#db2777)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:800}}>📥</div><span style={{fontFamily:F.hd,fontSize:18,fontWeight:800}}>Put<span style={{color:"#f472b6"}}>away</span></span></div>
          </div>
          <button onClick={function(){setPhase("onboard");}} style={{fontSize:13,fontWeight:700,color:"#fff",background:"#f472b6",padding:"8px 22px",borderRadius:8,border:"none",cursor:"pointer"}}>Get Started</button>
        </div>
      </nav>
      <section style={{padding:"160px 40px 60px",maxWidth:1100,margin:"0 auto"}}>
        <Reveal><h1 style={{fontFamily:F.hd,fontSize:"clamp(40px,5.5vw,64px)",fontWeight:900,lineHeight:1.06,letterSpacing:"-0.04em",margin:"0 0 24px"}}>Every pallet in its<br/><span style={{color:"#f472b6"}}>right place.</span></h1></Reveal>
        <Reveal delay={0.1}><p style={{fontSize:18,color:"#7d8598",lineHeight:1.7,margin:"0 0 36px",maxWidth:520}}>Suggests optimal putaway locations for every inbound PO line — matching rack type, zone priority, and available capacity to minimize put time.</p></Reveal>
        <Reveal delay={0.2}><button onClick={function(){setPhase("onboard");}} style={{fontSize:16,fontWeight:700,color:"#fff",background:"#f472b6",padding:"14px 32px",borderRadius:10,border:"none",cursor:"pointer",boxShadow:"0 4px 24px rgba(244,114,182,0.2)"}}>Plan Putaway →</button></Reveal>
      </section>
      <section style={{padding:"40px 40px 80px",maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:12}}>
          {[{icon:"🏗️",title:"Rack Matching",desc:"Each SKU matched to locations with the correct rack type.",color:"#f472b6"},{icon:"🎯",title:"Zone Priority",desc:"High-velocity items go to Zone A nearest the dock.",color:"#4ade80"},{icon:"📊",title:"Capacity Check",desc:"Only suggests locations with enough available space.",color:"#60a5fa"},{icon:"🗺️",title:"Travel Optimal",desc:"Within each zone, sorted by shortest travel distance.",color:"#fb923c"}].map(function(f2,i){return <Reveal key={f2.title} delay={i*0.08}><div style={{background:"#131720",border:"1px solid #1e2433",borderRadius:14,padding:"24px 18px",borderTop:"3px solid "+f2.color}}>
            <div style={{fontSize:24,marginBottom:10}}>{f2.icon}</div>
            <h3 style={{fontFamily:F.hd,fontSize:14,fontWeight:700,color:f2.color,margin:"0 0 6px"}}>{f2.title}</h3>
            <p style={{fontSize:12,color:"#7d8598",lineHeight:1.5,margin:0}}>{f2.desc}</p>
          </div></Reveal>;})}
        </div>
      </section>
      <section style={{padding:"20px 40px 80px",textAlign:"center"}}><Reveal><button onClick={function(){setPhase("onboard");}} style={{fontSize:16,fontWeight:700,color:"#fff",background:"#f472b6",padding:"16px 40px",borderRadius:12,border:"none",cursor:"pointer"}}>Get Started →</button></Reveal></section>
    </div>
  ); }

  if (phase === "onboard") { return (
    <div style={{minHeight:"100vh",background:"#0c0f16",fontFamily:F.sans,color:"#dce1ea"}}>
      <link href={FONTS} rel="stylesheet" />
      <div style={{maxWidth:680,margin:"0 auto",padding:"40px 32px"}}>
        <button onClick={function(){setPhase("landing");}} style={{background:"transparent",border:"none",color:"#4a5168",cursor:"pointer",fontSize:12,marginBottom:20}}>← Back to Putaway</button>
        <div style={{fontSize:42,marginBottom:14}}>📥</div>
        <h2 style={{fontFamily:F.hd,fontSize:26,fontWeight:800,margin:"0 0 8px"}}>Receiving & Putaway Planner</h2>
        <p style={{fontSize:15,color:"#7d8598",lineHeight:1.7,margin:"0 0 28px"}}>Automatically suggests optimal putaway locations for every line on an inbound PO — matching rack type, zone priority, and available capacity.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:24}}>
          {[{icon:"🏗️",title:"Rack Type Matching",desc:"Each inbound SKU is matched to locations with the correct rack type (Pushback, Case flow, Handstack, VNA)."},{icon:"🎯",title:"Zone Priority",desc:"Puts high-velocity items in Zone A (closest to dock) and slower items in deeper zones."},{icon:"📊",title:"Capacity Awareness",desc:"Only suggests locations with enough available space for the inbound quantity."},{icon:"🗺️",title:"Travel Optimization",desc:"Within each zone, locations are ranked by shortest travel distance from the dock."}].map(function(f){
            return <div key={f.title} style={{background:"#131720",border:"1px solid #1e2433",borderRadius:12,padding:"16px 14px"}}><div style={{fontSize:22,marginBottom:8}}>{f.icon}</div><div style={{fontFamily:F.hd,fontSize:13,fontWeight:700,color:"#f472b6",marginBottom:6}}>{f.title}</div><p style={{fontSize:12,color:"#7d8598",lineHeight:1.5,margin:0}}>{f.desc}</p></div>;
          })}
        </div>
        <div style={{background:"#181d28",border:"1px solid #1e2433",borderRadius:12,padding:"16px 20px",marginBottom:24}}>
          <div style={{fontFamily:F.mn,fontSize:10,color:"#4a5168",letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>DEMO INCLUDES</div>
          <div style={{fontSize:13,color:"#7d8598",lineHeight:1.8}}>A sample PO with 10 inbound line items (resistors, pumps, control boards, etc.) against 200+ warehouse locations across zones A/B/C, aisles 11-24, with 5 rack types. Each line gets top-3 putaway suggestions.</div>
        </div>
        <div style={{display:"flex",gap:6,marginBottom:24}}>
          <span style={{fontSize:12,color:"#7d8598"}}>Putaway sort strategy:</span>
          {[{v:"zone",l:"Zone Priority"},{v:"travel",l:"Shortest Travel"}].map(function(s){var ac=sortMethod===s.v;return <button key={s.v} onClick={function(){setSortMethod(s.v);}} style={{padding:"7px 14px",borderRadius:8,border:"1.5px solid "+(ac?"#f472b6":"#1e2433"),background:ac?"rgba(244,114,182,0.12)":"transparent",color:ac?"#f472b6":"#4a5168",cursor:"pointer",fontSize:12,fontWeight:600}}>{s.l}</button>;})}
        </div>
        <button onClick={function(){setPhase("dash");}} style={{width:"100%",padding:"14px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#f472b6,#db2777)",color:"#fff",cursor:"pointer",fontFamily:F.hd,fontSize:15,fontWeight:700}}>Plan Putaway →</button>
      </div>
    </div>
  ); }

  return (
    <div style={{minHeight:"100vh",background:RP_COLORS.bg,fontFamily:F.sans,color:RP_COLORS.text}}>
      <link href={FONTS} rel="stylesheet" />
      <header style={{background:RP_COLORS.panel,borderBottom:"1px solid "+RP_COLORS.panelBorder,padding:"14px 24px"}}>
        <div style={{maxWidth:1400,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <button onClick={onHome} style={{background:"transparent",border:"none",color:RP_COLORS.textDim,cursor:"pointer",fontSize:12}}>← Home</button>
            <div style={{width:34,height:34,borderRadius:10,background:"linear-gradient(135deg,#f472b6,#db2777)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:800}}>📥</div>
            <div><h1 style={{fontFamily:F.hd,fontSize:17,fontWeight:800,margin:0}}>Receiving & Putaway Planner</h1><p style={{fontFamily:F.mn,fontSize:10,color:RP_COLORS.textDim,margin:0}}>{po.poNumber} · {po.vendor}</p></div>
          </div>
          <div style={{display:"flex",gap:6}}>
            <span style={{fontFamily:F.mn,fontSize:10,color:RP_COLORS.textMid}}>Sort:</span>
            {[{v:"zone",l:"Zone Priority"},{v:"travel",l:"Shortest Travel"}].map(function(s){var ac=sortMethod===s.v;return <button key={s.v} onClick={function(){setSortMethod(s.v);}} style={{padding:"5px 12px",borderRadius:6,border:"1.5px solid "+(ac?RP_COLORS.pink:RP_COLORS.panelBorder),background:ac?"rgba(244,114,182,0.12)":"transparent",color:ac?RP_COLORS.pink:RP_COLORS.textDim,cursor:"pointer",fontSize:11,fontWeight:600,fontFamily:F.sans}}>{s.l}</button>;})}
          </div>
        </div>
      </header>

      {/* Summary */}
      <div style={{background:RP_COLORS.bg,padding:"12px 24px",borderBottom:"1px solid "+RP_COLORS.panelBorder}}>
        <div style={{maxWidth:1400,margin:"0 auto",display:"flex",gap:14,flexWrap:"wrap"}}>
          {[
            {l:"PO Lines",v:summary.totalLines,c:RP_COLORS.pink},{l:"Total Units",v:summary.totalUnits.toLocaleString(),c:RP_COLORS.pink},
            {l:"Optimal",v:summary.optimal,c:RP_COLORS.green},{l:"Good",v:summary.good,c:RP_COLORS.amber},
            {l:"Acceptable",v:summary.acceptable,c:RP_COLORS.blue},{l:"No Match",v:summary.noMatch,c:RP_COLORS.red},
          ].map(function(s,i){return <div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 12px",borderRadius:8,background:s.v>0?s.c+"12":"transparent",border:"1px solid "+(s.v>0?s.c+"25":RP_COLORS.panelBorder)}}><span style={{fontFamily:F.hd,fontSize:18,fontWeight:800,color:s.v>0?s.c:RP_COLORS.textDim}}>{s.v}</span><span style={{fontFamily:F.mn,fontSize:9,color:RP_COLORS.textDim}}>{s.l}</span></div>;})}
        </div>
      </div>

      <div style={{maxWidth:1400,margin:"0 auto",padding:"20px 24px",display:"flex",gap:16}}>
        {/* PO Lines */}
        <div style={{flex:1}}>
          <div style={{fontFamily:F.mn,fontSize:10,color:RP_COLORS.textDim,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>INBOUND PO LINES — PUTAWAY SUGGESTIONS</div>
          <div style={{background:RP_COLORS.panel,border:"1px solid "+RP_COLORS.panelBorder,borderRadius:14,overflow:"hidden"}}>
            <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
              <thead><tr style={{background:RP_COLORS.surface}}>
                {["SKU","Item","Qty","Rack Fit","Suggested Location","Zone","Available","Travel","Status"].map(function(h){return <th key={h} style={{padding:"9px 12px",textAlign:"left",fontFamily:F.mn,fontSize:9,color:RP_COLORS.textDim,letterSpacing:0.5,textTransform:"uppercase",borderBottom:"1px solid "+RP_COLORS.panelBorder}}>{h}</th>;})}
              </tr></thead>
              <tbody>{suggestions.map(function(s,i){
                var isSel = selectedLine === i;
                var rc = RP_RACK_COLORS[s.rackFit] || "#888";
                return <tr key={s.sku} onClick={function(){setSelectedLine(isSel?null:i);}} style={{borderBottom:"1px solid "+RP_COLORS.panelBorder,cursor:"pointer",background:isSel?"rgba(244,114,182,0.08)":"transparent"}}
                  onMouseEnter={function(e){if(!isSel)e.currentTarget.style.background=RP_COLORS.surface;}} onMouseLeave={function(e){if(!isSel)e.currentTarget.style.background=isSel?"rgba(244,114,182,0.08)":"transparent";}}>
                  <td style={{padding:"9px 12px",fontFamily:F.mn,fontSize:11,color:RP_COLORS.textMid}}>{s.sku}</td>
                  <td style={{padding:"9px 12px",fontWeight:600}}>{s.name}</td>
                  <td style={{padding:"9px 12px",fontFamily:F.mn,fontWeight:700}}>{s.qty}</td>
                  <td style={{padding:"9px 12px"}}><Badge color={rc}>{s.rackFit}</Badge></td>
                  <td style={{padding:"9px 12px",fontFamily:F.mn,fontWeight:700,color:RP_COLORS.pink}}>{s.bestMatch?s.bestMatch.id:"—"}</td>
                  <td style={{padding:"9px 12px",fontFamily:F.mn,color:s.bestMatch?RP_COLORS.text:RP_COLORS.textDim}}>{s.bestMatch?"Zone "+s.bestMatch.zone:"—"}</td>
                  <td style={{padding:"9px 12px",fontFamily:F.mn}}>{s.bestMatch?s.bestMatch.available+" / "+s.bestMatch.capacity:"—"}</td>
                  <td style={{padding:"9px 12px",fontFamily:F.mn,color:s.bestMatch&&s.bestMatch.travelDist>300?RP_COLORS.amber:RP_COLORS.textMid}}>{s.bestMatch?s.bestMatch.travelDist+" ft":"—"}</td>
                  <td style={{padding:"9px 12px"}}><Badge color={s.statusColor}>{s.status}</Badge></td>
                </tr>;
              })}</tbody>
            </table></div>
          </div>
        </div>

        {/* Detail panel */}
        <div style={{width:300,flexShrink:0}}>
          {selSug ? (<div>
            <div style={{background:RP_COLORS.panel,border:"1px solid "+RP_COLORS.panelBorder,borderRadius:14,padding:"16px 18px",marginBottom:14}}>
              <div style={{fontFamily:F.hd,fontSize:14,fontWeight:700,marginBottom:8}}>{selSug.name}</div>
              <div style={{display:"grid",gridTemplateColumns:"auto 1fr",gap:"4px 12px",fontSize:12}}>
                <span style={{color:RP_COLORS.textDim}}>SKU:</span><span style={{fontFamily:F.mn}}>{selSug.sku}</span>
                <span style={{color:RP_COLORS.textDim}}>Qty:</span><span style={{fontFamily:F.mn,fontWeight:700}}>{selSug.qty}</span>
                <span style={{color:RP_COLORS.textDim}}>Dims:</span><span style={{fontFamily:F.mn}}>{selSug.dims}</span>
                <span style={{color:RP_COLORS.textDim}}>Weight:</span><span style={{fontFamily:F.mn}}>{selSug.weight} lbs</span>
                <span style={{color:RP_COLORS.textDim}}>Rack Fit:</span><span style={{color:RP_RACK_COLORS[selSug.rackFit],fontWeight:600}}>{selSug.rackFit}</span>
              </div>
            </div>
            <div style={{fontFamily:F.mn,fontSize:10,color:RP_COLORS.textDim,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>TOP 3 PUTAWAY OPTIONS</div>
            {selSug.suggestions.map(function(loc,i){
              var isBest = i === 0;
              return <div key={loc.id} style={{background:isBest?"rgba(244,114,182,0.08)":RP_COLORS.surface,border:"1px solid "+(isBest?RP_COLORS.pink+"30":RP_COLORS.panelBorder),borderRadius:10,padding:"12px 14px",marginBottom:6}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <span style={{fontFamily:F.mn,fontSize:13,fontWeight:700,color:isBest?RP_COLORS.pink:RP_COLORS.text}}>{loc.id}</span>
                  {isBest && <span style={{fontFamily:F.mn,fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:4,background:RP_COLORS.pink+"20",color:RP_COLORS.pink}}>BEST</span>}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,fontFamily:F.mn,fontSize:11}}>
                  <div><div style={{color:RP_COLORS.textDim,fontSize:9}}>Zone</div><div style={{fontWeight:600}}>{loc.zone}</div></div>
                  <div><div style={{color:RP_COLORS.textDim,fontSize:9}}>Available</div><div style={{fontWeight:600,color:loc.available>loc.capacity*0.5?RP_COLORS.green:RP_COLORS.amber}}>{loc.available}/{loc.capacity}</div></div>
                  <div><div style={{color:RP_COLORS.textDim,fontSize:9}}>Travel</div><div style={{fontWeight:600,color:loc.travelDist>300?RP_COLORS.amber:RP_COLORS.textMid}}>{loc.travelDist} ft</div></div>
                </div>
              </div>;
            })}
            {selSug.suggestions.length===0 && <div style={{background:RP_COLORS.red+"12",border:"1px solid "+RP_COLORS.red+"25",borderRadius:10,padding:"16px",textAlign:"center"}}><div style={{fontFamily:F.hd,fontSize:13,fontWeight:700,color:RP_COLORS.red}}>No matching locations</div><div style={{fontSize:12,color:RP_COLORS.textMid,marginTop:4}}>No {selSug.rackFit} locations have enough capacity for {selSug.qty} units.</div></div>}
          </div>) : (
            <div style={{background:RP_COLORS.surface,border:"1px dashed "+RP_COLORS.panelBorder,borderRadius:14,padding:"50px 20px",textAlign:"center"}}>
              <div style={{fontSize:28,marginBottom:10}}>👆</div>
              <div style={{fontFamily:F.hd,fontSize:14,fontWeight:700,marginBottom:6}}>Select a PO Line</div>
              <p style={{fontSize:12,color:RP_COLORS.textMid}}>Click any row to see the top 3 putaway location options with capacity and travel details.</p>
            </div>
          )}

          {/* Location summary */}
          <div style={{background:RP_COLORS.panel,border:"1px solid "+RP_COLORS.panelBorder,borderRadius:14,padding:"14px 16px",marginTop:14}}>
            <div style={{fontFamily:F.mn,fontSize:9,color:RP_COLORS.textDim,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>AVAILABLE CAPACITY BY RACK TYPE</div>
            {RP_RACK_TYPES.map(function(rt){
              var typeLocs = locations.filter(function(l){return l.rackType===rt;});
              var totalCap = typeLocs.reduce(function(s,l){return s+l.capacity;},0);
              var totalUsed = typeLocs.reduce(function(s,l){return s+l.used;},0);
              var pct = totalCap > 0 ? Math.round(totalUsed/totalCap*100) : 0;
              return <div key={rt} style={{marginBottom:8}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
                  <span style={{fontSize:11,color:RP_RACK_COLORS[rt],fontWeight:600}}>{rt}</span>
                  <span style={{fontFamily:F.mn,fontSize:10,color:RP_COLORS.textDim}}>{totalCap-totalUsed} avail / {totalCap}</span>
                </div>
                <div style={{height:5,background:RP_COLORS.panelBorder,borderRadius:3,overflow:"hidden"}}>
                  <div style={{width:pct+"%",height:"100%",background:pct>85?RP_COLORS.red:pct>60?RP_COLORS.amber:RP_COLORS.green,borderRadius:3}}/>
                </div>
              </div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════
   LANDED COST CALCULATOR
   ══════════════════════════════════════════════════════════════ */
var LC_COLORS = {bg:"#0c0f16",panel:"#131720",panelBorder:"#1e2433",surface:"#181d28",text:"#dce1ea",textMid:"#7d8598",textDim:"#4a5168",lime:"#a3e635",green:"#4ade80",amber:"#fb923c",red:"#f87171",blue:"#60a5fa",teal:"#2dd4bf"};

function LCFlow(props) {
  var onHome = props.onHome;
  var phSt = useState("landing"); var phase = phSt[0]; var setPhase = phSt[1];
  var st1 = useState([
    {id:1,name:"Supplier A — Domestic",unitPrice:12.50,moq:500,freight:350,freightMode:"LTL",dutyPct:0,insurancePct:0.5,handling:75,storage:0,otherFees:0,units:500,currency:"USD"},
    {id:2,name:"Supplier B — Import (China)",unitPrice:8.20,moq:1000,freight:2800,freightMode:"Ocean",dutyPct:7.5,insurancePct:1.2,handling:450,storage:200,otherFees:150,units:1000,currency:"USD"},
    {id:3,name:"Supplier C — Import (Mexico)",unitPrice:10.80,moq:500,freight:680,freightMode:"FTL",dutyPct:0,insurancePct:0.8,handling:120,storage:0,otherFees:50,units:500,currency:"USD"},
  ]);
  var suppliers = st1[0]; var setSuppliers = st1[1];
  var st2 = useState("Widget A"); var productName = st2[0]; var setProductName = st2[1];
  useEffect(function(){ window.scrollTo(0, 0); }, [phase]);

  function updateSupplier(id, key, value) {
    setSuppliers(function(prev) {
      return prev.map(function(s) {
        if (s.id !== id) return s;
        var next = Object.assign({}, s);
        next[key] = typeof value === "string" ? value : parseFloat(value) || 0;
        return next;
      });
    });
  }
  var analysis = useMemo(function() {
    return suppliers.map(function(s) {
      var merchTotal = s.unitPrice * s.units;
      var dutyAmt = merchTotal * s.dutyPct / 100;
      var insAmt = merchTotal * s.insurancePct / 100;
      var totalCost = merchTotal + s.freight + dutyAmt + insAmt + s.handling + s.storage + s.otherFees;
      var landedPerUnit = s.units > 0 ? totalCost / s.units : 0;
      var addonPct = s.unitPrice > 0 ? ((landedPerUnit - s.unitPrice) / s.unitPrice * 100) : 0;
      return Object.assign({}, s, {
        merchTotal: Math.round(merchTotal * 100) / 100, dutyAmt: Math.round(dutyAmt * 100) / 100,
        insAmt: Math.round(insAmt * 100) / 100, totalCost: Math.round(totalCost * 100) / 100,
        landedPerUnit: Math.round(landedPerUnit * 100) / 100,
        freightPerUnit: Math.round((s.units > 0 ? s.freight / s.units : 0) * 100) / 100,
        dutyPerUnit: Math.round((s.units > 0 ? dutyAmt / s.units : 0) * 100) / 100,
        addonPct: Math.round(addonPct * 10) / 10,
      });
    });
  }, [suppliers]);
  var cheapest = useMemo(function() {
    if (analysis.length === 0) return null;
    return analysis.reduce(function(min, s) { return s.landedPerUnit < min.landedPerUnit ? s : min; });
  }, [analysis]);

  if (phase === "landing") { return (
    <div style={{minHeight:"100vh",background:"#0c0f16",fontFamily:F.sans,color:"#dce1ea"}}>
      <link href={FONTS} rel="stylesheet" />
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(12,15,22,0.8)",backdropFilter:"blur(20px)",borderBottom:"1px solid #1e2433"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 40px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center"}}>
          <button onClick={onHome} style={{background:"transparent",border:"none",color:"#4a5168",cursor:"pointer",fontSize:12,marginRight:12}}>← Home</button>
          <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={onHome}><div style={{width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,#a3e635,#65a30d)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:800}}>💰</div><span style={{fontFamily:F.hd,fontSize:18,fontWeight:800}}>Landed<span style={{color:"#a3e635"}}>Cost</span></span></div>
          </div>
          <button onClick={function(){setPhase("onboard");}} style={{fontSize:13,fontWeight:700,color:"#0c0f16",background:"#a3e635",padding:"8px 22px",borderRadius:8,border:"none",cursor:"pointer"}}>Get Started</button>
        </div>
      </nav>
      <section style={{padding:"160px 40px 60px",maxWidth:1100,margin:"0 auto"}}>
        <Reveal><h1 style={{fontFamily:F.hd,fontSize:"clamp(40px,5.5vw,64px)",fontWeight:900,lineHeight:1.06,letterSpacing:"-0.04em",margin:"0 0 24px"}}>The real cost.<br/><span style={{color:"#a3e635"}}>Not just the price.</span></h1></Reveal>
        <Reveal delay={0.1}><p style={{fontSize:18,color:"#7d8598",lineHeight:1.7,margin:"0 0 36px",maxWidth:520}}>Build up all 7 cost components — unit price, freight, duty, insurance, handling, storage, other fees — and compare suppliers side by side to find true best value.</p></Reveal>
        <Reveal delay={0.2}><button onClick={function(){setPhase("onboard");}} style={{fontSize:16,fontWeight:700,color:"#0c0f16",background:"#a3e635",padding:"14px 32px",borderRadius:10,border:"none",cursor:"pointer",boxShadow:"0 4px 24px rgba(163,230,53,0.2)"}}>Compare Suppliers →</button></Reveal>
      </section>
      <section style={{padding:"40px 40px 80px",maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
          {[{icon:"🏷️",title:"7 Cost Components",desc:"Unit price, freight, duty/tariff, insurance, handling, storage, and other fees — all in one calculation. Edit any field live.",color:"#a3e635"},{icon:"⚖️",title:"3-Supplier Comparison",desc:"See landed cost per unit side by side. Lowest cost highlighted automatically. Visual breakdown bars per component.",color:"#60a5fa"},{icon:"📊",title:"Real-Time Calculation",desc:"Change any input — unit price, freight, duty rate — and the entire comparison recalculates instantly.",color:"#fb923c"}].map(function(f2,i){return <Reveal key={f2.title} delay={i*0.1}><div style={{background:"#131720",border:"1px solid #1e2433",borderRadius:16,padding:"28px 22px",borderTop:"3px solid "+f2.color}}>
            <div style={{fontSize:28,marginBottom:12}}>{f2.icon}</div>
            <h3 style={{fontFamily:F.hd,fontSize:16,fontWeight:700,color:f2.color,margin:"0 0 8px"}}>{f2.title}</h3>
            <p style={{fontSize:13,color:"#7d8598",lineHeight:1.6,margin:0}}>{f2.desc}</p>
          </div></Reveal>;})}
        </div>
      </section>
      <section style={{padding:"20px 40px 80px",textAlign:"center"}}><Reveal><button onClick={function(){setPhase("onboard");}} style={{fontSize:16,fontWeight:700,color:"#0c0f16",background:"#a3e635",padding:"16px 40px",borderRadius:12,border:"none",cursor:"pointer"}}>Get Started →</button></Reveal></section>
    </div>
  ); }

  if (phase === "onboard") { return (
    <div style={{minHeight:"100vh",background:"#0c0f16",fontFamily:F.sans,color:"#dce1ea"}}>
      <link href={FONTS} rel="stylesheet" />
      <div style={{maxWidth:680,margin:"0 auto",padding:"40px 32px"}}>
        <button onClick={function(){setPhase("landing");}} style={{background:"transparent",border:"none",color:"#4a5168",cursor:"pointer",fontSize:12,marginBottom:20}}>← Back to LandedCost</button>
        <div style={{fontSize:42,marginBottom:14}}>💰</div>
        <h2 style={{fontFamily:F.hd,fontSize:26,fontWeight:800,margin:"0 0 8px"}}>Landed Cost Calculator</h2>
        <p style={{fontSize:15,color:"#7d8598",lineHeight:1.7,margin:"0 0 28px"}}>Calculate the true cost per unit by building up all cost components — then compare suppliers side by side to find the best total value.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:24}}>
          {[{icon:"🏷️",title:"7 Cost Components",desc:"Unit price, freight, duty/tariff, insurance, handling, storage, and other fees — all in one calculation."},{icon:"⚖️",title:"Side-by-Side Comparison",desc:"Compare up to 3 suppliers instantly. The lowest landed cost per unit is automatically highlighted."},{icon:"📊",title:"Cost Breakdown Bars",desc:"Visual breakdown showing what percentage of landed cost comes from each component."},{icon:"🔢",title:"Per-Unit & Per-Shipment",desc:"See total shipment cost AND per-unit landed cost. Edit any input and results update live."}].map(function(f){
            return <div key={f.title} style={{background:"#131720",border:"1px solid #1e2433",borderRadius:12,padding:"16px 14px"}}><div style={{fontSize:22,marginBottom:8}}>{f.icon}</div><div style={{fontFamily:F.hd,fontSize:13,fontWeight:700,color:"#a3e635",marginBottom:6}}>{f.title}</div><p style={{fontSize:12,color:"#7d8598",lineHeight:1.5,margin:0}}>{f.desc}</p></div>;
          })}
        </div>
        <div style={{background:"#181d28",border:"1px solid #1e2433",borderRadius:12,padding:"16px 20px",marginBottom:24}}>
          <div style={{fontFamily:F.mn,fontSize:10,color:"#4a5168",letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>DEMO SCENARIO</div>
          <div style={{fontSize:13,color:"#7d8598",lineHeight:1.8}}>Compare 3 pre-loaded suppliers: a domestic supplier ($12.50/unit, LTL), a Chinese import ($8.20/unit but with ocean freight, 7.5% duty, and higher handling), and a Mexican supplier ($10.80/unit, FTL, no duty). All inputs are editable.</div>
        </div>
        <button onClick={function(){setPhase("dash");}} style={{width:"100%",padding:"14px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#a3e635,#65a30d)",color:"#0c0f16",cursor:"pointer",fontFamily:F.hd,fontSize:15,fontWeight:700}}>Compare Suppliers →</button>
      </div>
    </div>
  ); }

  function CostInput(props2) {
    return <div style={{marginBottom:10}}>
      <label style={{fontSize:10,color:LC_COLORS.textMid,display:"block",marginBottom:3,fontWeight:600,letterSpacing:0.3}}>{props2.label}</label>
      {props2.prefix ? (
        <div style={{display:"flex",alignItems:"center"}}>
          <span style={{fontFamily:F.mn,fontSize:12,color:LC_COLORS.textDim,marginRight:4}}>{props2.prefix}</span>
          <input type="number" value={props2.value} onChange={function(e){props2.onChange(e.target.value);}} style={{width:"100%",padding:"7px 10px",background:LC_COLORS.bg,border:"1px solid "+LC_COLORS.panelBorder,borderRadius:6,color:LC_COLORS.text,fontFamily:F.mn,fontSize:13,outline:"none",boxSizing:"border-box"}}/>
          {props2.suffix && <span style={{fontFamily:F.mn,fontSize:12,color:LC_COLORS.textDim,marginLeft:4}}>{props2.suffix}</span>}
        </div>
      ) : (
        <input type={props2.type||"number"} value={props2.value} onChange={function(e){props2.onChange(e.target.value);}} style={{width:"100%",padding:"7px 10px",background:LC_COLORS.bg,border:"1px solid "+LC_COLORS.panelBorder,borderRadius:6,color:LC_COLORS.text,fontFamily:props2.type==="text"?F.sans:F.mn,fontSize:13,outline:"none",boxSizing:"border-box"}}/>
      )}
    </div>;
  }

  return (
    <div style={{minHeight:"100vh",background:LC_COLORS.bg,fontFamily:F.sans,color:LC_COLORS.text}}>
      <link href={FONTS} rel="stylesheet" />
      <header style={{background:LC_COLORS.panel,borderBottom:"1px solid "+LC_COLORS.panelBorder,padding:"14px 24px"}}>
        <div style={{maxWidth:1400,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <button onClick={onHome} style={{background:"transparent",border:"none",color:LC_COLORS.textDim,cursor:"pointer",fontSize:12}}>← Home</button>
            <div style={{width:34,height:34,borderRadius:10,background:"linear-gradient(135deg,#a3e635,#65a30d)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:800}}>💰</div>
            <div><h1 style={{fontFamily:F.hd,fontSize:17,fontWeight:800,margin:0}}>Landed Cost Calculator</h1><p style={{fontFamily:F.mn,fontSize:10,color:LC_COLORS.textDim,margin:0}}>COMPARE {suppliers.length} SUPPLIERS</p></div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:11,color:LC_COLORS.textMid}}>Product:</span>
            <input type="text" value={productName} onChange={function(e){setProductName(e.target.value);}} style={{padding:"6px 12px",background:LC_COLORS.bg,border:"1px solid "+LC_COLORS.panelBorder,borderRadius:6,color:LC_COLORS.text,fontFamily:F.sans,fontSize:13,outline:"none",width:150}}/>
          </div>
        </div>
      </header>

      <div style={{maxWidth:1400,margin:"0 auto",padding:"20px 24px"}}>
        {/* Comparison summary */}
        <div style={{display:"grid",gridTemplateColumns:"repeat("+suppliers.length+", 1fr)",gap:14,marginBottom:20}}>
          {analysis.map(function(s) {
            var isCheapest = cheapest && s.id === cheapest.id;
            return <div key={s.id} style={{background:LC_COLORS.panel,border:"1px solid "+(isCheapest?LC_COLORS.lime+"40":LC_COLORS.panelBorder),borderRadius:14,padding:"18px 20px",position:"relative",overflow:"hidden"}}>
              {isCheapest && <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:LC_COLORS.lime}}/>}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <div style={{fontFamily:F.hd,fontSize:14,fontWeight:700}}>{s.name}</div>
                {isCheapest && <span style={{fontFamily:F.mn,fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:4,background:LC_COLORS.lime+"20",color:LC_COLORS.lime}}>LOWEST</span>}
              </div>
              <div style={{fontFamily:F.hd,fontSize:32,fontWeight:800,color:isCheapest?LC_COLORS.lime:LC_COLORS.text,marginBottom:4}}>${s.landedPerUnit.toFixed(2)}<span style={{fontSize:14,fontWeight:400,color:LC_COLORS.textMid}}>/unit</span></div>
              <div style={{fontFamily:F.mn,fontSize:11,color:LC_COLORS.textMid,marginBottom:12}}>
                Unit price ${s.unitPrice.toFixed(2)} + <span style={{color:s.addonPct>30?LC_COLORS.red:s.addonPct>15?LC_COLORS.amber:LC_COLORS.green}}>{s.addonPct}% add-on</span>
              </div>
              {/* Cost breakdown mini bars */}
              {[
                {l:"Merchandise",v:s.merchTotal,c:LC_COLORS.blue},
                {l:"Freight ("+s.freightMode+")",v:s.freight,c:LC_COLORS.amber},
                {l:"Duty ("+s.dutyPct+"%)",v:s.dutyAmt,c:LC_COLORS.red},
                {l:"Insurance",v:s.insAmt,c:LC_COLORS.teal},
                {l:"Handling",v:s.handling,c:"#a78bfa"},
                {l:"Storage",v:s.storage,c:"#818cf8"},
                {l:"Other",v:s.otherFees,c:LC_COLORS.textMid},
              ].filter(function(c){return c.v>0;}).map(function(c){
                var pct = s.totalCost > 0 ? c.v / s.totalCost * 100 : 0;
                return <div key={c.l} style={{marginBottom:4}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:10,marginBottom:1}}>
                    <span style={{color:LC_COLORS.textDim}}>{c.l}</span>
                    <span style={{fontFamily:F.mn,color:LC_COLORS.textMid}}>${c.v.toLocaleString()}</span>
                  </div>
                  <div style={{height:3,background:LC_COLORS.panelBorder,borderRadius:2,overflow:"hidden"}}>
                    <div style={{width:pct+"%",height:"100%",background:c.c,borderRadius:2}}/>
                  </div>
                </div>;
              })}
              <div style={{borderTop:"1px solid "+LC_COLORS.panelBorder,paddingTop:10,marginTop:10,display:"flex",justifyContent:"space-between",fontFamily:F.mn,fontSize:12}}>
                <span style={{color:LC_COLORS.textMid}}>Total Shipment</span>
                <span style={{fontWeight:700,color:isCheapest?LC_COLORS.lime:LC_COLORS.text}}>${s.totalCost.toLocaleString()}</span>
              </div>
            </div>;
          })}
        </div>

        {/* Edit supplier details */}
        <div style={{fontFamily:F.mn,fontSize:10,color:LC_COLORS.textDim,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>EDIT SUPPLIER DETAILS</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat("+suppliers.length+", 1fr)",gap:14}}>
          {suppliers.map(function(s) {
            return <div key={s.id} style={{background:LC_COLORS.panel,border:"1px solid "+LC_COLORS.panelBorder,borderRadius:14,padding:"16px 18px"}}>
              <CostInput label="Supplier Name" type="text" value={s.name} onChange={function(v){updateSupplier(s.id,"name",v);}}/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 10px"}}>
                <CostInput label="Unit Price" prefix="$" value={s.unitPrice} onChange={function(v){updateSupplier(s.id,"unitPrice",v);}}/>
                <CostInput label="Order Qty" value={s.units} onChange={function(v){updateSupplier(s.id,"units",v);}}/>
                <CostInput label="Freight Cost" prefix="$" value={s.freight} onChange={function(v){updateSupplier(s.id,"freight",v);}}/>
                <CostInput label="Freight Mode" type="text" value={s.freightMode} onChange={function(v){updateSupplier(s.id,"freightMode",v);}}/>
                <CostInput label="Duty %" value={s.dutyPct} suffix="%" onChange={function(v){updateSupplier(s.id,"dutyPct",v);}}/>
                <CostInput label="Insurance %" value={s.insurancePct} suffix="%" onChange={function(v){updateSupplier(s.id,"insurancePct",v);}}/>
                <CostInput label="Handling" prefix="$" value={s.handling} onChange={function(v){updateSupplier(s.id,"handling",v);}}/>
                <CostInput label="Storage" prefix="$" value={s.storage} onChange={function(v){updateSupplier(s.id,"storage",v);}}/>
              </div>
              <CostInput label="Other Fees" prefix="$" value={s.otherFees} onChange={function(v){updateSupplier(s.id,"otherFees",v);}}/>
            </div>;
          })}
        </div>

        {/* Formula reference */}
        <div style={{marginTop:16,background:LC_COLORS.surface,border:"1px solid "+LC_COLORS.panelBorder,borderRadius:12,padding:"14px 18px"}}>
          <div style={{fontFamily:F.mn,fontSize:9,color:LC_COLORS.textDim,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>LANDED COST FORMULA</div>
          <div style={{fontFamily:F.mn,fontSize:12,color:LC_COLORS.textMid,lineHeight:1.8}}>
            <span style={{color:LC_COLORS.lime,fontWeight:700}}>Landed Cost per Unit</span> = (Unit Price × Qty + Freight + Duty + Insurance + Handling + Storage + Other Fees) ÷ Qty<br/>
            <span style={{color:LC_COLORS.amber,fontWeight:700}}>Duty</span> = Merchandise Value × Duty Rate %<br/>
            <span style={{color:LC_COLORS.teal,fontWeight:700}}>Insurance</span> = Merchandise Value × Insurance Rate %<br/>
            <span style={{color:LC_COLORS.textDim,fontWeight:700}}>Add-on %</span> = (Landed Cost − Unit Price) ÷ Unit Price × 100
          </div>
        </div>
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════
   CARRIER & FREIGHT RATE COMPARISON
   ══════════════════════════════════════════════════════════════ */
var FC_MODES = ["LTL","FTL","Parcel","Ocean","Air"];
var FC_MODE_COLORS = {"LTL":"#38bdf8","FTL":"#f59e0b","Parcel":"#a78bfa","Ocean":"#2dd4bf","Air":"#f472b6"};

function FCFlow(props) {
  var onHome = props.onHome;
  var phSt = useState("landing"); var phase = phSt[0]; var setPhase = phSt[1];
  var st1 = useState({weight:2400,pallets:4,dims:"48x40x48",origin:"Chicago, IL",destination:"Dallas, TX",freightClass:"85"});
  var shipment = st1[0]; var setShipment = st1[1];
  function setShip(k,v){setShipment(function(prev){return Object.assign({},prev,{[k]:v});});}

  var st2 = useState([
    {id:1,name:"FastFreight",modes:["LTL","FTL"],ltl:820,ftl:1650,parcel:null,ocean:null,air:null,transit:{ltl:"3-5 days",ftl:"2-3 days"},reliability:94,fuel:12},
    {id:2,name:"National Express",modes:["LTL","FTL","Parcel"],ltl:780,ftl:1520,parcel:2200,ocean:null,air:null,transit:{ltl:"4-6 days",ftl:"2-3 days",parcel:"1-2 days"},reliability:91,fuel:14},
    {id:3,name:"OceanGlobal",modes:["Ocean","LTL"],ltl:950,ftl:null,parcel:null,ocean:3200,air:null,transit:{ocean:"18-25 days",ltl:"5-7 days"},reliability:87,fuel:8},
    {id:4,name:"AirCargo Plus",modes:["Air","Parcel"],ltl:null,ftl:null,parcel:1850,ocean:null,air:4800,transit:{air:"1-2 days",parcel:"1 day"},reliability:97,fuel:22},
    {id:5,name:"Budget Haulers",modes:["LTL","FTL"],ltl:620,ftl:1280,parcel:null,ocean:null,air:null,transit:{ltl:"5-8 days",ftl:"3-5 days"},reliability:82,fuel:10},
  ]);
  var carriers = st2[0];
  var st3 = useState("all"); var modeFilter = st3[0]; var setModeFilter = st3[1];
  var st4 = useState("cost"); var sortBy = st4[0]; var setSortBy = st4[1];
  useEffect(function(){ window.scrollTo(0, 0); }, [phase]);

  var quotes = useMemo(function() {
    var rows = [];
    carriers.forEach(function(carrier) {
      FC_MODES.forEach(function(mode) {
        var rate = carrier[mode.toLowerCase()];
        if (rate === null || rate === undefined) return;
        if (modeFilter !== "all" && mode !== modeFilter) return;
        var fuelSurcharge = Math.round(rate * carrier.fuel / 100);
        var totalCost = rate + fuelSurcharge;
        var perPallet = shipment.pallets > 0 ? Math.round(totalCost / shipment.pallets) : totalCost;
        var perLb = shipment.weight > 0 ? Math.round(totalCost / shipment.weight * 100) / 100 : 0;
        var transitDays = carrier.transit[mode.toLowerCase()] || "N/A";
        rows.push({ carrierId: carrier.id, carrier: carrier.name, mode: mode, baseRate: rate, fuelSurcharge: fuelSurcharge, totalCost: totalCost, perPallet: perPallet, perLb: perLb, transit: transitDays, reliability: carrier.reliability, fuelPct: carrier.fuel });
      });
    });
    if (sortBy === "cost") rows.sort(function(a, b) { return a.totalCost - b.totalCost; });
    else if (sortBy === "transit") rows.sort(function(a, b) { return parseInt(a.transit) - parseInt(b.transit); });
    else rows.sort(function(a, b) { return b.reliability - a.reliability; });
    return rows;
  }, [carriers, modeFilter, sortBy, shipment]);
  var cheapest = quotes.length > 0 ? quotes[0] : null;

  if (phase === "landing") { return (
    <div style={{minHeight:"100vh",background:"#0c0f16",fontFamily:F.sans,color:"#dce1ea"}}>
      <link href={FONTS} rel="stylesheet" />
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(12,15,22,0.8)",backdropFilter:"blur(20px)",borderBottom:"1px solid #1e2433"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 40px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center"}}>
          <button onClick={onHome} style={{background:"transparent",border:"none",color:"#4a5168",cursor:"pointer",fontSize:12,marginRight:12}}>← Home</button>
          <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={onHome}><div style={{width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,#38bdf8,#0284c7)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:800}}>🚛</div><span style={{fontFamily:F.hd,fontSize:18,fontWeight:800}}>Freight<span style={{color:"#38bdf8"}}>Comp</span></span></div>
          </div>
          <button onClick={function(){setPhase("onboard");}} style={{fontSize:13,fontWeight:700,color:"#fff",background:"#38bdf8",padding:"8px 22px",borderRadius:8,border:"none",cursor:"pointer"}}>Get Started</button>
        </div>
      </nav>
      <section style={{padding:"160px 40px 60px",maxWidth:1100,margin:"0 auto"}}>
        <Reveal><h1 style={{fontFamily:F.hd,fontSize:"clamp(40px,5.5vw,64px)",fontWeight:900,lineHeight:1.06,letterSpacing:"-0.04em",margin:"0 0 24px"}}>Find the best rate.<br/><span style={{color:"#38bdf8"}}>Every shipment.</span></h1></Reveal>
        <Reveal delay={0.1}><p style={{fontSize:18,color:"#7d8598",lineHeight:1.7,margin:"0 0 36px",maxWidth:520}}>Compare 5 carriers across LTL, FTL, Parcel, Ocean, and Air — sort by cost, transit time, or reliability to find your optimal route.</p></Reveal>
        <Reveal delay={0.2}><button onClick={function(){setPhase("onboard");}} style={{fontSize:16,fontWeight:700,color:"#fff",background:"#38bdf8",padding:"14px 32px",borderRadius:10,border:"none",cursor:"pointer",boxShadow:"0 4px 24px rgba(56,189,248,0.2)"}}>Compare Carriers →</button></Reveal>
      </section>
      <section style={{padding:"40px 40px 80px",maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
          {[{icon:"📦",title:"5 Shipping Modes",desc:"LTL, FTL, Parcel, Ocean, Air — filter by mode or compare all at once. Each carrier shows available modes.",color:"#38bdf8"},{icon:"⚡",title:"Smart Sorting",desc:"Rank by lowest cost, fastest transit, or highest reliability. The best option is highlighted automatically.",color:"#f59e0b"},{icon:"💵",title:"Full Cost Breakdown",desc:"Base rate + fuel surcharge breakdown. Per-pallet, per-lb, and total cost. Savings vs most expensive option.",color:"#4ade80"}].map(function(f2,i){return <Reveal key={f2.title} delay={i*0.1}><div style={{background:"#131720",border:"1px solid #1e2433",borderRadius:16,padding:"28px 22px",borderTop:"3px solid "+f2.color}}>
            <div style={{fontSize:28,marginBottom:12}}>{f2.icon}</div>
            <h3 style={{fontFamily:F.hd,fontSize:16,fontWeight:700,color:f2.color,margin:"0 0 8px"}}>{f2.title}</h3>
            <p style={{fontSize:13,color:"#7d8598",lineHeight:1.6,margin:0}}>{f2.desc}</p>
          </div></Reveal>;})}
        </div>
      </section>
      <section style={{padding:"20px 40px 80px",textAlign:"center"}}><Reveal><button onClick={function(){setPhase("onboard");}} style={{fontSize:16,fontWeight:700,color:"#fff",background:"#38bdf8",padding:"16px 40px",borderRadius:12,border:"none",cursor:"pointer"}}>Get Started →</button></Reveal></section>
    </div>
  ); }

  if (phase === "onboard") { return (
    <div style={{minHeight:"100vh",background:"#0c0f16",fontFamily:F.sans,color:"#dce1ea"}}>
      <link href={FONTS} rel="stylesheet" />
      <div style={{maxWidth:680,margin:"0 auto",padding:"40px 32px"}}>
        <button onClick={function(){setPhase("landing");}} style={{background:"transparent",border:"none",color:"#4a5168",cursor:"pointer",fontSize:12,marginBottom:20}}>← Back to FreightComp</button>
        <div style={{fontSize:42,marginBottom:14}}>🚛</div>
        <h2 style={{fontFamily:F.hd,fontSize:26,fontWeight:800,margin:"0 0 8px"}}>Carrier & Freight Comparison</h2>
        <p style={{fontSize:15,color:"#7d8598",lineHeight:1.7,margin:"0 0 28px"}}>Compare shipping costs across carriers and modes — LTL, FTL, Parcel, Ocean, and Air — to find the best rate for every shipment.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:24}}>
          {[{icon:"📦",title:"5 Modes",desc:"LTL, FTL, Parcel, Ocean, Air — filter by mode or compare all at once.",color:"#38bdf8"},{icon:"⚡",title:"3 Sort Options",desc:"Rank carriers by lowest cost, fastest transit, or highest reliability.",color:"#f59e0b"},{icon:"💵",title:"Full Breakdown",desc:"Base rate + fuel surcharge, per-pallet, per-lb, and total cost.",color:"#4ade80"}].map(function(f){
            return <div key={f.title} style={{background:"#131720",border:"1px solid #1e2433",borderRadius:12,padding:"16px 14px",borderTop:"3px solid "+f.color}}><div style={{fontSize:22,marginBottom:8}}>{f.icon}</div><div style={{fontFamily:F.hd,fontSize:12,fontWeight:700,color:f.color,marginBottom:6}}>{f.title}</div><p style={{fontSize:11,color:"#7d8598",lineHeight:1.5,margin:0}}>{f.desc}</p></div>;
          })}
        </div>
        <div style={{background:"#131720",border:"1px solid #1e2433",borderRadius:12,padding:"16px 20px",marginBottom:24}}>
          <div style={{fontFamily:F.mn,fontSize:10,color:"#4a5168",letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>CONFIGURE SHIPMENT</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
            {[{l:"Origin",v:shipment.origin,k:"origin"},{l:"Destination",v:shipment.destination,k:"destination"},{l:"Weight (lbs)",v:shipment.weight,k:"weight"},{l:"Pallets",v:shipment.pallets,k:"pallets"},{l:"Dimensions",v:shipment.dims,k:"dims"},{l:"Freight Class",v:shipment.freightClass,k:"freightClass"}].map(function(f){
              return <div key={f.k}><label style={{fontSize:10,color:"#7d8598",display:"block",marginBottom:3,fontWeight:600}}>{f.l}</label><input value={f.v} onChange={function(e){setShip(f.k,e.target.value);}} style={{width:"100%",padding:"7px 10px",background:"#0c0f16",border:"1px solid #1e2433",borderRadius:6,color:"#dce1ea",fontFamily:F.mn,fontSize:12,outline:"none",boxSizing:"border-box"}}/></div>;
            })}
          </div>
        </div>
        <button onClick={function(){setPhase("dash");}} style={{width:"100%",padding:"14px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#38bdf8,#0284c7)",color:"#fff",cursor:"pointer",fontFamily:F.hd,fontSize:15,fontWeight:700}}>Compare Carriers →</button>
      </div>
    </div>
  ); }

  function ShipInput(p2) {
    return <div><label style={{fontSize:10,color:"#7d8598",display:"block",marginBottom:3,fontWeight:600,letterSpacing:0.3}}>{p2.label}</label><input type={p2.type||"text"} value={p2.value} onChange={function(e){p2.onChange(e.target.value);}} style={{width:"100%",padding:"7px 10px",background:"#0c0f16",border:"1px solid #1e2433",borderRadius:6,color:"#dce1ea",fontFamily:p2.mono?F.mn:F.sans,fontSize:12,outline:"none",boxSizing:"border-box"}}/></div>;
  }

  return (
    <div style={{minHeight:"100vh",background:"#0c0f16",fontFamily:F.sans,color:"#dce1ea"}}>
      <link href={FONTS} rel="stylesheet" />
      <header style={{background:"#131720",borderBottom:"1px solid #1e2433",padding:"14px 24px"}}>
        <div style={{maxWidth:1400,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <button onClick={onHome} style={{background:"transparent",border:"none",color:"#4a5168",cursor:"pointer",fontSize:12}}>← Home</button>
            <div style={{width:34,height:34,borderRadius:10,background:"linear-gradient(135deg,#38bdf8,#0284c7)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:800}}>🚛</div>
            <div><h1 style={{fontFamily:F.hd,fontSize:17,fontWeight:800,margin:0}}>Carrier & Freight Comparison</h1><p style={{fontFamily:F.mn,fontSize:10,color:"#4a5168",margin:0}}>{carriers.length} CARRIERS · {quotes.length} QUOTES</p></div>
          </div>
        </div>
      </header>

      <div style={{maxWidth:1400,margin:"0 auto",padding:"20px 24px"}}>
        {/* Shipment details */}
        <div style={{background:"#131720",border:"1px solid #1e2433",borderRadius:14,padding:"18px 22px",marginBottom:18}}>
          <div style={{fontFamily:F.mn,fontSize:10,color:"#4a5168",letterSpacing:1.5,textTransform:"uppercase",marginBottom:14}}>SHIPMENT DETAILS</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr 1fr",gap:12}}>
            <ShipInput label="Origin" value={shipment.origin} onChange={function(v){setShip("origin",v);}}/>
            <ShipInput label="Destination" value={shipment.destination} onChange={function(v){setShip("destination",v);}}/>
            <ShipInput label="Weight (lbs)" type="number" value={shipment.weight} onChange={function(v){setShip("weight",parseInt(v)||0);}} mono/>
            <ShipInput label="Pallets" type="number" value={shipment.pallets} onChange={function(v){setShip("pallets",parseInt(v)||0);}} mono/>
            <ShipInput label="Dimensions (LxWxH)" value={shipment.dims} onChange={function(v){setShip("dims",v);}} mono/>
            <ShipInput label="Freight Class" value={shipment.freightClass} onChange={function(v){setShip("freightClass",v);}} mono/>
          </div>
        </div>

        {/* Filters */}
        <div style={{display:"flex",gap:12,marginBottom:16,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{display:"flex",gap:5}}>
            <span style={{fontSize:11,color:"#7d8598",alignSelf:"center",marginRight:4}}>Mode:</span>
            {["all"].concat(FC_MODES).map(function(m){var ac=modeFilter===m;var co=m==="all"?"#38bdf8":FC_MODE_COLORS[m]||"#38bdf8";return <button key={m} onClick={function(){setModeFilter(m);}} style={{padding:"5px 12px",borderRadius:6,border:"1.5px solid "+(ac?co:"#1e2433"),background:ac?co+"15":"transparent",color:ac?co:"#4a5168",cursor:"pointer",fontSize:11,fontWeight:600,fontFamily:F.sans}}>{m==="all"?"All":m}</button>;})}
          </div>
          <div style={{display:"flex",gap:5,marginLeft:"auto"}}>
            <span style={{fontSize:11,color:"#7d8598",alignSelf:"center",marginRight:4}}>Sort:</span>
            {[{v:"cost",l:"Lowest Cost"},{v:"transit",l:"Fastest"},{v:"reliability",l:"Most Reliable"}].map(function(s){var ac=sortBy===s.v;return <button key={s.v} onClick={function(){setSortBy(s.v);}} style={{padding:"5px 12px",borderRadius:6,border:"1.5px solid "+(ac?"#38bdf8":"#1e2433"),background:ac?"rgba(56,189,248,0.12)":"transparent",color:ac?"#38bdf8":"#4a5168",cursor:"pointer",fontSize:11,fontWeight:600,fontFamily:F.sans}}>{s.l}</button>;})}
          </div>
        </div>

        {/* Quote table */}
        <div style={{background:"#131720",border:"1px solid #1e2433",borderRadius:14,overflow:"hidden"}}>
          <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead><tr style={{background:"#181d28"}}>
              {["Rank","Carrier","Mode","Base Rate","Fuel Surcharge","Total Cost","Per Pallet","Per Lb","Transit","Reliability"].map(function(h){return <th key={h} style={{padding:"10px 14px",textAlign:"left",fontFamily:F.mn,fontSize:9,color:"#4a5168",letterSpacing:0.5,textTransform:"uppercase",borderBottom:"1px solid #1e2433"}}>{h}</th>;})}
            </tr></thead>
            <tbody>{quotes.map(function(q,i){
              var isBest = i === 0 && sortBy === "cost";
              var mc = FC_MODE_COLORS[q.mode] || "#38bdf8";
              return <tr key={q.carrier+q.mode} style={{borderBottom:"1px solid #1e2433",background:isBest?"rgba(56,189,248,0.05)":"transparent"}}>
                <td style={{padding:"10px 14px",fontFamily:F.mn,fontSize:12,fontWeight:700,color:i===0?"#38bdf8":"#4a5168"}}>{i+1}</td>
                <td style={{padding:"10px 14px",fontWeight:600}}>{q.carrier}</td>
                <td style={{padding:"10px 14px"}}><Badge color={mc}>{q.mode}</Badge></td>
                <td style={{padding:"10px 14px",fontFamily:F.mn}}>${q.baseRate.toLocaleString()}</td>
                <td style={{padding:"10px 14px",fontFamily:F.mn,color:"#7d8598"}}>${q.fuelSurcharge} <span style={{fontSize:9,color:"#4a5168"}}>({q.fuelPct}%)</span></td>
                <td style={{padding:"10px 14px",fontFamily:F.mn,fontWeight:700,color:isBest?"#38bdf8":"#dce1ea"}}>${q.totalCost.toLocaleString()}</td>
                <td style={{padding:"10px 14px",fontFamily:F.mn,color:"#7d8598"}}>${q.perPallet}/plt</td>
                <td style={{padding:"10px 14px",fontFamily:F.mn,color:"#7d8598"}}>${q.perLb}/lb</td>
                <td style={{padding:"10px 14px",fontFamily:F.mn,fontSize:12}}>{q.transit}</td>
                <td style={{padding:"10px 14px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <div style={{width:40,height:4,borderRadius:2,background:"#1e2433",overflow:"hidden"}}><div style={{width:q.reliability+"%",height:"100%",borderRadius:2,background:q.reliability>93?"#4ade80":q.reliability>88?"#fb923c":"#f87171"}}/></div>
                    <span style={{fontFamily:F.mn,fontSize:10,color:"#7d8598"}}>{q.reliability}%</span>
                  </div>
                </td>
              </tr>;
            })}</tbody>
          </table></div>
        </div>

        {/* Savings callout */}
        {quotes.length >= 2 && (
          <div style={{marginTop:16,background:"rgba(56,189,248,0.08)",border:"1px solid rgba(56,189,248,0.2)",borderRadius:12,padding:"14px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
            <div>
              <span style={{fontFamily:F.hd,fontSize:14,fontWeight:700,color:"#38bdf8"}}>Best Option: </span>
              <span style={{fontSize:14,fontWeight:600}}>{quotes[0].carrier} ({quotes[0].mode})</span>
              <span style={{fontSize:14,color:"#7d8598"}}> — ${quotes[0].totalCost.toLocaleString()} total, {quotes[0].transit}</span>
            </div>
            {quotes.length > 1 && (
              <div style={{fontFamily:F.mn,fontSize:12,color:"#4ade80"}}>
                Saves ${(quotes[quotes.length-1].totalCost - quotes[0].totalCost).toLocaleString()} vs. most expensive option
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════
   KPI DASHBOARD
   ══════════════════════════════════════════════════════════════ */
function KPIFlow(props) {
  var onHome = props.onHome;
  var phSt = useState("landing"); var phase = phSt[0]; var setPhase = phSt[1];
  useEffect(function(){ window.scrollTo(0, 0); }, [phase]);

  if (phase === "landing") { return (
    <div style={{minHeight:"100vh",background:"#0c0f16",fontFamily:F.sans,color:"#dce1ea"}}>
      <link href={FONTS} rel="stylesheet" />
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(12,15,22,0.8)",backdropFilter:"blur(20px)",borderBottom:"1px solid #1e2433"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 40px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center"}}>
          <button onClick={onHome} style={{background:"transparent",border:"none",color:"#4a5168",cursor:"pointer",fontSize:12,marginRight:12}}>← Home</button>
          <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={onHome}><div style={{width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,#c084fc,#9333ea)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:800}}>📊</div><span style={{fontFamily:F.hd,fontSize:18,fontWeight:800}}>KPI <span style={{color:"#c084fc"}}>Hub</span></span></div>
          </div>
          <button onClick={function(){setPhase("onboard");}} style={{fontSize:13,fontWeight:700,color:"#fff",background:"#c084fc",padding:"8px 22px",borderRadius:8,border:"none",cursor:"pointer"}}>Get Started</button>
        </div>
      </nav>
      <section style={{padding:"160px 40px 60px",maxWidth:1100,margin:"0 auto"}}>
        <Reveal><h1 style={{fontFamily:F.hd,fontSize:"clamp(40px,5.5vw,64px)",fontWeight:900,lineHeight:1.06,letterSpacing:"-0.04em",margin:"0 0 24px"}}>All your metrics.<br/><span style={{color:"#c084fc"}}>One dashboard.</span></h1></Reveal>
        <Reveal delay={0.1}><p style={{fontSize:18,color:"#7d8598",lineHeight:1.7,margin:"0 0 36px",maxWidth:520}}>12 KPIs across inventory, warehouse ops, and procurement — consolidated into one executive view with sparklines, targets, and actionable insights.</p></Reveal>
        <Reveal delay={0.2}><button onClick={function(){setPhase("onboard");}} style={{fontSize:16,fontWeight:700,color:"#fff",background:"#c084fc",padding:"14px 32px",borderRadius:10,border:"none",cursor:"pointer",boxShadow:"0 4px 24px rgba(192,132,252,0.2)"}}>View Dashboard →</button></Reveal>
      </section>
      <section style={{padding:"40px 40px 80px",maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
          {[{icon:"📦",title:"Inventory",desc:"Total value, health score, stockout rate, dead stock exposure — with trend sparklines and target progress bars.",color:"#2dd4bf",count:"4 KPIs"},{icon:"🏭",title:"Warehouse Ops",desc:"Avg pick travel, picks/hour, slotting efficiency, wave completion — tracking operational performance.",color:"#f59e0b",count:"4 KPIs"},{icon:"🚛",title:"Procurement",desc:"Landed cost variance, supplier on-time rate, freight cost/unit, forecast accuracy — supply chain health.",color:"#a3e635",count:"4 KPIs"}].map(function(f2,i){return <Reveal key={f2.title} delay={i*0.1}><div style={{background:"#131720",border:"1px solid #1e2433",borderRadius:16,padding:"28px 22px",borderTop:"3px solid "+f2.color}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><span style={{fontSize:28}}>{f2.icon}</span><span style={{fontFamily:F.mn,fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:4,background:f2.color+"20",color:f2.color}}>{f2.count}</span></div>
            <h3 style={{fontFamily:F.hd,fontSize:16,fontWeight:700,color:f2.color,margin:"0 0 8px"}}>{f2.title}</h3>
            <p style={{fontSize:13,color:"#7d8598",lineHeight:1.6,margin:0}}>{f2.desc}</p>
          </div></Reveal>;})}
        </div>
      </section>
      <section style={{padding:"20px 40px 80px",textAlign:"center"}}><Reveal><button onClick={function(){setPhase("onboard");}} style={{fontSize:16,fontWeight:700,color:"#fff",background:"#c084fc",padding:"16px 40px",borderRadius:12,border:"none",cursor:"pointer"}}>Get Started →</button></Reveal></section>
    </div>
  ); }

  if (phase === "onboard") { return (
    <div style={{minHeight:"100vh",background:"#0c0f16",fontFamily:F.sans,color:"#dce1ea"}}>
      <link href={FONTS} rel="stylesheet" />
      <div style={{maxWidth:680,margin:"0 auto",padding:"40px 32px"}}>
        <button onClick={function(){setPhase("landing");}} style={{background:"transparent",border:"none",color:"#4a5168",cursor:"pointer",fontSize:12,marginBottom:20}}>← Back to KPI Hub</button>
        <div style={{fontSize:42,marginBottom:14}}>📊</div>
        <h2 style={{fontFamily:F.hd,fontSize:26,fontWeight:800,margin:"0 0 8px"}}>KPI Dashboard</h2>
        <p style={{fontSize:15,color:"#7d8598",lineHeight:1.7,margin:"0 0 28px"}}>Your executive overview — 12 key metrics from across the entire Slotted Media suite, consolidated into one view with trends, targets, and actionable insights.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:24}}>
          {[{icon:"📦",title:"Inventory",desc:"Total value, health score, stockout rate, dead stock exposure.",color:"#2dd4bf",count:"4 KPIs"},{icon:"🏭",title:"Warehouse Ops",desc:"Pick travel, throughput, slotting efficiency, wave completion.",color:"#f59e0b",count:"4 KPIs"},{icon:"🚛",title:"Procurement",desc:"Landed cost variance, supplier on-time, freight cost, forecast accuracy.",color:"#a3e635",count:"4 KPIs"}].map(function(f){
            return <div key={f.title} style={{background:"#131720",border:"1px solid #1e2433",borderRadius:12,padding:"16px 14px",borderTop:"3px solid "+f.color}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><span style={{fontSize:22}}>{f.icon}</span><span style={{fontFamily:F.mn,fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:4,background:f.color+"20",color:f.color}}>{f.count}</span></div><div style={{fontFamily:F.hd,fontSize:13,fontWeight:700,color:f.color,marginBottom:6}}>{f.title}</div><p style={{fontSize:11,color:"#7d8598",lineHeight:1.5,margin:0}}>{f.desc}</p></div>;
          })}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:24}}>
          {[{icon:"📈",title:"Trend Sparklines",desc:"8-period sparklines showing each metric's trajectory at a glance."},{icon:"🎯",title:"Target vs Actual",desc:"Progress bars and status dots (green/orange/red) showing how close you are to each target."},{icon:"🔴",title:"Status Summary",desc:"Counts of on-target, near-target, below-target, and over-threshold metrics."},{icon:"📝",title:"Executive Summary",desc:"Written narrative with actionable recommendations per category."}].map(function(f){
            return <div key={f.title} style={{background:"#131720",border:"1px solid #1e2433",borderRadius:12,padding:"14px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><span style={{fontSize:16}}>{f.icon}</span><span style={{fontFamily:F.hd,fontSize:12,fontWeight:700,color:"#c084fc"}}>{f.title}</span></div><p style={{fontSize:11,color:"#7d8598",lineHeight:1.5,margin:0}}>{f.desc}</p></div>;
          })}
        </div>
        <div style={{background:"rgba(192,132,252,0.08)",border:"1px solid rgba(192,132,252,0.2)",borderRadius:12,padding:"16px 20px",marginBottom:24}}>
          <div style={{fontSize:13,color:"#7d8598",lineHeight:1.7}}>The dashboard uses simulated data from across the suite. In a production environment, these KPIs would pull live from SlotWise, HealthPulse, RadarView, Toolkit, Forecast, WavePlan, Putaway, LandedCost, and FreightComp.</div>
        </div>
        <button onClick={function(){setPhase("dash");}} style={{width:"100%",padding:"14px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#c084fc,#9333ea)",color:"#fff",cursor:"pointer",fontFamily:F.hd,fontSize:15,fontWeight:700}}>View KPI Dashboard →</button>
      </div>
    </div>
  ); }

  // Simulated cross-tool KPI data
  var kpis = [
    {category:"Inventory",metrics:[
      {name:"Total Inventory Value",value:"$1.24M",trend:3.2,target:"$1.1M",status:"over",sparkline:[980,1020,1050,1100,1150,1180,1200,1240]},
      {name:"Health Score",value:"72",suffix:"/100",trend:-2.1,target:"80",status:"under",sparkline:[78,76,75,74,73,72,72,72]},
      {name:"Stockout Rate",value:"4.2%",trend:-0.8,target:"<3%",status:"over",sparkline:[6.1,5.8,5.2,4.8,4.5,4.3,4.2,4.2]},
      {name:"Dead Stock Exposure",value:"$38.4K",trend:-12.5,target:"<$25K",status:"over",sparkline:[52,48,45,42,40,39,38.4,38.4]},
    ]},
    {category:"Warehouse Ops",metrics:[
      {name:"Avg Pick Travel (ft)",value:"342",trend:-8.5,target:"<300",status:"over",sparkline:[420,400,385,370,360,350,345,342]},
      {name:"Picks per Hour",value:"127",trend:5.2,target:"130",status:"near",sparkline:[105,110,115,118,120,123,125,127]},
      {name:"Slotting Efficiency",value:"84%",trend:4.1,target:"90%",status:"under",sparkline:[72,75,77,79,80,82,83,84]},
      {name:"Wave Completion Rate",value:"96.3%",trend:1.1,target:"98%",status:"near",sparkline:[92,93,94,94.5,95,95.5,96,96.3]},
    ]},
    {category:"Procurement",metrics:[
      {name:"Avg Landed Cost Variance",value:"+8.2%",trend:-1.5,target:"<5%",status:"over",sparkline:[12,11,10.5,10,9.5,9,8.5,8.2]},
      {name:"Supplier On-Time Rate",value:"89%",trend:2.3,target:"95%",status:"under",sparkline:[82,84,85,86,87,88,88.5,89]},
      {name:"Freight Cost / Unit",value:"$2.14",trend:-3.8,target:"<$2.00",status:"near",sparkline:[2.65,2.55,2.45,2.35,2.28,2.22,2.18,2.14]},
      {name:"Forecast Accuracy",value:"78%",trend:6.2,target:"85%",status:"under",sparkline:[62,65,68,70,72,74,76,78]},
    ]},
  ];

  function StatusDot(p2) {
    var co = p2.status === "over" ? "#f87171" : p2.status === "near" ? "#fb923c" : p2.status === "under" ? "#38bdf8" : "#4ade80";
    return <div style={{width:8,height:8,borderRadius:"50%",background:co,flexShrink:0}} title={p2.status}/>;
  }

  function MiniSparkline(p2) {
    var data = p2.data || [];
    if (data.length < 2) return null;
    var min = Math.min.apply(null, data);
    var max = Math.max.apply(null, data);
    var range = max - min || 1;
    var w = 80, h = 24;
    var points = data.map(function(v, i) {
      return (i / (data.length - 1) * w) + "," + (h - (v - min) / range * h);
    }).join(" ");
    var co = p2.trend > 0 ? (p2.good === "up" ? "#4ade80" : "#f87171") : (p2.good === "up" ? "#f87171" : "#4ade80");
    return <svg width={w} height={h} style={{display:"block"}}><polyline points={points} fill="none" stroke={co} strokeWidth="1.5" strokeLinejoin="round"/></svg>;
  }

  return (
    <div style={{minHeight:"100vh",background:"#0c0f16",fontFamily:F.sans,color:"#dce1ea"}}>
      <link href={FONTS} rel="stylesheet" />
      <header style={{background:"#131720",borderBottom:"1px solid #1e2433",padding:"14px 24px"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <button onClick={onHome} style={{background:"transparent",border:"none",color:"#4a5168",cursor:"pointer",fontSize:12}}>← Home</button>
            <div style={{width:34,height:34,borderRadius:10,background:"linear-gradient(135deg,#c084fc,#9333ea)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:800}}>📊</div>
            <div><h1 style={{fontFamily:F.hd,fontSize:17,fontWeight:800,margin:0}}>KPI Dashboard</h1><p style={{fontFamily:F.mn,fontSize:10,color:"#4a5168",margin:0}}>EXECUTIVE SUMMARY · ALL TOOLS</p></div>
          </div>
          <div style={{fontFamily:F.mn,fontSize:11,color:"#4a5168"}}>Last updated: Today</div>
        </div>
      </header>

      {/* Status summary */}
      <div style={{background:"#0c0f16",padding:"14px 24px",borderBottom:"1px solid #1e2433"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",gap:16,flexWrap:"wrap"}}>
          {[
            {l:"On Target",v:kpis.reduce(function(s,c){return s+c.metrics.filter(function(m){return m.status==="on";}).length;},0),c:"#4ade80",i:"✅"},
            {l:"Near Target",v:kpis.reduce(function(s,c){return s+c.metrics.filter(function(m){return m.status==="near";}).length;},0),c:"#fb923c",i:"⚠️"},
            {l:"Below Target",v:kpis.reduce(function(s,c){return s+c.metrics.filter(function(m){return m.status==="under";}).length;},0),c:"#38bdf8",i:"📈"},
            {l:"Over Threshold",v:kpis.reduce(function(s,c){return s+c.metrics.filter(function(m){return m.status==="over";}).length;},0),c:"#f87171",i:"🔴"},
          ].map(function(s,i){return <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 14px",borderRadius:8,background:s.v>0?s.c+"10":"transparent",border:"1px solid "+(s.v>0?s.c+"25":"#1e2433")}}><span style={{fontSize:14}}>{s.i}</span><span style={{fontFamily:F.hd,fontSize:20,fontWeight:800,color:s.v>0?s.c:"#4a5168"}}>{s.v}</span><span style={{fontFamily:F.mn,fontSize:10,color:"#4a5168"}}>{s.l}</span></div>;})}
        </div>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"24px 24px"}}>
        {kpis.map(function(cat) {
          var catColors = {Inventory:"#2dd4bf","Warehouse Ops":"#f59e0b",Procurement:"#a3e635"};
          var catColor = catColors[cat.category] || "#818cf8";
          return (
            <div key={cat.category} style={{marginBottom:24}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
                <div style={{width:4,height:20,borderRadius:2,background:catColor}}/>
                <span style={{fontFamily:F.hd,fontSize:15,fontWeight:700}}>{cat.category}</span>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:12}}>
                {cat.metrics.map(function(m) {
                  var trendUp = m.trend > 0;
                  var goodDir = m.name.includes("Travel") || m.name.includes("Stockout") || m.name.includes("Dead") || m.name.includes("Variance") || m.name.includes("Cost") ? "down" : "up";
                  var trendGood = (goodDir === "up" && trendUp) || (goodDir === "down" && !trendUp);
                  var trendColor = trendGood ? "#4ade80" : "#f87171";
                  return (
                    <div key={m.name} style={{background:"#131720",border:"1px solid #1e2433",borderRadius:14,padding:"18px 20px"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                        <div>
                          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                            <StatusDot status={m.status}/>
                            <span style={{fontSize:13,fontWeight:600}}>{m.name}</span>
                          </div>
                          <div style={{display:"flex",alignItems:"baseline",gap:4}}>
                            <span style={{fontFamily:F.hd,fontSize:28,fontWeight:800}}>{m.value}</span>
                            {m.suffix && <span style={{fontFamily:F.mn,fontSize:14,color:"#7d8598"}}>{m.suffix}</span>}
                          </div>
                        </div>
                        <MiniSparkline data={m.sparkline} trend={m.trend} good={goodDir}/>
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div style={{display:"flex",alignItems:"center",gap:4}}>
                          <span style={{fontFamily:F.mn,fontSize:11,color:trendColor,fontWeight:700}}>{trendUp?"▲":"▼"} {Math.abs(m.trend)}%</span>
                          <span style={{fontFamily:F.mn,fontSize:10,color:"#4a5168"}}>vs last period</span>
                        </div>
                        <div style={{fontFamily:F.mn,fontSize:10,color:"#7d8598"}}>Target: <span style={{fontWeight:700}}>{m.target}</span></div>
                      </div>
                      {/* Progress toward target */}
                      <div style={{marginTop:10}}>
                        <div style={{height:4,background:"#1e2433",borderRadius:2,overflow:"hidden"}}>
                          <div style={{width:(m.status==="on"?"100":m.status==="near"?"80":m.status==="under"?"60":"45")+"%",height:"100%",borderRadius:2,background:m.status==="on"?"#4ade80":m.status==="near"?"#fb923c":m.status==="under"?"#38bdf8":"#f87171"}}/>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Executive summary */}
        <div style={{background:"rgba(192,132,252,0.06)",border:"1px solid rgba(192,132,252,0.2)",borderRadius:14,padding:"20px 24px",marginTop:8}}>
          <div style={{fontFamily:F.hd,fontSize:15,fontWeight:700,color:"#c084fc",marginBottom:10}}>Executive Summary <span style={{fontFamily:F.mn,fontSize:10,fontWeight:500,color:"#4a5168",marginLeft:8}}>SAMPLE ANALYSIS</span></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,fontSize:13,color:"#7d8598",lineHeight:1.7}}>
            <div><span style={{fontWeight:700,color:"#2dd4bf"}}>Inventory:</span> Health score trending down — dead stock exposure at $38.4K needs attention. Stockout rate improving but still above 3% target. Consider running ABC/XYZ reclassification to tighten controls on A-class items.</div>
            <div><span style={{fontWeight:700,color:"#f59e0b"}}>Warehouse:</span> Pick travel reduced 8.5% from slotting optimization. Picks per hour nearing 130 target. Wave completion at 96.3% — investigate the 3.7% incomplete waves for root cause (likely stockouts or mislots).</div>
            <div><span style={{fontWeight:700,color:"#a3e635"}}>Procurement:</span> Landed cost variance dropping but still above 5% target. Forecast accuracy at 78% and improving — extend historical data window for better seasonal detection. Freight cost/unit approaching $2.00 target.</div>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════
   LABOR PLANNING CALCULATOR
   ══════════════════════════════════════════════════════════════ */
function LPFlow(props) {
  var onHome = props.onHome;
  var phSt = useState("landing"); var phase = phSt[0]; var setPhase = phSt[1];
  var st1 = useState([
    {id:1,name:"Morning",start:"06:00",end:"14:30",pickers:12,picksPerHour:45,breakMin:30},
    {id:2,name:"Afternoon",start:"14:30",end:"23:00",pickers:8,picksPerHour:42,breakMin:30},
    {id:3,name:"Night",start:"23:00",end:"06:00",pickers:4,picksPerHour:38,breakMin:30},
  ]);
  var shifts = st1[0]; var setShifts = st1[1];
  var st2 = useState(4200); var dailyOrders = st2[0]; var setDailyOrders = st2[1];
  var st3 = useState(3.2); var linesPerOrder = st3[0]; var setLinesPerOrder = st3[1];
  var st4 = useState(40); var maxHoursPerWeek = st4[0]; var setMaxHoursPerWeek = st4[1];
  var st5 = useState(1.5); var otMultiplier = st5[0]; var setOtMultiplier = st5[1];
  var st6 = useState(22); var hourlyRate = st6[0]; var setHourlyRate = st6[1];
  useEffect(function(){ window.scrollTo(0, 0); }, [phase]);

  function updateShift(id,k,v){setShifts(function(prev){return prev.map(function(s){if(s.id!==id)return s;var n=Object.assign({},s);n[k]=typeof v==="number"?v:isNaN(parseFloat(v))?v:parseFloat(v);return n;});});}

  var analysis = useMemo(function(){
    var totalPicks = Math.round(dailyOrders * linesPerOrder);
    var shiftData = shifts.map(function(sh){
      var startH = parseInt(sh.start.split(":")[0]); var endH = parseInt(sh.end.split(":")[0]);
      var grossHours = endH > startH ? endH - startH : (24 - startH + endH);
      var netHours = grossHours - sh.breakMin / 60;
      var capacity = Math.round(sh.pickers * sh.picksPerHour * netHours);
      var hoursNeeded = totalPicks > 0 ? totalPicks / shifts.length / sh.picksPerHour : 0;
      var pickersNeeded = Math.ceil(hoursNeeded / netHours);
      var utilization = capacity > 0 ? Math.min(100, Math.round(totalPicks / shifts.length / capacity * 100)) : 0;
      var laborHours = sh.pickers * netHours;
      return Object.assign({}, sh, {grossHours:grossHours, netHours:Math.round(netHours*10)/10, capacity:capacity, pickersNeeded:pickersNeeded, utilization:utilization, laborHours:Math.round(laborHours*10)/10});
    });
    var totalCapacity = shiftData.reduce(function(s,sh){return s+sh.capacity;},0);
    var totalLaborHours = shiftData.reduce(function(s,sh){return s+sh.laborHours;},0);
    var totalPickers = shifts.reduce(function(s,sh){return s+sh.pickers;},0);
    var weeklyHoursPerPicker = totalLaborHours * 5 / totalPickers;
    var overtimeHours = Math.max(0, weeklyHoursPerPicker - maxHoursPerWeek) * totalPickers;
    var regularHours = Math.min(totalLaborHours * 5, totalPickers * maxHoursPerWeek);
    var laborCost = Math.round(regularHours * hourlyRate + overtimeHours * hourlyRate * otMultiplier);
    var costPerPick = totalPicks > 0 ? Math.round(laborCost / (totalPicks * 5) * 100) / 100 : 0;
    var gap = totalPicks - totalCapacity;
    return {totalPicks:totalPicks, shiftData:shiftData, totalCapacity:totalCapacity, totalLaborHours:totalLaborHours, totalPickers:totalPickers, weeklyHoursPerPicker:Math.round(weeklyHoursPerPicker*10)/10, overtimeHours:Math.round(overtimeHours), regularHours:Math.round(regularHours), laborCost:laborCost, costPerPick:costPerPick, gap:gap, gapPct:totalCapacity>0?Math.round(gap/totalCapacity*100):0};
  },[shifts,dailyOrders,linesPerOrder,maxHoursPerWeek,otMultiplier,hourlyRate]);

  if(phase==="landing"){return(
    <div style={{minHeight:"100vh",background:"#0c0f16",fontFamily:F.sans,color:"#dce1ea"}}>
      <link href={FONTS} rel="stylesheet"/>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(12,15,22,0.8)",backdropFilter:"blur(20px)",borderBottom:"1px solid #1e2433"}}><div style={{maxWidth:1200,margin:"0 auto",padding:"0 40px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}><div style={{display:"flex",alignItems:"center"}}><button onClick={onHome} style={{background:"transparent",border:"none",color:"#4a5168",cursor:"pointer",fontSize:12,marginRight:12}}>← Home</button><div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={onHome}><div style={{width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,#f97316,#ea580c)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:800}}>👷</div><span style={{fontFamily:F.hd,fontSize:18,fontWeight:800}}>Labor<span style={{color:"#f97316"}}>Plan</span></span></div></div><button onClick={function(){setPhase("dash");}} style={{fontSize:13,fontWeight:700,color:"#fff",background:"#f97316",padding:"8px 22px",borderRadius:8,border:"none",cursor:"pointer"}}>Get Started</button></div></nav>
      <section style={{padding:"160px 40px 60px",maxWidth:1100,margin:"0 auto"}}>
        <Reveal><h1 style={{fontFamily:F.hd,fontSize:"clamp(40px,5.5vw,64px)",fontWeight:900,lineHeight:1.06,letterSpacing:"-0.04em",margin:"0 0 24px"}}>Plan your crew<br/><span style={{color:"#f97316"}}>before the rush.</span></h1></Reveal>
        <Reveal delay={0.1}><p style={{fontSize:18,color:"#7d8598",lineHeight:1.7,margin:"0 0 36px",maxWidth:520}}>Model shifts, set picks-per-hour rates, and see exactly how many pickers you need — with overtime alerts and cost projections.</p></Reveal>
        <Reveal delay={0.2}><button onClick={function(){setPhase("dash");}} style={{fontSize:16,fontWeight:700,color:"#fff",background:"#f97316",padding:"14px 32px",borderRadius:10,border:"none",cursor:"pointer",boxShadow:"0 4px 24px rgba(249,115,22,0.2)"}}>Plan Staffing →</button></Reveal>
      </section>
      <section style={{padding:"40px 40px 80px",maxWidth:1100,margin:"0 auto"}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
        {[{icon:"📅",title:"Shift Builder",desc:"Define morning, afternoon, and night shifts with start/end times, break duration, and pickers assigned.",color:"#f97316"},{icon:"⚡",title:"Capacity Modeling",desc:"Each shift calculates net hours × pickers × picks/hour to show total capacity vs demand.",color:"#facc15"},{icon:"💰",title:"Cost Projection",desc:"Regular hours, overtime threshold, OT multiplier, hourly rate — see weekly labor cost and cost per pick.",color:"#4ade80"}].map(function(f2,i){return <Reveal key={f2.title} delay={i*0.1}><div style={{background:"#131720",border:"1px solid #1e2433",borderRadius:16,padding:"28px 22px",borderTop:"3px solid "+f2.color}}><div style={{fontSize:28,marginBottom:12}}>{f2.icon}</div><h3 style={{fontFamily:F.hd,fontSize:16,fontWeight:700,color:f2.color,margin:"0 0 8px"}}>{f2.title}</h3><p style={{fontSize:13,color:"#7d8598",lineHeight:1.6,margin:0}}>{f2.desc}</p></div></Reveal>;})}
      </div></section>
      <section style={{padding:"20px 40px 80px",textAlign:"center"}}><Reveal><button onClick={function(){setPhase("dash");}} style={{fontSize:16,fontWeight:700,color:"#fff",background:"#f97316",padding:"16px 40px",borderRadius:12,border:"none",cursor:"pointer"}}>Get Started →</button></Reveal></section>
    </div>
  );}

  var LP={bg:"#0c0f16",panel:"#131720",panelBorder:"#1e2433",surface:"#181d28",text:"#dce1ea",textMid:"#7d8598",textDim:"#4a5168",orange:"#f97316",green:"#4ade80",red:"#f87171",yellow:"#facc15",blue:"#60a5fa"};
  return(
    <div style={{minHeight:"100vh",background:LP.bg,fontFamily:F.sans,color:LP.text}}>
      <link href={FONTS} rel="stylesheet"/>
      <style>{`input[type=range]{accent-color:#f97316}`}</style>
      <header style={{background:LP.panel,borderBottom:"1px solid "+LP.panelBorder,padding:"14px 24px"}}><div style={{maxWidth:1400,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}><div style={{display:"flex",alignItems:"center",gap:12}}><button onClick={onHome} style={{background:"transparent",border:"none",color:LP.textDim,cursor:"pointer",fontSize:12}}>← Home</button><div style={{width:34,height:34,borderRadius:10,background:"linear-gradient(135deg,#f97316,#ea580c)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:800}}>👷</div><div><h1 style={{fontFamily:F.hd,fontSize:17,fontWeight:800,margin:0}}>Labor Planning</h1><p style={{fontFamily:F.mn,fontSize:10,color:LP.textDim,margin:0}}>DAILY STAFFING MODEL</p></div></div></div></header>

      <div style={{maxWidth:1400,margin:"0 auto",padding:"20px 24px"}}>
        {/* Demand inputs */}
        <div style={{display:"flex",gap:14,marginBottom:18,flexWrap:"wrap"}}>
          <div style={{background:LP.panel,border:"1px solid "+LP.panelBorder,borderRadius:12,padding:"14px 18px",display:"flex",gap:20,alignItems:"end",flexWrap:"wrap",flex:1}}>
            <div><label style={{fontSize:10,color:LP.textMid,display:"block",marginBottom:3,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5}}>Daily Orders</label><div style={{display:"flex",alignItems:"center",gap:6}}><input type="range" min={500} max={15000} step={100} value={dailyOrders} onChange={function(e){setDailyOrders(+e.target.value);}} style={{width:100}}/><span style={{fontFamily:F.mn,fontSize:14,fontWeight:700,color:LP.orange}}>{dailyOrders.toLocaleString()}</span></div></div>
            <div><label style={{fontSize:10,color:LP.textMid,display:"block",marginBottom:3,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5}}>Lines/Order</label><div style={{display:"flex",alignItems:"center",gap:6}}><input type="range" min={1} max={10} step={0.1} value={linesPerOrder} onChange={function(e){setLinesPerOrder(+e.target.value);}} style={{width:80}}/><span style={{fontFamily:F.mn,fontSize:14,fontWeight:700,color:LP.orange}}>{linesPerOrder}</span></div></div>
            <div><label style={{fontSize:10,color:LP.textMid,display:"block",marginBottom:3,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5}}>$/Hour</label><div style={{display:"flex",alignItems:"center",gap:6}}><input type="range" min={12} max={45} value={hourlyRate} onChange={function(e){setHourlyRate(+e.target.value);}} style={{width:80}}/><span style={{fontFamily:F.mn,fontSize:14,fontWeight:700,color:LP.orange}}>${hourlyRate}</span></div></div>
            <div><label style={{fontSize:10,color:LP.textMid,display:"block",marginBottom:3,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5}}>OT After (hrs/wk)</label><div style={{display:"flex",alignItems:"center",gap:6}}><input type="range" min={30} max={50} value={maxHoursPerWeek} onChange={function(e){setMaxHoursPerWeek(+e.target.value);}} style={{width:80}}/><span style={{fontFamily:F.mn,fontSize:14,fontWeight:700,color:LP.orange}}>{maxHoursPerWeek}</span></div></div>
          </div>
          {[{l:"Daily Picks",v:analysis.totalPicks.toLocaleString(),c:LP.orange},{l:"Capacity",v:analysis.totalCapacity.toLocaleString(),c:analysis.gap>0?LP.red:LP.green},{l:"Gap",v:(analysis.gap>0?"+":"")+analysis.gap.toLocaleString(),c:analysis.gap>0?LP.red:LP.green},{l:"Weekly Cost",v:"$"+analysis.laborCost.toLocaleString(),c:LP.blue}].map(function(s,i){return <div key={i} style={{background:LP.panel,border:"1px solid "+LP.panelBorder,borderRadius:12,padding:"14px 18px",minWidth:110,textAlign:"center"}}><div style={{fontFamily:F.hd,fontSize:22,fontWeight:800,color:s.c}}>{s.v}</div><div style={{fontFamily:F.mn,fontSize:9,color:LP.textDim,textTransform:"uppercase",letterSpacing:0.5}}>{s.l}</div></div>;})}
        </div>

        {/* Shift cards */}
        <div style={{display:"grid",gridTemplateColumns:"repeat("+shifts.length+", 1fr)",gap:14,marginBottom:18}}>
          {analysis.shiftData.map(function(sh){
            var utilColor = sh.utilization>95?LP.red:sh.utilization>80?LP.yellow:LP.green;
            return <div key={sh.id} style={{background:LP.panel,border:"1px solid "+LP.panelBorder,borderRadius:14,padding:"20px 22px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                <div style={{fontFamily:F.hd,fontSize:16,fontWeight:700}}>{sh.name} Shift</div>
                <span style={{fontFamily:F.mn,fontSize:11,color:LP.textMid}}>{sh.start} – {sh.end}</span>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 14px",marginBottom:14}}>
                <div><label style={{fontSize:10,color:LP.textDim}}>Pickers</label><input type="number" value={sh.pickers} onChange={function(e){updateShift(sh.id,"pickers",parseInt(e.target.value)||0);}} style={{width:"100%",padding:"6px 10px",background:LP.bg,border:"1px solid "+LP.panelBorder,borderRadius:6,color:LP.text,fontFamily:F.mn,fontSize:13,outline:"none",boxSizing:"border-box"}}/></div>
                <div><label style={{fontSize:10,color:LP.textDim}}>Picks/Hour</label><input type="number" value={sh.picksPerHour} onChange={function(e){updateShift(sh.id,"picksPerHour",parseInt(e.target.value)||0);}} style={{width:"100%",padding:"6px 10px",background:LP.bg,border:"1px solid "+LP.panelBorder,borderRadius:6,color:LP.text,fontFamily:F.mn,fontSize:13,outline:"none",boxSizing:"border-box"}}/></div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,fontFamily:F.mn,fontSize:11}}>
                <div><div style={{color:LP.textDim,fontSize:9}}>Net Hours</div><div style={{fontWeight:700}}>{sh.netHours}h</div></div>
                <div><div style={{color:LP.textDim,fontSize:9}}>Capacity</div><div style={{fontWeight:700,color:LP.orange}}>{sh.capacity.toLocaleString()}</div></div>
                <div><div style={{color:LP.textDim,fontSize:9}}>Need</div><div style={{fontWeight:700,color:sh.pickersNeeded>sh.pickers?LP.red:LP.green}}>{sh.pickersNeeded} pickers</div></div>
              </div>
              <div style={{marginTop:10}}><div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:LP.textDim,marginBottom:2}}><span>Utilization</span><span style={{color:utilColor}}>{sh.utilization}%</span></div><div style={{height:4,background:LP.panelBorder,borderRadius:2,overflow:"hidden"}}><div style={{width:sh.utilization+"%",height:"100%",background:utilColor,borderRadius:2}}/></div></div>
            </div>;
          })}
        </div>

        {/* Cost breakdown */}
        <div style={{background:LP.panel,border:"1px solid "+LP.panelBorder,borderRadius:14,padding:"18px 22px"}}>
          <div style={{fontFamily:F.mn,fontSize:10,color:LP.textDim,letterSpacing:1,textTransform:"uppercase",marginBottom:12}}>WEEKLY COST BREAKDOWN</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:12,fontFamily:F.mn,fontSize:12}}>
            <div><div style={{color:LP.textDim,fontSize:9}}>Total Pickers</div><div style={{fontWeight:700,fontSize:18,color:LP.orange}}>{analysis.totalPickers}</div></div>
            <div><div style={{color:LP.textDim,fontSize:9}}>Daily Labor Hrs</div><div style={{fontWeight:700,fontSize:18}}>{analysis.totalLaborHours}h</div></div>
            <div><div style={{color:LP.textDim,fontSize:9}}>Hrs/Picker/Wk</div><div style={{fontWeight:700,fontSize:18,color:analysis.weeklyHoursPerPicker>maxHoursPerWeek?LP.red:LP.green}}>{analysis.weeklyHoursPerPicker}h</div></div>
            <div><div style={{color:LP.textDim,fontSize:9}}>OT Hours/Wk</div><div style={{fontWeight:700,fontSize:18,color:analysis.overtimeHours>0?LP.red:LP.green}}>{analysis.overtimeHours}h</div></div>
            <div><div style={{color:LP.textDim,fontSize:9}}>Cost/Pick</div><div style={{fontWeight:700,fontSize:18,color:LP.blue}}>${analysis.costPerPick}</div></div>
            <div><div style={{color:LP.textDim,fontSize:9}}>Weekly Total</div><div style={{fontWeight:700,fontSize:18,color:LP.orange}}>${analysis.laborCost.toLocaleString()}</div></div>
          </div>
          {analysis.gap>0 && <div style={{marginTop:14,background:LP.red+"12",border:"1px solid "+LP.red+"25",borderRadius:10,padding:"12px 16px"}}><div style={{fontFamily:F.hd,fontSize:13,fontWeight:700,color:LP.red}}>⚠ Understaffed by {analysis.gap.toLocaleString()} picks/day ({Math.abs(analysis.gapPct)}% over capacity)</div><div style={{fontSize:12,color:LP.textMid,marginTop:4}}>Consider adding {Math.ceil(analysis.gap / (shifts[0].picksPerHour * shifts[0].netHours))} more pickers or increasing picks-per-hour through slotting optimization.</div></div>}
          {analysis.gap<=0 && <div style={{marginTop:14,background:LP.green+"12",border:"1px solid "+LP.green+"25",borderRadius:10,padding:"12px 16px"}}><div style={{fontFamily:F.hd,fontSize:13,fontWeight:700,color:LP.green}}>✅ Capacity covers demand with {Math.abs(analysis.gap).toLocaleString()} picks/day headroom ({Math.abs(analysis.gapPct)}% buffer)</div></div>}
        </div>
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════
   CYCLE COUNT SCHEDULER
   ══════════════════════════════════════════════════════════════ */
function ccGenLocations() {
  var locs = [];
  var categories = ["Electronics","Hardware","Consumables","Equipment","Tools"];
  for (var i = 0; i < 60; i++) {
    var abc = i < 12 ? "A" : i < 30 ? "B" : "C";
    var daysSince = abc === "A" ? 5 + Math.floor(Math.random() * 25) : abc === "B" ? 15 + Math.floor(Math.random() * 50) : 30 + Math.floor(Math.random() * 120);
    var discrepancies = Math.floor(Math.random() * (abc === "A" ? 5 : abc === "B" ? 3 : 2));
    var value = abc === "A" ? 5000 + Math.floor(Math.random() * 20000) : abc === "B" ? 1000 + Math.floor(Math.random() * 5000) : 100 + Math.floor(Math.random() * 1500);
    locs.push({ id: "LOC-" + (1001 + i), aisle: "A" + (11 + Math.floor(i / 4)), bay: (i % 22) + 1, abc: abc, abcColor: abc === "A" ? "#2dd4bf" : abc === "B" ? "#fb923c" : "#60a5fa", category: categories[i % 5], lastCount: daysSince, discrepancies: discrepancies, value: value, accuracy: 100 - discrepancies * (3 + Math.floor(Math.random() * 5)), priority: 0 });
  }
  // Calculate priority score
  locs.forEach(function(l) {
    var abcWeight = l.abc === "A" ? 3 : l.abc === "B" ? 2 : 1;
    var ageWeight = Math.min(5, l.lastCount / 15);
    var discWeight = l.discrepancies * 2;
    var valWeight = l.value > 10000 ? 2 : l.value > 3000 ? 1 : 0;
    l.priority = Math.round((abcWeight + ageWeight + discWeight + valWeight) * 10) / 10;
  });
  return locs.sort(function(a, b) { return b.priority - a.priority; });
}

function CCFlow(props) {
  var onHome = props.onHome;
  var phSt = useState("landing"); var phase = phSt[0]; var setPhase = phSt[1];
  var locsInit = useMemo(function(){ return ccGenLocations(); }, []);
  var st1 = useState(locsInit); var locations = st1[0];
  var st2 = useState(10); var dailyTarget = st2[0]; var setDailyTarget = st2[1];
  var st3 = useState("priority"); var sortBy2 = st3[0]; var setSortBy2 = st3[1];
  var st4 = useState("all"); var abcFilter = st4[0]; var setAbcFilter = st4[1];
  useEffect(function(){ window.scrollTo(0, 0); }, [phase]);

  var filtered2 = useMemo(function(){
    var list = abcFilter === "all" ? locations : locations.filter(function(l){return l.abc===abcFilter;});
    return list.slice().sort(function(a,b){
      if(sortBy2==="priority") return b.priority-a.priority;
      if(sortBy2==="age") return b.lastCount-a.lastCount;
      if(sortBy2==="discrepancy") return b.discrepancies-a.discrepancies;
      return b.value-a.value;
    });
  },[locations,sortBy2,abcFilter]);

  var todaysBatch = filtered2.slice(0, dailyTarget);
  var stats2 = useMemo(function(){
    var overdue = locations.filter(function(l){return(l.abc==="A"&&l.lastCount>7)||(l.abc==="B"&&l.lastCount>30)||(l.abc==="C"&&l.lastCount>90);}).length;
    var avgAcc = locations.length>0?Math.round(locations.reduce(function(s,l){return s+l.accuracy;},0)/locations.length):100;
    var totalDisc = locations.reduce(function(s,l){return s+l.discrepancies;},0);
    var atRiskValue = locations.filter(function(l){return l.discrepancies>=2;}).reduce(function(s,l){return s+l.value;},0);
    return{overdue:overdue,avgAcc:avgAcc,totalDisc:totalDisc,atRiskValue:atRiskValue};
  },[locations]);

  if(phase==="landing"){return(
    <div style={{minHeight:"100vh",background:"#0c0f16",fontFamily:F.sans,color:"#dce1ea"}}>
      <link href={FONTS} rel="stylesheet"/>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(12,15,22,0.8)",backdropFilter:"blur(20px)",borderBottom:"1px solid #1e2433"}}><div style={{maxWidth:1200,margin:"0 auto",padding:"0 40px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}><div style={{display:"flex",alignItems:"center"}}><button onClick={onHome} style={{background:"transparent",border:"none",color:"#4a5168",cursor:"pointer",fontSize:12,marginRight:12}}>← Home</button><div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={onHome}><div style={{width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,#14b8a6,#0d9488)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:800}}>📋</div><span style={{fontFamily:F.hd,fontSize:18,fontWeight:800}}>Cycle<span style={{color:"#14b8a6"}}>Count</span></span></div></div><button onClick={function(){setPhase("dash");}} style={{fontSize:13,fontWeight:700,color:"#fff",background:"#14b8a6",padding:"8px 22px",borderRadius:8,border:"none",cursor:"pointer"}}>Get Started</button></div></nav>
      <section style={{padding:"160px 40px 60px",maxWidth:1100,margin:"0 auto"}}>
        <Reveal><h1 style={{fontFamily:F.hd,fontSize:"clamp(40px,5.5vw,64px)",fontWeight:900,lineHeight:1.06,letterSpacing:"-0.04em",margin:"0 0 24px"}}>Count what matters.<br/><span style={{color:"#14b8a6"}}>Skip what doesn't.</span></h1></Reveal>
        <Reveal delay={0.1}><p style={{fontSize:18,color:"#7d8598",lineHeight:1.7,margin:"0 0 36px",maxWidth:520}}>Prioritize which locations to count based on ABC class, last count date, discrepancy history, and inventory value — keeping accuracy high without shutting down.</p></Reveal>
        <Reveal delay={0.2}><button onClick={function(){setPhase("dash");}} style={{fontSize:16,fontWeight:700,color:"#fff",background:"#14b8a6",padding:"14px 32px",borderRadius:10,border:"none",cursor:"pointer",boxShadow:"0 4px 24px rgba(20,184,166,0.2)"}}>Schedule Counts →</button></Reveal>
      </section>
      <section style={{padding:"40px 40px 80px",maxWidth:1100,margin:"0 auto"}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
        {[{icon:"🏷️",title:"ABC-Weighted Priority",desc:"A items counted weekly, B monthly, C quarterly. Priority score combines class, age, discrepancy history, and value.",color:"#2dd4bf"},{icon:"⚠️",title:"Discrepancy Tracking",desc:"Locations with past count errors get higher priority. See accuracy % and discrepancy count per location.",color:"#fb923c"},{icon:"📅",title:"Daily Batch Planner",desc:"Set your daily count target. The scheduler picks the highest-priority locations automatically.",color:"#14b8a6"}].map(function(f2,i){return <Reveal key={f2.title} delay={i*0.1}><div style={{background:"#131720",border:"1px solid #1e2433",borderRadius:16,padding:"28px 22px",borderTop:"3px solid "+f2.color}}><div style={{fontSize:28,marginBottom:12}}>{f2.icon}</div><h3 style={{fontFamily:F.hd,fontSize:16,fontWeight:700,color:f2.color,margin:"0 0 8px"}}>{f2.title}</h3><p style={{fontSize:13,color:"#7d8598",lineHeight:1.6,margin:0}}>{f2.desc}</p></div></Reveal>;})}
      </div></section>
      <section style={{padding:"20px 40px 80px",textAlign:"center"}}><Reveal><button onClick={function(){setPhase("dash");}} style={{fontSize:16,fontWeight:700,color:"#fff",background:"#14b8a6",padding:"16px 40px",borderRadius:12,border:"none",cursor:"pointer"}}>Get Started →</button></Reveal></section>
    </div>
  );}

  var CC={bg:"#0c0f16",panel:"#131720",panelBorder:"#1e2433",surface:"#181d28",text:"#dce1ea",textMid:"#7d8598",textDim:"#4a5168",teal:"#14b8a6",green:"#4ade80",red:"#f87171",orange:"#fb923c",blue:"#60a5fa"};
  return(
    <div style={{minHeight:"100vh",background:CC.bg,fontFamily:F.sans,color:CC.text}}>
      <link href={FONTS} rel="stylesheet"/>
      <style>{`input[type=range]{accent-color:#14b8a6}`}</style>
      <header style={{background:CC.panel,borderBottom:"1px solid "+CC.panelBorder,padding:"14px 24px"}}><div style={{maxWidth:1400,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}><div style={{display:"flex",alignItems:"center",gap:12}}><button onClick={onHome} style={{background:"transparent",border:"none",color:CC.textDim,cursor:"pointer",fontSize:12}}>← Home</button><div style={{width:34,height:34,borderRadius:10,background:"linear-gradient(135deg,#14b8a6,#0d9488)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:800}}>📋</div><div><h1 style={{fontFamily:F.hd,fontSize:17,fontWeight:800,margin:0}}>Cycle Count Scheduler</h1><p style={{fontFamily:F.mn,fontSize:10,color:CC.textDim,margin:0}}>{locations.length} LOCATIONS · {dailyTarget}/DAY</p></div></div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <span style={{fontSize:11,color:CC.textMid}}>Daily Target:</span>
          <input type="range" min={3} max={30} value={dailyTarget} onChange={function(e){setDailyTarget(+e.target.value);}} style={{width:100}}/>
          <span style={{fontFamily:F.mn,fontSize:14,fontWeight:700,color:CC.teal}}>{dailyTarget}</span>
        </div>
      </div></header>

      {/* Summary bar */}
      <div style={{background:CC.bg,padding:"12px 24px",borderBottom:"1px solid "+CC.panelBorder}}><div style={{maxWidth:1400,margin:"0 auto",display:"flex",gap:14,flexWrap:"wrap"}}>
        {[{l:"Overdue",v:stats2.overdue,c:CC.red,i:"⏰"},{l:"Avg Accuracy",v:stats2.avgAcc+"%",c:stats2.avgAcc>=95?CC.green:stats2.avgAcc>=90?CC.orange:CC.red,i:"🎯"},{l:"Total Discrepancies",v:stats2.totalDisc,c:stats2.totalDisc>10?CC.red:CC.orange,i:"⚠️"},{l:"At-Risk Value",v:"$"+stats2.atRiskValue.toLocaleString(),c:CC.red,i:"💰"}].map(function(s,i){return <div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 12px",borderRadius:8,background:s.c+"12",border:"1px solid "+s.c+"25"}}><span style={{fontSize:12}}>{s.i}</span><span style={{fontFamily:F.hd,fontSize:16,fontWeight:800,color:s.c}}>{s.v}</span><span style={{fontFamily:F.mn,fontSize:9,color:CC.textDim}}>{s.l}</span></div>;})}
      </div></div>

      <div style={{maxWidth:1400,margin:"0 auto",padding:"20px 24px",display:"flex",gap:16}}>
        {/* Today's batch */}
        <div style={{width:320,flexShrink:0}}>
          <div style={{fontFamily:F.mn,fontSize:10,color:CC.textDim,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>TODAY'S COUNT BATCH ({todaysBatch.length})</div>
          <div style={{maxHeight:"calc(100vh - 220px)",overflow:"auto"}}>
            {todaysBatch.map(function(loc,i){return <div key={loc.id} style={{background:i===0?CC.teal+"12":CC.panel,border:"1px solid "+(i===0?CC.teal+"30":CC.panelBorder),borderRadius:10,padding:"12px 14px",marginBottom:4}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <span style={{fontFamily:F.mn,fontSize:13,fontWeight:700}}>{loc.id}</span>
                <Badge color={loc.abcColor}>{loc.abc}</Badge>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,fontFamily:F.mn,fontSize:10}}>
                <div><span style={{color:CC.textDim}}>Age: </span><span style={{color:loc.lastCount>30?CC.red:CC.textMid}}>{loc.lastCount}d</span></div>
                <div><span style={{color:CC.textDim}}>Disc: </span><span style={{color:loc.discrepancies>=2?CC.red:CC.textMid}}>{loc.discrepancies}</span></div>
                <div><span style={{color:CC.textDim}}>Score: </span><span style={{color:CC.teal,fontWeight:700}}>{loc.priority}</span></div>
              </div>
            </div>;})}
          </div>
        </div>

        {/* Full table */}
        <div style={{flex:1}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:10,alignItems:"center"}}>
            <div style={{display:"flex",gap:5}}>
              {["all","A","B","C"].map(function(f){var ac=abcFilter===f;var co=f==="A"?"#2dd4bf":f==="B"?"#fb923c":f==="C"?"#60a5fa":"#14b8a6";return <button key={f} onClick={function(){setAbcFilter(f);}} style={{padding:"5px 12px",borderRadius:6,border:"1.5px solid "+(ac?co:"#1e2433"),background:ac?co+"15":"transparent",color:ac?co:"#4a5168",cursor:"pointer",fontSize:11,fontWeight:600}}>{f==="all"?"All":("Class "+f)}</button>;})}
            </div>
            <select value={sortBy2} onChange={function(e){setSortBy2(e.target.value);}} style={{background:CC.surface,color:CC.text,border:"1px solid "+CC.panelBorder,borderRadius:6,padding:"4px 10px",fontFamily:F.mn,fontSize:10,outline:"none"}}><option value="priority">Priority Score</option><option value="age">Days Since Count</option><option value="discrepancy">Discrepancies</option><option value="value">Value</option></select>
          </div>
          <div style={{background:CC.panel,border:"1px solid "+CC.panelBorder,borderRadius:14,overflow:"hidden"}}>
            <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
              <thead><tr style={{background:CC.surface}}>{["Location","Aisle","ABC","Last Count","Discrepancies","Accuracy","Value","Priority","Status"].map(function(h){return <th key={h} style={{padding:"9px 12px",textAlign:"left",fontFamily:F.mn,fontSize:9,color:CC.textDim,letterSpacing:0.5,textTransform:"uppercase",borderBottom:"1px solid "+CC.panelBorder}}>{h}</th>;})}</tr></thead>
              <tbody>{filtered2.map(function(loc,i){
                var isToday = i < dailyTarget;
                var isOverdue = (loc.abc==="A"&&loc.lastCount>7)||(loc.abc==="B"&&loc.lastCount>30)||(loc.abc==="C"&&loc.lastCount>90);
                return <tr key={loc.id} style={{borderBottom:"1px solid "+CC.panelBorder,background:isToday?CC.teal+"06":"transparent"}}>
                  <td style={{padding:"8px 12px",fontFamily:F.mn,fontWeight:isToday?700:400}}>{loc.id}</td>
                  <td style={{padding:"8px 12px",fontFamily:F.mn,color:CC.textMid}}>{loc.aisle}</td>
                  <td style={{padding:"8px 12px"}}><Badge color={loc.abcColor}>{loc.abc}</Badge></td>
                  <td style={{padding:"8px 12px",fontFamily:F.mn,color:isOverdue?CC.red:CC.textMid}}>{loc.lastCount}d ago</td>
                  <td style={{padding:"8px 12px",fontFamily:F.mn,color:loc.discrepancies>=2?CC.red:CC.textMid}}>{loc.discrepancies}</td>
                  <td style={{padding:"8px 12px"}}><div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:36,height:4,borderRadius:2,background:CC.panelBorder,overflow:"hidden"}}><div style={{width:loc.accuracy+"%",height:"100%",borderRadius:2,background:loc.accuracy>=95?CC.green:loc.accuracy>=90?CC.orange:CC.red}}/></div><span style={{fontFamily:F.mn,fontSize:10,color:CC.textMid}}>{loc.accuracy}%</span></div></td>
                  <td style={{padding:"8px 12px",fontFamily:F.mn}}>${loc.value.toLocaleString()}</td>
                  <td style={{padding:"8px 12px",fontFamily:F.mn,fontWeight:700,color:CC.teal}}>{loc.priority}</td>
                  <td style={{padding:"8px 12px"}}>{isToday?<Badge color={CC.teal}>Count Today</Badge>:isOverdue?<Badge color={CC.red}>Overdue</Badge>:<span style={{fontFamily:F.mn,fontSize:10,color:CC.textDim}}>Scheduled</span>}</td>
                </tr>;
              })}</tbody>
            </table></div>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════
   ROOT ROUTER
   ══════════════════════════════════════════════════════════════ */
/* ── COMING SOON PAGE ── */
var COMING_SOON = true; // ← Change to false when ready to launch

function ComingSoon() {
  var st = useState(""); var email = st[0]; var setEmail = st[1];
  var st2 = useState(false); var submitted = st2[0]; var setSubmitted = st2[1];
  var st3 = useState(false); var sending = st3[0]; var setSending = st3[1];
  function handleSubmit() {
    if (!email.includes("@") || sending) return;
    setSending(true);
    fetch("https://formspree.io/f/xnjonqlv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email })
    }).then(function() { setSubmitted(true); setSending(false); })
      .catch(function() { setSubmitted(true); setSending(false); });
  }
  return (
    <div style={{minHeight:"100vh",background:"#0A0A0E",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Sora',system-ui,sans-serif",color:"#fff",textAlign:"center",padding:40}}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=Newsreader:ital,wght@0,400;1,400;1,500&display=swap" rel="stylesheet" />
      <style>{`@keyframes csFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}@keyframes csPulse{0%,100%{opacity:0.4}50%{opacity:1}}@keyframes csFade{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{maxWidth:600}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,marginBottom:40,animation:"csFloat 4s ease-in-out infinite"}}>
          <div style={{display:"flex",gap:4}}>
            <div style={{width:8,height:28,background:"#F0C35F",borderRadius:4}}/>
            <div style={{width:8,height:28,background:"#F0C35F",borderRadius:4}}/>
            <div style={{width:8,height:28,background:"#F0C35F",borderRadius:4}}/>
          </div>
          <span style={{fontSize:24,fontWeight:800,letterSpacing:-1}}>SlottedMedia</span>
        </div>
        <h1 style={{fontFamily:"'Newsreader',serif",fontSize:"clamp(36px,6vw,64px)",fontWeight:400,lineHeight:1.15,margin:"0 0 20px",animation:"csFade 1s ease-out both"}}>
          Something <span style={{fontStyle:"italic",color:"#F0C35F"}}>big</span> is<br/>coming soon.
        </h1>
        <p style={{fontSize:18,color:"rgba(255,255,255,0.45)",lineHeight:1.7,margin:"0 0 40px",animation:"csFade 1s ease-out 0.2s both"}}>
          We're building powerful, focused tools for warehouse and supply chain teams. Be the first to know when we launch.
        </p>
        {!submitted ? (
          <div style={{display:"flex",gap:0,maxWidth:440,margin:"0 auto",background:"rgba(255,255,255,0.05)",borderRadius:12,border:"1px solid rgba(240,195,95,0.15)",overflow:"hidden",animation:"csFade 1s ease-out 0.4s both"}}>
            <input type="email" value={email} onChange={function(e){setEmail(e.target.value);}} placeholder="you@company.com" style={{flex:1,padding:"16px 20px",background:"transparent",border:"none",color:"#fff",fontSize:16,fontFamily:"'Sora',sans-serif",outline:"none"}}/>
            <button onClick={handleSubmit} style={{padding:"16px 28px",background:"#F0C35F",border:"none",color:"#0A0A0E",fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:"'Sora',sans-serif"}}>{sending ? "Sending..." : "Notify Me"}</button>
          </div>
        ) : (
          <div style={{padding:"16px 28px",borderRadius:12,background:"rgba(240,195,95,0.1)",border:"1px solid rgba(240,195,95,0.2)",animation:"csFade 0.5s ease-out both"}}>
            <span style={{color:"#F0C35F",fontWeight:700}}>You're on the list.</span>
            <span style={{color:"rgba(255,255,255,0.5)",marginLeft:8}}>We'll reach out when we launch.</span>
          </div>
        )}
        <div style={{display:"flex",justifyContent:"center",gap:28,marginTop:48,animation:"csFade 1s ease-out 0.6s both"}}>
          {["Warehouse Slotting","Inventory Health","Demand Forecasting","Wave Planning","KPI Dashboards"].map(function(t){
            return <div key={t} style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:4,height:4,borderRadius:"50%",background:"#F0C35F",animation:"csPulse 3s ease-in-out infinite"}}/>
              <span style={{fontSize:11,color:"rgba(255,255,255,0.25)",letterSpacing:0.5}}>{t}</span>
            </div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  var s = useState("home"); var page = s[0]; var setPage = s[1];
  useEffect(function() { window.scrollTo(0, 0); }, [page]);
  function nav(p) { setPage(p); }
  function goHome() { nav("home"); }

  if (COMING_SOON) return <ComingSoon />;

  return (
    <div>
      <link href={FONTS} rel="stylesheet" />
      {page === "home" && <Homepage onNavigate={nav} />}
      {page === "sw-onboard" && <SWFlow onHome={goHome} />}
      {page === "hp-onboard" && <HPFlow onHome={goHome} />}
      {page === "dt-onboard" && <DTFlow onHome={goHome} />}
      {page === "tk-onboard" && <TKFlow onHome={goHome} />}
      {page === "df-onboard" && <DFFlow onHome={goHome} />}
      {page === "wp-onboard" && <WPFlow onHome={goHome} />}
      {page === "rp-onboard" && <RPFlow onHome={goHome} />}
      {page === "lc-onboard" && <LCFlow onHome={goHome} />}
      {page === "fc-onboard" && <FCFlow onHome={goHome} />}
      {page === "kpi-onboard" && <KPIFlow onHome={goHome} />}
      {page === "lp-onboard" && <LPFlow onHome={goHome} />}
      {page === "cc-onboard" && <CCFlow onHome={goHome} />}
    </div>
  );
}
