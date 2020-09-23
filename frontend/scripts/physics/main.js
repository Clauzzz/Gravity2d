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
    /*for(let i=0;i<2;i++)
    {
        let asteroid = new Asteroid(i);
        asteroid.setMass(Math.random()*1);
        asteroid.setDensity(0.001);
        asteroid.setColor('rgb(255,235,205)');
        //asteroid.setColor('rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')');
        asteroid.setPositionX(Math.random()*space.width);
        asteroid.setPositionY(Math.random()*space.height);
        asteroid.setVelocityX((Math.floor(Math.random()*2) -Math.floor(Math.random()*2))*Math.random()*2);
        asteroid.setVelocityY((Math.floor(Math.random()*2) -Math.floor(Math.random()*2))*Math.random()*2);
    }*/
    let sun = new Asteroid(0);
    sun.setMass(250);
    sun.setDensity(0.001);
    sun.setColor('rgb(255,255,0)');
    sun.setPositionX(800);
    sun.setPositionY(450);

    let jupiter = new Asteroid(1);
    jupiter.setMass(10);
    jupiter.setDensity(0.01);
    jupiter.setColor('rgb(255,127,0)');
    jupiter.setPositionX(800);
    jupiter.setPositionY(75);
    jupiter.setVelocityX(0.75);

    let satellite = new Asteroid(2);
    satellite.setMass(0.1);
    satellite.setDensity(0.001);
    satellite.setColor('rgb(255,0,0)');
    satellite.setPositionX(800);
    satellite.setPositionY(50);
    satellite.setVelocityX(1.40);




    // let asteroid1 = new Asteroid(1);
    // let asteroid2 = new Asteroid(2);
    // asteroid1.setMass(Math.random()*5+25);
    // asteroid1.setDensity(Math.random()*0.01);
    // asteroid1.setColor('rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')');
    // asteroid1.setPositionX(600);
    // asteroid1.setPositionY(350);

    // asteroid2.setMass(Math.random()*1+2);
    // asteroid2.setDensity(Math.random()*0.01);
    // asteroid2.setColor('rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')');
    // asteroid2.setPositionX(600);
    // asteroid2.setPositionY(250);
    // asteroid2.setVelocityX(0.4);
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
