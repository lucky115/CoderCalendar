/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
    }
};

app.initialize();




var res;
var req;

function icon(platform){

  if(platform=="CODECHEF"){
      return "cc32.jpg";
  }else if (platform=="HACKEREARTH") {
      return "he32.png";
  }else if (platform=="CODEFORCES") {
      return "cf32.png";
  }
  else if(platform=="TOPCODER"){
      return "tc32.gif";
  }
  else if(platform=="HACKERRANK"){
      return "hr36.png";
  }
}

function putdata(json)
{ 
  
  $.each(res.result.ongoing , function(i,post){ 
     
     $("#ongoing").append('<a  data='+'"'+post.url+'"'+'>\
        <li><h4>'+post.Name+'</h4>\
        <img class="contest_image" src="img/'+icon(post.Platform)+'"></img><br>\
        <h5>End: '+post.EndTime+'</h5><br>\
        </li><hr></a>');
    });
  
  $.each(res.result.upcoming , function(i,post){ 

      startTime = Date.parse(post.StartTime)
      endTime   = Date.parse(post.EndTime)
      s = new Date(startTime+19800000).toISOString().slice(0,19).replace(/-/g,"").replace(/:/g,"")
      e = new Date(endTime+19800000).toISOString().slice(0,19).replace(/-/g,"").replace(/:/g,"")
      
      calenderTime = s+'/'+e
      calenderLink = "https://www.google.com/calendar/render?action=TEMPLATE&text="+encodeURIComponent(post.Name)+"&dates="+calenderTime+"&location="+post.url+"&pli=1&uid=&sf=true&output=xml#eventpage_6"
      
      $("#upcoming").append('<a  data='+'"'+post.url+'"'+'>\
        <li><h4>'+post.Name+'</h4>\
        <img class="contest_image" src="img/'+icon(post.Platform)+'"></img><br>\
        <h5>Start: '+post.StartTime+'</h5><br>\
        <h5>Duration: '+post.Duration+'</h5><br>\
        <h5 data='+calenderLink+' class="calender">Add to Calendar</h5>\
        </li><hr></a>');
    });

}


function fetchdata(){

    req =  new XMLHttpRequest();
    req.open("GET",'https://contesttrackerapi.herokuapp.com/',true);
    req.send();
    req.onload = function(){
        $("#ongoing > a").remove();
        $("#upcoming > a").remove();
        res = JSON.parse(req.responseText);
        putdata(res);
    };
}


$(document).ready(function(){
  fetchdata();
  setInterval(function(){ fetchdata() }, 60000)

/*
//sends "link to be opened" to main.js
  $("body").on('click',"a", function(){
       self.port.emit("postClicked",$(this).attr('data'));
       return false;
     });
  //sends "link to be opened" to main.js
  $("body").on('click',".calender", function(){
       self.port.emit("postClicked",$(this).attr('data'));
       return false;
     });
 */
});