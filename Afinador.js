const notas = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

let audioContext;
let analyser;
let dataArray;

async function iniciarAfinador(){

try{

const stream = await navigator.mediaDevices.getUserMedia({ audio:true });

audioContext = new (window.AudioContext || window.webkitAudioContext)();

const source = audioContext.createMediaStreamSource(stream);

analyser = audioContext.createAnalyser();
analyser.fftSize = 4096;

source.connect(analyser);

dataArray = new Float32Array(analyser.fftSize);

detectarPitch();

}catch(e){

alert("Erro ao acessar o microfone");

}

}

function detectarPitch(){

analyser.getFloatTimeDomainData(dataArray);

let pitch = autoCorrelate(dataArray, audioContext.sampleRate);

if(pitch !== -1){

const nota = notaDaFreq(pitch);
const nome = notas[nota % 12];

document.getElementById("nota").innerText = nome;
document.getElementById("freq").innerText = pitch.toFixed(2)+" Hz";

}

requestAnimationFrame(detectarPitch);

}

function notaDaFreq(freq){

const noteNum = 12 * (Math.log(freq/440) / Math.log(2));

return Math.round(noteNum) + 69;

}

function autoCorrelate(buf, sampleRate){

let SIZE = buf.length;
let rms = 0;

for(let i=0;i<SIZE;i++){

let val = buf[i];
rms += val*val;

}

rms = Math.sqrt(rms/SIZE);

if(rms < 0.01) return -1;

let r1=0, r2=SIZE-1, thres=0.2;

for(let i=0;i<SIZE/2;i++){

if(Math.abs(buf[i]) < thres){
r1=i;
break;
}

}

for(let i=1;i<SIZE/2;i++){

if(Math.abs(buf[SIZE-i]) < thres){
r2=SIZE-i;
break;
}

}

buf = buf.slice(r1,r2);
SIZE = buf.length;

let c = new Array(SIZE).fill(0);

for(let i=0;i<SIZE;i++){

for(let j=0;j<SIZE-i;j++){

c[i] += buf[j]*buf[j+i];

}

}

let d=0;

while(c[d] > c[d+1]) d++;

let maxval=-1;
let maxpos=-1;

for(let i=d;i<SIZE;i++){

if(c[i] > maxval){

maxval = c[i];
maxpos = i;

}

}

let T0 = maxpos;

return sampleRate/T0;

}