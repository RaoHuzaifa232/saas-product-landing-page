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
  selector: 'app-features',
  standalone: true,
  imports: [],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css',
})
export class FeaturesComponent implements AfterViewInit, OnDestroy {
  readonly features = [
    {
      title: 'Real-time Collaboration',
      description: 'Sync with your entire team in milliseconds. Edit, comment, and ideate together without friction.',
      icon: 'users',
    },
    {
      title: 'Smart Automation',
      description: 'Automate repetitive workflows with our visual builder. Save hours every week on manual tasks.',
      icon: 'zap',
    },
    {
      title: 'Visual Roadmaps',
      description: 'Plan your product journey with interactive timelines that keep every stakeholder aligned.',
      icon: 'map',
    },
    {
      title: 'Time Tracking',
      description: 'Seamlessly log hours directly within your tasks. Deep integration for accurate project billing.',
      icon: 'clock',
    },
    {
      title: 'File Sharing',
      description: 'Centralized asset management with version control. Never lose a design file or document again.',
      icon: 'paperclip',
    },
    {
      title: 'Analytics & Reports',
      description: 'Gain actionable insights into team velocity and project health with beautiful data visualizations.',
      icon: 'bar-chart',
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
      gsap.fromTo(
        '.feature-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 85%',
          },
        }
      );
    }, this.el.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
