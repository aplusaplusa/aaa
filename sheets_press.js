let pressData = [];
let lastIndex = -1;

function getRandomIndex() {
  if (pressData.length <= 1) return 0;
  let idx = Math.floor(Math.random() * pressData.length);
  while (idx === lastIndex) {
    idx = Math.floor(Math.random() * pressData.length);
  }
  return idx;
}
function updatePress() {
  const bg = document.querySelector(".bg-press");
  const year = document.getElementById("press_year");
  const title = document.getElementById("press_title");
  const read = document.getElementById("press_read");

  if (!bg || !title || !year || !read) return;

  if (!pressData || pressData.length === 0) {
    bg.style.backgroundImage = "";
    year.textContent = "";
    title.textContent = "";
    year.onclick = null;  
    title.onclick = null;
    read.onclick = null;
    return;
  }

  const idx = getRandomIndex();
  lastIndex = idx;

  const item = pressData[idx];

  // Landing > bg image
  bg.style.backgroundImage = item.image
    ? `url('${item.image}')`
    : "";

  // Landing > Header > texts
  title.textContent = item.text2 || "";
  year.textContent = item.text1 || "";

  // Landing > Header > links
  const openLink = () => {
    if (item.link) {
      window.open(item.link, "_blank", "noopener,noreferrer");
    }
  };
  year.onclick = openLink; 
  title.onclick = openLink;
  read.onclick = openLink;
}


fetch(pressUrl)
  .then(res => res.json())
  .then(rows => {
    if (!rows || rows.length === 0) return;

    pressData = rows
      .filter(r => r.image && r.image.trim() !== "")
      .map(r => ({
        image: r.image,
        text1: r.text1,
        text2: r.text2,
        link: r.link
      }));

    if (pressData.length > 0) {
      updatePress();
      setInterval(updatePress, 6000); 
    }

 
    const table = document.getElementById("sheetPress");
    if (!table) return;

    rows.forEach(row => {
      const tr = document.createElement("tr");

 
      const td1 = document.createElement("td");
      if (row.link) {
        const a1 = document.createElement("a");
        a1.href = row.link;
        a1.target = "_blank";
        a1.textContent = row.text1 || "";
        td1.appendChild(a1);
      } else {
        td1.textContent = row.text1 || "";
      }


      const td2 = document.createElement("td");
      if (row.link) {
        const a2 = document.createElement("a");
        a2.href = row.link;
        a2.target = "_blank";
        a2.textContent = row.text2 || "";
        td2.appendChild(a2);
      } else {
        td2.textContent = row.text2 || "";
      }

      tr.appendChild(td1);
      tr.appendChild(td2);
      table.appendChild(tr);
    });
  })
  .catch(err => console.error(err));