import{w as n,a as i}from"./with-props-D3AO8slx.js";import{l as t,M as c,L as l,S as h,n as u,O as p,o as d}from"./chunk-KNED5TY2-BWNdqSdz.js";const x=()=>[{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"}];function g({children:e}){return t.jsxs("html",{lang:"en",children:[t.jsxs("head",{children:[t.jsx("meta",{charSet:"utf-8"}),t.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),t.jsx(c,{}),t.jsx(l,{}),t.jsx("script",{dangerouslySetInnerHTML:{__html:`
            // Fix paths for GitHub Pages
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
          `}})]}),t.jsxs("body",{children:[t.jsx("div",{"data-basename":"/cocktail-random",children:e}),t.jsx(h,{}),t.jsx(u,{})]})]})}const j=n(function(){return t.jsx(p,{})}),y=i(function({error:s}){let o="Oops!",a="An unexpected error occurred.",r;return d(s)&&(o=s.status===404?"404":"Error",a=s.status===404?"The requested page could not be found.":s.statusText||a),t.jsxs("main",{className:"pt-16 p-4 container mx-auto",children:[t.jsx("h1",{children:o}),t.jsx("p",{children:a}),r]})});export{y as ErrorBoundary,g as Layout,j as default,x as links};
