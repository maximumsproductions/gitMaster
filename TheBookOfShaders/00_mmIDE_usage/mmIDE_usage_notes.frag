// in vscode, (open through gitmaster to get sync)
//
// glslCanvas 
// view -> command pallete (Ctrl+Shift+P) -> type "Show glslCanvas"
// 
// OR glslViewer.exe
// in vscode
// Terminal -> New Terminal (Ctrl+Shift+`)
// navigate (using cd / ls) to file location
// glslViewer.exe "file"


#ifdef GL_ES
precision mediump float;
#endif

void main(){

    gl_FragColor = vec4(1.0, 0.3, 0.3, 1.0);
}