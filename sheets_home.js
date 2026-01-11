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
        caption.style.bottom = "15px";
        caption.style.left = "20px";
        // caption.style.bottom = "5px";
        // caption.style.left = "10px";
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





// const scriptUrl = "https://script.google.com/macros/s/AKfycbw4ZTV3JepQb9q9vEGOysqZaHpwu6nDdlS11MPOS6-2xdUe6vDa3IWHTkOvLynFJe_E/exec";
// const colors = ["#ff4f4fff", "#fff820ff", "#56a8ffff", "#43ff7bff", "#ff5ce7ff", "#e36d1eff"];

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


// // 배열 섞기
// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }

// // // 1️⃣ fetch 전에 상위 div 배경색 지정 (한 번만)
// // const homeDivs = document.querySelectorAll(".col3-home-a");
// // homeDivs.forEach(div => {
// //   const color = colors[Math.floor(Math.random() * colors.length)];
// //   div.style.backgroundColor = color;
// //   div.style.minHeight = "100vh";
// //   div.style.display = "flex";
// //   div.style.flexDirection = "column";
// // });

// // 1️⃣ fetch 전에 colors + 랜덤 이미지 지정
// const homeDivs = document.querySelectorAll(".col3-home-a");
// let shuffledImages = shuffleArray([...initialImages]); // 원본 보호

// homeDivs.forEach((div, idx) => {
//   // 랜덤 색상
//   const color = colors[Math.floor(Math.random() * colors.length)];
//   div.style.backgroundColor = color;

//   // 랜덤 이미지 (중복 없이)
//   const imgUrl = shuffledImages[idx % shuffledImages.length];
//   div.style.backgroundImage = `url('${imgUrl}')`;
//   div.style.backgroundSize = "cover";
//   div.style.backgroundPosition = "center";
//   div.style.backgroundRepeat = "no-repeat";

//   div.style.minHeight = "100vh";
//   div.style.display = "flex";
//   div.style.flexDirection = "column";
// });

// // 2️⃣ fetch 후 이미지 처리
// fetch(scriptUrl)
//   .then(res => res.json())
//   .then(json => {
//     console.log("✅ Received JSON:", json);

//     if (!json.sheets || json.sheets.length === 0) {
//       console.warn("⚠ No sheets found in JSON");
//       return;
//     }

//     // 모든 시트의 homeImages와 메타데이터 합치기
//     let allImages = [];
//     json.sheets.forEach(sheet => {
//       if (sheet.homeImages && sheet.homeImages.length > 0) {
//         sheet.homeImages.forEach(imgUrl => {
//           allImages.push({
//             url: imgUrl,
//             title: sheet.name,
//             text: sheet.text || "", // B열 2번째 row 이후 텍스트
//             sheetName: sheet.name // ← 여기 추가
//           });
//         });
//       }
//     });

//     if (allImages.length === 0) {
//       console.warn("No images found");
//       return;
//     }

//     // 랜덤 섞기
//     allImages = shuffleArray(allImages);
//     allImages = allImages.slice(0, 6); // Max Images

//     const totalDivs = homeDivs.length; // 3
//     const remainder = allImages.length % totalDivs;
//     if (remainder !== 0) {
//       const needed = totalDivs - remainder;
//       for (let i = 0; i < needed; i++) {
//         allImages.push(allImages[i % allImages.length]);
//       }
//     }

//     const perDiv = allImages.length / totalDivs;

//     // 3️⃣ 각 div에 이미지 div + 오버레이 캡션 생성
//     homeDivs.forEach((div, idx) => {
//       div.innerHTML = ""; // 기존 내용 초기화
//       for (let i = 0; i < perDiv; i++) {
//         const imgIdx = idx * perDiv + i;
//         const item = allImages[imgIdx];

//         const figure = document.createElement("figure");
//         figure.style.position = "relative"; // 오버레이 위해
//         figure.style.minHeight = "100vh";
//         figure.style.margin = "0";

//         const imgDiv = document.createElement("div");
//         imgDiv.style.backgroundSize = "cover";
//         imgDiv.style.backgroundPosition = "center";
//         imgDiv.style.backgroundRepeat = "no-repeat";
//         imgDiv.style.minHeight = "100vh";
//         imgDiv.style.width = "100%";

//         // 이미지 로드 후 적용
//         const img = new Image();
//         img.src = item.url;
//         img.onload = () => {
//           imgDiv.style.backgroundImage = `url('${img.src}')`;
//         };

//         // 오버레이 캡션
//         const caption = document.createElement("div");
//         caption.innerHTML = `${item.title}<br>${item.text}`;
//         caption.style.position = "absolute";
//         caption.style.bottom = "5px";
//         caption.style.left = "10px";
//         caption.style.color = "white";
//         caption.style.fontSize = "16px";
//         caption.style.textShadow = "0 0 5px gray";

//         figure.appendChild(imgDiv);
//         figure.appendChild(caption);
        

//         figure.addEventListener("click", () => {
//           // 시트 데이터 로드
//           loadSheetData(item.sheetName);

//           // URL 쿼리 업데이트
//           const newUrl = window.location.pathname + "?sheet=" + encodeURIComponent(item.sheetName);
//           window.history.pushState({ sheet: item.sheetName }, "", newUrl);

//           // 카테고리 목록과 시트 리스트 숨기기
//           const categoriesBlock = document.getElementById("categoriesBlock");
//           const list = document.getElementById("list");
//           const content = document.getElementById("content");
//           if (categoriesBlock) categoriesBlock.style.display = "none";
//           if (list) list.style.display = "none";
//           if (content) content.style.display = "block";

//           // 페이지 토글
//           const page1 = document.querySelector(".page1");
//           const page2 = document.querySelector(".page2");
//           if (page1) page1.style.display = "none";
//           if (page2) page2.style.display = "block";
//         });



//         div.appendChild(figure);
//       }
//     });

//   })
//   .catch(err => {
//     console.error("Fetch error:", err);
//   });
