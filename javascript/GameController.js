class GameController {
  
  constructor(ThreeScene, ThreeCamera) {
    this.ThreeScene = ThreeScene; // The scene object from Three.js
    this.ThreeCamera = ThreeCamera; // The camara object from Three.js
    this.player = new Player(this, new Vector3D(0, 10, 0), new Vector3D(0.5, 2, 0.5), "0x00ff00", "", {
        "speed": 10*3,
        "jumpSpeed": 300,
        "lookSpeed": 15
    });
    this.scenes = [
      {
        "title": "Introduction",
        "objects": [
          //new Block(this, new Vector3D(0, 0, 0), new Vector3D(1000, 0.1, 0.1), "0xff0000"), // x axis
          //new Block(this, new Vector3D(0, 0, 0), new Vector3D(0.1, 1000, 0.1), "0x00ff00"), // y axis
          //new Block(this, new Vector3D(0, 0, 0), new Vector3D(0.1, 0.1, 1000), "0x0000ff"), // z axis
          new Block(this, new Vector3D(0, 0, 0), new Vector3D(10, 0.5, 20), "0xaaaaaa", "textures/wood_texture.jpg"), //floor
          new Block(this, new Vector3D(0, -0.1, 0), new Vector3D(80, 0.5, 80), "0xaaaaaa", "textures/iron_texture.jpg"), //ground
          new Block(this, new Vector3D(0, 5000, 0), new Vector3D(8000, 0.5, 8000), "0xaaaaff", "textures/iron_texture.jpg"), //sky
          //Walls
          new Block(this, new Vector3D(0, 10, 10), new Vector3D(10, 20, 0.5), "0xaaaaaa", "textures/wood_texture.jpg"), 
          new Block(this, new Vector3D(0, 12, -10), new Vector3D(10, 16, 0.5), "0xaaaaaa", "textures/wood_texture.jpg"),
          new Block(this, new Vector3D(5, 10, 0), new Vector3D(0.5, 20, 20), "0xaaaaaa", "textures/wood_texture.jpg"),
          new Block(this, new Vector3D(-5, 10, 0), new Vector3D(0.5, 20, 20), "0xaaaaaa", "textures/wood_texture.jpg"),
          new Block(this, new Vector3D(0, 20, 0), new Vector3D(10, 0.5, 20), "0xaaaaaa", "textures/wood_texture.jpg"),//celing
          new Block(this, new Vector3D(6, 0, 0), new Vector3D(2, 0.4, 2), "0xaaaaaa", "textures/iron_texture.jpg", (obj) => { obj.pos.y = 10 * Math.sin(performance.now() / 2000 + 3) + 10.1; obj.vel.y = 20/10000 * Math.cos(performance.now() / 300 + 3); } ), //elevator
          new Block(this, new Vector3D(6, 0, 0), new Vector3D(2, 0.4, 2), "0xaaaaaa", "textures/iron_texture.jpg", (obj) => { obj.pos.x = 10000 * Math.sin(performance.now() / 2000 + 3) + 10.1; obj.vel.x = 20/10000 * Math.cos(performance.now() / 300 + 3); } ), //elevator

        ],
        "npcs": [
          this.player,
        ]
      },
      {
        "title": "Nihilism",
        "objects": [
          new Block(this, new Vector3D(0, 0, 10), new Vector3D(10, 10, 1)),
          new Block(this, new Vector3D(-1, 2, -4), new Vector3D(1, 2, 2))
        ],
        "npcs": [
          this.player,
          new NPC(this, new Vector3D(-1, 2, -2), new Vector3D(1, 1, 2), "")
        ]
      }
    ];
    this.sceneNum = 0;
    
    // Store a clock for physics calculations.
    this.clock = new THREE.Clock();
    this.delta;
  }
  
  get scene() {
    return this.scenes[this.sceneNum];
  }

  checkCollision(object) {
    var collides = false;
    var npc;
    for (var i in this.scene.npcs) {
      npc = this.scene.npcs[i];
      if (npc !== object) { // Ensure we don't collide the object with itself.
        if (object.collisionBox.collideWith(npc)) {
            collides = true;
        }
      }
    }
    var obj;
    for (var i in this.scene.objects) {
      obj = this.scene.objects[i];
      if (obj !== object) { // Ensure we don't collide the object with itself.
        if (object.collisionBox.collideWith(obj)) {
            collides = true;
        }
      }
    }
    return collides;
  }
  
  init() {
    var npc;
    for (var i in this.scene.npcs) {
      npc = this.scene.npcs[i];
      if (npc !== this.player) {
          npc.collisionBox.initRender();
      }
    }
    var obj;
    for (var i in this.scene.objects) {
      obj = this.scene.objects[i];
      obj.collisionBox.initRender();
    }
  }

  update() {
    this.delta = this.clock.getDelta();
    this.player.update();
    var npc;
    for (var i in this.scene.npcs) {
      npc = this.scene.npcs[i];
      npc.update();
    }
    var obj;
    for (var i in this.scene.objects) {
      obj = this.scene.objects[i];
      obj.update();
    }
  }
  
}
