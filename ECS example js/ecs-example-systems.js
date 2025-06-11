// ==== SYSTEMS ====
Game.Systems.movementSystem =
    class extends ECS.System {
        width;
        height;

        constructor(width, height) {
            super(e => e.has('Position', 'Velocity'));
            this.width = width;
            this.height = height;
        }

        process(entities, delta) {
            entities.forEach(e => {
                const pos = e.getComponent('Position');
                const vel = e.getComponent('Velocity');
                pos.x += vel.x * delta;
                pos.y += vel.y * delta;
                if (!e.has('Lifetime')) {
                    pos.x = Math.max(0, Math.min(this.width, pos.x));
                    pos.y = Math.max(0, Math.min(this.height, pos.y));
                }
            });
        }
    }

Game.Systems.bounceSystem =
    class extends ECS.System {

        width;
        height;

        constructor(width, height) {
            super(e => e.has('Position', 'Velocity', 'Bouncing'));
            this.width = width;
            this.height = height;
        }

        process(entities, delta) {
            entities.forEach(e => {
                const pos = e.getComponent('Position');
                const vel = e.getComponent('Velocity');
                if (pos.x <= 0 || pos.x >= this.width) vel.x *= -1;
                if (pos.y <= 0 || pos.y >= this.height) vel.y *= -1;

            });
        }
    }

Game.Systems.clearScreen =
    class extends ECS.System {

        ctx;
        width;
        height;

        constructor(ctx, width, height) {
            super(null);
            this.ctx = ctx;
            this.width = width;
            this.height = height;
        }

        process(entities, delta) {
            this.ctx.clearRect(0, 0, this.width, this.width);
        }

    }

Game.Systems.renderSystem =
    class extends ECS.System {

        ctx;
        labelDiv;
        offsetLeft;
        offsetTop;

        constructor(ctx, labelDiv, offsetLeft, offsetTop) {
            super(e => e.has('Position', 'Renderable'));
            this.ctx = ctx;
            this.labelDiv = labelDiv;
            this.offsetLeft = offsetLeft;
            this.offsetTop = offsetTop;
        }


        process(entities, delta) {

            this.labelDiv.innerHTML = '';

            for (const e of entities) {
                if (e.has('Position', 'Renderable')) {
                    const pos = e.getComponent('Position');
                    const rend = e.getComponent('Renderable');
                    this.ctx.fillStyle = rend.color;
                    this.ctx.beginPath();
                    this.ctx.arc(pos.x, pos.y, rend.size, 0, Math.PI * 2);
                    this.ctx.fill();

                    let labelText = '';
                    if (e.has('PlayerControlled')) {
                        labelText = `Player (HP: ${e.getComponent('Health').value})`;
                    } else if (e.has('Enemy')) {
                        labelText = `Enemy (HP: ${e.getComponent('Health').value})`;
                    } else if (e.has('Lifetime')) {
                        labelText = `Life: ${e.getComponent('Lifetime').remaining.toFixed(1)}`;
                    }

                    if (labelText) {
                        const label = document.createElement('div');
                        label.className = 'label';
                        label.textContent = labelText;
                        label.style.left = `${this.offsetLeft + pos.x - 20}px`;
                        label.style.top = `${this.offsetTop + pos.y - 25}px`;
                        this.labelDiv.appendChild(label);
                    }
                }
            }
        }
    }

Game.Systems.controlSystem =
    class extends ECS.System {

        keys;

        constructor(keys) {
            super(e => e.has('PlayerControlled', 'Velocity'));
            this.keys = keys;
        }

        process(entities, delta) {
            entities.forEach(e => {
                const vel = e.getComponent('Velocity');
                vel.x = (this.keys.ArrowRight ? 1 : 0) - (this.keys.ArrowLeft ? 1 : 0);
                vel.y = (this.keys.ArrowDown ? 1 : 0) - (this.keys.ArrowUp ? 1 : 0);
                const speed = 100;
                vel.x *= speed;
                vel.y *= speed;
            });
        }
    }

Game.Systems.lifetimeSystem =
    class extends ECS.System {

        constructor() {
            super(e => e.has('Lifetime'));
        }

        process(entities, delta) {
            let i = 0;
            entities.forEach(e => {
                const lt = e.getComponent('Lifetime');
                lt.remaining -= delta;
                if (lt.remaining <= 0) {
                    entities.splice(i, 1);
                }
                i++;
            });
        }
    }

Game.Systems.collisionSystem =
    class extends ECS.System {

        constructor() {
            super(e => e.has('Position', 'Collidable'))
        }

        process(entities, delta) {
            entities.forEach(a => {
                const posA = a.getComponent('Position');
                entities.forEach(b => {
                    if (a == b) return;
                    const posB = b.getComponent('Position');
                    const dx = posA.x - posB.x;
                    const dy = posA.y - posB.y;
                    const distSquared = dx * dx + dy * dy;
                    if (distSquared < a.getComponent('Collidable').radiusSquared && a.has('EquipedWeapon')) {
                        if ((a.has('Enemy') && b.has('EnemyHitable'))
                            || (a.has('PlayerControlled') && b.has('PlayerHitable'))) {
                            const hp = b.getComponent('Health');
                            hp.value -= 10;
                            b.getComponent('Renderable').color = 'orange';
                        }

                    }
                })
            });
        }
    }

Game.Systems.entitiesRemovingSystem =
    class extends ECS.System {

        ecs;

        constructor(ecs) {
            super(e => e.has('Health') || e.has('Lifetime'));
            this.ecs = ecs;
        }

        process(entities, delta) {
            entities.forEach(e => {
                if (e.has('Lifetime')) {
                    if (e.getComponent('Lifetime').remaining <= 0) {
                        this.ecs.removeEntity(e);
                    }
                    return;
                }
                var health = e.getComponent('Health');
                if (health.value <= 0) {
                    this.ecs.removeEntity(e);
                    if (e.has('PlayerControlled')) {
                        alert("Game over! You are dead !");
                        window.location.reload();
                        return;

                    }
                }
            });
        }


    }

Game.Systems.environmentInteractionsSystem =
    class extends ECS.System {

        ecs;

        constructor(ecs) {
            super(e => e.has('Position', 'Collidable'))
            this.ecs = ecs;
        }

        process(entities, delta) {
            entities.forEach(a => {
                const posA = a.getComponent('Position');
                this.ecs.entities
                    .filter(b => b.has('WorldInteractable'))
                    .forEach(env => {
                        const posEnv = env.getComponent('Position');
                        const dx = posA.x - posEnv.x;
                        const dy = posA.y - posEnv.y;
                        const distSquared = dx * dx + dy * dy;
                        const envAreaSize = env.getComponent('WorldInteractable').env.areaSize
                        if (distSquared < envAreaSize * envAreaSize && a.has('EquipedWeapon')) {
                            env.getComponent('WorldInteractable').env.effect(env, a);
                        }
                    });
            });
        }
    }

Game.Systems.environmentRenderingSystem =
    class extends ECS.System {

        ctx;

        constructor(ctx) {
            super(e => e.has('WorldInteractable', 'Position'));
            this.ctx = ctx;
        }

        process(entities, delta) {
            entities
                .forEach(e => {
                    const env = e.getComponent('WorldInteractable').env;
                    const pos = e.getComponent('Position');

                    this.ctx.fillStyle = 'white';
                    this.ctx.font = '10px sans-serif';
                    this.ctx.textAlign = 'center';

                    this.ctx.fillStyle = env.color;
                    this.ctx.fillRect(
                        pos.x - env.areaSize / 2,
                        pos.y - env.areaSize / 2,
                        env.areaSize * 2,
                        env.areaSize * 2);
                    this.ctx.fillStyle = env.textColor;
                    this.ctx.fillText(env.effectText, pos.x, pos.y);
                });

        }
    }

Game.Systems.goalSystem =
    class extends ECS.System {

        player;

        constructor(entities) {
            super(e => (e.has('WorldInteractable', 'Position') && e.getComponent('WorldInteractable').type === 'goalZone'))
            for (const e of entities) {
                if (e.has('PlayerControlled')) {
                    this.player = e;
                    return;
                }
            }
        }

        process(entities, delta) {
            // Check for goal zone overlap with player
            entities.forEach((e) => {
                const goalPos = e.getComponent('Position');
                const playerPos = player.getComponent('Position');
                const dx = goalPos.x - playerPos.x;
                const dy = goalPos.y - playerPos.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 30) {
                    alert("Victory! You've reached the goal!");
                    window.location.reload();
                    return;
                }
            });
        }

    }
