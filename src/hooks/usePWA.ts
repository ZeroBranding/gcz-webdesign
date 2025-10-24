import { useEffect } from 'react';

export const usePWA = () => {
  useEffect(() => {
    // Service Worker Registration
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/'
          });

          console.log('[PWA] Service Worker registered successfully:', registration.scope);

          // Update check
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New version available
                  if (confirm('Neue Version verfügbar! Jetzt aktualisieren?')) {
                    newWorker.postMessage({ type: 'SKIP_WAITING' });
                    window.location.reload();
                  }
                }
              });
            }
          });

          // Auto update when new worker is available
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload();
          });

        } catch (error) {
          console.error('[PWA] Service Worker registration failed:', error);
        }
      }
    };

    // Install Prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const installPrompt = e as unknown as { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

      // Show install button or banner
      const installButton = document.getElementById('pwa-install-button');
      if (installButton) {
        installButton.style.display = 'block';
        installButton.addEventListener('click', async () => {
          if (installPrompt) {
            installPrompt.prompt();
            const choice = await installPrompt.userChoice;
            if (choice.outcome === 'accepted') {
              console.log('[PWA] User accepted the install prompt');
            }
          }
        });
      }
    };

    // Online/Offline detection
    const handleOnline = () => {
      console.log('[PWA] Back online');
      document.body.classList.remove('offline');
    };

    const handleOffline = () => {
      console.log('[PWA] Gone offline');
      document.body.classList.add('offline');
    };

    // Register event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initialize
    registerServiceWorker();

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Install PWA function
  const installPWA = async () => {
    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) {
      alert('Die App ist bereits installiert!');
      return;
    }

    // Try to trigger install prompt
    const installButton = document.getElementById('pwa-install-button');
    if (installButton) {
      installButton.click();
    }
  };

  // Check if PWA is installed
  const isPWAInstalled = () => {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (navigator as { standalone?: boolean }).standalone === true;
  };

  return {
    installPWA,
    isPWAInstalled: isPWAInstalled()
  };
};
