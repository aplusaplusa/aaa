const contactImages = [
  "img_contact/construction_2.png",
  "img_contact/construction_4.png",
  "img_contact/construction_6.png",
  "img_contact/construction_8.png"
];

let lastContactIndex = -1;
const contactEl = document.querySelector(".bg-contact");


function getRandomContactIndex() {
  if (contactImages.length <= 1) return 0;
  let idx = Math.floor(Math.random() * contactImages.length);
  while (idx === lastContactIndex) {
    idx = Math.floor(Math.random() * contactImages.length);
  }
  return idx;
}


function updateContactBackground() {
  if (!contactEl) return;
  const idx = getRandomContactIndex();
  lastContactIndex = idx;
  const imageUrl = contactImages[idx];

  contactEl.style.backgroundImage = `url('${imageUrl}')`;
}

updateContactBackground();
setInterval(updateContactBackground, 6000);
