import{w as n,a as i,j as t,M as c,L as l,S as h,b as d,O as u,i as p}from"./jsx-runtime-BI0qfw_o.js";const x=()=>[{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"}],m=`
  // This script runs in the browser to set the correct base path
  (function() {
    const isGitHubPages = window.location.hostname !== 'localhost';
    const basePath = isGitHubPages ? '/cocktail-random' : '/';
    
    // Set a data attribute for JavaScript to reference
    document.documentElement.dataset.basePath = basePath;
    
    // Fix paths if needed
    if (isGitHubPages) {
      document.querySelectorAll('link[href^="/"], script[src^="/"], img[src^="/"]').forEach(el => {
        const attr = el.tagName === 'LINK' ? 'href' : 'src';
        if (el[attr] && el[attr].startsWith('/') && !el[attr].startsWith('/cocktail-random/')) {
          el[attr] = '/cocktail-random' + el[attr];
        }
      });
    }
  })();
`;function g({children:s}){return t.jsxs("html",{lang:"en","data-app":"cocktail-generator",children:[t.jsxs("head",{children:[t.jsx("meta",{charSet:"utf-8"}),t.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),t.jsx(c,{}),t.jsx(l,{}),t.jsx("script",{dangerouslySetInnerHTML:{__html:m}})]}),t.jsxs("body",{children:[t.jsx("div",{"data-router-context":"root",children:s}),t.jsx(h,{}),t.jsx(d,{})]})]})}const j=n(function(){return t.jsx(u,{})}),b=i(function({error:e}){let r="Oops!",a="An unexpected error occurred.",o;return p(e)&&(r=e.status===404?"404":"Error",a=e.status===404?"The requested page could not be found.":e.statusText||a),t.jsxs("main",{className:"pt-16 p-4 container mx-auto",children:[t.jsx("h1",{children:r}),t.jsx("p",{children:a}),o]})});export{b as ErrorBoundary,g as Layout,j as default,x as links};
