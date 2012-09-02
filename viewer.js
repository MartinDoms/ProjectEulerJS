  function githubCallback(response) {
    var resp = atob(response.data.content.replace(/\s/g, ''));
    var div = document.getElementById("content");
    div.innerHTML = resp;
  }
  
  function getEulerFromGithub(num) {
    var padded = num.toString();
    while (padded.length < 3) padded = "0"+padded;
	
	var div = document.getElementById("content");
	div.innerHTML = '<img src="spinner.gif" />';
	
	var scr = document.createElement("script");
    scr.type = "text/javascript";
    scr.src = "https://api.github.com/repos/MartinDoms/ProjectEulerJS/contents/p"+padded+".js?callback=githubCallback";
    var head = document.getElementsByTagName("head")[0];
    head.insertBefore(scr, head.firstChild);
  }
  function getNewEuler() {
    var num = parseInt(document.getElementById("numStr").value);
    if (num) {
      getEulerFromGithub(num);
    }
  }