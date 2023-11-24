import React, { useState, useEffect } from "react";

const InstallButton = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {
        const handleBeforeInstallPrompt = (event) => {
            event.preventDefault();
            setDeferredPrompt(event);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("User accepted the A2HS prompt");
                } else {
                    console.log("User dismissed the A2HS prompt");
                }
                setDeferredPrompt(null);
            });
        }
    };

    return (
        <button onClick={handleInstallClick} className="bg-white group text-orange-500 hover:text-white shadow-inner hover:shadow-lg shadow-black/30 hover:shdow-white/30 hover:bg-blue-500 rounded-md p-1.5">
            <svg width="24px" height="24px" className="text-orange-500 group-hover:text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" stroke="currentColor" strokeWidth={2} d="M12,18 L12,8 L12,18 Z M12,23 C18.0751322,23 23,18.0751322 23,12 C23,5.92486775 18.0751322,1 12,1 C5.92486775,1 1,5.92486775 1,12 C1,18.0751322 5.92486775,23 12,23 Z M17,12 L12,7 L7,12" transform="matrix(1 0 0 -1 0 24)" />
            </svg>
        </button>
    );
};

export default InstallButton;
