#include "loadModel.h"
#include <regex>


loadModel::loadModel() {
}
//Setters for the variables.
void loadModel::setVertices(std::vector<glm::vec3> iVertices) {
	vertices = iVertices;
}

//Will load the file stated in the filename and load the variables into the vectors.
void loadModel::loadFile(std::string path) {
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//							Loads OBJ Files																						  //
//							Reads the Values into Vectors																		  //
//							Sorts the Values by face values																		  //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	std::vector<glm::vec3> iVertices;
	std::vector <int> vertexIndex;
	std::string line;
	std::ifstream myFile(path);
	std::regex mtlReg("usemtl\\s(.*)");
	int selMtl = 0;
	//Opens File
	if (myFile.is_open()) {
		while (!myFile.eof()) {
			getline(myFile, line);
			std::smatch unit;
			//Reads Vertices into a Vector
			if (line.substr(0, 2) == "v ") //Vertices
			{
				std::istringstream s(line.substr(2));
				glm::vec3 v; s >> v.x; s >> v.y; s >> v.z;
				iVertices.push_back(v);
			}

			//Reads Face Values
			else if (line.substr(0, 2) == "f ") //F Values
			{
				std::istringstream s(line.substr(2));
				//Add to Array
				std::string item;
				//Splits string by spaces
				//Adds each line to a new Vector
				std::vector<std::string> splittedStrings;
				while (getline(s, item, ' '))
				{
					splittedStrings.push_back(item);
				}
				//If the Vector has more than 4 entries...
				if (splittedStrings.size() == 4)
				{
					//Triangulates the string and adds the correct order to t_split
					std::vector<std::string>t_split;
					//Triangle One
					t_split.push_back(splittedStrings[0]);
					t_split.push_back(splittedStrings[1]);
					t_split.push_back(splittedStrings[2]);
					//Triangle Two
					t_split.push_back(splittedStrings[0]);
					t_split.push_back(splittedStrings[2]);
					t_split.push_back(splittedStrings[3]);
					//Then pushes each f value to its correct vector
					for (size_t i = 0; i < t_split.size(); i++)
					{
						//Split string again
						std::string a = t_split[i];
						std::regex fVreg("(\\d+)/(\\d+)/(\\d+)");
						std::smatch unit;
						if (std::regex_search(a, unit, fVreg))
						{
							int x = stoi(unit[1].str()) - 1;
							int y = stoi(unit[2].str()) - 1;
							int z = stoi(unit[3].str()) - 1;
							//MtlStore[selMtl].vertices.push_back(vertex);
							vertices.push_back(iVertices.at(x));

							if (iVertices.at(x).x >= max_x)max_x = iVertices.at(x).x;
							if (iVertices.at(x).y >= max_y)max_y = iVertices.at(x).y;
							if (iVertices.at(x).z >= max_z)max_z = iVertices.at(x).z;
							if (iVertices.at(x).x <= min_x)min_x = iVertices.at(x).x;
							if (iVertices.at(x).y <= min_y)min_y = iVertices.at(x).y;
							if (iVertices.at(x).z <= min_z)min_z = iVertices.at(x).z;


						}
					}
				}
				//Else assume its just 3 values (add if 3 later)
				else if (splittedStrings.size() == 3) {

					for (size_t i = 0; i < splittedStrings.size(); i++)
					{
						//Split string again
						std::string a = splittedStrings[i];
						std::regex fVreg("(\\d+)/(\\d*)/(\\d+)");
						std::smatch unit;
						if (std::regex_search(a, unit, fVreg))
						{
							int x = stoi(unit[1].str()) - 1;
							int y = stoi(unit[2].str()) - 1;
							int z = stoi(unit[3].str()) - 1;
							//MtlStore[selMtl].vertices.push_back(vertex);
							vertices.push_back(iVertices.at(x));

							if (iVertices.at(x).x >= max_x)max_x = iVertices.at(x).x;
							if (iVertices.at(x).y >= max_y)max_y = iVertices.at(x).y;
							if (iVertices.at(x).z >= max_z)max_z = iVertices.at(x).z;
							if (iVertices.at(x).x <= min_x)min_x = iVertices.at(x).x;
							if (iVertices.at(x).y <= min_y)min_y = iVertices.at(x).y;
							if (iVertices.at(x).z <= min_z)min_z = iVertices.at(x).z;
						}

					}
				}
				else {
					std::cout << "Error: Loading F Values in: " << path << " on Line: " << line << std::endl;
				}
			}
		}
	}

	else {
		std::cout << "Failed to locate the file: " << path << std::endl;
	}
}

void loadModel::display() {
	glBindVertexArray(VAO);	
	glDrawArrays(GL_TRIANGLES, 0, getVertices().size());
	glBindVertexArray(0);
}
void loadModel::init() {
	glBindVertexArray(VAO);
	//Sets the Shader Locations and passes it to the class
	ShaderInfo  shaders[] = {
			{ GL_VERTEX_SHADER, "media/triangles.vert" },
			{ GL_FRAGMENT_SHADER, "media/triangles.frag" },
			{ GL_NONE, NULL }
	};
	//Inits the display Model

	//Load Program
	program = LoadShaders(shaders);
	glUseProgram(program);
	
	glGenBuffers(NumBuffers, Buffers);
	//Vertices Binding
	glBindBuffer(GL_ARRAY_BUFFER, Buffers[VBO]);
	glBufferData(GL_ARRAY_BUFFER, vertices.size() * sizeof(glm::vec3), &vertices[0], GL_STATIC_DRAW);
	glVertexAttribPointer(vPos, 3, GL_FLOAT, GL_FALSE, 0, (void*)0);

	glEnableVertexAttribArray(vPos);

	//Temp colour load
	int colLoc = glGetUniformLocation(program, "colour");
	glUniform4fv(colLoc, 1,  glm::value_ptr(colour));

	glBindVertexArray(0);


}
void loadModel::moveModel(glm::mat4 model, glm::mat4 view, glm::mat4 projection) {
	glm::mat4 mvp = projection * view * model;
	int mvpLoc2 = glGetUniformLocation(program, "mvp");
	glUniformMatrix4fv(mvpLoc2, 1, GL_FALSE, glm::value_ptr(mvp));
	//+Y values
	pos1 = mvp*glm::vec4(min_x, max_y, max_z, 1.0f);
	pos2 = mvp*glm::vec4(max_x, max_y, max_z, 1.0f);
	pos3 = mvp*glm::vec4(min_x, max_y, min_z, 1.0f);
	pos4 = mvp*glm::vec4(max_x, max_y, min_z, 1.0f);
	//-Y values
	pos5 = mvp*glm::vec4(min_x, min_y, max_z, 1.0f);
	pos6 = mvp*glm::vec4(max_x, min_y, max_z, 1.0f);
	pos7 = mvp * glm::vec4(min_x, min_y, min_z, 1.0f);
	pos8 = mvp*glm::vec4(max_x, min_y, min_z, 1.0f);
	glBindVertexArray(0);
}



