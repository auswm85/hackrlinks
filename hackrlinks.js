/* 
* hackrlinks.js
* Version: 1.0.0
* License: MIT
* Author: Austin McShan
* http://github.com/auswm85/hackrlinks
*/ 
(function () {
    'use strict';
    var doc = document, // cache is king
        
        links = doc.querySelectorAll('.title a'),
        
        keyMap = { TAB: 9 }, // key code mapping
        
        hackrLinks = [], // collection of link objects
        
        head = doc.head || doc.getElementsByTagName('head')[0],
        
        style = doc.createElement('style'), // stylesheet element
        
        css = 'a[data-hackr-link]:focus { position:relative; background-color:orange; font-weight:bold; }', // hackr link styles
        
        selectedLink = 1, // track currently selected link. Initialize to 1
        
        HackrLink = function (el, idx, title, href) {
            this.el = el;
            this.idx = idx;
            this.title = title;
            this.href = href;
            
            this.focus = function () {
                this.el.focus();
            };
            
            this.init = function () {
                this.el.setAttribute('data-link-id', this.idx);
                this.el.setAttribute('data-hackr-link', 'true');
                this.el.setAttribute('target', '_blank');
            };
            
            this.init();
        };

    var addStyles = function(){
        style.type = 'text/css';
        
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        }else {
            style.appendChild(doc.createTextNode(css));
        }
        
        head.appendChild(style);
    };

    var init = function() {
        addStyles();
        
        for (var i = 0, len = links.length; i < len; i++) {
            var linkEl = links[i],
                idx = i + 1,
                title = linkEl.textContent || linkEl.innerText,
                href = linkEl.href,
                hackrLink = new HackrLink(linkEl, idx, title, href);
                
                hackrLinks.push(hackrLink);
        }
        
        // listen for tab key
        window.addEventListener('keydown', function(e) {
            if (e.keyCode === keyMap.TAB) {
                for (var i = 0, len = hackrLinks.length; i < len; i++) {
                    var lnk = hackrLinks[i];

                    for (var attr in lnk) {
                        if (attr === 'idx' && lnk[attr] === selectedLink) {
                           lnk.focus();
                        }
                    }
                }
            
             if (selectedLink >= 30) {
                selectedLink = 1;// reset to starting link index
             } else {
                selectedLink = selectedLink + 1;
             }
             
             e.preventDefault();
          }
        });
    }; // init
    init();
})();
