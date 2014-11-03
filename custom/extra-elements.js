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
 	  }
 	  if (to >= 5) {
 	  	// add breadcrumb
 	  	if ($(".breadcrumb").length == 0) {
        $('h2').after(breadcrumb());
      }
 	  }
 	  if (to > 5) {
 	  	// ensure menus, paths and breadcrumbs are updated.
 	  	update();
 	  }
  });

 function main_menu() {
 	 var menu =
 	 '<ul class="main-menu"> \
      <li>test</li> \
      <li></li> \
    </ul>';
   return menu;
 }

 function side_menu() {
 	 var menu =
 	 '<ul class="side-menu"> \
      <li>test</li> \
      <li></li> \
    </ul>';
   return menu;
 }

 function path() {
 	var path =
 	 '<input class="path" type="text" value="menus-n-paths.local/definitions" size="60">';
 	 return path;
 }

 function breadcrumb() {
 	 var breadcrumb =
 	 '<div class="breadcrumb">Home / Definitions</div>';
 	 return breadcrumb;
 }

 function update() {

 }
