'use strict';
var AWS = require('aws-sdk');
var AlexaSkill = require('./alexaSkill');
/**
 * App ID for the skill
 */
var APP_ID = "amzn1.ask.skill.365dc7bf-e633-43d7-9303-f3886800175e";


var Sketch = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Sketch.prototype = Object.create(AlexaSkill.prototype);
Sketch.prototype.constructor = Sketch;

Sketch.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("Sketch onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Sketch.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("Sketch onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    response.ask("Welcome to bright-peak, you can ask for a term quote, or financial advice.", "Say term quote or savings advice.");
};

Sketch.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("Sketch onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};


var createBucket = function() {
    var s3 = new AWS.S3();
    console.log("create s3");
     s3.createBucket({Bucket: 'alexaSketchBucket'}, function(data) {
        console.log("data" + data);
        response.tell("Bucket created i think 2", "Line say waht...");
      // var params = {Bucket: 'myBucket', Key: 'myKey', Body: 'Hello!'};
      // s3.putObject(params, function(err, data) {
      //     if (err) {
      //       console.log(err);
      //     }       
      //     else  {
      //       console.log("Successfully uploaded data to myBucket/myKey"); 
      //     }
      //  });
    });
 }

Sketch.prototype.intentHandlers = {
    // register custom intent handlers
    "DrawLineIntent": function (intent, session, response) {
        createBucket();
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("I need help.", "Hmmm");
    },
    "AMAZON.StopIntent": function (intent, session, response) {
        response.tell("Good bye.");
    },
    "AMAZON.CancelIntent": function (intent, session, response) {
        response.tell("Good bye.");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    console.log('logStreamName =', context.logStreamName);
    var sketch = new Sketch();
    sketch.execute(event, context);
};
