// Interaction recording contains only this question surface, never text fields.
export function createRecorder(surface) {
 const started=performance.now(),events=[];let last=0;
 const record=e=>{const now=performance.now();if(e.type==='pointermove'&&now-last<120)return;last=now;if(events.length>=350)return;
 const r=surface.getBoundingClientRect(),el=e.target.closest('[data-token],[data-answer],button');
 events.push({t:Math.round(now-started),type:e.type,x:(e.clientX-r.left)/r.width,y:(e.clientY-r.top)/r.height,token:el?.dataset.token??null,label:el?.textContent.slice(0,100)??null});};
 ['pointermove','pointerdown','click'].forEach(t=>surface.addEventListener(t,record));
 return {events,stop(){['pointermove','pointerdown','click'].forEach(t=>surface.removeEventListener(t,record));}};
}
export function playRecording(surface,attempt,escape) {
 const events=attempt.recording||[];let frame,start=null,paused=false,elapsed=0,speed=1,index=0;
 surface.classList.add('replay-surface');
 surface.innerHTML=`<p class="eyebrow">Recorded replay · no answers are being submitted</p><div class="replay-controls"><button id="pauseReplay">Pause</button><button id="restartReplay">Restart</button><label>Speed <select id="replaySpeed"><option value="1">1×</option><option value="2">2×</option><option value="4">4×</option></select></label><span id="replayTime"></span></div><h2>${escape(attempt.presentation?.prompt||(attempt.exploration?'Let’s uncover every word.':attempt.snapshot?.q||attempt.question))}</h2><div class="replay-scene">${attempt.snapshot?.tokens?attempt.snapshot.tokens.map((t,i)=>`<span data-replay-token="${i}" class="replay-word">${escape(t.word)}</span>`).join(' '):(attempt.presentation?.options||[attempt.chosen]).map(o=>`<span class="replay-option">${escape(o)}</span>`).join(' ')}<span class="replay-pointer" aria-label="Recorded pointer">➤</span></div><div id="replayExplanation" role="status"></div>`;
 const pointer=surface.querySelector('.replay-pointer'),out=surface.querySelector('#replayExplanation');
 const duration=Math.max(attempt.ms||0,events.at(-1)?.t||0);
 const reset=()=>{elapsed=0;index=0;start=null;out.textContent='';surface.querySelectorAll('[data-replay-token]').forEach(x=>x.className='replay-word');};
 surface.querySelector('#pauseReplay').onclick=e=>{paused=!paused;start=null;e.target.textContent=paused?'Resume':'Pause'};
 surface.querySelector('#restartReplay').onclick=()=>{reset();paused=false;surface.querySelector('#pauseReplay').textContent='Pause'};
 surface.querySelector('#replaySpeed').onchange=e=>speed=Number(e.target.value);
 const tick=now=>{if(!surface.isConnected)return;if(!paused){if(start!==null)elapsed+=(now-start)*speed;start=now;
 while(index<events.length&&events[index].t<=elapsed){const e=events[index++],target=e.token!==null?surface.querySelector(`[data-replay-token="${e.token}"]`):null;
 if(target){const a=surface.getBoundingClientRect(),b=target.getBoundingClientRect();pointer.style.left=(b.left-a.left+b.width/2)+'px';pointer.style.top=(b.top-a.top+b.height/2)+'px';}else{pointer.style.left=(Math.max(0,Math.min(1,e.x))*100)+'%';pointer.style.top=(Math.max(0,Math.min(1,e.y))*100)+'%';}
 if(e.type==='click'){const token=attempt.snapshot?.tokens?.[Number(e.token)];if(target&&token){target.classList.add('pos-'+token.pos);out.textContent=token.why}else out.textContent=e.label?'Clicked: '+e.label:'';}}
 if(elapsed>=duration){paused=true;out.textContent+=' End of recording.';surface.querySelector('#pauseReplay').textContent='Resume';}}
 surface.querySelector('#replayTime').textContent=(Math.min(elapsed,duration)/1000).toFixed(1)+' s / '+(duration/1000).toFixed(1)+' s';frame=requestAnimationFrame(tick);};
 frame=requestAnimationFrame(tick);return ()=>cancelAnimationFrame(frame);
}
