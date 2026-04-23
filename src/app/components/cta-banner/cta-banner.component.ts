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
  selector: 'app-cta-banner',
  standalone: true,
  imports: [],
  templateUrl: './cta-banner.component.html',
  styleUrl: './cta-banner.component.css',
})
export class CtaBannerComponent implements AfterViewInit, OnDestroy {
  // Generate 20 floating particles
  readonly particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2, // 2px to 6px
    left: Math.random() * 100, // 0% to 100%
    top: Math.random() * 100, // 0% to 100%
    opacity: Math.random() * 0.4 + 0.1, // 0.1 to 0.5
  }));

  private isBrowser: boolean;
  private ctx: gsap.Context | null = null;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    this.ctx = gsap.context(() => {
      // 1. Heading slide up on scroll
      gsap.fromTo(
        '.cta-content-animate',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#cta-banner',
            start: 'top 80%',
          },
        }
      );

      // 2. Continuous pulse for the button
      gsap.to('.cta-button', {
        scale: 1.03,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 3. Random floating particle motion
      gsap.utils.toArray('.particle').forEach((elem: any) => {
        gsap.to(elem, {
          x: 'random(-40, 40)',
          y: 'random(-40, 40)',
          rotation: 'random(-180, 180)',
          duration: 'random(3, 8)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, this.el.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
