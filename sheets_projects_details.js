const params = new URLSearchParams(location.search);
const sheetName = params.get("sheet");

if (!sheetName) {
  document.getElementById('content').textContent = "No sheet selected";
  throw new Error("No sheet selected");
}


const detailUrl = `${projectUrl}?sheet=${encodeURIComponent(sheetName)}`;

fetch(detailUrl)
  .then(res => res.json())
  .then(res => {
    const data = res.data;
    const container = document.getElementById('content');
    container.innerHTML = '';

    let currentRowDiv = null;
    let currentImgContainer = null;

    data.forEach(item => {
      if(item.text) {
        currentRowDiv = document.createElement('div');
        currentRowDiv.className = 'col3-a-bc';
        container.appendChild(currentRowDiv);

        const textDiv = document.createElement('div');
        textDiv.className = 'col3-a';

        const pre = document.createElement('pre');
        pre.textContent = item.text;

        textDiv.appendChild(pre);
        currentRowDiv.appendChild(textDiv);

        currentImgContainer = null;
      }

      if(item.image) {
        if(!currentRowDiv) {
          currentRowDiv = document.createElement('div');
          currentRowDiv.className = 'col3-a-bc';
          container.appendChild(currentRowDiv);
        }

        if(!currentImgContainer) {
          currentImgContainer = document.createElement('div');
          currentImgContainer.className = 'col3-bc';
          currentRowDiv.appendChild(currentImgContainer);
        }

        const imgDiv = document.createElement('div');
        imgDiv.style.backgroundImage = `url('${item.image}')`;
        imgDiv.style.backgroundSize = 'cover';
        imgDiv.style.backgroundPosition = 'center';
        imgDiv.style.backgroundRepeat = 'no-repeat';
        imgDiv.style.minHeight = '100vh';

        currentImgContainer.appendChild(imgDiv);
      }
    });
  })
  .catch(err => {
    console.error(err);
    document.getElementById('content').textContent = 'no data';
  });