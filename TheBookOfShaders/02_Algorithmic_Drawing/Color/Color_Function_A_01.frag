/*
The following lines show all 
the ways to access the same data:

vec4 vector;
vector[0] = vector.r = vector.x = vector.s;
vector[1] = vector.g = vector.y = vector.t;
vector[2] = vector.b = vector.z = vector.p;
vector[3] = vector.a = vector.w = vector.q;

______________

Another great feature of vector types
in GLSL is that the properties 
can be combined in any order you want,
which makes it easy to cast and mix 
values. This ability is called swizzle.

vec3 yellow, magenta, green;

// Making Yellow
yellow.rg = vec2(1.0);  // Assigning 1. to red and green channels
yellow[2] = 0.0;        // Assigning 0. to blue channel

// Making Magenta
magenta = yellow.rbg;   // Assign the channels with green and blue swapped

// Making Green
green.rgb = yellow.bgb; // Assign the blue channel of Yellow (0) to red and blue channels
_____________________

For your toolbox
You might not be used to picking colors
with numbers - it can be very 
counterintuitive. Lucky for you, 
there are a lot of smart programs 
that make this job easy. Find one that 
fits your needs and then train it to 
deliver colors in vec3 or vec4 format. 
For example, here are the templates I use on
http://www.eigenlogik.com/spectrum/mac

vec3({{rn}},{{gn}},{{bn}})
vec4({{rn}},{{gn}},{{bn}},1.0)

animate the transition using shaping functions.
easing functions
http://easings.net/
https://thebookofshaders.com/edit.php#06/easing.frag

example
float quarticOut(float t) {
  return pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
}

float bounceInOut(float t) {
  return t < 0.5
    ? 0.5 * (1.0 - bounceOut(1.0 - t * 2.0))
    : 0.5 * bounceOut(t * 2.0 - 1.0) + 0.5;
}
*/

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(1.000,0.833,0.224);

float easeOutBounce( float x ){
    const float n1 = 7.5625;
    const float d1 = 2.75;

    if ( x < 1 / d1 ) {
        return n1 * x * x;
    }
    else if ( x < 2 / d1 ) {
        return n1 * ( x -= 1.5 / d1 ) * x + 0.75;
    }
    else if ( x < 2.5 / d1 ) {
        return n1 * ( x -= 2.25 / d1 ) * x + 0.9375;
    }
    else {
        return n1 * ( x -= 2.625 / d1 ) * x + 0.984375;
    }
}

float easeInOutBounce( float x ) {
    return x < 0.5
        ? ( 1 - easeOutBounce(1 - 2 * x)) / 2
        : ( 1 + easeOutBounce(2 * x - 1)) / 2;
}


void main() {
    vec3 color = vec3(0.0);

    float pct = abs(sin(u_time));

    // Mix uses pct (a value from 0-1) to
    // mix the two colors
    color = mix(colorA, colorB, pct);

    gl_FragColor = vec4(color,1.0);
}
