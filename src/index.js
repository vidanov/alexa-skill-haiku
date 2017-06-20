'use strict';
const Alexa = require('alexa-sdk');
const APP_ID = undefined;

/***********
Data: Customize the data below as you please.
***********/

const SKILL_NAME = "Quirky Haikus";
const GET_HAIKU_MESSAGE = "I have a quirky haiku for you: ";
const HELP_MESSAGE = "You can say tell me a haiku... or not.";
const HELP_REPROMPT = "I have some awesome haikus in my repartoire. Just tell me to read one to you.";
const STOP_MESSAGE = "See you later!";

const data = [
  `Haikus are easy.
  But sometimes they don't make sense.
  Refrigerator`,

  `You never feed me.
  Perhaps I'll sleep on your face.
  That will sure show you`,

  `I wake, reluctant.
  Too cold to get out of bed.
  But I need to pee.`
];

/***********
Execution Code: Avoid editing the code below if you don't know JavaScript.
***********/

const handlers = {
  'LaunchRequest': function(){
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
  }
};

exports.handler = (event, context, callback) => {
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
