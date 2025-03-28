import throttle from "../utils/throttle";

import {
  navigation,
  secondaryNavigation,
  toggles,
  topLevelNavigationItems,
} from "./elements";

import { closeSearch, handleSearch } from "./search";
import closeSecondaryNavigation from "./secondary-navigation";
import {
  setFocusable,
  handleDesktopKeyboardEvents,
} from "./keyboard-navigation";
import { toggleMenu, closeMenu, goBackOneLevel } from "./mobile";
import populateCareersRoles from "./careers/populate-careers-roles";
import initGATracking from "./ga-tracking";

const ANIMATION_SNAP_DURATION = 100;

navigation.addEventListener("mouseover", (e) => {
  const target = e.target.closest(".js-dropdown-button");
  if (target) {
    openDropdown(target);
  }
});

navigation.addEventListener("mouseleave", (e) => {
  const target = e.target.closest(".js-dropdown-button");
  if (target) {
    closeDropdown(target);
  }
});

function openDropdown(toggle) {
  const target = document.getElementById(toggle.getAttribute("aria-controls"));
  if (target) {
    const isNested = target.parentNode.closest(".p-navigation__dropdown");
    if (!isNested) {
      resetToggles(target);
    }
    target.setAttribute("aria-hidden", "false");
    target.classList.add("is-active");
    target.style.opacity = "1";
    target.style.transform = "translateY(0)";
  }
}

function closeDropdown(toggle) {
  const target = document.getElementById(toggle.getAttribute("aria-controls"));
  if (target) {
    target.setAttribute("aria-hidden", "true");
    target.classList.remove("is-active");
    target.style.opacity = "0";
    target.style.transform = "translateY(-10px)";
  }
}

function resetToggles(exception) {
  toggles.forEach(function (toggle) {
    const target = document.getElementById(
      toggle.getAttribute("aria-controls")
    );
    if (!target || target === exception) {
      return;
    }
    closeDropdown(toggle);
  });
}

// Update careers dropdown with latest available roles
populateCareersRoles();

// Init GA tracking.
initGATracking();

export default closeAllNavigationItems;

