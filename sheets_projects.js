// ==============================================================================
// Projects: Loading
// ==============================================================================
const loadingImages = [
  '../img_projects_loading/loading_1.png',
  '../img_projects_loading/loading_2.png',
  '../img_projects_loading/loading_3.png',
  '../img_projects_loading/loading_4.png'
];

let lastLoadingIndex = -1;
const loadingEl = document.querySelector("#thumbnails-loading");

function getRandomLoadingIndex() {
  if (loadingImages.length <= 1) return 0;

  let idx = Math.floor(Math.random() * loadingImages.length);
  while (idx === lastLoadingIndex) {
    idx = Math.floor(Math.random() * loadingImages.length);
  }
  return idx;
}

function updateLoadingBackground() {
  if (!loadingEl) return;

  const idx = getRandomLoadingIndex();
  lastLoadingIndex = idx;
  const imageUrl = loadingImages[idx];

  loadingEl.style.backgroundImage = `url('${imageUrl}')`;
}

updateLoadingBackground();
setInterval(updateLoadingBackground, 1000);




// ==============================================================================
// Sheets
// ==============================================================================
let allSheets = [];
let allTypes = [];
let selectedTypes = [];
let allCategories = [];
let selectedCategories = [];
const defaultVisibleCount = 10;

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function getSheetNameFromSlug(slug) {
  return allSheets.find(sh => slugify(sh.name) === slug)?.name || null;
}

// ------------------------------------------------------------------------------
// UI Helpers
// ------------------------------------------------------------------------------
function showListView() {
  const filters = document.getElementById("filters");
  const thumbnails = document.getElementById("thumbnails");
  const projectDetail = document.getElementById("projectDetail");

  if (filters) filters.style.display = "grid";
  if (thumbnails) thumbnails.style.display = "flex";
  if (projectDetail) projectDetail.style.display = "none";
}

function showDetailView(sheetName) {
  const filters = document.getElementById("filters");
  const thumbnails = document.getElementById("thumbnails");
  const projectDetail = document.getElementById("projectDetail");

  if (filters) filters.style.display = "none";
  if (thumbnails) thumbnails.style.display = "none";
  if (projectDetail) projectDetail.style.display = "block";

  loadSheetData(sheetName);

  const slug = slugify(sheetName);
  window.location.hash = slug;
}

// ------------------------------------------------------------------------------
// Init From Hash
// ------------------------------------------------------------------------------
function initFromHash() {
  const hash = window.location.hash.replace("#", "");

  if (!hash) {
    showListView();
    return;
  }

  const sheetName = getSheetNameFromSlug(hash);
  if (sheetName) showDetailView(sheetName);
  else showListView();
}

// ------------------------------------------------------------------------------
// Popstate / Hashchange
// ------------------------------------------------------------------------------
window.addEventListener("hashchange", () => {
  initFromHash();
});

// ------------------------------------------------------------------------------
// Load Sheet Data
// ------------------------------------------------------------------------------
function loadSheetData(sheetName) {
  const detailUrl = `${projectUrl}?sheet=${encodeURIComponent(sheetName)}`;
  const container = document.getElementById("projectDetail");
  if (!container) return;
  container.innerHTML = "Loading...";

  fetch(detailUrl)
    .then(res => res.json())
    .then(res => {
      const data = res.data || [];
      container.innerHTML = "";

      let currentRowDiv = null;
      let currentImgContainer = null;

      data.forEach(item => {
        if(item.text) {
          currentRowDiv = document.createElement('div');
          currentRowDiv.className = 'col3-a-bc';
          container.appendChild(currentRowDiv);

          const textDiv = document.createElement('div');
          textDiv.className = 'col3-a';
          const pre = document.createElement('pre');
          pre.textContent = item.text;
          textDiv.appendChild(pre);
          currentRowDiv.appendChild(textDiv);

          currentImgContainer = null;
        }

        if(item.image) {
          if(!currentRowDiv) {
            currentRowDiv = document.createElement('div');
            currentRowDiv.className = 'col3-a-bc';
            container.appendChild(currentRowDiv);
          }

          if(!currentImgContainer) {
            currentImgContainer = document.createElement('div');
            currentImgContainer.className = 'col3-bc';
            currentRowDiv.appendChild(currentImgContainer);
          }

          const imgDiv = document.createElement('div');
          imgDiv.style.backgroundImage = `url('${item.image}')`;
          imgDiv.className = 'bg-project';

          currentImgContainer.appendChild(imgDiv);
        }
      });

      if(data.length === 0) container.textContent = 'No data';
    })
    .catch(err => {
      console.error(err);
      container.textContent = "No data";
    });
}

// ------------------------------------------------------------------------------
// Render Sheets & Filters
// ------------------------------------------------------------------------------
function renderSheets() {
  const thumbnails = document.getElementById("thumbnails");
  if (!thumbnails) return;
  thumbnails.innerHTML = "";

  const filtered = allSheets.filter(sh => {
    const sheetCats = [
      ...(sh.category1 ? sh.category1.split(",") : []),
      ...(sh.category2 ? sh.category2.split(",") : [])
    ].map(c => c.trim()).filter(Boolean);

    if (selectedTypes.length === 0 && selectedCategories.length === 0) return true;

    const typeMatch = selectedTypes.length > 0 && sheetCats.some(c => selectedTypes.includes(c));
    const categoryMatch = selectedCategories.length > 0 && sheetCats.some(c => selectedCategories.includes(c));

    return typeMatch || categoryMatch;
  });

  filtered.forEach(sh => {
    const wrap = document.createElement("div");
    wrap.className = "thumbnail-item";

    if (sh.image) {
      const img = document.createElement("img");
      img.src = sh.image;
      img.className = "thumbnail-img";
      wrap.appendChild(img);
    }

    const title = document.createElement("div");
    title.className = "thumbnail-title";
    title.textContent = sh.name;
    wrap.appendChild(title);

    if (sh.text) {
      const t = document.createElement("div");
      t.className = "thumbnail-sub";
      t.textContent = sh.text;
      wrap.appendChild(t);
    }

    wrap.addEventListener("click", () => showDetailView(sh.name));
    thumbnails.appendChild(wrap);
  });
}

function renderTypes() {
  const typeFilter = document.getElementById("typeFilter");
  if (!typeFilter) return;
  typeFilter.innerHTML = "";

  const header = document.createElement("h3");
  header.className = "filter-type";
  header.textContent = "Project Type";
  typeFilter.appendChild(header);

  allTypes.forEach((type, index) => {
    const item = document.createElement("button");
    item.className = "type-item";
    item.textContent = type;
    item.dataset.type = type;
    if (index >= defaultVisibleCount) item.classList.add("is-hidden");
    typeFilter.appendChild(item);
  });

  let toggleBtn = null;
  if (allTypes.length > defaultVisibleCount) {
    toggleBtn = document.createElement("div");
    toggleBtn.className = "type-toggle";
    toggleBtn.textContent = "See More";
    toggleBtn.dataset.state = "collapsed";
    typeFilter.appendChild(toggleBtn);
  }

  typeFilter.querySelectorAll(".type-item").forEach(el => {
    el.addEventListener("click", () => {
      const type = el.dataset.type;
      el.classList.toggle("item-selected");
      if (selectedTypes.includes(type)) selectedTypes = selectedTypes.filter(t => t !== type);
      else selectedTypes.push(type);
      renderSheets();
    });
  });

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isCollapsed = toggleBtn.dataset.state === "collapsed";
      typeFilter.querySelectorAll(".type-item").forEach((item, index) => {
        if (index >= defaultVisibleCount) item.classList.toggle("is-hidden", !isCollapsed);
      });
      toggleBtn.textContent = isCollapsed ? "See Less" : "See More";
      toggleBtn.dataset.state = isCollapsed ? "expanded" : "collapsed";
    });
  }
}

function renderCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  if (!categoryFilter) return;
  categoryFilter.innerHTML = "";

  const header = document.createElement("h3");
  header.className = "filter-type";
  header.textContent = "Category";
  categoryFilter.appendChild(header);

  allCategories.forEach((cat, index) => {
    const item = document.createElement("button");
    item.className = "category-item";
    item.textContent = cat;
    item.dataset.type = cat;
    if (index >= defaultVisibleCount) item.classList.add("is-hidden");
    categoryFilter.appendChild(item);
  });

  let toggleBtn = null;
  if (allCategories.length > defaultVisibleCount) {
    toggleBtn = document.createElement("div");
    toggleBtn.className = "category-toggle";
    toggleBtn.textContent = "See More";
    toggleBtn.dataset.state = "collapsed";
    categoryFilter.appendChild(toggleBtn);
  }

  categoryFilter.querySelectorAll(".category-item").forEach(el => {
    el.addEventListener("click", () => {
      const type = el.dataset.type;
      el.classList.toggle("item-selected");
      if (selectedCategories.includes(type)) selectedCategories = selectedCategories.filter(t => t !== type);
      else selectedCategories.push(type);
      renderSheets();
    });
  });

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isCollapsed = toggleBtn.dataset.state === "collapsed";
      categoryFilter.querySelectorAll(".category-item").forEach((item, index) => {
        if (index >= defaultVisibleCount) item.classList.toggle("is-hidden", !isCollapsed);
      });
      toggleBtn.textContent = isCollapsed ? "See Less" : "See More";
      toggleBtn.dataset.state = isCollapsed ? "expanded" : "collapsed";
    });
  }
}

// ------------------------------------------------------------------------------
// Home Screen Images
// ------------------------------------------------------------------------------
function renderHomeImages() {
  fetch(projectUrl)
    .then(res => res.json())
    .then(json => {
      if (!json.sheets) return;
      const allImages = [];
      json.sheets.forEach(sheet => {
        if (sheet.homeImages?.length) {
          sheet.homeImages.forEach(imgUrl => {
            allImages.push({
              url: imgUrl,
              title: sheet.name,
              text: sheet.text || "",
              sheetName: sheet.name
            });
          });
        }
      });

      const homeWrapper = document.getElementById("sheetHome");
      if (!homeWrapper) return;
      homeWrapper.innerHTML = "";

      for (let i = 0; i < allImages.length; i += 3) {
        if (i + 2 >= allImages.length) break;
        const col3Home = document.createElement("div");
        col3Home.className = "col3-home";

        for (let j = 0; j < 3; j++) {
          const item = allImages[i + j];

          const colA = document.createElement("div");
          colA.className = "col3-home-item";
          colA.style.flex = "1";
          colA.style.display = "flex";
          colA.style.flexDirection = "column";
          colA.style.minHeight = "100vh";

          const figure = document.createElement("figure");
          figure.style.position = "relative";
          figure.style.minHeight = "100vh";
          figure.style.margin = "0";

          const imgDiv = document.createElement("div");
          imgDiv.style.width = "100%";
          imgDiv.style.height = "100%";
          imgDiv.style.backgroundSize = "cover";
          imgDiv.style.backgroundPosition = "center";
          imgDiv.style.backgroundRepeat = "no-repeat";

          const img = new Image();
          img.src = item.url;
          img.onload = () => imgDiv.style.backgroundImage = `url('${img.src}')`;

          const caption = document.createElement("div");
          caption.innerHTML = `${item.title}<br>${item.text}`;
          caption.style.position = "absolute";
          caption.style.bottom = "15px";
          caption.style.left = "20px";
          caption.style.color = "white";
          caption.style.fontSize = "16px";
          caption.style.textShadow = "0 0 5px gray";

          figure.appendChild(imgDiv);
          figure.appendChild(caption);
          colA.appendChild(figure);
          col3Home.appendChild(colA);

          figure.addEventListener("click", () => {
            const slug = slugify(item.sheetName);

            window.location.href = "/projects/#" + slug;
            showDetailView(item.sheetName);
          });
        }

        homeWrapper.appendChild(col3Home);
      }
    })
    .catch(err => console.error(err));
}

// ------------------------------------------------------------------------------
// Initial Fetch
// ------------------------------------------------------------------------------
fetch(projectUrl)
  .then(res => res.json())
  .then(json => {
    allSheets = json.sheets || [];
    allTypes = json.categories?.type || [];
    allCategories = json.categories?.category || [];

    renderTypes();
    renderCategories();
    renderSheets();
    renderHomeImages();
    initFromHash();
  })
  .catch(err => console.error(err));