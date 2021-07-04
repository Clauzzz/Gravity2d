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
function createObject()
{
    let massField = document.getElementById('mass_field');
    let densityField = document.getElementById('density_field');
    let redColorField = document.getElementById('red_field');
    let greenColorField = document.getElementById('green_field');
    let blueColorField = document.getElementById('blue_field');
    let positionXField = document.getElementById('positionx_field');
    let positionYField = document.getElementById('positiony_field');
    let velocityXField = document.getElementById('velocityx_field');
    let velocityYField = document.getElementById('velocityy_field');

    let satellite2 = new SpaceObject(Math.random()*999999);
    massField.value == Number(massField.value) ? satellite2.setMass(Number(massField.value)) : null;
    densityField.value == Number(densityField.value) ? satellite2.setDensity(Number(densityField.value)) : null;
    redColorField.value == Number(redColorField.value) &&
    greenColorField.value == Number(greenColorField.value) &&
    blueColorField.value == Number(blueColorField.value) 
    ? satellite2.setColor('rgb('+ Number(redColorField.value) +','+ Number(greenColorField.value)+','+ Number(blueColorField.value)+')') :
    satellite2.setColor('rgb(0,0,0)');
    positionXField.value == Number(positionXField.value) ? satellite2.setPositionX(Number(positionXField.value)) : null;
    positionYField.value == Number(positionYField.value) ? satellite2.setPositionY(Number(positionYField.value)) : null;
    velocityXField.value == Number(velocityXField.value) ? satellite2.setVelocityX(Number(velocityXField.value)) : null;
    velocityYField.value == Number(velocityYField.value) ? satellite2.setVelocityY(Number(velocityYField.value)) : null;
}
function initialize()
{
    let space = new Canvas('space');
    let universe = new Universe();

    space.setListenerObjects(objects);
    universe.setListenerObjects(objects);

    universe.start();
    space.start();
    
    document.getElementById('createButton').addEventListener("click",createObject);
}
setTimeout(()=>
{
    initialize();

},1000);
