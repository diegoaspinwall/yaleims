(()=>{var e={};e.id=217,e.ids=[217],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},16022:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>x,routeModule:()=>p,serverHooks:()=>l,workAsyncStorage:()=>c,workUnitAsyncStorage:()=>d});var s={};r.r(s),r.d(s,{POST:()=>u});var n=r(42706),a=r(28203),o=r(45994),i=r(39187);async function u(e){try{let{idToken:t}=await e.json();if(!t)return i.NextResponse.json({error:"Missing ID token"},{status:400});return i.NextResponse.json({message:"User authenticated successfully!"},{status:200})}catch(e){return console.error("Error in authentication:",e),i.NextResponse.json({error:"Internal server error"},{status:500})}}let p=new n.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/authenticate/route",pathname:"/api/authenticate",filename:"route",bundlePath:"app/api/authenticate/route"},resolvedPagePath:"/Users/annaxu/Desktop/yaleims/frontend/src/app/api/authenticate/route.js",nextConfigOutput:"export",userland:s}),{workAsyncStorage:c,workUnitAsyncStorage:d,serverHooks:l}=p;function x(){return(0,o.patchFetch)({workAsyncStorage:c,workUnitAsyncStorage:d})}},96487:()=>{},78335:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[989,452],()=>r(16022));module.exports=s})();