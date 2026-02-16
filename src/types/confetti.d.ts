// Type declarations for canvas-confetti

declare module 'canvas-confetti' {
  interface ConfettiOptions {
    particleCount?: number;
    spread?: number;
    origin?: { y?: number; x?: number };
    colors?: string[];
    zIndex?: number;
    disableForReducedMotion?: boolean;
    scalar?: number;
    startVelocity?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    shapes?: ('square' | 'circle')[];
  }

  function confetti(options?: ConfettiOptions): Promise<void>;
  export = confetti;
}
