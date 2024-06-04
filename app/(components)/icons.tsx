import React from 'react';

export const PlayIcon = () => (
  <svg
    className="  fill-current text-silver"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="32"
    height="32"
  >
    <circle cx="12" cy="12" r="12" fill="#C0C0C0" />
    <polygon points="10,8 16,12 10,16" fill="#000" />
  </svg>
);

export const PauseIcon = () => (
  <svg
    className="  fill-current text-silver"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="32"
    height="32"
  >
    <circle cx="12" cy="12" r="12" fill="#C0C0C0" />
    <rect x="9" y="8" width="2" height="8" fill="#000" />
    <rect x="13" y="8" width="2" height="8" fill="#000" />
  </svg>
);
