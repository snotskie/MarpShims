const MarpShims = (function(){
  const pub = {};
  // usage: create an anchor with href="javascript:MarpShims.toggleTheme()"
  pub.toggleTheme = function(){
    document
      .querySelectorAll('svg[data-marpit-svg] > foreignObject > section')
      .forEach((e) => e.classList.toggle('invert'));
  };

  // usage: call MarpShims.autoTheme() on load
  pub.autoTheme = function(){
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
      pub.toggleTheme();
    }
  };

  // usage: call MarpShims.autoScale() on load. See README for css example
  pub.autoScale = function(){
    if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)){
      document
        .querySelectorAll('svg[data-marpit-svg]')
        .forEach((e) => e.classList.add('fitscale'));
    } else {
      document
        .querySelectorAll('svg[data-marpit-svg]')
        .forEach((e) => e.classList.add('fixedscale'));
    }
  };

  // usage: call MarpShims.breakPages() on load
  pub.breakPages = function(){
    const svgs = document.querySelectorAll("svg[data-marpit-svg]");
    for (const svg of svgs){
      if (svg.children.length == 1){ // ignore pages with a split background, ill-defined solution in that case
        const page = svg.children[0].children[0];
        const fo = page.closest("foreignObject");
        const width = parseFloat(fo.getAttribute("width"));
        const height = parseFloat(fo.getAttribute("height"));
        const scale = fo.getBoundingClientRect().height / height;
        const cutoff = page.getBoundingClientRect().bottom - scale*parseFloat(getComputedStyle(page).getPropertyValue("padding-bottom"));
        // const cutoff = page.getBoundingClientRect().bottom - parseFloat(getComputedStyle(page).getPropertyValue("padding-bottom"));
        let start = 1; // skip first element so we don't get in an infinite loop
        if (["H1", "H2", "H3", "H4", "H5", "H6"].includes(page.children[0]?.nodeName)){
          // skip the element right after a heading too, so headings aren't alone on a page
          start = 2;
        }

        for (let i=start; i < page.children.length; ++i){
          const item = page.children[i];
          if (item.getBoundingClientRect().bottom >= cutoff){
            const resvg = svg.cloneNode();
            const refo = page.closest("foreignObject").cloneNode();
            const repage = page.cloneNode();
            resvg.appendChild(refo);
            refo.appendChild(repage);
            const to_move = [];
            for (let j=i; j < page.children.length; ++j){
              to_move.push(page.children[j]);
            }

            for (const moved of to_move){
              repage.appendChild(moved);
            }

            svg.after(resvg);
            return pub.breakPages(); // tail recurse, restart from the top
          }
        }
      }
    }
    
    let id = 1;
    document.querySelectorAll("svg[data-marpit-svg] > foreignObject > section[id]").forEach((page) => {
      page.setAttribute("id", id);
      ++id;
    });
    
    let pagination = 1;
    document.querySelectorAll("svg[data-marpit-svg]").forEach((svg) => {
      let dirty = false;
      svg.querySelectorAll("section[data-marpit-pagination]").forEach((page) => {
        page.setAttribute("data-marpit-pagination", pagination);
        dirty = true;
      });

      if (dirty){
        ++pagination;
      }
    });
  };

  // usage: call MarpShims.growPages() on load
  pub.growPages = function(){
    const svgs = document.querySelectorAll("svg[data-marpit-svg]");
    for (const svg of svgs){
      if (svg.children.length == 1){ // ignore pages with a split background, ill-defined solution in that case
        const page = svg.children[0].children[0];
        const fo = page.closest("foreignObject");
        const width = parseFloat(fo.getAttribute("width"));
        const height = parseFloat(fo.getAttribute("height"));
        const scale = fo.getBoundingClientRect().height / height;
        const cutoff = page.getBoundingClientRect().bottom - scale*parseFloat(getComputedStyle(page).getPropertyValue("padding-bottom"));
        const item = page.children[page.children.length-1];
        const excess = item.getBoundingClientRect().bottom - cutoff;
        if (excess > 0){
          const new_height = height + excess/scale + parseFloat(getComputedStyle(page).getPropertyValue("padding-bottom"));
          svg.setAttribute("viewBox", `0 0 ${width} ${new_height}`);
          fo.setAttribute("height", new_height);
          svg.style.height = `${new_height}px !important`;
          page.style.height = `${new_height}px !important`;
        }
      }
    }
  };

  // usage: call MarpShims.shrinkPages() on load
  pub.shrinkPages = function(){
    const svgs = document.querySelectorAll("svg[data-marpit-svg]");
    for (const svg of svgs){
      if (svg.children.length == 1){ // ignore pages with a split background, ill-defined solution in that case
        const page = svg.children[0].children[0];
        const fo = page.closest("foreignObject");
        const width = parseFloat(fo.getAttribute("width"));
        const height = parseFloat(fo.getAttribute("height"));
        const scale = fo.getBoundingClientRect().height / height;
        const cutoff = page.getBoundingClientRect().bottom - scale*parseFloat(getComputedStyle(page).getPropertyValue("padding-bottom"));
        const item = page.children[page.children.length-1];
        const excess = item.getBoundingClientRect().bottom - cutoff;
        if (excess < 0){
          const new_height = height + excess/scale + parseFloat(getComputedStyle(page).getPropertyValue("padding-bottom"));
          svg.setAttribute("viewBox", `0 0 ${width} ${new_height}`);
          fo.setAttribute("height", new_height);
          svg.style.height = `${new_height}px !important`;
          page.style.height = `${new_height}px !important`;
        }
      }
    }
  };

  // usage: call MarpShims.stretchPages() on load
  pub.stretchPages = function(){
    const svgs = document.querySelectorAll("svg[data-marpit-svg]");
    for (const svg of svgs){
      if (svg.children.length == 1){ // ignore pages with a split background, ill-defined solution in that case
        const page = svg.children[0].children[0];
        const fo = page.closest("foreignObject");
        const width = parseFloat(fo.getAttribute("width"));
        const height = parseFloat(fo.getAttribute("height"));
        const scale = fo.getBoundingClientRect().height / height;
        const cutoff = page.getBoundingClientRect().bottom - scale*parseFloat(getComputedStyle(page).getPropertyValue("padding-bottom"));
        const item = page.children[page.children.length-1];
        const excess = item.getBoundingClientRect().bottom - cutoff;
        if (excess != 0){
          const new_height = height + excess/scale + parseFloat(getComputedStyle(page).getPropertyValue("padding-bottom"));
          svg.setAttribute("viewBox", `0 0 ${width} ${new_height}`);
          fo.setAttribute("height", new_height);
          svg.style.height = `${new_height}px !important`;
          page.style.height = `${new_height}px !important`;
        }
      }
    }
  };

  // pub.bindControls = function(nextCodes, prevCodes){
  //   let SLIDE = parseInt(location.hash.substr(2)) || 1;
  //   document.documentElement.style.setProperty("scroll-behavior", "smooth");
  //   window.addEventListener("keydown", (e) => {
  //     let s = null;
  //     let dirty = false;
  //     if (nextCodes.includes(e.code) && (s = document.querySelector(`section[id="${SLIDE+1}"]`))){
  //       ++SLIDE;
  //     } else if (prevCodes.includes(e.code) && (s = document.querySelector(`section[id="${SLIDE-1}"]`))){
  //       --SLIDE;
  //     }

  //     if (s){
  //       location.hash = "#!" + SLIDE;
  //       window.scrollBy({
  //         left: 0,
  //         top: s.getBoundingClientRect().top,
  //         behavior: "smooth"
  //       });

  //       e.preventDefault(); // bugfix: chrome won't scroll without this and with behavior: "smooth"
  //       e.stopPropagation();
  //     }
  //   });
  // };

  // usage: call MarpShims.withTOC(...) onload. In the callback function, call MarpShims.breakPages() etc. if necessary
  pub.withTOC = function(toc, query, cb){
    let records = [];
    document.querySelectorAll(query).forEach(function(e){
      const section = e.closest("section");
      const page = section.getAttribute("data-marpit-pagination");
      if (page){
        const toc_line = document.createElement("p");
        toc.appendChild(toc_line);
        toc_line.classList.add("toc_line");
        toc_line.classList.add(`toc_${e.nodeName}`)

        const entry_a = document.createElement("a");
        toc_line.appendChild(entry_a);
        entry_a.classList.add("toc_anchor");
        entry_a.innerText = e.innerText;

        const page_no = document.createElement("span");
        toc_line.appendChild(page_no);
        page_no.classList.add("toc_page_no");

        const target_element = document.createElement("div");
        target_element.setAttribute("id", "@"+e.innerText.toLowerCase().replaceAll(/[^a-z]/g, ""));
        target_element.style.position = "absolute";
        target_element.style.top = 0;
        section.appendChild(target_element);

        records.push({
          anchor: entry_a,
          section: section,
          page_no: page_no,
          target_element: target_element
        });
      }
    });
    
    cb(records);
    for (const {anchor, section, page_no, target_element} of records){
      anchor.setAttribute("href", "#" + target_element.getAttribute("id"));
      const page = section.getAttribute("data-marpit-pagination");
      page_no.innerText = page;
    }
  };

  // usage: call MarpShims.anchorHeadings() on load
  pub.anchorHeadings = function(query){
    document.querySelectorAll(query).forEach(function(e){
      const section = e.closest("section");

      const target_element = document.createElement("div");
      target_element.setAttribute("id", "@"+e.innerText.toLowerCase().replaceAll(/[^a-z]/g, ""));
      target_element.style.position = "absolute";
      target_element.style.top = 0;
      section.appendChild(target_element);

      const html = e.innerHTML;
      e.innerHTML = "";
      const a = document.createElement("a");
      e.appendChild(a);

      a.innerHTML = html;
      a.setAttribute("href", "#" + target_element.getAttribute("id"));
      a.classList.add("anchor_heading");
      a.classList.add(`ah_${e.nodeName}`);
    });
  };

  // usage: on load, set a 100 ms timeout to call MarpShims.scrollToHash()
  pub.scrollToHash = function(){
    if (location.hash){
      document.getElementById(location.hash.substring(1)).scrollIntoView();
    }
  };

  // usage: call MarpShims.load(...) on load to call the recommended sequence of the above functions
  pub.load = function(_config){
    const config = {
      headings_query: "h1",
      toc_id: "toc",
      ..._config
    };
    
    const {
      headings_query,
      toc_id
    } = config;
    pub.autoTheme();
    pub.autoScale();
    let toc = false;
    if (toc_id && (toc = document.getElementById(toc_id))){
      pub.withTOC(toc, headings_query, () => {
        pub.breakPages();
      });
    } else {
      pub.breakPages();
    }

    pub.anchorHeadings(headings_query);
    setTimeout(() => {
      pub.scrollToHash();
    }, 100);
  };
  
  return pub;
})();
