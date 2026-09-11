(() => {
const D=window.LATIN_DATA,base=D.questions.filter(q=>q.topic==='roles'&&q.skill==='noun');
D.roleStages.push(...[['determiner','Little words before nouns','A determiner helps identify a noun. The, a and an are articles: a kind of determiner.','Find every determiner.'],['pronoun','Standing in for a name','A pronoun can stand in for a name: she, he, it or they.','Find every pronoun.'],['preposition','Showing a relationship','A preposition can show where something is: under, beside or in.','Find every preposition.']].map(([id,title,help,prompt])=>({id,title,help,prompt})));
D.questions=D.questions.filter(q=>q.topic!=='roles');
base.forEach((q,n)=>{const [s,v,d,a,o,adv]=q.tokens.map(t=>({...t}));d.subtype='article';s.subtype='proper noun';o.subtype='common noun';
const patterns=[[s,v,d,a,o,adv],[{...adv,word:adv.word[0].toUpperCase()+adv.word.slice(1)},s,v,d,a,o],[s,adv,v,d,a,o],[{...d,word:'The'},{word:'young',pos:'adjective',why:'Young describes the child.'},{word:'child',pos:'noun',role:'subject',subtype:'common noun',why:'Child names a person. This child does the action.'},adv,{...v,why:v.word+' tells us what the child does.'},d,a,o]];
patterns.forEach((tokens,p)=>add(tokens.map(t=>p===3?{...t,why:t.why.replaceAll(s.word,'the child')}:t),`var-${n}-${p}`,n,0));
const pro={word:n%2?'He':'She',pos:'pronoun',role:'subject',why:'This pronoun stands in for a person’s name. Here that person does the action.'};
for(const [p,tokens] of [[0,[pro,adv,v,d,a,o]],[1,[pro,v,d,a,o,adv]]])add(tokens.map(t=>({...t,why:t.why.replaceAll(s.word,'this person')})),`pron-${n}-${p}`,n,7);
add([s,v,d,a,o,{word:'beside',pos:'preposition',why:'Beside shows where the action happens in relation to the tree.'},{word:'a',pos:'determiner',subtype:'article',why:'A is an article: a kind of determiner. It introduces one tree.'},{word:'tree',pos:'noun',subtype:'common noun',why:'Tree names a thing. It belongs to “beside a tree”; it is not the direct object of the action.'}],`prep-${n}`,n,8);
});
function add(tokens,id,n,level){D.roleStages.forEach(stage=>{const accepted=[...new Set(tokens.filter(t=>t.pos===stage.id||t.role===stage.id).map(t=>t.word))];if(accepted.length)D.questions.push({id:`${id}-${stage.id}`,topic:'roles',skill:stage.id,sentenceId:id,familyId:`family-${n}`,level,tokens,sentence:tokens.map(t=>t.word).join(' ')+'.',q:stage.prompt,a:accepted[0],accepted,o:[],e:stage.help,hint:stage.help})})}
})();
