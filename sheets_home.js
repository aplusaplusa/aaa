const colors = ["#ff4f4fff", "#fff820ff", "#56a8ffff", "#43ff7bff", "#ff5ce7ff", "#e36d1eff"];

// const initialImages = [
//   "img_projects/09_assembly_for_chinatown/aaa_assembly_02.jpg",
//   "img_projects/21_community_healing_space/aaa_communityhealingspace_01.jpg",
//   "img_projects/21_headspaces/aaa_headspaces_05.jpg",
//   "img_projects/21_release_restore_room/aaa_releaseandrestore_05.jpg",
//   "img_projects/24_rodricks_stand/aaa_rodricksstand_02.jpg",
//   "img_projects/27_grandchamps/aaa_grandchamps_02.jpg",
//   "img_projects/38_abuelita_masala/aaa_abuelitamasala_03.jpg",
//   "img_projects/44_prospect_heights_garden/aaa_prospectheightsgarden_02.jpg",
//   "img_projects/49_afm_newsstand/aaa_afmnewsstand_04.jpg",
//   "img_projects/50_apartment_of_curiosities/aaa_aptofcuriosities_04.jpg",
//   "img_projects/51_les_home_office/aaa_leshomeoffice_01.jpg"
// ];

// const initialImages = [
//   "img_home/construction_1.png",
//   "img_home/construction_2.png",
//   "img_home/construction_4.png"
// ];

// const initialImages = [
//   "img_home/chair_1.jpg",
//   "img_home/chair_2.jpg",
//   "img_home/chair_3.jpg",
//   "img_home/chair_4.jpg"
// ];

const initialImages = [
  "img_projects/38_abuelita_masala/aaa_abuelitamasala_02.jpg",
  "img_projects/50_apartment_of_curiosities/aaa_aptofcuriosities_11.jpg",
  "img_projects/49_afm_newsstand/aaa_afmnewsstand_04.jpg"
];



function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


// Loading Images
const homeDivs = document.querySelectorAll(".col3-home-a");
let shuffledImages = shuffleArray([...initialImages]);

homeDivs.forEach((div, idx) => {
  // Random Color
  const color = colors[Math.floor(Math.random() * colors.length)];
  div.style.backgroundColor = color;

  // Random Images
  const imgUrl = shuffledImages[idx % shuffledImages.length];
  div.style.backgroundImage = `url('${imgUrl}')`;
  div.style.backgroundSize = "cover";
  div.style.backgroundPosition = "center";
  div.style.backgroundRepeat = "no-repeat";

  div.style.minHeight = "100vh";
  div.style.display = "flex";
  div.style.flexDirection = "column";
});




// fetch
fetch(projectUrl)
  .then(res => res.json())
  .then(json => {
    if (!json.sheets || json.sheets.length === 0) return;

    let allImages = [];
    json.sheets.forEach(sheet => {
      if (sheet.homeImages && sheet.homeImages.length > 0) {
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

    if (allImages.length === 0) return;

    allImages = shuffleArray(allImages);

    const homeWrapper = document.querySelector(".home-wrapper");
    if (!homeWrapper) return;
    homeWrapper.innerHTML = "";

    // Create col3-home
    for (let i = 0; i < allImages.length; i += 3) {
      // 남은 이미지가 3개 미만이면 생성하지 않음
      if (i + 2 >= allImages.length) break;

      const col3Home = document.createElement("div");
      col3Home.className = "col3-home";

      for (let j = 0; j < 3; j++) {
        const item = allImages[i + j];

        const colA = document.createElement("div");
        colA.className = "col3-home-a";
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
        img.onload = () => {
          imgDiv.style.backgroundImage = `url('${img.src}')`;
        };

        const caption = document.createElement("div");
        caption.innerHTML = `${item.title}<br>${item.text}`;
        caption.style.position = "absolute";
        caption.style.bottom = "5px";
        caption.style.left = "10px";
        caption.style.color = "white";
        caption.style.fontSize = "16px";
        caption.style.textShadow = "0 0 5px gray";

        figure.appendChild(imgDiv);
        figure.appendChild(caption);
        colA.appendChild(figure);
        col3Home.appendChild(colA);

        // Click Event
        figure.addEventListener("click", () => {
          if (typeof loadSheetData === "function") loadSheetData(item.sheetName);
          const newUrl = window.location.pathname + "?sheet=" + encodeURIComponent(item.sheetName);
          window.history.pushState({ sheet: item.sheetName }, "", newUrl);

          const page1 = document.querySelector(".page1");
          const page2 = document.querySelector(".page2");
          if (page1) page1.style.display = "none";
          if (page2) page2.style.display = "block";

          const categoriesBlock = document.getElementById("categoriesBlock");
          const list = document.getElementById("list");
          const content = document.getElementById("content");
          if (categoriesBlock) categoriesBlock.style.display = "none";
          if (list) list.style.display = "none";
          if (content) content.style.display = "block";
        });
      }

      homeWrapper.appendChild(col3Home);
    }
  })
  .catch(err => console.error("Fetch error:", err));



