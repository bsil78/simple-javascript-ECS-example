Game.Entities = {

    init: function (width, height) {

        // Player
        const player = Game.ecs.createEntity()
            .withComponents([
                new Game.Components.Position(100, 100),
                new Game.Components.Velocity(),
                new Game.Components.Renderable('lime', 12),
                new Game.Components.PlayerControlled(),
                new Game.Components.Health(100),
                new Game.Components.Collidable(15),
                new Game.Components.EnemyHitable(),
                new Game.Components.EquipedWeapon(10)
            ]);

        // Enemies
        for (let i = 0; i < 5; i++) {
            Game.ecs.createEntity()
                .withComponents([
                    new Game.Components.Position(Math.random() * width, Math.random() * height),
                    new Game.Components.Velocity((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100),
                    new Game.Components.Renderable('red', 10),
                    new Game.Components.Bouncing(),
                    new Game.Components.Enemy(),
                    new Game.Components.Health(20),
                    new Game.Components.Collidable(15),
                    new Game.Components.PlayerHitable(),
                    new Game.Components.EquipedWeapon(5)
                ]);
        }

        // Particles with lifetime
        for (let i = 0; i < 10; i++) {
            Game.ecs.createEntity()
                .withComponents([
                    new Game.Components.Position(300, 200),
                    new Game.Components.Velocity((Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200),
                    new Game.Components.Renderable('yellow', 5),
                    new Game.Components.Lifetime(3)
                ]);
        }

        // World Interactables

        const envs = [
            new Game.Components.Environment('healingZone', 'green', 40, 'Heal', 'white',
                (env, e) => {
                    if (!e.has('PlayerControlled')) return;
                    e.getComponent('Health').value += 10;
                }),
            new Game.Components.Environment('damageZone', 'red', 40, 'Hurt', 'white',
                (env, e) => {
                    if (!e.has('PlayerControlled')) return;
                    e.getComponent('Health').value -= 10;
                }),
            new Game.Components.Environment('bouncePad', 'blue', 40, 'Bounce', 'white',
                (env, e) => {
                    if (e.has('Velocity')) {
                        let v = e.getComponent('Velocity');
                        v.x *= -1;
                        v.y *= -1;
                    }
                }),
            new Game.Components.Environment('goalZone', 'yellow', 40, 'Goal', 'Black',
                (env, e) => {
                    if (!e.has('PlayerControlled')) return;
                    alert("Victory! You've reached the goal!");
                    window.location.reload();
                    return;
                }),
            new Game.Components.Environment('slowZone', 'purple', 40, 'Slow', 'white',
                (env, e) => {
                    if (!e.has('PlayerControlled')) return;
                    let v = e.getComponent('Velocity');
                    v.x = v.x * 0.9;
                    v.y = v.y * 0.9;
                }
            )
        ];

        for (let i = 0; i < envs.length; i++) {
            let env = envs[i];
            Game.ecs.createEntity(env.name)
                .withComponents([
                    new Game.Components.Position(100 + i * 100, 350),
                    new Game.Components.WorldInteractable(env)
                ]);
        }
    }
}