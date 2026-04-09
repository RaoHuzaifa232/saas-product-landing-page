import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Inject,
  PLATFORM_ID,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroSection', { static: true }) heroRef!: ElementRef<HTMLElement>;
  @ViewChild('mockup', { static: false }) mockupRef!: ElementRef<HTMLElement>;

  /** Headline split into individual words for GSAP stagger */
  readonly headlineWords = ['Ship', 'Projects.'];
  readonly headlineMutedWords = ['Not', 'Excuses.'];

  /** Avatar images for social proof */
  readonly avatars = [
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwUGrMtUbBHmwkNn7n6OsUJxBKbc9QwRlPJbi-93_gX5otoCrza4PCciF8jjqTuX3FgBDRva9KtW4DzYR3WkjHsJgQw_ZlWTrIECaSRFdDr3DCo0iys8xOKKUBOYlB9GNMadbjBPoZmKPCaUh4iknnfyOHRpnKVgqiF_-nN9vo98bksJtaYEFp19k728PfpEobN58OCOqBLA5L-3m6H4quGc_2lLSf5MprlbAljXDxIjo7cc7rvFlNgAuh6DSUop1A50N6bs_5gMA',
      alt: 'Software engineer',
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpAIl4qn9J__BuA6t5x88cKYWQUwD26Eem9H5abJTYohKoESdy_HsPKfru9-0fiGNr4rnxDaUcy_HOfN5dKmZI5ZbKG0BLY5OMf1eZY3860RUUefeyso_hXSkRRS5oR4LuahGkPF6rEPJWZzErIxEnqZlLEel4h297Yixe7H14G7Bz2j0h0VErLLaAXFup5PfvDTK-2Vph5qnfsyObbY2NQHNaUgXb5y9WhJ7EsfYfUWhH67X5U9V7wZRSkIN1my5SnAODjBB5o98',
      alt: 'Developer',
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv-h13eGwHOVWly9dwT1_9AAZDY0ydfKzfPG7sXN6qsuKbOlHkUAgurUYLLPrPJzSUpn7lj_SSh7HLaTuw22fdvBJNVeYyQ9adW-OzwObGVSiLxmY417ekBsW1sLT0DRdaGF1q5sb42vwmwuNBYJis_b8RLAaETPl6fD-f_qfmhup2StiHZR3Fgc4d8pUfi6m6_m5qW3K0x8FNxVKj6vpCGTLda3q12Wtbi7e3gNUCqA09P_70tRggz8lUTfwX4Mgi0m-HxEzhCl0',
      alt: 'Engineer',
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAp6IkYOGZwnq9HkxvUXPv1kdABeRK2LKTuDYjVnS4Oy_nsyREXJjr3EJOXTCR9vfrZBHuhPmg0Dx-8VkBl7J02BED-Fv0V5jJqk2kP6KffjXbzphaQ5dp42MW-tOZByFs2a-IVieSq6Fa4jHW3Bsinfn7aTOkYIPLGt1xfbofFEQMhnLms5_r8J2nqog2QW4CG4V50lA-4tEuzsttBlIY8k6ZqMJ5Eko7sU8JJsXID9-KNhf8Dwpj9kRlxT6t95YwA3P1To_xi51c',
      alt: 'Designer',
    },
  ];

  /** Kanban columns for the mockup */
  readonly kanbanColumns = [
    {
      title: 'To Do',
      titleColor: 'text-slate-500',
      cards: [
        {
          accentColor: 'bg-cyan-400/30',
          label: 'Refactor Auth',
          tag: '#432',
          tagColor: 'text-slate-400',
          borderClass: 'border-white/5',
          bgClass: 'bg-white/[0.04]',
          hasAvatar: false,
        },
      ],
    },
    {
      title: 'Active',
      titleColor: 'text-indigo-400',
      cards: [
        {
          accentColor: 'bg-indigo-500',
          label: 'Deploy V2.0',
          tag: 'Live',
          tagColor: 'text-indigo-400',
          borderClass: 'border-indigo-500/20',
          bgClass: 'bg-white/[0.06]',
          hasAvatar: true,
          avatarSrc:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB0qC4sUkQsN7pH9Pqh6O9Zs_QW-PsvQpTaD2chH2EOqN2KOEDb-IwIdhXGiBeLNqkdwb06DJDF2Tz7nm002SrrW_wh4r9MgytFeLrSOjiJ6RClpJ6pO9qM7boyiox0rII7wpLWE0JDtgQhZG4cv8IS94eQ07q2PHMgeiGAga3hRk7DQO9D0d_Mt2I2U0ATFcYHwcB22iZSQwXu9_tvmG-lLuynBYJD7vkD7PTjPEAdaPvG_fGmboejwoAjzEaGCdwITe-q1gQ4qRk',
          ring: true,
        },
        {
          accentColor: 'bg-slate-600/30',
          label: 'API Polish',
          tag: '',
          tagColor: '',
          borderClass: 'border-white/5',
          bgClass: 'bg-white/[0.04]',
          hasAvatar: false,
        },
      ],
    },
    {
      title: 'Done',
      titleColor: 'text-emerald-400',
      cards: [
        {
          accentColor: 'bg-emerald-400/30',
          label: 'Core UI Kit',
          tag: '',
          tagColor: '',
          borderClass: 'border-white/5',
          bgClass: 'bg-white/[0.03] opacity-50',
          hasAvatar: false,
        },
      ],
    },
  ];

  /** Velocity bar chart data (percentage heights) */
  readonly velocityBars = [
    { height: '40%', color: 'bg-indigo-500/20' },
    { height: '60%', color: 'bg-indigo-500/40' },
    { height: '30%', color: 'bg-indigo-500/60' },
    { height: '90%', color: 'bg-indigo-500' },
    { height: '75%', color: 'bg-cyan-400' },
  ];

  private isBrowser: boolean;
  private mouseMoveHandler: ((e: MouseEvent) => void) | null = null;
  private floatTween: gsap.core.Tween | null = null;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    const section = this.heroRef.nativeElement;

    // ─── Badge entrance ────────────────────────────────────────────
    gsap.from(section.querySelector('.hero-badge'), {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: 0.3,
      ease: 'power2.out',
    });

    // ─── Headline words stagger ────────────────────────────────────
    gsap.from(section.querySelectorAll('.hero-word'), {
      opacity: 0,
      y: 40,
      stagger: 0.08,
      duration: 0.7,
      delay: 0.5,
      ease: 'power3.out',
    });

    // ─── Subheadline ───────────────────────────────────────────────
    gsap.from(section.querySelector('.hero-sub'), {
      opacity: 0,
      y: 25,
      duration: 0.7,
      delay: 1.0,
      ease: 'power2.out',
    });

    // ─── Buttons stagger ───────────────────────────────────────────
    gsap.from(section.querySelectorAll('.hero-btn'), {
      opacity: 0,
      y: 20,
      stagger: 0.12,
      duration: 0.6,
      delay: 1.2,
      ease: 'power2.out',
    });

    // ─── Social proof ──────────────────────────────────────────────
    gsap.from(section.querySelector('.hero-social'), {
      opacity: 0,
      y: 15,
      duration: 0.6,
      delay: 1.5,
      ease: 'power2.out',
    });

    // ─── Mockup entrance + float ───────────────────────────────────
    const mockupEl = section.querySelector('.mockup');
    if (mockupEl) {
      gsap.from(mockupEl, {
        opacity: 0,
        x: 60,
        rotateY: -8,
        duration: 1.0,
        delay: 0.8,
        ease: 'power3.out',
      });

      // Floating idle animation
      this.floatTween = gsap.to(mockupEl, {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        ease: 'sine.inOut',
        delay: 2.0,
      });

      // ─── Mouse parallax on mockup ──────────────────────────────
      this.mouseMoveHandler = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xPercent = (clientX / innerWidth - 0.5) * 2; // -1 to 1
        const yPercent = (clientY / innerHeight - 0.5) * 2;

        gsap.to(mockupEl, {
          rotateY: xPercent * 5,
          rotateX: -yPercent * 3,
          duration: 0.8,
          ease: 'power1.out',
          overwrite: 'auto',
        });
      };
      document.addEventListener('mousemove', this.mouseMoveHandler);
    }

    // ─── Background blobs pulse ────────────────────────────────────
    gsap.to(section.querySelectorAll('.glow-blob'), {
      scale: 1.15,
      opacity: 0.15,
      repeat: -1,
      yoyo: true,
      duration: 4,
      ease: 'sine.inOut',
      stagger: 0.8,
    });
  }

  ngOnDestroy(): void {
    if (this.mouseMoveHandler) {
      document.removeEventListener('mousemove', this.mouseMoveHandler);
    }
    if (this.floatTween) {
      this.floatTween.kill();
    }
  }
}
