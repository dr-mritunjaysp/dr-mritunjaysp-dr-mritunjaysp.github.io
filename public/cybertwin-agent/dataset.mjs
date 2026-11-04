const SEVERITY={info:10,low:25,medium:50,high:75,critical:90};
export function parseCsv(text){
 const rows=[];let row=[],field='',quoted=false,closed=false;
 for(let i=0;i<text.length;i++){const c=text[i];
  if(quoted){if(c==='"'){if(text[i+1]==='"'){field+='"';i++;}else{quoted=false;closed=true;}}else field+=c;continue;}
  if(c==='"'){if(field.trim()||closed)throw Error('Unexpected quote in CSV.');field='';quoted=true;}
  else if(c===','){row.push(field);field='';closed=false;}
  else if(c==='\n'||c==='\r'){if(c==='\r'&&text[i+1]==='\n')i++;row.push(field);if(row.some(v=>v.trim()))rows.push(row);row=[];field='';closed=false;}
  else {if(closed&&!/\s/.test(c))throw Error('Unexpected text after closing CSV quote.');field+=c;}
 }
 if(quoted)throw Error('CSV has an unclosed quoted field.');row.push(field);if(row.some(v=>v.trim()))rows.push(row);
 if(rows.length<2)throw Error('CSV requires a header and at least one event.');
 const headers=rows.shift().map(v=>v.trim().toLowerCase());if(new Set(headers).size!==headers.length)throw Error('CSV contains duplicate column names.');
 return rows.map((values,i)=>{if(values.length!==headers.length)throw Error('CSV row '+(i+2)+' does not match the header column count.');return Object.fromEntries(headers.map((h,j)=>[h,values[j]]));});
}
export function parseDataset(text,format){
 if(new TextEncoder().encode(text).length>2*1024*1024)throw Error('Maximum dataset size is 2 MB.');
 text=text.replace(/^\uFEFF/,'').trim();if(!text)throw Error('Choose a file or paste dataset content first.');
 let rows;if(format==='json'){try{const value=JSON.parse(text);rows=Array.isArray(value)?value:value?.events;}catch{throw Error('Invalid JSON. Use an array of events or an object with an events array.');}}else rows=parseCsv(text);
 if(!Array.isArray(rows)||!rows.length)throw Error('Dataset must contain at least one event.');if(rows.length>5000)throw Error('Maximum dataset length is 5,000 events.');
 const events=rows.map((raw,i)=>{if(!raw||typeof raw!=='object'||Array.isArray(raw))throw Error('Event '+(i+1)+' must be an object.');const event={};for(const key of ['asset','event','severity','source','target']){const value=raw[key];if(value!=null&&typeof value!=='string')throw Error('Event '+(i+1)+': '+key+' must be text.');event[key]=(value??'').trim();if(event[key].length>300)throw Error('Event '+(i+1)+': '+key+' exceeds 300 characters.');}for(const key of ['asset','event','severity'])if(!event[key])throw Error('Event '+(i+1)+': missing '+key+'.');event.severity=event.severity.toLowerCase();if(!(Object.hasOwn(SEVERITY,event.severity)))throw Error('Event '+(i+1)+': severity must be info, low, medium, high or critical.');return event;});
 const counts=Object.fromEntries(Object.keys(SEVERITY).map(s=>[s,events.filter(e=>e.severity===s).length]));const risk=Math.max(...events.map(e=>SEVERITY[e.severity]));const assets=[...new Set(events.map(e=>e.asset))];const edges=events.filter(e=>e.source&&e.target);const representative=events.find(e=>SEVERITY[e.severity]===risk);const labels=[representative.source||'Event source',representative.asset,representative.target||'Dependent asset'];
 return {events,counts,assets,edgeCount:edges.length,scenario:{labels,risk,path:labels.join(' → '),detection:`${events.length} supplied events across ${assets.length} assets; ${counts.high+counts.critical} marked high or critical by the dataset.`,intelligence:`Supplied severity counts: ${Object.entries(counts).map(([k,v])=>k+' '+v).join(', ')}. No external threat-intelligence feed is connected.`,prediction:edges.length?`${edges.length} supplied source–target relationships. Illustrative route from the highest-severity event: ${labels.join(' → ')}. This is not a validated attack prediction.`:'No complete source–target relationships supplied. The topology uses labeled placeholders; attack-path inference is unavailable.',riskExplanation:`Rule-based score ${risk}/100: maximum supplied severity (info 10, low 25, medium 50, high 75, critical 90). This is an illustrative priority score, not a calibrated attack probability.`}};
}
