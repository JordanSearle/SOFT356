// SOFT356 ASSIGNMENT.cpp : This file contains the 'main' function. Program execution begins and ends there.
//
//Basic includes
#include <iostream>     // std::cout
#include <algorithm>    // std::max
//OpenGL includes
#include "GL/glew.h"
#include "GL/freeglut.h"
#include "GLFW/glfw3.h"
#include "LoadShaders.h"
//Include GLM
#include <glm/ext/matrix_transform.hpp> // GLM: translate, rotate
#include <glm/ext/matrix_clip_space.hpp> // GLM: perspective and ortho 
#include <glm/gtc/type_ptr.hpp> // GLM: access to the value_ptr
//Include model Loader
#include "loadModel.h"
#include <thread>

using namespace std;
//Models and VAOs
loadModel* model = new loadModel();
GLuint vao[6];
vector<loadModel *> floorModels;

GLFWwindow* window;
glm::vec3 cameraPos = glm::vec3(-12.0f, 0.0f, -5.0f);
glm::vec3 cameraFront = glm::vec3(1.0f, 0.005f, 0.0f);
glm::vec3 cameraUp = glm::vec3(0.0f, 1.0f, 0.0f);

float fov = 45.0f;

// timing
float deltaTime = 0.0f;	// time between current frame and last frame
float lastFrame = 0.0f;
float gravity = -9.8f;
float currentframe, vel = 0,pos = 2;
float ford = 0;

bool intersect(loadModel* a, loadModel* b) {
	bool colx = (a->pos1.x <= b->pos1.x && a->pos2.x <= b->pos2.x);
	bool coly = (a->pos5.y <= b->pos1.y);
	bool colz = (a->pos1.z >= b->pos1.z && a->pos4.z <= b->pos4.z);
	return colx && coly && colz;
}
bool intersecty(loadModel* a, loadModel* b) {
	bool coly = (a->pos5.y <= b->pos1.y);
	return coly;
}
bool intersectz(loadModel* a, loadModel* b) {
	bool colz = (a->pos1.z >= b->pos1.z && a->pos4.z <= b->pos4.z);
	return colz;
}
bool intersectx(loadModel* a, loadModel* b) {
	bool colx = (a->pos1.x <= b->pos1.x && a->pos2.x <= b->pos2.x);
	return colx;
}
void processInput(GLFWwindow* window)
{
		float cameraSpeed = 0.2f; // adjust accordingly
		if (glfwGetKey(window, GLFW_KEY_W) == GLFW_PRESS) {
			cameraPos += cameraSpeed * cameraFront;
		}
		if (glfwGetKey(window, GLFW_KEY_S) == GLFW_PRESS) {
			cameraPos -= cameraSpeed * cameraFront;
		}
		if (glfwGetKey(window, GLFW_KEY_SPACE) == GLFW_PRESS) {
			if (intersect(model, floorModels[0]) || intersect(model, floorModels[1]) || intersect(model, floorModels[2]) || intersect(model, floorModels[3]) || intersect(model, floorModels[4]))
			{
				pos += 1.0;
			}
			
		}
}

void init() {
	glGenVertexArrays(6, vao);
	//LoadFiles

	std::thread thread_obj(&loadModel::loadFile, model, "ball.obj");
	for (size_t i = 1; i < 6; i++)
	{
		loadModel* floor = new loadModel();
		floor->loadFile("floor.obj");
		floor->colour = glm::vec4(1.0, 1.0, 0.8, 1.0);
		floor->VAO = vao[i];
		floor->init();
		floorModels.push_back(floor);
	}

	//Load MTL info etc.

	model->colour = glm::vec4(1.0, 0.5, 0.8, 1.0);
	model->VAO = vao[0];
	thread_obj.join();
	model->init();

	

	//glfwSetCursorPosCallback(window, mouse_callback);
	
}

void moveOBJ() {
	currentframe = glfwGetTime();
	deltaTime = currentframe - lastFrame;
	lastFrame = currentframe;
	//Collision Detection
	
	if (intersect(model, floorModels[0]) || intersect(model, floorModels[1]) || intersect(model, floorModels[2]) || intersect(model, floorModels[3]) || intersect(model, floorModels[4]))
	{
		vel = 0.0;
	}
	else {
		vel += gravity * deltaTime;
	}
	pos += vel * deltaTime;
	if (pos < -5.0)
	{
		cameraPos.x = -12.0;
		pos = 2.0;
	}

	//Camera + projection
	cameraPos.y = pos+ 0.8f;
	cameraPos.z = 0.;
	glm::mat4 projection = glm::mat4(1.0f);
	projection = glm::perspective(45.0f, 4.0f / 3, 0.1f, 100.0f);
	glm::mat4 view = glm::mat4(1.0f);
	view = glm::lookAt(cameraPos, cameraPos + cameraFront, cameraUp);
	//Ball
	glBindVertexArray(model->VAO);
	glUseProgram(model->program);
	glm::mat4 lmodel = glm::mat4(1.0f);	
	lmodel = glm::translate(lmodel, glm::vec3(cameraPos.x +3.0, pos, .0f));
	model->moveModel(lmodel, view, projection);
	//Floor(s)
	
	glBindVertexArray(floorModels[0]->VAO);
	glUseProgram(floorModels[0]->program);
	glm::mat4 models = glm::mat4(1.0f);
	glBindVertexArray(0);
	floorModels[0]->moveModel(models, view, projection);

	for (size_t i = 1; i < 5; i++)
	{
		glBindVertexArray(floorModels[i]->VAO);
		glUseProgram(floorModels[i]->program);
		models = glm::translate(models, glm::vec3(30.0f, 0.0f, 0.0f));
		floorModels[i]->moveModel(models, view, projection);
		glBindVertexArray(0);
	}
	

	
	
		
}
int main()
{	
	glfwInit();
	window = glfwCreateWindow(800, 600, "Triangles", NULL, NULL);
	glfwMakeContextCurrent(window);
	glewInit();
	init();
	glfwSetInputMode(window, GLFW_CURSOR, GLFW_CURSOR_DISABLED);
	//Main render loop
	while (!glfwWindowShouldClose(window))
	{
		processInput(window);

		static const float black[] = { 0.0f, 0.0f, 0.0f, 0.0f };

		glClearBufferfv(GL_COLOR, 0, black);
		glClear(GL_COLOR_BUFFER_BIT);
		// bind textures on corresponding texture units
		glEnable(GL_DEPTH_TEST);
		glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

		moveOBJ();
		
		glUseProgram(model->program);
		model->display();
		glBindVertexArray(0);
		//Floor drawing
		for (size_t i = 0; i < 5; i++)
		{
			glUseProgram(floorModels[i]->program);
			floorModels[i]->display();
			glBindVertexArray(0);
		}
		glfwSwapBuffers(window);
		glfwPollEvents();

	}

	glfwDestroyWindow(window);

	glfwTerminate();
}

