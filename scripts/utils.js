function createRequest() {
  try {
    request = new XMLHttpRequest();
  } catch (tryMS) {
    try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (otherMS) {
      try {
        request = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (failed) {
        request = null;
      }
    }
  }	
  return request;
}
/*添加事件处理程序以兼容不同的浏览器*/
function addEventHandler(obj, eventName, handler) {
    if(document.attachEvent){
      obj.attachEvent("on"+eventName, handler);
    }else if (document.addEventListener){
      obj.addEventListener(eventName,handler,false);
    }
}

/*激活对象：这个对象表示页面上发生了事件的元素*/
function getActivatedObject(e){
    var obj;
    /*较早版本的IE 不会发送这样一个事件*/
    if(!e){
        obj=window.event.srcElement;
    }else if(e.srcElement){
        obj=e.srcElement;
    }else{
        obj=e.target;
    }
    return obj;
}

