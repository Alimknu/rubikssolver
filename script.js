class Cube {
    constructor() {
      this.state = {
        front: this.generateFaceColors("w"),
        back: this.generateFaceColors("y"),
        top: this.generateFaceColors("b"),
        bottom: this.generateFaceColors("g"),
        left: this.generateFaceColors("r"),
        right: this.generateFaceColors("o"),
      };
  
      this.currentFace = "front";
      this.cubeContainer = document.querySelector(".cube-container");
      this.bindCubeEventHandlers();
      this.renderCube();
    }
  
    generateFaceColors(color) {
      return Array.from({ length: 3 }, () => Array(3).fill(color));
    }
  
    handleCubeClick(event) {
        const clickedBlock = event.target;
        const face = clickedBlock.dataset.face;
        const row = clickedBlock.dataset.row;
        const col = clickedBlock.dataset.col;
      
        let currentColor = this.state[face][row][col];
      
        // Prompt the user for a new color
        const newColor = prompt('Enter a color (R, G, B, O, Y, W)');
      
        // Update the color if it's a valid choice
        if (['R', 'G', 'B', 'O', 'Y', 'W'].includes(newColor.toUpperCase())) {
          this.state[face][row][col] = newColor.toUpperCase();
        } else {
          alert('Invalid color choice!');
        }
      
        this.renderCube();
    }
      
  
    bindCubeEventHandlers() {
        const controlButtons = document.querySelectorAll(".control-button");
        controlButtons.forEach((button) => {
          button.addEventListener("click", (event) => {
            const face = event.target.id;
            this.currentFace = face;
            this.renderCube();
          });
        });
      
        const cubeBlocks = document.querySelectorAll(".cube-block");
        cubeBlocks.forEach((block) => {
          const sections = block.querySelectorAll(".section");
          sections.forEach((section) => {
            section.addEventListener("click", this.handleCubeClick.bind(this));
          });
        });
    }
      
    renderCube() {
        this.cubeContainer.innerHTML = "";
      
        let faceData = this.state[this.currentFace];
      
        const face = document.createElement("div");
        face.classList.add("face");
      
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            const block = document.createElement("div");
            block.classList.add("cube-block");
            block.dataset.face = this.currentFace;
            block.dataset.row = row;
            block.dataset.col = col;
      
            // Get the color from the cube's state
            let color = faceData[row][col];
            block.style.backgroundColor = color;
      
            // Set the inner text of the cube block to display the color
            block.innerText = color.charAt(0).toUpperCase();
      
            face.appendChild(block);
          }
        }
      
        this.cubeContainer.innerHTML = "";
        this.cubeContainer.appendChild(face);
      }
      

    solveCube() {
        // Generate solving instructions (placeholder)
        const instructions = ["Step 1: Rotate the top layer clockwise", "Step 2: Flip the cube", "Step 3: Rotate the right layer counterclockwise", /*...*/];
      
        // Display the instructions
        const instructionsContainer = document.getElementById("instructions");
        instructionsContainer.innerHTML = "";
      
        instructions.forEach((instruction) => {
          const instructionElement = document.createElement("p");
          instructionElement.textContent = instruction;
          instructionsContainer.appendChild(instructionElement);
        });
    }

  }
  
  const cube = new Cube();
  const solveButton = document.getElementById("solve-button");
  solveButton.addEventListener("click", () => {
    cube.solveCube();
  });
  