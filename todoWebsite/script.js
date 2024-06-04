const checklistContainer = document.getElementById('checklist');

// Obter o conteúdo do README.md
// fetch('https://api.github.com/users/gustavuwe/1high/readme')
fetch('https://api.github.com/repos/gustavuwe/1high/contents/README.md')
  .then((response) => response.json())
  .then((data) => {
    const content = data.content;

    const decodedString = atob(content);

    console.log(decodedString);

    // Extrair a checklist do conteúdo
    extractChecklist(decodedString);
  });

function extractChecklist(decodedString) {
  let isChecked = false;

  let needPadding = false;

  const regex = -[];

  const newStr = decodedString.replace(regex, '');

  console.log(newStr);

  const lines = newStr.split('\n');

  console.log(lines);

  for (let i = 4; i < lines.length - 1; i++) {
    needPadding = false;
    isChecked = false;
    for (let j = 0; j < lines[i].length; j++) {
      if (j == 0 && lines[i][j] == ' ') {
        needPadding = true;
      }
      if (lines[i][j] == '[') {
        if (lines[i][j + 1] == 'x') {
          isChecked = true;
        }
      }
    }
    if (isChecked == true) {
      if (needPadding == true) {
        checklistContainer.innerHTML += `<li style="padding-left: 20px;" checked><input type="checkbox">${lines[i]}</li>`;
      } else {
        checklistContainer.innerHTML += `<li><input type="checkbox" checked> ${lines[i]}</li>`;
      }
    } else {
      if (needPadding == true) {
        checklistContainer.innerHTML += `<li style="padding-left: 20px;"><input type="checkbox">${lines[i]}</li>`;
      } else {
        checklistContainer.innerHTML += `<li><input type="checkbox"> ${lines[i]}</li>`;
      }
    }

    if (needPadding == true) {
    }
    // const checkbox = document.createElement('input')
    // const listItem = document.createElement('li')
    // listItem.appendChild(checkbox)
    // listItem.textContent = lines[i]
  }
}
