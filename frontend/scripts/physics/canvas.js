class Canvas
{
    constructor(id)
    {
        this.id = id;
        try
        {
            this.element = document.getElementById(this.id);
            if(this.element)
            {
                canvases.push(this);
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
    }

}