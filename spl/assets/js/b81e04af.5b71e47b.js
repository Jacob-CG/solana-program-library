"use strict";(self.webpackChunksolana_spl_docs=self.webpackChunksolana_spl_docs||[]).push([[844],{3905:function(e,t,n){n.d(t,{Zo:function(){return m},kt:function(){return d}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},m=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),u=c(n),d=o,g=u["".concat(l,".").concat(d)]||u[d]||p[d]||a;return n?r.createElement(g,i(i({ref:t},m),{},{components:n})):r.createElement(g,i({ref:t},m))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var c=2;c<a;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},8662:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return m},default:function(){return u}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),i=["components"],s={title:"Memo Program"},l=void 0,c={unversionedId:"memo",id:"memo",isDocsHomePage:!1,title:"Memo Program",description:"The Memo program is a simple program that validates a string of UTF-8 encoded",source:"@site/src/memo.md",sourceDirName:".",slug:"/memo",permalink:"solana-program-library/spl/memo",tags:[],version:"current",frontMatter:{title:"Memo Program"},sidebar:"docs",previous:{title:"Associated Token Account Program",permalink:"solana-program-library/spl/associated-token-account"},next:{title:"Name Service",permalink:"solana-program-library/spl/name-service"}},m=[{value:"Background",id:"background",children:[],level:2},{value:"Source",id:"source",children:[],level:2},{value:"Interface",id:"interface",children:[],level:2},{value:"Operational Notes",id:"operational-notes",children:[{value:"Logs",id:"logs",children:[],level:3},{value:"Compute Limits",id:"compute-limits",children:[],level:3}],level:2}],p={toc:m};function u(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"The Memo program is a simple program that validates a string of UTF-8 encoded\ncharacters and verifies that any accounts provided are signers of the\ntransaction. The program also logs the memo, as well as any verified signer\naddresses, to the transaction log, so that anyone can easily observe memos and\nknow they were approved by zero or more addresses by inspecting the transaction\nlog from a trusted provider."),(0,a.kt)("h2",{id:"background"},"Background"),(0,a.kt)("p",null,"Solana's programming model and the definitions of the Solana terms used in this\ndocument are available at:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://docs.solana.com/apps"},"https://docs.solana.com/apps")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://docs.solana.com/terminology"},"https://docs.solana.com/terminology"))),(0,a.kt)("h2",{id:"source"},"Source"),(0,a.kt)("p",null,"The Memo Program's source is available on\n",(0,a.kt)("a",{parentName:"p",href:"https://github.com/solana-labs/solana-program-library"},"github")),(0,a.kt)("h2",{id:"interface"},"Interface"),(0,a.kt)("p",null,"The on-chain Memo Program is written in Rust and available on crates.io as\n",(0,a.kt)("a",{parentName:"p",href:"https://crates.io/crates/spl-memo"},"spl-memo")," and\n",(0,a.kt)("a",{parentName:"p",href:"https://docs.rs/spl-memo"},"docs.rs"),"."),(0,a.kt)("p",null,"The crate provides a ",(0,a.kt)("inlineCode",{parentName:"p"},"build_memo()")," method to easily create a properly\nconstructed Instruction."),(0,a.kt)("h2",{id:"operational-notes"},"Operational Notes"),(0,a.kt)("p",null,"If zero accounts are provided to the signed-memo instruction, the program\nsucceeds when the memo is valid UTF-8, and logs the memo to the transaction log."),(0,a.kt)("p",null,"If one or more accounts are provided to the signed-memo instruction, all must be\nvalid signers of the transaction for the instruction to succeed."),(0,a.kt)("h3",{id:"logs"},"Logs"),(0,a.kt)("p",null,"This section details expected log output for memo instructions."),(0,a.kt)("p",null,"Logging begins with entry into the program:\n",(0,a.kt)("inlineCode",{parentName:"p"},"Program MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr invoke [1]")),(0,a.kt)("p",null,"The program will include a separate log for each verified signer:\n",(0,a.kt)("inlineCode",{parentName:"p"},"Program log: Signed by <BASE_58_ADDRESS>")),(0,a.kt)("p",null,"Then the program logs the memo length and UTF-8 text:\n",(0,a.kt)("inlineCode",{parentName:"p"},'Program log: Memo (len 4): "\ud83d\udc06"')),(0,a.kt)("p",null,"If UTF-8 parsing fails, the program will log the failure point:\n",(0,a.kt)("inlineCode",{parentName:"p"},"Program log: Invalid UTF-8, from byte 4")),(0,a.kt)("p",null,"Logging ends with the status of the instruction, one of:\n",(0,a.kt)("inlineCode",{parentName:"p"},"Program MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr success"),"\n",(0,a.kt)("inlineCode",{parentName:"p"},"Program MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr failed: missing required signature for instruction"),"\n",(0,a.kt)("inlineCode",{parentName:"p"},"Program MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr failed: invalid instruction data")),(0,a.kt)("p",null,"For more information about exposing program logs on a node, head to the\n",(0,a.kt)("a",{parentName:"p",href:"https://docs.solana.com/developing/on-chain-programs/debugging#logging"},"developer\ndocs")),(0,a.kt)("h3",{id:"compute-limits"},"Compute Limits"),(0,a.kt)("p",null,"Like all programs, the Memo Program is subject to the cluster's ",(0,a.kt)("a",{parentName:"p",href:"https://docs.solana.com/developing/programming-model/runtime#compute-budget"},"compute\nbudget"),".\nIn Memo, compute is used for parsing UTF-8, verifying signers, and logging,\nlimiting the memo length and number of signers that can be processed\nsuccessfully in a single instruction. The longer or more complex the UTF-8 memo,\nthe fewer signers can be supported, and vice versa."),(0,a.kt)("p",null,"As of v1.5.1, an unsigned instruction can support single-byte UTF-8 of up to 566\nbytes. An instruction with a simple memo of 32 bytes can support up to 12\nsigners."))}u.isMDXComponent=!0}}]);