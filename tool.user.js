// ==UserScript==
// @name        Tool_dlink
// @namespace   Dlink Scripts
// @match       https://dlink.stockbook.vn/
// @grant       none
// @version     1.0
// @author      an.do
// @description 8/5/2023, 12:25:45 PM
// @grant           GM_info
// @grant           GM_addStyle
// ==/UserScript==


function run(){var e=localStorage.getItem("rxuserneta");let t=e?JSON.parse(e):null;if(!t)return;function s(e,t){let s=document.createElement(e);return Object.entries(t).forEach(([e,t])=>s[e]=t),s}console.log(t);let i=`
 .zmessage_row{
    position: relative;
 }
 #delete_message{
    margin: 2px 0px;
    max-height: 44px;
    color: red;
    outline: auto;
    width: 36px;
    padding: 2px;
 }
  #view_message {
    margin: 2px 0px;
    max-height: 44px;
    background: blue;
    color: white;
    outline: auto;
    width: 36px;
    padding: 2px;

  }`;GM_addStyle(i);let a=s("button",{id:"view_message",title:"Click to send the DAN message",style:"margin: 2px 0; max-height: 44px;",className:"noselect"});a.innerHTML="V";let n=[],l=new WebSocket(`wss://vndconn-dlink.stockbook.vn:2082/socket.io/?session=${t?.user?.token}&deviceid=010787b7c5539619&version=1&EIO=3&transport=websocket`);l.onopen=function(e){console.log("connection"),l.send('42/data,12["list_group",{"uin":4785074604539619,"sort_by":1,"pindex":0,"psize":30,"folder":1}]')};let o=[],r=[];l.onmessage=function(e){if(!e.data.includes("data"))return;let t=e.data.indexOf("[");if(-1===t)return;let s=JSON.parse(e.data.slice(t));if(s[0]?.groups&&(n=s[0]?.groups),e.data.includes("43/data,4")){let i=s[0].messages;o.push(...i)}},setInterval(()=>{let e=document.querySelector("#zchat_list"),t=e.querySelectorAll(".zmessage_row"),i=[...t].reverse();r=i,o.forEach((e,t)=>{if(r[t]){let i=r[t].querySelector("#view_message");if(r[t].querySelector("#delete_message"),i)return;let a=s("button",{id:"view_message",title:"Click to send the DAN message",style:"margin: 2px 0; max-height: 44px;",className:"noselect"});a.innerHTML="V";let n=s("button",{id:"delete_message",title:"Click to send the DAN message",style:"margin: 2px 0; max-height: 44px;",className:"noselect"});n.innerHTML="D",n.addEventListener("click",function(t){if(!0==confirm("Delete message!")){let s=String(e.message_id),i=`42/data,4["delete_message",{"group_id":${e.group_id},"message_id":"${s}","delete_all":false}]`;l.send(i),console.log("delete done")}else console.log("delete no")}),a.addEventListener("click",function(t){l.send(`42/data,14["delete_message",{"group_id":${e.group_id},"message_id":${e.message_id},"delete_all":true}]`),alert(e?.message)}),r[t].querySelector(".another_message_box")?.append(a,n)}})},1e3);let d="",g=0,c=()=>{let e=document.querySelectorAll(".zgroupitem");[...e].forEach(e=>{e.onclick=function(t){let s=e.querySelector(".zgroup_name_info")?.textContent,i=n.find(e=>e.name===s);g=0,d="",o=[],r=[],d=`42/data,4["list_message",{"group_id":${i?.group_id},"psize":30,"last_message_id":${i?.last_message_id},"direction":0,"pindex":indexPage}]`,l.send(`42/data,4["list_message",{"group_id":${i?.group_id},"psize":30,"last_message_id":${i?.last_message_id},"direction":0,"pindex":0}]`)}})};setTimeout(()=>{c();let e=$(".group_list_box");e[0].addEventListener("scroll",e=>{let t=e.target.querySelectorAll(".zgroupitem");[...t].forEach(e=>{e.onclick=function(t){let s=e.querySelector(".zgroup_name_info")?.textContent,i=n.find(e=>e.name===s);g=0,d="",o=[],r=[],d=`42/data,4["list_message",{"group_id":${i?.group_id},"psize":30,"last_message_id":${i?.last_message_id},"direction":0,"pindex":indexPage}]`,l.send(`42/data,4["list_message",{"group_id":${i?.group_id},"psize":30,"last_message_id":${i?.last_message_id},"direction":0,"pindex":0}]`)}})});let t=document.querySelector("#zchat_list");t.addEventListener("scroll",e=>{if(0===e.target.scrollTop){let t=d.replace("indexPage",g+1);l.send(t),g++}})},1e3)}run();