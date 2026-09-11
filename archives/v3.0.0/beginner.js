// Reviewed sentence annotations: no automatic grammar guesses.
(() => {
const D=window.LATIN_DATA;
const stages=[
 ['noun','Naming words','A noun names a person, animal, place or thing. In “Sai kicks a ball”, Sai and ball are nouns.','Tap a naming word (noun).'],
 ['verb','Action words','A verb can tell us what happens. In “Sai kicks a ball”, kicks is the action. Some verbs describe a state, like is.','Tap the action word (verb).'],
 ['adjective','Describing a noun','An adjective describes a noun. In “the red ball”, red describes the ball.','Tap a word describing a noun (adjective).'],
 ['adverb','Describing an action','An adverb can tell us how an action happens. In “Sai runs quickly”, quickly tells us how Sai runs.','Tap the word telling us how (adverb).'],
 ['subject','Who does it?','The subject is who or what the sentence is about. In these action sentences, it does the action. In “Sai kicks a ball”, Sai is the subject.','Tap the naming word for who does the action (subject).'],
 ['object','What receives it?','The direct object receives the action. In “Sai kicks a ball”, ball is the object. “A ball” is the complete object phrase.','Tap the naming word for what receives the action (object).']
];
D.roleStages=stages.map(([id,title,help,prompt])=>({id,title,help,prompt}));
const rows=[
 ['Sai','kicks','red','ball','gently'],['Maya','reads','funny','book','quietly'],['Dad','washes','dirty','cup','carefully'],['Mum','opens','heavy','door','slowly'],
 ['Amir','carries','small','bag','carefully'],['Ella','paints','wooden','boat','neatly'],['Noah','folds','clean','towel','neatly'],['Lily','throws','soft','ball','gently'],
 ['Ben','pushes','empty','cart','slowly'],['Asha','draws','big','circle','carefully'],['Tom','cleans','muddy','boot','quickly'],['Rosa','holds','tiny','shell','gently'],
 ['Leo','plays','new','tune','softly'],['Zara','packs','blue','bag','quickly'],['Finn','pulls','long','rope','firmly'],['Eva','closes','small','box','quietly'],
 ['Omar','catches','yellow','ball','neatly'],['Lucy','dries','wet','plate','carefully'],['Sam','lifts','light','basket','easily'],['Nina','ties','loose','ribbon','carefully'],
 ['Hugo','rolls','round','stone','slowly'],['Isha','brushes','sleepy','cat','gently'],['Max','taps','little','drum','softly'],['Sara','cuts','green','paper','neatly']
];
D.questions=D.questions.filter(q=>q.topic!=='roles');
rows.forEach(([s,v,adj,o,adv],n)=>{
 const tokens=[{word:s,pos:'noun',role:'subject',why:`${s} names a person and does the action: the subject.`},{word:v,pos:'verb',why:`${v} tells us what ${s} does: the verb.`},{word:'the',pos:'determiner',why:'The is a determiner (an article). It points to a particular thing.'},{word:adj,pos:'adjective',why:`${adj} describes ${o}: an adjective.`},{word:o,pos:'noun',role:'object',why:`${o} names a thing or animal: a noun. It receives the action: the direct object. The complete object phrase is “the ${adj} ${o}”.`},{word:adv,pos:'adverb',why:`${adv} tells us how ${s} ${v}: an adverb.`}];
 stages.forEach(([skill,,help,prompt])=>{const accepted=tokens.filter(t=>t.pos===skill||t.role===skill).map(t=>t.word);D.questions.push({id:`role-${skill}-${n}`,topic:'roles',skill,sentenceId:`sentence-${n}`,sentence:tokens.map(t=>t.word).join(' ')+'.',tokens,q:prompt,a:accepted[0],accepted,o:[],e:help,hint:help});});
});
D.topics.find(t=>t.id==='roles').body='<p>Start with ordinary English. We will learn one small idea at a time: naming words, actions, describing words, then sentence jobs.</p><div class="example">Sai kicks the red ball gently.</div><p><b>Word type</b> tells us what kind of word it is: ball is a noun. <b>Sentence job</b> tells us what it does here: ball is the object because it receives the kick.</p><p>Tap words to answer. After answering, tap any word to explore its colour, type and job. There is no countdown. Read slowly or use “Read aloud”.</p>';
})();
