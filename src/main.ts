const elements = document.querySelectorAll('.animation');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.3 });

elements.forEach(element => observer.observe(element));


// const glitchButtonGit = document.getElementById("glitch-button-git"); 
// if (!glitchButtonGit) {
//   return;
// }
// const glitchButtonDis = document.getElementById("glitch-button-dis")!;
// const glitchButtonMail = document.getElementById("glitch-button-mail")!;
