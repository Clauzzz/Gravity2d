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
Array.prototype.listenerObjects = [];


function removeObjectFromAll(objectToRemove)
{
    for(let i=0;i<objects.listenerObjects.length;i++)
    {
        for(let j=0; j<objects.listenerObjects[i].objectsToListen.length;j++)
        {
            if(objects.listenerObjects[i].objectsToListen[j].id == objectToRemove.id)
            {
                objects.listenerObjects[i].objectsToListen.splice(j,1);
                j--;
            }
        }
    }
}
function initialize()
{
    let space = new Canvas('space');
    let universe = new Universe();
    for(let i=0;i<10;i++)
    {
        let asteroid = new Asteroid(i);
        asteroid.setMass(Math.random()*2+5);
        asteroid.setDensity(Math.random()*0.01);
        asteroid.setColor('rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')');
        asteroid.setPositionX(Math.random()*space.width);
        asteroid.setPositionY(Math.random()*space.height);
    }
    /*let asteroid1 = new Asteroid(1);
    let asteroid2 = new Asteroid(2);
    asteroid1.setMass(Math.random()*2+5);
    asteroid1.setDensity(Math.random()*0.001);
    asteroid1.setColor('rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')');
    asteroid1.setPositionX(300);
    asteroid1.setPositionY(200);

    asteroid2.setMass(Math.random()*2+5);
    asteroid2.setDensity(Math.random()*0.001);
    asteroid2.setColor('rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')');
    asteroid2.setPositionX(700);
    asteroid2.setPositionY(500);
    */
    space.setListenerObjects(objects);
    universe.setListenerObjects(objects);


    universe.start();
    space.start();
    //console.log(canvases.getCanvas('radar'));
}
setTimeout(()=>
{
    initialize();

},2000);
