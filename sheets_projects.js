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
let allCategories = [];
let selectedCategories = [];

function renderSheets() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  let filtered = allSheets;

  if (selectedCategories.length > 0) {
    filtered = allSheets.filter(sh => {
      const sheetCats = (sh.category || "").split(",").map(s => s.trim());
      return sheetCats.some(c => selectedCategories.includes(c));
    });
  }

  if (filtered.length === 0) {
    list.textContent = ""; // No sheets found
    return;
  }

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
      const list = document.getElementById("list");
      if (categoriesBlock) categoriesBlock.style.display = "none";
      if (list) list.style.display = "none";
      if (content) content.style.display = "block";
    });

    list.appendChild(wrap);
  });
}

function renderCategories() {
  const categoryList = document.getElementById("categoryList");
  categoryList.innerHTML = "";


  const allBtn = document.createElement("div");
  allBtn.className = "category-item";
  allBtn.textContent = "All";
  allBtn.dataset.category = "All";
  allBtn.style.textDecoration = "underline"; 
  categoryList.appendChild(allBtn);

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

        categoryList.querySelectorAll(".category-item").forEach(btn => {
          allBtn.style.textDecoration = "underline";
          btn.style.textDecoration = "none"; 
          btn.style.background = "#fff";    
        });


        el.style.textDecoration = "underline";
      } else {

        const allBtn = categoryList.querySelector('[data-category="All"]');
        if (allBtn) allBtn.style.textDecoration = "none";

        if (selectedCategories.includes(cat)) {
          selectedCategories = selectedCategories.filter(c => c !== cat);
          el.style.textDecoration = "none";
        } else {

          selectedCategories.push(cat);
          el.style.textDecoration = "underline";
        }
        if (selectedCategories.length === 0) {
          allBtn.style.textDecoration = "underline";
        }
      }

      renderSheets();
    });
  });

}

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

const params = new URLSearchParams(window.location.search);
const sheetNameFromUrl = params.get("sheet");
if(sheetNameFromUrl) {
  loadSheetData(sheetNameFromUrl);
}

fetch(projectUrl)
  .then(res => res.json())
  .then(json => {
    allSheets = json.sheets;
    allCategories = json.categories;

    if (allCategories.length > 0) {
      renderCategories();
    }

    renderSheets();
  })
  .catch(err => {
    console.error(err);
    document.getElementById("list").textContent = "Failed to load.";
  });
