let pressData = [];

fetch(pressUrl)
  .then(res => res.json())
  .then(rows => {
    if (!rows || rows.length === 0) return;

    const grid = document.getElementById("sheetPress");
    if (!grid) return;

    rows.forEach(row => {
      const item = document.createElement("div");
      item.className = "press-item";

      // text1
      const col1 = document.createElement("div");
      col1.className = "press-col press-col-1";
      if (row.link) {
        const a1 = document.createElement("a");
        a1.href = row.link;
        a1.target = "_blank";
        a1.rel = "noopener noreferrer";
        a1.textContent = row.text1 || "";
        col1.appendChild(a1);
      } else {
        col1.textContent = row.text1 || "";
      }

      // text2
      const col2 = document.createElement("div");
      col2.className = "press-col press-col-2";
      if (row.link) {
        const a2 = document.createElement("a");
        a2.href = row.link;
        a2.target = "_blank";
        a2.rel = "noopener noreferrer";
        a2.textContent = row.text2 || "";
        col2.appendChild(a2);
      } else {
        col2.textContent = row.text2 || "";
      }

      // text3
      const col3 = document.createElement("div");
      col3.className = "press-col press-col-3";
      if (row.link) {
        const a3 = document.createElement("a");
        a3.href = row.link;
        a3.target = "_blank";
        a3.rel = "noopener noreferrer";
        a3.textContent = row.text3 || "";
        col3.appendChild(a3);
      } else {
        col3.textContent = row.text3 || "";
      }

      item.appendChild(col1);
      item.appendChild(col2);
      item.appendChild(col3);

      grid.appendChild(item);
    });
  })
  .catch(err => console.error(err));
