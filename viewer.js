  function githubCallback(response) {
	var div = document.getElementById("eulerContent");
	if (!response || !response.data || !response.data.content) {
		div.innerHTML = "(not found)";
	}
    else { var resp = atob(response.data.content.replace(/\s/g, '')); }
    div.innerHTML = resp;
  }
  
  function getEulerFromGithub(num) {
    var padded = num.toString();
    while (padded.length < 3) padded = "0"+padded;
	
	var div = document.getElementById("eulerContent");
	div.innerHTML = '<img src="http://blog.martindoms.com/wp-content/uploads/2012/09/spinner.gif" />';
	
	var scr = document.createElement("script");
    scr.type = "text/javascript";
    scr.src = "https://api.github.com/repos/MartinDoms/ProjectEulerJS/contents/p"+padded+".js?callback=githubCallback";
    var head = document.getElementsByTagName("head")[0];
    head.insertBefore(scr, head.firstChild);
	
	document.getElementById("eulerTitle").text = "Euler solution #" + padded;
  }
  function getNewEuler() {
    var num = parseInt(document.getElementById("numStr").value);
    if (num) {
      getEulerFromGithub(num);
    }
  }