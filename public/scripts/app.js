'use strict';
$(document).ready(function () {
  // New tweet container is hidden by default
  $('#new-tweet').hide();
  $('#logout').hide();


  const getCookie = (name) => {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  if(getCookie("username")) {
    //Hide login form
    $('#login-form').hide();

    // Show logout button
    $('#logout').show();

    // Display login status
    $('#login-display')
    .append("You are logged in as: ")
    .append(_.escape(getCookie("username")));

  } else {
    // Display login status
    $('#login-display')
    .append("You are not logged in!")
  }


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
    const headerHTML = _.template(`
      <header>
        <img src='<%= user.avatars.regular %>'>
        <h2><%= user.name %></h2>
        <p><%= user.handle %></p>
      </header>`
    );

    // Escape tweet content
    const safeContent = {
      safeContent: _.escape(tweet.content.text)
    }

    // Specifies HTML for each tweet's section
    const sectionHTML = _.template(`
      <section>
        <div>
          <i class='fa fa-quote-left' aria-hidden='true'></i>
        </div>
        <p>
          <%= safeContent %>
        </p>
        <div>
          <i class='fa fa-quote-right' aria-hidden='true'></i>
        </div>
      </section>`
    );

    const daysSincePost = {
      daysSincePost: Math.floor((Date.now() - new Date(tweet.created_at))/86400000)
    }

    // Specifies HTML for each tweet's footer
    const footerHTML = _.template(`
    <footer>
      <div class='timestamp'>
        <p> <%= daysSincePost %> days ago..</p>
      </div>
      <div class='social-buttons'>
        <i class='fa fa-font-awesome' aria-hidden='true'></i>
        <i class='fa fa-retweet' aria-hidden='true'></i>
        <i class='fa fa-heart' aria-hidden='true'></i>
      </div>
    </footer>`
  );

    // Combines all three sections to prepare tweet
    return  $('<article>')
              .addClass('tweet')
              .append(headerHTML(tweet))
              .append(sectionHTML(safeContent))
              .append(footerHTML(daysSincePost));
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
    $('#input-tweet').focus();
  });

  // On page load
  loadTweets();

});
