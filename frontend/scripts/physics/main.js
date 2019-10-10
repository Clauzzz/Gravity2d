// Global variables
canvases = [];
objects = [];

Array.prototype.getCanvas = (id)=>
{
    for(let i=0;i<canvases.length;i++)
    {
        if(canvases[i].id === id)
        {
            return canvases[i];
        }
    }
    return null;
}
Array.prototype.getObject = (id)=>
{
    for(let i=0; i<object.length;i++)
    {
        if(objects[i].id === id)
        {
            return objects[i];
        }
    }
    return null;
}



function initialize()
{
    let space = new Canvas('space');
    space.setBackgroundColor('rgba(255,0,0,1)');
    space.start();
    console.log(space);
    //console.log(canvases.getCanvas('radar'));
}
setTimeout(()=>
{
    initialize();

},2000);
