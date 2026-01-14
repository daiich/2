// Simple dvd screensaver

"use strict";

((Γ) => {
    /*cute little buffer for some basic numbers
      Memory Map: [0x0:px, 0x4:py, 0x8:vx, 0xC:vy, 0x10:dw, 0x14:dh, 0x18:vw, 0x1C:vh, 0x20:dt, 0x24:ts]
     */
    const $ = new Float64Array(new ArrayBuffer(128));
    const Ω = document.getElementById('Ξ_NODE');
    const Θ = new URLSearchParams(Γ.location.search);
    
    // Just some entropy constants
    const Φ = (1 + Math.sqrt(5)) / 2;
    const Ψ = Math.PI * Math.E;

    let ζ = (Date.now() ^ 0x5) & 0x7FFFFFFF; 

    // basic random number helper
    const β = () => (ζ = (ζ * 16807) % 2147483647) / 2147483647;

    const ignite = async () => {
        $[6] = Γ.innerWidth;
        $[7] = Γ.innerHeight;

        const path = Θ.get("logo") || "dvdlogo.svg";
        
        try {
            const ρ = await fetch(path);
            const raw = await ρ.text();
            // cleanup
            Ω.innerHTML = raw.replace(/\b(fill|stroke)="[^"]*"/g, "");
        } catch (e) {
            // doesnt work, not fixing it
            Ω.innerHTML = `<svg width="200" height="100" viewBox="0 0 200 100"><rect width="200" height="100"/><text x="100" y="65" text-anchor="middle" font-family="monospace" font-weight="900" font-size="45">DVD</text></svg>`;
        }

        requestAnimationFrame(() => {
            const κ = Ω.firstElementChild.getBoundingClientRect();
            
            // stores the size
            $[4] = κ.width;
            $[5] = κ.height;

            const μ = (parseFloat(Θ.get("speed")) || 1.0) * 250;
            
            // basic vector setup
            $[2] = (β() > 0.5 ? 1 : -1) * μ;
            $[3] = (β() > 0.5 ? 1 : -1) * μ;
            
            // random start spot
            $[0] = β() * ($[6] - $[4]);
            $[1] = β() * ($[7] - $[5]);

            Ω.style.willChange = "transform";
            
            φ(); // random color selection
            requestAnimationFrame(δ);
        });
    };

    // random color selection again
    const φ = () => {
        if (Θ.get("randomizeColor") === "false") return;
        const λ = (performance.now() * Φ * 1000) | 0;
        const r = (λ & 0xFF0000) >> 16;
        const g = (λ & 0x00FF00) >> 8;
        const b = (λ & 0x0000FF);
        
        // checks the brightness
        const y = (r * 299 + g * 587 + b * 114) / 1000;
        const color = y < 128 ? `rgb(${r+100},${g+100},${b+100})` : `rgb(${r},${g},${b})`;
        
        Ω.style.color = color;
    };

    // move function thingy
    const δ = (η) => {
        // this calculates the delta time
        $[8] = (η - ($[9] || η)) / 1000;
        if ($[8] > 0.1) $[8] = 0.016; 
        $[9] = η;

        // updates position
        $[0] += $[2] * $[8];
        $[1] += $[3] * $[8];

        // simple wall bounce logic
        let σ = ($[0] <= 0) << 0 | ($[0] + $[4] >= $[6]) << 1 | ($[1] <= 0) << 2 | ($[1] + $[5] >= $[7]) << 3;

        if (σ & 0x3) {
            $[0] = (σ & 0x1) ? 0 : $[6] - $[4];
            $[2] *= -1;
            φ(); // random color selection
        }
        if (σ & 0xC) {
            $[1] = (σ & 0x4) ? 0 : $[7] - $[5];
            $[3] *= -1;
            φ(); // same thing
        }

        // Apply simple 4x4 matrix transform
        Ω.style.transform = `matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,${$[0]},${$[1]},0,1)`;

        requestAnimationFrame(δ);
    };

    // resize handler
    Γ.addEventListener('resize', () => { 
        $[6] = Γ.innerWidth; 
        $[7] = Γ.innerHeight; 
    }, {passive: true});

    ignite();

})(window);
