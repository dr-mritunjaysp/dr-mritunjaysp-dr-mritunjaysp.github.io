import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetsDir = path.join(projectRoot, "public", "ResumeBuilder", "assets");
const responseToBlob =
  'const b=buildPreviewPdfHtml(_,d),k=await api.post("/api/pdf/preview",{html:b,fileName:c||s||"ScholarResume",engine:g.engine||"puppeteer"},{responseType:"blob"}),$=new Blob([k.data],{type:"application/pdf"});';
const responseWithVectorFallback =
  'const b=buildPreviewPdfHtml(_,d),k=await api.post("/api/pdf/preview",{html:b,fileName:c||s||"ScholarResume",engine:g.engine||"puppeteer"},{responseType:"blob"}),j=String(k.headers&&typeof k.headers.get==="function"?k.headers.get("x-scholarresume-pdf-engine")||"":k.headers&&k.headers["x-scholarresume-pdf-engine"]||""),$=new Blob([j==="client-vector"&&d?buildResumePdf(s,{...d,pdfFont:"serif"}):k.data],{type:"application/pdf"});';

const membershipPatches = [
  {
    name: "saved personal-information value",
    marker: 'membership:""',
    from: 'headline:"Researcher and Academic Professional",email:',
    to: 'headline:"Researcher and Academic Professional",membership:"",email:',
  },
  {
    name: "personal-information selector",
    marker: 'label:"Professional membership"',
    from: 'React.createElement(Input,{label:"Professional headline",value:$.personal.headline,onChange:Ct=>Bt("headline",Ct)}),React.createElement(Input,{label:"Email"',
    to: 'React.createElement(Input,{label:"Professional headline",value:$.personal.headline,onChange:Ct=>Bt("headline",Ct)}),React.createElement(SelectField,{label:"Professional membership",value:$.personal.membership||"",onChange:Ct=>Bt("membership",Ct),options:[{value:"",label:"None"},{value:"Senior Member, IEEE",label:"Senior Member, IEEE"}]}),React.createElement(Input,{label:"Email"',
  },
  {
    name: "resume preview membership",
    marker: 'className:"resume-pdf-membership"',
    from: 'o.personal.headline&&React.createElement("p",{className:"resume-pdf-headline"},o.personal.headline),React.createElement("div",{className:"resume-pdf-contact-list"}',
    to: 'o.personal.headline&&React.createElement("p",{className:"resume-pdf-headline"},o.personal.headline),o.personal.membership&&React.createElement("p",{className:"resume-pdf-membership"},o.personal.membership),React.createElement("div",{className:"resume-pdf-contact-list"}',
  },
  {
    name: "vector PDF membership",
    marker: "pt.membership&&nt(pt.membership",
    from: 'pt.headline&&nt(pt.headline,11,b.bold,"0.08 0.12 0.18",0,14,Ut,Pt),g-=2',
    to: 'pt.headline&&nt(pt.headline,11,b.bold,"0.08 0.12 0.18",0,14,Ut,Pt),pt.membership&&nt(pt.membership,10,b.bold,"0.27 0.22 0.79",0,13,Ut,Pt),g-=2',
  },
];

const membershipCss = `
/* ScholarResume professional membership output */
.resume-pdf-membership {
  margin: 0.8mm 0 0;
  color: #4338ca;
  font-size: 10pt;
  font-weight: 700;
  line-height: 1.25;
}
`;

const assetNames = (await readdir(assetsDir)).filter(
  (name) => /^index-[\w-]+\.js$/.test(name),
);

let pdfPatched = 0;
let pdfCurrent = 0;
let membershipPatched = 0;
let membershipCurrent = 0;

for (const assetName of assetNames) {
  const assetPath = path.join(assetsDir, assetName);
  let source = await readFile(assetPath, "utf8");
  let changed = false;

  if (source.includes('k.headers.get("x-scholarresume-pdf-engine")')) {
    pdfCurrent += 1;
  } else if (source.includes(responseToBlob)) {
    source = source.replace(responseToBlob, responseWithVectorFallback);
    pdfPatched += 1;
    changed = true;
  }

  if (source.includes('label:"Professional headline"')) {
    for (const patch of membershipPatches) {
      if (source.includes(patch.marker)) continue;
      if (!source.includes(patch.from)) {
        throw new Error(`Scholar Resume ${patch.name} insertion point was not found in ${assetName}.`);
      }
      source = source.replace(patch.from, patch.to);
      changed = true;
    }

    const missingPatch = membershipPatches.find((patch) => !source.includes(patch.marker));
    if (missingPatch) {
      throw new Error(`Scholar Resume ${missingPatch.name} patch did not apply to ${assetName}.`);
    }

    if (changed) membershipPatched += 1;
    else membershipCurrent += 1;
  }

  if (changed) await writeFile(assetPath, source, "utf8");
}

if (pdfPatched + pdfCurrent === 0) {
  throw new Error("Scholar Resume PDF download function was not found in the bundled assets.");
}

if (membershipPatched + membershipCurrent === 0) {
  throw new Error("Scholar Resume personal-information form was not found in the bundled assets.");
}

const cssNames = (await readdir(assetsDir)).filter((name) => /^index-[\w-]+\.css$/.test(name));
let membershipCssFound = false;
for (const cssName of cssNames) {
  const cssPath = path.join(assetsDir, cssName);
  const cssSource = await readFile(cssPath, "utf8");
  if (cssSource.includes(".resume-pdf-membership")) {
    membershipCssFound = true;
    continue;
  }
  if (!cssSource.includes(".resume-pdf-headline")) continue;
  await writeFile(cssPath, `${cssSource.trimEnd()}${membershipCss}`, "utf8");
  membershipCssFound = true;
}

if (!membershipCssFound) {
  throw new Error("Scholar Resume PDF stylesheet was not found in the bundled assets.");
}

console.log(
  pdfPatched > 0
    ? `Patched ${pdfPatched} Scholar Resume bundle(s) with the styled PDF fallback.`
    : "Scholar Resume styled PDF fallback is already present.",
);
console.log(
  membershipPatched > 0
    ? `Patched ${membershipPatched} Scholar Resume bundle(s) with the professional membership field.`
    : "Scholar Resume professional membership field is already present.",
);
