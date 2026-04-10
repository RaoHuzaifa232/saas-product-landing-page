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
  selector: 'app-testimonials',
  standalone: true,
  imports: [],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css',
})
export class TestimonialsComponent implements AfterViewInit, OnDestroy {
  readonly testimonials = [
    {
      initials: 'SC',
      name: 'Sarah Chen',
      role: 'Head of Product',
      company: 'Stripe',
      quote: '"FlowDesk cut our sprint planning time in half. It just gets out of the way and lets us build."',
      rating: 5,
    },
    {
      initials: 'MR',
      name: 'Marcus Rivera',
      role: 'Engineering Lead',
      company: 'Vercel',
      quote: '"Finally a tool that developers actually enjoy using. The keyboard shortcuts alone sold me."',
      rating: 5,
    },
    {
      initials: 'AP',
      name: 'Aisha Patel',
      role: 'CEO',
      company: 'Launchpad',
      quote: '"We replaced 3 tools with FlowDesk. Our team has never been more aligned or productive."',
      rating: 5,
    },
  ];

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
      // Stagger up the testimonials
      gsap.fromTo(
        '.testimonial-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#testimonials',
            start: 'top 80%',
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
