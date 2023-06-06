  'use strict';

  let gl;

   let finalProgram; 
  
  var myCube = null;
 
  let swampTexture; 
  
  let curTexture = "swamp";
  let curShape = "cube"; 
  
  let test_val = true;
  var num_times_done = 0;  
  
  
  var anglesReset = [0.0, 0.0, 0.0];
  var cube_angles = [0.0, 0, 0];
  var angles = cube_angles;
  var angleInc = 5.0;
 
 
function createShapes() {
    gl.useProgram(finalProgram);
     
    myCube = new Cube (20);
    myCube.VAO = bindVAO (myCube, finalProgram);
    
}


function initCamera(program) {
    
    gl.useProgram (program);
    
    let projMatrix = glMatrix.mat4.create();
    glMatrix.mat4.perspective(projMatrix, glMatrix.glMatrix.toRadian(45), 1, 0.1, 100); 
    gl.uniformMatrix4fv (program.uProjT, false, projMatrix);
     
    let viewMatrix = glMatrix.mat4.create();
    glMatrix.mat4.lookAt(viewMatrix, [0, 0.5, -5], [0, 0, 0], [0, 1, 0]);
    gl.uniformMatrix4fv (program.uViewT, false, viewMatrix);

}


function doLoad(theTexture, theImage) {
    gl.bindTexture(gl.TEXTURE_2D, theTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, theImage);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, null);
    
    draw();
}


function setUpTextures(){
    
    swampTexture = gl.createTexture();
        
    
    const swampImage = new Image(); 
    swampImage.src = 'swamp.jpg'; 
        
     swampImage.onload = () => { 
     doLoad (swampTexture, swampImage); 
    	
    }
    
}


// Linear interpolation between floats a0 and a1 	
function interpolate(a0, a1, w){
	return (1.0 - w) * a0 + w * a1;  
}  


// Pseudorandom direction vector 
function randomGradient(ix, iy) {
	let random = Math.sin(ix * 12.9898 + iy * 78.233) * 43758.5453; 
	return [Math.cos(random), Math.sin(random)];  
}


// Compute the dot product of the distance and gradient vectors. 
function dotGridGradient(ix, iy, x, y){
	let gradient = randomGradient(ix, iy); 
	let dx = x - ix; 
	let dy = y - iy; 
	return (dx * gradient[0] + dy * gradient[1]); 
}

// Perlin noise at (x, y) 
function perlin(x, y){
	let x0 = Math.floor(x); 
	let x1 = x0 + 1; 
	let y0 = Math.floor(y); 
	let y1 = y0 + 1; 
	
	
	let dot00 = dotGridGradient(x0,y0,x,y); 
	let dot01 = dotGridGradient(x0,y1,x,y); 
	let dot10 = dotGridGradient(x1,y0,x,y); 
	let dot11 = dotGridGradient(x1,y1,x,y); 
	
	let wx = x - x0; 
	let wy = y - y0; 
	
	let ix0 = interpolate(dot00, dot10, wx); 
	let ix1 = interpolate(dot01, dot11, wx); 
	
	return interpolate(ix0, ix1, wy); 
} 

    function drawShapes() {
          
        var theShape = myCube; 

        var program = finalProgram;
        gl.useProgram (program);
       
        
        
        
        gl.activeTexture (gl.TEXTURE0);
        gl.bindTexture (gl.TEXTURE_2D, swampTexture);       
        gl.uniform1i (program.uTheTexture, 0);
        gl.uniform3fv (program.uTheta, new Float32Array(angles));
        
	var size = 0; 
	for(let i = 0.5; i < 500; i++){
    		for(let j = 0.5; j < 15; j++){
    			size++; 
    		}
    	}
    			
	
        for(let i = 0.5; i < 500; i++){
    		for(let j = 0.5; j < 15; j++){
    			let y = 1*perlin(i+size*num_times_done, j+size*num_times_done) - 1; 
    			let modelMatrix = glMatrix.mat4.create(); 
    			glMatrix.mat4.translate(modelMatrix, modelMatrix, [i, y, j]); 
    			gl.uniformMatrix4fv (program.uModelT, false, modelMatrix); 
    			gl.bindVertexArray(theShape.VAO);
    			gl.drawElements(gl.TRIANGLES, theShape.indices.length, gl.UNSIGNED_SHORT, 0);
    		
    		
    			y = 1*perlin(-1 * i+size*num_times_done, -1*j+size*num_times_done) - 1; 
    			modelMatrix = glMatrix.mat4.create(); 
    			glMatrix.mat4.translate(modelMatrix, modelMatrix, [-1*i, y, -1*j]); 
    			gl.uniformMatrix4fv (program.uModelT, false, modelMatrix); 
    			gl.bindVertexArray(theShape.VAO);
    			gl.drawElements(gl.TRIANGLES, theShape.indices.length, gl.UNSIGNED_SHORT, 0);
    		
    			y = 1*perlin(-1 * i + size*num_times_done, j+size*num_times_done) - 1; 
    			modelMatrix = glMatrix.mat4.create(); 
    			glMatrix.mat4.translate(modelMatrix, modelMatrix, [-1*i, y, j]); 
    			gl.uniformMatrix4fv (program.uModelT, false, modelMatrix); 
    			gl.bindVertexArray(theShape.VAO);
    			gl.drawElements(gl.TRIANGLES, theShape.indices.length, gl.UNSIGNED_SHORT, 0);
    		
    		
    			y = 1*perlin(i+size*num_times_done, -1*j+size*num_times_done) - 1;  
    			modelMatrix = glMatrix.mat4.create(); 
    			glMatrix.mat4.translate(modelMatrix, modelMatrix, [i, y, -1*j]); 
    			gl.uniformMatrix4fv (program.uModelT, false, modelMatrix); 
    			gl.bindVertexArray(theShape.VAO);
    			gl.drawElements(gl.TRIANGLES, theShape.indices.length, gl.UNSIGNED_SHORT, 0);
    		 
		}
	}   
    
    
           
    }


  function initPrograms() {
  	finalProgram = initProgram('wireframe-V', 'wireframe-F'); 
  	gl.useProgram(finalProgram);
  	
  	finalProgram.aVertexPosition = gl.getAttribLocation(finalProgram, 'aVertexPosition');
  	finalProgram.aUV = gl.getAttribLocation(finalProgram, 'aUV');
  	
  	finalProgram.uTheTexture = gl.getUniformLocation (finalProgram, 'theTexture');
  	finalProgram.uProjT = gl.getUniformLocation (finalProgram, 'projT');
  	finalProgram.uViewT = gl.getUniformLocation (finalProgram, 'viewT');
  	finalProgram.uModelT = gl.getUniformLocation (finalProgram, 'modelT');
  	finalProgram.uTheta = gl.getUniformLocation (finalProgram, 'theta'); 	
  }


  function bindVAO (shape, program) {
      gl.useProgram(program); 
      let theVAO = gl.createVertexArray();
      gl.bindVertexArray(theVAO);
      
      let myVertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, myVertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.points), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(program.aVertexPosition);
      gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
      
      let uvBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.uv), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(program.aUV);
      gl.vertexAttribPointer(program.aUV, 2, gl.FLOAT, false, 0, 0);

      
      let myIndexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, myIndexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(shape.indices), gl.STATIC_DRAW);

      gl.bindVertexArray(null);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      
      return theVAO;
  }


function getShader(id) {
  const script = document.getElementById(id);
  const shaderString = script.text.trim();

  let shader;
  if (script.type === 'x-shader/x-vertex') {
    shader = gl.createShader(gl.VERTEX_SHADER);
  }
  else if (script.type === 'x-shader/x-fragment') {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  }
  else {
    return null;
  }

  gl.shaderSource(shader, shaderString);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}


  function initProgram(vertex_id, fragment_id) {
    const vertexShader = getShader(vertex_id);
    const fragmentShader = getShader(fragment_id);

    let program = gl.createProgram();
      
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Failed to initialize shaders');
      return null;
    }
      
    return program;
  }


  function draw() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      
    drawShapes();

    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }

  function init() {
      
    const canvas = document.getElementById('webgl-canvas');
 
    if (!canvas) {
      console.error(`Canvas not found`);
      return null;
    }

    window.addEventListener('keydown', gotKey ,false);

    gl = canvas.getContext('webgl2');
    if (!gl) {
        console.error(`Context not found`);
        return null;
      }
      
    window.addEventListener('keydown', gotKey ,false);
      
    gl.clearColor(1, 1, 1, 1);
      
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CCW);
    gl.clearColor(1.0,1.0,1.0,1.0)
    gl.depthFunc(gl.LEQUAL)
    gl.clearDepth(1.0)
    gl.pixelStorei (gl.UNPACK_FLIP_Y_WEBGL, true);
    
    window.addEventListener('keydown', gotKey ,false);

    initPrograms();
    
    createShapes();
    
    initCamera(finalProgram); 
    
    setUpTextures();
    
    draw();
  }
