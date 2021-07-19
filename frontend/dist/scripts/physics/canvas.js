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
        this.canvOrigin = new Point(0,0);
        this.lastClicked = null;
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
    getTranslatedX = (x) =>
    {

    }
    getTranslatedY = (y) =>
    {
        
    }
    drawMinorXAxis = () =>
    {
        let power = Math.floor(getBaseLog(10,this.height));
        let distance = Math.pow(10,power);
        let numberOfLines = Math.floor(this.height / distance);
        while(numberOfLines < 2)
        {
            power--;
            distance = Math.pow(10,power);
            numberOfLines = Math.floor(this.height / distance);
        }
        for(let i=0;i<numberOfLines;i++)
        {   
            this.ctxt.beginPath();
            this.ctxt.strokeStyle  = "rgba(255,255,255,0.3)";
            this.ctxt.rect(this.gridXMargin, this.height - (i+1) * distance + this.canvOrigin.y - this.gridYMargin, this.width - this.gridXMargin, 1);
            this.ctxt.stroke();
            this.ctxt.font = '15px Consolas';
            this.ctxt.fillStyle  = "rgba(255,255,255,1)";
            this.ctxt.fillText((i+1) * distance, this.gridXtextMargin, this.height - (i+1) * distance + this.canvOrigin.y - this.gridYMargin);
        }
    }
    drawMinorYAxis = () =>
    {
        let power = Math.floor(getBaseLog(10,this.width));
        let distance = Math.pow(10,power);
        let numberOfLines = Math.floor(this.width / distance);
        while(numberOfLines < 2)
        {
            power--;
            distance = Math.pow(10,power);
            numberOfLines = Math.floor(this.width / distance);
        }
        for(let i=0;i<numberOfLines;i++)
        {   
            this.ctxt.beginPath();
            this.ctxt.strokeStyle  = "rgba(255,255,255,0.3)";
            this.ctxt.rect(this.gridXMargin + (i+1) * distance - this.canvOrigin.x, 0, 1, this.height - this.gridYMargin);
            this.ctxt.stroke();
            this.ctxt.font = '15px Consolas';
            this.ctxt.fillStyle  = "rgba(255,255,255,1)";
            this.ctxt.fillText((i+1) * distance, this.gridXMargin + (i+1) * distance - this.gridXtextMargin - this.canvOrigin.x, this.height - this.gridYtextMargin);
        }
    }
    drawOriginPoint = () =>
    {
        this.ctxt.beginPath();
        this.ctxt.font = '20px Consolas';
        this.ctxt.fillStyle  = "rgba(255,255,255,1)";
        this.ctxt.fillText(this.canvOrigin.x, this.gridXMargin + this.gridXtextMargin, this.height - this.gridYtextMargin);
        this.ctxt.fillText(this.canvOrigin.y, this.gridXtextMargin, this.height - this.gridYMargin - this.gridYtextMargin);
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
        this.drawMinorYAxis();
        this.drawYAxis();
        this.drawMinorXAxis();
        this.drawOriginPoint();
    }
    zoomOutCanvas(event)
    {

    }
    zoomInCanvas(event)
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
        let point = new Point(clickX,clickY);
        _this.lastClicked = point;
        _this.element.addEventListener("mousemove", _this.moveMap);
        _this.element.addEventListener("mouseup", _this.removeMove);
    }
    moveMap = (event) =>
    {
        let _this = canvases.getCanvas('space');
        _this.canvOrigin.x = _this.canvOrigin.x + (_this.lastClicked.x - event.clientX);
        _this.canvOrigin.y = _this.canvOrigin.y - (_this.lastClicked.y - event.clientY);
        let point = new Point(event.clientX,event.clientY);
        _this.lastClicked = point;
    }
    removeMove = (event) =>
    {
        let _this = canvases.getCanvas('space');
        _this.element.removeEventListener("mousemove", _this.moveMap);
        _this.element.removeEventListener('mouseup', _this.removeMove);
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
            this.ctxt.arc(sObject.x - this.canvOrigin.x + this.gridXMargin, this.height - (sObject.y - this.canvOrigin.y + this.gridYMargin), sObject.glowingArray[j].distance, 0, 2 * Math.PI);
            this.ctxt.fill();
        }
    }
    drawSpaceObject = (sObject) =>
    {
        this.ctxt.fillStyle = sObject.color ? sObject.color: this.fColor;
        this.ctxt.beginPath();
        this.ctxt.arc(sObject.x - this.canvOrigin.x + this.gridXMargin, this.height - (sObject.y - this.canvOrigin.y + this.gridYMargin), sObject.radius, 0, 2 * Math.PI);
        this.ctxt.fill();
    }
    drawPlaceholderSpaceObject = (sObject) =>
    {
        this.ctxt.fillStyle = "rgb("+255+","+ sObject.g / sObject.mass * Universe.heaviestObject.mass+","+sObject.b / sObject.mass * Universe.heaviestObject.mass+")";
        this.ctxt.beginPath();
        this.ctxt.arc(sObject.x - this.canvOrigin.x  + this.gridXMargin, this.height - (sObject.y - this.canvOrigin.y + this.gridYMargin), sObject.radius, 0, 2 * Math.PI);
        this.ctxt.fill();
    }
    draw()
    {
        this.interval = requestAnimationFrame(this.draw.bind(this));
        this.ctxt.fillStyle = this.bColor;
        this.ctxt.fillRect(0,0,this.width,this.height);

        for(let i = 0;i<this.objectsToListen.length;i++)
        {
            if(this.objectsToListen[i].radius> this.height / 1000)
            {
                if(this.objectsToListen[i].glowing)
                {
                    this.drawSpaceObjectGlow(this.objectsToListen[i]);
                }
                this.drawSpaceObject(this.objectsToListen[i]);
            }
            else
            {
                this.drawPlaceholderSpaceObject(this.objectsToListen[i]);
            }

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