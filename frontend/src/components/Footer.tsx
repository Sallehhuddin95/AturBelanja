import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-100 bottom-0 fs-4 fw-semibold text-center py-3 bg-dark bg-opacity-75 text-white">
      Atur Belanja Copyright @ {currentYear}
    </footer>
  );
}

export default Footer;
