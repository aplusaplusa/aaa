// ==============================================================================
// Projects: Loading
// ==============================================================================
const loadingImages = [
  'img_projects_loading/loading_1.png',
  'img_projects_loading/loading_2.png',
  'img_projects_loading/loading_3.png',
  'img_projects_loading/loading_4.png'
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

let allTypes = [];        // category1
let selectedTypes = [];

let allCategories = [];  // category2
let selectedCategories = [];

// --- Sheet Renderding ---
function renderSheets() {
  const thumbnails = document.getElementById("thumbnails");
  thumbnails.innerHTML = "";

  let filtered = allSheets.filter(sh => {
    const sheetCats = [
      ...(sh.category1 ? sh.category1.split(",") : []),
      ...(sh.category2 ? sh.category2.split(",") : [])
    ].map(c => c.trim()).filter(Boolean);

    if (selectedTypes.length === 0 && selectedCategories.length === 0) {
      return true;
    }

    const typeMatch =
      selectedTypes.length > 0 &&
      sheetCats.some(c => selectedTypes.includes(c));

    const categoryMatch =
      selectedCategories.length > 0 &&
      sheetCats.some(c => selectedCategories.includes(c));

    return typeMatch || categoryMatch;
  });

  if (filtered.length === 0) return;

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

    wrap.addEventListener("click", () => {
      loadSheetData(sh.name);
      const newUrl = window.location.pathname + "?sheet=" + encodeURIComponent(sh.name);
      window.history.pushState({ sheet: sh.name }, "", newUrl);

      const filters = document.getElementById("filters");
      if (filters) filters.style.display = "none";
      thumbnails.style.display = "none";
      const projectDetail = document.getElementById("projectDetail");
      if (projectDetail) projectDetail.style.display = "block";
    });

    thumbnails.appendChild(wrap);
  });
}




const defaultVisibleCount = 10;

function renderTypes() {
  const typeFilter = document.getElementById("typeFilter");
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

    if (index >= defaultVisibleCount) {
      item.classList.add("is-hidden");
    }

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

      if (selectedTypes.includes(type)) {
        selectedTypes = selectedTypes.filter(t => t !== type);
      } else {
        selectedTypes.push(type);
      }

      renderSheets();
    });
  });

  // See More / See Less Click
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isCollapsed = toggleBtn.dataset.state === "collapsed";

      typeFilter.querySelectorAll(".type-item").forEach((item, index) => {
        if (index >= defaultVisibleCount) {
          item.classList.toggle("is-hidden", !isCollapsed);
        }
      });

      toggleBtn.textContent = isCollapsed ? "See Less" : "See More";
      toggleBtn.dataset.state = isCollapsed ? "expanded" : "collapsed";
    });
  }
}


// --- Category Renderding ---
function renderCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
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

    if (index >= defaultVisibleCount) {
      item.classList.add("is-hidden");
    }

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

      if (selectedCategories.includes(type)) {
        selectedCategories = selectedCategories.filter(t => t !== type);
      } else {
        selectedCategories.push(type);
      }

      renderSheets();
    });
  });

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isCollapsed = toggleBtn.dataset.state === "collapsed";

      categoryFilter.querySelectorAll(".category-item").forEach((item, index) => {
        if (index >= defaultVisibleCount) {
          item.classList.toggle("is-hidden", !isCollapsed);
        }
      });

      toggleBtn.textContent = isCollapsed ? "See Less" : "See More";
      toggleBtn.dataset.state = isCollapsed ? "expanded" : "collapsed";
    });
  }
}






// --- Sheet Data fetch + Renderding ---
function loadSheetData(sheetName) {
  const detailUrl = `${projectUrl}?sheet=${encodeURIComponent(sheetName)}`;
  const container = document.getElementById('projectDetail');
  container.innerHTML = 'Loading...';

  fetch(detailUrl)
    .then(res => res.json())
    .then(res => {
      const data = res.data || [];
      container.innerHTML = '';

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

      if(data.length === 0) {
        container.textContent = 'No data';
      }
    })
    .catch(err => {
      console.error(err);
      container.textContent = 'No data';
    });
}

// --- Page Loaded > URL  ---
const params = new URLSearchParams(window.location.search);
const sheetNameFromUrl = params.get("sheet");
if(sheetNameFromUrl) {
  loadSheetData(sheetNameFromUrl);
}

// --- initial fetch ---
fetch(projectUrl)
  .then(res => res.json())
  .then(json => {
    allSheets = json.sheets;

    allTypes = json.categories.type || [];
    allCategories = json.categories.category || [];

    renderTypes();
    renderCategories();
    renderSheets();
  })
  .catch(err => {
    console.error(err);
    // document.getElementById("thumbnails").textContent = "Failed to load.";
  });