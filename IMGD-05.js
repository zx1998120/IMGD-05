let agents = [];

function setup() {
  createCanvas(800, 600);
  // Create at least 100 agents with random starting positions
  for (let i = 0; i < 100; i++) {
    agents.push(new Agent());
  }
}

function draw() {
  // Use a translucent background to create motion trails
  background(220, 20);
  
  // Update and display all agents
  for (let agent of agents) {
    agent.update();
    agent.display();
  }
}

// Agent class definition
class Agent {
  constructor() {
    // Random starting position
    this.x = random(width);
    this.y = random(height);
    
    // Offsets for noise-based movement
    this.noiseOffsetX = random(1000);
    this.noiseOffsetY = random(1000);
    
    // Additional property: size
    this.size = random(3, 8);
  }
  
  update() {
    // Use noise to calculate smooth random movement
    let moveX = map(noise(this.noiseOffsetX), 0, 1, -2, 2);
    let moveY = map(noise(this.noiseOffsetY), 0, 1, -2, 2);
    
    this.x += moveX;
    this.y += moveY;
    
    // Increment noise offsets to ensure new values in subsequent frames
    this.noiseOffsetX += 0.01;
    this.noiseOffsetY += 0.01;
    
    // Mouse-based interaction: repel agents when the mouse is near
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 50) {
      let angle = atan2(this.y - mouseY, this.x - mouseX);
      // Adjust position based on distance to create a repelling effect
      this.x += cos(angle) * 5;
      this.y += sin(angle) * 5;
    }
    
    // Keep agents on screen
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }
  
  display() {
    noStroke();
    fill(0, 150, 255, 200);
    ellipse(this.x, this.y, this.size);
  }
}