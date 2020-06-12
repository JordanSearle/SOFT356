#version 400 core

layout( location = 0 ) in vec3 vPosition;


uniform vec4 colour;
uniform mat4 mvp;

out vec4 fragColour;



void
main()
{
	fragColour = colour;
	gl_Position = mvp * vec4(vPosition,1.0);
}