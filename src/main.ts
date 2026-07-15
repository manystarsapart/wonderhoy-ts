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

// =============================================================
// HERE'S A FUNNY THING

class CodeListener {
  private buffer: string = '';
  private readonly code: string;
  private readonly onMatch: () => void;
  private resetTimer: number | null = null;
  private readonly resetDelayMs: number;

  constructor(code: string, onMatch: () => void, resetDelayMs = 2000) {
    this.code = code.toLowerCase();
    this.onMatch = onMatch;
    this.resetDelayMs = resetDelayMs;
    document.addEventListener('keydown', this.handleKeydown);
  }

  private handleKeydown = (e: KeyboardEvent): void => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      // IGNORE if typing in input / textarea
      return;
    }
    if (e.key.length !== 1) return; // only care about singular characters
    
    this.buffer += e.key.toLowerCase();
    if (this.buffer.length > this.code.length) { 
      this.buffer = this.buffer.slice(-this.code.length);
      // if buffer is longer than code, consider buffer up to code len
    }
    if (this.buffer === this.code) {
      this.onMatch();
      this.buffer = '';
    }

    // reset if you take too long
    if (this.resetTimer) window.clearTimeout(this.resetTimer);
    this.resetTimer = window.setTimeout(() => {
      this.buffer = '';
      console.log("keypress timeout");
    }, this.resetDelayMs);
  };

  destroy(): void {
    document.removeEventListener('keydown', this.handleKeydown);
    if (this.resetTimer) window.clearTimeout(this.resetTimer);
  }
}


new CodeListener('xyzzy', () => {
  window.location.href = '/portfolio/';
});

new CodeListener('blog', () => {
  window.location.href = '/blog/';
});

new CodeListener('playground', () => {
  window.location.href = '/playground/';
});