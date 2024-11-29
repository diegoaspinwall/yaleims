(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[826],{8756:(e,t,a)=>{Promise.resolve().then(a.bind(a,9878))},9878:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>u});var l=a(5155);a(1975),a(6769);var n=a(2115);let s={match_001:{matchId:"match_001",college1:"Benjamin Franklin",college2:"Branford",sport:"Soccer",date:"2024-09-01",time:"09:00",location:"Field 1",ref_id:null,winner:null,college1_participants:[],college2_participants:[]},match_002:{matchId:"match_002",college1:"Berkeley",college2:"Saybrook",sport:"Flag Football",date:"2024-09-01",time:"10:00",location:"Field 2",ref_id:null,winner:null,college1_participants:[],college2_participants:[]}};var i=a(22);a(3174);var o=a(3873);let r=e=>{let{view:t,setView:a}=e;return(0,l.jsx)("div",{className:"text-center mb-8",children:(0,l.jsx)("button",{onClick:()=>a("list"===t?"calendar":"list"),className:"px-4 py-2 bg-blue-600 text-white rounded-lg",children:"list"===t?"Switch to Calendar View":"Switch to List View"})})},c={1:{id:"1",name:"Benjamin Franklin",points:1},2:{id:"2",name:"Berkeley",points:2},3:{id:"3",name:"Branford",points:3},4:{id:"4",name:"Davenport",points:4},5:{id:"5",name:"Ezra Stiles",points:5},6:{id:"6",name:"Grace Hopper",points:6},7:{id:"7",name:"Jonathan Edwards",points:7},8:{id:"8",name:"Morse",points:8},9:{id:"9",name:"Pauli Murray",points:9},10:{id:"10",name:"Pierson",points:10},11:{id:"11",name:"Saybrook",points:11},12:{id:"12",name:"Silliman",points:12},13:{id:"13",name:"Timothy Dwight",points:13},14:{id:"14",name:"Trumbull",points:14}},d={1:{id:1,name:"Soccer",points:11,season:"fall",emoji:"⚽"},2:{id:2,name:"Flag Football",points:6,season:"fall",emoji:"\uD83C\uDFC8"},3:{id:3,name:"Spikeball",points:6,season:"fall",emoji:"\uD83E\uDD94"},4:{id:4,name:"Cornhole",points:6,season:"fall",emoji:"\uD83C\uDF3D"},5:{id:5,name:"Pickleball",points:6,season:"fall",emoji:"\uD83E\uDD52"},6:{id:6,name:"Ping Pong",points:10,season:"fall",emoji:"\uD83C\uDFD3"},7:{id:7,name:"W-Hoops",points:5,season:"winter",emoji:"\uD83C\uDFC0"},8:{id:8,name:"M-Hoops",points:5,season:"winter",emoji:"\uD83C\uDFC0"},9:{id:9,name:"C-Hoops",points:5,season:"winter",emoji:"\uD83C\uDFC0"},10:{id:10,name:"Dodgeball",points:8,season:"winter",emoji:"\uD83E\uDD3E"},11:{id:11,name:"Broomball",points:6,season:"winter",emoji:"\uD83E\uDDF9"},12:{id:12,name:"Indoor Soccer",points:5,season:"spring",emoji:"\uD83E\uDD45"},13:{id:13,name:"Volleyball",points:6,season:"spring",emoji:"\uD83C\uDFD0"},14:{id:14,name:"Badminton",points:6,season:"spring",emoji:"\uD83C\uDFF8"}},m=e=>{let{collegeFilter:t,setCollegeFilter:a,sportFilter:n,setSportFilter:s}=e;return(0,l.jsxs)("div",{className:"flex justify-center space-x-4 mb-8",children:[(0,l.jsxs)("select",{value:t,onChange:e=>a(e.target.value),className:"p-2 border w-48",children:[(0,l.jsx)("option",{value:"",children:"All Colleges"}),Object.values(c).map(e=>(0,l.jsx)("option",{value:e.name,children:e.name},e.id))]}),(0,l.jsxs)("select",{value:n,onChange:e=>s(e.target.value),className:"p-2 border w-48",children:[(0,l.jsx)("option",{value:"",children:"All Sports"}),Object.values(d).map(e=>(0,l.jsx)("option",{value:e.name,children:e.name},e.id))]})]})},p=e=>{let{matches:t,onMatchClick:a}=e;return(0,l.jsx)("div",{children:0===t.length?(0,l.jsx)("div",{className:"text-center text-gray-500",children:"No future matches found."}):(0,l.jsx)("ul",{className:"space-y-4",children:t.map((e,t)=>(0,l.jsx)("li",{className:"bg-white shadow-lg p-6 rounded-lg hover:shadow-xl transition duration-300 ease-in-out",children:(0,l.jsxs)("div",{className:"flex justify-between items-center",children:[(0,l.jsxs)("div",{children:[(0,l.jsxs)("div",{className:"text-2xl font-bold mb-1 text-gray-900",children:[e.college1," ",(0,l.jsx)("span",{className:"text-green-500",children:"vs"})," ",e.college2]}),(0,l.jsx)("div",{className:"text-gray-600 font-semibold",children:e.sport}),(0,l.jsxs)("div",{className:"text-gray-500",children:[e.date," at ",e.time]}),(0,l.jsxs)("div",{className:"text-gray-500",children:["Location: ",e.location]})]}),(0,l.jsx)("button",{onClick:()=>a(e),className:"px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 focus:outline-none transition duration-300 ease-in-out",children:"Sign Up"})]})},t))})})},g=e=>{let{match:t,onConfirm:a,onCancel:n}=e;return(0,l.jsx)("div",{className:"fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center",children:(0,l.jsxs)("div",{className:"bg-white p-8 rounded-lg shadow-lg max-w-sm w-full",children:[(0,l.jsx)("h2",{className:"text-2xl font-bold mb-4",children:"Sign Up for Match"}),(0,l.jsxs)("p",{children:[t.college1," vs ",t.college2," on ",t.date," at ",t.time]}),(0,l.jsx)("button",{onClick:a,className:"bg-green-600 text-white px-4 py-2 rounded-lg mt-4",children:"Confirm Sign-Up"}),(0,l.jsx)("button",{onClick:n,className:"bg-red-600 text-white px-4 py-2 rounded-lg mt-2",children:"Cancel"})]})})};var h=a(6191);let u=()=>{let[e,t]=(0,n.useState)("list"),[a,c]=(0,n.useState)(null),[d,u]=(0,n.useState)(!1),[x,j]=(0,n.useState)(Object.values(s)),[b,v]=(0,n.useState)(""),[f,w]=(0,n.useState)(""),[N,y]=(0,n.useState)(!0),[S,C]=(0,n.useState)(null);(0,n.useEffect)(()=>{document.title="Schedule";let e=sessionStorage.getItem("selectedCollege");e&&v(e)},[]),(0,n.useEffect)(()=>{setTimeout(()=>{y(!1)},1e3),j(Object.values(s).sort((e,t)=>new Date(e.date).getTime()-new Date(t.date).getTime()).filter(e=>{let t=new Date(e.date+"T"+e.time);return(""===b||e.college1===b||e.college2===b)&&(""===f||e.sport===f)&&(null===S||t>=S)}))},[b,f,S]);let _=(0,i.mg)({onSuccess:async e=>{try{let t=await fetch("/api/google-calendar",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({accessToken:e.access_token,match:a})}),l=await t.json();t.ok?alert("Event added to your Google Calendar!"):alert("Failed to add event: "+l.error)}catch(e){console.error("Error:",e)}u(!1)},onError:()=>{console.error("Google login failed")},scope:"https://www.googleapis.com/auth/calendar.events"});return Object.values(s).map(e=>({title:"".concat(e.college1," vs ").concat(e.college2),start:new Date("".concat(e.date,"T").concat(e.time)),end:new Date("".concat(e.date,"T").concat(e.time)),match:e})),(0,l.jsxs)("div",{className:"pt-8",children:[" ",N?(0,l.jsx)(o.A,{}):(0,l.jsx)(i.G_,{clientId:"YOUR_GOOGLE_CLIENT_ID",children:(0,l.jsxs)("div",{className:"min-h-screen bg-gray-100 p-8",children:[(0,l.jsx)("h1",{className:"text-4xl font-bold text-center mb-8",children:"Schedule"}),(0,l.jsx)(r,{view:e,setView:t}),(0,l.jsx)(m,{collegeFilter:b,setCollegeFilter:v,sportFilter:f,setSportFilter:w}),(0,l.jsxs)("div",{className:"flex flex-col lg:flex-row gap-8",children:[(0,l.jsx)("div",{className:"lg:w-1/2",children:(0,l.jsx)(h.Ay,{locale:"en-US",calendarType:"gregory",prev2Label:null,next2Label:null,selectRange:!1,showNeighboringMonth:!0,minDetail:"month",onClickDay:e=>{C(e)}})}),(0,l.jsx)("div",{className:"lg:w-1/2",children:(0,l.jsx)(p,{matches:x,onMatchClick:e=>{c(e),u(!0)}})})]}),d&&a&&(0,l.jsx)(g,{match:a,onConfirm:_,onCancel:()=>u(!1)})]})})]})}},3873:(e,t,a)=>{"use strict";a.d(t,{A:()=>n});var l=a(5155);a(2115);let n=()=>(0,l.jsx)("div",{className:"fixed inset-0 flex items-center justify-center bg-blue-600 z-50",children:(0,l.jsx)("img",{src:"/loader_animations/sport_loader.gif",alt:"Loading...",className:"object-none"})})},1975:()=>{}},e=>{var t=t=>e(e.s=t);e.O(0,[701,443,441,517,358],()=>t(8756)),_N_E=e.O()}]);