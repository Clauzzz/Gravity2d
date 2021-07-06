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

    let spaceObject = new SpaceObject(Math.random()*999999);
    massField.value == Number(massField.value) ? spaceObject.setMass(Number(massField.value)) : null;
    densityField.value == Number(densityField.value) ? spaceObject.setDensity(Number(densityField.value)) : null;
    redColorField.value == Number(redColorField.value) &&
    greenColorField.value == Number(greenColorField.value) &&
    blueColorField.value == Number(blueColorField.value) 
    ? spaceObject.setColor(Number(redColorField.value),Number(greenColorField.value),Number(blueColorField.value),1) :
    spaceObject.setColor(0,0,0,1);
    positionXField.value == Number(positionXField.value) ? spaceObject.setPositionX(Number(positionXField.value)) : null;
    positionYField.value == Number(positionYField.value) ? spaceObject.setPositionY(Number(positionYField.value)) : null;
    velocityXField.value == Number(velocityXField.value) ? spaceObject.setVelocityX(Number(velocityXField.value)) : null;
    velocityYField.value == Number(velocityYField.value) ? spaceObject.setVelocityY(Number(velocityYField.value)) : null;
    spaceObject.glowing = true;
}
function generate()
{
    const number = 100;
    for(let i=0; i<number;i+=1)
    {
        let spaceObject = new SpaceObject(Math.random()*999999);
        spaceObject.setMass(Math.random()*0.01);
        spaceObject.setDensity(0.00001 + Math.random()/10000);
        spaceObject.setColor(Math.random()*255,Math.random()*255,Math.random()*255,1);
        spaceObject.setPositionX(canvases.getCanvas('space').width * Math.random());
        spaceObject.setPositionY(canvases.getCanvas('space').height * Math.random());
        spaceObject.setVelocityX(Math.random()>0.5?-1*Math.random():Math.random());
        spaceObject.setVelocityY(Math.random()>0.5?-1*Math.random():Math.random());
        spaceObject.glowing = true;
    }
}
function generateSolar()
{
    let sun = new SpaceObject(Math.random()*999999);
    sun.setMass(10);
    sun.setDensity(0.001);
    sun.setColor(255,255,0,1);
    sun.setPositionX(canvases.getCanvas('space').width/2);
    sun.setPositionY(canvases.getCanvas('space').height/2);
    sun.glowing = true;

    let mercury = new SpaceObject(Math.random()*999999);
    mercury.setMass(0.01);
    mercury.setDensity(0.00005);
    mercury.setColor(66,35,13,1);
    mercury.setPositionX(canvases.getCanvas('space').width/2);
    mercury.setPositionY(canvases.getCanvas('space').height/2 - 50);
    mercury.setVelocityX(0.44721); // Math.sqrt( sunMass / distance )
    mercury.glowing = true;

    let venus = new SpaceObject(Math.random()*999999);
    venus.setMass(0.02);
    venus.setDensity(0.00005);
    venus.setColor(255,193,148,1);
    venus.setPositionX(canvases.getCanvas('space').width/2);
    venus.setPositionY(canvases.getCanvas('space').height/2 -100);
    venus.setVelocityX(0.31622); // Math.sqrt( sunMass / distance )
    venus.glowing = true;

    let earth = new SpaceObject(Math.random()*999999);
    earth.setMass(0.02);
    earth.setDensity(0.00002);
    earth.setColor(65,142,224,1);
    earth.setPositionX(canvases.getCanvas('space').width/2);
    earth.setPositionY(canvases.getCanvas('space').height/2 -150);
    earth.setVelocityX(0.25819); // Math.sqrt( sunMass / distance )
    earth.glowing = true;

    let mars = new SpaceObject(Math.random()*999999);
    mars.setMass(0.01);
    mars.setDensity(0.00005);
    mars.setColor(237,81,50,1);
    mars.setPositionX(canvases.getCanvas('space').width/2);
    mars.setPositionY(canvases.getCanvas('space').height/2 -200);
    mars.setVelocityX(0.22360); // Math.sqrt( sunMass / distance )
    mars.glowing = true;
}
function initialize()
{
    let space = new Canvas('space');

    space.setListenerObjects(objects);
    Universe.setListenerObjects(objects);

    Universe.start();
    space.start();
    
    document.getElementById('createButton').addEventListener("click",createObject);
    document.getElementById('generateButton').addEventListener("click",generate);
    document.getElementById('solarButton').addEventListener("click",generateSolar);
}
setTimeout(()=>
{
    initialize();

},100);
