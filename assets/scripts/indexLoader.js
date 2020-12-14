import * as main from "./indexMain.js";

window.onload = ()=>{
	console.log("window.onload called");
	// 1 - do preload here - load fonts, images, additional sounds, etc...
	
	// 2 - start up app
	main.init();
}