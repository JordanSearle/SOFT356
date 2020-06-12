//////////////////////////////////////////////////////////////////////////////
//
//  --- loadModel.h ---
//
//////////////////////////////////////////////////////////////////////////////

#ifndef LOAD_MODEL_H



#define LOAD_MODEL_H

#include "loadModel.h"
#include <string>
#include <vector>

//OpenGL Includes
#include "GL/glew.h"
#include "GL/freeglut.h"
#include "GLFW/glfw3.h"
#include "LoadShaders.h"

 //includes GLM
#include <glm/ext/matrix_transform.hpp> // GLM: translate, rotate
#include <glm/ext/matrix_clip_space.hpp> // GLM: perspective and ortho 
#include <glm/gtc/type_ptr.hpp> // GLM: access to the value_ptr

//File includes
#include<fstream>
#include <iostream>
#include <sstream>
#include <cstddef>   
#include <filesystem>

class loadModel
{
	private:
		std::vector<glm::vec3> vertices;		
	public:
		enum VAO_IDs { VBO, NumVAOs = 1 };
		enum Buffer_IDs {NumBuffers = 1 };
		enum Attrib_IDs { vPos = 0};
		GLuint  VAOs[NumVAOs];
		GLuint  Buffers[NumBuffers];
		GLuint program;
		//Test Variables
		glm::vec4 colour;
		GLuint VAO;
		GLuint Tri;
		GLfloat
			min_x, max_x,
			min_y, max_y,
			min_z, max_z;
		glm::vec3 pos1, pos2, pos3, pos4, pos5, pos6, pos7, pos8;

		loadModel();
		std::vector<glm::vec3> getVertices() { return vertices; }
		void setVertices(std::vector<glm::vec3> vertices);
		void setFile_Path(std::string filePath);

		void loadFile(std::string path);
		void moveModel(glm::mat4 model, glm::mat4 view, glm::mat4 projection);
		void display();
		void init();
};

#endif