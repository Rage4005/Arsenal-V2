export const gamesData = [
  { id: 'spider-man-2', title: "Marvel's Spider-Man 2", image: 'assets/spd 2.jpeg', price: 69.99, originalPrice: 79.99, discount: '15%', genre: 'Action, Adventure', categories: ['action', 'adventure', 'superhero'], rating: 4.5, ratingCount: 1240 },
  { id: 'cyberpunk-2077', title: "Cyberpunk 2077", image: 'assets/Cyberpunk.jpg', price: 29.99, originalPrice: 59.99, discount: '50%', genre: 'RPG, Action', categories: ['rpg', 'action', 'open-world', 'sci-fi'], rating: 4.0, ratingCount: 8900 },
  { id: 'elden-ring', title: "Elden Ring", image: 'assets/Elden ring.jpeg', price: 59.99, genre: 'Action RPG', categories: ['action', 'rpg', 'souls-like', 'open-world'], rating: 5.0, ratingCount: 20500 },
  { id: 'ghost-of-tsushima', title: "Ghost of Tsushima", image: 'assets/Ghost of thushima.png', price: 49.99, originalPrice: 59.99, discount: '15%', genre: 'Action, Adventure', categories: ['action', 'adventure', 'open-world'], rating: 4.8, ratingCount: 1560 },
  { id: 'starfield', title: "Starfield", image: 'assets/starfiled.jpg', price: 49.99, originalPrice: 69.99, discount: '25%', genre: 'RPG', categories: ['rpg', 'open-world', 'sci-fi'], rating: 3.8, ratingCount: 4500 },
  { id: 'remnant-2', title: "Remnant 2 - Ultimate Edition", image: 'assets/remant 2.jpg', price: 52.00, genre: 'Action Shooter', categories: ['action', 'shooter', 'co-op', 'souls-like'], rating: 4.2, ratingCount: 300 },
  { id: 'baldurs-gate-3', title: "Baldur's Gate 3", image: 'assets/BG3.gif', price: 59.99, genre: 'RPG', categories: ['rpg', 'strategy', 'fantasy'], rating: 5.0, ratingCount: 3200 },
  { id: 'sekiro', title: "Sekiro: Shadows Die Twice", image: 'assets/sekiro.jpg', price: 39.99, originalPrice: 59.99, discount: '33%', genre: 'Action, Adventure', categories: ['action', 'adventure', 'souls-like'], rating: 4.9, ratingCount: 15200 },
  { id: 'silent-hill-2', title: "Silent Hill 2", image: 'assets/silent-hill-2.jpg', price: 59.99, genre: 'Horror, Survival', categories: ['horror', 'survival', 'psychological'], rating: 4.7, ratingCount: 8700 },
  { id: 'resident-evil-1', title: "Resident Evil HD Remaster", image: 'assets/re1.jpg', price: 19.99, originalPrice: 29.99, discount: '33%', genre: 'Horror, Survival', categories: ['horror', 'survival', 'action'], rating: 4.5, ratingCount: 6300 },
  { id: 'resident-evil-2', title: "Resident Evil 2 Remake", image: 'assets/re2.jpg', price: 29.99, genre: 'Horror, Survival', categories: ['horror', 'survival', 'action'], rating: 4.8, ratingCount: 12400 },
  { id: 'resident-evil-3', title: "Resident Evil 3 Remake", image: 'assets/re3.jpg', price: 24.99, originalPrice: 39.99, discount: '37%', genre: 'Horror, Survival', categories: ['horror', 'survival', 'action'], rating: 4.3, ratingCount: 5600 },
  { id: 'detroit-become-human', title: "Detroit: Become Human", image: 'assets/detroit.jpg', price: 29.99, genre: 'Adventure, Interactive', categories: ['adventure', 'interactive', 'sci-fi', 'story-rich'], rating: 4.6, ratingCount: 9800 },
  { id: 'a-plague-tale', title: "A Plague Tale: Requiem", image: 'assets/plague-tale.jpg', price: 34.99, originalPrice: 49.99, discount: '30%', genre: 'Adventure, Stealth', categories: ['adventure', 'stealth', 'horror', 'story-rich'], rating: 4.5, ratingCount: 4200 },
  { id: 'wuthering-waves', title: "Wuthering Waves", image: 'assets/wuthering-waves.jpg', price: 0.00, discount: 'Free', genre: 'Action RPG', categories: ['action', 'rpg', 'open-world', 'gacha', 'free-to-play'], rating: 4.2, ratingCount: 18500 },
  { id: 'spider-man-remastered', title: "Marvel's Spider-Man Remastered", image: 'assets/spider-man-remastered.jpg', price: 39.99, genre: 'Action, Adventure', categories: ['action', 'adventure', 'superhero', 'open-world'], rating: 4.7, ratingCount: 14300 },
  { id: 'spider-man-miles-morales', title: "Spider-Man: Miles Morales", image: 'assets/miles-morales.jpg', price: 34.99, originalPrice: 49.99, discount: '30%', genre: 'Action, Adventure', categories: ['action', 'adventure', 'superhero', 'open-world'], rating: 4.6, ratingCount: 11200 },
  { id: 'batman-arkham-knight', title: "Batman: Arkham Knight", image: 'assets/batman-arkham-knight.jpg', price: 14.99, originalPrice: 29.99, discount: '50%', genre: 'Action, Adventure', categories: ['action', 'adventure', 'superhero', 'open-world'], rating: 4.5, ratingCount: 16800 },
  { id: 'dispatch', title: "Dispatch", image: 'assets/dispatch.jpg', price: 24.99, genre: 'Strategy, Simulation', categories: ['strategy', 'simulation', 'management'], rating: 4.0, ratingCount: 2100 },
];

// Only show a curated subset on the home page
export const homePageGames = gamesData.slice(0, 7);

export const popularThisWeek = [gamesData[2], gamesData[0], gamesData[6], gamesData[3]];
export const frequentlyBought = [gamesData[1], gamesData[7], gamesData[10], gamesData[12]];
export const mostlyPlayed = [gamesData[14], gamesData[9], gamesData[4], gamesData[5]];
