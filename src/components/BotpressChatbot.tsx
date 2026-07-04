"use client";

import { useEffect } from "react";

export default function BotpressChatbot() {
  const injectUrl = process.env.NEXT_PUBLIC_BOTPRESS_INJECT_URL;
  const configUrl = process.env.NEXT_PUBLIC_BOTPRESS_CONFIG_URL;

  useEffect(() => {
    if (!injectUrl || !configUrl) return;

    const style = document.createElement("style");
    style.textContent = `
      .bpw-widget-btn { transform: scale(0.6); }
    `;
    document.head.appendChild(style);

    const inject = document.createElement("script");
    inject.src = injectUrl;
    inject.async = true;

    const config = document.createElement("script");
    config.src = configUrl;
    config.async = true;

    inject.onload = () => {
      document.body.appendChild(config);
    };

    document.body.appendChild(inject);

    return () => {
      if (style.parentNode) style.parentNode.removeChild(style);
      if (inject.parentNode) inject.parentNode.removeChild(inject);
      if (config.parentNode) config.parentNode.removeChild(config);
    };
  }, [injectUrl, configUrl]);

  return null;
}
