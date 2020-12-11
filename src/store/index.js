import { BehaviorSubject } from 'rxjs';

const subscriber = new BehaviorSubject({
    totalWords: 0,
    correct: 0,
    error: 0,
    testWordsCount: 0,
    score: 0
});

export { subscriber };