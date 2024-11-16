import { defineStore } from 'pinia'

const baseLevelScore = 25;

// Массив уровней
const levels = new Array(15)
  .fill(0)
  .map((_, i) => baseLevelScore * Math.pow(2, i));

// Массив для накопленных очков до каждого уровня
const levelScores = levels.map((_, level) => {
  let sum = 0;

  for (let [index, value] of levels.entries()) {
    if (index >= level) {
      return sum + value;
    }
    sum += value;
  }

  return sum;
});

// Функция для вычисления уровня по текущему количеству очков
function computeLevelByScore(score) {
  for (let [index, value] of levelScores.entries()) {
    if (score <= value) {
      return {
        level: index,
        value: levels[index],
      };
    }
  }
  return { level: levels.length, value: levels[levels.length - 1] };
}

// Pinia store
export const useScoreStore = defineStore('score', {
  state: () => ({
    score: 0,
  }),
  getters: {
    // Геттер для получения текущего уровня
    level(state) {
      return computeLevelByScore(state.score);
    },
    // Геттер для вычисления текущего очка внутри уровня
    currentScore(state) {
      const currentLevel = this.level;
      if (currentLevel.level === 0) {
        return state.score;
      }
      return state.score - levelScores[currentLevel.level - 1];
    },
  },
  actions: {
    // Метод для добавления очков
    add(score = 1) {
      this.score += score;
    },
    // Метод для установки конкретного значения очков
    setScore(score) {
      this.score = score;
    },
  },
});
