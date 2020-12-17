import { BehaviorSubject } from 'rxjs';

export const subscriber = new BehaviorSubject({
    total: 0,
    correct: 0,
    error: 0,
    score: 0
});
