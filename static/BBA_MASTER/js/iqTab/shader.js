class Shader{

    uniformMap = new Map();

    constructor(name, vertexShaderSource, fragmentShaderSource) {
        this.name = name;
        this.program = this.#createProgram(vertexShaderSource, fragmentShaderSource);
    }

    #createProgram(vertexShaderSource, fragmentShaderSource) {
        const vertexShader = this.#createShader(gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = this.#createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        let ok = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (ok === false) {
            console.error(`GL program: ${this.name} info-log: ${gl.getProgramInfoLog(program)}`);
            console.error(`GL Vertex info-log: ${gl.getShaderInfoLog(vertexShader)}`);
            console.error(`GL Fragment info-log: ${gl.getShaderInfoLog(fragmentShader)}`);
            logError('WebGL', `Can't compile shader program ${this.name}. Check console logs for additional info`);
            return null;
        }

        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);

        return program;
    }

    #createShader(type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        let ok = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (ok === false) {
            console.error(`GL ${type} info-log: ${gl.getShaderInfoLog(shader)}`);
            logError('WebGL', `Can't compile shader. Check console logs for additional info`);
            return null;
        }
        return shader;
    }

    bind() {
        gl.useProgram(this.program);
    }
    unbind(){
        gl.useProgram(null);
    }
    #getUniformLocation(name){
        let location = this.uniformMap.get(name);
        if(location === undefined){
            location = gl.getUniformLocation(this.program, name);
            this.uniformMap.set(name, location);
        }
        return location;
    }

    uniform1i(name, value) {
        const location = this.#getUniformLocation(name);
        gl.uniform1i(location, value);
    }

    uniform1f(name, value) {
        const location = this.#getUniformLocation(name);
        gl.uniform1f(location, value);
    }
    uniform2f(name, value1, value2) {
        const location = this.#getUniformLocation(name);
        gl.uniform2f(location, value1, value2);
    }
}