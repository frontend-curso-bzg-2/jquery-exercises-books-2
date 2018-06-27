var  routes = [
        {
           "path": "/",
           "component": "list.html",
           "callback": function() {
                $.getJSON('./js/books.json').done(function(response){        
            
                    let items = response.items;
                    let template;
                    $.ajax(
                        {
                            url: './components/templates/card.html',
                            type: 'GET',
                            dataType: 'text',
                            success: function(response){                
                                template = response;                     
            
                                for(let i = 0; i < items.length; i++){
                                    newTemplate = template.slice(0);
                                    let volInfo = items[i].volumeInfo; 
                                    let id = items[i].id;                       
                                    let keys = Object.keys(volInfo);                          
                                    let link = "#/detail/"+id;                        
                                    newTemplate = newTemplate.replace("{{routeLink}}", link).slice(0);
            
                                    for(let j=0; j < keys.length; j++){                                                      
                                        if(keys[j] == "imageLinks"){                                
                                            let st = JSON.stringify(volInfo[keys[j]].smallThumbnail);
                                            newTemplate = newTemplate.replace("{{"+ keys[j] +"}}", st).slice(0);
                                        }
                                        else{                                 
                                            let st = JSON.stringify(volInfo[keys[j]]);
                                            newTemplate = newTemplate.replace("{{"+ keys[j] +"}}", st).slice(0);                                                                
                                        }                                 
                                        if(j == (keys.length-1)){
                                            $("#books").append(newTemplate);        
                                        }
                                    }                                                            
                                }                    
                            },
                            error: function(error){
                                console.log(error);
                            },
                            complete: function(xhr, status){
                                console.log(status);
                            }
                        }
                    );        
            
            
                }); 
           }    
        },
        {
            "path": "/detail/:id",
            "component": "detail.html",
            "callback": function(id){
                $.getJSON('./js/books.json').done(function(response){        
            
                    let items = response.items;
                    for(let i=0; i < items.length; i++){
                        if(items[i].id == id){
                            let item = items[i];                            
                            let template;
                                $.ajax(
                                    {
                                        url: './components/templates/book.html',
                                        type: 'GET',
                                        dataType: 'text',
                                        success: function(response){                
                                            template = response;                                                                                         
                                            newTemplate = template.slice(0);
                                            let volInfo = item.volumeInfo; 
                                            let id = item.id;                       
                                            let keys = Object.keys(volInfo);                                                                                                                                                
                    
                                            for(let j=0; j < keys.length; j++){                                                      
                                                if(keys[j] == "imageLinks"){                                                                                   
                                                    let st = JSON.stringify(volInfo[keys[j]].smallThumbnail);                                                    
                                                    newTemplate = newTemplate.replace("{{"+ keys[j] +"}}", st).slice(0);
                                                }
                                                else{                                 
                                                    let st = JSON.stringify(volInfo[keys[j]]);
                                                    newTemplate = newTemplate.replace("{{"+ keys[j] +"}}", st).slice(0);                                                                
                                                }                                 
                                                if(j == (keys.length-1)){
                                                    $("#book").append(newTemplate);        
                                                }
                                            }                                                                                                        
                                        },
                                        error: function(error){
                                            console.log(error);
                                        },
                                        complete: function(xhr, status){
                                            console.log(status);
                                        }
                                    }
                                ); 
                        }
                    }            
                }); 
            }
        } 
];



$(document).ready(function(){    

    $('.toggle-sidebar').click(function(event){
        event.preventDefault();
        if(!$('.left-aside').hasClass('aside-close')){
            $('.left-aside').toggleClass('aside-close');            
            $('.left-aside').animate({
                width: '50px'
            }, function(){
                $('.main-section').toggleClass('main-collape');
            });
        }else {
            $('.main-section').toggleClass('main-collape');
            $('.left-aside').animate({
                width: '300px'
            }, function(){                
                $(this).toggleClass('aside-close');               
            });
        }        
    });

    $(window).on('load', function(e){
        let location = e.originalEvent.target.location;
        router(location);
    });

    
    $(window).on('hashchange', function(e){
        let event = e.originalEvent;
        let hash = event.newURL.split('#')[1];

        routes.map(function(data){        
            var url = hash || '/';                                      
            if(url == "/" && data.path === "/"){            
                getContent("./components/" + data.component, data.callback);                        
            }else {            
                let paths = url.split("/"); 
                console.log(paths);
                let size = paths.length;
                let dataPath = data.path.split("/");
                if(size === dataPath.length){
                    getContent("./components/" + data.component, data.callback, paths[2]);
                }            
            }       
        });      
    });    
    
});

function router(window){
        
    let location = window;
    let hash = location.hash.split("#")[1];    

    routes.map(function(data){        
        var url = location.hash.slice(1) || '/';              
        console.log(url);
        if(url == "/" && data.path === "/"){            
            getContent("./components/" + data.component, data.callback);                        
        }else {            
            let paths = url.split("/"); 
            console.log(paths);
            let size = paths.length;
            let dataPath = data.path.split("/");
            if(size === dataPath.length){
                getContent("./components/" + data.component, data.callback, paths[2]);
            }            
        }       
    });    
}

function getContent(url, callback, param){
    $.ajax(
        {
            url: url,
            type: 'GET',
            dataType: 'text',
            success: function(response){                
                $("#content").html(response);   
                console.log(param);              
                if(param){
                    callback(param);                  
                }else {
                    callback();                  
                }                
            },
            error: function(error){
                console.log(error);
            },
            complete: function(xhr, status){
                console.log(status);
            }
        }
    );
}

function loadBooks(){
    $.getJSON('./js/books.json').done(function(response){        
        
        let items = response.items;
        let template;
        $.ajax(
            {
                url: './components/templates/card.html',
                type: 'GET',
                dataType: 'text',
                success: function(response){                
                    template = response;                     

                    for(let i = 0; i < items.length; i++){
                        newTemplate = template.slice(0);
                        let volInfo = items[i].volumeInfo; 
                        let id = items[i].id;                       
                        let keys = Object.keys(volInfo);                          
                        let link = "#/detail/"+id;                        
                        newTemplate = newTemplate.replace("{{routeLink}}", link).slice(0);

                        for(let j=0; j < keys.length; j++){                                                      
                            if(keys[j] == "imageLinks"){                                
                                let st = JSON.stringify(volInfo[keys[j]].smallThumbnail);
                                newTemplate = newTemplate.replace("{{"+ keys[j] +"}}", st).slice(0);
                            }
                            else{                                 
                                let st = JSON.stringify(volInfo[keys[j]]);
                                newTemplate = newTemplate.replace("{{"+ keys[j] +"}}", st).slice(0);                                                                
                            }                                 
                            if(j == (keys.length-1)){
                                $("#books").append(newTemplate);        
                            }
                        }                                                            
                    }                    
                },
                error: function(error){
                    console.log(error);
                },
                complete: function(xhr, status){
                    console.log(status);
                }
            }
        );        


    }); 
}
