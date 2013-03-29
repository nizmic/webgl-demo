var canvas = null;
var gl = null;
var mouseDown = false;
var triangleVerticesObj;
var program;
var mvMatrix;
var mvpMatrix;
var perspectiveMatrix;
var positionVector;

var vertexShaderSource = [
    "uniform mat4 mvpMatrix;",
    "attribute vec2 vPosition;",
    "void main() {",
    "  gl_Position = mvpMatrix * vec4(vPosition, 0.0, 1.0);",
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
    // Set viewport and projection matrix for the scene
    // Uncommenting this next line makes the triangle show up in the lower left corner
    //gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);
    perspectiveMatrix = new J3DIMatrix4();
    // Commenting these out made the triangle actually show
    //perspectiveMatrix.lookat(0, 0, 7, 0, 0, 0, 0, 1, 0);
    //perspectiveMatrix.perspective(30, canvas.clientWidth / canvas.clientHeight, 1, 10000);

    gl.clearColor(0., 0., 0., 1.);
    gl.clear(gl.COLOR_BUFFER_BIT);

    positionVector = new J3DIVector3(0.0, 0.0, 0.0);

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

function handleKeyDown(event) {
    log("handleKeyDown: " + event.keyIdentifier);
    switch (event.keyIdentifier)
    {
    case "Up":
	positionVector[1] += 0.05;
	break;
    case "Down":
	positionVector[1] -= 0.05;
	break;
    case "Left":
	positionVector[0] -= 0.05;
	break;
    case "Right":
	positionVector[0] += 0.05;
	break;
    default:
    }
}

//function handleKeyPress(event) {
//    log("handleKeyPress: " + event);
//}

function handleKeyUp(event) {
    log("handleKeyUp: " + event.keyIdentifier);
}

function main() {
    log("main: initializing webgl");
    canvas = document.getElementById("c");
    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);
    canvas.onmousedown = handleMouseDown;
    document.onmouseup = handleMouseUp;
    document.onmousemove = handleMouseMove;
    document.onkeydown = handleKeyDown;
    //document.onkeypress = handleKeyPress;
    document.onkeyup = handleKeyUp;
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

    // Create some matrices to use later and save locations in shaders
    mvMatrix = new J3DIMatrix4();
    mvpMatrix = new J3DIMatrix4();
    mvpMatrixLoc = gl.getUniformLocation(program, "mvpMatrix");

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

    // Make a model/view matrix.
    mvMatrix.makeIdentity();
    //mvMatrix.rotate(20, 1, 0, 0);

    // J3DIMath.js seems to indicate (in the header comments) that I could simply
    // pass in the vector itself as a single arg, but that does not seem to work.
    mvMatrix.translate(positionVector[0], positionVector[1], positionVector[2]);
 
    // Construct the model-view * projection matrix and pass it in
    mvpMatrix.load(perspectiveMatrix);
    mvpMatrix.multiply(mvMatrix);
    mvpMatrix.setUniform(gl, mvpMatrixLoc, false);

    gl.drawArrays(gl.TRIANGLES, 0, 3);

    window.requestAnimFrame(render, canvas);
}

$(document).ready(function() {
    log("DOM ready, calling main()");
    main();
});
