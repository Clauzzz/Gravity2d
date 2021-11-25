class HttpRequest {
    // generalAjax
    static request = (url, method, body, fcallback, args) =>
    {
        let ajax=new XMLHttpRequest();
        ajax.onreadystatechange=function()
        {	
            if(this.readyState==4 && this.status==200)
            {
                if(fcallback)
                {
                    fcallback(JSON.parse(this.response),args);
                }
            }
        }
        ajax.open(method,url,true);
        ajax.setRequestHeader("Content-Type","application/json");
        if(method=="POST")
        {	
            ajax.send(stringify(body));
        }
        else
        {
            ajax.send();
        }
    }
}