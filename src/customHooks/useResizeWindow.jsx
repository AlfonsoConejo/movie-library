import { useState, useEffect } from "react";

export default function useResizeWindow(viewportSize = 720) {
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" ? window.innerWidth <= viewportSize : false
    );

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= viewportSize);

        handleResize(); // Ejecutar una vez al montar

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [viewportSize]);

    return { isMobile };
}