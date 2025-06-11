// ==== ECS ARCHITECTURE ====
let ECS = {

    Framework: class {
        constructor() {
            this.entities = [];
            this.systems = [];
            this.nextId = 0;
        }
        createEntity(name) {
            const entity = new ECS.Entity(this.nextId++, name);
            this.entities.push(entity);
            return entity;
        }
        removeEntity(entity) {
            var index = this.entities.findIndex(e => e == entity);
            if (index < 0) {
                console.error('Entity not found !');
                return;
            }
            this.entities.splice(index, 1);
        }
        addSystem(system) {
            this.systems.push(system);
        }

        update(delta) {
            for (const system of this.systems) {
                system.doProcess(this.entities, delta);
            }
        }
    },

    Entity: class {
        constructor(id, name = '') {
            this.id = id;
            this.name = name;
            this.components = new Map();
        }
        withComponents(componentsArray) {
            for (const component of componentsArray) {
                this.addComponent(component);
            }
            return this;
        }
        addComponent(component) {
            this.components.set(component.constructor.name, component);
            return this;
        }
        getComponent(name) {
            return this.components.get(name);
        }
        has(...names) {
            return names.every(name => this.components.has(name));
        }
    },

    System: class {

        filter;

        constructor(filter) {
            this.filter = filter;
        }

        doProcess(entities, delta) {
            if (this.filter != null)
                this.process(entities.filter(this.filter), delta);
            else
                this.process(entities, delta);
        }

    }
}

let Game = {
    ecs: new ECS.Framework(),
    Systems: {},
    start: function () {
        Game.init();
        // Game Loop
        let last = performance.now();
        function loop(now) {
            const delta = (now - last) / 1000;
            last = now;
            Game.ecs.update(delta);
            requestAnimationFrame(loop);
        }
        loop(last);
    }
}