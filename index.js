// =============================================================================
// Menu: btns
// =============================================================================

$('[class^=page]').hide(); 
$('.page1').show();
$('.menu-btn#page1').addClass('menu-selected');

$(".menu-btn").click(function (e) {
    e.preventDefault();

    $('[class^=page]').hide();
    $('.' + this.id).show();

    $(".menu-btn").removeClass("menu-selected");

    $(this).addClass("menu-selected");
});


// =============================================================================
// Menu: Projects > Thumbnail Page
// =============================================================================
function showThumbnail() {
  const categoriesBlock = document.getElementById("categoriesBlock");
  const list = document.getElementById("list");
  const content = document.getElementById("content");

  if (categoriesBlock) categoriesBlock.style.display = "flex";
  if (list) list.style.display = "flex";
  if (content) content.style.display = "none";
}


// =============================================================================
// Menu: Mobile hamburgerBtn
// =============================================================================
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const menuR = document.getElementById("menu-r");
  const menuButtons = document.querySelectorAll(".menu-btn");

  hamburgerBtn.addEventListener("click", () => {
    menuR.classList.toggle("open");
    hamburgerBtn.classList.toggle("active");

    if (hamburgerBtn.classList.contains("active")) {
      hamburgerBtn.textContent = "close";
    } else {
      hamburgerBtn.textContent = "menu";
    }
  });

  menuButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      menuR.classList.remove("open");     
      hamburgerBtn.classList.remove("active"); 
      hamburgerBtn.textContent = "menu";        
    });
  });
});




// Menu Text Color: White BG ------------------------------------------------
// function updateMenuBlendMode() {
//   const page2 = document.querySelector(".page2");
//   const menuL = document.querySelector(".menu-l");
//   const menuR = document.querySelector("#menu-r");

//   if (!menuL || !menuR || !page2) return;

//   const isPage2Visible =
//     window.getComputedStyle(page2).display === "block";

//   if (isPage2Visible) {
//     menuL.style.mixBlendMode = "difference";
//     menuR.style.mixBlendMode = "difference";
//   } else {
//     menuL.style.mixBlendMode = "";
//     menuR.style.mixBlendMode = "";
//   }
// }

// // 페이지 로드 후 한 번 실행
// document.addEventListener("DOMContentLoaded", () => {
//   updateMenuBlendMode();

//   // page2의 style 변경 자동 감지
//   const page2 = document.querySelector(".page2");
//   if (page2) {
//     const observer = new MutationObserver(updateMenuBlendMode);
//     observer.observe(page2, { attributes: true, attributeFilter: ["style"] });
//   }
// });


// function updateMenuBlendMode() {
//   const page2 = document.querySelector(".page2");
//   const menuL = document.querySelector(".menu-l");
//   const menuR = document.querySelector(".menu-r");

//   if (!menuL || !menuR || !page2) return;

//   const isPage2Visible =
//     window.getComputedStyle(page2).display === "block";

//   if (isPage2Visible) {
//     menuL.style.mixBlendMode = "difference";
//     menuR.style.mixBlendMode = "difference";
//   } else {
//     menuL.style.mixBlendMode = "";
//     menuR.style.mixBlendMode = "";
//   }
// }



// Home: splash ------------------------------------------------
// document.addEventListener('DOMContentLoaded', function () {
//   const scrollArea = document.querySelector('.scrollContents');
//   const splash = document.getElementById('col3-home-splash');
//   const menuL = document.querySelector("#menu-l");
//   const menuR = document.querySelector("#menu-r");
//   if (!scrollArea || !splash) return;

//   scrollArea.addEventListener('scroll', function () {
//     if (scrollArea.scrollTop > 0) {
//       // splash.classList.add('hidden');
//       menuL.style.mixBlendMode = "difference";
//       menuR.style.mixBlendMode = "difference";
//     } else {
//       // splash.classList.remove('hidden');
//       menuL.style.mixBlendMode = "normal";
//       menuR.style.mixBlendMode = "normal";
//     }
//   });
// });

document.addEventListener('DOMContentLoaded', function () { 
  const scrollArea = document.querySelector('.scrollContents'); 
  const splash = document.getElementById('col3-home-splash'); 
  const menuL = document.querySelector("#menu-l"); 
  const menuR = document.querySelector("#menu-r"); 
  if (!scrollArea || !splash) return; 
  
  scrollArea.addEventListener('scroll', function () { 
    if (scrollArea.scrollTop > 0) { 
      splash.classList.add('hidden'); 
      // menuL.style.mixBlendMode = "difference"; 
      // menuR.style.mixBlendMode = "difference"; 
    } else { 
      splash.classList.remove('hidden'); 
      // menuL.style.mixBlendMode = "normal"; 
      // menuR.style.mixBlendMode = "normal"; 
      } 
    }); 
  });




// Home: splash > A fonts ------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  const h1Elements = document.querySelectorAll('.col3-home-logo h1');
  const menuButtons = document.querySelectorAll('.menu-btn');

  const fonts = [
    'History_02',
    'History_04',
    'History_05',
    'History_14',
    'History_15',
    'History_21',
  ];

  function applyRandomFonts() {
    let availableFonts = [...fonts]; 

    h1Elements.forEach(h1 => {
      if (availableFonts.length === 0) {
        availableFonts = [...fonts];
      }

      const randomIndex = Math.floor(Math.random() * availableFonts.length);
      const selectedFont = availableFonts[randomIndex];

      h1.style.fontFamily = selectedFont;
      availableFonts.splice(randomIndex, 1);
    });
  }


  applyRandomFonts();

  menuButtons.forEach(btn => {
    btn.addEventListener('click', applyRandomFonts);
  });
});






document.addEventListener('DOMContentLoaded', function () {
  const scrollArea = document.querySelector('.scrollContents');
  const col1 = document.querySelector('.col1-home');

  const images = [
    'img_footer/construction_1.png',
    'img_footer/construction_3.png',
    'img_footer/construction_5.png',
    'img_footer/construction_7.png'
  ];

  if (!scrollArea || !col1) return;

  let atBottom = false;
  let lastIndex = null;

  scrollArea.addEventListener('scroll', function () {
    const scrollTop = scrollArea.scrollTop;
    const scrollHeight = scrollArea.scrollHeight;
    const clientHeight = scrollArea.clientHeight;

    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 800;

    if (isAtBottom && !atBottom) {
      let randomIndex;

   
      do {
        randomIndex = Math.floor(Math.random() * images.length);
      } while (randomIndex === lastIndex && images.length > 1);

      lastIndex = randomIndex; 

      const randomImg = images[randomIndex];
      col1.style.backgroundImage = `url(${randomImg})`;
      col1.style.backgroundSize = "contain";
      col1.style.backgroundPosition = "center";

      atBottom = true;
    } 
    else if (!isAtBottom && atBottom) {
      atBottom = false;
    }
  });
});


