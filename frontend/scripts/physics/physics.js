class Universe
{
    constructor()
    {
        this.setFramerate(60);
    }
    setListenerObjects(objectsToListen)
    {
        this.objectsToListen = objectsToListen;
        objectsToListen.listenerObjects.push(this);
    }
    setFramerate(framerate)
    {
        this.framerate = framerate;
    }
    calculateCollide(objectA, objectB)
    {
        // removal of the initial objects
        removeObjectFromAll(objectA); 
        removeObjectFromAll(objectB); 

        // creating the new object
        let newObject = new Asteroid('abc');
        newObject.setPositionX((objectA.x+objectB.x)/2);
        newObject.setPositionY((objectA.y+objectB.y)/2);
        newObject.setMass(objectA.mass+objectB.mass);
        if(objectA.mass >= objectB.mass)
        {
            newObject.id = objectA.id;
            newObject.setColor(objectA.color);
            newObject.setDensity(1.1 * objectA.density); // so in time objects become denser and denser
        }
        else
        {
            newObject.id = objectB.id;
            newObject.setColor(objectB.color);
            newObject.setDensity(1.1 * objectB.density); // so in time objects become denser and denser
        }
        newObject.setVelocityX(((objectA.mass* objectA.vx)+(objectB.mass * objectB.vx)) /newObject.mass);
        newObject.setVelocityY(((objectA.mass* objectA.vy)+(objectB.mass * objectB.vy)) /newObject.mass);
    }
    calculateGravity()
    {
        // calculate accelerations
        for(let i=0;i<this.objectsToListen.length;i++)
        {
            for(let j=0;j<this.objectsToListen.length;j++)
            {
                if( i !== j)
                {
                    // based on newton's law of attraction
                    let distanceSq = Math.pow(this.objectsToListen[i].x-this.objectsToListen[j].x,2)+Math.pow(this.objectsToListen[i].y-this.objectsToListen[j].y,2);
                    let acceleration = this.objectsToListen[j].mass / distanceSq;
                    distanceSq = Math.sqrt(distanceSq);
                    this.objectsToListen[i].ax += acceleration * (this.objectsToListen[j].x - this.objectsToListen[i].x)/distanceSq;
                    this.objectsToListen[i].ay += acceleration * (this.objectsToListen[j].y - this.objectsToListen[i].y)/distanceSq;
                }
         
            }
        }
        // calculate speeds
        for(let i=0;i<this.objectsToListen.length;i++)
        {
            this.objectsToListen[i].vx += this.objectsToListen[i].ax;
            this.objectsToListen[i].vy += this.objectsToListen[i].ay;
        }
        // calculate collisions
        for(let i=0;i<this.objectsToListen.length;i++)
        {
            for(let j=0;j<this.objectsToListen.length;j++)
            {
                if(i!==j)
                {
                    if(((this.objectsToListen[i].x < this.objectsToListen[j].x &&
                    this.objectsToListen[i].x + this.objectsToListen[i].vx + this.objectsToListen[i].radius > this.objectsToListen[j].x + this.objectsToListen[j].vx - this.objectsToListen[j].radius ) ||
                    (this.objectsToListen[i].x > this.objectsToListen[j].x &&
                    this.objectsToListen[i].x + this.objectsToListen[i].vx - this.objectsToListen[i].radius < this.objectsToListen[j].x + this.objectsToListen[j].vx + this.objectsToListen[j].radius ))
                    &&
                    ((this.objectsToListen[i].y < this.objectsToListen[j].y &&
                    this.objectsToListen[i].y + this.objectsToListen[i].vy + this.objectsToListen[i].radius > this.objectsToListen[j].y + this.objectsToListen[j].vy - this.objectsToListen[j].radius ) ||
                    (this.objectsToListen[i].y > this.objectsToListen[j].y &&
                    this.objectsToListen[i].y + this.objectsToListen[i].vy - this.objectsToListen[i].radius < this.objectsToListen[j].y + this.objectsToListen[j].vy + this.objectsToListen[j].radius ))) 
                    {
                        // it means they would collide
                        this.calculateCollide(this.objectsToListen[i],this.objectsToListen[j]);
                        
                    }    
                }
            }
        }
        // calculate positions
        for(let i=0;i<this.objectsToListen.length;i++)
        {
            this.objectsToListen[i].x += this.objectsToListen[i].vx;
            this.objectsToListen[i].y += this.objectsToListen[i].vy;
        }
    }
    start()
    {
        let timer = Math.floor(1000/this.framerate);
        this.running = true;

        this.interval = setInterval(()=>
        {
            this.calculateGravity();
        },timer);
    }
    end()
    {
        if(this.running)
        {
            this.running = false;
            clearInterval(this.interval);
        }

    }
}