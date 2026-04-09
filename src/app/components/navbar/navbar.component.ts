import {
  Component,
  AfterViewInit,
  HostListener,
  signal,
  ElementRef,
  ViewChild,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements AfterViewInit {
  /** Whether the page has been scrolled past the threshold */
  isScrolled = signal(false);

  /** Mobile menu open/close state */
  mobileMenuOpen = signal(false);

  /** Navigation links with section anchors */
  readonly navLinks = [
    { label: 'Features', sectionId: 'features' },
    { label: 'How It Works', sectionId: 'how-it-works' },
    { label: 'Pricing', sectionId: 'pricing' },
    { label: 'Testimonials', sectionId: 'testimonials' },
  ];

  /** Track which link is currently "active" based on scroll position */
  activeSection = signal('features');

  @ViewChild('navBar', { static: true }) navBarRef!: ElementRef<HTMLElement>;
  @ViewChild('mobileMenu', { static: false }) mobileMenuRef!: ElementRef<HTMLElement>;

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // ─── Scroll Detection ──────────────────────────────────────────────
  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (!this.isBrowser) return;
    this.isScrolled.set(window.scrollY > 20);
    this.updateActiveSection();
  }

  // ─── GSAP Entrance Animations ──────────────────────────────────────
  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    const nav = this.navBarRef.nativeElement;

    // Animate the whole navbar sliding down + fading in
    gsap.from(nav, {
      y: -80,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
    });

    // Stagger the nav links
    const links = nav.querySelectorAll('.nav-link');
    gsap.from(links, {
      y: -20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.4,
      ease: 'power2.out',
    });

    // Animate CTA button
    const cta = nav.querySelector('.cta-btn');
    if (cta) {
      gsap.from(cta, {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        delay: 0.8,
        ease: 'back.out(1.7)',
      });
    }

    // Animate logo
    const logo = nav.querySelector('.logo');
    if (logo) {
      gsap.from(logo, {
        x: -30,
        opacity: 0,
        duration: 0.7,
        delay: 0.2,
        ease: 'power2.out',
      });
    }
  }

  // ─── Smooth Scroll ─────────────────────────────────────────────────
  scrollToSection(sectionId: string): void {
    if (!this.isBrowser) return;

    this.activeSection.set(sectionId);

    const el = document.getElementById(sectionId);
    if (el) {
      const navHeight = this.navBarRef.nativeElement.offsetHeight;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    }

    // Close mobile menu after navigation
    this.mobileMenuOpen.set(false);
  }

  // ─── Mobile Menu Toggle ────────────────────────────────────────────
  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((v) => !v);

    // Animate mobile menu when opening
    if (this.isBrowser && this.mobileMenuOpen()) {
      requestAnimationFrame(() => {
        const menuEl = document.querySelector('.mobile-menu');
        if (menuEl) {
          // Use clipPath for a reveal effect instead of height (avoids overflow clipping)
          gsap.fromTo(
            menuEl,
            { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
            {
              clipPath: 'inset(0 0 0% 0)',
              opacity: 1,
              duration: 0.45,
              ease: 'power3.out',
            },
          );
          const items = menuEl.querySelectorAll('.mobile-nav-link');
          gsap.fromTo(
            items,
            { y: -12, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.35,
              stagger: 0.06,
              delay: 0.12,
              ease: 'power2.out',
            },
          );

          // Animate CTA buttons
          const ctaButtons = menuEl.querySelectorAll('button');
          gsap.fromTo(
            ctaButtons,
            { y: 10, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.35,
              stagger: 0.08,
              delay: 0.3,
              ease: 'power2.out',
            },
          );
        }
      });
    }
  }

  // ─── Active Section Detection ──────────────────────────────────────
  private updateActiveSection(): void {
    if (!this.isBrowser) return;

    const navHeight = this.navBarRef.nativeElement.offsetHeight;
    for (const link of [...this.navLinks].reverse()) {
      const el = document.getElementById(link.sectionId);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= navHeight + 100) {
          this.activeSection.set(link.sectionId);
          return;
        }
      }
    }
  }
}
