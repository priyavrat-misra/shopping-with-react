import React from "react";

export function Footer() {
  return React.createElement(
    "footer",
    null,
    <small>&copy; {new Date().getFullYear()}. All rights reserved.</small>,
  );
}
