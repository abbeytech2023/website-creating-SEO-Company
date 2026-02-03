// src/components/InstallButton.jsx
import { usePWAInstall } from "../hooks/usePwaInstall";

export default function InstallButton() {
  const { installApp, canInstall, isInstalled, isIOS } = usePWAInstall();

  if (isInstalled) return null;

  // iOS message (Safari only)
  if (isIOS) {
    return (
      <div className="p-3 rounded-xl bg-blue-50 text-sm text-center">
        📱 To install this app, tap <b>Share</b> → <b>Add to Home Screen</b>
      </div>
    );
  }

  // Android install button
  if (!canInstall) return null;

  return (
    <button
      onClick={installApp}
      className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700"
    >
      ⬇️ Install App
    </button>
  );
}
