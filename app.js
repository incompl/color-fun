var message;
var fileDisplayArea;
var square;
var img;

window.onload = function() {

  var fileInput = document.getElementById('fileInput');
  fileDisplayArea = document.getElementById('fileDisplayArea');
  message = document.getElementById('message');
  var uploader = document.getElementById('uploader');

  fileInput.addEventListener('change', function(e) {
    var file = fileInput.files[0];
    var imageType = /image.*/;

    message.textContent = 'Loading image...';

    if (file.type.match(imageType)) {
      var reader = new FileReader();

      reader.onload = function(e) {
        fileDisplayArea.innerHTML = '';

        img = new Image();
        img.className = 'face';
        img.onload = function() {
          fileDisplayArea.appendChild(img);
          uploader.parentNode.removeChild(uploader);
          faces();
        };
        img.src = reader.result;
        
      };

      reader.readAsDataURL(file);
    }
    else {
      message.textContent = 'That\'s not an image I don\'t think.';
    }
  });

};

function faces() {
  message.textContent = 'Searching for faces...';
  square = document.createElement('div');
  var maxWidth = img.offsetWidth;
  var maxHeight = img.offsetHeight;
  fileDisplayArea.appendChild(square);
  square.className = 'square';
  var times = 20;
  var interval = window.setInterval(function() {
    var boxSize = Math.round(Math.random() * 100 + 50);
    square.style.width = boxSize + 'px';
    square.style.height = boxSize + 'px';
    square.style.top = Math.round(Math.random() * (maxHeight - boxSize)) + 'px';
    square.style.left = Math.round(Math.random() * (maxWidth - boxSize)) + 'px';
    times--;
    if (times < 1) {
      window.clearInterval(interval);
      blink();
    }
  }, 200);
  
}

function blink() {
  message.textContent = 'Face identified!';
  var times = 10;
  var interval = window.setInterval(function() {
    if (times % 2 === 0) {
      square.style.borderColor = 'black';
    }
    else {
      square.style.borderColor = 'red';
    }
    times--;
    if (times < 1) {
      window.clearInterval(interval);
      determineColor();
    }
  }, 100);
}

function determineColor() {
  message.textContent = 'Determining favorite color...';
  var times = 30;
  var interval = window.setInterval(function() {
    var hue = Math.round(Math.random() * 360);
    message.style.color = 'hsl(' + (times * 10) + ',90%, 40%)';
    times--;
    if (times < 1) {
      window.clearInterval(interval);
      result();
    }
  }, 100);
}

function result() {
  message.style.color = 'black';
  var adjectives = [
    'bright',
    'dark',
    'neon'
  ];
  var adjective = adjectives[Math.round(Math.random() * (adjectives.length - 1))];
  var colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple',
    'black',
    'brown',
    'gray',
    'white'
  ];
  var color = colors[Math.round(Math.random() * (colors.length - 1))];

  var colorElem = document.getElementById('color');
  colorElem.textContent = adjective + ' ' + color;
  colorElem.style.display = 'block';
  var info = document.getElementById('info');
  info.style.display = 'block';
  message.textContent = 'Your favorite color is';
}