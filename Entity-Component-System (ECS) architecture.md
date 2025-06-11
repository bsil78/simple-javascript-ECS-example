# Entity Component System

# Summary {#summary}

[Summary](#summary)

[Architecture, advantages and drawbacks](#architecture,-advantages-and-drawbacks)

[Summary:](#summary:)

[✅ Advantages of ECS](#✅-advantages-of-ecs)

[❌ Drawbacks of ECS](#❌-drawbacks-of-ecs)

[Example of ECS architecture : Structures and Workflows](#example-of-ecs-architecture-:-structures-and-workflows)

[🎮 Conceptual Example: A Game with Moving Entities](#🎮-conceptual-example:-a-game-with-moving-entities)

[📦 example structures :](#📦-example-structures-:)

[⛓️ Workflows](#⛓️-workflows)

[🧱ECS Structures](#🧱ecs-structures)

[🧩 ECS Components](#🧩-ecs-components)

[Example of components](#example-of-components)

[⚙️ECS Entities](#⚙️ecs-entities)

[Example of entities](#example-of-entities)

[🔁 ECS Systems](#🔁-ecs-systems)

[Example of system](#example-of-system)

[Entities and World interactions in ECS architecture](#entities-and-world-interactions-in-ecs-architecture)

[🔄 Entity Interactions in ECS](#🔄-entity-interactions-in-ecs)

[💡 Key Idea:](#💡-key-idea:)

[📌 Summary](#📌-summary)

[🧩 1\. Inter-Entity Interaction](#🧩-1.-inter-entity-interaction)

[Example: Collision Detection](#example:-collision-detection)

[System: CollisionSystem](#system:-collisionsystem)

[🧭 2\. Interaction with the Environment (Game World)](#🧭-2.-interaction-with-the-environment-\(game-world\))

[Environment Representation:](#environment-representation:)

[System: MovementSystem with Environment Check](#system:-movementsystem-with-environment-check)

[✅ Example: Enemy Sees Player](#✅-example:-enemy-sees-player)

[System: VisionSystem](#system:-visionsystem)

# 

---

# Architecture, advantages and drawbacks {#architecture,-advantages-and-drawbacks}

The **Entity-Component-System (ECS)** architecture is a design pattern commonly used in game development, especially in performance-critical and data-oriented contexts. 

## **Summary**: {#summary:}

 ECS shines in large, performance-sensitive games (like simulations or MMOs) where data-driven design and scalability are priorities. However, it can be a burden for small or simple projects due to its complexity and learning curve.

Here’s a concise breakdown of its **advantages** and **drawbacks**:

## ✅ Advantages of ECS {#✅-advantages-of-ecs}

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

## ❌ Drawbacks of ECS {#❌-drawbacks-of-ecs}

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

# Example of ECS architecture : Structures and Workflows {#example-of-ecs-architecture-:-structures-and-workflows}

Here’s a **simple, self-explanatory example** of how **ECS architecture works**, focusing purely on **structure and workflow**, without engine-specific code or excessive detail.

This architecture allows:

* Easy addition of new behavior (just new components and systems)

* High performance (process similar data together)

* Decoupled code (systems don’t know about each other)

## 🎮 Conceptual Example: A Game with Moving Entities {#🎮-conceptual-example:-a-game-with-moving-entities}

Let’s say we have a 2D game with entities that can **move**.

### **📦 example structures :** {#📦-example-structures-:}

| Layer | Contains | Example |
| :---- | :---- | :---- |
| Entity | Just an ID | `Entity 1` |
| Component | Raw data, no logic | `PositionComponent` |
| System | Logic, stateless | `MovementSystem` |

## ⛓️ Workflows {#⛓️-workflows}

1. **Define Components** (data containers).

2. **Create Entities** and assign them relevant components.

3. **Systems** process entities by filtering those that have the required component set.

4. **Update Loop** calls each system every frame.

## 🧱ECS Structures {#🧱ecs-structures}

* **Entity**: A unique ID. It holds no data or behavior.   
* **Component**: Plain data, no logic.   
* **System**: Logic that operates on entities with specific components.

### 🧩 ECS Components {#🧩-ecs-components}

Components store only the data, no methods.

#### Example of components {#example-of-components}

pseudocode:  
`PositionComponent:`  
    `x: float`  
    `y: float`

`VelocityComponent:`  
    `vx: float`  
    `vy: float`

### ⚙️ECS Entities {#⚙️ecs-entities}

Entities have only an identity and contain components for systems to process.

#### Example of entities {#example-of-entities}

Imagine we have two entities:

pseudocode:

`Entity 1:`  
  `- PositionComponent { x: 0, y: 0 }`  
  `- VelocityComponent { vx: 1, vy: 1 }`

`Entity 2:`  
  `- PositionComponent { x: 5, y: 5 }`  
  `- VelocityComponent { vx: -1, vy: 0 }`

### 🔁 ECS Systems {#🔁-ecs-systems}

#### Example of system {#example-of-system}

A system that moves all entities with both `Position` and `Velocity`.

pseudocode :  
`for each entity that has PositionComponent and VelocityComponent:`  
    `position.x += velocity.vx`  
    `position.y += velocity.vy`

# ---

# Entities and World interactions in ECS architecture {#entities-and-world-interactions-in-ecs-architecture}

Here’s a **simple explanation** of how **entities interact with each other** and with the **environment (e.g., game world level)** in an **ECS architecture**, keeping things clean and conceptual.

## **🔄 Entity Interactions in ECS** {#🔄-entity-interactions-in-ecs}

### **💡 Key Idea:** {#💡-key-idea:}

Entities don’t “talk to each other” directly — they **interact indirectly through components and systems**.

Systems create the illusion of "communication" by **responding to shared data and context**.

### 📌 Summary {#📌-summary}

| Interaction Type | How it Works |
| :---- | :---- |
| **Entity ↔ Entity** | Systems look at components of multiple entities |
| **Entity ↔ World** | Systems query world data (e.g. tilemap, physics) |
| **Effects/Events** | Systems can add new components (e.g., Damage, Alert) |

## 🧩 1\. Inter-Entity Interaction {#🧩-1.-inter-entity-interaction}

Let’s say we want entities to **collide** or **follow** each other.

### Example: Collision Detection {#example:-collision-detection}

* Each entity has:

  * `PositionComponent`

  * `ColliderComponent`

### System: CollisionSystem {#system:-collisionsystem}

pseudocode :  
`for each entity A with Position + Collider:`  
    `for each entity B (not A) with Position + Collider:`  
        `if A.collider overlaps B.collider:`  
            `mark both as collided (e.g., add CollisionComponent)`

Entities interact by **systems comparing or modifying shared component data**.

## 🧭 2\. Interaction with the Environment (Game World) {#🧭-2.-interaction-with-the-environment-(game-world)}

Imagine a **tile-based level** or a physics world (like walls, water, or terrain).

### Environment Representation: {#environment-representation:}

* The world is often a separate structure, e.g.:

  * A `TileMap`

  * A `GridComponent`

  * A `PhysicsWorld` object

### System: MovementSystem with Environment Check {#system:-movementsystem-with-environment-check}

pseudocode :  
`for each entity with Position + Velocity:`  
    `newPos = position + velocity`  
    `if world.is_walkable(newPos):`  
        `position = newPos`  
    `else:`  
        `stop movement or bounce back`

Systems query the environment (like a map or physics engine) while updating entities.

## ✅ Example: Enemy Sees Player {#✅-example:-enemy-sees-player}

* Entities:

  * Player → PositionComponent

  * Enemy → PositionComponent \+ VisionComponent

### System: VisionSystem {#system:-visionsystem}

pseudocode:  
`for each enemy:`  
    `if distance(enemy.position, player.position) < enemy.vision_range:`  
        `add AlertedComponent to enemy`

