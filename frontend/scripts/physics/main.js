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
function initialize()
{
    new Canvas('space');
    new Canvas('radar');
    console.log(canvases.getCanvas('radar'));
}
setTimeout(()=>
{
    initialize();

},1000);
