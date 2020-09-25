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
    for(let i=0;i<20;i++)
    {
        let asteroid = new Asteroid(i);
        
        asteroid.setDensity(0.01);
        asteroid.setColor(Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255),1);
        asteroid.setPositionX(Math.random()*space.width);
        asteroid.setPositionY(Math.random()*space.height);
        if(asteroid.y < space.height/2 && asteroid.x > space.width/2)
        {
            asteroid.setVelocityX(-Math.random() * 2);
            asteroid.setVelocityY(-Math.random() * 1);
        }
        else if(asteroid.y < space.height/2 && asteroid.x < space.width/2)
        {
            asteroid.setVelocityX(-Math.random() * 1);
            asteroid.setVelocityY(Math.random() * 2);
        }
        else if (asteroid.y > space.height/2 && asteroid.x > space.width/2)
        {
            asteroid.setVelocityX(Math.random() * 1);
            asteroid.setVelocityY(-Math.random() * 2);
        }
        else {
            asteroid.setVelocityX(Math.random() * 2);
            asteroid.setVelocityY(Math.random() * 1);
        }

        asteroid.setMass(5+ Math.random()*10 * (10 /Math.abs(asteroid.x-space.width/2)) * (10 /Math.abs(asteroid.y-space.height/2)));
        

    
        //asteroid.setVelocityX((Math.floor(Math.random()*2) -Math.floor(Math.random()*2))*Math.random()*1 * 0.1);
        //asteroid.setVelocityY((Math.floor(Math.random()*2) -Math.floor(Math.random()*2))*Math.random()*1 * 0.1);
    }

    // for(let i=0;i<1000;i++)
    // {
    //     let object = new Asteroid(i);
    //     object.setMass(Math.random()*10)
    //     object.setDensity(0.01);
    //     object.setColor("")
    // }
    let sun = new Asteroid(0);
    sun.setMass(250);
    sun.setDensity(0.001);
    sun.setColor(255,255,0,1);
    sun.setPositionX(500);
    sun.setPositionY(450);

    // let satellite1 = new Asteroid(1);
    // satellite1.setMass(0.01);
    // satellite1.setDensity(0.000001);
    // satellite1.setColor(255,0,0,1);
    // satellite1.setPositionX(500);
    // satellite1.setPositionY(200);
    // satellite1.setVelocityX(1);

    // let satellite2 = new Asteroid(1);
    // satellite2.setMass(0.01);
    // satellite2.setDensity(0.000001);
    // satellite2.setColor(255,127,0,1);
    // satellite2.setPositionX(500);
    // satellite2.setPositionY(300);
    // satellite2.setVelocityX(1.29);

    // let satellite = new Asteroid(2);
    // satellite.setMass(0.1);
    // satellite.setDensity(0.001);
    // satellite.setColor('rgb(255,127,0)');
    // satellite.setPositionX(800);
    // satellite.setPositionY(350);
    // satellite.setVelocityX(1.58);

    
    // let satellite2 = new Asteroid(3);
    // satellite2.setMass(0.1);
    // satellite2.setDensity(0.001);
    // satellite2.setColor('rgb(0,0,255)');
    // satellite2.setPositionX(800);
    // satellite2.setPositionY(300);
    // satellite2.setVelocityX(-1.29);

    // let satellite3 = new Asteroid(3);
    // satellite3.setMass(0.1);
    // satellite3.setDensity(0.001);
    // satellite3.setColor('rgb(255,0,0)');
    // satellite3.setPositionX(800);
    // satellite3.setPositionY(250);
    // satellite3.setVelocityX(1.118);

    // let satellite4 = new Asteroid(3);
    // satellite4.setMass(0.1);
    // satellite4.setDensity(0.0001);
    // satellite4.setColor('rgb(255,0,0)');
    // satellite4.setPositionX(800);
    // satellite4.setPositionY(200);
    // satellite4.setVelocityX(-1);




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
    Universe.setListenerObjects(objects);


    Universe.start();
    space.start();
    //console.log(canvases.getCanvas('radar'));
}
setTimeout(()=>
{
    initialize();

},100);
