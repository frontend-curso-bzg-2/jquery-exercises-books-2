import '../css/styles.css';
import * as $ from 'jquery';
import { Route } from "./models/route";

var routes : Route[];

routes = [
    {
        "path": "/",
        "component": "list.html",
        "controller": function(){
            $.getJSON('./data/books.json').done(function(response){
                let items = response.items;
                var ract = new Ractive({
                    el: "#books",                    
                    template: "#templateBooks",
                    data: {items: items}
                });                                       
                
            });
        }
    },
    {
        "path": "/detail/:id",
        "component": "detail.html",
        "controller": function(id){
            $.getJSON('./data/books.json').done(function(response){
                let items = response.items;
                let item = items.find(function(elem){
                    return elem.id == id;
                });

                var ract = new Ractive({
                    el: "#book",
                    template: "#templateBook",
                    data: item.volumeInfo
                });                
        });
        }
    }
]



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
        let location = e.originalEvent.target['location'];
        router(location);
    });

    
    $(window).on('hashchange', function(e){
        let event = e.originalEvent;
        router(event.target['location']);              
    });    
    
});

function router(window){
        
    let location = window;
    let hash = location.hash.split("#")[1];    

    routes.map(function(data){        
        var url = location.hash.slice(1) || '/';     
        let parts = url.substr(1).split('/'), param;
        
        if(url == "/" && data.path === "/"){            
            getContent("./components/" + data.component, data.controller);                        
        }else if(data.path.match(/:id/g)) {            
            let mod = data.path.split('/:id')[0].slice(1);
            while(parts.length){
                if(parts.shift() == mod){
                    param = parts.shift();
                    getContent("./components/" + data.component, data.controller, param);
                }else {
                    parts.shift();
                }
            }
        }else {
            let mod = data.path.slice(1);
            while(parts.length){
                if(parts.shift() === mod) {                    
                    getContent("./components/" + data.component, data.controller);
                }else {
                    parts.shift();
                }
            }  
        }    
    });    
}

function getContent(url, callback, param?){
    $.ajax(
        {
            url: url,
            type: 'GET',
            dataType: 'text',
            success: function(response){                
                $("#content").html(response);                                                
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