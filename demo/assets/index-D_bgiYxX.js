var Lt=Object.defineProperty;var Xt=(e,t,i)=>t in e?Lt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var _=(e,t,i)=>Xt(e,typeof t!="symbol"?t+"":t,i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function i(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=i(r);fetch(r.href,o)}})();function vt(e,t){const i=document.createElement("a");i.setAttribute("download",e),i.href=URL.createObjectURL(t),document.body.appendChild(i),i.click(),document.body.removeChild(i)}function $t(e){const t=document.createElement("input");return t.setAttribute("type","file"),t.setAttribute("accept",(e==null?void 0:e.accept)??""),(e==null?void 0:e.multiple)===!0&&t.setAttribute("multiple",""),new Promise(i=>{t.addEventListener("change",()=>{if(t.files){const n=t.files[0];i(n)}}),document.body.appendChild(t),t.click(),document.body.removeChild(t)})}function Pt(){return{characteristicTime:1/60,characteristicSize:.001,characteristicHeight:1e-4,deltaTime:.1,deltaX:1,slopeAngle:1*Math.PI/2,slopeDirection:0,inverseGravity:!1,antiSpread2:0,antiSpread3:0,eta:30,ca:4e-4,stepsPerFrame:40,useDominoRelaxation:!0,useRandomizedDominos:!0,useEnergyConstraint:!1,mobilityFunctionType:"mean-h3",useMaxHeight:!0,maxHeight:1.1,useMinHeight:!1,minHeight:.05,vantzos:{eta:0,epsilon:0,gravity:0}}}function Ut(){return{radius:80,height:.5,action:"replace"}}function Bt(){return{showClamping:!1,shading:"turbo",shadingMax:1,shadingGamma:1}}function Gt(){return{exportedStepCount:10,exportedStepSkipped:0}}class it{constructor(t){_(this,"seed");this.seed=t??0}random(){let t=this.seed+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function mt(e,t,i){return e*(1-i)+t*i}class kt{constructor(t){_(this,"seed");this.seed=t??0}sample(t,i){const n=Math.floor(t),r=Math.floor(i),o=t-n,a=i-r,s=this.hash(n,r),u=this.hash(n,r+1),d=this.hash(n+1,r),g=this.hash(n+1,r+1);return mt(mt(s,u,a),mt(d,g,a),o)}hash(t,i){let n=3430008,r=1000003;return n=(n^this.seed)*r,r+=82524,n=(n^t)*r,r+=82522,n=(n^i)*r,n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}}function Nt(e,t){let i=e.length;const n=t.seed!==void 0?new it(t.seed):Math;for(;i!=0;){let r=Math.floor(n.random()*i);i--,[e[i],e[r]]=[e[r],e[i]]}}class zt{constructor(t,i){_(this,"backend");_(this,"prevPoint");_(this,"stepIndex");_(this,"config");_(this,"simulationSettings");_(this,"brushSettings");_(this,"renderSettings");_(this,"debugSettings");this.backend=t,this.prevPoint=[0,0],this.config=i,this.simulationSettings=Pt(),this.brushSettings=Ut(),this.renderSettings=Bt(),this.debugSettings=Gt(),this.stepIndex=0}BeginStroke(t){this.prevPoint=[...t],this.MoveStroke(t)}MoveStroke(t){const{backend:i,prevPoint:n,brushSettings:r}=this;i.DrawLine(n,t,r),this.prevPoint=[...t]}EndStroke(t){}PauseStroke(t){}ResumeStroke(t){this.prevPoint=[...t],this.MoveStroke(t)}StepSimulation(){const{simulationSettings:t}=this;for(let i=0;i<t.stepsPerFrame;++i)this.SingleStepSimulation()}SingleStepSimulation(){const{backend:t,simulationSettings:i}=this;t.StepSimulation(this.stepIndex,i),this.stepIndex+=1}Render(){const{backend:t,renderSettings:i}=this;t.Render(i)}async ImportState(){const{backend:t,config:i}=this,{width:n,height:r}=i,a=await(await $t({accept:".bin"})).arrayBuffer(),s=new Uint32Array(a,0,4),u=s[0],d=s[1],g=s[2];u!==n&&console.error("Cannot load state from a different size: expected a width of",n,"but found",u),d!==r&&console.error("Cannot load state from a different size: expected a height of",r,"but found",d),g>1&&console.warn("Loading a mult-frame state file, only using the first frame out of",g),s[2]=1;const f=new Float32Array(a,s.length*4,4*n*r);console.assert(f.length===4*n*r),t.ImportState({metadata:s,pixels:f}),this.Render()}async ImportStateFromImage(){const{backend:t,config:i}=this,{width:n,height:r}=i,o=this.brushSettings.height,a=.2*o,s=await $t({accept:".png,.jpg"}),u=await createImageBitmap(s),{width:d,height:g}=u,f=1,S=new OffscreenCanvas(n,r).getContext("2d");if(!S)return;S.drawImage(u,0,0),u.close();const E=S.getImageData(0,0,n,r);d!==n&&console.error("Cannot load state from a different size: expected a width of",n,"but found",d),g!==r&&console.error("Cannot load state from a different size: expected a height of",r,"but found",g);const w=new Uint32Array(4);w[0]=n,w[1]=r,w[2]=f,w[2]=1;const F=new kt,p=new Float32Array(4*n*r);for(let c=0;c<r;++c)for(let y=0;y<4*n;++y){const H=E.data[4*n*c+y]/255,z=H>0?F.sample(y*.1,c*.1)*a:0;p[4*n*(r-1-c)+y]=Math.max(0,H*o+z)}console.assert(p.length===4*n*r),t.ImportState({metadata:w,pixels:p}),this.Render()}ExportState(t){const{backend:i}=this,{metadata:n,pixels:r}=i.ExportState(),o=new Blob([n.buffer,r.buffer]);if(t===void 0){const a=new Date;t=`thin_fluid_state_${a.getFullYear()}-${a.getMonth()+1}-${a.getDate()}_${a.getHours()}${a.getMinutes()}${a.getSeconds()}.bin`}vt(t,o)}async ExportStateMultiSteps(){const{backend:t,simulationSettings:i,debugSettings:n}=this,{exportedStepCount:r,exportedStepSkipped:o}=n,{metadata:a,pixels:s}=t.ExportState(),u=a;u[2]=r,u[3]=o;const d=[s];for(let S=1;S<r*(o+1);++S){if(this.SingleStepSimulation(),S%(o+1)===0){const{pixels:E}=t.ExportState();d.push(E)}S%i.stepsPerFrame==0&&(this.Render(),await new Promise(E=>window.requestAnimationFrame(E)))}this.Render();const g=new Blob([u.buffer,...d.map(S=>S.buffer)]),f=new Date,v=`thin_fluid_state_${f.getFullYear()}-${f.getMonth()+1}-${f.getDate()}_${f.getHours()}${f.getMinutes()}${f.getSeconds()}.bin`;vt(v,g)}Test01(){const{backend:t}=this,i=[128.5,128.5],n={radius:1,height:.5,action:"replace"};t.DrawLine(i,i,n),this.Render()}Test02(){const{backend:t,simulationSettings:i}=this;i.characteristicTime=1/60,i.characteristicSize=.001,i.characteristicHeight=1e-4,i.deltaTime=.02,i.deltaX=1,i.slopeAngle=0,i.eta=50,i.ca=1e-4,i.stepsPerFrame=1;{const n=[128.5,128.5],r={radius:1,height:.5,action:"replace"};t.DrawLine(n,n,r)}{const n=[129.5,128.5],r={radius:1,height:.5,action:"replace"};t.DrawLine(n,n,r)}this.Render()}Test03(){const{backend:t}=this,i=[100,100],n={radius:250,height:.5,action:"replace"};t.DrawLine(i,i,n),this.Render()}Test04(){const{backend:t,config:i}=this,{width:n,height:r}=i,o=new Uint32Array(4);o[0]=n,o[1]=r,o[2]=1;const a=new Float32Array(4*n*r);for(let s=0;s<r;++s)for(let u=0;u<n;++u){const d=4*(u+n*(r-1-s)),g=u%2===s%2?.97:0;a[d]=g}t.ImportState({metadata:o,pixels:a}),this.Render()}Test05(){const{backend:t,config:i}=this,{width:n,height:r}=i,o=new Uint32Array(4);o[0]=n,o[1]=r,o[2]=1;const a=new Float32Array(4*n*r);for(let s=0;s<r;++s)for(let u=0;u<n;++u){const d=4*(u+n*(r-1-s)),g=.36,f=.1,v=Math.PI/2,S=(u-128)*Math.sin(v)+(s-128)*Math.cos(v),E=u>=128?s>=128?g:f:S>0?g:f;a[d]=E}t.ImportState({metadata:o,pixels:a}),this.Render()}Test06(){const{backend:t,simulationSettings:i}=this,n=i.deltaX,r=[60/n,60/n],o={radius:150/n,height:.5,action:"replace"};t.DrawLine(r,r,o),this.Render()}Test07(){const{simulationSettings:t,debugSettings:i}=this;t.characteristicTime=1.85,t.characteristicSize=.00185,t.characteristicHeight=.19*.00185,t.deltaTime=5*.02,t.deltaX=.5,t.slopeAngle=Math.PI/2,t.eta=12,t.ca=5*.0023,t.stepsPerFrame=10,i.exportedStepCount=10,i.exportedStepSkipped=1e3,this.Render()}}function Vt(e){return{simulationSettings:e.simulationSettings,debugSettings:e.debugSettings,renderSettings:e.renderSettings,brushSettings:e.brushSettings}}function Yt(e,t){Object.assign(e.simulationSettings,t.simulationSettings),Object.assign(e.debugSettings,t.debugSettings),Object.assign(e.renderSettings,t.renderSettings),Object.assign(e.brushSettings,t.brushSettings)}const St={simulationSettings:{characteristicTime:.016666666666666666,characteristicSize:.001,characteristicHeight:1e-4,deltaTime:.1,deltaX:1,slopeAngle:1.5707963267948966,slopeDirection:0,inverseGravity:!1,antiSpread2:0,antiSpread3:0,eta:30,ca:4e-4,stepsPerFrame:100,useDominoRelaxation:!0,useRandomizedDominos:!0,useEnergyConstraint:!1,mobilityFunctionType:"meanh-3",useMaxHeight:!0,maxHeight:1.1,useMinHeight:!1,minHeight:.05},debugSettings:{exportedStepCount:10,exportedStepSkipped:0},renderSettings:{showClamping:!1,shading:"turbo",shadingMax:1,shadingGamma:1},brushSettings:{radius:80,height:.5,action:"replace"}},nt={simulationSettings:{characteristicTime:.016666666666666666,characteristicSize:.001,characteristicHeight:1e-4,deltaTime:.1,deltaX:1,slopeAngle:1.5707963267948966,slopeDirection:0,inverseGravity:!1,antiSpread2:0,antiSpread3:0,eta:30,ca:4e-4,stepsPerFrame:100,useDominoRelaxation:!0,useRandomizedDominos:!0,useEnergyConstraint:!0,mobilityFunctionType:"meanh-3",useMaxHeight:!0,maxHeight:3,useMinHeight:!1,minHeight:.05},debugSettings:{exportedStepCount:10,exportedStepSkipped:0},renderSettings:{showClamping:!1,shading:"turbo",shadingMax:1,shadingGamma:1},brushSettings:{radius:80,height:.5,action:"replace"}},Ht={simulationSettings:{characteristicTime:.016666666666666666,characteristicSize:.001,characteristicHeight:1e-4,deltaTime:.1,deltaX:1,slopeAngle:1.5707963267948966,slopeDirection:0,inverseGravity:!1,antiSpread2:0,antiSpread3:0,eta:null,ca:6666666666666668e-20,stepsPerFrame:40,useDominoRelaxation:!0,useRandomizedDominos:!0,useEnergyConstraint:!0,mobilityFunctionType:"vantzos-m1",useMaxHeight:!0,maxHeight:1.1,useMinHeight:!0,minHeight:.05,vantzos:{eta:0,epsilon:15,gravity:7.3}},debugSettings:{exportedStepCount:10,exportedStepSkipped:0},renderSettings:{showClamping:!1,shading:"turbo",shadingMax:1,shadingGamma:1},brushSettings:{radius:80,height:.21,action:"replace"}},qt=Object.freeze(Object.defineProperty({__proto__:null,exportPreset:Vt,importPreset:Yt,oursRegularized:nt,oursSigAsia:St,vantzosLike:Ht},Symbol.toStringTag,{value:"Module"}));class jt{constructor(t){_(this,"ctx");const i=t.getContext("2d");i===null?(console.log("Browser not supported (Could not get canvas 2d context)"),this.ctx=i):this.ctx=i}async Initialize(){return this.ctx!==null}DrawLine(t,i){const{ctx:n}=this;n.lineWidth=10,n.lineCap="round",n.beginPath(),n.moveTo(...t),n.lineTo(...i),n.stroke()}StepSimulation(){}Render(){}ExportState(){throw Error("Not implemented")}ImportState(t){throw Error("Not implemented")}}class Wt{constructor(){_(this,"sampleCount");_(this,"accumulated");_(this,"accumulatedSq");this.sampleCount=0,this.accumulated=0,this.accumulatedSq=0}Reset(){this.sampleCount=0,this.accumulated=0,this.accumulatedSq=0}AddSample(t){++this.sampleCount,this.accumulated+=t,this.accumulatedSq+=t*t}GetAverage(){return this.sampleCount===0?0:this.accumulated/this.sampleCount}GetStddev(){if(this.sampleCount==0)return 0;const t=this.GetAverage(),i=this.accumulatedSq/this.sampleCount-t*t;return Math.sqrt(Math.max(0,i))}}class Qt{constructor(t,i){_(this,"gl");_(this,"ext");_(this,"currentQuery");_(this,"queryPool");_(this,"counters");this.gl=t,this.queryPool=[],this.currentQuery=null,this.counters=i,this.ext=t.getExtension("EXT_disjoint_timer_query_webgl2"),this.ext===null&&console.warn("WebGL extension 'EXT_disjoint_timer_query_webgl2' is not supported. Deactivating timestamp queries."),this.InitializeQueries()}StartQuery(t){const{gl:i,ext:n}=this;if(this.currentQuery!==null){console.error(`There is already an ongoing query! (name: ${this.currentQuery.name})`);return}if(n===null)return;const r=this.GetNextAvailableQuery();r!==null?(r.name=t,r.used=!0,r.ongoing=!0,i.beginQuery(n.TIME_ELAPSED_EXT,r.query),this.currentQuery=r):this.currentQuery=null}EndQuery(){const{gl:t,ext:i,counters:n}=this;if(this.currentQuery===null||i===null)return;t.endQuery(i.TIME_ELAPSED_EXT);const r=this.currentQuery;function o(){if(t.getQueryParameter(r.query,t.QUERY_RESULT_AVAILABLE)){let s=t.getQueryParameter(r.query,t.QUERY_RESULT);n[r.name]===void 0&&(n[r.name]=new Wt),n[r.name].AddSample(s*1e-6),r.used=!1}else setTimeout(o,200)}setTimeout(o,0),this.currentQuery.ongoing=!1,this.currentQuery=null}InitializeQueries(){const{gl:t}=this;for(let i=0;i<100;++i){const n=t.createQuery();if(n===null)return;this.queryPool.push({name:"",used:!1,ongoing:!1,query:n})}this.queryPool.length===0&&console.error("Could not create WebGL queries!")}GetNextAvailableQuery(){for(const t of this.queryPool)if(!t.used)return t;return null}}const Kt=`/**\r
 * ADOBE CONFIDENTIAL\r
 *\r
 * Copyright 2024 Adobe\r
 * All Rights Reserved.\r
 *\r
 * NOTICE: All information contained herein is, and remains the property of Adobe\r
 * and its suppliers, if any. The intellectual and technical concepts contained\r
 * herein are proprietary to Adobe and its suppliers and are protected by all\r
 * applicable intellectual property laws, including trade secret and copyright laws.\r
 * Dissemination of this information or reproduction of this material is strictly\r
 * forbidden unless prior written permission is obtained from Adobe.\r
 */\r
\r
struct SimulationState {\r
	float height;\r
	float prevHeight;\r
};\r
\r
SimulationState unpackSimulationState(vec4 packed) {\r
	return SimulationState(\r
		packed.x,\r
		packed.y\r
	);\r
}\r
\r
vec4 packSimulationState(SimulationState state) {\r
	return vec4(\r
		state.height,\r
		state.prevHeight,\r
		0.0,\r
		0.0\r
	);\r
}\r
`,Zt=`/**
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2024 Adobe
 * All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains the property of Adobe
 * and its suppliers, if any. The intellectual and technical concepts contained
 * herein are proprietary to Adobe and its suppliers and are protected by all
 * applicable intellectual property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material is strictly
 * forbidden unless prior written permission is obtained from Adobe.
 */

float random(vec2 p) {\r
    return fract(sin(dot(p.xy,vec2(12.9898,78.233)))*43758.5453123);\r
}\r
\r
// 2D Noise based on Morgan McGuire @morgan3d\r
// https://www.shadertoy.com/view/4dS3Wd\r
float noise (in vec2 p) {\r
    vec2 i = floor(p);\r
    vec2 f = fract(p);\r
\r
    // Four corners in 2D of a tile\r
    float a = random(i);\r
    float b = random(i + vec2(1.0, 0.0));\r
    float c = random(i + vec2(0.0, 1.0));\r
    float d = random(i + vec2(1.0, 1.0));\r
\r
    // Smooth Interpolation\r
\r
    // Cubic Hermine Curve.  Same as SmoothStep()\r
    vec2 u = f*f*(3.0-2.0*f);\r
    // u = smoothstep(0.,1.,f);\r
\r
    // Mix 4 coorners percentages\r
    return mix(a, b, u.x) +\r
            (c - a)* u.y * (1.0 - u.x) +\r
            (d - b) * u.x * u.y;\r
}\r
`,Jt={"includes/simulation-state.inc.glsl":Kt,"includes/random.inc.glsl":Zt},te={gradient:(e,t)=>`
		vec2 ${e}(ivec2 texel) {
			ivec2 dx = ivec2(1, 0);
			ivec2 dy = ivec2(0, 1);
			return vec2(
				${t[0]}(texel + dx) - ${t[0]}(texel - dx),
				${t[0]}(texel + dy) - ${t[0]}(texel - dy)
			) * 0.5 * uInvDeltaX;
		}
	`,laplacian:(e,t)=>`
		float ${e}(ivec2 texel) {
			ivec2 dx = ivec2(1, 0);
			ivec2 dy = ivec2(0, 1);
			return (
				${t[0]}(texel + dx) + ${t[0]}(texel - dx)
				+ ${t[0]}(texel + dy) + ${t[0]}(texel - dy)
				- 4.0 * ${t[0]}(texel)
			) * uInvSqDeltaX;
		}
	`,divergence:(e,t)=>`
		float ${e}(ivec2 texel) {
			ivec2 dx = ivec2(1, 0);
			ivec2 dy = ivec2(0, 1);
			return (
				${t[0]}(texel + dx).x - ${t[0]}(texel - dx).x
				+ ${t[0]}(texel + dy).y - ${t[0]}(texel - dy).y
			) * 0.5 * uInvDeltaX;
		}
	`},ee={gradient:(e,t)=>`
		vec2 ${e}(ivec2 texel) {
			ivec2 dx = ivec2(1, 0);
			ivec2 dy = ivec2(0, 1);
			return vec2(
				${t[0]}(texel + dx) - ${t[0]}(texel - dx),
				${t[0]}(texel + dy) - ${t[0]}(texel - dy)
			) * 0.5 * uInvDeltaX;
		}
	`,laplacian:(e,[t])=>`
		float ${e}(ivec2 texel) {
			ivec2 dx = ivec2(1, 0);
			ivec2 dy = ivec2(0, 1);
			float gamma = 0.5;
			float diagCoef = gamma * 0.5;
			float axisCoef = 1.0 - gamma;
			float centerCoef = 4.0 - 2.0 * gamma;
			return (
				diagCoef * ${t}(texel - dx - dy)
				+ axisCoef * ${t}(texel - dx)
				+ diagCoef * ${t}(texel - dx + dy)
				+ axisCoef * ${t}(texel - dy)
				- centerCoef * ${t}(texel)
				+ axisCoef * ${t}(texel + dy)
				+ diagCoef * ${t}(texel + dx - dy)
				+ axisCoef * ${t}(texel + dx)
				+ diagCoef * ${t}(texel + dx + dy)
			) * uInvSqDeltaX;
		}
	`,divergence:(e,t)=>`
		float ${e}(ivec2 texel) {
			ivec2 dx = ivec2(1, 0);
			ivec2 dy = ivec2(0, 1);
			return (
				${t[0]}(texel + dx).x - ${t[0]}(texel - dx).x
				+ ${t[0]}(texel + dy).y - ${t[0]}(texel - dy).y
			) * 0.5 * uInvDeltaX;
		}
	`},ne={gradient:(e,t)=>`
		vec2 ${e}(ivec2 texel) {
			ivec2 res = ivec2(uResolution);
			ivec2 dx = ivec2(1, 0);
			ivec2 dy = ivec2(0, 1);
			return vec2(
				${t[0]}((texel + dx) % res) - ${t[0]}((texel - dx + res) % res),
				${t[0]}((texel + dy) % res) - ${t[0]}((texel - dy + res) % res)
			) * 0.5 * uInvDeltaX;
		}
	`,laplacian:(e,t)=>`
		float ${e}(ivec2 texel) {
			ivec2 res = ivec2(uResolution);
			ivec2 dx = ivec2(1, 0);
			ivec2 dy = ivec2(0, 1);
			return (
				${t[0]}((texel + dx) % res) + ${t[0]}((texel - dx + res) % res)
				+ ${t[0]}((texel + dy) % res) + ${t[0]}((texel - dy + res) % res)
				- 4.0 * ${t[0]}(texel)
			) * uInvSqDeltaX;
		}
	`,divergence:(e,t)=>`
		float ${e}(ivec2 texel) {
			ivec2 res = ivec2(uResolution);
			ivec2 dx = ivec2(1, 0);
			ivec2 dy = ivec2(0, 1);
			return (
				${t[0]}((texel + dx) % res).x - ${t[0]}((texel - dx + res) % res).x
				+ ${t[0]}((texel + dy) % res).y - ${t[0]}((texel - dy + res) % res).y
			) * 0.5 * uInvDeltaX;
		}
	`},ie={gradient:(e,t)=>`
		vec2 ${e}(ivec2 texel) {
			ivec2 dx = ivec2(1, 0);
			ivec2 dy = ivec2(0, 1);
			bool noX = isOutOfBounds(texel + dx) || isOutOfBounds(texel - dx);
			bool noY = isOutOfBounds(texel + dy) || isOutOfBounds(texel - dy);
			float gradX = (
				noX
				? 0.0
				: ${t[0]}(texel + dx) - ${t[0]}(texel - dx)
			);
			float gradY = (
				noY
				? 0.0
				: ${t[0]}(texel + dy) - ${t[0]}(texel - dy)
			);
			return vec2(
				gradX,
				gradY
			) * 0.5 * uInvDeltaX;
		}
	`,laplacian:(e,t)=>`
		float ${e}(ivec2 texel) {
			if (isOutOfBounds(texel)) return 0.0;
			ivec2 dx = ivec2(1, 0);
			ivec2 dy = ivec2(0, 1);
			bool noX = isOutOfBounds(texel + dx) || isOutOfBounds(texel - dx);
			bool noY = isOutOfBounds(texel + dy) || isOutOfBounds(texel - dy);
			if (noX && noY) {
				return 0.0;
			} else if (noX) {
				return (
					${t[0]}(texel + dy) + ${t[0]}(texel - dy)
					- 2.0 * ${t[0]}(texel)
				) * uInvSqDeltaX;
			} else if (noY) {
				return (
					${t[0]}(texel + dx) + ${t[0]}(texel - dx)
					- 2.0 * ${t[0]}(texel)
				) * uInvSqDeltaX;
			} else {
				return (
					${t[0]}(texel + dx) + ${t[0]}(texel - dx)
					+ ${t[0]}(texel + dy) + ${t[0]}(texel - dy)
					- 4.0 * ${t[0]}(texel)
				) * uInvSqDeltaX;
			}
		}
	`,divergence:(e,t)=>`
		float ${e}(ivec2 texel) {
			ivec2 dx = ivec2(1, 0);
			ivec2 dy = ivec2(0, 1);
			bool noX = isOutOfBounds(texel + dx) || isOutOfBounds(texel - dx);
			bool noY = isOutOfBounds(texel + dy) || isOutOfBounds(texel - dy);
			if (noX && noY) {
				return 0.0;
			} else if (noX) {
				return (
					${t[0]}(texel + dy).y - ${t[0]}(texel - dy).y
				) * 0.5 * uInvDeltaX;
			} else if (noY) {
				return (
					${t[0]}(texel + dx).x - ${t[0]}(texel - dx).x
				) * 0.5 * uInvDeltaX;
			} else {
				return (
					${t[0]}(texel + dx).x - ${t[0]}(texel - dx).x
					+ ${t[0]}(texel + dy).y - ${t[0]}(texel - dy).y
				) * 0.5 * uInvDeltaX;
			}
		}
	`},re={gradient:(e,[t])=>`
		vec2 ${e}(ivec2 texel) {
			ivec2 dx = ivec2(1, 0);
			ivec2 dy = ivec2(0, 1);
			bool noPX = isOutOfBounds(texel + dx);
			bool noNX = isOutOfBounds(texel - dx);
			bool noPY = isOutOfBounds(texel + dy);
			bool noNY = isOutOfBounds(texel - dy);

			vec2 grad = vec2(0.0);
			if (noPX && noNX) {
				grad.x = 0.0;
			} else if (noPX) {
				grad.x = (
					${t}(texel) - ${t}(texel - dx)
				) * uInvDeltaX;
			} else if (noNX) {
				grad.x = (
					${t}(texel + dx) - ${t}(texel)
				) * uInvDeltaX;
			} else {
				grad.x = (
					${t}(texel + dx) - ${t}(texel - dx)
				) * 0.5 * uInvDeltaX;
			}

			if (noPY && noNY) {
				grad.y = 0.0;
			} else if (noPY) {
				grad.y = (
					${t}(texel) - ${t}(texel - dy)
				) * uInvDeltaX;
			} else if (noNY) {
				grad.y = (
					${t}(texel + dy) - ${t}(texel)
				) * uInvDeltaX;
			} else {
				grad.y = (
					${t}(texel + dy) - ${t}(texel - dy)
				) * 0.5 * uInvDeltaX;
			}

			return grad;
		}
	`,laplacian:(e,[t])=>`
		float ${e}(ivec2 texel) {
			if (isOutOfBounds(texel)) return 0.0;
			ivec2 dx = ivec2(1, 0);
			ivec2 dy = ivec2(0, 1);
			bool noX = isOutOfBounds(texel + dx) || isOutOfBounds(texel - dx);
			bool noY = isOutOfBounds(texel + dy) || isOutOfBounds(texel - dy);
			if (noX && noY) {
				return 0.0;
			} else if (noX) {
				return (
					${t}(texel + dy) + ${t}(texel - dy)
					- 2.0 * ${t}(texel)
				) * uInvSqDeltaX;
			} else if (noY) {
				return (
					${t}(texel + dx) + ${t}(texel - dx)
					- 2.0 * ${t}(texel)
				) * uInvSqDeltaX;
			} else {
				return (
					${t}(texel + dx) + ${t}(texel - dx)
					+ ${t}(texel + dy) + ${t}(texel - dy)
					- 4.0 * ${t}(texel)
				) * uInvSqDeltaX;
			}
		}
	`,divergence:(e,[t])=>`
		float ${e}(ivec2 texel) {
			ivec2 dx = ivec2(1, 0);
			ivec2 dy = ivec2(0, 1);
			bool noPX = isOutOfBounds(texel + dx);
			bool noNX = isOutOfBounds(texel - dx);
			bool noPY = isOutOfBounds(texel + dy);
			bool noNY = isOutOfBounds(texel - dy);
			
			float divX = 0.0;
			if (noPX && noNX) {
				divX = 0.0;
			} else if (noPX) {
				divX = (
					${t}(texel).x - ${t}(texel - dx).x
				) * uInvDeltaX;
			} else if (noNX) {
				divX = (
					${t}(texel + dx).x - ${t}(texel).x
				) * uInvDeltaX;
			} else {
				divX = (
					${t}(texel + dx).x - ${t}(texel - dx).x
				) * 0.5 * uInvDeltaX;
			}

			float divY = 0.0;
			if (noPY && noNY) {
				divY = 0.0;
			} else if (noPY) {
				divY = (
					${t}(texel).y - ${t}(texel - dy).y
				) * uInvDeltaX;
			} else if (noNY) {
				divY = (
					${t}(texel + dy).y - ${t}(texel).y
				) * uInvDeltaX;
			} else {
				divY = (
					${t}(texel + dy).y - ${t}(texel - dy).y
				) * 0.5 * uInvDeltaX;
			}

			return divX + divY;
		}
	`},oe=re;function Rt(e){return e=e.replace(/#include "([^"]+)"/g,t=>{const i=t.substring(10,t.length-1),n=Jt[i];if(n===void 0)throw Error(`Could not include file '${i}', make sure you've added it to the 'shaderIncludes' constants in utils/webgl.ts`);return n}),e=e.replace(/#pragma codegen .*/g,t=>{const i=t.substring(16),[n,r]=i.split("=").map(d=>d.trim()),[o,a]=r.substring(0,r.length-1).split("("),s=a.split(",").map(d=>d.trim()),u=oe[o.trim()];if(u===void 0)throw Error(`Could not find generator '${u}', make sure you've added it to the 'shaderCodeGenerators' constants in utils/webgl.ts`);return console.log(`Running codegen rule ${o} on ${n} <- ${s}`),u(n,s)}),e}function ae(e,t,i){const n=e.createShader(e.VERTEX_SHADER);if(n===null)return null;const r=Rt(t);if(e.shaderSource(n,r),e.compileShader(n),!e.getShaderParameter(n,e.COMPILE_STATUS)){const u=e.getShaderInfoLog(n);return console.error(`Could not compile WebGL vertex shader. 

${u}`,{processedVertexShaderSource:r}),null}const o=e.createShader(e.FRAGMENT_SHADER);if(o===null)return null;const a=Rt(i);if(e.shaderSource(o,a),e.compileShader(o),!e.getShaderParameter(o,e.COMPILE_STATUS)){const u=e.getShaderInfoLog(o);return console.error(`Could not compile WebGL fragment shader. 

${u}`,{processedFragmentShaderSource:a}),null}const s=e.createProgram();if(s===null)return null;if(e.attachShader(s,n),e.attachShader(s,o),e.linkProgram(s),!e.getProgramParameter(s,e.LINK_STATUS)){const u=e.getProgramInfoLog(s);return console.error(`Could not compile WebGL program. 

${u}`),null}return s}function se(e){const t=e.checkFramebufferStatus(e.FRAMEBUFFER);return t!==e.FRAMEBUFFER_COMPLETE?(console.log("Framebuffer incomplete, status:",t),!1):!0}function lt(e,t,i){const n=e.getParameter(e.FRAMEBUFFER_BINDING);e.bindFramebuffer(e.FRAMEBUFFER,t),i(),e.bindFramebuffer(e.FRAMEBUFFER,n)}function le(e,t,i){const n=e.createTexture();if(n===null)return null;e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,t,i,0,e.RGBA,e.FLOAT,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const r=e.createFramebuffer();return r===null?null:(lt(e,r,()=>{if(e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),!se(e))return null}),{fbo:r,color0:n})}function de(e){const t=e.createTexture();if(t===null)return null;const i=[[.18995,.07176,.23217],[.19483,.08339,.26149],[.19956,.09498,.29024],[.20415,.10652,.31844],[.2086,.11802,.34607],[.21291,.12947,.37314],[.21708,.14087,.39964],[.22111,.15223,.42558],[.225,.16354,.45096],[.22875,.17481,.47578],[.23236,.18603,.50004],[.23582,.1972,.52373],[.23915,.20833,.54686],[.24234,.21941,.56942],[.24539,.23044,.59142],[.2483,.24143,.61286],[.25107,.25237,.63374],[.25369,.26327,.65406],[.25618,.27412,.67381],[.25853,.28492,.693],[.26074,.29568,.71162],[.2628,.30639,.72968],[.26473,.31706,.74718],[.26652,.32768,.76412],[.26816,.33825,.7805],[.26967,.34878,.79631],[.27103,.35926,.81156],[.27226,.3697,.82624],[.27334,.38008,.84037],[.27429,.39043,.85393],[.27509,.40072,.86692],[.27576,.41097,.87936],[.27628,.42118,.89123],[.27667,.43134,.90254],[.27691,.44145,.91328],[.27701,.45152,.92347],[.27698,.46153,.93309],[.2768,.47151,.94214],[.27648,.48144,.95064],[.27603,.49132,.95857],[.27543,.50115,.96594],[.27469,.51094,.97275],[.27381,.52069,.97899],[.27273,.5304,.98461],[.27106,.54015,.9893],[.26878,.54995,.99303],[.26592,.55979,.99583],[.26252,.56967,.99773],[.25862,.57958,.99876],[.25425,.5895,.99896],[.24946,.59943,.99835],[.24427,.60937,.99697],[.23874,.61931,.99485],[.23288,.62923,.99202],[.22676,.63913,.98851],[.22039,.64901,.98436],[.21382,.65886,.97959],[.20708,.66866,.97423],[.20021,.67842,.96833],[.19326,.68812,.9619],[.18625,.69775,.95498],[.17923,.70732,.94761],[.17223,.7168,.93981],[.16529,.7262,.93161],[.15844,.73551,.92305],[.15173,.74472,.91416],[.14519,.75381,.90496],[.13886,.76279,.8955],[.13278,.77165,.8858],[.12698,.78037,.8759],[.12151,.78896,.86581],[.11639,.7974,.85559],[.11167,.80569,.84525],[.10738,.81381,.83484],[.10357,.82177,.82437],[.10026,.82955,.81389],[.0975,.83714,.80342],[.09532,.84455,.79299],[.09377,.85175,.78264],[.09287,.85875,.7724],[.09267,.86554,.7623],[.0932,.87211,.75237],[.09451,.87844,.74265],[.09662,.88454,.73316],[.09958,.8904,.72393],[.10342,.896,.715],[.10815,.90142,.70599],[.11374,.90673,.69651],[.12014,.91193,.6866],[.12733,.91701,.67627],[.13526,.92197,.66556],[.14391,.9268,.65448],[.15323,.93151,.64308],[.16319,.93609,.63137],[.17377,.94053,.61938],[.18491,.94484,.60713],[.19659,.94901,.59466],[.20877,.95304,.58199],[.22142,.95692,.56914],[.23449,.96065,.55614],[.24797,.96423,.54303],[.2618,.96765,.52981],[.27597,.97092,.51653],[.29042,.97403,.50321],[.30513,.97697,.48987],[.32006,.97974,.47654],[.33517,.98234,.46325],[.35043,.98477,.45002],[.36581,.98702,.43688],[.38127,.98909,.42386],[.39678,.99098,.41098],[.41229,.99268,.39826],[.42778,.99419,.38575],[.44321,.99551,.37345],[.45854,.99663,.3614],[.47375,.99755,.34963],[.48879,.99828,.33816],[.50362,.99879,.32701],[.51822,.9991,.31622],[.53255,.99919,.30581],[.54658,.99907,.29581],[.56026,.99873,.28623],[.57357,.99817,.27712],[.58646,.99739,.26849],[.59891,.99638,.26038],[.61088,.99514,.2528],[.62233,.99366,.24579],[.63323,.99195,.23937],[.64362,.98999,.23356],[.65394,.98775,.22835],[.66428,.98524,.2237],[.67462,.98246,.2196],[.68494,.97941,.21602],[.69525,.9761,.21294],[.70553,.97255,.21032],[.71577,.96875,.20815],[.72596,.9647,.2064],[.7361,.96043,.20504],[.74617,.95593,.20406],[.75617,.95121,.20343],[.76608,.94627,.20311],[.77591,.94113,.2031],[.78563,.93579,.20336],[.79524,.93025,.20386],[.80473,.92452,.20459],[.8141,.91861,.20552],[.82333,.91253,.20663],[.83241,.90627,.20788],[.84133,.89986,.20926],[.8501,.89328,.21074],[.85868,.88655,.2123],[.86709,.87968,.21391],[.8753,.87267,.21555],[.88331,.86553,.21719],[.89112,.85826,.2188],[.8987,.85087,.22038],[.90605,.84337,.22188],[.91317,.83576,.22328],[.92004,.82806,.22456],[.92666,.82025,.2257],[.93301,.81236,.22667],[.93909,.80439,.22744],[.94489,.79634,.228],[.95039,.78823,.22831],[.9556,.78005,.22836],[.96049,.77181,.22811],[.96507,.76352,.22754],[.96931,.75519,.22663],[.97323,.74682,.22536],[.97679,.73842,.22369],[.98,.73,.22161],[.98289,.7214,.21918],[.98549,.7125,.2165],[.98781,.7033,.21358],[.98986,.69382,.21043],[.99163,.68408,.20706],[.99314,.67408,.20348],[.99438,.66386,.19971],[.99535,.65341,.19577],[.99607,.64277,.19165],[.99654,.63193,.18738],[.99675,.62093,.18297],[.99672,.60977,.17842],[.99644,.59846,.17376],[.99593,.58703,.16899],[.99517,.57549,.16412],[.99419,.56386,.15918],[.99297,.55214,.15417],[.99153,.54036,.1491],[.98987,.52854,.14398],[.98799,.51667,.13883],[.9859,.50479,.13367],[.9836,.49291,.12849],[.98108,.48104,.12332],[.97837,.4692,.11817],[.97545,.4574,.11305],[.97234,.44565,.10797],[.96904,.43399,.10294],[.96555,.42241,.09798],[.96187,.41093,.0931],[.95801,.39958,.08831],[.95398,.38836,.08362],[.94977,.37729,.07905],[.94538,.36638,.07461],[.94084,.35566,.07031],[.93612,.34513,.06616],[.93125,.33482,.06218],[.92623,.32473,.05837],[.92105,.31489,.05475],[.91572,.3053,.05134],[.91024,.29599,.04814],[.90463,.28696,.04516],[.89888,.27824,.04243],[.89298,.26981,.03993],[.88691,.26152,.03753],[.88066,.25334,.03521],[.87422,.24526,.03297],[.8676,.2373,.03082],[.86079,.22945,.02875],[.8538,.2217,.02677],[.84662,.21407,.02487],[.83926,.20654,.02305],[.83172,.19912,.02131],[.82399,.19182,.01966],[.81608,.18462,.01809],[.80799,.17753,.0166],[.79971,.17055,.0152],[.79125,.16368,.01387],[.7826,.15693,.01264],[.77377,.15028,.01148],[.76476,.14374,.01041],[.75556,.13731,.00942],[.74617,.13098,.00851],[.73661,.12477,.00769],[.72686,.11867,.00695],[.71692,.11268,.00629],[.7068,.1068,.00571],[.6965,.10102,.00522],[.68602,.09536,.00481],[.67535,.0898,.00449],[.66449,.08436,.00424],[.65345,.07902,.00408],[.64223,.0738,.00401],[.63082,.06868,.00401],[.61923,.06367,.0041],[.60746,.05878,.00427],[.5955,.05399,.00453],[.58336,.04931,.00486],[.57103,.04474,.00529],[.55852,.04028,.00579],[.54583,.03593,.00638],[.53295,.03169,.00705],[.51989,.02756,.0078],[.50664,.02354,.00863],[.49321,.01963,.00955],[.4796,.01583,.01055]],n=new Float32Array(i.map(o=>[...o,1]).flat()),r=i.length;return e.bindTexture(e.TEXTURE_2D,t),e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,r,1,0,e.RGBA,e.FLOAT,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.bindTexture(e.TEXTURE_2D,null),t}const gt=`#version 300 es
/**
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2024 Adobe
 * All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains the property of Adobe
 * and its suppliers, if any. The intellectual and technical concepts contained
 * herein are proprietary to Adobe and its suppliers and are protected by all
 * applicable intellectual property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material is strictly
 * forbidden unless prior written permission is obtained from Adobe.
 */

precision mediump float;

in vec2 aPosition;

uniform vec2 uOffset;
uniform vec2 uScale;

out vec2 vUv;

void main() {
	vUv = aPosition.xy;
	gl_Position = vec4(uScale * (aPosition - 0.5) + uOffset, 0.0, 1.0);
}
`,ue=`#version 300 es\r
/**\r
 * ADOBE CONFIDENTIAL\r
 *\r
 * Copyright 2024 Adobe\r
 * All Rights Reserved.\r
 *\r
 * NOTICE: All information contained herein is, and remains the property of Adobe\r
 * and its suppliers, if any. The intellectual and technical concepts contained\r
 * herein are proprietary to Adobe and its suppliers and are protected by all\r
 * applicable intellectual property laws, including trade secret and copyright laws.\r
 * Dissemination of this information or reproduction of this material is strictly\r
 * forbidden unless prior written permission is obtained from Adobe.\r
 */\r
\r
precision mediump float;\r
\r
#include "includes/simulation-state.inc.glsl"\r
\r
in vec2 vUv;\r
\r
out vec4 oFragColor;\r
\r
uniform float uHeight;\r
\r
void main() {\r
	float distance = length(vUv - vec2(0.5));\r
	if (distance > 0.5) {\r
		discard;\r
	}\r
\r
	SimulationState state;\r
	state.height = uHeight;\r
	oFragColor = packSimulationState(state);\r
}\r
`,ce=`#version 300 es\r
/**\r
 * ADOBE CONFIDENTIAL\r
 *\r
 * Copyright 2024 Adobe\r
 * All Rights Reserved.\r
 *\r
 * NOTICE: All information contained herein is, and remains the property of Adobe\r
 * and its suppliers, if any. The intellectual and technical concepts contained\r
 * herein are proprietary to Adobe and its suppliers and are protected by all\r
 * applicable intellectual property laws, including trade secret and copyright laws.\r
 * Dissemination of this information or reproduction of this material is strictly\r
 * forbidden unless prior written permission is obtained from Adobe.\r
 */\r
\r
precision mediump float;\r
\r
#include "includes/simulation-state.inc.glsl"\r
#include "includes/random.inc.glsl"\r
\r
uniform sampler2D uPreviousState;\r
\r
// Canvas Config\r
uniform uvec2 uResolution;\r
\r
// Simulation Settings\r
uniform float uDeltaTime;\r
uniform float uDeltaX;\r
uniform float uSlopeAngle;\r
uniform float uEta;\r
uniform float uCa;\r
uniform float uEpsilon;\r
\r
// Some precomputed values deriving from uniforms\r
uniform float uInv3CaEta2;\r
uniform float uEta2Epsilon3;\r
uniform float u3EpsilonOver8;\r
uniform float uGravityDirectionZ;\r
uniform vec2 uGravityDirectionXY;\r
\r
uniform float uInvDeltaX;\r
uniform float uInvSqDeltaX;\r
\r
// Height used for max clamping, if enabled\r
uniform float uMaxHeight;\r
\r
// Ad-hoc factor that acts as a coesive force for the water, that does the\r
// opposite of spread (caused by gravity).\r
uniform float uAntiSpread2;\r
uniform float uAntiSpread3;\r
	\r
in vec2 vUv;\r
\r
out vec4 oFragColor;\r
\r
#define PI 3.14159266\r
\r
// Try to balance matter creation due to clamping\r
//#define USE_EXCESS_BALANCING\r
\r
// Variant of USE_EXCESS_BALANCING\r
//#define USE_EXCESS_BALANCING2\r
\r
// Clamp heights that are too important (lossing matter, but avoiding explosions)\r
#define USE_MAX_HEIGHT\r
// Same as USE_EXCESS_BALANCING2 for max\r
#define USE_MAX_HEIGHT_BALANCING\r
\r
// Clamp the flow towards a cell whose value exceeds uMaxHeight\r
//#define USE_MAX_HEIGHT_FLOW\r
\r
//#define USE_TORUS_BOUNDARIES\r
//#define USE_PROCEDURAL_GRAVITY\r
\r
// If defined, obstacles are "holes" where fluid gets lost\r
// If not, obstacles are "walls" where fluid bounces\r
//#define USE_OBSTACLES_AS_HOLES\r
\r
// If defined, null out some flow terms to avoid NaN when there is accumulation\r
//#define USE_CLAMP_HACK\r
\r
// If defined, compute h^3[x+1/2] from the average h[x+1/2] instead of\r
// averaging h^3[x] and h^3[x+1] (i.e., there is a factor 4 between the two\r
// approaches).\r
// (Not recommended)\r
//#define AVERAGE_H_BEFORE_CUBE\r
\r
bool isCloseToBounds(ivec2 texel, int distance) {\r
#ifdef USE_TORUS_BOUNDARIES\r
	return false; // use torus\r
#else // USE_TORUS_BOUNDARIES\r
	ivec2 res = ivec2(uResolution);\r
	return texel.x < distance || texel.x >= res.x - distance || texel.y < distance || texel.y >= res.y - distance;\r
#endif // USE_TORUS_BOUNDARIES\r
}\r
\r
bool isInObstacle(ivec2 texel) {\r
	return length(vec2(texel - ivec2(300, 300))) < 40.0; \r
}\r
\r
bool isOutOfBounds(ivec2 texel) {\r
	//return isCloseToBounds(texel, 10);\r
	return isCloseToBounds(texel, 10) || isInObstacle(texel);\r
}\r
\r
SimulationState fetchState(ivec2 texel) {\r
	vec4 packed = texelFetch(uPreviousState, texel, 0);\r
	return unpackSimulationState(packed);\r
}\r
\r
float fetchHeight(ivec2 texel) {\r
#ifdef USE_OBSTACLES_AS_HOLES\r
	if (isOutOfBounds(texel)) {\r
		return 0.0f;\r
	} else\r
#endif // USE_OBSTACLES_AS_HOLES\r
	{\r
#ifdef USE_TORUS_BOUNDARIES\r
		texel = texel % ivec2(uResolution)\r
#endif // USE_TORUS_BOUNDARIES\r
		float height = max(fetchState(texel).height, 0.0);\r
#ifdef USE_MAX_HEIGHT\r
		height = min(height, uMaxHeight);\r
#endif // USE_MAX_HEIGHT\r
		return height;\r
	}\r
}\r
\r
float fetchHeightExcess(ivec2 texel) {\r
	if (isOutOfBounds(texel)) {\r
		return 0.0;\r
	} else {\r
#ifdef USE_TORUS_BOUNDARIES\r
		texel = texel % ivec2(uResolution)\r
#endif // USE_TORUS_BOUNDARIES\r
		float excess = max(-fetchState(texel).height, 0.0);\r
#ifdef USE_MAX_HEIGHT\r
		excess = min(excess, uMaxHeight);\r
#endif // USE_MAX_HEIGHT\r
		return excess;\r
	}\r
}\r
\r
float proceduralGravityAngle(ivec2 texel) {\r
	//float fac = random(vec2(texel) / vec2(uResolution));\r
	float fac = noise(0.2 * vec2(texel));\r
	return mix(0.0 * PI / 2.0, 0.2 * PI / 2.0, fac);\r
}\r
\r
float fetchGravityZ(ivec2 texel) {\r
#ifdef USE_PROCEDURAL_GRAVITY\r
	return -cos(proceduralGravityAngle(texel));\r
#else\r
	return uGravityDirectionZ; // TODO: replace with a texture lookup\r
#endif\r
}\r
\r
vec2 fetchGravityXY(ivec2 texel) {\r
#ifdef USE_PROCEDURAL_GRAVITY\r
	return vec2(0.0, -sin(proceduralGravityAngle(texel)));\r
#else\r
	return uGravityDirectionXY; // TODO: replace with a texture lookup\r
#endif\r
}\r
\r
float fetchDivergenceOfMainTerm(ivec2 texel) {\r
	float h_x0ym2 = fetchHeight(texel + ivec2(0, -2));\r
\r
	float h_xm1ym1 = fetchHeight(texel + ivec2(-1, -1));\r
	float h_x0ym1 = fetchHeight(texel + ivec2(0, -1));\r
	float h_x1ym1 = fetchHeight(texel + ivec2(1, -1));\r
\r
	float h_xm2y0 = fetchHeight(texel + ivec2(-2, 0));\r
	float h_xm1y0 = fetchHeight(texel + ivec2(-1, 0));\r
	float h_x0y0 = fetchHeight(texel + ivec2(0, 0));\r
	float h_x1y0 = fetchHeight(texel + ivec2(1, 0));\r
	float h_x2y0 = fetchHeight(texel + ivec2(2, 0));\r
\r
	float h_xm1y1 = fetchHeight(texel + ivec2(-1, 1));\r
	float h_x0y1 = fetchHeight(texel + ivec2(0, 1));\r
	float h_x1y1 = fetchHeight(texel + ivec2(1, 1));\r
\r
	float h_x0y2 = fetchHeight(texel + ivec2(0, 2));\r
\r
	vec2 gxy_x1y0 = fetchGravityXY(texel + ivec2(1, 0));\r
	vec2 gxy_x0y1 = fetchGravityXY(texel + ivec2(0, 1));\r
	vec2 gxy_x0y0 = fetchGravityXY(texel);\r
	vec2 gxy_xm1y0 = fetchGravityXY(texel + ivec2(-1, 0));\r
	vec2 gxy_x0ym1 = fetchGravityXY(texel + ivec2(0, -1));\r
\r
	float gz_x0y0 = fetchGravityZ(texel);\r
	float gz_x1y0 = fetchGravityZ(texel + ivec2(1, 0));\r
	float gz_xm1y0 = fetchGravityZ(texel + ivec2(-1, 0));\r
	float gz_x0y1 = fetchGravityZ(texel + ivec2(0, 1));\r
	float gz_x0ym1 = fetchGravityZ(texel + ivec2(0, -1));\r
\r
	float h_px = 0.5 * (h_x0y0 + h_x1y0);\r
	float h_mx = 0.5 * (h_x0y0 + h_xm1y0);\r
	float h_py = 0.5 * (h_x0y0 + h_x0y1);\r
	float h_my = 0.5 * (h_x0y0 + h_x0ym1);\r
\r
#ifdef AVERAGE_H_BEFORE_CUBE\r
	float h2_px = h_px * h_px;\r
	float h2_mx = h_mx * h_mx;\r
	float h2_py = h_py * h_py;\r
	float h2_my = h_my * h_my;\r
	float h3_px = h_px * h_px * h_px;\r
	float h3_mx = h_mx * h_mx * h_mx;\r
	float h3_py = h_py * h_py * h_py;\r
	float h3_my = h_my * h_my * h_my;\r
#else // AVERAGE_H_BEFORE_CUBE\r
	float h2_px = 0.5 * (h_x0y0*h_x0y0 + h_x1y0*h_x1y0);\r
	float h2_mx = 0.5 * (h_x0y0*h_x0y0 + h_xm1y0*h_xm1y0);\r
	float h2_py = 0.5 * (h_x0y0*h_x0y0 + h_x0y1*h_x0y1);\r
	float h2_my = 0.5 * (h_x0y0*h_x0y0 + h_x0ym1*h_x0ym1);\r
	float h3_px = 0.5 * (h_x0y0*h_x0y0*h_x0y0 + h_x1y0*h_x1y0*h_x1y0);\r
	float h3_mx = 0.5 * (h_x0y0*h_x0y0*h_x0y0 + h_xm1y0*h_xm1y0*h_xm1y0);\r
	float h3_py = 0.5 * (h_x0y0*h_x0y0*h_x0y0 + h_x0y1*h_x0y1*h_x0y1);\r
	float h3_my = 0.5 * (h_x0y0*h_x0y0*h_x0y0 + h_x0ym1*h_x0ym1*h_x0ym1);\r
#endif // AVERAGE_H_BEFORE_CUBE\r
\r
	float c = 11.0 / 16.0;\r
	float s = 1.0 - c;\r
\r
	// flow_x(x + 0.5, y)\r
	vec2 vu_x_px = uEpsilon * (mat2(c, s, s, c) * vec2(gz_x0y0, gz_x1y0)) - 5.0f * uEta2Epsilon3;\r
	float flow_x_px = (\r
		h_x0y0 * vu_x_px.x - h_x1y0 * vu_x_px.y\r
		- (h_x1ym1 - h_x0ym1) * uEta2Epsilon3\r
		- (h_x2y0 - h_xm1y0) * uEta2Epsilon3\r
		- (h_x1y1 - h_x0y1) * uEta2Epsilon3\r
	) - 0.5 * (gxy_x1y0.x + gxy_x0y0.x);\r
	flow_x_px *= h3_px;\r
\r
	// flow_x(x - 0.5, y)\r
	vec2 vu_x_mx = uEpsilon * (mat2(c, s, s, c) * vec2(gz_xm1y0, gz_x0y0)) - 5.0f * uEta2Epsilon3;\r
	float flow_x_mx = (\r
		h_xm1y0 * vu_x_mx.x - h_x0y0 * vu_x_mx.y\r
		- (h_x0ym1 - h_xm1ym1) * uEta2Epsilon3\r
		- (h_x1y0 - h_xm2y0) * uEta2Epsilon3\r
		- (h_x0y1 - h_xm1y1) * uEta2Epsilon3\r
	) - 0.5 * (gxy_x0y0.x + gxy_xm1y0.x);\r
	flow_x_mx *= h3_mx;\r
\r
	// flow_y(x, y + 0.5)\r
	vec2 vu_y_py = uEpsilon * (mat2(c, s, s, c) * vec2(gz_x0y0, gz_x0y1)) - 5.0f * uEta2Epsilon3;\r
	float flow_y_py = (\r
		h_x0y0 * vu_y_py.x - h_x0y1 * vu_y_py.y\r
		- (h_xm1y1 - h_xm1y0) * uEta2Epsilon3\r
		- (h_x0y2 - h_x0ym1) * uEta2Epsilon3\r
		- (h_x1y1 - h_x1y0) * uEta2Epsilon3\r
	) - 0.5 * (gxy_x0y1.y + gxy_x0y0.y);\r
	flow_y_py *= h3_py;\r
\r
	// flow_y(x, y - 0.5)\r
	vec2 vu_y_my = uEpsilon * (mat2(c, s, s, c) * vec2(gz_x0ym1, gz_x0y0)) - 5.0f * uEta2Epsilon3;\r
	float flow_y_my = (\r
		h_x0ym1 * vu_y_my.x - h_x0y0 * vu_y_my.y\r
		- (h_xm1y0 - h_xm1ym1) * uEta2Epsilon3\r
		- (h_x0y1 - h_x0ym2) * uEta2Epsilon3\r
		- (h_x1y0 - h_x1ym1) * uEta2Epsilon3\r
	) - 0.5 * (gxy_x0y0.y + gxy_x0ym1.y);\r
	flow_y_my *= h3_my;\r
\r
	// Anti-spread in h^2 grad h and h^3 grad h\r
	flow_x_px += (h_x0y0 - h_x1y0) * uEpsilon * (h2_px * uAntiSpread2 + h3_px * uAntiSpread3);\r
	flow_x_mx += (h_xm1y0 - h_x0y0) * uEpsilon * (h2_mx * uAntiSpread2 + h3_mx * uAntiSpread3);\r
	flow_y_py += (h_x0y0 - h_x0y1) * uEpsilon * (h2_py * uAntiSpread2 + h3_py * uAntiSpread3);\r
	flow_y_my += (h_x0ym1 - h_x0y0) * uEpsilon * (h2_my * uAntiSpread2 + h3_my * uAntiSpread3);\r
\r
	// TODO: Avoid computing these if they are not needed in the end\r
#ifndef USE_OBSTACLES_AS_HOLES\r
	if (isOutOfBounds(texel + ivec2(1, 0))) {\r
		flow_x_px = 0.0;\r
	}\r
	if (isOutOfBounds(texel + ivec2(-1, 0))) {\r
		flow_x_mx = 0.0;\r
	}\r
	if (isOutOfBounds(texel + ivec2(0, 1))) {\r
		flow_y_py = 0.0;\r
	}\r
	if (isOutOfBounds(texel + ivec2(0, -1))) {\r
		flow_y_my = 0.0;\r
	}\r
#endif // NOT USE_OBSTACLES_AS_HOLES\r
\r
#ifdef USE_CLAMP_HACK\r
	float th = 10.0 / uInv3CaEta2;\r
	if (abs(flow_x_px) > th) {\r
		flow_x_px = th * sign(flow_x_px);\r
	}\r
	if (abs(flow_x_mx) > th) {\r
		flow_x_mx = th * sign(flow_x_mx);\r
	}\r
	if (abs(flow_y_py) > th) {\r
		flow_y_py = th * sign(flow_y_py);\r
	}\r
	if (abs(flow_y_my) > th) {\r
		flow_y_my = th * sign(flow_y_my);\r
	}\r
	// Stop NaN propagation\r
	if (abs(flow_x_px) > 1e6) {\r
		flow_x_px = 0.0;\r
	}\r
	if (abs(flow_x_mx) > 1e6) {\r
		flow_x_mx = 0.0;\r
	}\r
	if (abs(flow_y_py) > 1e6) {\r
		flow_y_py = 0.0;\r
	}\r
	if (abs(flow_y_my) > 1e6) {\r
		flow_y_my = 0.0;\r
	}\r
#endif // USE_CLAMP_HACK\r
\r
#ifdef USE_MAX_HEIGHT_FLOW\r
	if (h_x0y0 > uMaxHeight) {\r
		flow_x_px = min(flow_x_px, 0.0);\r
		flow_x_mx = max(flow_x_mx, 0.0);\r
		flow_y_py = min(flow_y_py, 0.0);\r
		flow_y_my = max(flow_y_my, 0.0);\r
	}\r
	if (h_x1y0 > uMaxHeight) {\r
		flow_x_px = max(flow_x_px, 0.0);\r
	}\r
	if (h_xm1y0 > uMaxHeight) {\r
		flow_x_mx = min(flow_x_mx, 0.0);\r
	}\r
	if (h_x0y1 > uMaxHeight) {\r
		flow_y_py = max(flow_y_py, 0.0);\r
	}\r
	if (h_x0ym1 > uMaxHeight) {\r
		flow_y_my = min(flow_y_my, 0.0);\r
	}\r
#endif // USE_MAX_HEIGHT_FLOW\r
\r
	return flow_x_px - flow_x_mx + flow_y_py - flow_y_my;\r
}\r
\r
void main() {\r
	ivec2 texel = ivec2(vUv * vec2(uResolution));\r
	SimulationState state = fetchState(texel);\r
\r
	float dHeight_dTime = uInv3CaEta2 * fetchDivergenceOfMainTerm(texel);\r
	float deltaHeight = dHeight_dTime * uDeltaTime;\r
\r
	// Hacky evaporation to test an alternative to boundary conditions\r
	//if (isCloseToBounds(texel, 50)) {\r
	//	deltaHeight = mix(deltaHeight, -state.height, 0.01);\r
	//}\r
\r
#ifdef USE_EXCESS_BALANCING\r
	float maxExcessBalancing = 3.0;\r
	// Hack to balance excess from previous iteration by deducing a quarter of\r
	// the neighbor's excess from previous frame.\r
	ivec2 dx = ivec2(1, 0);\r
	ivec2 dy = ivec2(0, 1);\r
	deltaHeight -= min((\r
		fetchHeightExcess(texel + dx)\r
		+ fetchHeightExcess(texel - dx)\r
		+ fetchHeightExcess(texel + dy)\r
		+ fetchHeightExcess(texel - dy)\r
	) * 0.25, maxExcessBalancing);\r
#endif // USE_EXCESS_BALANCING\r
\r
	SimulationState nextState;\r
	nextState.prevHeight = state.height;\r
\r
	// simple method\r
#ifdef USE_EXCESS_BALANCING2\r
	float height = state.height;\r
#else // USE_EXCESS_BALANCING2\r
	float height = max(state.height, 0.0);\r
#endif // USE_EXCESS_BALANCING2\r
\r
#ifdef USE_MAX_HEIGHT\r
#  ifndef USE_MAX_HEIGHT_BALANCING\r
	height = min(state.height, uMaxHeight);\r
#  endif // USE_MAX_HEIGHT_BALANCING\r
#endif // USE_MAX_HEIGHT\r
\r
	nextState.height = height + deltaHeight;\r
\r
	oFragColor = packSimulationState(nextState);\r
}\r
\r
`,he=`#version 300 es
/**
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2024 Adobe
 * All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains the property of Adobe
 * and its suppliers, if any. The intellectual and technical concepts contained
 * herein are proprietary to Adobe and its suppliers and are protected by all
 * applicable intellectual property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material is strictly
 * forbidden unless prior written permission is obtained from Adobe.
 */

precision mediump float;

#include "includes/simulation-state.inc.glsl"
#include "includes/random.inc.glsl"

uniform sampler2D uPreviousState;

// Index of the sub-step of the domino pattern, in range [0,4[
uniform uint uSubStepIndex;

// Canvas Config
uniform uvec2 uResolution;

// Simulation Settings
uniform float uDeltaTime;
uniform float uDeltaX;
uniform float uSlopeAngle;
uniform float uEta;
uniform float uCa;
uniform float uEpsilon;

// Some precomputed values deriving from uniforms
uniform float uInv3CaEta2;
uniform float uEta2Epsilon3;
uniform float u3EpsilonOver8;
uniform float uGravityDirectionZ;
uniform vec2 uGravityDirectionXY;

uniform float uInvDeltaX;
uniform float uInvSqDeltaX;

// Height used for max clamping, if enabled
uniform uint uUseMaxHeight;
uniform float uMaxHeight;

uniform uint uUseMinHeight;
uniform float uMinHeight;

// Ad-hoc factor that acts as a coesive force for the water, that does the
// opposite of spread (caused by gravity).
uniform float uAntiSpread2;
uniform float uAntiSpread3;

// Offset between two rows of dominos to randomize edge handling order
uniform int uDominoOffset;

uniform uint uUseEnergyConstraint;
uniform uint uMobilityFunctionType;

uniform float uVantzosGravity;
uniform float uVantzosEpsilon;
uniform float uVantzosEta;

in vec2 vUv;

out vec4 oFragColor;

#define PI 3.14159266

#define kMobilityMeanOfCube 0u
#define kMobilityCubeOfMean 1u
#define kMobilityMeanVantzosM1 2u
#define kMobilityMeanVantzosM2 3u

// Clamp the flow towards a cell whose value exceeds uMaxHeight
//#define USE_MAX_HEIGHT_FLOW

//#define USE_TORUS_BOUNDARIES
//#define USE_PROCEDURAL_GRAVITY

// If defined, obstacles are "holes" where fluid gets lost
// If not, obstacles are "walls" where fluid bounces
//#define USE_OBSTACLES_AS_HOLES

// If defined, null out some flow terms to avoid NaN when there is accumulation
//#define USE_CLAMP_HACK

// If defined, compute h^3[x+1/2] from the average h[x+1/2] instead of
// averaging h^3[x] and h^3[x+1] (i.e., there is a factor 4 between the two
// approaches).
// (Not recommended)
//#define AVERAGE_H_BEFORE_CUBE

#define USE_DOMINO4

// Try to speed up spreading of fluid in contact with a border (only works wuth gravity going down)
//#define USE_FLOW_REBALANCING_HACK
#define USE_FLOW_REBALANCING_HACK_FACTOR 0.3

bool isCloseToBounds(ivec2 texel, int distance) {
#ifdef USE_TORUS_BOUNDARIES
	return false; // use torus
#else // USE_TORUS_BOUNDARIES
	ivec2 res = ivec2(uResolution);
	return texel.x < distance || texel.x >= res.x - distance || texel.y < distance || texel.y >= res.y - distance;
#endif // USE_TORUS_BOUNDARIES
}

bool isInObstacle(ivec2 texel) {
	return length(vec2(texel - ivec2(300, 300))) < 40.0; 
}

bool isOutOfBounds(ivec2 texel) {
	//return isCloseToBounds(texel, 10);
	return isCloseToBounds(texel, 10) || isInObstacle(texel);
}

SimulationState fetchState(ivec2 texel) {
	vec4 packed = texelFetch(uPreviousState, texel, 0);
	return unpackSimulationState(packed);
}

float fetchHeight(ivec2 texel) {
#ifdef USE_OBSTACLES_AS_HOLES
	if (isOutOfBounds(texel)) {
		return 0.0f;
	} else
#endif // USE_OBSTACLES_AS_HOLES
	{
#ifdef USE_TORUS_BOUNDARIES
		texel = texel % ivec2(uResolution)
#endif // USE_TORUS_BOUNDARIES
		float height = max(fetchState(texel).height, 0.0);
		if (uUseMaxHeight == 1u) {
			height = min(height, uMaxHeight);
		}
		return height;
	}
}

float fetchHeightExcess(ivec2 texel) {
	if (isOutOfBounds(texel)) {
		return 0.0;
	} else {
#ifdef USE_TORUS_BOUNDARIES
		texel = texel % ivec2(uResolution)
#endif // USE_TORUS_BOUNDARIES
		float excess = max(-fetchState(texel).height, 0.0);
		if (uUseMaxHeight == 1u) {
			excess = min(excess, uMaxHeight);
		}
		return excess;
	}
}

float proceduralGravityAngle(ivec2 texel) {
	//float fac = random(vec2(texel) / vec2(uResolution));
	float fac = noise(0.2 * vec2(texel));
	return mix(0.0 * PI / 2.0, 0.2 * PI / 2.0, fac);
}

float fetchGravityZ(ivec2 texel) {
#ifdef USE_PROCEDURAL_GRAVITY
	return -cos(proceduralGravityAngle(texel));
#else
	return uGravityDirectionZ; // TODO: replace with a texture lookup
#endif
}

vec2 fetchGravityXY(ivec2 texel) {
#ifdef USE_PROCEDURAL_GRAVITY
	return vec2(0.0, -sin(proceduralGravityAngle(texel)));
#else
	return uGravityDirectionXY; // TODO: replace with a texture lookup
#endif
}


float mobility(float h1, float h2) {
	switch (uMobilityFunctionType) {
	case kMobilityMeanOfCube:
		return 0.5 * (h1*h1*h1 + h2*h2*h2);
	case kMobilityCubeOfMean:
		float h = 0.5 * (h1 + h2);
		return h * h * h;
	case kMobilityMeanVantzosM1:
		return 2.0 / (1.0 / abs(h1*h1*h1) + 1.0 / abs(h2*h2*h2));
	case kMobilityMeanVantzosM2:
		return 2.0 * h1 * h1 * h2 * h2 / (h1 + h2);
	default:
		return 0.0;
	}
}


// Compute the flow along +X axis at texel + (1/2,0)
// TODO: Remove unused variables
float fetchFlowX(ivec2 texel) {
	float h_x0ym1 = fetchHeight(texel + ivec2(0, -1));
	float h_x1ym1 = fetchHeight(texel + ivec2(1, -1));

	float h_xm1y0 = fetchHeight(texel + ivec2(-1, 0));
	float h_x0y0 = fetchHeight(texel + ivec2(0, 0));
	float h_x1y0 = fetchHeight(texel + ivec2(1, 0));
	float h_x2y0 = fetchHeight(texel + ivec2(2, 0));

	float h_x0y1 = fetchHeight(texel + ivec2(0, 1));
	float h_x1y1 = fetchHeight(texel + ivec2(1, 1));

	vec2 gxy_x1y0 = fetchGravityXY(texel + ivec2(1, 0));
	vec2 gxy_x0y0 = fetchGravityXY(texel);
	
	float gz_x0y0 = fetchGravityZ(texel);
	float gz_x1y0 = fetchGravityZ(texel + ivec2(1, 0));

	float h_px = 0.5 * (h_x0y0 + h_x1y0);

	float h2_px = 0.0;
	if (uMobilityFunctionType == kMobilityCubeOfMean) {
		h2_px = h_px * h_px;
	} else {
		h2_px = 0.5 * (h_x0y0*h_x0y0 + h_x1y0*h_x1y0);
	}
	
	float h3_px = mobility(h_x0y0, h_x1y0);

	float c = 11.0 / 16.0;
	float s = 1.0 - c;

	float dx3 = uDeltaX * uDeltaX * uDeltaX;

	// flow_x(x + 0.5, y)
	float flow_x_px = (
		(h_x2y0 - h_xm1y0) * uEta2Epsilon3 / dx3
		+ (h_x1y1 - h_x0y1) * uEta2Epsilon3 / dx3
		+ (h_x1ym1 - h_x0ym1) * uEta2Epsilon3 / dx3
		- 5.0 * (h_x1y0 - h_x0y0) * uEta2Epsilon3 / dx3
		+ (gz_x0y0 + gz_x1y0) * (h_x1y0 - h_x0y0) * uEpsilon / (2.0 * uDeltaX)
		+ (h_x0y0 + h_x1y0) * (gz_x1y0 - gz_x0y0) * 3.0 * uEpsilon / (16.0 * uDeltaX)
		+ 0.5 * (gxy_x0y0.x + gxy_x1y0.x)
	);
	flow_x_px *= - h3_px;

	// Anti-spread in h^2 grad h and h^3 grad h
	flow_x_px += (h_x0y0 - h_x1y0) * uEpsilon * (h2_px * uAntiSpread2 + h3_px * uAntiSpread3);

#ifdef USE_FLOW_REBALANCING_HACK
	// Hacky re-balancing in case of clamping, assuming gravity goes down
	bool isBorder_x0ym1 = isOutOfBounds(texel + ivec2(0, -1)) || h_x0ym1 >= uMaxHeight;
	bool isBorder_x1ym1 = isOutOfBounds(texel + ivec2(1, -1)) || h_x1ym1 >= uMaxHeight;
	float adjustment_scale = USE_FLOW_REBALANCING_HACK_FACTOR / (uInv3CaEta2 * uDeltaTime);
	if (isBorder_x0ym1) {
		float flow_adjustment = adjustment_scale * h_x0y0;
		flow_x_px -= flow_adjustment;
	}
	if (isBorder_x1ym1) {
		float flow_adjustment = adjustment_scale * h_x1y0;
		flow_x_px += flow_adjustment;
	}
#endif // USE_FLOW_REBALANCING_HACK

	// TODO: Avoid computing these if they are not needed in the end
#ifndef USE_OBSTACLES_AS_HOLES
	if (isOutOfBounds(texel + ivec2(1, 0))) {
		flow_x_px = 0.0;
	}
#endif // NOT USE_OBSTACLES_AS_HOLES

#ifdef USE_CLAMP_HACK
	float th = 10.0 / uInv3CaEta2;
	if (abs(flow_x_px) > th) {
		flow_x_px = th * sign(flow_x_px);
	}
	// Stop NaN propagation
	if (abs(flow_x_px) > 1e6) {
		flow_x_px = 0.0;
	}
#endif // USE_CLAMP_HACK

	if (uUseEnergyConstraint == 1u) {
		float mobility = h3_px;
		float uDeltaX2 = uDeltaX * uDeltaX;
		float A = 5.0 * uEta2Epsilon3;
		float B = uEpsilon * 0.5 * (gz_x0y0 + gz_x1y0) + uAntiSpread3;
		float theta = 1.0 + 2.0 * 3.0 * uInv3CaEta2 * uDeltaTime * mobility * (A / uDeltaX2 + B) / uDeltaX2;
		flow_x_px /= theta;
	}

	return flow_x_px;
}

// Compute the flow along +Y axis at texel + (0,1/2)
// TODO: Remove unused variables
float fetchFlowY(ivec2 texel) {
	float h_x0ym1 = fetchHeight(texel + ivec2(0, -1));

	float h_xm1y0 = fetchHeight(texel + ivec2(-1, 0));
	float h_x0y0 = fetchHeight(texel + ivec2(0, 0));
	float h_x1y0 = fetchHeight(texel + ivec2(1, 0));

	float h_xm1y1 = fetchHeight(texel + ivec2(-1, 1));
	float h_x0y1 = fetchHeight(texel + ivec2(0, 1));
	float h_x1y1 = fetchHeight(texel + ivec2(1, 1));

	float h_x0y2 = fetchHeight(texel + ivec2(0, 2));

	vec2 gxy_x0y1 = fetchGravityXY(texel + ivec2(0, 1));
	vec2 gxy_x0y0 = fetchGravityXY(texel);

	float gz_x0y0 = fetchGravityZ(texel);
	float gz_x0y1 = fetchGravityZ(texel + ivec2(0, 1));

	float h_py = 0.5 * (h_x0y0 + h_x0y1);

	float h2_py = 0.0;
	if (uMobilityFunctionType == kMobilityCubeOfMean) {
		h2_py = h_py * h_py;
	} else {
		h2_py = 0.5 * (h_x0y0*h_x0y0 + h_x0y1*h_x0y1);
	}
	
	float h3_py = mobility(h_x0y0, h_x0y1);

	float c = 11.0 / 16.0;
	float s = 1.0 - c;
	float dx3 = uDeltaX * uDeltaX * uDeltaX;

	// flow_y(x, y + 0.5)
	float flow_y_py = (
		(h_x0y2 - h_x0ym1) * uEta2Epsilon3 / dx3
		+ (h_x1y1 - h_x1y0) * uEta2Epsilon3 / dx3
		+ (h_xm1y1 - h_xm1y0) * uEta2Epsilon3 / dx3
		- 5.0 * (h_x0y1 - h_x0y0) * uEta2Epsilon3 / dx3
		+ (gz_x0y0 + gz_x0y1) * (h_x0y1 - h_x0y0) * uEpsilon / (2.0 * uDeltaX)
		+ (h_x0y0 + h_x0y1) * (gz_x0y1 - gz_x0y0) * 3.0 * uEpsilon / (16.0 * uDeltaX)
		+ 0.5 * (gxy_x0y0.y + gxy_x0y1.y)
	);
	flow_y_py *= - h3_py;

	// Anti-spread in h^2 grad h and h^3 grad h
	flow_y_py += (h_x0y0 - h_x0y1) * uEpsilon * (h2_py * uAntiSpread2 + h3_py * uAntiSpread3);

	// TODO: Avoid computing these if they are not needed in the end
#ifndef USE_OBSTACLES_AS_HOLES
	if (isOutOfBounds(texel + ivec2(0, 1))) {
		flow_y_py = 0.0;
	}
#endif // NOT USE_OBSTACLES_AS_HOLES

#ifdef USE_CLAMP_HACK
	float th = 10.0 / uInv3CaEta2;
	if (abs(flow_y_py) > th) {
		flow_y_py = th * sign(flow_y_py);
	}
	// Stop NaN propagation
	if (abs(flow_y_py) > 1e6) {
		flow_y_py = 0.0;
	}
#endif // USE_CLAMP_HACK

	if (uUseEnergyConstraint == 1u) {
		float mobility = h3_py;
		float uDeltaX2 = uDeltaX * uDeltaX;
		float A = 5.0 * uEta2Epsilon3;
		float B = uEpsilon * 0.5 * (gz_x0y0 + gz_x0y1) + uAntiSpread3;
		float theta = 1.0 + 2.0 * 3.0 * uInv3CaEta2 * uDeltaTime * mobility * (A / uDeltaX2 + B) / uDeltaX2;
		flow_y_py /= theta;
	}

	return flow_y_py;
}

float W(ivec2 position) {
	return -dot(vec2(position), uGravityDirectionXY) * uVantzosGravity; // * -uGravityDirectionZ
}

// hq is (1,0) for flowX and (0,1) for flowY
float fetchVantzosDeltaH(ivec2 p, ivec2 hq)
{
	/*
    ivec2 imsize = textureSize(u, 0);
    vec2 h = vec2(1.,1.) / vec2(imsize);
    ivec2 pij = ivec2(p * vec2(imsize));
    int par = ((Dij.y + 1) * pij.x + (Dij.x + 1) * pij.y + parity) % 4;
    vec2 hq = vec2(h * vec2(Dij) * float(1 - 2 * (par % 2)));
    int activeFlag = par / 2;
    */
    ivec2 q = p + hq;
    float uDeltaX2 = uDeltaX * uDeltaX;
    ivec2 hperp = ivec2(hq.y, hq.x); // diff perp. to edge
    float Dp = fetchState(p - hq).height + fetchState(p + hperp).height + fetchState(p - hperp).height;
    float Dq = fetchState(q + hq).height + fetchState(q + hperp).height + fetchState(q - hperp).height;
    float up = fetchState(p).height;
    float uq = fetchState(q).height;
    float Mpq = mobility(uq, up) / 3.0;
    float theta = 1.0;
    if (uUseEnergyConstraint == 1u) {
    	theta = 1. + 2. * uDeltaTime * Mpq * (5. * uVantzosEpsilon / uDeltaX2 + uVantzosEta) / uDeltaX2;
    }
    float f = -(Mpq / theta) * ((W(q) - W(p)) - uVantzosEpsilon * (Dq - Dp) + (5. * uVantzosEpsilon + uVantzosEta) * (uq - up));
    float du = uDeltaTime * f;
    return du;
    /*
    up -= max(-uq, min(du, up));
    if (!periodic && (pij.x < 2 || pij.x > imsize.x - 2 || pij.y < 2 || pij.y > imsize.y - 2)) {
        // Neumann b.c. - zero out edge pixels, mobility will prevent flow to them.
        up = 0.;
    }
    fragColor = vec4(up, up, up, 1);
    */
}

void main() {
	ivec2 texel = ivec2(vUv * vec2(uResolution));
	
	SimulationState nextState;
	nextState.prevHeight = fetchState(texel).height;

	// Domino relaxation:
	// * Substep #0: We handle flow from cells at x=2k to cells at x=2k+1
	// * Substep #1: We handle flow from cells at x=2k+1 to cells at x=2k+2
	// * Substep #2: We handle flow from cells at y=2k to cells at y=2k+1
	// * Substep #3: We handle flow from cells at y=2k+1 to cells at y=2k+2
#ifdef USE_DOMINO4
	bool isDominoAlongX = uSubStepIndex < 2u;
	bool isDominoOdd = uSubStepIndex % 2u == 1u;
	int dominoIndex = (
		isDominoAlongX
		? (texel.x + texel.y * uDominoOffset)
		: (texel.x * uDominoOffset + texel.y)
	) + (isDominoOdd ? 1 : 0);

	ivec2 flowDirection = (
		isDominoAlongX
		? ivec2(1,0)
		: ivec2(0,1)
	);
#else // DOMINO8 then
	bool isDominoAlongX = uSubStepIndex < 4u;
	uint parity = uSubStepIndex % 4u;
	ivec2 flowDirection = isDominoAlongX ? ivec2(1,0) : ivec2(0,1);
	int dominoIndex = ((flowDirection.y + 1) * texel.x + (flowDirection.x + 1) * texel.y + int(parity)) % 4;
	// In 8-pass domino scheme, half dominos are inactive
	bool isDominoActive = dominoIndex >= 2;

	if (!isDominoActive) {
		oFragColor = packSimulationState(fetchState(texel));
		return;
	}
#endif // USE_DOMINO4

	// NB: Here "left" may mean top and "right" means bottom but we keep these
	// notations to highlight the symmetry with previous cases.
	bool isLeftTexel = dominoIndex % 2 == 0;

	ivec2 leftTexel = isLeftTexel ? texel : texel - flowDirection;
	ivec2 rightTexel = leftTexel + flowDirection;

	float leftHeight = fetchState(leftTexel).height;
	float rightHeight = fetchState(rightTexel).height;

	//*
	float flow = (
		isDominoAlongX
		? fetchFlowX(leftTexel)
		: fetchFlowY(leftTexel)
	);
	float dHeight_dTime = -uInv3CaEta2 * flow;
	float deltaHeight = dHeight_dTime * uDeltaTime;
	/*/
	float deltaHeight = fetchVantzosDeltaH(leftTexel, flowDirection);
	*/

	// h[2k] -= deltaHeight and h[2k] >= 0, so deltaHeight <= h[2k]
	deltaHeight = min(deltaHeight, leftHeight);
	// h[2k+1] += deltaHeight and h[2k+1] >= 0, so -deltaHeight <= h[2k+1]
	deltaHeight = max(deltaHeight, -rightHeight);

	if (uUseMaxHeight == 1u) {
		// h[2k] -= deltaHeight and h[2k] <= uMaxHeight, so deltaHeight >= h[2k] - uMaxHeight
		deltaHeight = max(deltaHeight, leftHeight - uMaxHeight);
		// h[2k+1] += deltaHeight and h[2k+1] <= uMaxHeight, so deltaHeight <= uMaxHeight - h[2k+1]
		deltaHeight = min(deltaHeight, uMaxHeight - rightHeight);
	}

	// Boundary condition
	if (isOutOfBounds(leftTexel) || isOutOfBounds(rightTexel)) {
		deltaHeight = 0.0;
	}

	nextState.height = (
		isLeftTexel
		? leftHeight - deltaHeight
		: rightHeight + deltaHeight
	);

	if (uUseMinHeight == 1u) {
		nextState.height = max(nextState.height, uMinHeight);
	}

	oFragColor = packSimulationState(nextState);
}

`,fe=`#version 300 es\r
/**\r
 * ADOBE CONFIDENTIAL\r
 *\r
 * Copyright 2024 Adobe\r
 * All Rights Reserved.\r
 *\r
 * NOTICE: All information contained herein is, and remains the property of Adobe\r
 * and its suppliers, if any. The intellectual and technical concepts contained\r
 * herein are proprietary to Adobe and its suppliers and are protected by all\r
 * applicable intellectual property laws, including trade secret and copyright laws.\r
 * Dissemination of this information or reproduction of this material is strictly\r
 * forbidden unless prior written permission is obtained from Adobe.\r
 */\r
\r
precision mediump float;\r
\r
#include "includes/simulation-state.inc.glsl"\r
\r
uniform sampler2D uSimulationState;\r
uniform uvec2 uResolution;\r
\r
uniform uint uShowClamping;\r
uniform uint uShading;\r
uniform float uShadingMax;\r
uniform float uShadingGamma;\r
\r
uniform sampler2D uColorRamp;\r
\r
in vec2 vUv;\r
\r
out vec4 oFragColor;\r
\r
#define kShadingRed 0u\r
#define kShadingColorRamp 1u\r
\r
bool isnan_emu(float x) { return (x > 0.0 || x < 0.0) ? x != x : x != 0.0; }\r
\r
bool isInObstacle(ivec2 texel) {\r
	return length(vec2(texel - ivec2(300, 300))) < 40.0; \r
}\r
\r
void main() {\r
	ivec2 texel = ivec2(vUv * vec2(uResolution));\r
\r
	vec4 packed = texelFetch(uSimulationState, texel, 0);\r
	SimulationState state = unpackSimulationState(packed);\r
	float value = pow(state.height / uShadingMax, uShadingGamma);\r
\r
	switch (uShading) {\r
		case kShadingRed:\r
			oFragColor = (\r
				isnan_emu(value)\r
				? vec4(0.0, 1.0, 0.0, 1.0) // green\r
				: isinf(value)\r
				? vec4(0.0, 0.0, 1.0, 1.0) // blue\r
				: value < 0.0 && uShowClamping != 0u\r
				? vec4(0.0, 1.0, 0.5, 1.0) // turquoise\r
				: value > 2.0\r
				? vec4(1.0, 0.5, 0.0, 1.0) // orange\r
				: vec4(value, 0.0, 0.0, 1.0)\r
			);\r
			break;\r
\r
		case kShadingColorRamp:\r
			oFragColor.rgb = texture(uColorRamp, vec2(value, 0.5)).rgb;\r
			oFragColor.a = 1.0;\r
			break;\r
\r
		default:\r
			break;\r
	}\r
\r
	if (isInObstacle(texel)) {\r
		oFragColor = vec4(1.0);\r
	}\r
}\r
`;function xt(e,t){const{vertexShaderSource:i,fragmentShaderSource:n,uniformNames:r}=t,o=ae(e,i,n);if(o===null)return null;const a=e.createBuffer();if(a===null)return null;e.bindBuffer(e.ARRAY_BUFFER,a);const s=new Float32Array([0,0,1,0,1,1,0,0,1,1,0,1]),u=s.length/2;e.bufferData(e.ARRAY_BUFFER,s,e.STATIC_DRAW);const d=e.createVertexArray();if(d===null)return null;e.bindVertexArray(d);const g=e.getAttribLocation(o,"aPosition");e.enableVertexAttribArray(g),e.vertexAttribPointer(g,2,e.FLOAT,!1,0,0);const f={};for(const v of r){const S=e.getUniformLocation(o,v);S!=null&&(f[v]=S)}return{shaderProgram:o,vbo:a,vao:d,vertexCount:u,uniforms:f}}function pe(e){return e.getExtension("EXT_color_buffer_float")!==null}class me{constructor(t){_(this,"gl");_(this,"config");_(this,"counters");_(this,"timestampManager");_(this,"paintPipeline");_(this,"simulationPipelines");_(this,"renderPipeline");_(this,"framebuffers");_(this,"outputFramebufferIdx");_(this,"prng");_(this,"query");_(this,"colorRamps");const i=t.getContext("webgl2",{preserveDrawingBuffer:!0});i===null?(console.log("Browser not supported (Could not get webgl2 context)"),this.gl=i):this.gl=i,this.config=null,this.counters=null,this.timestampManager=null,this.paintPipeline=null,this.simulationPipelines={},this.renderPipeline=null,this.framebuffers=[null,null],this.outputFramebufferIdx=1,this.prng=new it,this.query=null,this.colorRamps={}}async Initialize(t,i){this.config=t,this.counters=i;const{gl:n}=this;if(n===null||(this.timestampManager=new Qt(n,i),!pe(n)))return!1;const r=xt(n,{vertexShaderSource:gt,fragmentShaderSource:ue,uniformNames:["uOffset","uScale","uHeight"]});if(r===null)return!1;this.paintPipeline=r;const o={regular:ce,domino:he};for(const[g,f]of Object.entries(o)){const v=xt(n,{vertexShaderSource:gt,fragmentShaderSource:f,uniformNames:["uOffset","uScale","uPreviousState","uResolution","uSubStepIndex","uDeltaTime","uDeltaX","uEta","uCa","uEpsilon","uGravityDirectionZ","uGravityDirectionXY","uAntiSpread2","uAntiSpread3","uInvDeltaX","uInvSqDeltaX","uInv3CaEta2","uEta2Epsilon3","u3EpsilonOver8","uUseMaxHeight","uMaxHeight","uUseMinHeight","uMinHeight","uDominoOffset","uUseEnergyConstraint","uMobilityFunctionType","uVantzosGravity","uVantzosEpsilon","uVantzosEta"]});if(v===null)return!1;this.simulationPipelines[g]=v}const a=xt(n,{vertexShaderSource:gt,fragmentShaderSource:fe,uniformNames:["uOffset","uScale","uSimulationState","uResolution","uShowClamping","uShading","uShadingMax","uShadingGamma","uColorRamp"]});if(a===null)return!1;this.renderPipeline=a;const s=this.InitializeFramebuffer();if(s===null)return!1;this.framebuffers[0]=s;const u=this.InitializeFramebuffer();if(u===null)return!1;this.framebuffers[1]=u;const d=de(n);return d!==null&&(this.colorRamps.turbo=d),!0}InitializeFramebuffer(){const{gl:t,config:i}=this;return le(t,i.width,i.height)}DrawLine(t,i,n){const{gl:r,paintPipeline:o}=this,{shaderProgram:a,vao:s,uniforms:u,vertexCount:d}=o,{radius:g,height:f,action:v}=n;console.assert(v==="replace");const S=r.canvas.width,E=r.canvas.height,w=t[0]/S*2-1,F=1-t[1]/E*2,p=this.GetCurrentOutputFramebuffer();lt(r,p.fbo,()=>{r.useProgram(a),r.bindVertexArray(s),r.uniform2f(u.uOffset,w,F),r.uniform1f(u.uHeight,f),r.uniform2f(u.uScale,g/r.canvas.width,g/r.canvas.height),r.drawArrays(r.TRIANGLES,0,d)})}StepSimulation(t,i){const{gl:n,simulationPipelines:r,config:o,prng:a,timestampManager:s}=this;s.StartQuery("StepSimulation"),a.seed=t;const{characteristicHeight:u,characteristicSize:d,deltaTime:g,deltaX:f,slopeAngle:v,slopeDirection:S,inverseGravity:E,antiSpread2:w,antiSpread3:F,eta:p,ca:c,useMaxHeight:y,maxHeight:H,useMinHeight:z,minHeight:K,useDominoRelaxation:j,useRandomizedDominos:ut,useEnergyConstraint:ct,mobilityFunctionType:Z,vantzos:B}=i,T=u/d,W=j?r.domino:r.regular,{shaderProgram:J,vao:P,uniforms:l,vertexCount:x}=W;this.SwapFramebuffers();const m=this.GetCurrentInputFramebuffer(),D=this.GetCurrentOutputFramebuffer();lt(n,D.fbo,()=>{n.useProgram(J),n.bindVertexArray(P),n.uniform2f(l.uOffset,0,0),n.uniform2f(l.uScale,2,2),n.uniform2ui(l.uResolution,o.width,o.height),n.uniform1f(l.uDeltaTime,g),n.uniform1f(l.uDeltaX,f),n.uniform1f(l.uEta,p),n.uniform1f(l.uCa,c),n.uniform1f(l.uEpsilon,T),n.uniform1f(l.uInvDeltaX,1/f),n.uniform1f(l.uInvSqDeltaX,1/(f*f)),n.uniform1f(l.uInv3CaEta2,1/(3*c*p*p)),n.uniform1f(l.uEta2Epsilon3,1*p*p*T*T*T),n.uniform1f(l.u3EpsilonOver8,3/8*T);const b=E?-1:1,O=-b*Math.cos(v),C=-b*Math.sin(v);n.uniform1f(l.uGravityDirectionZ,O),n.uniform2f(l.uGravityDirectionXY,-b*C*Math.sin(S),b*C*Math.cos(S)),n.uniform1f(l.uAntiSpread2,w),n.uniform1f(l.uAntiSpread3,F),n.uniform1ui(l.uUseMaxHeight,y?1:0),n.uniform1f(l.uMaxHeight,H),n.uniform1ui(l.uUseMinHeight,z?1:0),n.uniform1f(l.uMinHeight,K),n.uniform1i(l.uDominoOffset,1);const A=Math.floor(t/4),$=[0,1,2,3];ut&&Nt($,{seed:A}),n.uniform1ui(l.uSubStepIndex,$[t%4]),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,m.color0),n.uniform1i(l.uPreviousState,0),n.uniform1ui(l.uUseEnergyConstraint,ct?1:0),n.uniform1ui(l.uMobilityFunctionType,{"mean-h3":0,"meanh-3":1,"vantzos-m1":2,"vantzos-m2":3}[Z]),n.uniform1f(l.uVantzosGravity,B.gravity),n.uniform1f(l.uVantzosEpsilon,B.epsilon),n.uniform1f(l.uVantzosEta,B.eta),n.drawArrays(n.TRIANGLES,0,x)}),s.EndQuery()}Render(t){const{gl:i,renderPipeline:n,config:r}=this,{shaderProgram:o,vao:a,uniforms:s,vertexCount:u}=n,{showClamping:d,shading:g,shadingMax:f,shadingGamma:v}=t,S=this.GetCurrentOutputFramebuffer();i.useProgram(o),i.bindVertexArray(a),i.uniform2f(s.uOffset,0,0),i.uniform2f(s.uScale,2,2),i.uniform2ui(s.uResolution,r.width,r.height),i.uniform1ui(s.uShowClamping,d?1:0),i.uniform1ui(s.uShading,g==="red"?0:1),i.uniform1f(s.uShadingMax,f),i.uniform1f(s.uShadingGamma,v),i.activeTexture(i.TEXTURE0),i.bindTexture(i.TEXTURE_2D,S.color0),i.uniform1i(s.uSimulationState,0),i.activeTexture(i.TEXTURE1),g==="turbo"&&i.bindTexture(i.TEXTURE_2D,this.colorRamps.turbo),i.uniform1i(s.uColorRamp,1),i.drawArrays(i.TRIANGLES,0,u)}ExportState(){const{gl:t,config:i}=this,{width:n,height:r}=i,o=this.GetCurrentOutputFramebuffer(),a=new Float32Array(4*n*r);lt(t,o.fbo,()=>{t.readPixels(0,0,n,r,t.RGBA,t.FLOAT,a)});const s=new Uint32Array(4);return s[0]=n,s[1]=r,s[2]=1,s[3]=0,{metadata:s,pixels:a}}ImportState(t){const{gl:i,config:n}=this,{width:r,height:o}=n,{pixels:a}=t,s=this.GetCurrentOutputFramebuffer();i.bindTexture(i.TEXTURE_2D,s.color0),i.texImage2D(i.TEXTURE_2D,0,i.RGBA32F,r,o,0,i.RGBA,i.FLOAT,a),i.bindTexture(i.TEXTURE_2D,null)}GetCurrentInputFramebuffer(){const{framebuffers:t,outputFramebufferIdx:i}=this;return t[1-i]}GetCurrentOutputFramebuffer(){const{framebuffers:t,outputFramebufferIdx:i}=this;return t[i]}SwapFramebuffers(){this.outputFramebufferIdx=1-this.outputFramebufferIdx}}var dt=(e=>(e[e.Context2D=0]="Context2D",e[e.WebGL2=1]="WebGL2",e))(dt||{});function ge(e,t){switch(e){case 0:return new jt(t);case 1:return new me(t)}}function xe(){return{width:512,height:512,pixelRatio:1.5}}function st(e,t,i,n){return t+(n==1?0:e*(i-t)/(n-1))}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.19.2
 * @author George Michael Brower
 * @license MIT
 */class X{constructor(t,i,n,r,o="div"){this.parent=t,this.object=i,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(o),this.domElement.classList.add("controller"),this.domElement.classList.add(r),this.$name=document.createElement("div"),this.$name.classList.add("name"),X.nextNameID=X.nextNameID||0,this.$name.id=`lil-gui-name-${++X.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",a=>a.stopPropagation()),this.domElement.addEventListener("keyup",a=>a.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(t){return this._name=t,this.$name.textContent=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("disabled",t),this.$disable.toggleAttribute("disabled",t),this)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const i=this.parent.add(this.object,this.property,t);return i.name(this._name),this.destroy(),i}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.getValue()!==t&&(this.object[this.property]=t,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class ye extends X{constructor(t,i,n){super(t,i,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Et(e){let t,i;return(t=e.match(/(#|0x)?([a-f0-9]{6})/i))?i=t[2]:(t=e.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?i=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=e.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(i=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),i?"#"+i:!1}const _e={isPrimitive:!0,match:e=>typeof e=="string",fromHexString:Et,toHexString:Et},rt={isPrimitive:!0,match:e=>typeof e=="number",fromHexString:e=>parseInt(e.substring(1),16),toHexString:e=>"#"+e.toString(16).padStart(6,0)},ve={isPrimitive:!1,match:e=>Array.isArray(e),fromHexString(e,t,i=1){const n=rt.fromHexString(e);t[0]=(n>>16&255)/255*i,t[1]=(n>>8&255)/255*i,t[2]=(n&255)/255*i},toHexString([e,t,i],n=1){n=255/n;const r=e*n<<16^t*n<<8^i*n<<0;return rt.toHexString(r)}},Se={isPrimitive:!1,match:e=>Object(e)===e,fromHexString(e,t,i=1){const n=rt.fromHexString(e);t.r=(n>>16&255)/255*i,t.g=(n>>8&255)/255*i,t.b=(n&255)/255*i},toHexString({r:e,g:t,b:i},n=1){n=255/n;const r=e*n<<16^t*n<<8^i*n<<0;return rt.toHexString(r)}},Ee=[_e,rt,ve,Se];function be(e){return Ee.find(t=>t.match(e))}class Ae extends X{constructor(t,i,n,r){super(t,i,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=be(this.initialValue),this._rgbScale=r,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const o=Et(this.$text.value);o&&this._setValueFromHexString(o)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const i=this._format.fromHexString(t);this.setValue(i)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class yt extends X{constructor(t,i,n){super(t,i,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",r=>{r.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class we extends X{constructor(t,i,n,r,o,a){super(t,i,n,"number"),this._initInput(),this.min(r),this.max(o);const s=a!==void 0;this.step(s?a:this._getImplicitStep(),s),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,i=!0){return this._step=t,this._stepExplicit=i,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let i=(t-this._min)/(this._max-this._min);i=Math.max(0,Math.min(i,1)),this.$fill.style.width=i*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const i=()=>{let c=parseFloat(this.$input.value);isNaN(c)||(this._stepExplicit&&(c=this._snap(c)),this.setValue(this._clamp(c)))},n=c=>{const y=parseFloat(this.$input.value);isNaN(y)||(this._snapClampSetValue(y+c),this.$input.value=this.getValue())},r=c=>{c.key==="Enter"&&this.$input.blur(),c.code==="ArrowUp"&&(c.preventDefault(),n(this._step*this._arrowKeyMultiplier(c))),c.code==="ArrowDown"&&(c.preventDefault(),n(this._step*this._arrowKeyMultiplier(c)*-1))},o=c=>{this._inputFocused&&(c.preventDefault(),n(this._step*this._normalizeMouseWheel(c)))};let a=!1,s,u,d,g,f;const v=5,S=c=>{s=c.clientX,u=d=c.clientY,a=!0,g=this.getValue(),f=0,window.addEventListener("mousemove",E),window.addEventListener("mouseup",w)},E=c=>{if(a){const y=c.clientX-s,H=c.clientY-u;Math.abs(H)>v?(c.preventDefault(),this.$input.blur(),a=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(y)>v&&w()}if(!a){const y=c.clientY-d;f-=y*this._step*this._arrowKeyMultiplier(c),g+f>this._max?f=this._max-g:g+f<this._min&&(f=this._min-g),this._snapClampSetValue(g+f)}d=c.clientY},w=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",E),window.removeEventListener("mouseup",w)},F=()=>{this._inputFocused=!0},p=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",i),this.$input.addEventListener("keydown",r),this.$input.addEventListener("wheel",o,{passive:!1}),this.$input.addEventListener("mousedown",S),this.$input.addEventListener("focus",F),this.$input.addEventListener("blur",p)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const t=(p,c,y,H,z)=>(p-c)/(y-c)*(z-H)+H,i=p=>{const c=this.$slider.getBoundingClientRect();let y=t(p,c.left,c.right,this._min,this._max);this._snapClampSetValue(y)},n=p=>{this._setDraggingStyle(!0),i(p.clientX),window.addEventListener("mousemove",r),window.addEventListener("mouseup",o)},r=p=>{i(p.clientX)},o=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",r),window.removeEventListener("mouseup",o)};let a=!1,s,u;const d=p=>{p.preventDefault(),this._setDraggingStyle(!0),i(p.touches[0].clientX),a=!1},g=p=>{p.touches.length>1||(this._hasScrollBar?(s=p.touches[0].clientX,u=p.touches[0].clientY,a=!0):d(p),window.addEventListener("touchmove",f,{passive:!1}),window.addEventListener("touchend",v))},f=p=>{if(a){const c=p.touches[0].clientX-s,y=p.touches[0].clientY-u;Math.abs(c)>Math.abs(y)?d(p):(window.removeEventListener("touchmove",f),window.removeEventListener("touchend",v))}else p.preventDefault(),i(p.touches[0].clientX)},v=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",f),window.removeEventListener("touchend",v)},S=this._callOnFinishChange.bind(this),E=400;let w;const F=p=>{if(Math.abs(p.deltaX)<Math.abs(p.deltaY)&&this._hasScrollBar)return;p.preventDefault();const y=this._normalizeMouseWheel(p)*this._step;this._snapClampSetValue(this.getValue()+y),this.$input.value=this.getValue(),clearTimeout(w),w=setTimeout(S,E)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",g,{passive:!1}),this.$slider.addEventListener("wheel",F,{passive:!1})}_setDraggingStyle(t,i="horizontal"){this.$slider&&this.$slider.classList.toggle("active",t),document.body.classList.toggle("lil-gui-dragging",t),document.body.classList.toggle(`lil-gui-${i}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:i,deltaY:n}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(i=0,n=-t.wheelDelta/120,n*=this._stepExplicit?1:10),i+-n}_arrowKeyMultiplier(t){let i=this._stepExplicit?1:10;return t.shiftKey?i*=10:t.altKey&&(i/=10),i}_snap(t){const i=Math.round(t/this._step)*this._step;return parseFloat(i.toPrecision(15))}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Ce extends X{constructor(t,i,n,r){super(t,i,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(r)}options(t){return this._values=Array.isArray(t)?t:Object.values(t),this._names=Array.isArray(t)?t:Object.keys(t),this.$select.replaceChildren(),this._names.forEach(i=>{const n=document.createElement("option");n.textContent=i,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){const t=this.getValue(),i=this._values.indexOf(t);return this.$select.selectedIndex=i,this.$display.textContent=i===-1?t:this._names[i],this}}class De extends X{constructor(t,i,n){super(t,i,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",r=>{r.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}const Oe=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles, .lil-gui.allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles, .lil-gui.force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  height: var(--title-height);
  line-height: calc(var(--title-height) - 4px);
  font-weight: 600;
  padding: 0 var(--padding);
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  outline: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  border: none;
}
@media (hover: hover) {
  .lil-gui button:hover {
    background: var(--hover-color);
  }
  .lil-gui button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function Te(e){const t=document.createElement("style");t.innerHTML=e;const i=document.querySelector("head link[rel=stylesheet], head style");i?document.head.insertBefore(t,i):document.head.appendChild(t)}let It=!1;class bt{constructor({parent:t,autoPlace:i=t===void 0,container:n,width:r,title:o="Controls",closeFolders:a=!1,injectStyles:s=!0,touchStyles:u=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",d=>{(d.code==="Enter"||d.code==="Space")&&(d.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(o),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),u&&this.domElement.classList.add("allow-touch-styles"),!It&&s&&(Te(Oe),It=!0),n?n.appendChild(this.domElement):i&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),r&&this.domElement.style.setProperty("--width",r+"px"),this._closeFolders=a}add(t,i,n,r,o){if(Object(n)===n)return new Ce(this,t,i,n);const a=t[i];switch(typeof a){case"number":return new we(this,t,i,n,r,o);case"boolean":return new ye(this,t,i);case"string":return new De(this,t,i);case"function":return new yt(this,t,i)}console.error(`gui.add failed
	property:`,i,`
	object:`,t,`
	value:`,a)}addColor(t,i,n=1){return new Ae(this,t,i,n)}addFolder(t){const i=new bt({parent:this,title:t});return this.root._closeFolders&&i.close(),i}load(t,i=!0){return t.controllers&&this.controllers.forEach(n=>{n instanceof yt||n._name in t.controllers&&n.load(t.controllers[n._name])}),i&&t.folders&&this.folders.forEach(n=>{n._title in t.folders&&n.load(t.folders[n._title])}),this}save(t=!0){const i={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof yt)){if(n._name in i.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);i.controllers[n._name]=n.save()}}),t&&this.folders.forEach(n=>{if(n._title in i.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);i.folders[n._title]=n.save()}),i}open(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(t){this._closed!==t&&(this._closed=t,this._callOnOpenClose(this))}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const i=this.$children.clientHeight;this.$children.style.height=i+"px",this.domElement.classList.add("transition");const n=o=>{o.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const r=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!t),requestAnimationFrame(()=>{this.$children.style.height=r+"px"})}),this}title(t){return this._title=t,this.$title.textContent=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onOpenClose(t){return this._onOpenClose=t,this}_callOnOpenClose(t){this.parent&&this.parent._callOnOpenClose(t),this._onOpenClose!==void 0&&this._onOpenClose.call(this,t)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(i=>{t=t.concat(i.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(i=>{t=t.concat(i.foldersRecursive())}),t}}const{exportPreset:$e,importPreset:q}=qt,Re=new Promise(e=>document.addEventListener("DOMContentLoaded",e)),I={backendType:dt.WebGL2,lazuli:xe()};{const t=new URLSearchParams(location.search).get("backend");t!==null&&t in dt&&(I.backendType=dt[t])}const h={isDragging:!1,isDraggingPaused:!1,needRender:!0,isPlaying:!1,needStepSimulation:!1,principled:{fluidity:0,fingerThickness:0},vantzos:{eta:0,epsilon:0,gravity:0},perfCounters:{}};function et(e){const i=e.target.getBoundingClientRect(),n=e.clientX-i.left,r=e.clientY-i.top,o=window.devicePixelRatio/I.lazuli.pixelRatio;return[n*o,r*o]}function _t(e){const t=e.changedTouches[0],n=e.target.getBoundingClientRect(),r=t.pageX-n.left,o=t.pageY-n.top,a=window.devicePixelRatio/I.lazuli.pixelRatio;return[r*a,o*a]}async function Ie(){const e=document.createElement("canvas");e.width=I.lazuli.width,e.height=I.lazuli.height,e.style.width=`${I.lazuli.width/window.devicePixelRatio*I.lazuli.pixelRatio}px`,e.style.height=`${I.lazuli.height/window.devicePixelRatio*I.lazuli.pixelRatio}px`,e.style["image-rendering"]="pixelated";const t=ge(I.backendType,e),i=await t.Initialize(I.lazuli,h.perfCounters);if(console.log("backend",t,i),!i)return null;const n=new zt(t,I.lazuli);console.log("lazuli",n);const r=d=>{!h.isDragging&&!h.isDraggingPaused&&(h.isDragging=!0,n.BeginStroke(d),h.needRender=!0)},o=d=>{h.isDragging&&!h.isDraggingPaused&&(n.MoveStroke(d),h.needRender=!0)},a=d=>{h.isDragging&&(h.isDragging=!1,n.EndStroke(d),h.needRender=!0)},s=d=>{h.isDragging&&!h.isDraggingPaused&&(h.isDraggingPaused=!0,n.PauseStroke(d),h.needRender=!0)},u=d=>{h.isDragging&&h.isDraggingPaused&&(h.isDraggingPaused=!1,d.buttons>0?(n.ResumeStroke(et(d)),h.needRender=!0):h.isDragging=!1)};return e.addEventListener("mousedown",d=>r(et(d))),e.addEventListener("mousemove",d=>o(et(d))),e.addEventListener("mouseup",d=>a(et(d))),e.addEventListener("mouseleave",d=>s(et(d))),e.addEventListener("mouseenter",u),e.addEventListener("touchstart",d=>r(_t(d))),e.addEventListener("touchmove",d=>o(_t(d))),e.addEventListener("touchend",d=>a(_t(d))),{lazuli:n,canvas:e}}function He(){const e=document.createElement("div");e.className="ui";const t=document.createElement("button");t.innerText="Play";const i=document.createElement("button");i.innerText="Pause";const n=document.createElement("button");n.innerText="Step";function r(){h.isPlaying=!0,t.disabled=!0,n.disabled=!0,i.disabled=!1}function o(){h.isPlaying=!1,t.disabled=!1,n.disabled=!1,i.disabled=!0}return t.addEventListener("click",()=>{r()}),i.addEventListener("click",()=>{o()}),n.addEventListener("click",()=>{h.needStepSimulation=!0}),o(),e.replaceChildren(t,i,n),e}function Me(e,t){const i=new bt;function n(){for(const l of i.controllersRecursive())l.updateDisplay()}function r(){const{simulationSettings:l}=e,{principled:x,vantzos:m}=h,{antiSpread3:D,slopeAngle:b,characteristicHeight:O,characteristicSize:C}=l,A=O/C,$=-Math.cos(b);x.fluidity=1/(l.ca*l.eta*l.eta),x.fingerThickness=Math.sqrt(l.eta/150),m.eta=-x.fluidity*(D+A*$),m.epsilon=A*A*A/l.ca,l.vantzos={...m},n()}function o(){const{simulationSettings:l}=e,{principled:x,vantzos:m}=h,{antiSpread3:D,slopeAngle:b,characteristicHeight:O,characteristicSize:C}=l,A=O/C,$=-Math.cos(b),R=150*x.fingerThickness*x.fingerThickness;l.eta=R,l.ca=1/(x.fluidity*R*R),l.vantzos={...m},m.eta=-x.fluidity*(D+A*$),m.epsilon=A*A*A/l.ca,n()}function a(){const{simulationSettings:l}=e,{principled:x,vantzos:m}=h,{antiSpread3:D,slopeAngle:b,characteristicHeight:O,characteristicSize:C}=l,A=O/C,$=-Math.cos(b),R=A*A*A/m.epsilon,L=Math.sqrt(-(D+A*$)/(m.eta*R));l.ca=R,l.eta=L,l.vantzos={...m},x.fluidity=1/(R*L*L),x.fingerThickness=Math.sqrt(L/150),n()}function s(){const{eta:l}=e.simulationSettings;return 1/(3e-4*l*l)}function u(){return new Promise((l,x)=>{t.toBlob(m=>{if(m===null){x();return}l(m)},"image/png")})}const d={ResetPerfCounters:()=>{for(const l of Object.values(h.perfCounters))l.Reset()},DownloadCanvas:async l=>{const x=await u();if(l===void 0){const m=new Date;l=`thin_fluid_state_${m.getFullYear()}-${m.getMonth()+1}-${m.getDate()}_${m.getHours()}${m.getMinutes()}${m.getSeconds()}.png`}vt(l,x)},CopyCanvas:async()=>{const l=await u(),x=$e(e);navigator.clipboard.write([new ClipboardItem({"image/png":l,"text/plain":new Blob([JSON.stringify(x,null,2)],{type:"text/plain"})})])},SetPresetOursSigAsia25:()=>{q(e,St),r(),n()},SetPresetOursRegularized:()=>{q(e,nt),r(),n()},SetPresetVantzosLike:()=>{q(e,Ht),h.vantzos.epsilon=e.simulationSettings.vantzos.epsilon,h.vantzos.eta=e.simulationSettings.vantzos.eta,h.vantzos.gravity=e.simulationSettings.vantzos.gravity,a(),n()}},g={seed:1234,dryRun:!1,etaStart:10,etaEnd:150,etaSteps:6,antiSpreadStart:0,antiSpreadEnd:15,antiSpreadSteps:1,caStartExponent:-5,caEndExponent:-2,caSteps:5,deltaTimeStartExponent:-2,deltaTimeEndExponent:-1,deltaTimeSteps:2,simulationStepCount:7500*4,preset:nt,existing:[]},f=async l=>{const x={...g,...l},{simulationSettings:m}=e,{width:D,height:b}=I.lazuli;q(e,x.preset);const O=new it(x.seed),C=new Uint32Array(4);C[0]=D,C[1]=b,C[2]=1;const A=new Float32Array(4*D*b);for(let k=0;k<b;++k)for(let N=0;N<D;++N){const tt=4*(N+D*(b-1-k)),Q=Math.max(0,Math.abs(N-128)-50),ot=k-128,ft=Q*Q+ot*ot<50*50?.5+.05*(O.random()-.5):0;A[tt]=ft}const{etaStart:$,etaEnd:R,etaSteps:L,caStartExponent:M,caEndExponent:U,caSteps:V,simulationStepCount:G,antiSpreadSteps:Y,antiSpreadStart:At,antiSpreadEnd:ht,deltaTimeStartExponent:Mt,deltaTimeEndExponent:wt,deltaTimeSteps:Ct,dryRun:Dt}=x;for(let k=0;k<L;++k)for(let N=0;N<V;++N)for(let tt=0;tt<Y;++tt)for(let Q=0;Q<Ct;++Q){m.eta=st(k,$,R,L);const ot=st(N,M,U,V);m.ca=Math.pow(10,ot),m.antiSpread3=st(tt,At,ht,Y);const Ot=st(Q,Mt,wt,Ct);m.deltaTime=Math.pow(10,Ot),r(),n(),e.backend.ImportState({metadata:C,pixels:A}),e.Render();const ft=Math.pow(10,wt),Tt=G*ft/m.deltaTime,at=`biasAnalysis_eta${m.eta}_ca${m.ca}_antiSpread${m.antiSpread3}_deltaTime${m.deltaTime}`;if(!x.existing.includes(at)){console.log(`${at} -> step count: ${Tt}`);for(let pt=0;pt<(Dt?0:Tt);++pt)e.SingleStepSimulation(),pt%e.simulationSettings.stepsPerFrame==0&&(e.Render(),await new Promise(Ft=>window.requestAnimationFrame(Ft)));e.Render(),q(e,x.preset),Dt||(d.DownloadCanvas(at+".png"),e.ExportState(at+".bin"))}}},v={PrincipledParameters:async()=>{const{principled:l}=h,{width:x,height:m}=I.lazuli;q(e,nt);const D=new it(1234),b=new Uint32Array(4);b[0]=x,b[1]=m,b[2]=1;const O=new Float32Array(4*x*m);for(let M=0;M<m;++M)for(let U=0;U<x;++U){const V=4*(U+x*(m-1-M)),G=Math.max(0,Math.abs(U-128)-50),Y=M-128,ht=G*G+Y*Y<50*50?.5+.05*(D.random()-.5):0;O[V]=ht}const C=10,A=1,$=7500*4,R=.1,L=.8;l.fingerThickness=L,o(),l.fluidity=s();for(let M=0;M<C;++M)for(let U=0;U<A;++U){l.fingerThickness=R+(L-R)*M/(C-1),o(),n(),e.backend.ImportState({metadata:b,pixels:O}),e.Render();for(let G=0;G<$;++G)e.SingleStepSimulation(),G%e.simulationSettings.stepsPerFrame==0&&(e.Render(),await new Promise(Y=>window.requestAnimationFrame(Y)));e.Render(),q(e,nt);const V=`fingerThickness${l.fingerThickness}_fluidity${l.fluidity}`;d.DownloadCanvas(V+".png"),e.ExportState(V+".bin")}},BiasAnalysis_Regularized:()=>f({antiSpreadStart:0}),BiasAnalysis_SigAsia25:()=>f({antiSpreadStart:0,caStartExponent:-5,caEndExponent:-2,caSteps:9,etaStart:5,etaSteps:1,preset:St}),InitState:()=>{const{width:l,height:x}=I.lazuli,m=new it(1234),D=new Uint32Array(4);D[0]=l,D[1]=x,D[2]=1;const b=new Float32Array(4*l*x);for(let O=0;O<x;++O)for(let C=0;C<l;++C){const A=4*(C+l*(x-1-O)),$=Math.max(0,Math.abs(C-128)-50),R=O-128,M=$*$+R*R<50*50?.5+.05*(m.random()-.5):0;b[A]=M}e.backend.ImportState({metadata:D,pixels:b})}},S=i.addFolder("Brush");S.add(e.brushSettings,"radius",1,200),S.add(e.brushSettings,"height",0,2),S.add(e.brushSettings,"action",["replace","add"]);const E=i.addFolder("Simulation"),w=E.addFolder("Solver");w.add(e.simulationSettings,"useDominoRelaxation");const F=w.add(e.simulationSettings,"useRandomizedDominos"),p=w.add(e.simulationSettings,"useEnergyConstraint"),c=w.add(e.simulationSettings,"mobilityFunctionType",["mean-h3","meanh-3","vantzos-m1","vantzos-m2"]);w.add(e.simulationSettings,"stepsPerFrame",1,128);const y=E.addFolder("Dimensionless parameters");y.add(e.simulationSettings,"deltaTime"),y.add(e.simulationSettings,"deltaX"),y.add(e.simulationSettings,"slopeAngle",0,Math.PI/2).onChange(r),y.add(e.simulationSettings,"slopeDirection",0,2*Math.PI),y.add(e.simulationSettings,"inverseGravity"),y.add(e.simulationSettings,"antiSpread2",0,5),y.add(e.simulationSettings,"antiSpread3",0,10).onChange(r),y.add(e.simulationSettings,"eta").onChange(r),y.add(e.simulationSettings,"ca").onChange(r);const H=E.addFolder("Principled parameters");H.add(h.principled,"fingerThickness",.01,1).onChange(o);const z=H.add(h.principled,"fluidity",0,s()).onChange(o),K=E.addFolder("Vantzos parameters (broken)");K.add(h.vantzos,"epsilon",4,15).name("viscosity (epsilon)").onChange(a),K.add(h.vantzos,"eta",-20,20).name("diffusion (eta)").onChange(a),K.add(h.vantzos,"gravity",0,100).name("gravity (G)").onChange(a);const j=E.addFolder("Clamping");j.add(e.simulationSettings,"useMaxHeight");const ut=j.add(e.simulationSettings,"maxHeight",0,10);j.add(e.simulationSettings,"useMinHeight");const ct=j.add(e.simulationSettings,"minHeight",0,1),Z=E.addFolder("Characteristic quantities").close();Z.add(e.simulationSettings,"characteristicTime").name("Time (s)"),Z.add(e.simulationSettings,"characteristicSize").name("Size (m)"),Z.add(e.simulationSettings,"characteristicHeight").name("Height (m)");const B=i.addFolder("Display");B.add(e.renderSettings,"showClamping"),B.add(e.renderSettings,"shading",["red","turbo"]),B.add(e.renderSettings,"shadingMax",0,10),B.add(e.renderSettings,"shadingGamma",0,4);const T=i.addFolder("Import/Export");T.add(e,"ImportState").name("Import State"),T.add(e,"ExportState").name("Export Current State"),T.add(e.debugSettings,"exportedStepCount").name("Exported Step Count"),T.add(e.debugSettings,"exportedStepSkipped").name("Exported Step Skipped"),T.add(e,"ExportStateMultiSteps").name("Export Multiple Steps"),T.add(d,"DownloadCanvas").name("Export Canvas"),T.add(d,"CopyCanvas").name("Copy Canvas & Metadata"),T.add(d,"ResetPerfCounters").name("Reset Perf Counters"),T.add(e,"ImportStateFromImage").name("Import State from Image");const W=i.addFolder("Figure Generation").close();W.add(v,"PrincipledParameters").name("Principled Parameters"),W.add(v,"BiasAnalysis_Regularized").name("Bias Analysis (Regularized)"),W.add(v,"BiasAnalysis_SigAsia25").name("Bias Analysis (SigAsia25)"),W.add(v,"InitState").name("Init State Bias");const J=i.addFolder("Presets").close();J.add(d,"SetPresetOursRegularized").name("Ours (Regularized)"),J.add(d,"SetPresetOursSigAsia25").name("Ours (SigAsia25)"),J.add(d,"SetPresetVantzosLike").name("Vantzos-like");const P=i.addFolder("Tests").close();P.add(e,"Test01").name("Test 01"),P.add(e,"Test02").name("Test 02").onChange(n),P.add(e,"Test03").name("Test 03"),P.add(e,"Test04").name("Test 04 (checkerboard)"),P.add(e,"Test05").name("Test 05 (max velocity)"),P.add(e,"Test06").name("Test 06 (dx)"),P.add(e,"Test07").name("Test 07 (fingers length)").onChange(n),i.onChange(()=>{const l=e.simulationSettings;F.enable(l.useDominoRelaxation),p.enable(l.useDominoRelaxation),c.enable(l.useDominoRelaxation),z.max(s()),ut.enable(l.useMaxHeight),ct.enable(l.useMinHeight),h.needRender=!0}),r()}function Fe(){const e=document.createElement("div");return e.className="perf-counter-ui",e}function Le(e){const t=[];for(const[n,r]of Object.entries(h.perfCounters))t.push(`${n}: ${r.GetAverage()} ms (± ${r.GetStddev()} ms, ${r.sampleCount} samples`);const i=t.join(`
`);e.innerText!=i&&(e.innerText=i)}async function Xe(){const e=await Ie();if(e===null)return;const{lazuli:t,canvas:i}=e,n=He();Me(t,i);const r=Fe();await Re,document.getElementById("app").replaceChildren(i,n,r);function a(){h.isPlaying&&(h.needStepSimulation=!0),h.needStepSimulation&&(h.needStepSimulation=!1,t.StepSimulation(),h.needRender=!0),h.needRender&&(h.needRender=!1,t.Render()),Le(r),window.requestAnimationFrame(a)}window.requestAnimationFrame(a)}Xe();
