class Canvas
{

    constructor(id)
    {
        this.id = id;
        this.objectsToListen = [];
        this.objectsInView = [];
        this.objectSelected = null;
        this.objectCentered = null;
        this.objectHovered = null;
        this.canvOrigin = new Point(0,0);
        this.lastClicked = null;
        this.gridXMargin = 40;
        this.gridYMargin = 40;
        this.gridXtextMargin = 10;
        this.gridYtextMargin = 10;
        this.zoomRatio = 1;

        this.running = false;
        try
        {
            this.element = document.getElementById(this.id);
            if(this.element)
            {
                canvases.push(this);
                this.ctxt = this.element.getContext('2d');
                
                this.setFramerate(60);
                this.setSize(window.innerWidth ,window.innerHeight);
                this.canvWidth = this.width;
                this.canvHeight = this.height;
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
        return (x + this.canvOrigin.x - this.gridXMargin) / this.zoomRatio;
    }
    getTranslatedY = (y) =>
    {
        return (this.height + this.canvOrigin.y - this.gridYMargin - y ) / this.zoomRatio;
    }
    drawMinorXAxis = () =>
    {
        let power = Math.floor(getBaseLog(10,this.canvHeight - this.gridYMargin));
        let distance = Math.pow(10,power);
        let numberOfLines = Math.floor(this.canvHeight / distance);
        while(numberOfLines < 2)
        {
            power--;
            distance = Math.pow(10,power);
            numberOfLines = Math.floor(this.canvHeight / distance);
        }
        let start = Math.floor(this.canvOrigin.y / distance);
        for(let i = start; i <= start + numberOfLines;i+=1)
        {   
            this.ctxt.beginPath();
            this.ctxt.strokeStyle  = "rgba(255,255,255,0.3)";
            this.ctxt.rect(this.gridXMargin, (this.height - this.gridYMargin) - ((i+1) * distance - this.canvOrigin.y )*this.zoomRatio, this.width - this.gridXMargin, 1);
            this.ctxt.stroke();
            this.ctxt.font = '15px Consolas';
            this.ctxt.fillStyle  = "rgba(255,255,255,1)";
            this.ctxt.fillText((i+1) * distance, this.gridXtextMargin, (this.height - this.gridYMargin) -((i+1) * distance - this.canvOrigin.y ) *this.zoomRatio);
        }
    }
    drawMinorYAxis = () =>
    {
        let power = Math.floor(getBaseLog(10,this.canvWidth - this.gridXMargin));
        let distance = Math.pow(10,power);
        let numberOfLines = Math.floor(this.canvWidth / distance);
        while(numberOfLines < 2)
        {
            power--;
            distance = Math.pow(10,power);
            numberOfLines = Math.floor(this.canvWidth / distance);
        }
        let start = Math.floor(this.canvOrigin.x / distance);
        for(let i = start; i <= start + numberOfLines; i+=1)
        {   
            this.ctxt.beginPath();
            this.ctxt.strokeStyle  = "rgba(255,255,255,0.3)";
            this.ctxt.rect(this.gridXMargin + ((i+1) * distance - this.canvOrigin.x)*this.zoomRatio, 0, 1, this.height - this.gridYMargin);
            this.ctxt.stroke();
            this.ctxt.font = '15px Consolas';
            this.ctxt.fillStyle  = "rgba(255,255,255,1)";
            this.ctxt.fillText((i+1) * distance, this.gridXMargin +  ((i+1) * distance - this.gridXtextMargin - this.canvOrigin.x) * this.zoomRatio, this.height - this.gridYtextMargin);
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
    zoomOutCanvas = (value,x,y) =>
    {
        this.zoomRatio = this.zoomRatio - this.zoomRatio*value/1200;
        this.canvWidth = this.width / this.zoomRatio;
        this.canvHeight = this.height / this.zoomRatio;
    }
    zoomInCanvas = (value,x,y) =>
    {
        this.zoomRatio += this.zoomRatio*value/1200;
        this.canvWidth = this.width / this.zoomRatio;
        this.canvHeight = this.height / this.zoomRatio;
    }
    zoomCanvas = (event) =>
    {

        if(event.wheelDelta > 0)
        {
            this.zoomInCanvas(event.wheelDelta,this.getTranslatedX(event.clientX),this.getTranslatedY(event.clientY));
        }
        else
        {
            this.zoomOutCanvas(-event.wheelDelta,this.getTranslatedX(event.clientX),this.getTranslatedY(event.clientY));
        }
    }
    clickCanvas(event)
    {
        let _this = canvases.getCanvas('space');
        let clickX = event.clientX;
        let clickY = event.clientY;
        _this.objectSelected = null;
        _this.objectCentered = null;
        for(let i = 0; i < _this.objectsToListen.length; i += 1)
        {
            let obSpace = _this.objectsToListen[i];
            if((obSpace.x + obSpace.radius > _this.getTranslatedX(clickX) && obSpace.x - obSpace.radius < _this.getTranslatedX(clickX)) && (obSpace.y + obSpace.radius > _this.getTranslatedY(clickY) && obSpace.y - obSpace.radius < _this.getTranslatedY(clickY)))
            {
                _this.objectSelected = obSpace;
                _this.objectCentered = obSpace;
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
        _this.canvOrigin.x = _this.canvOrigin.x + (_this.lastClicked.x - event.clientX) * this.canvWidth / this.width;
        _this.canvOrigin.y = _this.canvOrigin.y - (_this.lastClicked.y - event.clientY) * this.canvHeight / this.height;
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
        if(_this.objectHovered && (!(_this.objectHovered.x + _this.objectHovered.radius > _this.getTranslatedX(clickX) && _this.objectHovered.x - _this.objectHovered.radius < _this.getTranslatedX(clickX)) || !(_this.objectHovered.y + _this.objectHovered.radius > _this.getTranslatedY(clickY) && _this.objectHovered.y - _this.objectHovered.radius < _this.getTranslatedY(clickY))))
        {
            _this.objectHovered = null;
        }
        for(let i = 0; i < _this.objectsToListen.length; i += 1)
        {
            let obSpace = _this.objectsToListen[i];
            if((obSpace.x + obSpace.radius > _this.getTranslatedX(clickX) && obSpace.x - obSpace.radius < _this.getTranslatedX(clickX)) && (obSpace.y + obSpace.radius > _this.getTranslatedY(clickY) && obSpace.y - obSpace.radius < _this.getTranslatedY(clickY)))
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
        this.ctxt.rect(sObject.x - this.canvOrigin.x + this.gridXMargin - size /2, this.height - (sObject.y - this.canvOrigin.y + this.gridYMargin) - size/2, size,size);
        this.ctxt.rect(sObject.x - this.canvOrigin.x + this.gridXMargin - size /3, this.height - (sObject.y - this.canvOrigin.y + this.gridYMargin)  - size/3, size/1.5,size/1.5);
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
            this.ctxt.arc((sObject.x - this.canvOrigin.x) * this.zoomRatio + this.gridXMargin, (this.height - this.gridYMargin) - (sObject.y - this.canvOrigin.y) * this.zoomRatio, sObject.glowingArray[j].distance * this.zoomRatio, 0, 2 * Math.PI);
            this.ctxt.fill();
        }
    }
    drawSpaceObject = (sObject) =>
    {
        this.ctxt.fillStyle = sObject.color ? sObject.color: this.fColor;
        this.ctxt.beginPath();
        this.ctxt.arc((sObject.x - this.canvOrigin.x) * this.zoomRatio + this.gridXMargin, (this.height - this.gridYMargin) - (sObject.y - this.canvOrigin.y) * this.zoomRatio, sObject.radius * this.zoomRatio, 0, 2 * Math.PI);
        this.ctxt.fill();
    }
    drawPlaceholderSpaceObject = (sObject) =>
    {
        this.ctxt.beginPath();
        this.ctxt.fillStyle = "rgb("+255+","+ (Universe.heaviestObject.mass - sObject.mass) * 255+"," + (Universe.heaviestObject.mass - sObject.mass) * 255+")";
        this.ctxt.arc((sObject.x - this.canvOrigin.x) * this.zoomRatio + this.gridXMargin, (this.height - this.gridYMargin) - (sObject.y - this.canvOrigin.y) * this.zoomRatio, 2, 0, 2 * Math.PI);
        this.ctxt.fill();
    }
    draw = () =>
    {
        this.interval = requestAnimationFrame(this.draw.bind(this));
        this.ctxt.fillStyle = this.bColor;
        this.ctxt.fillRect(0,0,this.width,this.height);

        for(let i = 0;i<this.objectsToListen.length;i++)
        {
            if((this.objectsToListen[i].x > this.canvOrigin.x && this.objectsToListen[i].x < this.canvOrigin.x + this.canvWidth) &&
            (this.objectsToListen[i].y > this.canvOrigin.y && this.objectsToListen[i].y < this.canvOrigin.y + this.canvHeight))
            {
                if(this.objectsToListen[i].radius> this.canvHeight / 1000)
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
        }
        if(this.objectHovered)
        {
            this.drawSpaceObjectSelection(this.objectHovered);
        }
        if(this.objectSelected)
        {
            this.drawSpaceObjectSelection(this.objectSelected);
        }
        if(this.objectCentered)
        {
            this.canvOrigin.x = this.objectCentered.x - this.canvWidth/2;
            this.canvOrigin.y = this.objectCentered.y - this.canvHeight/2;
        }
        this.drawCoordinateSystem();
        Recorder.record(this.ctxt, this.width, this.height);
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