(function(e){function t(t){for(var r,o,a=t[0],c=t[1],u=t[2],l=0,p=[];l<a.length;l++)o=a[l],s[o]&&p.push(s[o][0]),s[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);f&&f(t);while(p.length)p.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,o=1;o<n.length;o++){var a=n[o];0!==s[a]&&(r=!1)}r&&(i.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},o={app:0},s={app:0},i=[];function a(e){return c.p+"js/"+({"arrivee-course~depart-course~gestion-course~gestion-poste~liste-inscriptions~resultats":"arrivee-course~depart-course~gestion-course~gestion-poste~liste-inscriptions~resultats","arrivee-course":"arrivee-course","depart-course":"depart-course","gestion-course":"gestion-course","gestion-poste":"gestion-poste","liste-inscriptions":"liste-inscriptions",resultats:"resultats",courses:"courses","importation~importer-scores":"importation~importer-scores",importation:"importation","importer-scores":"importer-scores",inscriptions:"inscriptions","nouveau-poste":"nouveau-poste","nouvelle-course":"nouvelle-course",postes:"postes"}[e]||e)+"."+{"arrivee-course~depart-course~gestion-course~gestion-poste~liste-inscriptions~resultats":"0cdb78a7","arrivee-course":"901f13df","depart-course":"b3d99890","gestion-course":"44e2ac0e","gestion-poste":"656a4331","liste-inscriptions":"d1e4e369",resultats:"997a5416",courses:"0989993e","importation~importer-scores":"395e9aaa",importation:"5c3f32fb","importer-scores":"45868dc9",inscriptions:"3978f9e7","nouveau-poste":"d2c9b9ee","nouvelle-course":"9333d65f",postes:"8a7e4e6f"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={"arrivee-course":1,"gestion-course":1,"gestion-poste":1,"liste-inscriptions":1,resultats:1,courses:1,"importation~importer-scores":1,inscriptions:1,postes:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise(function(t,n){for(var r="css/"+({"arrivee-course~depart-course~gestion-course~gestion-poste~liste-inscriptions~resultats":"arrivee-course~depart-course~gestion-course~gestion-poste~liste-inscriptions~resultats","arrivee-course":"arrivee-course","depart-course":"depart-course","gestion-course":"gestion-course","gestion-poste":"gestion-poste","liste-inscriptions":"liste-inscriptions",resultats:"resultats",courses:"courses","importation~importer-scores":"importation~importer-scores",importation:"importation","importer-scores":"importer-scores",inscriptions:"inscriptions","nouveau-poste":"nouveau-poste","nouvelle-course":"nouvelle-course",postes:"postes"}[e]||e)+"."+{"arrivee-course~depart-course~gestion-course~gestion-poste~liste-inscriptions~resultats":"31d6cfe0","arrivee-course":"279061dc","depart-course":"31d6cfe0","gestion-course":"7a3fcd8e","gestion-poste":"7a3fcd8e","liste-inscriptions":"7a3fcd8e",resultats:"93d2f7c0",courses:"17fece8b","importation~importer-scores":"8c167526",importation:"31d6cfe0","importer-scores":"31d6cfe0",inscriptions:"5f02e926","nouveau-poste":"31d6cfe0","nouvelle-course":"31d6cfe0",postes:"17fece8b"}[e]+".css",s=c.p+r,i=document.getElementsByTagName("link"),a=0;a<i.length;a++){var u=i[a],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===r||l===s))return t()}var p=document.getElementsByTagName("style");for(a=0;a<p.length;a++){u=p[a],l=u.getAttribute("data-href");if(l===r||l===s)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||s,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete o[e],f.parentNode.removeChild(f),n(i)},f.href=s;var d=document.getElementsByTagName("head")[0];d.appendChild(f)}).then(function(){o[e]=0}));var r=s[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise(function(t,n){r=s[e]=[t,n]});t.push(r[2]=i);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=a(e),u=function(t){l.onerror=l.onload=null,clearTimeout(p);var n=s[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+r+": "+o+")");i.type=r,i.request=o,n[1](i)}s[e]=void 0}};var p=setTimeout(function(){u({type:"timeout",target:l})},12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var p=0;p<u.length;p++)t(u[p]);var f=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"147d":function(e,t,n){"use strict";n.d(t,"a",function(){return s}),n.d(t,"c",function(){return i}),n.d(t,"b",function(){return a}),n.d(t,"d",function(){return c});var r=n("768b"),o=function(e){return parseInt(e,10)<10?"0".concat(e):"".concat(e)},s=function(e){return e.getSeconds()+60*e.getMinutes()+3600*e.getHours()},i=function(e){if(null===e)return"-";var t=e,n=Math.floor(t/3600);t-=3600*n;var r=Math.floor(t/60),s=t-60*r;return"".concat(o(n),":").concat(o(r),":").concat(o(s))},a=function(e){return e instanceof Date?"".concat(o(e.getHours()),":").concat(o(e.getMinutes()),":").concat(o(e.getSeconds())):"-"},c=function(e){var t=Object(r["a"])(e,2),n=t[0],o=t[1];return null===n||null===o?"-":i(s(n)-s(o))}},"17e1":function(e,t,n){"use strict";n.d(t,"c",function(){return u}),n.d(t,"a",function(){return l}),n.d(t,"b",function(){return p}),n.d(t,"e",function(){return f}),n.d(t,"d",function(){return d});n("6762"),n("2fdb"),n("96cf");var r=n("3b8d"),o=n("d225"),s=n("b0b4"),i=n("b193"),a="criterium_dbs",c="criterium_active_db",u="inscriptions",l="courses",p="coursesinscriptions",f="postesinscriptions",d="postes",m=function(){function e(){Object(o["a"])(this,e),this.alasql=i,this.dbname=null}return Object(s["a"])(e,[{key:"init",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){var t,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(t=localStorage.getItem(c),null!==t){e.next=12;break}if(n=this.getDatabaseNames(),0!==n.length){e.next=8;break}return e.next=6,this.install("criterium".concat((new Date).getFullYear()));case 6:e.next=10;break;case 8:return e.next=10,this.useDB(n[0]);case 10:e.next=14;break;case 12:return e.next=14,this.useDB(t);case 14:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"getDatabaseNames",value:function(){var e=localStorage.getItem(a);return null===e?[]:JSON.parse(e)}},{key:"run",value:function(e,t){return new Promise(function(n,r){console.log("running (".concat(e,") with params (").concat(JSON.stringify(t),")")),i["promise"](e,t).then(function(e){n(e)}).catch(function(e){console.error(e),r(e)})})}},{key:"swap",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this.exist(t)){e.next=2;break}return e.abrupt("return",this.install(t));case 2:return e.next=4,this.useDB(t);case 4:return e.abrupt("return",t);case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"install",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(!this.exist(t)){e.next=2;break}return e.abrupt("return",this.swap(t));case 2:return e.next=4,this.run("create INDEXEDDB database if not exists ".concat(t));case 4:return e.next=6,this.useDB(t);case 6:return e.next=8,this.run("create table ".concat(u," (id STRING, dossard INT, nom STRING, prenom STRING, naissance INT, unitId INT)"));case 8:return e.next=10,this.run("create table ".concat(l," (id STRING, nom STRING, coefficient INT)"));case 10:return e.next=12,this.run("create table ".concat(d," (id STRING, nom STRING, max INT, coefficient INT)"));case 12:return e.next=14,this.run("create table ".concat(p," (id STRING, participantId STRING, debut DATE NULL, arrivee DATE NULL, courseId STRING)"));case 14:return e.next=16,this.run("create table ".concat(f," (id STRING, participantId STRING, points INT NULL, posteId STRING)"));case 16:return console.log("Installed db"),localStorage.setItem(a,JSON.stringify([t].concat(this.getDatabaseNames()))),e.abrupt("return",t);case 19:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"useDB",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return localStorage.setItem(c,t),e.next=3,this.run("attach INDEXEDDB database ".concat(t));case 3:return e.next=5,this.run("use ".concat(t));case 5:this.dbname=t;case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"exist",value:function(e){return this.getDatabaseNames().includes(e)}}]),e}(),h=new m;t["f"]=h},"38ae":function(e,t,n){"use strict";var r=n("7b70"),o=n.n(r);o.a},"46d6":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),o=n("a65d"),s=n.n(o),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("c-menu"),n("div",{staticClass:"main-content"},[n("router-view")],1)],1)},a=[],c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"menu d-flex flex-column justify-content-between"},[n("div",{staticClass:"d-flex flex-column"},[e._m(0),n("menu-item",{attrs:{title:"Inscriptions",icon:"team",to:{name:"Inscriptions"}}}),n("menu-item",{attrs:{title:"Postes",icon:"compass",to:{name:"Postes"}}}),n("menu-item",{attrs:{title:"Courses",icon:"flag",to:{name:"Courses"}}}),n("menu-item",{attrs:{title:"Résultats",icon:"trophy",to:{name:"Résultats"}}})],1),n("div",{staticClass:"d-flex flex-column"},[n("menu-item",{attrs:{title:"Paramètres",icon:"setting",to:{name:"Paramètres"}}})],1)])])},u=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"menu-logo d-flex justify-content-center pt-2 pb-3"},[r("div",{staticClass:"picto"},[r("img",{attrs:{src:n("9d64"),alt:"logo"}})])])}],l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("tooltip",{attrs:{placement:"right"}},[n("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(e.title))]),n("div",{staticClass:"menu-item mb-2 d-flex justify-content-center"},[n("router-link",{staticClass:"menu-item-button d-flex justify-content-center align-items-center",attrs:{to:e.to,tag:"div"}},[n("icon",{attrs:{type:e.icon}})],1)],1)])},p=[],f=(n("9e39"),n("f933")),d=(n("805a"),n("0c63")),m={components:{Icon:d["a"],Tooltip:f["a"]},props:["title","icon","to"]},h=m,g=(n("a377"),n("2877")),v=Object(g["a"])(h,l,p,!1,null,"0cb6c434",null),b=v.exports,y={components:{MenuItem:b}},x=y,w=(n("5bfd"),Object(g["a"])(x,c,u,!1,null,"46ab81ae",null)),I=w.exports,N={components:{cMenu:I}},k=N,S=(n("38ae"),Object(g["a"])(k,i,a,!1,null,"fbcb2022",null)),_=S.exports,T=(n("7f7f"),n("8c4f")),j=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"p-3 d-flex justify-content-between align-items-center"},[e._m(0),n("a-button",{attrs:{type:"primary"},on:{click:function(t){e.creating=!0}}},[e._v("Nouvelle base de données")])],1),n("a-table",{attrs:{dataSource:e.databases,columns:e.columns,rowKey:"name"},scopedSlots:e._u([{key:"actions",fn:function(t){return n("div",{},[n("a-button",{staticClass:"mr-2",attrs:{type:"primary",disabled:""+e.dbname===""+t.name},on:{click:function(n){return e.swap(t.name)}}},[e._v("Utiliser")])],1)}}])}),n("a-modal",{attrs:{title:"Nouvelle base de données",visible:e.creating,"confirm-loading":e.working},on:{ok:e.create,cancel:function(t){e.creating=!1}}},[n("a-form",{attrs:{form:e.form,layout:"vertical"}},[n("a-form-item",{attrs:{label:"Nom de la base de données"}},[n("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["nom",{rules:[{required:!0}]}],expression:"['nom', { rules: [{ required: true }]}]"}]})],1)],1)],1)],1)},D=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v("Criterium")]),n("h3",[e._v("Système de gestion de courses")])])}],P=(n("a71a"),n("b558")),C=(n("c721"),n("3af3")),O=(n("04f3"),n("ed3b")),R=(n("e1f5"),n("5efb")),E=(n("0723"),n("0020")),G=n("17e1"),A={components:{aTable:E["a"],aButton:R["a"],aModal:O["a"],aForm:C["a"],aFormItem:C["a"].Item,aInput:P["a"]},mounted:function(){this.refreshDbs()},data:function(){return{databases:[],form:this.$form.createForm(this),creating:!1,working:!1,dbname:null,columns:[{title:"Bases de données disponibles",dataIndex:"name"},{title:"Actions",dataIndex:null,scopedSlots:{customRender:"actions"}}]}},methods:{swap:function(e){var t=this;G["f"].swap(e).then(function(){t.dbname=e})},refreshDbs:function(){this.databases=G["f"].getDatabaseNames().map(function(e){return{name:e}}),this.dbname=G["f"].dbname},create:function(){var e=this;this.form.validateFields(function(t,n){var r=n.nom;t||(e.working=!0,G["f"].install(r).then(function(){e.refreshDbs(),e.working=!1,e.creating=!1}))})}}},B=A,M=Object(g["a"])(B,j,D,!1,null,null,null),L=M.exports;r["a"].use(T["a"]);var F=new T["a"]({mode:"history",base:"/",routes:[{path:"/",name:"Paramètres",component:L},{path:"/inscriptions",component:function(){return n.e("inscriptions").then(n.bind(null,"e7e0"))},children:[{path:"",name:"Inscriptions",component:function(){return Promise.all([n.e("arrivee-course~depart-course~gestion-course~gestion-poste~liste-inscriptions~resultats"),n.e("liste-inscriptions")]).then(n.bind(null,"fd31"))}},{path:"import",name:"Importation",component:function(){return Promise.all([n.e("importation~importer-scores"),n.e("importation")]).then(n.bind(null,"ad28"))}}]},{path:"/resultats",name:"Résultats",component:function(){return Promise.all([n.e("arrivee-course~depart-course~gestion-course~gestion-poste~liste-inscriptions~resultats"),n.e("resultats")]).then(n.bind(null,"acd1"))}},{path:"/postes",name:"Postes",component:function(){return n.e("postes").then(n.bind(null,"7ba9"))},children:[{path:"nouveau",name:"Nouveau poste",component:function(){return n.e("nouveau-poste").then(n.bind(null,"f825"))}},{path:"gestion/:id",name:"Gestion",component:function(){return Promise.all([n.e("arrivee-course~depart-course~gestion-course~gestion-poste~liste-inscriptions~resultats"),n.e("gestion-poste")]).then(n.bind(null,"52c4"))}},{path:"importer-scores",name:"Importer des scores",component:function(){return Promise.all([n.e("importation~importer-scores"),n.e("importer-scores")]).then(n.bind(null,"f1cd"))}}]},{path:"/courses",name:"Courses",component:function(){return n.e("courses").then(n.bind(null,"1a2f"))},children:[{path:"nouveau",name:"Nouvelle course",component:function(){return n.e("nouvelle-course").then(n.bind(null,"b055"))}},{path:"gestion/:id",name:"Gestion de course",component:function(){return Promise.all([n.e("arrivee-course~depart-course~gestion-course~gestion-poste~liste-inscriptions~resultats"),n.e("gestion-course")]).then(n.bind(null,"7cf9"))}},{path:"depart",name:"Départ de course",component:function(){return Promise.all([n.e("arrivee-course~depart-course~gestion-course~gestion-poste~liste-inscriptions~resultats"),n.e("depart-course")]).then(n.bind(null,"f215"))}},{path:"arrivee",name:"Arrivée de course",component:function(){return Promise.all([n.e("arrivee-course~depart-course~gestion-course~gestion-poste~liste-inscriptions~resultats"),n.e("arrivee-course")]).then(n.bind(null,"254b"))}}]}]});F.afterEach(function(e){document.title="Criterium | ".concat(e.name)});var $=F,q=n("c0d6"),J=n("147d"),U=n("9483");Object(U["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});n("c1c3");r["a"].use(s.a,{duration:5e3,type:"info"}),r["a"].filter("printSeconds",J["c"]),r["a"].filter("printDate",J["b"]),r["a"].filter("timeDiff",J["d"]),r["a"].config.productionTip=!1,G["f"].init().then(function(){new r["a"]({router:$,store:q["a"],render:function(e){return e(_)}}).$mount("#app")})},"5bfd":function(e,t,n){"use strict";var r=n("46d6"),o=n.n(r);o.a},"63ad":function(e,t,n){},"7b70":function(e,t,n){},"9d64":function(e,t,n){e.exports=n.p+"img/logo.8eb63bf3.png"},a377:function(e,t,n){"use strict";var r=n("63ad"),o=n.n(r);o.a},c0d6:function(e,t,n){"use strict";n("20d6"),n("7514");var r=n("2b0e"),o=n("2f62");r["a"].use(o["a"]),t["a"]=new o["a"].Store({state:{postes:[],courses:[]},getters:{getPoste:function(e){return function(t){return e.postes.find(function(e){return e.id===t})}},getCourse:function(e){return function(t){return e.courses.find(function(e){return e.id===t})}}},mutations:{addPoste:function(e,t){e.postes.push(t)},cleanPostes:function(e){e.postes.splice(0)},updatePoste:function(e,t){e.postes[e.postes.findIndex(function(e){return e.id===t.id})]=t},addCourse:function(e,t){e.courses.push(t)},cleanCourses:function(e){e.courses.splice(0)},updateCourse:function(e,t){e.courses[e.courses.findIndex(function(e){return e.id===t.id})]=t}}})},c1c3:function(e,t,n){}});
//# sourceMappingURL=app.956cc6b8.js.map