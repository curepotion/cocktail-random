import{w as n,a as i,j as t,M as c,L as l,S as h,b as p,O as u,i as d}from"./jsx-runtime-BI0qfw_o.js";const f=()=>[{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"}],m=`
  // This script runs in the browser to set the correct base path
  (function() {
    const isGitHubPages = window.location.hostname !== 'localhost';
    if (isGitHubPages) {
      // Fix any absolute paths that start with /
      document.querySelectorAll('link[href^="/"], script[src^="/"], img[src^="/"]').forEach(el => {
        const attr = el.tagName === 'LINK' ? 'href' : 'src';
        if (el[attr] && el[attr].startsWith('/') && !el[attr].startsWith('/cocktail-random/')) {
          el[attr] = '/cocktail-random' + el[attr];
        }
      });
    }
  })();
`;function j({children:e}){return t.jsxs("html",{lang:"en",children:[t.jsxs("head",{children:[t.jsx("meta",{charSet:"utf-8"}),t.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),t.jsx(c,{}),t.jsx(l,{}),t.jsx("script",{dangerouslySetInnerHTML:{__html:m}})]}),t.jsxs("body",{children:[t.jsx("div",{children:e}),t.jsx(h,{}),t.jsx(p,{})]})]})}const g=n(function(){return t.jsx(u,{})}),w=i(function({error:s}){let a="Oops!",r="An unexpected error occurred.",o;return d(s)&&(a=s.status===404?"404":"Error",r=s.status===404?"The requested page could not be found.":s.statusText||r),t.jsxs("main",{className:"pt-16 p-4 container mx-auto",children:[t.jsx("h1",{children:a}),t.jsx("p",{children:r}),o]})});export{w as ErrorBoundary,j as Layout,g as default,f as links};
