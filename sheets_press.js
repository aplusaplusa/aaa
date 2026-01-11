let lastBgIndex = null;

fetch(pressUrl)
  .then(res => res.json())
  .then(data => {
    if (!data) return;

    renderSheet(data.Press, "sheetPress");
    renderSheet(data.Recognition, "sheetRecognition");

    const bgItems = [
      ...(data.Press || []),
      ...(data.Recognition || [])
    ].filter(row => row.image && row.image.trim() !== ""); 

    if (bgItems.length > 0) {
      startBgLoop(bgItems);
    }
  })
  .catch(err => console.error(err));



// ----------------------
// bg image
// ----------------------
function startBgLoop(items) {
  const bgTarget = document.querySelector(".bg-press");
  if (!bgTarget) return;

  let wrapperLink = document.createElement("a");
  wrapperLink.href = "#"; //initial
  wrapperLink.target = "_blank";
  wrapperLink.rel = "noopener noreferrer";

  bgTarget.parentNode.insertBefore(wrapperLink, bgTarget);
  wrapperLink.appendChild(bgTarget);

  setRandomBg(bgTarget, wrapperLink, items);

  setInterval(() => {
    setRandomBg(bgTarget, wrapperLink, items);
  }, 4000);
}

function setRandomBg(target, wrapperLink, items) {
  if (!items || items.length === 0) return;

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * items.length);
  } while (randomIndex === lastBgIndex && items.length > 1);

  lastBgIndex = randomIndex;

  const item = items[randomIndex];

  target.style.backgroundImage = `url(${item.image})`;

  // ----------------------
  // wrapperLink href
  // ----------------------
  if (item.link && item.link.trim() !== "") {
    wrapperLink.href = item.link;
  } else {
    wrapperLink.href = "#"; 
  }
}




// ----------------------
// renderSheet / makeLink
// ----------------------
function renderSheet(rows, targetId) {
  if (!rows || rows.length === 0) return;

  const grid = document.getElementById(targetId);
  if (!grid) return;

  rows.forEach(row => {
    const item = document.createElement("div");
    item.className = "press-item";

    // col12 (text1 + text2 wrapper)
    const col12 = document.createElement("div");
    col12.className = "press-col-title";

    // text1
    const col1 = document.createElement("div");
    col1.className = "press-col-1";
    col1.appendChild(makeLink(row.text1, row.link));

    // text2
    const col2 = document.createElement("div");
    col2.className = "press-col-2";
    col2.appendChild(makeLink(row.text2, row.link));

    col12.appendChild(col1);
    col12.appendChild(col2);
    // // text1
    // const col1 = document.createElement("div");
    // col1.className = "press-col press-col-1";
    // col1.appendChild(makeLink(row.text1, row.link));

    // // text2
    // const col2 = document.createElement("div");
    // col2.className = "press-col press-col-2";
    // col2.appendChild(makeLink(row.text2, row.link));

    // text3
    const col3 = document.createElement("div");
    col3.className = "press-col press-col-3";
    col3.appendChild(makeLink(row.text3, row.link));

    // item.appendChild(col1);
    // item.appendChild(col2);
    item.appendChild(col12);
    item.appendChild(col3);

    grid.appendChild(item);
  });
}

function makeLink(text, link) {
  if (link) {
    const a = document.createElement("a");
    a.href = link;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = text || "";
    return a;
  }
  return document.createTextNode(text || "");
}

