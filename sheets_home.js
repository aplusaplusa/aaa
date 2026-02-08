const colors = ["#ff4f4fff", "#fff820ff", "#56a8ffff", "#43ff7bff", "#ff5ce7ff", "#e36d1eff"];

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
const homeDivs = document.querySelectorAll(".col3-home-item");
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
