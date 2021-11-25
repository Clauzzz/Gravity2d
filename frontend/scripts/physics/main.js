// Global variables
canvases = [];
objects = [];
panelOpen = true;

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

function getBaseLog(x,y)
{
    return Math.log(y) / Math.log(x);
}

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
    Universe.calculateHeaviestObject();
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
    }
    Universe.calculateHeaviestObject();
}
function generateSolar()
{
    let sun = new SpaceObject("Sun");
    sun.setMass(10);
    sun.setDensity(0.001);
    sun.setColor(255,255,0,1);
    sun.setPositionX(500);
    sun.setPositionY(500);
    sun.glowing = true;

    let mercury = new SpaceObject("Mercury");
    mercury.setMass(0.01);
    mercury.setDensity(0.00005);
    mercury.setColor(66,35,13,1);
    mercury.setPositionX(500);
    mercury.setPositionY(450);
    mercury.setVelocityX(0.44721); // Math.sqrt( sunMass / distance )
    mercury.glowing = true;

    let venus = new SpaceObject("Venus");
    venus.setMass(0.02);
    venus.setDensity(0.00005);
    venus.setColor(255,193,148,1);
    venus.setPositionX(500);
    venus.setPositionY(400);
    venus.setVelocityX(0.31622); // Math.sqrt( sunMass / distance )
    venus.glowing = true;

    let earth = new SpaceObject("Earth");
    earth.setMass(0.02);
    earth.setDensity(0.00002);
    earth.setColor(65,142,224,1);
    earth.setPositionX(500);
    earth.setPositionY(350);
    earth.setVelocityX(0.25819); // Math.sqrt( sunMass / distance )
    earth.glowing = true;

    let mars = new SpaceObject("Mars");
    mars.setMass(0.01);
    mars.setDensity(0.00005);
    mars.setColor(237,81,50,1);
    mars.setPositionX(500);
    mars.setPositionY(300);
    mars.setVelocityX(0.22360); // Math.sqrt( sunMass / distance )
    mars.glowing = true;
    Universe.calculateHeaviestObject();
}
function generateSatelliteSystem()
{
    let star = new SpaceObject(Math.random()*999999);
    star.setMass(10);
    star.setDensity(0.001);
    star.setColor(255,255,0,1);
    star.setPositionX(canvases.getCanvas('space').width/2);
    star.setPositionY(canvases.getCanvas('space').height/2);
    star.setVelocityX(-0.02032); // Math.sqrt( starMass / distance )
    star.glowing = true;

    let planet = new SpaceObject(Math.random()*999999);
    planet.setMass(1);
    planet.setDensity(0.0005);
    planet.setColor(65,142,224,1);
    planet.setPositionX(canvases.getCanvas('space').width/2);
    planet.setPositionY(canvases.getCanvas('space').height/2 - 200);
    planet.setVelocityX(0.20327); // Math.sqrt( starMass / distance )
    planet.glowing = true;

    let satellite = new SpaceObject(Math.random()*999999);
    satellite.setMass(0.00001);
    satellite.setDensity(0.0000005);
    satellite.setColor(200,200,200,1);
    satellite.setPositionX(canvases.getCanvas('space').width/2);
    satellite.setPositionY(canvases.getCanvas('space').height/2 - 220);
    satellite.setVelocityX(0.42687); // Math.sqrt( sunMass / distance )
    satellite.glowing = true;
    Universe.calculateHeaviestObject();
}
function togglePanel() {
    let panel = document.getElementById('controlPanel');
    let arrow = document.getElementById('container_arrow');
    if(panelOpen) {
        panel.style.animationName = 'slideRight';
        arrow.style.animationName = 'rotateLeft';
    } else {
        panel.style.animationName = 'slideLeft';
        arrow.style.animationName = 'rotateRight';
    }
    panelOpen = !panelOpen;
}
function realisticSolar()
{
    let sun = new SpaceObject('Sun');
    sun.setMass(19885); // should be 1.9885 * 10^30 kg
    sun.setDensity(0.0001408); // is 1.408 g/cm3
    // radius will be 323.0562223871842 which is 695,700 km
    // 1 px = 2153.495124963731 km
    sun.setColor(255,255,0,1);
    sun.setPositionX(0);
    sun.setPositionY(0);
    sun.glowing = true;

    let mercury = new SpaceObject('Mercury');
    mercury.setMass(0.0033011); // 3.3011×10^23 kg
    mercury.setDensity(0.0005427); // radius will be 0.09236838643680473 which is 695,700 km
    // 1 km = 2.415777832399023e-4 pixels
    mercury.setColor(255,255,0,1);
    mercury.setPositionX(0);
    mercury.setPositionY(26890.7288); // should 57 909 050 km = 0.387098 AU
    mercury.setVelocityX(Math.sqrt(sun.mass/mercury.y));

    let venus = new SpaceObject('Venus');
    venus.setMass(0.048675); // 4.8675×10^24 kg
    venus.setDensity(0.0005243);

    venus.setColor(255,255,0,1);
    venus.setPositionX(0);
    venus.setPositionY(49908.1725); // should 108 208 000 km = 0.723332 AU
    venus.setVelocityX(Math.sqrt(sun.mass/venus.y));

    let earth = new SpaceObject('Earth');
    earth.setMass(0.059725); // 4.8675×10^24 kg
    earth.setDensity(0.0005243);

    earth.setColor(255,255,0,1);
    earth.setPositionX(0);
    earth.setPositionY(69316.9); // should 108 208 000 km = 0.723332 AU
    earth.setVelocityX(Math.sqrt(sun.mass/earth.y));

    let mars = new SpaceObject('Mars');
    mars.setMass(0.00639);
    mars.setColor(255,127,0,1);
    mars.setPositionX(0);
    mars.setPositionY(105361.69)
    mars.setVelocityX(Math.sqrt(sun.mass/mars.y));
    
    let jupiter = new SpaceObject('Jupiter');
    jupiter.setMass(18.98);
    jupiter.setDensity(0.0001243);
    jupiter.setColor(255,127,0,1);
    jupiter.setPositionX(0);
    jupiter.setPositionY(361329.26)
    jupiter.setVelocityX(Math.sqrt(sun.mass/jupiter.y));

    let saturn = new SpaceObject('Saturn');
    saturn.setMass(5.683);
    saturn.setDensity(0.0001243);
    saturn.setColor(255,127,0,1);
    saturn.setPositionX(0);
    saturn.setPositionY(684851.03)
    saturn.setVelocityX(Math.sqrt(sun.mass/saturn.y));

    let uranus = new SpaceObject('Uranus');
    uranus.setMass(0.8681);
    uranus.setDensity(0.0001243);
    uranus.setColor(255,127,0,1);
    uranus.setPositionX(0);
    uranus.setPositionY(1326263.47)
    uranus.setVelocityX(Math.sqrt(sun.mass/uranus.y));
    
    let neptune = new SpaceObject('Neptune');
    neptune.setMass(1.024);
    neptune.setDensity(0.0001243);
    neptune.setColor(255,127,0,1);
    neptune.setPositionX(0);
    neptune.setPositionY(2079507.18)
    neptune.setVelocityX(Math.sqrt(sun.mass/neptune.y));
    
    Universe.calculateHeaviestObject();
}
function generateSpiralRight()
{
    const number = 500;
    Universe.calculateHeaviestObject();

    if(Universe.heaviestObject.id)
    {
        for(let i=0; i<number;i+=1)
        {
            let spaceObject = new SpaceObject(Math.random()*999999);
            spaceObject.setMass(Math.random()*0.01);
            spaceObject.setDensity(0.00001 + Math.random()/100000);
            spaceObject.setColor(Math.random()*255,Math.random()*255,Math.random()*255,1);
            spaceObject.setPositionX(Universe.heaviestObject.x+ (Math.random()*2 - 1) *canvases.getCanvas('space').width*Math.sqrt(Universe.heaviestObject.mass)/10);
            spaceObject.setPositionY(Universe.heaviestObject.y+ (Math.random()*2 - 1) *canvases.getCanvas('space').width*Math.sqrt(Universe.heaviestObject.mass)/10);
            //spaceObject.glowing = true; // this makes everything laggy for many objects

            let d = Math.sqrt(Math.pow((spaceObject.x - Universe.heaviestObject.x),2) + Math.pow((spaceObject.y - Universe.heaviestObject.y),2));
            let orbitalVelocity = Math.sqrt(Universe.heaviestObject.mass /d);
            let angle = Math.asin(Math.abs(spaceObject.x - Universe.heaviestObject.x)/d);
            angle = Math.PI/2 - angle;
            if(spaceObject.x < Universe.heaviestObject.x)
            {
                spaceObject.setVelocityY(-Math.cos(angle)*orbitalVelocity);
            }
            else
            {
                spaceObject.setVelocityY(Math.cos(angle)*orbitalVelocity);
            }
            if(spaceObject.y < Universe.heaviestObject.y)
            {
                spaceObject.setVelocityX(Math.sin(angle)*orbitalVelocity);
            }
            else
            {
                spaceObject.setVelocityX(-Math.sin(angle)*orbitalVelocity);
            }
        }
    }

}
function clearAll()
{
    let space = new Canvas('space');
    objects = [];
    canvases[0].setListenerObjects(objects);
    Universe.setListenerObjects(objects);
}
function initialize()
{
    let space = new Canvas('space');

    space.setListenerObjects(objects);
    Universe.setListenerObjects(objects);

    Universe.start();
    space.start();
    createObject();
    generateSpiralRight();
    space.element.addEventListener("mousedown",space.clickCanvas);
    space.element.addEventListener("mousewheel",space.zoomCanvas);
    space.element.addEventListener("mousemove",space.hover);
    document.getElementById('createButton').addEventListener("click",createObject);
    document.getElementById('generateButton').addEventListener("click",generate);
    document.getElementById('solarButton').addEventListener("click",generateSolar);
    document.getElementById('satelliteButton').addEventListener("click",generateSatelliteSystem);
    document.getElementById('spiralButton').addEventListener("click",generateSpiralRight);
    document.getElementById('realisticButton').addEventListener("click",realisticSolar);
    document.getElementById('container_handler').addEventListener('click',togglePanel);
    document.getElementById('clearButton').addEventListener("click", clearAll);
}
setTimeout(()=>
{
    initialize();

},100);
