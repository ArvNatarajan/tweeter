'use strict';
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

$(document).ready(function () {

  function renderTweets(tweets) {
    // loops through tweets
    data.forEach((tweet) => {
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      $('#tweet-container').append(createTweetElement(tweet));
    });
  }

function createTweetElement(tweet) {

  // Specifies HTML for each tweet's Header
  var headerHTML = `
    <header>
      <img src="${tweet.user.avatars.regular}" style="width:40px; height:40px;">
      <h2>${tweet.user.name}</h2>
      <p>${tweet.user.handle}</p>
    </header>`;

  // Specifies HTML for each tweet's section
  var sectionHTML = `<section><p>${tweet.content.text}<p></section>`

  // Specifies HTML for each tweet's footer
  var footerHTML = `
  <footer>
    <div class="timestamp">
      <p>${Math.floor((Date.now() - new Date(tweet.created_at))/86400000)} days ago..</p>
    </div>
    <div class="social-buttons">
      <i class="fa fa-font-awesome" aria-hidden="true"></i>
      <i class="fa fa-retweet" aria-hidden="true"></i>
      <i class="fa fa-heart" aria-hidden="true"></i>
    </div>
  </footer>`

  // Combines all three sections to prepare tweet
  var $tweet = $('<article>')
                  .addClass('tweet')
                  .append(headerHTML)
                  .append(sectionHTML)
                  .append(footerHTML);
  // console.log($header.innerHTML); // to see what it looks like
  return $tweet;
}

renderTweets(data);

});
