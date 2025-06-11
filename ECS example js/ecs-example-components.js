// ==== COMPONENTS ====
Game.Components = {
    Position: class { constructor(x, y) { this.x = x; this.y = y; } },
    Velocity: class { constructor(x = 0, y = 0) { this.x = x; this.y = y; } },
    Renderable: class { constructor(color, size = 10) { this.color = color; this.size = size; } },
    PlayerControlled: class { },
    Bouncing: class { },
    Enemy: class { },
    Lifetime: class { constructor(time) { this.remaining = time; } },
    Collidable: class { constructor(radius) { this.radiusSquared = radius * radius; } },
    Environment: class {
        constructor(name, color, areaSize, effectText, textColor, effect) {
            this.name = name;
            this.color = color;
            this.areaSize = areaSize;
            this.effectText = effectText;
            this.textColor = textColor;
            this.effect = effect;
        }
    },
    Mortal: class { },
    WorldInteractable: class { constructor(env) { this.env = env; } },
    Health: class { constructor(value) { this.value = value; } },
    EnemyHitable: class { },
    PlayerHitable: class { },
    EquipedWeapon: class { constructor(damages) { this.damages = this.damages; } }
}


