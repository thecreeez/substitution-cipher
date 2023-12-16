class FrequencyVisualizer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  render(valuesObj, color="black") {
    let values = [];

    for (let letter in valuesObj) {
      values.push({
        letter,
        value: valuesObj[letter]
      });
    };

    values.sort((a,b) => b.value - a.value)

    let fontSize = 15;
    let fontColor = "black"
    let spaceBetweenValues = fontSize * 1.5;
    let leftMargin = 30;
    let bottomMargin = 20;
    let pointSize = 10;
    let pointColor = color;

    this.ctx.font = fontSize+"px arial";

    let maxValue = 0;
    values.forEach((letterObj) => {
      if (maxValue < letterObj.value) {
        maxValue = letterObj.value;
      }
    })

    let yStart = this.canvas.height - fontSize * 2 - bottomMargin;

    this.ctx.fillStyle = "red";
    this.ctx.fillRect(0, yStart, this.canvas.width, 5);
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "middle"

    let drawedNumbers = [];

    let prevX = null;
    let prevY = null;

    this.ctx.beginPath();
    
    values.forEach((letterObj, i) => {
      this.ctx.fillStyle = fontColor;
      this.ctx.fillText(letterObj.letter, leftMargin + i * spaceBetweenValues, this.canvas.height - fontSize - bottomMargin);

      let x = leftMargin + i * spaceBetweenValues;
      let y = yStart - (letterObj.value / maxValue) * (yStart - fontSize);

      if (i == 0) {
        this.ctx.moveTo(x,y);
      } else {
        this.ctx.lineTo(x,y);
      }

      this.ctx.fillStyle = pointColor;
      this.ctx.fillRect(x - pointSize / 2, y - pointSize / 2, pointSize, pointSize);

      if (!drawedNumbers.includes(letterObj.value)) {
        this.ctx.fillStyle = fontColor;
        this.ctx.fillText(letterObj.value, 10, y);
        drawedNumbers.push(letterObj.value);
      }
    })

    this.ctx.strokeStyle = color;
    this.ctx.stroke();
  }

  drawBlocksAndHighlight(strings) {
    let table = document.createElement("table");

    table.className = `table table-bordered table-dark`;

    let cells = [];

    strings.forEach((string, i) => {
      let tr = document.createElement("tr");

      cells.push([]);

      string.split("").forEach((letter, j) => {
        let td = document.createElement("td");
        cells[i].push(td);

        td.innerText = letter;
        td.id = `${i}:${j}`;

        if (i > 0) {

          if (strings[i - 1].charAt(j) == letter) {
            td.style.color = `rgb(0,255,0)`;
            cells[i - 1][j].style.color = `rgb(0,255,0)`;
          } else {
            td.style.color = `rgb(70,0,0)`;
            cells[i - 1][j].style.color = `rgb(70,0,0)`;
          }
          
        } 

        tr.appendChild(td);
      })

      table.appendChild(tr)
    })

    document.body.appendChild(table)
  }
}