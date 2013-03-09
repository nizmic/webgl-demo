var canvas = null;
var gl = null;

function main() {
    log("main: initializing webgl");
    canvas = document.getElementById("c");
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

function init() {
    gl.clearColor(0., 0., 0., 1.);
    gl.clear(gl.COLOR_BUFFER_BIT);
    // todo: init app
    render();
}

function handleContextLost(e) {
    log("handleContextLost");
    e.preventDefault();
}

function handleContextRestored() {
    log("handleContextRestored");
    init();
}

$(document).ready(function() {
    log("DOM ready, calling main()");
    main();
});
