"use client";

import { useEffect } from "react";

/**
 * InspectProtection
 * Globally disables right-click context menu (preventing "Inspect" / "Inspect Element")
 * and blocks developer tool keyboard shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U).
 */
export default function InspectProtection() {
  useEffect(() => {
    // 1. Disable Right-Click Context Menu across the entire website
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // 2. Block DevTools Keyboard Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      const isCtrlOrMeta = e.ctrlKey || e.metaKey;

      if (isCtrlOrMeta) {
        // Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Inspect Element)
        if (e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c")) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }

        // Ctrl+U (View Page Source)
        if (e.key === "u" || e.key === "U") {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }

        // Ctrl+S (Save Page)
        if (e.key === "s" || e.key === "S") {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      }
    };

    document.addEventListener("contextmenu", handleContextMenu, { capture: true });
    window.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu, { capture: true });
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, []);

  return null;
}
