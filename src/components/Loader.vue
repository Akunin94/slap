<template>
  <svg class="loader" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle class="loader__ring" cx="50" cy="50" r="45" fill="none" stroke-width="10" stroke-linecap="round" />
    <circle class="loader__indicator" cx="50" cy="50" r="45" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="282.6" stroke-dashoffset="282.6" transform="rotate(-90 50 50)">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="-90 50 50"
        to="270 50 50"
        dur="2s"
        repeatCount="indefinite" />
      <animate
        attributeName="stroke-dashoffset"
        from="282.6"
        to="0"
        dur="2s"
        repeatCount="indefinite" />
    </circle>
  </svg>
</template>