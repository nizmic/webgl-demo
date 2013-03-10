var canvas = null;
var gl = null;
var mouseDown = false;

function init() {
    gl.clearColor(0., 0., 0., 1.);
    gl.clear(gl.COLOR_BUFFER_BIT);
    // todo: init app
    render();
}

function handleMouseDown(event) {
    log("handleMouseDown");
    mouseDown = true;
}

function handleMouseUp(event) {
    log("handleMouseUp");
    mouseDown = false;
}

function handleMouseMove(event) {
    log("handleMouseMove");
}

function handleContextLost(e) {
    log("handleContextLost");
    e.preventDefault();
}

function handleContextRestored() {
    log("handleContextRestored");
    init();
}

function main() {
    log("main: initializing webgl");
    canvas = document.getElementById("c");
    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);
    canvas.onmousedown = handleMouseDown;
    document.onmouseup = handleMouseUp;
    document.onmousemove = handleMouseMove;
    ratio = window.devicePixelRatio ? window.devicePixelRatio : 1;
    canvas.width = 640 * ratio;
    canvas.height = 480 * ratio;
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl)
	return;

    // todo: set up any vertex arrays

    init();
}

function render() {
    // todo: render app
    window.requestAnimFrame(render, canvas);
}

$(document).ready(function() {
    log("DOM ready, calling main()");
    main();
});
