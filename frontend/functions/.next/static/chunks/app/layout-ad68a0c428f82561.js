(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[177],{311:(e,t,s)=>{Promise.resolve().then(s.bind(s,6096))},6096:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>p});var l=s(5155),a=s(8346),r=s.n(a);s(347);var i=s(2115),n=s(7396),c=s(1536),o=s(2734),d=s(4367),h=s(3338),m=s(5457);let u=e=>{let{name:t}=e;return(0,l.jsxs)(n.default,{href:"/profile",className:"bg-white text-blue-600 py-1 px-3 rounded hover:bg-gray-100",children:["Welcome, ",t,"!"]})},x=()=>{let{resetFilters:e}=(0,i.useContext)(h.t),[t,s]=i.useState(!1),{user:a,signIn:r,loading:x}=(0,m.J)(),f=()=>{s(!1),e()},p=[{href:"/",text:"YALE IMS",text_mobile:"Home",icon:(0,l.jsx)(c.rQ8,{})},{href:"/about",text:"About",icon:(0,l.jsx)(c.itz,{})},{href:"/scores",text:"Scores",icon:(0,l.jsx)(o.soM,{})},{href:"/schedule",text:"Schedule",icon:(0,l.jsx)(c.itz,{})}];return(0,l.jsxs)("nav",{className:"md:bg-blue-600 bg-blue-600 text-white p-5 items-center w-full fixed top-0 z-50",children:[(0,l.jsxs)("div",{className:"md:flex md:block justify-between items-center hidden",children:[(0,l.jsx)("div",{className:"hover:text-slate-300 text-xl pl-10",children:(0,l.jsx)(n.default,{href:p[0].href,onClick:e,children:p[0].text})}),(0,l.jsxs)("div",{className:"flex space-x-4",children:[p.slice(1).map((t,s)=>(0,l.jsxs)(n.default,{href:t.href,className:"hover:text-slate-300 flex justify-between items-center pl-4 pr-4 last:text-4xl last:pr-10",onClick:e,children:[(0,l.jsx)("div",{className:" ",children:t.text}),(0,l.jsx)("div",{className:"pl-1",children:t.icon})]},t.href)),x?(0,l.jsx)("div",{className:"animate-pulse text-white",children:"Loading..."}):a?(0,l.jsx)(u,{name:a.name}):(0,l.jsx)("button",{onClick:r,className:"bg-white text-blue-600 py-1 px-3 rounded hover:bg-gray-100",children:"Sign in with Google"})]})]}),(0,l.jsx)("div",{className:"md:hidden flex items-center",children:(0,l.jsx)("button",{onClick:()=>{s(!t)},children:t?(0,l.jsx)(d.WQq,{size:30}):(0,l.jsx)(d.fF8,{size:30})})}),t&&(0,l.jsxs)("div",{className:"md:hidden bg-blue-600 flex flex-col pb-4 px-6 space-y-4 rounded-b-lg shadow-lg",children:[p.map((e,t)=>(0,l.jsx)(n.default,{href:e.href,onClick:f,className:"hover:text-slate-300 flex justify-center items-center font-medium transition duration-200",children:e.text_mobile||e.text},t+"-second")),(0,l.jsx)("div",{className:"pt-4 border-t border-white/30",children:x?(0,l.jsx)("div",{className:"animate-pulse text-gray-300 text-center",children:"Loading..."}):a?(0,l.jsx)("div",{className:"flex justify-center",children:(0,l.jsx)(u,{name:a.name})}):(0,l.jsx)("button",{onClick:r,className:"block w-full bg-white text-blue-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-100 transition duration-200",children:"Sign in with Google"})})]})]})};var f=s(22);function p(e){let{children:t}=e;return(0,l.jsx)(m.v,{children:(0,l.jsx)(h.A,{children:(0,l.jsx)(f.G_,{clientId:"683055403263-8nk173ne786mjmhicqmuod2ufmcdnnec.apps.googleusercontent.com",children:(0,l.jsxs)("html",{lang:"en",children:[(0,l.jsx)("head",{children:(0,l.jsx)("link",{rel:"icon",href:"/favicon.ico"})}),(0,l.jsxs)("body",{className:r().className,children:[(0,l.jsx)(x,{}),(0,l.jsx)("div",{className:"mb-10"}),t]})]})})})})}},3338:(e,t,s)=>{"use strict";s.d(t,{A:()=>i,t:()=>r});var l=s(5155),a=s(2115);let r=(0,a.createContext)({filter:{college:"",sport:"",date:""},setFilter:()=>{},resetFilters:()=>{}}),i=e=>{let{children:t}=e,[s,i]=(0,a.useState)({college:"",sport:"",date:""});return(0,l.jsx)(r.Provider,{value:{filter:s,setFilter:i,resetFilters:()=>{i({college:"",sport:"",date:""})}},children:t})}},5457:(e,t,s)=>{"use strict";s.d(t,{v:()=>h,J:()=>m});var l=s(5155),a=s(2115),r=s(9904),i=s(4565);let n=(0,r.Wp)({apiKey:"AIzaSyB4ja4JXughIwxLPEt42mNClHH53sN0D6Q",authDomain:"yims-125a2.firebaseapp.com",projectId:"yims-125a2",storageBucket:"yims-125a2.appspot.com",messagingSenderId:"846558223250",appId:"1:846558223250:web:38c418708cc6f04e003f4b"}),c=(0,i.xI)(n),o=new i.HF,d=(0,a.createContext)(),h=e=>{let{children:t}=e,[s,r]=(0,a.useState)(null),[n,h]=(0,a.useState)(!0);(0,a.useEffect)(()=>{c.onAuthStateChanged(async e=>{if(e){let t=await x(e.email);r({name:e.displayName,email:e.email,matches:t.user.matches,college:t.user.college,points:t.user.points})}else r(null);h(!1)})},[]);let m=async()=>{try{let e=(await (0,i.df)(c,o)).user;if(!e.email.endsWith("@yale.edu"))throw Error("You must use a Yale email to sign in.");let t=await x(e.email);r({name:e.displayName,email:e.email,matches:t.user.matches,college:t.user.college,points:t.user.points})}catch(e){console.error("Error during sign-in:",e.message),alert(e.message),r(null)}},u=async()=>{try{await c.signOut(),r(null)}catch(e){console.error("Sign-out error:",e.message)}},x=async e=>{try{let t=await fetch("https://us-central1-yims-125a2.cloudfunctions.net/fetchOrAddUser",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e})});return await t.json()}catch(e){console.error("Error:",e)}};return(0,l.jsx)(d.Provider,{value:{user:s,signIn:m,signOut:u,loading:n},children:t})},m=()=>(0,a.useContext)(d)},347:()=>{}},e=>{var t=t=>e(e.s=t);e.O(0,[838,794,206,711,87,803,654,441,517,358],()=>t(311)),_N_E=e.O()}]);