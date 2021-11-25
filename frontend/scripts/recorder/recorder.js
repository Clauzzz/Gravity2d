class Recorder {

    static data = {
        width: null,
        height: null,
        pixels:[]
    };
    static record(context, width, height) {
        
       // console.log(btoa(JSON.stringify(context.getImageData(0,0, width, height).data)).length);
    }
}