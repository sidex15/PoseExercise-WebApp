/**
 * @fileoverview Provides a control panel that can be filled with controls to
 * manipulate options in a demo.
 */

/**
 * Represents the set of options used by a control panel. This is used to set
 * the initial state of the options, and is also supplied to the
 * ControlPanelListener when an option is modified.
 */
export declare interface OptionMap {
  [key: string]: unknown;
}

/**
 * Base interface for any control that can be added to a control panel.
 */
export declare interface Control {
  create(fire: FireFn, options: OptionMap, parent: HTMLElement): void;
  update(): void;
}

/**
 * Supply one of these to a control panel to get notified when the set of
 * options changes.
 */
export declare type ControlPanelListener = (options: OptionMap) => void;

/**
 * Provided to create. Control can call this to update options when control has
 * been manipulated by the user.
 */
export type FireFn = () => void;

/**
 * Construct and add this to a ControlPanel to represent header text that will
 * not change.
 */
export declare class StaticText implements Control {
  constructor(config: {title: string});
  create(fire: FireFn, options: OptionMap, parent: HTMLElement): void;
  update(): void;
}

/**
 * Construct and add this to a ControlPanel to represent a boolean value in
 * a set of options.
 */
export declare class Toggle implements Control {
  constructor(config: {title: string, field: string});
  create(fire: FireFn, options: OptionMap, parent: HTMLElement): void;
  update(): void;
}

/**
 * Configuration options when constructing a Slider control.
 */
export declare interface SliderConfig {
  title: string;
  field: string;
  range: [number, number];
  step?: number;
}

/**
 * Construct and add this to a ControlPanel to represent a finite range in a set
 * of options.
 */
export declare class Slider implements Control {
  constructor(config: SliderConfig);
  create(fire: FireFn, options: OptionMap, parent: HTMLElement): void;
  update(): void;
}

/**
 * Classes must implement an interface to get around Google obfuscators.
 */
export declare interface FPSControl extends Control {
  tick(): void;
}

/**
 * Construct this and call tick() on it to drive it. Attach it to a
 * ControlPanel to get FPS stats.
 */
export declare class FPS implements FPSControl {
  constructor();
  create(fire: FireFn, options: OptionMap, parent: HTMLElement): void;
  update(): void;
  tick(): void;
}

/**
 * ControlPanel class will satisfy this interface. Required to keep the
 * optimizer from chopping off methods.
 */
export declare interface ControlPanelInterface {
  add(controls: Control[]): ControlPanel;
  on(listener: ControlPanelListener): ControlPanel;
}

/**
 * This is a stack of controls that are shown to the user on a web page and
 * allow the user to modify a dictionary of options. The user can connect a
 * listener to detect changes to the options. Use `add` to attach instances of
 * Control -- several control types are already provided.
 */
export declare class ControlPanel implements ControlPanelInterface {
  constructor(parent: HTMLElement, options: OptionMap);
  add(controls: Control[]): ControlPanel;
  on(listener: ControlPanelListener): ControlPanel;
}
