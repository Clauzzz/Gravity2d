const express = require("express");
const server = express();
const bodyParser = require('body-parser');
const path = require('path');


const port=8901;
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(express.static(path.join(__dirname,'../frontend/')));

server.get('/*',(req,res)=>
{
    res.sendFile(path.join(__dirname + './index.html'));
	  				
});
server.listen(port,(err)=>
{
    if(!err)
    {
        console.log('Server started on port '+ port);
    }
})