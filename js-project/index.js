function changeVolume() {
    const progressBar = document.getElementById('progressBar');
    const progressSections = progressBar.getElementsByClassName('progress');
  
    // how many sections are filled
    const filledSections = progressSections.length;
  
    // if volume is max, reset to 0, and relocate the progress bar
    if (filledSections >= 16) {
      while (progressBar.firstChild) {
        progressBar.removeChild(progressBar.firstChild);
      }
    } else {
      const newSection = document.createElement('div');
      newSection.classList.add('progress');
      progressBar.appendChild(newSection);
    }

    relocateProgressBar(progressBar);
  }
  
  function relocateProgressBar(progressBar) {
    // random coordinates
    const randomX = Math.random() * (window.innerWidth - progressBar.offsetWidth);
    const randomY = Math.random() * (window.innerHeight - progressBar.offsetHeight);
  
    // new position
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
  