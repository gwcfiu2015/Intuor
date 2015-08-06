 //sets up so that you can access your database
// you can get your keys by going into your app on Parse.com 
//Going to settings at the top and then Keys on the left
    Parse.initialize("eeeWEWcIQKIWVpCRHuK3erSkesvi4XXjk8HP8gHH", "P6vD3bcCwFvBUquCasWi2psuMktrfb3chcto8foe");
    
    
     
function signUpUser()
{
          alert("Called signup user"); 
      
        //create new file from user uploaded File
        var fileUploadControl = $("#uploadInput")[0];
          if (fileUploadControl.files.length > 0) {
        var file = fileUploadControl.files[0];
        var name = "photo.jpg";

        var parseFile = new Parse.File(name, file);
        }
      
          
      //creating a sample object, the equivalent of creating a class    
      var TestObject = Parse.Object.extend("TestObject");
      
      //creating an instance of our TestObject class
      var testObject = new TestObject();
          
      //you set and create attributes the same way
      //the set method will both set an attribute if 
      testObject.set("image", parseFile); 
      testObject.save({name: "TestObject1"}, {
      success: function(object) {
        $(".success").show();
      },
      error: function(model, error) {
        $(".error").show();
      }
    });
     
    //to grab information from the database you first set up a query
    var query = new Parse.Query(TestObject);
    
    //then you set information for the query
    //this will only return TestObject that have a name of TestObject1
    //query.equalTo("name", "TestObject1"); 

    //call find to actually access your database
        query.find({
          success: function(results) {
            alert("Successfully retrieved " + results.length + " scores.");
            // Do something with the returned Parse.Object values
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
                //Plug the id and name into the html document at id objectList
                $("#objectList").append("<br/>" + object.id + "-" + object.get("name") + "<br/>");
               //alert(object.id + ' - ' + object.get("name"));
                var img = object.get('image');
                //create an html img tag to be added to the webpage 
                var picture = document.createElement("IMG");
                //alert(object.get('image').url());
                //set the image src to be url on the database
                picture.src = img.url();
                //alert(picture);
                //non jquery way to plug data in at certain id 
                document.getElementById("objectList").appendChild(picture);
            }
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });
    
}