
export const playClickSound = () => {
  // Premium soft click sound
  const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
  audio.volume = 0.3; // Not too loud
  audio.play().catch(() => {
    // Ignore autoplay errors if user hasn't interacted yet, 
    // though usually they have by the time they click a button.
  });
};
