class Universe
{
    constructor()
    {
        this.setFramerate(60);
    }
    setListenerObjects(objectsToListen)
    {
        this.objectsToListen = objectsToListen;
    }
    setFramerate(framerate)
    {
        this.framerate = framerate;
    }
    collide()
    {
        
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