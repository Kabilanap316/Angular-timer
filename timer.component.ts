// src/app/timer/timer.component.ts
import { Component, OnDestroy } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  private timer$: any;
  public timerValue: number = 0;
  public isRunning: boolean = false;

  formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;
    return `${this.padTime(minutes)}:${this.padTime(remainingSeconds)}`;
  }

  padTime(time: number): string {
    return (time < 10) ? `0${time}` : `${time}`;
  }

  startTimer(): void {
    if (!this.isRunning) {
      this.timer$ = interval(1000)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.timerValue++;
        });
      this.isRunning = true;
    }
  }

  stopTimer(): void {
    if (this.isRunning) {
      this.timer$.unsubscribe();
      this.isRunning = false;
    }
  }

  resumeTimer(): void {
    this.startTimer();
  }

  resetTimer(): void {
    this.stopTimer();
    this.timerValue = 0;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
