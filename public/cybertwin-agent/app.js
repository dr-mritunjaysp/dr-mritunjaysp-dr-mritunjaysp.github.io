const $ = id => document.getElementById(id);
const scenarios = {
 ransomware: {labels:['Employee endpoint','Identity gateway','Research database'], risk:88, path:'Employee endpoint → Identity gateway → Research database', detection:'Unusual file encryption and lateral login activity.', intelligence:'Endpoint and authentication signals align with a ransomware scenario.', prediction:'A compromised endpoint could traverse the identity gateway to the research database.'},
 iot: {labels:['Industrial sensor','Edge gateway','Control service'], risk:79, path:'Industrial sensor → Edge gateway → Control service', detection:'Unexpected sensor traffic and gateway configuration changes.', intelligence:'Device and network events suggest a compromised industrial gateway.', prediction:'An affected sensor could reach the gateway and disrupt the control service.'},
 cloud: {labels:['External client','Cloud identity','Object storage'], risk:83, path:'External client → Cloud identity → Object storage', detection:'Unfamiliar client access and an unusual volume of storage requests.', intelligence:'Access patterns suggest a stolen service credential.', prediction:'Credential misuse could expose the cloud identity and connected object storage.'}
};
const actions={isolate:{name:'Isolate the affected asset',reduction:65,availability:86},restrict:{name:'Restrict suspicious traffic',reduction:45,availability:96},observe:{name:'Increase monitoring',reduction:10,availability:100}};
let analyzed=false, simulation=null, applied=false, entries=[];
const themeButton=$('theme-toggle');
function syncThemeLabel(){const dark=document.documentElement.dataset.theme==='dark';themeButton.textContent=dark?'Light mode':'Dark mode';themeButton.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');}
themeButton.addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=theme;try{localStorage.setItem('cybertwin-theme',theme)}catch{}syncThemeLabel();});syncThemeLabel();
function updateWorkflow(){
 const stage=applied?6:simulation?5:analyzed?4:1;
 document.querySelectorAll('[data-step]').forEach(n=>{const step=Number(n.dataset.step);const done=step<stage||applied;n.classList.toggle('done',done);n.classList.toggle('current',step===stage&&!applied);n.querySelector('small').textContent=done?'Complete':step===stage?'Current step':'Pending';});
 $('workflow-status').textContent=applied?'6 of 6 stages complete':analyzed?(simulation?'Simulation complete · review approval':'Analysis complete · simulate a response'):'Step 1 · select a scenario';
}
function renderResults(){
 const s=scenarios[$('scenario').value];
 const rows=[{name:'Baseline',note:'Before response',risk:analyzed?s.risk:null,availability:analyzed?100:null},{name:'Simulated',note:'Candidate response',risk:simulation?.risk??null,availability:simulation?.availability??null},{name:'Applied',note:'Demo twin only',risk:applied?simulation.risk:null,availability:applied?simulation.availability:null}];
 $('result-chart').replaceChildren();$('result-table').replaceChildren();
 for(const row of rows){
  const group=document.createElement('div');group.className='chart-group';
  const label=document.createElement('div');label.className='chart-label';label.textContent=row.name;const note=document.createElement('small');note.textContent=row.note;label.append(note);group.append(label);
  const bars=document.createElement('div');bars.className='chart-bars';
  if(row.risk===null){const pending=document.createElement('div');pending.className='pending-chart';pending.textContent='Awaiting '+(row.name==='Baseline'?'analysis':row.name==='Simulated'?'simulation':'approved response');bars.append(pending);}
  else for(const metric of ['risk','availability']){const track=document.createElement('div');track.className='bar-row';const bar=document.createElement('div');bar.className='bar '+metric;bar.style.width=row[metric]+'%';const value=document.createElement('span');value.className='bar-value';value.textContent=row[metric]+(metric==='availability'?'%':'');track.append(bar,value);bars.append(track);}
  group.append(bars);$('result-chart').append(group);
  const tr=document.createElement('tr');for(const value of [row.name,row.risk===null?'Pending':String(row.risk),row.availability===null?'Pending':row.availability+'%']){const td=document.createElement('td');td.textContent=value;tr.append(td);}$('result-table').append(tr);
 }
 $('result-status').textContent=applied?'Response applied to demo twin':simulation?'Simulated · awaiting approval':analyzed?'Baseline established':'Awaiting analysis';
 $('result-summary').textContent=simulation?`${actions[simulation.action].name}: risk ${s.risk} → ${simulation.risk}/100, a reduction of ${s.risk-simulation.risk} points. Service availability 100% → ${simulation.availability}%. ${applied?'The approved result is now applied to the demo twin.':'The candidate has not been applied.'}`:analyzed?`Baseline risk is ${s.risk}/100 with 100% synthetic service availability. Simulate a response to compare the trade-off.`:'Run agent analysis to establish the baseline, then simulate an action to compare its impact.';
 $('result-chart').setAttribute('aria-label',rows.map(r=>r.name+': '+(r.risk===null?'pending':`risk ${r.risk} out of 100, availability ${r.availability}%`)).join('. '));updateWorkflow();renderAlternatives();syncTwinModel();
}
const scenarioNames={ransomware:'Enterprise ransomware',iot:'Industrial IoT gateway',cloud:'Cloud credentials'};
function possibleOutcomes(scenarioKey){const scenario=scenarios[scenarioKey];return Object.entries(actions).map(([key,a])=>({scenario:scenarioKey,action:key,name:a.name,baseline:scenario.risk,risk:Math.max(0,scenario.risk-a.reduction),reduction:Math.min(scenario.risk,a.reduction),availability:a.availability,disruption:100-a.availability}));}
function renderAlternatives(){
 const cards=$('outcome-cards'),chart=$('alternative-chart'),matrix=$('scenario-matrix');cards.replaceChildren();chart.replaceChildren();matrix.replaceChildren();$('replay-results').disabled=!analyzed;
 if(!analyzed){chart.textContent='Analyze a scenario to display the animated comparison.';chart.setAttribute('aria-label','Response comparison awaiting analysis');const tr=document.createElement('tr'),td=document.createElement('td');td.colSpan=7;td.textContent='Awaiting analysis. Nine preset outcomes will appear here.';tr.append(td);matrix.append(tr);$('comparison-insight').textContent='Run agent analysis to reveal response alternatives.';return;}
 const outcomes=possibleOutcomes($('scenario').value),metric=$('comparison-metric').value;
 const metricNames={risk:'Residual risk / 100',reduction:'Risk reduction in points',availability:'Service availability %',disruption:'Service disruption %'};
 outcomes.forEach((outcome,index)=>{
  const card=document.createElement('article');card.className='outcome-card';card.style.setProperty('--result-delay',index*100+'ms');
  const title=document.createElement('h3');title.textContent=outcome.name;card.append(title);
  const summary=document.createElement('p');summary.className='outcome-value';summary.textContent=outcome.risk+'/100';card.append(summary);
  const caption=document.createElement('p');caption.className='hint';caption.textContent='Residual risk · '+outcome.reduction+' points reduced';card.append(caption);
  const detail=document.createElement('p');detail.className='hint';detail.textContent=outcome.availability+'% availability · '+outcome.disruption+'% disruption';card.append(detail);
  const badge=document.createElement('small');badge.className='demo-badge';badge.textContent=outcome.action==='isolate'?'Largest preset risk reduction':outcome.action==='restrict'?'Intermediate risk / disruption trade-off':'No preset service disruption';card.append(badge);cards.append(card);
  const group=document.createElement('div');group.className='chart-group alternative-group';const label=document.createElement('div');label.className='chart-label';label.textContent=outcome.name;const bars=document.createElement('div');bars.className='chart-bars';const track=document.createElement('div');track.className='bar-row';const bar=document.createElement('div');bar.className='bar '+(metric==='availability'||metric==='reduction'?'availability':'risk');bar.style.width=outcome[metric]+'%';bar.style.animationDelay=index*100+'ms';const value=document.createElement('span');value.className='bar-value';value.textContent=outcome[metric]+(['availability','disruption'].includes(metric)?'%':'');track.append(bar,value);bars.append(track);group.append(label,bars);chart.append(group);
 });
 chart.setAttribute('aria-label',metricNames[metric]+'. '+outcomes.map(o=>o.name+': '+o[metric]).join('. '));
 $('comparison-insight').textContent=metricNames[metric]+': isolation gives '+outcomes[0][metric]+', traffic restriction '+outcomes[1][metric]+', and increased monitoring '+outcomes[2][metric]+'. These alternatives use preset effects; select and simulate a response above to review it for approval.';
 Object.keys(scenarios).forEach(scenarioKey=>possibleOutcomes(scenarioKey).forEach(outcome=>{const tr=document.createElement('tr');if(scenarioKey===$('scenario').value)tr.className='current-scenario';for(const value of [scenarioNames[scenarioKey],outcome.name,outcome.baseline,outcome.risk,outcome.reduction+' points',outcome.availability+'%',outcome.disruption+'%']){const td=document.createElement('td');td.textContent=value;tr.append(td);}matrix.append(tr);}));
}
$('comparison-metric').addEventListener('change',renderAlternatives);
$('replay-results').addEventListener('click',()=>{renderResults();});
function log(message){entries.push({time:new Date().toISOString(),message});const li=document.createElement('li');li.textContent=message;$('log').append(li);}
function invalidate(){simulation=null;$('approval').checked=false;$('approval').disabled=true;$('apply').disabled=true;$('evaluation').textContent='Select a response and simulate its impact in the twin.';renderResults();}
function reset(){analyzed=false;applied=false;invalidate();entries=[];$('log').replaceChildren();log('Synthetic twin reset. No live network is connected.');$('risk').textContent='—';$('availability').textContent='100%';$('twin-state').textContent='Baseline snapshot';$('path').textContent='Run analysis to trace the scenario’s potential attack path.';$('simulate').disabled=true;document.querySelectorAll('.node').forEach(n=>n.classList.remove('threat','safe'));const s=scenarios[$('scenario').value];['entry','gateway','target'].forEach((id,i)=>$(id+'-label').textContent=s.labels[i]);$('agents').replaceChildren();['Detection','Intelligence','Prediction','Risk'].forEach(name=>{const row=document.createElement('div');row.className='agent';const title=document.createElement('strong');title.textContent=name;const description=document.createElement('span');description.textContent='Awaiting scenario analysis';row.append(title,description);$('agents').append(row);});renderResults();}
$('scenario').addEventListener('change',reset);$('reset').addEventListener('click',reset);
$('analyze').addEventListener('click',()=>{reset();analyzed=true;const s=scenarios[$('scenario').value];const findings=[s.detection,s.intelligence,s.prediction,`Illustrative risk ${s.risk}/100; prioritize the critical asset. These are preset scenario values, not model predictions.`];document.querySelectorAll('.agent span').forEach((n,i)=>n.textContent=findings[i]);document.querySelectorAll('[data-node]').forEach(n=>n.classList.add('threat'));$('risk').textContent=s.risk+'/100';$('twin-state').textContent='Potential attack path';$('path').textContent=s.path;$('simulate').disabled=false;log('Four rule-based specialist roles analyzed '+$('scenario').selectedOptions[0].text+'.');renderResults();});
$('action').addEventListener('change',()=>{if(analyzed&&!applied)invalidate();});
$('simulate').addEventListener('click',()=>{if(!analyzed||applied)return;invalidate();const s=scenarios[$('scenario').value],a=actions[$('action').value];simulation={action:$('action').value,risk:Math.max(0,s.risk-a.reduction),availability:a.availability};$('evaluation').textContent=`Preset what-if result: risk ${s.risk} → ${simulation.risk}/100; estimated service availability ${a.availability}%. ${100-a.availability}% service disruption. These illustrative values are not validated efficacy estimates.`;$('approval').disabled=false;log('Simulated: '+a.name+'. No response applied.');renderResults();});
$('approval').addEventListener('change',()=>{$('apply').disabled=!simulation||!$('approval').checked||applied;});
$('apply').addEventListener('click',()=>{if(!simulation||!$('approval').checked||applied)return;applied=true;$('risk').textContent=simulation.risk+'/100';$('availability').textContent=simulation.availability+'%';$('twin-state').textContent='Demo response applied';document.querySelectorAll('[data-node]').forEach(n=>{n.classList.remove('threat');n.classList.add('safe');});$('path').textContent='Demo state updated. Residual risk remains; live outcome monitoring is planned research work.';log('Analyst approval recorded for this session: '+actions[simulation.action].name+'. Demo twin updated; no external action executed.');log('Synthetic outcome: residual risk '+simulation.risk+'/100, service availability '+simulation.availability+'%.');$('apply').disabled=true;$('approval').disabled=true;$('simulate').disabled=true;renderResults();});
const flowSteps=[
 ['Incoming telemetry','Synthetic device logs, traffic and security events enter the digital twin.'],
 ['Trust-boundary mapping','The gateway links the entry point to connected assets. The twin maps this trust boundary.'],
 ['Asset and dependency context','Trace the potential route to the critical asset and the service cluster that depends on it.'],
 ['Four coordinated agent roles','Detection identifies unusual events; intelligence correlates signals; prediction traces the path; risk assesses impact.'],
 ['Virtual response evaluation','Test isolation, traffic restriction or increased monitoring in the twin and compare the preset trade-offs.'],
 ['Analyst review and approval','The analyst reviews a simulated response. This animation does not approve or execute any action.'],
 ['Outcome feedback','After approval, the synthetic outcome updates the demo twin. Live telemetry feedback is not connected.']
];
let flowStep=0,flowTimer=null,flowPaused=matchMedia('(prefers-reduced-motion: reduce)').matches;
function showFlowStep(){
 const model=$('system-model');model.dataset.stage=String(flowStep);document.querySelectorAll('.flow-current').forEach(n=>n.classList.remove('flow-current'));
 const target=flowStep<3?document.querySelector(['.model-entry','.model-gateway','.model-target'][flowStep]):document.querySelector('[data-flow-node="'+flowStep+'"]');target?.classList.add('flow-current');
 $('flow-step-count').textContent='STEP '+(flowStep+1)+' OF 7';$('flow-step-title').textContent=flowSteps[flowStep][0];$('flow-step-description').textContent=flowSteps[flowStep][1];
 if(flowStep===0)$('flow-step-description').textContent='Synthetic signals from '+scenarios[$('scenario').value].labels[0]+' enter the twin.';
 if(flowStep===2)$('flow-step-description').textContent='Potential path: '+scenarios[$('scenario').value].path+'. The service cluster is an operational dependency.';
 if(flowStep===4&&simulation)$('flow-step-description').textContent=actions[simulation.action].name+': preset residual risk '+simulation.risk+'/100 and availability '+simulation.availability+'%. This remains a what-if result until approved.';
 if(flowStep===6&&applied)$('flow-step-description').textContent='Approved demo result: residual risk '+simulation.risk+'/100; service availability '+simulation.availability+'%. The twin is updated; no live network action occurred.';
}
function scheduleFlow(){clearInterval(flowTimer);$('flow-toggle').textContent=flowPaused?'Play flow':'Pause flow';$('flow-toggle').setAttribute('aria-pressed',String(flowPaused));$('system-model').classList.toggle('flow-paused',flowPaused);const svg=$('network-flow-svg');if(flowPaused)svg.pauseAnimations();else{svg.unpauseAnimations();flowTimer=setInterval(()=>{flowStep=(flowStep+1)%flowSteps.length;showFlowStep();},Number($('flow-speed').value));}}
function syncTwinModel(){
 const model=$('system-model');if(!model)return;model.classList.toggle('has-threat',analyzed&&!applied);model.classList.toggle('response-applied',applied);model.dataset.response=applied?simulation.action:'none';
 $('flow-context').textContent=applied?'Approved demo response: '+actions[simulation.action].name+'. Residual risk remains.':simulation?'Candidate simulated; analyst approval is pending.':analyzed?'Analysis complete · orange marks the potential threat path.':'Illustrative walkthrough · run analysis to reveal the scenario threat path.';
 const badge=$('model-action-badge');badge.hidden=!applied;badge.textContent=applied?(simulation.action==='isolate'?'Asset isolated':simulation.action==='restrict'?'Traffic restricted':'Monitoring increased'):'';
 showFlowStep();
}
$('flow-toggle').addEventListener('click',()=>{flowPaused=!flowPaused;scheduleFlow();});
$('flow-next').addEventListener('click',()=>{flowPaused=true;scheduleFlow();flowStep=(flowStep+1)%flowSteps.length;showFlowStep();});
$('flow-restart').addEventListener('click',()=>{flowStep=0;$('network-flow-svg').setCurrentTime(0);showFlowStep();scheduleFlow();});
$('flow-speed').addEventListener('change',()=>{const seconds=Number($('flow-speed').value)*3/1000;document.querySelectorAll('animateMotion').forEach(n=>n.setAttribute('dur',seconds+'s'));scheduleFlow();});
$('scenario').addEventListener('change',()=>{flowStep=0;showFlowStep();});
document.addEventListener('visibilitychange',()=>{if(document.hidden){clearInterval(flowTimer);$('network-flow-svg').pauseAnimations();}else scheduleFlow();});
$('export').addEventListener('click',()=>{const blob=new Blob([JSON.stringify({project:'CyberTwin Agent',mode:'synthetic demonstration',scenario:$('scenario').value,simulation,applied,alternatives:analyzed?possibleOutcomes($('scenario').value):[],scenarioComparisons:analyzed?Object.keys(scenarios).flatMap(possibleOutcomes):[],entries},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='cybertwin-demo-log.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});reset();scheduleFlow();
