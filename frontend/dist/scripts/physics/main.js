function removeObjectFromAll(e){for(let t=0;t<objects.listenerObjects.length;t++)for(let l=0;l<objects.listenerObjects[t].objectsToListen.length;l++)objects.listenerObjects[t].objectsToListen[l].id==e.id&&(objects.listenerObjects[t].objectsToListen.splice(l,1),l--)}function createObject(){let e=document.getElementById("mass_field"),t=document.getElementById("density_field"),l=document.getElementById("red_field"),n=document.getElementById("green_field"),u=document.getElementById("blue_field"),s=document.getElementById("positionx_field"),r=document.getElementById("positiony_field"),o=document.getElementById("velocityx_field"),a=document.getElementById("velocityy_field"),i=new SpaceObject(999999*Math.random());e.value==Number(e.value)&&i.setMass(Number(e.value)),t.value==Number(t.value)&&i.setDensity(Number(t.value)),l.value==Number(l.value)&&n.value==Number(n.value)&&u.value==Number(u.value)?i.setColor("rgb("+Number(l.value)+","+Number(n.value)+","+Number(u.value)+")"):i.setColor("rgb(0,0,0)"),s.value==Number(s.value)&&i.setPositionX(Number(s.value)),r.value==Number(r.value)&&i.setPositionY(Number(r.value)),o.value==Number(o.value)&&i.setVelocityX(Number(o.value)),a.value==Number(a.value)&&i.setVelocityY(Number(a.value))}function initialize(){let e=new Canvas("space"),t=new Universe;e.setListenerObjects(objects),t.setListenerObjects(objects),t.start(),e.start(),document.getElementById("createButton").addEventListener("click",createObject)}canvases=[],objects=[],Array.prototype.getCanvas=e=>{for(let t=0;t<canvases.length;t++)if(canvases[t].id===e)return canvases[t];return null},Array.prototype.getObject=e=>{for(let t=0;t<object.length;t++)if(objects[t].id===e)return objects[t];return null},Array.prototype.listenerObjects=[],setTimeout(()=>{initialize()},1e3);
