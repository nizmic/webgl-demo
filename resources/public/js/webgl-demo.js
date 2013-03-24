var canvas = null;
var gl = null;
var mouseDown = false;
var triangleVerticesObj;
var program;

var vertexShaderSource = [
    "attribute vec2 vPosition;",
    "void main() {",
    "  gl_Position = vec4(vPosition, 0.0, 1.0);",
    "}"
].join("\n");

var fragmentShaderSource = [
    "void main() {",
    "  gl_FragColor = vec4(1,1,1,1);",
    "}"
].join("\n");

var triangleVertices = new Float32Array(
    [ 0.0, 0.5,
      0.5, -0.5,
      -0.5, -0.5 ]
);

function init() {
    gl.clearColor(0., 0., 0., 1.);
    gl.clear(gl.COLOR_BUFFER_BIT);

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

    // Set up vertex array for triangle vertices
    // Copies the vertex data into the graphics hardware
    triangleVerticesObj = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVerticesObj);
    gl.bufferData(gl.ARRAY_BUFFER, triangleVertices, gl.STATIC_DRAW);

    // Load shaders
    program = gl.createProgram();
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
	var infoLog = gl.getShaderInfoLog(vertexShader);
	log("Error compiling vertex shader:" + infoLog);
    }

    gl.attachShader(program, vertexShader);
    gl.deleteShader(vertexShader);

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
	var infoLog = gl.getShaderInfoLog(fragmentShader);
	log("Error compiling fragment shader:" + infoLog);
    }

    gl.attachShader(program, fragmentShader);
    gl.deleteShader(fragmentShader);

    gl.linkProgram(program);
    gl.useProgram(program);

    // Tell WebGL to use the vertex data we loaded to the graphics
    // hardware above should be fed to the vertex shader as the 
    // parameter "vPosition"
    var positionLoc = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(positionLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVerticesObj);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    init();
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, 3);

    window.requestAnimFrame(render, canvas);
}

$(document).ready(function() {
    log("DOM ready, calling main()");
    main();
});
