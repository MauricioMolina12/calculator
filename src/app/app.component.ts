import { NgFor } from '@angular/common';
import {
  Component,
  ElementRef,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgFor, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app-calculator';
  key: any;
  summary: any = 0;
  @ViewChildren('key') keyButtons!: QueryList<ElementRef>;

  constructor(private renderer: Renderer2) {}

  buttons = [
    {
      label: 'AC',
    },
    {
      label: 'DE',
    },
    {
      label: '.',
    },
    {
      label: '/',
    },
    {
      label: '7',
    },
    {
      label: '8',
    },
    {
      label: '9',
    },
    {
      label: 'x',
    },
    {
      label: '4',
    },
    {
      label: '5',
    },
    {
      label: '6',
    },
    {
      label: '-',
    },
    {
      label: '1',
    },
    {
      label: '2',
    },
    {
      label: '3',
    },
    {
      label: '+',
    },
    {
      label: '00',
    },
    {
      label: '0',
    },
    {
      label: '=',
    },
  ];

  addToDisplay(value: string, event: Event) {
    const button = event.target as HTMLElement;
    this.renderer.addClass(button, 'active');
    setTimeout(() => this.renderer.removeClass(button, 'active'), 200);

    if(this.summary.length > 9 && ['0','1','2','3','4','5','6','7','8','9'].includes(value)){
      return;
    }


    if (!this.summary) {
      this.summary = '';
    }

    if (value === 'AC') {
      this.summary = '';
      return;
    }

    if (value === 'DE') {
      this.summary = this.summary.slice(0, -1);
      return;
    }

    if (value === 'x') {
      value = '*';
    }

    const lastChar = this.summary.slice(-1);
    const operators = ['+', '-', '*', '/'];
    if (operators.includes(lastChar) && operators.includes(value)) {
      return;
    }

    if (value === '.') {
      const lastNumber = this.summary.split(/[\+\-\*\/]/).pop();
      if (lastNumber && lastNumber.includes('.')) {
        return;
      }
    }

    if (value === '=') {
      try {
        this.summary = eval(this.summary).toString();
      } catch (e) {
        this.summary = 'Error';
      }
      return;
    }

    this.summary += value;
  }
}
