import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-logos',
  standalone: true,
  imports: [],
  templateUrl: './logos.component.html',
  styleUrl: './logos.component.css',
})
export class LogosComponent implements AfterViewInit {
  @ViewChild('logosSection', { static: true }) sectionRef!: ElementRef<HTMLElement>;

  /** Company names for the marquee */
  readonly logos: string[] = [
    'Dropbox',
    'Stripe',
    'Figma',
    'Vercel',
    'Notion',
    'Linear',
    'Shopify',
    'Atlassian',
  ];

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    const section = this.sectionRef.nativeElement;

    // Fade-in the entire section
    gsap.from(section, {
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: 'power2.out',
    });

    // Stagger-fade the label text
    const label = section.querySelector('.logos-label');
    if (label) {
      gsap.from(label, {
        opacity: 0,
        y: 10,
        duration: 0.5,
        delay: 0.4,
        ease: 'power2.out',
      });
    }
  }
}
