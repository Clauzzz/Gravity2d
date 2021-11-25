class Universe
{
    static interval;
    static running; 
    static objectsToListen;
    static heaviestObject;
    static framerate = 60;
    static timer;
    constructor()
    {
        Universe.setFramerate(60);
    }
    static setListenerObjects(objectsToListen)
    {
        Universe.objectsToListen = objectsToListen;
        Universe.objectsToListen.listenerObjects.push(this);
    }
    static setFramerate(framerate)
    {
        Universe.framerate = framerate;
    }
    static calculateCollide(objectA, objectB)
    {
        // removal of the initial objects

        removeObjectFromAll(objectA); 
        removeObjectFromAll(objectB); 
        let _this = canvases.getCanvas('space');
        // creating the new object
        let newObject;

        if(objectA.mass >= objectB.mass)
        {
            newObject= new SpaceObject(objectA.id);
            newObject.setColor(objectA.r,objectA.g,objectA.b,objectA.a);
           // newObject.setDensity(1 * objectA.density);
            newObject.setDensity(1.1 * objectA.density); // so in time objects become denser and denser
            newObject.glowing = objectA.glowing;
        }
        else
        {
            newObject= new SpaceObject(objectB.id);
            newObject.setColor(objectB.r,objectB.g,objectB.b,objectB.a);
            //newObject.setDensity(1 * objectB.density);
            newObject.setDensity(1.1 * objectB.density); // so in time objects become denser and denser
            newObject.glowing = objectB.glowing;
        }
        newObject.setMass(objectA.mass+objectB.mass);
        newObject.setPositionX((objectA.x*objectA.mass+objectB.x*objectB.mass)/newObject.mass);
        newObject.setPositionY((objectA.y*objectA.mass+objectB.y*objectB.mass)/newObject.mass);
        
        newObject.setVelocityX(((objectA.mass* objectA.vx)+(objectB.mass * objectB.vx)) /newObject.mass);
        newObject.setVelocityY(((objectA.mass* objectA.vy)+(objectB.mass * objectB.vy)) /newObject.mass);
        if(_this.objectSelected && (_this.objectSelected.id == objectA.id || _this.objectSelected.id == objectB.id ))
        {
            _this.objectSelected = newObject;
        }
        if(_this.objectCentered && (_this.objectCentered.id == objectA.id || _this.objectCentered.id == objectB.id ))
        {
            _this.objectCentered = newObject;
        }
    }
    static calculateGravity()
    {
        // calculate accelerations
        for(let i=0;i<Universe.objectsToListen.length;i++)
        {
            let accelerationX = 0;
            let accelerationY = 0;
            for(let j=0;j<Universe.objectsToListen.length;j++)
            {
                if( i !== j && Universe.objectsToListen[j].hasGravity)
                {
                    // based on newton's law of attraction
                    let distanceSq = Math.pow(Universe.objectsToListen[i].x-Universe.objectsToListen[j].x,2)+Math.pow(Universe.objectsToListen[i].y-Universe.objectsToListen[j].y,2);
                    let acceleration = Universe.objectsToListen[j].mass / distanceSq;
                    distanceSq = Math.sqrt(distanceSq);
                    accelerationX += acceleration * (Universe.objectsToListen[j].x - Universe.objectsToListen[i].x)/distanceSq;
                    accelerationY += acceleration * (Universe.objectsToListen[j].y - Universe.objectsToListen[i].y)/distanceSq;
                }
            }
            Universe.objectsToListen[i].ax = accelerationX;
            Universe.objectsToListen[i].ay = accelerationY;
        }
        // calculate speeds
        for(let i=0;i<Universe.objectsToListen.length;i++)
        {
            Universe.objectsToListen[i].vx += Universe.objectsToListen[i].ax;
            Universe.objectsToListen[i].vy += Universe.objectsToListen[i].ay;
        }
        // calculate collisions
        for(let i=0;i<Universe.objectsToListen.length;i++)
        {
            for(let j=0;j<Universe.objectsToListen.length;j++)
            {
                if(i!==j)
                {
                    if((Universe.objectsToListen[i].hasGravity || Universe.objectsToListen[j].hasGravity) && ((Universe.objectsToListen[i].x <= Universe.objectsToListen[j].x &&
                    Universe.objectsToListen[i].x + Universe.objectsToListen[i].vx + Universe.objectsToListen[i].radius > Universe.objectsToListen[j].x + Universe.objectsToListen[j].vx - Universe.objectsToListen[j].radius ) ||
                    (Universe.objectsToListen[i].x > Universe.objectsToListen[j].x &&
                    Universe.objectsToListen[i].x + Universe.objectsToListen[i].vx - Universe.objectsToListen[i].radius < Universe.objectsToListen[j].x + Universe.objectsToListen[j].vx + Universe.objectsToListen[j].radius ))
                    &&
                    ((Universe.objectsToListen[i].y <= Universe.objectsToListen[j].y &&
                    Universe.objectsToListen[i].y + Universe.objectsToListen[i].vy + Universe.objectsToListen[i].radius > Universe.objectsToListen[j].y + Universe.objectsToListen[j].vy - Universe.objectsToListen[j].radius ) ||
                    (Universe.objectsToListen[i].y > Universe.objectsToListen[j].y &&
                    Universe.objectsToListen[i].y + Universe.objectsToListen[i].vy - Universe.objectsToListen[i].radius < Universe.objectsToListen[j].y + Universe.objectsToListen[j].vy + Universe.objectsToListen[j].radius ))) 
                    {
                        // it means they would collide
                        Universe.calculateCollide(Universe.objectsToListen[i],Universe.objectsToListen[j]);
                        j--;
                        i--;
                        break;
                    }
                }
            }
        }
        // calculate positions
        for(let i=0;i<Universe.objectsToListen.length;i++)
        {
            Universe.objectsToListen[i].x += Universe.objectsToListen[i].vx;
            Universe.objectsToListen[i].y += Universe.objectsToListen[i].vy;
        }
    }
    static calculateHeaviestObject()
    {
        let maxMassObject = {mass:0};
        for(let i=0; i<Universe.objectsToListen.length;i+=1)
        {
            if(Universe.objectsToListen[i].mass > maxMassObject.mass)
            {
                maxMassObject = Universe.objectsToListen[i];
            }
        }
        Universe.heaviestObject = maxMassObject;
    
    }
    static decreaseSpeed()
    {
        if(Universe.timer < 500)
        {
            clearInterval(Universe.interval);
            Universe.timer = Universe.timer * 2;
            Universe.interval = setInterval(()=>
            {
                Universe.calculateGravity();
            }, Universe.timer);
        }

    }
    static increaseSpeed()
    {
        if(Universe.timer > 4)
        {
            clearInterval(Universe.interval);
            Universe.timer = Universe.timer / 2;
            Universe.interval = setInterval(()=>
            {
                Universe.calculateGravity();
            }, Universe.timer);
        }

    }
    static start()
    {
        Universe.timer = Math.floor(100/Universe.framerate);
        Universe.running = true;

        Universe.interval = setInterval(()=>
        {
            Universe.calculateGravity();
        }, Universe.timer);
    }
    static end()
    {
        if(Universe.running)
        {
            Universe.running = false;
            clearInterval(Universe.interval);
        }
    }
}