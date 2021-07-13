class Canvas
{

    constructor(id)
    {
        this.id = id;
        this.objectsToListen = [];
        this.objectsInView = [];
        this.objectSelected = null;
        this.objectHovered = null;
        this.canvWidth = this.width;
        this.canvHeight = this.height;
        this.canvOriginX = 0;
        this.canvOriginY = 0
        this.gridXMargin = 40;
        this.gridYMargin = 40;
        this.gridXtextMargin = 10;
        this.gridYtextMargin = 10;

        this.running = false;
        try
        {
            this.element = document.getElementById(this.id);
            if(this.element)
            {
                canvases.push(this);
                this.ctxt = this.element.getContext('2d');
                
                this.setFramerate(60);
                this.setSize(window.innerWidth * 0.8,window.innerHeight);
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
        this.objectsToListen = objectsToListen;
        objectsToListen.listenerObjects.push(this);
    }
    resetListenerObjects()
    {
        this.objectsToListen = [];
    }
    drawMinorXAxis = () =>
    {

    }
    drawMinorYAxis = () =>
    {

    }
    drawXAxis = () =>
    {
        this.ctxt.beginPath();
        this.ctxt.strokeStyle  = "rgba(255,255,255,1)";
        this.ctxt.rect(this.gridXMargin, this.height - this.gridYMargin, this.width - this.gridXMargin, 1);
        this.ctxt.stroke();
        this.ctxt.font = '30px Consolas';
        this.ctxt.fillStyle  = "rgba(255,255,255,1)";
        this.ctxt.fillText("x", this.width - this.gridXMargin - this.gridXtextMargin, this.height - this.gridYMargin - this.gridYtextMargin);
    }
    drawYAxis = () =>
    {
        this.ctxt.beginPath();
        this.ctxt.strokeStyle  = "rgba(255,255,255,1)";
        this.ctxt.rect(this.gridXMargin, 0, 1, this.height - this.gridYMargin);
        this.ctxt.stroke();
        this.ctxt.font = '30px Consolas';
        this.ctxt.fillStyle  = "rgba(255,255,255,1)";
        this.ctxt.fillText("y", this.gridXMargin + this.gridXtextMargin, this.gridYMargin + this.gridYtextMargin);
    }
    drawCoordinateSystem = () =>
    {
        this.drawXAxis();
        this.drawYAxis();
    }
    zoomCanvas(event)
    {

    }
    clickCanvas(event)
    {
        let _this = canvases.getCanvas('space');
        let clickX = event.clientX;
        let clickY = event.clientY;
        _this.objectSelected = null;
        for(let i = 0; i < _this.objectsToListen.length; i += 1)
        {
            let obSpace = _this.objectsToListen[i];
            if((obSpace.x + obSpace.radius > clickX && obSpace.x - obSpace.radius < clickX) && (obSpace.y + obSpace.radius > clickY && obSpace.y - obSpace.radius < clickY))
            {
                _this.objectSelected = obSpace;
                break;
            }
        }
    }
    hover(event)
    {
        let _this = canvases.getCanvas('space');
        let clickX = event.clientX;
        let clickY = event.clientY;
        if(_this.objectHovered && (!(_this.objectHovered.x + _this.objectHovered.radius > clickX && _this.objectHovered.x - _this.objectHovered.radius < clickX) || !(_this.objectHovered.y + _this.objectHovered.radius > clickY && _this.objectHovered.y - _this.objectHovered.radius < clickY)))
        {
            _this.objectHovered = null;
        }
        for(let i = 0; i < _this.objectsToListen.length; i += 1)
        {
            let obSpace = _this.objectsToListen[i];
            if((obSpace.x + obSpace.radius > clickX && obSpace.x - obSpace.radius < clickX) && (obSpace.y + obSpace.radius > clickY && obSpace.y - obSpace.radius < clickY))
            {
                _this.objectHovered = obSpace;
                break;
            }
        }
    }
    start()
    {
        this.running = true;
        // let timer = Math.floor(1000 /this.framerate); 
        this.interval = requestAnimationFrame(this.draw.bind(this));
    }
    end()
    {
        this.running = false;
        cancelAnimationFrame(this.interval);
    }

    drawSpaceObjectSelection = (sObject) =>
    {
        let size = sObject.radius * 4;
        this.ctxt.strokeStyle  = "rgba(255,255,255,0.7)";
        this.ctxt.beginPath();
        this.ctxt.rect(sObject.x - size /2, sObject.y - size/2, size,size);
        this.ctxt.rect(sObject.x - size /3, sObject.y - size/3, size/1.5,size/1.5);
        this.ctxt.stroke();
    }
    drawSpaceObjectGlow = (sObject) =>
    {
        sObject.glow();
        for(let j=0;j<sObject.glowingArray.length;j++)
        {
            this.ctxt.fillStyle = "rgba("+sObject.r+ ","
                                        +sObject.g+ ","
                                        +sObject.b+ ","
                                        +sObject.glowingArray[j].alpha+ ")";
            sObject.glowingArray[j].alpha -=0.01;
                                        
            this.ctxt.beginPath();
            this.ctxt.arc(sObject.x, sObject.y, sObject.glowingArray[j].distance, 0, 2 * Math.PI);
            this.ctxt.fill();
        }
    }
    drawSpaceObject = (sObject) =>
    {
        this.ctxt.fillStyle = sObject.color ? sObject.color: this.fColor;
        this.ctxt.beginPath();
        this.ctxt.arc(sObject.x, sObject.y, sObject.radius, 0, 2 * Math.PI);
        this.ctxt.fill();
    }
    draw()
    {
        this.interval = requestAnimationFrame(this.draw.bind(this));
        this.ctxt.fillStyle = this.bColor;
        this.ctxt.fillRect(0,0,this.width,this.height);

        for(let i = 0;i<this.objectsToListen.length;i++)
        {
            if(this.objectsToListen[i].glowing)
            {
                this.drawSpaceObjectGlow(this.objectsToListen[i]);
            }

            this.drawSpaceObject(this.objectsToListen[i]);
        }
        if(this.objectHovered)
        {
            this.drawSpaceObjectSelection(this.objectHovered);
        }
        if(this.objectSelected)
        {
            this.drawSpaceObjectSelection(this.objectSelected);
        }
        this.drawCoordinateSystem();
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