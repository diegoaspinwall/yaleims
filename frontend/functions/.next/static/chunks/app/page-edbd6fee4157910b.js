(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{8794:(e,t,s)=>{Promise.resolve().then(s.bind(s,6919))},6046:(e,t,s)=>{"use strict";var a=s(6658);s.o(a,"useRouter")&&s.d(t,{useRouter:function(){return a.useRouter}})},6919:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>o});var a=s(5155),l=s(2115),r=s(6046),c=s(5565),i=s(3873);let n=()=>{let e=(0,r.useRouter)(),[t,s]=(0,l.useState)(!0),[n,o]=(0,l.useState)([]);(0,l.useEffect)(()=>{(async()=>{try{let e=await fetch("https://us-central1-yims-125a2.cloudfunctions.net/getLeaderboard",{method:"GET",headers:{"Content-Type":"application/json"}});if(!e.ok)throw Error("Error fetching leaderboard: ".concat(e.statusText));let t=(await e.json()).sort((e,t)=>t.points-e.points);o(t)}catch(e){console.error("Failed to fetch leaderboard:",e)}finally{s(!1)}})()},[]);let d=t=>{sessionStorage.setItem("selectedCollege",t),e.push("/scores")};return t?(0,a.jsx)("div",{className:"text-center py-10",children:(0,a.jsx)(i.A,{})}):(0,a.jsxs)("div",{className:"bg-white shadow-md rounded-lg overflow-hidden",children:[(0,a.jsx)("div",{className:"py-6",children:(e=>{let t=[{place:"second",college:e[1],size:"small",offset:"translate-y-6"},{place:"first",college:e[0],size:"large",offset:"translate-y-0"},{place:"third",college:e[2],size:"small",offset:"translate-y-6"}];return(0,a.jsx)("div",{className:"flex justify-center items-end space-x-6",children:t.map((e,t)=>{let{place:s,college:l,size:r,offset:i}=e;return l?(0,a.jsxs)("div",{onClick:()=>d(l.name),className:"flex flex-col items-center ".concat(i," text-center mb-3 cursor-pointer"),children:[(0,a.jsxs)("div",{className:"relative ".concat("large"===r?"w-32 h-32":"w-24 h-24"," flex items-center justify-center mb-4"),children:[(0,a.jsx)(c.default,{src:"/college_flags/".concat(l.name.replace(/\s+/g," "),".png"),alt:l.name,width:"large"===r?128:96,height:"large"===r?128:96,className:"object-contain p-3",unoptimized:!0}),(0,a.jsx)(c.default,{src:"/college_flags/podium_".concat(s,".png"),alt:"".concat(s," Place Overlay"),width:"large"===r?200:150,height:"large"===r?200:150,layout:"intrinsic",className:"absolute top-3",unoptimized:!0})]}),(0,a.jsx)("h3",{className:"font-semibold text-sm text-gray-800 mt-2",children:l.name}),(0,a.jsxs)("p",{className:"text-sm text-gray-500",children:["Points: ",l.points]})]},t):null})})})(n.slice(0,3))}),(0,a.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,a.jsx)("thead",{className:"bg-blue-600",children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider",children:"Rank"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider",children:"College"}),(0,a.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider",children:"Points"})]})}),(0,a.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:n.slice(3).map((e,t)=>(0,a.jsxs)("tr",{onClick:()=>d(e.name),className:"hover:bg-gray-100 cursor-pointer",children:[(0,a.jsx)("td",{className:"px-6 py-4 text-sm font-medium text-gray-900",children:t+4}),(0,a.jsxs)("td",{className:"px-6 py-4 text-sm text-gray-900 flex items-center",children:[(0,a.jsx)(c.default,{src:"/college_flags/".concat(e.name.replace(/\s+/g," "),".png"),alt:e.name,width:24,height:24,className:"mr-2 object-contain",unoptimized:!0}),e.name]}),(0,a.jsx)("td",{className:"px-6 py-4 text-sm text-gray-900",children:e.points})]},e.id))})]})]})},o=()=>((0,l.useEffect)(()=>{document.title="Yale IMs"},[]),(0,a.jsxs)("div",{className:"min-h-screen bg-gray-100 p-8",children:[(0,a.jsx)("br",{}),(0,a.jsx)("h1",{className:"text-4xl font-bold text-center mb-8",children:"Leaderboard"}),(0,a.jsx)(n,{})]}))},3873:(e,t,s)=>{"use strict";s.d(t,{A:()=>l});var a=s(5155);s(2115);let l=()=>(0,a.jsx)("div",{className:"fixed inset-0 flex items-center justify-center bg-blue-600 z-50",children:(0,a.jsx)("img",{src:"/loader_animations/sport_loader.gif",alt:"Loading...",className:"object-none"})})}},e=>{var t=t=>e(e.s=t);e.O(0,[565,441,517,358],()=>t(8794)),_N_E=e.O()}]);