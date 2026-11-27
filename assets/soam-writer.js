/* Playback of published, archived arrays. No trained model runs in this page. */
(()=>{'use strict';
const root=document.querySelector('[data-writer-trace]');if(!root)return;
const symbols=a=>a.map(row=>row.includes(1)?row.indexOf(1)+1:0);
function cue(container,values,truth,known){
  container.replaceChildren();values.forEach((value,g)=>{
    const cell=document.createElement('div');cell.className='writer-cell';cell.dataset.symbol=value;
    if(known?.[g])cell.classList.add('observed');if(value&&truth&&value!==truth[g])cell.classList.add('wrong');
    cell.title=`Group ${g}: ${value||'missing'}${known?.[g]?', observed':''}${value&&truth&&value!==truth[g]?', differs from target':''}`;
    const index=document.createElement('small');index.textContent=g;
    const text=document.createElement('b');text.textContent=value||'·';cell.append(index,text);container.append(cell);
  });
}
fetch(root.dataset.writerTrace).then(r=>{if(!r.ok)throw Error('Trace unavailable');return r.json()}).then(data=>{
  const truth=symbols(data.truth.clean),known=data.observations.x.map((r,i)=>r.includes(1)||data.observations.h[i].includes(1));
  cue(document.getElementById('writer-target'),truth,null,null);
  cue(document.getElementById('writer-twin'),symbols(data.twin_clean),truth,null);
  const selects=[...root.querySelectorAll('select')];
  function render(){
    const writer=document.getElementById('writer-rule').value,policy=document.getElementById('writer-policy').value;
    const step=Number(document.getElementById('writer-step').value),g=Number(document.getElementById('writer-group').value);
    const trace=data.traces[writer+'-'+policy];
    for(let lane=0;lane<2;lane++)cue(document.getElementById('writer-lane-'+lane),step<0?trace.preseed[lane]:trace.states[lane][step],truth,known);
    const text=document.getElementById('writer-trace-note');
    const phase=step<0?'Before the ordinary pivot is reseeded.':step===0?'After the ordinary top-two seeds are inserted.':`After cue sweep ${step}.`;
    text.textContent=`${phase} Pivot: group ${trace.pivot}; seeds: symbols ${trace.categories.map(x=>x+1).join(' and ')}. Lane 0 visits missing groups ascending; lane 1 visits descending.`;
    const table=document.getElementById('writer-fields');table.replaceChildren();
    if(step>0){
      const caption=document.createElement('caption');caption.textContent=`Recorded fields at group ${g} during sweep ${step}; target symbol ${truth[g]}`;table.append(caption);
      const head=document.createElement('tr');['Lane','Symbol 1','Symbol 2','Symbol 3','Symbol 4'].forEach(t=>{const e=document.createElement('th');e.scope='col';e.textContent=t;head.append(e)});table.append(head);
      for(let l=0;l<2;l++){const tr=document.createElement('tr');[String(l),...trace.visit_fields[l][step-1][g].map(v=>v.toFixed(6))].forEach((v,i)=>{const td=document.createElement(i?'td':'th');td.textContent=v;tr.append(td)});table.append(tr)}
    }
    const out=document.getElementById('writer-outcome');
    if(step===2){const f=trace.mixed_features[data.context];const wrong=f.flatMap((v,i)=>(v>=0)!==(data.truth.payload[i]>0)?[i]:[]);const min=Math.min(...f.map(Math.abs));
      out.textContent=`Final context 1: ${wrong.length?wrong.length+' wrong bits ('+wrong.join(', ')+')':'all 16 bits correct'}. Minimum magnitude ${min.toFixed(6)}: ${min>=.5?'accepted':'rejected'} at threshold 0.5. Lane weights ${trace.weights.join(' / ')}; support scores ${trace.scores.map(v=>v.toFixed(6)).join(' / ')}.`;
    }else out.textContent='Feature output is shown at sweep 2, after the recorded four feature updates. Target labels here are evaluator annotations, never inputs to retrieval.';
  }
  selects.forEach(s=>s.addEventListener('change',render));render();root.dataset.loaded='true';
}).catch(()=>{document.getElementById('writer-trace-note').textContent='Interactive trace could not load. The static explanation and companion report below contain the same result.'});
})();
