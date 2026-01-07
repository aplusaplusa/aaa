// ==============================================================================
// Loading
// ==============================================================================
const loadingImages = [
  'img_footer/construction_1.png',
  'img_footer/construction_3.png',
  'img_footer/construction_5.png',
  'img_footer/construction_7.png'
];

let lastLoadingIndex = -1;
const loadingEl = document.querySelector("#loadingImg");

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

  // loadingEl.style.transition = "background-image 1s ease-in-out";
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
  const list = document.getElementById("list");
  list.innerHTML = "";

  let filtered = allSheets;

  if (selectedTypes.length > 0) {
    filtered = filtered.filter(sh => selectedTypes.includes(sh.category1));
  }

  if (selectedCategories.length > 0) {
    filtered = filtered.filter(sh => selectedCategories.includes(sh.category2));
  }

  if (filtered.length === 0) return;

  filtered.forEach(sh => {
    const wrap = document.createElement("div");
    wrap.className = "sheet";

    if (sh.image) {
      const img = document.createElement("img");
      img.src = sh.image;
      img.className = "sheet-thumbnail";
      wrap.appendChild(img);
    }

    const title = document.createElement("div");
    title.className = "sheet-title";
    title.textContent = sh.name;
    wrap.appendChild(title);

    if (sh.text) {
      const t = document.createElement("div");
      t.className = "sheet-text";
      t.textContent = sh.text;
      wrap.appendChild(t);
    }

    wrap.addEventListener("click", () => {
      loadSheetData(sh.name);
      const newUrl = window.location.pathname + "?sheet=" + encodeURIComponent(sh.name);
      window.history.pushState({ sheet: sh.name }, "", newUrl);

      const categoriesBlock = document.getElementById("categoriesBlock");
      if (categoriesBlock) categoriesBlock.style.display = "none";
      list.style.display = "none";
      const content = document.getElementById("content");
      if (content) content.style.display = "block";
    });

    list.appendChild(wrap);
  });
}


// --- Project Type Renderding  ---
function renderTypes() {
  const typeList = document.getElementById("typeList");
  typeList.innerHTML = "";

  const header = document.createElement("h3");
  header.className = "item-header";
  header.textContent = "Project Type";
  typeList.appendChild(header);

  // const allBtn = document.createElement("div");
  // allBtn.className = "type-item";
  // allBtn.textContent = "All";
  // allBtn.dataset.type = "All";
  // allBtn.classList.add("item-selected");
  // typeList.appendChild(allBtn);

  allTypes.forEach(type => {
    const item = document.createElement("div");
    item.className = "type-item";
    item.textContent = type;
    item.dataset.type = type;
    typeList.appendChild(item);
  });

  typeList.querySelectorAll(".type-item").forEach(el => {
    el.addEventListener("click", () => {
      const type = el.dataset.type;

      if (type === "All") {
        selectedTypes = [];
        typeList.querySelectorAll(".type-item").forEach(btn => btn.classList.remove("item-selected"));
        el.classList.add("item-selected");
      } else {
        el.classList.toggle("item-selected");
        if (selectedTypes.includes(type)) {
          selectedTypes = selectedTypes.filter(t => t !== type);
        } else {
          selectedTypes.push(type);
        }
      }

      // if (type === "All") {
      //   selectedTypes = [];
      //   typeList.querySelectorAll(".type-item").forEach(btn => btn.classList.remove("item-selected"));
      //   el.classList.add("item-selected");
      // } else {
      //   const allBtn = typeList.querySelector('[data-type="All"]');
      //   if (allBtn) allBtn.classList.remove("item-selected");

      //   if (selectedTypes.includes(type)) {
      //     selectedTypes = selectedTypes.filter(t => t !== type);
      //     el.classList.remove("item-selected");
      //   } else {
      //     selectedTypes.push(type);
      //     el.classList.add("item-selected");
      //   }

      //   if (selectedTypes.length === 0 && allBtn) {
      //     allBtn.classList.add("item-selected");
      //   }
      // }

      renderSheets();
    });
  });
}

// --- Category Renderding ---
function renderCategories() {
  const categoryList = document.getElementById("categoryList");
  categoryList.innerHTML = "";

  const header = document.createElement("h3");
  header.className = "item-header";
  header.textContent = "Category";
  categoryList.appendChild(header);

  // const allBtn = document.createElement("div");
  // allBtn.className = "category-item";
  // allBtn.textContent = "All";
  // allBtn.dataset.category = "All";
  // allBtn.classList.add("item-selected");
  // categoryList.appendChild(allBtn);

  allCategories.forEach(cat => {
    const item = document.createElement("div");
    item.className = "category-item";
    item.textContent = cat;
    item.dataset.category = cat;
    categoryList.appendChild(item);
  });

  categoryList.querySelectorAll(".category-item").forEach(el => {
    el.addEventListener("click", () => {
      const cat = el.dataset.category;

      if (cat === "All") {
        selectedCategories = [];
        categoryList.querySelectorAll(".category-item").forEach(btn => btn.classList.remove("item-selected"));
        el.classList.add("item-selected");
      } else {
        el.classList.toggle("item-selected");
        if (selectedCategories.includes(cat)) {
          selectedCategories = selectedCategories.filter(c => c !== cat);
        } else {
          selectedCategories.push(cat);
        }
      }
      // if (cat === "All") {
      //   selectedCategories = [];
      //   categoryList.querySelectorAll(".category-item").forEach(btn => btn.classList.remove("item-selected"));
      //   el.classList.add("item-selected");
      // } else {
      //   const allBtn = categoryList.querySelector('[data-category="All"]');
      //   if (allBtn) allBtn.classList.remove("item-selected");

      //   if (selectedCategories.includes(cat)) {
      //     selectedCategories = selectedCategories.filter(c => c !== cat);
      //     el.classList.remove("item-selected");
      //   } else {
      //     selectedCategories.push(cat);
      //     el.classList.add("item-selected");
      //   }

      //   if (selectedCategories.length === 0 && allBtn) {
      //     allBtn.classList.add("item-selected");
      //   }
      // }

      renderSheets();
    });
  });
}



// --- Sheet Data fetch + Renderding ---
function loadSheetData(sheetName) {
  const detailUrl = `${projectUrl}?sheet=${encodeURIComponent(sheetName)}`;
  const container = document.getElementById('content');
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
          imgDiv.style.backgroundSize = 'cover';
          imgDiv.style.backgroundPosition = 'center';
          imgDiv.style.backgroundRepeat = 'no-repeat';
          imgDiv.style.minHeight = '100vh';

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
    // document.getElementById("list").textContent = "Failed to load.";
  });