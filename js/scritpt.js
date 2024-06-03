//globa variables

const canvas = document.querySelector("canvas");
toolbtns = document.querySelectorAll(".tool");
fillColor = document.querySelector("#fill-color");
sizeSlider = document.querySelector("#size-slider");
colorBtns = document.querySelectorAll(".options .option");
colorPiker = document.querySelector("#color-picker");
clearCanva = document.querySelector(".clear-canvas");
saveImage = document.querySelector(".save-img");
//variable with default value
let ctx = canvas.getContext("2d"),
  isDrawing = false,
  brush = 5,
  selectedTool = "brush",
  prevMouseX,
  prevMouseY,
  snapShot,
  selectedColor = "#000";
//

const backGround = () => {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = selectedColor;
};

///set canvas width and height
window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  backGround();
});
//draw rectangle
const drawRec = (e) => {
  console.log(fillColor.checked);
  fillColor.checked
    ? ctx.fillRect(
        e.offsetX,
        e.offsetY,
        prevMouseX - e.offsetX,
        prevMouseY - e.offsetY
      )
    : ctx.strokeRect(
        e.offsetX,
        e.offsetY,
        prevMouseX - e.offsetX,
        prevMouseY - e.offsetY
      );
};
//draw traingle
const drawTraingle = (e) => {
  ctx.beginPath();
  ctx.moveTo(prevMouseX, prevMouseY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
  ctx.closePath();
  fillColor.checked ? ctx.fill() : ctx.stroke();
};
//circle
const drawCircle = (e) => {
  ctx.beginPath();
  const radius =
    Math.sqrt(Math.pow(prevMouseX - e.offsetX, 2)) +
    Math.pow(prevMouseY - e.offsetY, 2);
  ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
  fillColor.checked ? ctx.fill() : ctx.stroke();
};
//drawing
const drawing = (e) => {
  if (!isDrawing) return;
  ctx.putImageData(snapShot, 0, 0);

  if (selectedTool == "brush" || selectedTool == "eraiser") {
    ctx.strokeStyle = selectedTool === "eraiser" ? "#fff" : selectedColor;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }
  switch (selectedTool) {
    case "brush":
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      break;
    case "rectangle":
      drawRec(e);
      break;
    case "circle":
      drawCircle(e);
      break;
    case "traingle":
      drawTraingle(e);
      break;
    case "eraiser":
      ctx.strokeStyle = "#fff";
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      break;
    default:
      break;
  }
};
const startDr = (e) => {
  isDrawing = true;
  prevMouseX = e.offsetX;
  prevMouseY = e.offsetY;
  ctx.beginPath();
  ctx.lineWidth = brush;
  ctx.strokeStyle = selectedColor;
  ctx.fillStyle = selectedColor;
  snapShot = ctx.getImageData(0, 0, canvas.width, canvas.height);
  // console.log(snapShot);
};

// ser colro
colorPiker.addEventListener("change", () => {
  colorPiker.parentElement.style.background = colorPiker.value;
  colorPiker.parentElement.click();
});
// change brush width

sizeSlider.addEventListener("change", () => {
  brush = sizeSlider.value;
});

//chage colors
colorBtns.forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelector(" .selected").classList.remove("selected");
    item.classList.add("selected");
    const bgColor = window
      .getComputedStyle(item)
      .getPropertyValue("background-color");
    selectedColor = bgColor;
    console.log(selectedColor);
  });
});

//tools btn
toolbtns.forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelector(".options .active").classList.remove("active");
    item.classList.add("active");
    selectedTool = item.id;
    // console.log(selectedTool);
  });
});

const stopDr = () => {
  isDrawing = false;
};

clearCanva.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  backGround();
});

saveImage.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = `paint  1${Date.now()}`;
  link.href = canvas.toDataURL();
  link.click();
});

canvas.addEventListener("mousedown", startDr);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", stopDr);
