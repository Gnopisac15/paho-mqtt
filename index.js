console.log("index.js");

// // var client  = mqtt.connect({ host:'test.mosquitto.org', port: 8081})
// // or
// var client = mqtt.connect('wss://test.mosquitto.org:8081/mqtt')

// // var client  = mqtt.connect({ host:'mqtt.eclipse.org/mqtt', port: 443})
// // or
// // var client  = mqtt.connect('wss://mqtt.eclipse.org:443/mqtt')


// //Publish
// var pub_button = document.getElementById('pub-button');
// var pub_topic = document.getElementById('pub-input-topic');
// var pub_payload = document.getElementById('pub-input-payload');

// //Subscribe
// var sub_topic = document.getElementById('sub-input-topic');
// var sub_button = document.getElementById('sub-button');



//Creating table row 
// function myFunctionTable() {
//   var tbody = document.getElementById('incoming');
//   var row = tbody.insertRow(0)
//   var cell1 = row.insertCell(0);
//   var cell2 = row.insertCell(1);
//   cell1.innerHTML = pub_topic.value;
//   cell2.innerHTML = pub_payload.value;
// }


// client.on('message', function (topic, payload) {
//   myFunctionTable();
// })


// //Publish button event
// pub_button.addEventListener('click', () => {
//   // console.log('clicked');
//   // console.log(pub_input.value);
//   client.publish(pub_topic.value, pub_payload.value);
// })
// //Subscribe button event
// sub_button.addEventListener('click', () => {
//   client.subscribe(sub_topic.value);
//   console.log(sub_topic.value)
// })


var address = document.getElementById('broker-address').value;
var broker_btn = document.getElementById('broker-btn-con');
var pub_button = document.getElementById('pub-btn');
var client = mqtt.connect(address)

var pub_topic = document.getElementById('pub-topic');
var pub_payload = document.getElementById('pub-payload');
var topic = document.getElementById('pub-topic').value;
var payload = document.getElementById('pub-payload').value;

var sub_topic = document.getElementById('sub-topic');
var sub_button = document.getElementById('sub-btn')

var d = new Date();


//Creating table row 
function myFunctionTableBroker() {
  client.on('message', function (topic, payload) {
    var tbody = document.getElementById('tbody-broker');
    var row = tbody.insertRow(0)
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = topic;
    cell2.innerHTML = payload;
    cell3.innerHTML = d.toUTCString();
  })
}


//Creating table row 
function myFunctionTablePublish() {
  var tbody = document.getElementById('tbody-pub');
  var row = tbody.insertRow(0)
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  cell1.innerHTML = pub_topic.value;
  cell2.innerHTML = pub_payload.value;
  cell3.innerHTML = d.toUTCString();

}
//Creating table row 
function myFunctionTableSubscriber() {
  var tbody = document.getElementById('tbody-sub');
  var row = tbody.insertRow(0)
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell1.innerHTML = sub_topic.value;
  cell2.innerHTML = d.toUTCString();

}


broker_btn.addEventListener('click', () => {
  document.getElementById('broker-status').value = "Connecting..."
  client.on('connect', function () {
    document.getElementById('broker-status').value = "Connected!"

    pub_button.addEventListener('click', () => {
      client.publish(pub_topic.value, pub_payload.value);
      myFunctionTablePublish();
    })
    //Subscribe button event
    sub_button.addEventListener('click', () => {
      client.subscribe(sub_topic.value);
      myFunctionTableSubscriber();
        
    })
    myFunctionTableBroker()
  })
})
