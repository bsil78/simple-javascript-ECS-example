Game.init = function () {
    // ==== INITIALIZATION ====
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
    const labelDiv = document.getElementById('labels');
    Game.keys = {};
    window.addEventListener('keydown', e => Game.keys[e.key] = true);
    window.addEventListener('keyup', e => Game.keys[e.key] = false);

    Game.Entities.init(canvas.width, canvas.height);

    // Systems
    Game.ecs.addSystem(new Game.Systems.controlSystem(Game.keys));
    Game.ecs.addSystem(new Game.Systems.movementSystem(canvas.width, canvas.height));
    Game.ecs.addSystem(new Game.Systems.bounceSystem(canvas.width, canvas.height));
    Game.ecs.addSystem(new Game.Systems.collisionSystem());
    Game.ecs.addSystem(new Game.Systems.lifetimeSystem());
    Game.ecs.addSystem(new Game.Systems.environmentInteractionsSystem(Game.ecs));
    Game.ecs.addSystem(new Game.Systems.entitiesRemovingSystem(Game.ecs));
    Game.ecs.addSystem(new Game.Systems.clearScreen(ctx, canvas.width, canvas.height))
    Game.ecs.addSystem(new Game.Systems.environmentRenderingSystem(ctx));
    Game.ecs.addSystem(new Game.Systems.renderSystem(ctx, labelDiv, canvas.offsetLeft, canvas.offsetTop));

}

Game.start();




