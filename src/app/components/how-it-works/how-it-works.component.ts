import {
  Component,
  AfterViewInit,
  ElementRef,
  Inject,
  PLATFORM_ID,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.css',
})
export class HowItWorksComponent implements AfterViewInit, OnDestroy {
  readonly steps = [
    {
      number: '01',
      title: 'Create your workspace',
      description: 'Set up your team space in under 60 seconds.',
      icon: 'layers',
    },
    {
      number: '02',
      title: 'Invite your team',
      description: 'Add teammates and assign roles instantly.',
      icon: 'users',
    },
    {
      number: '03',
      title: 'Start shipping',
      description: 'Plan, track, and deliver projects on time.',
      icon: 'rocket',
    },
  ];

  private isBrowser: boolean;
  private ctx: gsap.Context | null = null;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    this.ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#how-it-works',
          start: 'top 75%',
        },
      });

      // Stagger fade-in the steps
      tl.fromTo(
        '.step-item',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power3.out',
        }
      );

      // Draw the SVG dashed line (if visible on desktop)
      const line = this.el.nativeElement.querySelector('.progress-line');
      if (line) {
        // Find line length to calculate correct dashoffset
        const length = line.getTotalLength ? line.getTotalLength() : 1000;
        gsap.set(line, { strokeDasharray: 10 + ' ' + 10, strokeDashoffset: length });
        tl.to(
          line,
          {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: 'power2.out',
          },
          '<0.4' // start slightly after the steps start fading in
        );
      }
    }, this.el.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
