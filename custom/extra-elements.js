$(document).bind('deck.change', function(event, from, to) {
  if (to >=3) {
  	// Add menus
  	if ($(".main-menu").length == 0) {
  		$(".deck-container").prepend(side_menu()).prepend(main_menu());
  	}
  }
  if (to >= 4) {
  	// add path
  	if ($(".path").length == 0) {
  	  $(".deck-container").prepend(path());
  	}
  	update(to);
  }
  if (to >= 5) {
  	// add breadcrumb
  	if ($(".breadcrumb").length == 0) {
      $('h2').after(breadcrumb());
      update(to);
    }
  }
});

function main_menu() {
	 var menu =
	 '<ul class="main-menu"> \
    <li><a href="menus-n-paths.html">About</a></li> \
    <li><a href="menus-n-paths.html#slide-6">Menus</a></li> \
    <li><a href="menus-n-paths.html#slide-12">Paths</a></li> \
    <li><a href="menus-n-paths.html#slide-18">Breadcrumbs</a></li> \
  </ul>';
 return menu;
}

function side_menu() {
	 var menu =
	 '<ul class="side-menu"> \
  </ul>';
 return menu;
}

function path() {
	var path =
	 '<input class="path" type="text" value="http://menus-n-paths.local/about/definitions" size="60">';
	 return path;
}

function breadcrumb() {
	 var breadcrumb =
	 '<div class="breadcrumb"><a href="menus-n-paths.html#slide-1">Home</a> / <a href="menus-n-paths.html#slide-3">Definitions</a></div>';
	 return breadcrumb;
}

function update(to) {
  var path = $("section#slide-"+to+" .current-path").html();
  if (path) {
  	$("input.path").val("http://menus-n-paths.local/" + path);
  }

  var treeParents = tree_parents();
  var slideNumbers = slide_numbers();
  sidemenu_populate(to);


  $(".breadcrumb").empty();
  breadcrumb_populate(to);
  $(".breadcrumb").prepend('<a href="menus-n-paths.html">Home</a>');

  $("a").each(function() {
  	 $(this).removeClass('active');
     var hash = $(this).prop("hash");
     if (hash.slice(7) == to) {
     	 $(this).addClass('active');
     }
  });
  // Also make parents active in the main menu.
  var title = slideNumbers[to];
  var parent = treeParents[title];
  for (var key in slideNumbers) {
    if (slideNumbers[key] == parent) {
      $(".main-menu a").each(function() {
        var hash = $(this).prop("hash");
        if (hash.slice(7) == key) {
     	    $(this).addClass('active');
        }
      });
    }
  }
}

function slide_numbers() {
  return {
   0:'About',
   1:'Jody',
   2:'Definitions',
   3:'Definitions',
   4:'Definitions',
   5:'Definitions',
   6:'Menus',
   7:'The Main Menu',
   8:'Canonical Menu Positions',
   9:'Menu Block',
   10:'Menu Hall of Shame',
   11:'Menu Contrib',
   12:'Paths',
   13:'RESTful',
   14:'Canonical Paths',
   15:'Pathauto',
   16:'Path Contrib',
   17:'Paths Hall of Shame',
   18:'Breadcrumbs',
   19:'Drupal 7',
   20:'Drupal 8',
   21:'Bear',
   22:'Questions'
	};
}

function tree_parents() {
	return {

  'Menus':0,
  'Paths':0,
  'The Main Menu':'Menus',
  'Canonical Menu Positions':'Menus',
  'Menu Block':'Menus',
  'Menu Hall of Shame':'Menus',
  'Menu Contrib':'Menus',
  'Paths':0,
  'RESTful':'Paths',
  'Canonical Paths': 'Paths',
  'Pathauto':'Paths',
  'Path Contrib':'Paths',
  'Paths Hall of Shame':'Paths',
  'Breadcrumbs': 0,
  'Drupal 7':'Breadcrumbs',
  'Drupal 8':'Breadcrumbs',
  'About':0,
  'Jody':'About',
  'Definitions':'About',
  'Bear':'About',
  'Questions':'About'
	};
}

function breadcrumb_populate(to) {
 var slideNumbers = slide_numbers();
 var title = slideNumbers[to];
 $(".breadcrumb").prepend(" / <a href='menus-n-paths.html#slide-"+to+"'>"+title+"</a>")
 var treeParents = tree_parents();
 var parent = treeParents[title];
 for (var link in slideNumbers) {
 	 if (slideNumbers[link] == parent) {
     breadcrumb_populate(link);
 	 }
 }
}

function sidemenu_populate(to) {

	// Find the top item in the section.
	var slideNumbers = slide_numbers();
	var title = slideNumbers[to];
	var treeParents = tree_parents();
	var parent = treeParents[title];
	for (var link in slideNumbers) {
		 if (slideNumbers[link] == parent) {
	   var top = sidemenu_populate(link);
		 }
	}
	if (typeof top === 'undefined') {
		 var top = to;
	}
	$(".side-menu").empty();
	$(".side-menu").append("<h3><a href='menus-n-paths.html#slide-"+top+"'>"+slideNumbers[top]+"</a></h3>");
	var parent = slideNumbers[top];
	for (var title in treeParents) {
		if (treeParents[title] == parent) {
		  for (var link in slideNumbers) {
		   	if (slideNumbers[link] == title) {
          if (lasttitle != title) {
          	$(".side-menu").append("<li><a href='menus-n-paths.html#slide-"+link+"'>"+title+"</a></li>");
          }
		   	  var lasttitle = title;
		   	}
		  }
		}
	}
	return top;
}
