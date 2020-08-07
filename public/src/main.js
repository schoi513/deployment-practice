console.log('main.js connected!');

function getRandomAnimal() {
  const animalEmoji = '🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐨 🐯 🦁 🐮 🐷 🐸 🐵 🐔 🐧 🐣 🦆 🦅 🦉 🦇 🐺 🐗 🐴 🐢 🐙 🦑 🐬 🐋 🦈';
  const emojiArr = animalEmoji.split(' ');
  return emojiArr[Math.floor(Math.random() * emojiArr.length)];
}

document.addEventListener('DOMContentLoaded', () => {
  const bigAnimal = document.querySelector('.biganimal');
  bigAnimal.innerText = getRandomAnimal();
})
