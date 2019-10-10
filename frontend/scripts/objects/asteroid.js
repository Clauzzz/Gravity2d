class Asteroid
{
    constructor(id)
    {
        this.id = id;
        this.type = 'asteroid';
        objects.push(this);
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
    }
    setMass(mass)
    {
        this.mass = mass;
        if(typeof this.radius ==='undefined' && typeof this.density !=='undefined')
        {
            this.radius = Math.pow(3*this.mass/4/Math.PI/this.density,1/3); 
        }
        if(typeof this.radius !=='undefined' && typeof this.density ==='undefined')
        {
            this.density = this.mass / Math.pow(this.radius,3) / 4 / Math.PI *3;
        }
    }
    setRadius(radius)
    {
        this.radius=radius;
        if(typeof this.mass !=='undefined' && typeof this.density ==='undefined')
        {
            this.density = this.mass * 3 / 4 / Math.pow(this.radius,3) / Math.PI;
        }
        if(typeof this.mass ==='undefined' && typeof this.density !=='undefined')
        {
            this.mass = this.density * 4 * Math.PI * Math.pow(this.radius,3) / 3;
        }
    }
    setDensity(density)
    {
        this.density = density;
        if(typeof this.mass ==='undefined' && typeof this.radius !=='undefined')
        {
            this.mass = this.density * 4 * Math.PI * Math.pow(this.radius,3) / 3;
        }
        if(typeof this.mass !=='undefined' && typeof this.radius ==='undefined')
        {
            this.radius = Math.pow(3*this.mass/4/Math.PI/this.density,1/3); 
        }
    }
    setColor(color)
    {
        this.color = color;
    }
    setPositionX(posX)
    {
        this.x=posX;
    }
    setPositionY(posY)
    {
        this.y = posY;
    }
    setVelocityX(velocityX)
    {
        this.vx=velocityX;
    }
    setVelocityY(velocityY)
    {
        this.vy= velocityY;
    }
    setAccelerationX(accX)
    {
        this.ax=accX;
    }
    setAccelerationY(accY)
    {
        this.ay=accY;
    }
}