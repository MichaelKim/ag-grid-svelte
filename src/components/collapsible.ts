const CollapsedStyles = {
  display: 'none',
  overflow: 'hidden',
  height: '0px'
} as const;

const ExpandedStyles = {
  display: 'block',
  overflow: 'visible',
  height: 'auto'
} as const;

function applyCollapsedStyle(node: HTMLElement, open: boolean) {
  const styles = open ? ExpandedStyles : CollapsedStyles;
  node.style.display = styles.display;
  node.style.overflow = styles.overflow;
  node.style.height = styles.height;
}

function applyTransitionStyles(node: HTMLElement) {
  node.style.height = `${node.scrollHeight}px`;
}

// Like Svelte's slide transition, but doesn't unmount from DOM
// Adapted from Docusaurus' Collapsible
export function slide(node: HTMLElement, params: { open: boolean }) {
  // Mount
  node.style.transition = 'height 0.2s ease-in-out';
  node.style.willChange = 'height';
  applyCollapsedStyle(node, params.open);

  let raf: number;
  let open = params.open;

  function onTransitionEnd(e: TransitionEvent) {
    if (e.propertyName !== 'height') return;
    applyCollapsedStyle(node, open);
  }

  node.addEventListener('transitionend', onTransitionEnd);

  return {
    update(params: { open: boolean }) {
      open = params.open;
      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {
        if (open) {
          node.style.display = 'block';
          requestAnimationFrame(() => {
            applyTransitionStyles(node);
          });
        } else {
          applyTransitionStyles(node);
          requestAnimationFrame(() => {
            node.style.height = CollapsedStyles.height;
            node.style.overflow = CollapsedStyles.overflow;
          });
        }
      });
    },
    destroy() {
      cancelAnimationFrame(raf);
      node.removeEventListener('transitionend', onTransitionEnd);
    }
  };
}
