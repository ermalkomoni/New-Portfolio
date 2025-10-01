import { useEffect, useRef, useCallback } from 'react';

interface SmoothScrollOptions {
  frameRate?: number;
  animationTime?: number;
  stepSize?: number;
  pulseAlgorithm?: boolean;
  pulseScale?: number;
  pulseNormalize?: number;
  accelerationDelta?: number;
  accelerationMax?: number;
  keyboardSupport?: boolean;
  arrowScroll?: number;
  fixedBackground?: boolean;
  excluded?: string;
}

const defaultOptions: Required<SmoothScrollOptions> = {
  frameRate: 150,
  animationTime: 600,
  stepSize: 80,
  pulseAlgorithm: true,
  pulseScale: 4,
  pulseNormalize: 1,
  accelerationDelta: 50,
  accelerationMax: 3,
  keyboardSupport: true,
  arrowScroll: 50,
  fixedBackground: true,
  excluded: ''
};

export const useSmoothScroll = (options: SmoothScrollOptions = {}) => {
  const config = { ...defaultOptions, ...options };
  const que = useRef<Array<{
    x: number;
    y: number;
    lastX: number;
    lastY: number;
    start: number;
  }>>([]);
  const pending = useRef(false);
  const lastScroll = useRef(Date.now());
  const direction = useRef({ x: 0, y: 0 });
  const deltaBuffer = useRef<number[]>([]);
  const deltaBufferTimer = useRef<NodeJS.Timeout>();
  const clearCacheTimer = useRef<NodeJS.Timeout>();
  const cacheX = useRef<Record<string, Element>>({});
  const cacheY = useRef<Record<string, Element>>({});
  const smoothBehaviorForElement = useRef<Record<string, boolean>>({});

  const isMac = /^Mac/.test(navigator.platform);
  const isChrome = /chrome/i.test(navigator.userAgent);
  const isSafari = /safari/i.test(navigator.userAgent);
  const isMobile = /mobile/i.test(navigator.userAgent);
  const isEnabledForBrowser = (isChrome || isSafari) && !isMobile;

  const key = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    spacebar: 32,
    pageup: 33,
    pagedown: 34,
    end: 35,
    home: 36
  };

  const arrowKeys = { 37: 1, 38: 1, 39: 1, 40: 1 };

  // Utility functions
  const uniqueID = (() => {
    let i = 0;
    return (el: Element) => {
      return (el as any).uniqueID || ((el as any).uniqueID = i++);
    };
  })();

  const requestFrame = (callback: () => void, element: Element, delay: number) => {
    return requestAnimationFrame(callback);
  };

  const getScrollRoot = () => {
    return document.scrollingElement || document.documentElement;
  };

  const isNodeName = (el: Element | null, tag: string) => {
    return el && (el.nodeName || '').toLowerCase() === tag.toLowerCase();
  };

  const isDivisible = (n: number, divisor: number) => {
    return Math.floor(n / divisor) === n / divisor;
  };

  const allDeltasDivisableBy = (divisor: number) => {
    return (
      isDivisible(deltaBuffer.current[0], divisor) &&
      isDivisible(deltaBuffer.current[1], divisor) &&
      isDivisible(deltaBuffer.current[2], divisor)
    );
  };

  const isTouchpad = (deltaY: number) => {
    if (!deltaY) return false;
    if (!deltaBuffer.current.length) {
      deltaBuffer.current = [deltaY, deltaY, deltaY];
    }
    deltaY = Math.abs(deltaY);
    deltaBuffer.current.push(deltaY);
    deltaBuffer.current.shift();
    
    clearTimeout(deltaBufferTimer.current);
    deltaBufferTimer.current = setTimeout(() => {
      try {
        localStorage.setItem('SS_deltaBuffer', deltaBuffer.current.join(','));
      } catch (e) {
        // Handle localStorage errors
      }
    }, 1000);

    const dpiScaledWheelDelta = deltaY > 120 && allDeltasDivisableBy(deltaY);
    const tp = !allDeltasDivisableBy(120) && !allDeltasDivisableBy(100) && !dpiScaledWheelDelta;
    if (deltaY < 50) return true;
    return tp;
  };

  const directionCheck = (x: number, y: number) => {
    x = x > 0 ? 1 : -1;
    y = y > 0 ? 1 : -1;
    if (direction.current.x !== x || direction.current.y !== y) {
      direction.current.x = x;
      direction.current.y = y;
      que.current = [];
      lastScroll.current = 0;
    }
  };

  const pulse = (x: number) => {
    if (x >= 1) return 1;
    if (x <= 0) return 0;

    if (config.pulseNormalize === 1) {
      config.pulseNormalize /= pulse_(1);
    }
    return pulse_(x);
  };

  const pulse_ = (x: number) => {
    let val, start, expx;
    x = x * config.pulseScale;
    if (x < 1) {
      val = x - (1 - Math.exp(-x));
    } else {
      start = Math.exp(-1);
      x -= 1;
      expx = 1 - Math.exp(-x);
      val = start + expx * (1 - start);
    }
    return val * config.pulseNormalize;
  };

  const getCache = (el: Element, x: boolean) => {
    return (x ? cacheX.current : cacheY.current)[uniqueID(el)];
  };

  const setCache = (elems: Element[], overflowing: Element, x: boolean) => {
    const cache = x ? cacheX.current : cacheY.current;
    for (let i = elems.length; i--; ) {
      cache[uniqueID(elems[i])] = overflowing;
    }
    return overflowing;
  };

  const isContentOverflowing = (el: Element) => {
    return (el as HTMLElement).clientHeight + 10 < (el as HTMLElement).scrollHeight;
  };

  const overflowNotHidden = (el: Element) => {
    const overflow = getComputedStyle(el, '').getPropertyValue('overflow-y');
    return overflow !== 'hidden';
  };

  const overflowAutoOrScroll = (el: Element) => {
    const overflow = getComputedStyle(el, '').getPropertyValue('overflow-y');
    return overflow === 'scroll' || overflow === 'auto';
  };

  const isScrollBehaviorSmooth = (el: Element) => {
    const id = uniqueID(el);
    if (smoothBehaviorForElement.current[id] == null) {
      const scrollBehavior = getComputedStyle(el, '')['scroll-behavior'];
      smoothBehaviorForElement.current[id] = scrollBehavior === 'smooth';
    }
    return smoothBehaviorForElement.current[id];
  };

  const overflowingAncestor = (el: Element) => {
    const elems: Element[] = [];
    const body = document.body;
    const root = getScrollRoot();
    const rootScrollHeight = root.scrollHeight;

    do {
      const cached = getCache(el, false);
      if (cached) {
        return setCache(elems, cached, false);
      }
      elems.push(el);
      if (rootScrollHeight === (el as HTMLElement).scrollHeight) {
        const topOverflowsNotHidden = overflowNotHidden(root) && overflowNotHidden(body);
        const isOverflowCSS = topOverflowsNotHidden || overflowAutoOrScroll(root);
        if (isOverflowCSS) {
          return setCache(elems, getScrollRoot(), false);
        }
      } else if (isContentOverflowing(el) && overflowAutoOrScroll(el)) {
        return setCache(elems, el, false);
      }
    } while ((el = el.parentElement as Element));

    return null;
  };

  const scheduleClearCache = () => {
    clearTimeout(clearCacheTimer.current);
    clearCacheTimer.current = setTimeout(() => {
      cacheX.current = {};
      cacheY.current = {};
      smoothBehaviorForElement.current = {};
    }, 1000);
  };

  const scrollArray = (elem: Element, left: number, top: number) => {
    directionCheck(left, top);

    if (config.accelerationMax !== 1) {
      const now = Date.now();
      const elapsed = now - lastScroll.current;
      if (elapsed < config.accelerationDelta) {
        const factor = (1 + 50 / elapsed) / 2;
        if (factor > 1) {
          const maxFactor = Math.min(factor, config.accelerationMax);
          left *= maxFactor;
          top *= maxFactor;
        }
      }
      lastScroll.current = Date.now();
    }

    que.current.push({
      x: left,
      y: top,
      lastX: left < 0 ? 0.99 : -0.99,
      lastY: top < 0 ? 0.99 : -0.99,
      start: Date.now()
    });

    if (pending.current) {
      return;
    }

    const scrollRoot = getScrollRoot();
    const isWindowScroll = elem === scrollRoot || elem === document.body;

    if ((elem as any).$scrollBehavior == null && isScrollBehaviorSmooth(elem)) {
      (elem as any).$scrollBehavior = (elem as HTMLElement).style.scrollBehavior;
      (elem as HTMLElement).style.scrollBehavior = 'auto';
    }

    const step = (time: number) => {
      const now = Date.now();
      let scrollX = 0;
      let scrollY = 0;

      for (let i = 0; i < que.current.length; i++) {
        const item = que.current[i];
        const elapsed = now - item.start;
        const finished = elapsed >= config.animationTime;
        let position = finished ? 1 : elapsed / config.animationTime;

        if (config.pulseAlgorithm) {
          position = pulse(position);
        }

        const x = Math.round(item.x * position - item.lastX);
        const y = Math.round(item.y * position - item.lastY);

        scrollX += x;
        scrollY += y;

        item.lastX += x;
        item.lastY += y;

        if (finished) {
          que.current.splice(i, 1);
          i--;
        }
      }

      if (isWindowScroll) {
        window.scrollBy(scrollX, scrollY);
      } else {
        if (scrollX) (elem as HTMLElement).scrollLeft += scrollX;
        if (scrollY) (elem as HTMLElement).scrollTop += scrollY;
      }

      if (!left && !top) {
        que.current = [];
      }

      if (que.current.length) {
        requestFrame(step, elem, 1000 / config.frameRate + 1);
      } else {
        pending.current = false;
        if ((elem as any).$scrollBehavior != null) {
          (elem as HTMLElement).style.scrollBehavior = (elem as any).$scrollBehavior;
          (elem as any).$scrollBehavior = null;
        }
      }
    };

    requestFrame(step, elem, 0);
    pending.current = true;
  };

  const wheel = useCallback((event: WheelEvent) => {
    const target = event.target as Element;

    if (event.defaultPrevented || event.ctrlKey) {
      return true;
    }

    if (isNodeName(target, 'embed') || 
        (isNodeName(target, 'embed') && /\.pdf/i.test((target as HTMLEmbedElement).src)) ||
        isNodeName(target, 'object') ||
        (target as any).shadowRoot) {
      return true;
    }

    let deltaX = event.deltaX || 0;
    let deltaY = event.deltaY || 0;

    if (isMac) {
      if (event.deltaX && isDivisible(event.deltaX, 120)) {
        deltaX = 120 * (event.deltaX / Math.abs(event.deltaX));
      }
      if (event.deltaY && isDivisible(event.deltaY, 120)) {
        deltaY = 120 * (event.deltaY / Math.abs(event.deltaY));
      }
    }

    if (!deltaX && !deltaY) {
      deltaY = event.deltaY || 0;
    }

    if (event.deltaMode === 1) {
      deltaX *= 40;
      deltaY *= 40;
    }

    const overflowing = overflowingAncestor(target);

    if (!overflowing) {
      return true;
    }

    if (isTouchpad(deltaY)) {
      return true;
    }

    if (Math.abs(deltaX) > 1.2) {
      deltaX *= config.stepSize / 120;
    }
    if (Math.abs(deltaY) > 1.2) {
      deltaY *= config.stepSize / 120;
    }

    scrollArray(overflowing, deltaX, deltaY);
    event.preventDefault();
    scheduleClearCache();
  }, [config]);

  const keydown = useCallback((event: KeyboardEvent) => {
    const target = event.target as Element;
    const modifier = event.ctrlKey || event.altKey || event.metaKey ||
      (event.shiftKey && event.keyCode !== key.spacebar);

    if (event.defaultPrevented ||
        /^(textarea|select|embed|object)$/i.test(target.nodeName) ||
        (isNodeName(target, 'input') && !/^(button|submit|radio|checkbox|file|color|image)$/i.test((target as HTMLInputElement).type)) ||
        modifier) {
      return true;
    }

    if ((isNodeName(target, 'button') ||
         (isNodeName(target, 'input') && /^(button|submit|radio|checkbox|file|color|image)$/i.test((target as HTMLInputElement).type))) &&
        event.keyCode === key.spacebar) {
      return true;
    }

    if (isNodeName(target, 'input') && (target as HTMLInputElement).type === 'radio' &&
        arrowKeys[event.keyCode as keyof typeof arrowKeys]) {
      return true;
    }

    let shift, x = 0, y = 0;
    const overflowing = overflowingAncestor(target);

    if (!overflowing) {
      return true;
    }

    const clientHeight = overflowing === document.body ? window.innerHeight : (overflowing as HTMLElement).clientHeight;

    switch (event.keyCode) {
      case key.up:
        y = -config.arrowScroll;
        break;
      case key.down:
        y = config.arrowScroll;
        break;
      case key.spacebar:
        shift = event.shiftKey ? 1 : -1;
        y = -shift * clientHeight * 0.9;
        break;
      case key.pageup:
        y = -clientHeight * 0.9;
        break;
      case key.pagedown:
        y = clientHeight * 0.9;
        break;
      case key.home:
        if (overflowing === document.body && document.scrollingElement) {
          y = -(document.scrollingElement as HTMLElement).scrollTop;
        } else {
          y = -(overflowing as HTMLElement).scrollTop;
        }
        break;
      case key.end:
        const scroll = (overflowing as HTMLElement).scrollHeight - (overflowing as HTMLElement).scrollTop;
        const scrollRemaining = scroll - clientHeight;
        y = scrollRemaining > 0 ? scrollRemaining + 10 : 0;
        break;
      case key.left:
        x = -config.arrowScroll;
        break;
      case key.right:
        x = config.arrowScroll;
        break;
      default:
        return true;
    }

    scrollArray(overflowing, x, y);
    event.preventDefault();
    scheduleClearCache();
  }, [config]);

  const mousedown = useCallback((event: MouseEvent) => {
    // Track active element for keyboard navigation
  }, []);

  useEffect(() => {
    if (!isEnabledForBrowser) return;

    const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
    
    // Load delta buffer from localStorage
    try {
      const stored = localStorage.getItem('SS_deltaBuffer');
      if (stored) {
        deltaBuffer.current = stored.split(',').map(Number);
      }
    } catch (e) {
      // Handle localStorage errors
    }

    if (config.keyboardSupport) {
      document.addEventListener('keydown', keydown);
    }

    document.addEventListener(wheelEvent, wheel, { passive: false });
    document.addEventListener('mousedown', mousedown);

    return () => {
      document.removeEventListener(wheelEvent, wheel);
      document.removeEventListener('keydown', keydown);
      document.removeEventListener('mousedown', mousedown);
      clearTimeout(deltaBufferTimer.current);
      clearTimeout(clearCacheTimer.current);
    };
  }, [wheel, keydown, mousedown, config.keyboardSupport, isEnabledForBrowser]);

  return {
    scrollTo: (element: Element, x: number, y: number) => {
      scrollArray(element, x, y);
    },
    scrollToElement: (target: Element, offset = 0) => {
      const rect = target.getBoundingClientRect();
      const scrollTop = window.pageYOffset + rect.top - offset;
      scrollArray(getScrollRoot(), 0, scrollTop - window.pageYOffset);
    }
  };
};
