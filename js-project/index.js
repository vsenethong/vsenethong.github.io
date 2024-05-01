function changeVolume() {
  const progressBar = document.getElementById('progressBar');
  const progressInfo = document.getElementById('progressInfo');
  const progressSections = progressBar.getElementsByClassName('progress');

  // how many sections are filled
  const filledSections = progressSections.length;

  relocateProgressBar(progressBar);
  updateVolume(progressBar, progressSections.length);
  updateVolumeInfo(progressInfo, progressSections.length);
}

function relocateProgressBar(progressBar) {
  // calculate random coordinates
  const randomX = Math.random() * (window.innerWidth - progressBar.offsetWidth);
  const randomY = Math.random() * (window.innerHeight - progressBar.offsetHeight);

  // set the new position of the progress bar
  progressBar.style.left = `${randomX}px`;
  progressBar.style.top = `${randomY}px`;

  // update the volume randomly
  const progressSections = progressBar.getElementsByClassName('progress');
  const filledSections = progressSections.length;
  const totalSections = 16;
  const randomFilledSections = Math.floor(Math.random() * (totalSections - filledSections + 1));
  for (let i = 0; i < randomFilledSections; i++) {
      const newSection = document.createElement('div');
      newSection.classList.add('progress');
      progressBar.appendChild(newSection);
  }
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

   // initialize message
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

window.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.getElementById('progressBar');
  const progressSections = progressBar.getElementsByClassName('progress');
  const desktopWidth = 2560;

  changeVolume();

  // show the progress bar only on desktop-sized windows
  if (window.innerWidth >= desktopWidth) {
      progressBar.style.display = 'block';
      relocateProgressBar(progressBar);
  }
});
