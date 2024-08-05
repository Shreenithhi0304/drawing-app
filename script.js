const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;
let isErasing = false; // Add a flag to track erasing mode
let startX;
let startY;

toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    if (e.target.id === 'eraser') {
        isErasing = !isErasing; // Toggle erasing mode
        if (isErasing) {
            e.target.style.backgroundColor = '#d32f2f'; // Change button color when active
        } else {
            e.target.style.backgroundColor = '#f44336'; // Reset button color when inactive
        }
    }
});

toolbar.addEventListener('change', e => {
    if(e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
        isErasing = false; // Stop erasing when color changes
        document.getElementById('eraser').style.backgroundColor = '#f44336'; // Reset eraser button color
    }

    if(e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
});

const draw = (e) => {
    if (!isPainting) {
        return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    if (isErasing) {
        ctx.strokeStyle = '#FFFFFF'; // Set stroke color to white for erasing
    }

    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
}

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
    draw(e);
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);