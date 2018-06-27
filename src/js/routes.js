export function routes() {
    r = [
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
            "component": "detail.html"
        } 
    ]
}
