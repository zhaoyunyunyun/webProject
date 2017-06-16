/*After loaded the page, and quote the function initPage()*/
/*zengjinjie edit*/
window.onload = initPage;
/*判断用户是否在欢迎界面*/
var welcomePaneShowing = true;

/*初始化页面函数*/
function initPage() {
    /*获取id=tabs的导航栏按钮（横向的div栏）*/
    var tabs = document.getElementById("tabs").getElementsByTagName("a");
    for (var i=0; i<tabs.length; i++) {
        var currentTab = tabs[i];
        /*鼠标移入*/
        currentTab.onmouseover = showHint;
        /*鼠标移出*/
        currentTab.onmouseout = hideHint;
        /*鼠标点击相应的按钮*/
        currentTab.onclick = showTab;
    }
  
    var buttons = document.getElementById("navigation").getElementsByTagName("a");
    for (var i=0; i<buttons.length; i++) {
        var currentBtn = buttons[i];
        /*currentBtn.onmouseover = showHint;
        currentBtn.onmouseout = hideHint;
        */
        /*onclick*/
        currentBtn.onmouseout = buttonOut;
        currentBtn.onmouseover = buttonOver;
        currentBtn.onclick = showTab;



    }
}

function showHint() {
    /*r如果不在欢迎界面*/
    if (!welcomePaneShowing) {
        return;
    }
    switch (this.title) {
        case "beginners":
            var hintText = "Just getting started? Come join us!";
            break;
        case "intermediate":
            var hintText = "Take your flexibility to the next level!";
            break;
        case "advanced":
            var hintText = "Perfectly join your body and mind " +
                         "with these intensive workouts.";
            break;
        default:
            var hintText = "Click a tab to display the course " +
                         "schedule for the class";
    }
    var contentPane = document.getElementById("content");
    contentPane.innerHTML = "<h3>" + hintText + "</h3>";
    }

function hideHint() {
    if (welcomePaneShowing) {
        var contentPane = document.getElementById("content");
        contentPane.innerHTML = "<h3>Click a tab to display the course schedule for the class</h3>";
    }
}

function showTab() {
    var selectedTab = this.title;
    if (selectedTab === "welcome") {
        welcomePaneShowing = true;
        document.getElementById("content").innerHTML = "<h3>Click a tab to display the course schedule for the class</h3>";
    } else {
        welcomePaneShowing = false;
    }
    var tabs = document.getElementById("tabs").getElementsByTagName("a");
    for (var i=0; i<tabs.length; i++) {
        var currentTab = tabs[i];
        if (currentTab.title === selectedTab) {
            currentTab.className = 'active';
        } else {
            currentTab.className = 'inactive';
        }
    }
   /* var buttons = document.getElementById("navigation").getElementsByTagName("a");
    for (var i=0; i<buttons.length; i++) {
        var currentBtn = buttons[i];
        if (currentBtn.title === selectedTab) {
            currentTab.className = 'active';
        } else {
            currentTab.className = 'inactive';
        }
    }*/
   var request = createRequest();
   if (request === null) {
       alert("Unable to create request");
       return;
   }
   request.onreadystatechange = showSchedule;
   request.open("GET", selectedTab + ".html", true);
   request.send(null);
}

function showSchedule() {
    if (request.readyState === 4) {
        if (request.status === 200) {
            document.getElementById("content").innerHTML = request.responseText;
        }
    }
}

function buttonOver() {
    this.className = "active";
}
function buttonOut() {
    this.className = "";
}
