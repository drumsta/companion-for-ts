interface ModalEntry {
  focusableExternalElements: Element[];
  focusableInternalElements: Element[];
}

const modalEntryStack: ModalEntry[] = [];

/**
 * A property name for keeping track of the saved tab index on an Element.
 */
const SAVED_TAB_INDEX = "MODAL_SAVED_TAB_INDEX";

/**
 * Gets the potentially focusable elements.
 *
 * Note that some of these Elements may not be focusable (e.g. is a button
 * that is `disabled` or has an ancestor that is `display: none`).
 */
const getPotentiallyFocusableElements = function getPotentiallyFocusableElements(): Element[] {
  /*
   *  Based on https://html.spec.whatwg.org/multipage/interaction.html#the-tabindex-attribute
   * - Excludes `<frame>`, `<frameset>` since those are deprecated.
   * - Excludes `<link>`, those don't actually seem to be focusable in
   *   practice, even if you give them a `display` that is not `none`.
   * - Includes `<area>`, which is missing (perhaps they meant area instead
   *   of link?).
   */
  const potentiallyFocusable = document.querySelectorAll(
    [
      "a[href]",
      "area[href]",
      "button",
      "details summary",
      "iframe",
      "input",
      "select",
      "textarea",
      "[contenteditable]",
      "[draggable]",
      "[tabindex]",
    ].join(","),
  );

  const arr = Array.from(potentiallyFocusable);
  return arr;
};

const makeNonFocusable = function makeNonFocusable(element: Element): void {
  const tabIndex = element.getAttribute("tabindex") ?? "0";
  element.setAttribute(SAVED_TAB_INDEX, tabIndex);
  element.setAttribute("tabindex", "-1");
};

const makeFocusable = function makeFocusable(element: Element): void {
  const tabIndex = element.getAttribute(SAVED_TAB_INDEX) ?? "0";
  element.setAttribute("tabindex", tabIndex);
  element.removeAttribute(SAVED_TAB_INDEX);
};

/**
 * Sets an Element as an open modal, making all Elements outside of the page
 * hidden from the tab order.
 *
 * This is done by giving a negative `tabindex` to all focusable elements outside the modal. When
 * opening a modal, the ancestry has any `tabindex` values within the modal restored.
 *
 * Note: this does not block click events on things outside of the modal. It is
 * assumed that a backdrop Element blocking clicks is present.
 */
export const setModalAsOpen = function setModalAsOpen(element: Element): void {
  const focusableElements = getPotentiallyFocusableElements();

  /*
   * Get the elements that are internally focusable, and have been made
   * non-focusable; we want to unhide these.
   */
  const focusableInternalElements = focusableElements.filter(
    (e): boolean => element.contains(e) && e.hasAttribute(SAVED_TAB_INDEX),
  );

  /*
   * Get the elements that are externally focusable, and have not yet been made
   * non-focusable; we want to hide these.
   */
  const focusableExternalElements = focusableElements.filter(
    (e): boolean => !element.contains(e) && !e.hasAttribute(SAVED_TAB_INDEX),
  );

  // Make everything outside of the modal non-focusable via tab.
  focusableExternalElements.forEach(makeNonFocusable);

  /*
   * Restore the focusability of everything inside of the modal that was made
   * non-focusable.
   */
  focusableInternalElements.forEach(makeFocusable);

  modalEntryStack.push({
    focusableExternalElements,
    focusableInternalElements,
  });
};

/**
 * Undoes the effectsof `setModalAsOpen`. This should only be called with the
 * currently open modal.
 */
export const setModalAsClosed = function setModalAsClosed(): void {
  const next = modalEntryStack.pop();
  if (!next) return;
  const { focusableExternalElements, focusableInternalElements } = next;

  // Re-hide any internal elements that should be hidden.
  focusableInternalElements.forEach(makeNonFocusable);

  /*
   * Re-show any external elements that were hidden, and clear the saved
   * tabindex.
   */
  focusableExternalElements.forEach(makeFocusable);
};
