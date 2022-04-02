///////////////////////////////////// 
// Author: Malcolm Moseley
// Title: Exercise Base Shaping Func
/*
///////////////////////////////////// 
FOR YOUR TOOLBOX
///////////////////////////////////// 
Grapher: if you have a MacOS computer

GraphToy: once again Iñigo Quilez made
a tool to visualize GLSL functions in WebGL.
https://graphtoy.com/

Shadershop: this amazing tool created by Toby Schachman 
will teach you how to construct complex
functions in an incredible visual and intuitive way.
http://tobyschachman.com/Shadershop/

DO THIS GUYS FUNCTIONS TO PRACTICE
https://thebookofshaders.com/05/kynd.png

Function from Iñigo Quiles
www.iquilezles.org/www/articles/functions/functions.htm
///////////////////////////////////// 
*/

/*
///////////////////////////////////// 
MAKING A FUNCTION
///////////////////////////////////// 
float parabola( float x, float k ){
    return pow( 4.0*x*(1.0-x), k );
}

// then call it in void main() to be our x value

float y = parabola(st.x,1.0);
*/

/*
///////////////////////////////////// 
VISUALIZING FROM -1 to 1
///////////////////////////////////// 
// MM to -1 to 1 graph
    vec2 st = ((gl_FragCoord.xy/u_resolution)-.5)*2.0;
// MM 0 to 1 graph
    vec2 st = gl_FragCoord.xy/u_resolution;
*/



#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float mmKurt_r1 ( float x, float z )
{
    return 1.0 - pow(abs(x), z); // z = 0.5,1,1.5,2,2.5,3,3.5
}
float mmKurt_r2 (float x, float z ) // z = 0.5 to 3
{
    return pow(cos(PI * x / 2.0), z);
}
float mmKurt_r3 (float x, float z ) // z = 0.5 to 3
{
    return 1.0 - pow(abs(sin(PI * x / 2.0)), z);
}
float mmKurt_r4 (float x, float z ) // z = 0.5 to 3
{
    return pow(min(cos(PI * x / 2.0), 1.0 - abs(x)), z);
}
float mmKurt_r5 (float x, float z ) // z = 0.5 to 3
{
    return 1.0 - pow(max(0.0, abs(x) * 2.0 - 1.0), z);
}

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
    //vec2 st = gl_FragCoord.xy/u_resolution;
    // MM to -1 to 1 graph
    vec2 st = ((gl_FragCoord.xy/u_resolution)-.5)*2.0;

    float y = mmKurt_r1(st.x, 0.5);

    vec3 color = vec3(y);

    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
}