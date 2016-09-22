'use strict';

$(document).ready(function () {

  const renderTweets = (tweets) => {
    $('#tweet-container').empty();
    // loops through tweets
    tweets.forEach((tweet) => {
      // calls createTweetElement for each tweet
      // appends return value to tweet container
      $('#tweet-container').append(createTweetElement(tweet));
    });
  }

  const createTweetElement = (tweet) => {

    // Specifies HTML for each tweet's header
    const headerHTML = _.template(
      "<header>" +
        "<img src='<%= user.avatars.regular %>' style='width:40px; height:40px;'>" +
        "<h2><%= user.name %></h2>" +
        "<p><%= user.handle %></p>" +
      "</header>"
    );

    const safeContent = {
      safeContent: _.escape(tweet.content.text)
    }

    // Specifies HTML for each tweet's section
    const sectionHTML = _.template(
      "<section>" +
        "<div>" +
          "<i class='fa fa-quote-left' aria-hidden='true'></i>" +
        "</div>" +
        "<p>" +
          "<%= safeContent %>" +
        "</p>" +
        "<div>" +
          "<i class='fa fa-quote-right' aria-hidden='true'></i>" +
        "</div>" +
      "</section>"
    );

    // Specifies HTML for each tweet's footer
    const footerHTML = _.template(
    "<footer>" +
      "<div class='timestamp'>" +
        "<p> <%= Math.floor((Date.now() - new Date(created_at))/86400000) %> days ago..</p>" +
      "</div>" +
      "<div class='social-buttons'>" +
        "<i class='fa fa-font-awesome' aria-hidden='true'></i>" +
        "<i class='fa fa-retweet' aria-hidden='true'></i>" +
        "<i class='fa fa-heart' aria-hidden='true'></i>" +
      "</div>" +
    "</footer>"
  );

    // Combines all three sections to prepare tweet
    return  $('<article>')
              .addClass('tweet')
              .append(headerHTML(tweet))
              .append(sectionHTML(safeContent))
              .append(footerHTML(tweet));
  }


  // On new tweet submission
  $('#tweet-form').on('submit', (ev) => {
    ev.preventDefault();

    if (!validateForm()) {
      alert('Your tweet is too long! It has to be less than 140 characters')
    } else {
      $.post('/tweets', $('#tweet-form').serialize())
        .then(loadTweets)
        .fail(err => {
          console.error(err);
      });
    }
  });

  const loadTweets = () => {
  // Reads the tweets from the database and renders to the website
    $.get('/tweets')
      .then(renderTweets)
      .then(() => {
        $('#input-tweet').val('');
      })
      .fail(err => {
        console.debug(err)
      });
  }

  const validateForm = () => {


    const tweetLength = $('#input-tweet').val().length;
    if (tweetLength > 140) {
      return false;
    } else {
      return true;
    }
  }

  // New tweet slide toggle functionality
  $('#compose').click(function() {
    $('#new-tweet').slideToggle("slow");
  });

  // Event Listener for clicking on tweets
  $('#tweet-container').on('click', '.tweet', () => {
    alert('Tweet, Tweet!');
  });

  // On page load
  loadTweets();
});

// const validators = {
//   text: (val) => {
//     return val.length > 10 && val.length <= 140;
//   }
// };
//
// $('#tweet-form').serializeArray().forEach((field) => {
//   if(!validators[field.name](field.value)){
//     console.log(`The ${field.name} field failed!`)
//   }
// });
