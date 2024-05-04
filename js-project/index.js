let currentVolume = 0; // track the current volume level
let progressBars = []; // array to store progress bars

function changeVolume() {
  const progressBar = document.getElementById('progressBar');
  const progressInfo = document.getElementById('progressInfo');
  const progressSections = progressBar.getElementsByClassName('progress');

  // update volume randomly
  currentVolume = progressSections.length;

  // update progress bar and volume info
  relocateProgressBar(progressBar);
  updateVolume(progressBar, currentVolume);
  updateVolumeInfo(progressInfo, currentVolume);
}

function relocateProgressBar(progressBar) {
  // calculate random coordinates
  progressBars.forEach(pb => {
  const randomX = Math.random() * (window.innerWidth - progressBar.offsetWidth);
  const randomY = Math.random() * (window.innerHeight - progressBar.offsetHeight);

  // set the new position of the progress bar
  progressBar.style.left = `${randomX}px`;
  progressBar.style.top = `${randomY}px`;
  });

  // update the volume randomly
  const progressSections = progressBar.getElementsByClassName('progress');
  const filledSections = progressSections.length;
  const totalSections = 16;
  const randomFilledSections = Math.floor(Math.random() * (totalSections - filledSections + 1));
  for (let i = 0; i < randomFilledSections; i++) {
      const newSection = document.createElement('div');
      newSection.classList.add('progress');
      newSection.style.backgroundColor = getRandomColor();
      progressBar.appendChild(newSection);
  }
}

function increaseVolume() { // randomly increases volume and adds an additional progress bar
  currentVolume = Math.min(currentVolume + 0.5, 10);

  updateVolume(document.getElementById('progressBar'), currentVolume);
  updateVolumeInfo(document.getElementById('progressInfo'), currentVolume);
  
  const progressBar = document.getElementById('progressBar');
  const newProgressBar = progressBar.cloneNode(true);
  progressBar.parentNode.appendChild(newProgressBar);
  progressBars.push(newProgressBar);
}

function decreaseVolume() {  // randomly decreases volume and removes a progress bar
  currentVolume = Math.max(currentVolume - 0.5, 10);

  updateVolume(document.getElementById('progressBar'), currentVolume);
  updateVolumeInfo(document.getElementById('progressInfo'), currentVolume);

   const progressBar = document.getElementById('progressBar');
   if (progressBars.length > 1) {
     const removedProgressBar = progressBars.pop();
     removedProgressBar.remove();
   }
}

function resetVolume() {
  // reset volume to initial state, but sometimes set it to a random value
  const progressBar = document.getElementById('progressBar');
  while (progressBars.length > 1) {
    const removedProgressBar = progressBars.pop();
    removedProgressBar.remove();
  }
  if (Math.random() < 0.5) {
    currentVolume = 0;
  } else {
    currentVolume = Math.floor(Math.random() * 101);
  }

  updateVolume(document.getElementById('progressBar'), currentVolume);
  updateVolumeInfo(document.getElementById('progressInfo'), currentVolume);
}

function updateVolume(progressBar, filledSections) {
  // clear previous progress
  progressBar.innerHTML = '';

  // add new progress sections
  const totalSections = 16;
  const randomFilledSections = Math.floor(Math.random() * (totalSections - filledSections + 1));
  for (let i = 0; i < randomFilledSections; i++) {
      const newSection = document.createElement('div');
      newSection.classList.add('progress');
      newSection.style.backgroundColor = getRandomColor(); // Set random color
      progressBar.appendChild(newSection);
  }
}

function updateVolumeInfo(progressInfo, filledSections, totalSections) {
  // calculate volume percentage based on the width of the progress bar
  const progressBar = document.getElementById('progressBar');
  const progressBarWidth = progressBar.offsetWidth;
  const sectionWidth = progressBarWidth / totalSections;
  const filledWidth = filledSections * sectionWidth;
  const volumePercentage = Math.round((filledWidth / progressBarWidth) * 100);
}

function submitVolume() {
  const progressBar = document.getElementById('progressBar');
  const progressInfo = document.getElementById('progressInfo');
  const progressSections = progressBar.getElementsByClassName('progress');

  // count the number of filled sections
  const filledSections = progressSections.length;

  // calculate volume percentage
  const totalSections = 16;
  const volumePercentage = Math.round((filledSections / totalSections) * 100);

   let message = '';
   // determine message based on volume percentage
   if (volumePercentage <= 15) {
     message = 'Are you even listening to anything?';
   } else if (volumePercentage >= 15 && volumePercentage <= 30) {
     message = 'Might as well turn it up some more.';
   }
   else if (volumePercentage >= 31 && volumePercentage <= 39) {
    message = 'Keep going.';
  } else if (volumePercentage >= 40 && volumePercentage <= 49) {
     message = 'I said keep going.';
   } else if (volumePercentage === 50) {
     message = 'Why?';
   } else if (volumePercentage >= 51 && volumePercentage <= 70) {
     message = 'You\'re good.';
   } else if (volumePercentage >= 71 && volumePercentage <= 100) {
     message = 'LOUDER!!!';
   }

  // display volume info
  progressInfo.textContent = `Volume: ${volumePercentage}% - ${message}`;
}

function changeProgressBarColor() {
  const progressBar = document.getElementById('progressBar');
  const randomColor = getRandomColor();
  progressBar.style.backgroundColor = randomColor;
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

window.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.getElementById('progressBar');
  const progressSections = progressBar.getElementsByClassName('progress');
  const desktopWidth = 2560;

  progressBars.push(progressBar);
  changeVolume();

  // show the progress bar only on desktop-sized windows (no horizontal scrolling)
  if (window.innerWidth >= desktopWidth) {
      progressBar.style.display = 'block';
      relocateProgressBar(progressBar);
  }
});


