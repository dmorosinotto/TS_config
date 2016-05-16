var init = 123;

var d = new Greeting( document.getElementById("#greeting") );
d.greet("Pippo");

var g = new Greeting( $("#greeting").get(0) )
g.greet("Pluto");