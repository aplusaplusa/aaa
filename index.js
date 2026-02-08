// Home: splash ------------------------------------------------
document.addEventListener('DOMContentLoaded', function () { 
  const scrollArea = document.querySelector('.scrollContents'); 
  const splash = document.getElementById('col3-home-splash'); 
  if (!scrollArea || !splash) return; 
  
  scrollArea.addEventListener('scroll', function () { 
    if (scrollArea.scrollTop > 0) { 
      splash.classList.add('hidden'); 
      } else { 
      splash.classList.remove('hidden'); 
      } 
    }); 
  });



// Home: splash > A fonts ------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  const h1Elements = document.querySelectorAll('.splash-logo');
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




// Home: random footer bg ------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {

  const scrollAreas = document.querySelectorAll('.scrollContents');
  if (scrollAreas.length === 0) return;

  const footerConfigs = [
    {
      selector: '.footer-home-bg',
      images: [
        'img_footer/footer_animals.png',
        'img_footer/footer_chairs.png',
        'img_footer/footer_laundry.png',
        'img_footer/footer_snacks.png'
      ]
    },
    {
      selector: '.footer-bg',
      images: [
        '../img_footer/footer_animals.png',
        '../img_footer/footer_chairs.png',
        '../img_footer/footer_laundry.png',
        '../img_footer/footer_snacks.png'
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
        scrollTop + clientHeight >= scrollHeight - 500;

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
          footer.el.style.backgroundPosition = "center bottom";
        });

        atBottom = true;
      } 
      else if (!isAtBottom && atBottom) {
        atBottom = false;
      }
    });
  });
});






