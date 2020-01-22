class TypeWriter {
  constructor(txtElement, words, wait = 2000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 1;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 60;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}


// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}

// pre loader
window.addEventListener("DOMContentLoaded", function () {
  $('.preloader-background').delay(2000).fadeOut('slow');

  $('.preloader-wrapper')
    .delay(2000)
    .fadeOut('fast');
});
// //  sidenav
// $(document).ready(function () {
//   $(".sidenav").sidenav();
// })

//Get the button
function topFuction() {
  document.documentElement.scrollTop = 0;
}

// go to top button
$(window).scroll(function () {
  if ($(this).scrollTop() > 150) { // If the scroll equal 150px
    $(".gotop").css({
      width: "40px",
      borderRadius: "0"
    }); // Show the button by give it (width 40px and border-radius 0px)
  } else { // else (if the scroll <= 150px )
    $(".gotop").css({
      width: "0",
      borderRadius: "50% 0 0 50%"
    }); // Return button style to default
  }
});
$('.gotop').click(function () { // When user click on the button
  $("body").animate({
    scrollTop: "0"
  }, 400); // Return scroll to 0
  $("body").css({
    paddingTop: "0"
  });
  // After .5s (when window scroll equal 0)
  setTimeout(function () {
    $("body").animate({
      'padding-top': 0,
    }, "fast");
  }, 500);
});