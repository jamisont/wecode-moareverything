  // ------------
  // IMPLEMENT ME
  // ------------
  
  // Debugging - console.logs run only when true
  debug = false;

  // Print function
  var print = function(input){
	if (debug === true){
		console.log(input);
	}
  }

  // Global datastore
  var listings;

  // Implement addListing()
  function addListing(){
	var newListing = {};
	
	console.log("hello");	
	var ni = $('#name-input').val();
	var fi = $('#file-input').val();
	var ai = $('#author-input').val();
	var di = $('#desc-input').val();
	
	newListing.name = ni;
	newListing.file = fi;
	newListing.author = ai;
	newListing.desc = di;
	newListing.date = new Date();

	print(newListing);
	
	listings.push(newListing);
	window.add(ni, fi, di, ai);
	refreshDOM();
	
	// Clear Inputs
	$('#name-input').val("");
	$('#file-input').val("");
	$('#author-input').val("");
	$('#desc-input').val("");
}
 

  // Implement refreshDOM()
  function refreshDOM(){
	if (listings === undefined) {
    console.log("listings is undefined!");
    return;
  }
	
	var container = $(".listings");
	container.html("");
    
	for (var i=0; i<listings.length; i++){
		var currentListing = listings[i];
		var listItem = $("<li>");
		// content
//    listItem.append($("<h3>").html(currentListing.name));
//		listItem.append("<h6>" + currentListing.date + "</h6>");
//		listItem.append("<p>" + currentListing.author + "</p>");
    listItem.append("<p><img style='width: 100%' src='" + currentListing.file + "' /></p>");
    listItem.append("<p>" + currentListing.desc + "</p>");
		
		$(".listings").append(listItem);
	}
  }  
  
  // Implement the get() function
  function get() {
    $.ajax({
      type: "get",
      url: "/listings",
      success: function(data) {
        listings = data.listings;
        refreshDOM();
      }
    });
  }

  // Implement the randomItem() function
  function randomItem() {
    randomURL = "/listings/random"
    $.ajax({
      type: "get",
      url: randomURL,
      success: function(data) {
        listings = data.listings;
        refreshDOM();
      }
    });
  }

  // Implement the add(name, file, desc, author) function
  function add(name, file, desc, author) {
    $.ajax({
      type: "post",
      data: {"name": name, "file": file, "desc": desc, "author": author},
      url: "/listings",
      success: function(data) { }
    });
  }

  function edit(name, file, id, desc, author) {
    $.ajax({
      type: "put",
      data: {name: name, file: file, desc: desc, author: author},
      url: "/listings/" + id,
      success: function(data) { }
    });
  }

  function del(id) {
    $.ajax({
      type: "delete",
      url: "/listings/" + id,
      success: function(data) { 
        //console.log(data);
      }
    });
  }

  function delAll() {
    $.ajax({
      type: "delete",
      url: "/listings",
      success: function(data) { }
    });
  }

  $(document).ready(function() {
    randomItem();
    refreshDOM();
  });