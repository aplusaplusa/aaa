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

  if (categoriesBlock) categoriesBlock.style.display = "grid";
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

  const scrollAreas = document.querySelectorAll('.scrollContents');
  if (scrollAreas.length === 0) return;

  const footerConfigs = [
    {
      selector: '.footer-home',
      images: [
        'img_footer/construction_1.png',
        'img_footer/construction_3.png',
        'img_footer/construction_5.png',
        'img_footer/construction_7.png'
      ]
    },
    {
      selector: '.footer-projects',
      images: [
        'img_footer/construction_1.png',
        'img_footer/construction_3.png',
        'img_footer/construction_5.png',
        'img_footer/construction_7.png'
      ]
    },
    {
      selector: '.footer-about',
      images: [
        'img_footer/construction_1.png',
        'img_footer/construction_3.png',
        'img_footer/construction_5.png',
        'img_footer/construction_7.png'
      ]
    },
    {
      selector: '.footer-press',
      images: [
        'img_footer/construction_1.png',
        'img_footer/construction_3.png',
        'img_footer/construction_5.png',
        'img_footer/construction_7.png'
      ]
    },
    {
      selector: '.footer-contact',
      images: [
        'img_footer/construction_1.png',
        'img_footer/construction_3.png',
        'img_footer/construction_5.png',
        'img_footer/construction_7.png'
      ]
    }
  ];

  scrollAreas.forEach(scrollArea => {


    const footers = footerConfigs
      .map(cfg => {
        const el = scrollArea.querySelector(cfg.selector);
        if (!el) return null;

        return {
          el,
          images: cfg.images,
          lastIndex: null
        };
      })
      .filter(Boolean);

    if (footers.length === 0) return;

    let atBottom = false;

    scrollArea.addEventListener('scroll', function () {
      const scrollTop = scrollArea.scrollTop;
      const scrollHeight = scrollArea.scrollHeight;
      const clientHeight = scrollArea.clientHeight;

      const isAtBottom =
        scrollTop + clientHeight >= scrollHeight - 800;

      if (isAtBottom && !atBottom) {
        footers.forEach(footer => {
          let randomIndex;

          do {
            randomIndex = Math.floor(
              Math.random() * footer.images.length
            );
          } while (
            randomIndex === footer.lastIndex &&
            footer.images.length > 1
          );

          footer.lastIndex = randomIndex;

          const randomImg = footer.images[randomIndex];
          footer.el.style.backgroundImage = `url(${randomImg})`;
          footer.el.style.backgroundSize = "contain";
          footer.el.style.backgroundPosition = "center";
        });

        atBottom = true;
      } 
      else if (!isAtBottom && atBottom) {
        atBottom = false;
      }
    });
  });
});




