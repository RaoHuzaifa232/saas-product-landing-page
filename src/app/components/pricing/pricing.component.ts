import {
  Component,
  AfterViewInit,
  ElementRef,
  Inject,
  PLATFORM_ID,
  OnDestroy,
  signal,
  effect,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css',
})
export class PricingComponent implements AfterViewInit, OnDestroy {
  readonly isYearly = signal(false);

  readonly plans = [
    {
      name: 'Free',
      monthlyPrice: 0,
      yearlyPrice: 0,
      isCustom: false,
      isPopular: false,
      features: [
        '3 projects',
        '5 members',
        'basic analytics',
        '2GB storage',
      ],
      ctaText: 'Get Started Free',
      ctaStyle: 'ghost',
    },
    {
      name: 'Pro',
      monthlyPrice: 12,
      yearlyPrice: 9.6, // monthly equivalent when paid yearly
      isCustom: false,
      isPopular: true,
      features: [
        'Unlimited projects',
        '20 members',
        'advanced analytics',
        '20GB storage',
        'priority support',
      ],
      ctaText: 'Start Pro Trial',
      ctaStyle: 'filled',
    },
    {
      name: 'Enterprise',
      monthlyPrice: 0,
      yearlyPrice: 0,
      isCustom: true,
      isPopular: false,
      features: [
        'Unlimited everything',
        'SSO',
        'SLA guarantee',
        'dedicated support',
        'custom integrations',
      ],
      ctaText: 'Contact Sales',
      ctaStyle: 'ghost',
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

    // Effect to trigger price animation whenever `isYearly` toggles
    effect(() => {
      const yearly = this.isYearly();
      if (this.isBrowser && this.ctx) {
        // Animate the price text swapping
        gsap.fromTo(
          '.price-amount',
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' }
        );
      }
    });
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    this.ctx = gsap.context(() => {
      // ScrollTrigger for staggering cards in
      gsap.fromTo(
        '.pricing-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#pricing',
            start: 'top 75%',
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

  toggleBilling(yearly: boolean): void {
    this.isYearly.set(yearly);
  }

  // Helper method to format displayed price
  formatPrice(plan: any, isYearly: boolean): string {
    if (plan.isCustom) return 'Custom';
    const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
    // Format to 2 decimal places if it's not a whole number (e.g. 9.60)
    return price % 1 !== 0 ? price.toFixed(2) : price.toString();
  }
}
