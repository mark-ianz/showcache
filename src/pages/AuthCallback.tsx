import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { completeLogin } = useAuth();
  const processed = useRef(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Try all possible ways to get params
    const urlParams = new URLSearchParams(window.location.search);
    const hashString = window.location.hash.includes('?') 
      ? window.location.hash.split('?')[1] 
      : window.location.hash.substring(1);
    const hashParams = new URLSearchParams(hashString);
    
    let requestToken = urlParams.get("request_token") || hashParams.get("request_token") || searchParams.get("request_token");
    const approved = urlParams.get("approved") || hashParams.get("approved") || searchParams.get("approved");

    // Fallback to sessionStorage if URL is empty (backup method)
    if (!requestToken) {
      requestToken = sessionStorage.getItem('tmdb_pending_token');
    }

    console.log("AuthCallback Debug:", {
      href: window.location.href,
      search: window.location.search,
      hash: window.location.hash,
      detectedToken: requestToken,
      detectedApproved: approved
    });

    if (requestToken && !processed.current) {
      processed.current = true;
      // Clear the backup token once we start processing
      sessionStorage.removeItem('tmdb_pending_token');
      
      completeLogin(requestToken)
        .then(() => {
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.error("AuthCallback: Login failed", err);
          setError(err.message || "Failed to exchange token.");
        });
    } else if (!requestToken && !processed.current) {
      // Only set error if we've had a chance to check
      const timeout = setTimeout(() => {
        if (!processed.current) setError("No request token found in URL.");
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [searchParams, completeLogin, navigate]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-4 text-center">
        <div className="w-12 h-12 bg-destructive/10 text-destructive rounded-full flex items-center justify-center text-2xl font-bold">!</div>
        <h2 className="text-xl font-medium text-destructive">Authentication Error</h2>
        <p className="text-muted-foreground max-w-md">{error}</p>
        
        <div className="mt-8 p-4 bg-muted rounded-lg text-left text-xs font-mono max-w-xl overflow-auto">
          <p className="font-bold mb-2 text-muted-foreground uppercase text-[10px]">Debug Data:</p>
          <p><span className="text-primary">URL:</span> {window.location.href}</p>
          <p><span className="text-primary">Params:</span> {window.location.search || "none"}</p>
          <p><span className="text-primary">Hash:</span> {window.location.hash || "none"}</p>
        </div>

        <button 
          onClick={() => navigate("/", { replace: true })}
          className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <h2 className="text-xl font-medium">Authenticating with TMDB...</h2>
      <p className="text-muted-foreground">Please wait while we complete your sign-in.</p>
    </div>
  );
}
