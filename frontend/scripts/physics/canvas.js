class Canvas
{

    constructor(id)
    {
        this.id = id;
        this.objectsToListen = [];
        this.running = false;
        try
        {
            this.element = document.getElementById(this.id);
            if(this.element)
            {
                canvases.push(this);
                this.ctxt = this.element.getContext('2d');
                
                this.setFramerate(60);
                this.setSize(window.innerWidth,window.innerHeight);
                //default colors
                this.setBackgroundColor('rgba(0,0,0,1)');
                this.setForegroundColor('rgba(255,255,255,1)');
                
            }
            else throw new Error('Canvas with id "'+id+'" not found!');
            
        }
        catch(err)
        {
            console.error(err);
        }

    }
    setSize(width,height)
    {
        this.width = width;
        this.height = height;
        this.element.width = width;
        this.element.height = height;
    }
    setListenerObjects(objectsToListen)
    {
        /*
        {
            x,
            y,
            radius,
            color
        }
        */
        this.objectsToListen = [];
        for(let i=0;i<objectsToListen.length;i++)
        {
            this.objectsToListen.push(objectsToListen[i]);
        }
    }
    resetListenerObjects()
    {
        this.objectsToListen = [];
    }
    start()
    {
        this.running = true;
        let timer = Math.floor(1000 /this.framerate); 
        this.interval = setInterval(()=>
        {
            this.draw();

        },timer);
    }
    end()
    {
        this.running = false;
        clearInterval(this.timer);
    }
    draw()
    {
        this.ctxt.fillStyle = this.bColor;
        this.ctxt.fillRect(0,0,this.width,this.height);

        for(let i = 0;i<this.objectsToListen.length;i++)
        {
            this.ctxt.fillStyle = this.objectsToListen[i].color ? this.objectsToListen[i].color:this.fColor;
            this.ctxt.beginPath();
            this.ctxt.arc(this.objectsToListen[i].x, this.objectsToListen[i].y, this.objectsToListen[i].radius, 0, 2 * Math.PI);
            this.ctxt.fill();
        }
    }
    setFramerate(framerate)
    {
        if(this.running)
        {
            this.end();
        }
        this.framerate = framerate;
    }
    setBackgroundColor(backColor)
    {
        this.bColor = backColor;
        this.ctxt.fillStyle= this.bColor;
    }
    setForegroundColor(fColor)
    {
        this.fColor = fColor;
        this.ctxt.strokeStyle= this.fColor;
    }


}