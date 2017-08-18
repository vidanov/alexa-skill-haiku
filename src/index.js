'use strict';
const Alexa = require('alexa-sdk');
const APP_ID = undefined;

/***********
Data: Customize the data below as you please.
***********/

const SKILL_NAME = "Haiku Reader";
const GET_HAIKU_MESSAGE = "I have a haiku for you: ";
const HELP_MESSAGE = "You can say tell me a haiku... or not.";
const HELP_REPROMPT = "I have some awesome haikus in my repertoire. Just ask me to read one to you.";
const STOP_MESSAGE = "See you later!";

// Each haiku is written within two single backticks and all haikus are seperated by commas.
const data = [
  `Berlin is a place.
  Full of historical stuff.
  Come and visit us`,

  `The last page is full.
  Scribbled notes and reminders.
  Goodbye dear notebook`,

  `The alarm goes off.
  Blaring siren of my work.
  I need some coffee.`
];

/***********
Execution Code: Avoid editing the code below if you don't know JavaScript.
***********/

const handlers = {
  'NewSession': function(){
    this.emit('GetHaikuIntent');
  },
  'GetHaikuIntent': function(){
    const randomHaikuIndex = Math.floor(Math.random() * data.length);
    const randomHaiku = data[randomHaikuIndex];
    const speechOutput = GET_HAIKU_MESSAGE + randomHaiku;
    this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomHaiku);
  },
  'AMAZON.HelpIntent': function(){
    this.emit(':ask', HELP_MESSAGE, HELP_REPROMPT);
  },
  'AMAZON.CancelIntent': function(){
    this.emit(':tell', STOP_MESSAGE);
  },
  'AMAZON.StopIntent': function(){
    this.emit(':tell', STOP_MESSAGE);
  },
  'Unhandled': function(){
    this.emit(':tell', HELP_MESSAGE)
  }
};

exports.handler = (event, context, callback) => {
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
