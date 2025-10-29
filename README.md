# Entity Component System

# Summary <a href="#summary" />

[Summary](/README.md#summary)

[Architecture, advantages and drawbacks](/README.md#architecture,-advantages-and-drawbacks)

[Summary:](/README.md#summary:)

[✅ Advantages of ECS](/README.md#✅-advantages-of-ecs)

[❌ Drawbacks of ECS](/README.md#❌-drawbacks-of-ecs)

[Example of ECS architecture : Structures and Workflows](/README.md#example-of-ecs-architecture-:-structures-and-workflows)

[🎮 Conceptual Example: A Game with Moving Entities](/README.md#🎮-conceptual-example:-a-game-with-moving-entities)

[📦 example structures :](/README.md#📦-example-structures-:)

[⛓️ Workflows](/README.md#⛓️-workflows)

[🧱ECS Structures](/README.md#🧱ecs-structures)

[🧩 ECS Components](/README.md#🧩-ecs-components)

[Example of components](/README.md#example-of-components)

[⚙️ECS Entities](/README.md#⚙️ecs-entities)

[Example of entities](/README.md#example-of-entities)

[🔁 ECS Systems](/README.md#🔁-ecs-systems)

[Example of system](/README.md#example-of-system)

[Entities and World interactions in ECS architecture](/README.md#entities-and-world-interactions-in-ecs-architecture)

[🔄 Entity Interactions in ECS](/README.md#🔄-entity-interactions-in-ecs)

[💡 Key Idea:](/README.md#💡-key-idea:)

[📌 Summary](/README.md#📌-summary)

[🧩 1\. Inter-Entity Interaction](/README.md#🧩-1.-inter-entity-interaction)

[Example: Collision Detection](/README.md#example:-collision-detection)

[System: CollisionSystem](/README.md#system:-collisionsystem)

[🧭 2\. Interaction with the Environment (Game World)](/README.md#🧭-2.-interaction-with-the-environment-\(game-world\))

[Environment Representation:](/README.md#environment-representation:)

[System: MovementSystem with Environment Check](/README.md#system:-movementsystem-with-environment-check)

[✅ Example: Enemy Sees Player](/README.md#✅-example:-enemy-sees-player)

[System: VisionSystem](/README.md#system:-visionsystem)

# 

---

# Architecture, advantages and drawbacks <a href="#architecture,-advantages-and-drawbacks" />

The **Entity-Component-System (ECS)** architecture is a design pattern commonly used in game development, especially in performance-critical and data-oriented contexts. 

## **Summary**: <a href="#summary:" />

 ECS shines in large, performance-sensitive games (like simulations or MMOs) where data-driven design and scalability are priorities. However, it can be a burden for small or simple projects due to its complexity and learning curve.

Here’s a concise breakdown of its **advantages** and **drawbacks**:

## ✅ Advantages of ECS <a href="#✅-advantages-of-ecs" />

1. **Performance & Cache Efficiency**

   * ECS favors data locality by storing components in contiguous memory, improving CPU cache usage and reducing cache misses.

2. **Separation of Data and Behavior**

   * Clean separation between data (`Components`) and logic (`Systems`) makes the codebase more modular and maintainable.

3. **Scalability**

   * ECS scales well with large numbers of entities because systems operate on batches of components in a predictable, often parallelizable way.

4. **Flexibility & Reusability**

   * Behavior is defined by the combination of components. This enables flexible and reusable gameplay mechanics without rigid class hierarchies.

5. **Decoupling**

   * Systems don’t depend on each other directly, which reduces coupling and makes unit testing easier.

## ❌ Drawbacks of ECS <a href="#❌-drawbacks-of-ecs" />

1. **Complexity for Small Projects**

   * ECS can be overkill for simple games; the abstraction and boilerplate may outweigh its benefits.

2. **Steep Learning Curve**

   * Understanding the ECS pattern, especially data-oriented ECS, can be challenging for developers used to OOP paradigms.

3. **Debugging Difficulty**

   * The indirect flow of logic through systems and components can make debugging harder compared to traditional class-based architectures.

4. **Tooling & Debug Support**

   * Unless using a mature ECS framework or engine, tooling may be limited, and runtime introspection/debugging might be more difficult.

5. **Overhead in Abstractions**

   * Managing entities, components, and systems might introduce some runtime overhead if not efficiently implemented.

---

# Example of ECS architecture : Structures and Workflows <a href="#example-of-ecs-architecture-:-structures-and-workflows" />

Here’s a **simple, self-explanatory example** of how **ECS architecture works**, focusing purely on **structure and workflow**, without engine-specific code or excessive detail.

This architecture allows:

* Easy addition of new behavior (just new components and systems)

* High performance (process similar data together)

* Decoupled code (systems don’t know about each other)

## 🎮 Conceptual Example: A Game with Moving Entities <a href="#🎮-conceptual-example:-a-game-with-moving-entities" />

Let’s say we have a 2D game with entities that can **move**.

### **📦 example structures :** <a href="#📦-example-structures-:" />

| Layer | Contains | Example |
| :---- | :---- | :---- |
| Entity | Just an ID | `Entity 1` |
| Component | Raw data, no logic | `PositionComponent` |
| System | Logic, stateless | `MovementSystem` |

## ⛓️ Workflows <a href="#⛓️-workflows" />

1. **Define Components** (data containers).

2. **Create Entities** and assign them relevant components.

3. **Systems** process entities by filtering those that have the required component set.

4. **Update Loop** calls each system every frame.

## 🧱ECS Structures <a href="#🧱ecs-structures" />

* **Entity**: A unique ID. It holds no data or behavior.   
* **Component**: Plain data, no logic.   
* **System**: Logic that operates on entities with specific components.

### 🧩 ECS Components <a href="#🧩-ecs-components" />

Components store only the data, no methods.

#### Example of components <a href="#example-of-components" />

pseudocode:  
`PositionComponent:`  
    `x: float`  
    `y: float`

`VelocityComponent:`  
    `vx: float`  
    `vy: float`

### ⚙️ECS Entities <a href="#⚙️ecs-entities" />

Entities have only an identity and contain components for systems to process.

#### Example of entities <a href="#example-of-entities" />

Imagine we have two entities:

pseudocode:

`Entity 1:`  
  `- PositionComponent { x: 0, y: 0 }`  
  `- VelocityComponent { vx: 1, vy: 1 }`

`Entity 2:`  
  `- PositionComponent { x: 5, y: 5 }`  
  `- VelocityComponent { vx: -1, vy: 0 }`

### 🔁 ECS Systems <a href="#🔁-ecs-systems" />

#### Example of system <a href="#example-of-system" />

A system that moves all entities with both `Position` and `Velocity`.

pseudocode :  
`for each entity that has PositionComponent and VelocityComponent:`  
    `position.x += velocity.vx`  
    `position.y += velocity.vy`

# ---

# Entities and World interactions in ECS architecture <a href="#entities-and-world-interactions-in-ecs-architecture" />

Here’s a **simple explanation** of how **entities interact with each other** and with the **environment (e.g., game world level)** in an **ECS architecture**, keeping things clean and conceptual.

## **🔄 Entity Interactions in ECS** <a href="#🔄-entity-interactions-in-ecs" />

### **💡 Key Idea:** <a href="#💡-key-idea:" />

Entities don’t “talk to each other” directly — they **interact indirectly through components and systems**.

Systems create the illusion of "communication" by **responding to shared data and context**.

### 📌 Summary <a href="#📌-summary" />

| Interaction Type | How it Works |
| :---- | :---- |
| **Entity ↔ Entity** | Systems look at components of multiple entities |
| **Entity ↔ World** | Systems query world data (e.g. tilemap, physics) |
| **Effects/Events** | Systems can add new components (e.g., Damage, Alert) |

## 🧩 1\. Inter-Entity Interaction <a href="#🧩-1.-inter-entity-interaction" />

Let’s say we want entities to **collide** or **follow** each other.

### Example: Collision Detection <a href="#example:-collision-detection" />

* Each entity has:

  * `PositionComponent`

  * `ColliderComponent`

### System: CollisionSystem <a href="#system:-collisionsystem" />

pseudocode :  
`for each entity A with Position + Collider:`  
    `for each entity B (not A) with Position + Collider:`  
        `if A.collider overlaps B.collider:`  
            `mark both as collided (e.g., add CollisionComponent)`

Entities interact by **systems comparing or modifying shared component data**.

## 🧭 2\. Interaction with the Environment (Game World) <a href="#🧭-2.-interaction-with-the-environment-(game-world)" />

Imagine a **tile-based level** or a physics world (like walls, water, or terrain).

### Environment Representation: <a href="#environment-representation:" />

* The world is often a separate structure, e.g.:

  * A `TileMap`

  * A `GridComponent`

  * A `PhysicsWorld` object

### System: MovementSystem with Environment Check <a href="#system:-movementsystem-with-environment-check" />

pseudocode :  
`for each entity with Position + Velocity:`  
    `newPos = position + velocity`  
    `if world.is_walkable(newPos):`  
        `position = newPos`  
    `else:`  
        `stop movement or bounce back`

Systems query the environment (like a map or physics engine) while updating entities.

## ✅ Example: Enemy Sees Player <a href="#✅-example:-enemy-sees-player" />

* Entities:

  * Player → PositionComponent

  * Enemy → PositionComponent \+ VisionComponent

### System: VisionSystem <a href="#system:-visionsystem" />

pseudocode:  
`for each enemy:`  
    `if distance(enemy.position, player.position) < enemy.vision_range:`  
        `add AlertedComponent to enemy`

