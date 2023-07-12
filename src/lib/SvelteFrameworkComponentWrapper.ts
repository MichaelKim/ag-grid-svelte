import {
  BaseComponentWrapper,
  VanillaFrameworkOverrides,
  type FrameworkComponentWrapper,
  type IComponent,
  type WrappableInterface
} from 'ag-grid-community';
import type { ComponentType as SvelteComponentType, SvelteComponent } from 'svelte';
import { SvelteComponent } from 'svelte/internal';

// Called when a Svelte component is provided to override a default grid component
export class SvelteFrameworkComponentWrapper
  extends BaseComponentWrapper<WrappableInterface>
  implements FrameworkComponentWrapper
{
  override createWrapper(UserSvelteComponent: SvelteComponentType): WrappableInterface {
    return new NewSvelteComponent(UserSvelteComponent);
  }
}

class NewSvelteComponent<P> implements IComponent<P>, WrappableInterface {
  private eParentElement!: HTMLElement;
  private componentInstance!: SvelteComponent<{ params: P }>;
  private methods: { [name: string]: (...args: P[]) => void } = {
    // Provide a default refresh method
    refresh: (params: P) => {
      this.componentInstance.$set({ params });
      return true;
    }
  };

  constructor(private SvelteComponent: SvelteComponentType<SvelteComponent<{ params: P }>>) {}

  init(params: P): void {
    // Guaranteed to be called
    this.eParentElement = document.createElement('div');
    this.eParentElement.style.width = '100%';
    this.eParentElement.style.height = '100%';
    this.componentInstance = new this.SvelteComponent({
      target: this.eParentElement,
      props: { params }
    });
  }

  getGui(): HTMLElement {
    return this.eParentElement;
  }

  destroy(): void {
    this.componentInstance.$destroy();
  }

  hasMethod(name: string): boolean {
    return this.methods[name] != null;
  }

  callMethod(name: string, args: IArguments): void {
    this.methods[name]?.apply(this.componentInstance, [...args]);
  }

  addMethod(name: string, callback: (...args: unknown[]) => unknown): void {
    this.methods[name] = callback;
  }
}

export class SvelteFrameworkOverrides extends VanillaFrameworkOverrides {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override isFrameworkComponent(comp: any): boolean {
    // HACK: In dev, the component is wrapped in a Svelte Proxy, obscuring the prototype chain.
    // Instead, components are identified by their class name (internally set to Proxy<ComponentName>).
    // In prod, it should be safe to directly check if they extend SvelteComponent.
    return (
      comp?.prototype?.constructor?.name?.startsWith('Proxy<') ||
      Object.prototype.isPrototypeOf.call(SvelteComponent, comp)
    );
  }
}
