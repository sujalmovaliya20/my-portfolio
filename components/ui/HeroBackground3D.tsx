"use client";

// Trigger recompile to invalidate cache
import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ================================================================
   ✦  TECH UNIVERSE  —  Hero Background 3D
   ================================================================
   Concept: Every technology is a planet orbiting a glowing energy
   core.  Four orbital rings at different inclinations form a mini
   solar-system.  Behind it all: a milky-way starfield, three neon
   nebula clouds, an asteroid belt, and occasional shooting stars.
   Mouse controls a gentle galaxy-wide parallax tilt.
================================================================ */

/* ── Tech planets assigned to orbital rings 0-3 ── */
const TECH = [
  /* Ring 0 – innermost */
  { label: "React",       color: "#61DAFB", ring: 0, svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { label: "Next.js",     color: "#d4f57a", ring: 0, svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { label: "TypeScript",  color: "#3178C6", ring: 0, svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  /* Ring 1 */
  { label: "Node.js",     color: "#8CC84B", ring: 1, svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { label: "MongoDB",     color: "#47A248", ring: 1, svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { label: "Express",     color: "#c0c0c0", ring: 1, svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
  { label: "GraphQL",     color: "#E10098", ring: 1, svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg" },
  /* Ring 2 */
  { label: "Docker",      color: "#2496ED", ring: 2, svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { label: "PostgreSQL",  color: "#4592C6", ring: 2, svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { label: "Redis",       color: "#FF4438", ring: 2, svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
  { label: "AWS",         color: "#FF9900", ring: 2, svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { label: "TailwindCSS", color: "#38BDF8", ring: 2, svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  /* Ring 3 – outermost */
  { label: "Git",         color: "#F05032", ring: 3, svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { label: "Figma",       color: "#F24E1E", ring: 3, svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  { label: "Vercel",      color: "#d4f57a", ring: 3, svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
  { label: "Prisma",      color: "#a5b4fc", ring: 3, svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" },
  { label: "GitHub",      color: "#d0d0d0", ring: 3, svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
  { label: "Python",      color: "#FFD43B", ring: 3, svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
];

/* ── Ring configs: radius, tilt-X, tilt-Z, orbital speed, glow color ── */
const RING_CONFIG = [
  // Flat horizontal rings (tilted Math.PI / 2 on X, 0 on Z)
  { r: 2.8,  tx:  Math.PI / 2, tz:  0, spd: 0.28, col: 0x61DAFB },
  { r: 4.5,  tx:  Math.PI / 2, tz:  0, spd: 0.18, col: 0x8CC84B },
  { r: 6.2,  tx:  Math.PI / 2, tz:  0, spd: 0.12, col: 0x2496ED },
  { r: 8.2,  tx:  Math.PI / 2, tz:  0, spd: 0.08, col: 0xd4f57a },
];

/* ══════════════════════════════════════════════════════
   PLANET CANVAS PAINTER — circular "planet" texture
   Transparent outside the circle so it floats in space
══════════════════════════════════════════════════════ */
function paintPlanet(
  ctx: CanvasRenderingContext2D,
  S: number,
  label: string,
  color: string,
  img: HTMLImageElement | null
) {
  const cx = S / 2, cy = S / 2;
  const PR = S * 0.30;   // planet radius
  const PAD = S * 0.08;  // glow bleed

  ctx.clearRect(0, 0, S, S);

  /* 1. Outer atmospheric halo — 3 gradient rings bleeding wide */
  [
    [0, S * 0.52, "48"],
    [S * 0.08, S * 0.46, "28"],
    [S * 0.18, S * 0.50, "14"],
  ].forEach(([r0, r1, a]) => {
    const g = ctx.createRadialGradient(cx, cy, +r0, cx, cy, +r1);
    g.addColorStop(0, color + a);
    g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, S, S);
  });

  /* 2. Planet body */
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, PR, 0, Math.PI * 2);
  const body = ctx.createRadialGradient(cx - PR * 0.28, cy - PR * 0.28, PR * 0.05, cx, cy, PR);
  body.addColorStop(0, "rgba(30,40,28,0.98)");
  body.addColorStop(0.55, "rgba(14,20,14,1.0)");
  body.addColorStop(1, "rgba(6,10,6,1.0)");
  ctx.fillStyle = body;
  ctx.fill();
  ctx.restore();

  /* 3. Brand tint glow inside planet */
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, PR, 0, Math.PI * 2);
  ctx.clip();
  const tint = ctx.createRadialGradient(cx, cy - PR * 0.2, 0, cx, cy, PR);
  tint.addColorStop(0, color + "2a");
  tint.addColorStop(0.5, color + "12");
  tint.addColorStop(1, "transparent");
  ctx.fillStyle = tint;
  ctx.fillRect(0, 0, S, S);
  ctx.restore();

  /* 4. Planet border — neon double-glow */
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, PR, 0, Math.PI * 2);
  ctx.shadowColor = color;
  ctx.shadowBlur = 30;
  ctx.strokeStyle = color + "ee";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.shadowBlur = 12;
  ctx.strokeStyle = color + "55";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();

  /* 5. Specular highlight (top-left shine) */
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, PR, 0, Math.PI * 2);
  ctx.clip();
  const shine = ctx.createRadialGradient(
    cx - PR * 0.4, cy - PR * 0.4, 0,
    cx - PR * 0.2, cy - PR * 0.2, PR * 0.9
  );
  shine.addColorStop(0, "rgba(255,255,255,0.13)");
  shine.addColorStop(0.4, "rgba(255,255,255,0.04)");
  shine.addColorStop(1, "transparent");
  ctx.fillStyle = shine;
  ctx.fillRect(0, 0, S, S);
  ctx.restore();

  /* 6. Brand icon — glow disc + double draw */
  if (img && img.naturalWidth > 0) {
    const IS = PR * 1.05;
    const ix = cx - IS / 2, iy = cy - IS / 2;
    /* Icon glow disc */
    const ig = ctx.createRadialGradient(cx, cy, 0, cx, cy, IS * 0.6);
    ig.addColorStop(0, color + "30");
    ig.addColorStop(1, "transparent");
    ctx.fillStyle = ig;
    ctx.fillRect(0, 0, S, S);
    /* Draw icon — two passes for glow */
    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur = 22;
    ctx.drawImage(img, ix, iy, IS, IS);
    ctx.shadowBlur = 10;
    ctx.drawImage(img, ix, iy, IS, IS);
    ctx.restore();
  } else {
    /* Fallback glowing dot */
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, PR * 0.35, 0, Math.PI * 2);
    ctx.fillStyle = color + "cc";
    ctx.shadowColor = color;
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.restore();
  }

  /* 7. Equatorial ring around planet (tilted ellipse) */
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(cx, cy, PR + PAD * 0.9, (PR + PAD * 0.9) * 0.28, 0.22, 0, Math.PI * 2);
  ctx.strokeStyle = color + "60";
  ctx.shadowColor = color;
  ctx.shadowBlur = 8;
  ctx.lineWidth = 1.8;
  ctx.stroke();
  ctx.restore();

  /* 8. Label below planet */
  const labelY = cy + PR + PAD * 1.4;
  const fs = Math.round(S * 0.072);
  ctx.save();
  ctx.font = `700 ${fs}px "Segoe UI", system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = color;
  ctx.shadowBlur = 14;
  ctx.fillStyle = color + "cc";
  ctx.fillText(label, cx, labelY);
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#eef5e8";
  ctx.fillText(label, cx, labelY);
  ctx.restore();
}

function paintSketchCard(
  ctx: CanvasRenderingContext2D,
  S: number,
  img: HTMLImageElement | null
) {
  ctx.clearRect(0, 0, S, S);
  
  const cardW = S * 0.62; // 634px
  const cardH = S * 0.76; // 778px
  const x = (S - cardW) / 2;
  const y = (S - cardH) / 2;
  const radius = 32;

  if (!img) {
    // Fallback loading box
    ctx.fillStyle = "rgba(212, 245, 122, 0.1)";
    ctx.beginPath();
    drawRoundedRect(ctx, x, y, cardW, cardH, radius);
    ctx.fill();
    return;
  }

  // 1. Draw card background shadow/glow
  ctx.save();
  ctx.shadowColor = "rgba(212, 245, 122, 0.4)";
  ctx.shadowBlur = 45;
  ctx.fillStyle = "#ffffff"; // Solid white backing for original image clarity
  ctx.beginPath();
  drawRoundedRect(ctx, x, y, cardW, cardH, radius);
  ctx.fill();
  ctx.restore();

  // 2. Draw cropped/clipped image inside the rounded rect card using object-fit cover logic
  ctx.save();
  ctx.beginPath();
  drawRoundedRect(ctx, x, y, cardW, cardH, radius);
  ctx.clip();
  drawImageCover(ctx, img, x, y, cardW, cardH);
  ctx.restore();

  // 3. Draw thin glowing border around the card
  ctx.save();
  ctx.strokeStyle = "rgba(212, 245, 122, 0.6)";
  ctx.lineWidth = 3;
  ctx.shadowColor = "rgba(212, 245, 122, 0.3)";
  ctx.shadowBlur = 12;
  ctx.beginPath();
  drawRoundedRect(ctx, x, y, cardW, cardH, radius);
  ctx.stroke();
  ctx.restore();

  // 4. Draw tech corner highlights
  ctx.save();
  ctx.strokeStyle = "rgba(212, 245, 122, 0.95)";
  ctx.lineWidth = 6;
  const cornerLen = 50;

  // Top-left corner
  ctx.beginPath();
  ctx.moveTo(x + cornerLen, y);
  ctx.arcTo(x, y, x, y + cornerLen, radius);
  ctx.lineTo(x, y + cornerLen);
  ctx.stroke();

  // Bottom-right corner
  ctx.beginPath();
  ctx.moveTo(x + cardW - cornerLen, y + cardH);
  ctx.arcTo(x + cardW, y + cardH, x + cardW, y + cardH - cornerLen, radius);
  ctx.lineTo(x + cardW, y + cardH - cornerLen);
  ctx.stroke();
  ctx.restore();

  // 5. Draw "Available for work" badge floating at the bottom-left of the card
  const badgeW = 180;
  const badgeH = 44;
  const bx = x + 30;
  const by = y + cardH - 65;
  const br = 12;

  // Badge backing
  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
  ctx.shadowBlur = 16;
  ctx.fillStyle = "#12140c"; // Dark matching theme color
  ctx.strokeStyle = "rgba(212, 245, 122, 0.35)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  drawRoundedRect(ctx, bx, by, badgeW, badgeH, br);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // Green active dot
  const dotX = bx + 22;
  const dotY = by + badgeH / 2;
  ctx.fillStyle = "#d4f57a";
  ctx.beginPath();
  ctx.arc(dotX, dotY, 4.5, 0, Math.PI * 2);
  ctx.fill();

  // Badge text
  ctx.fillStyle = "#ffffff";
  ctx.font = '700 13px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("Available for work", dotX + 14, dotY);
}

// Rounded rect path helper
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
}

// Canvas image-cover helper (object-fit: cover implementation)
function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const targetRatio = w / h;
  let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;

  if (imgRatio > targetRatio) {
    // Image is wider than target area (crop left/right)
    sw = img.naturalHeight * targetRatio;
    sx = (img.naturalWidth - sw) / 2;
  } else {
    // Image is taller than target area (crop top/bottom)
    sh = img.naturalWidth / targetRatio;
    sy = (img.naturalHeight - sh) / 2;
  }

  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

function loadIcon(url: string): Promise<HTMLImageElement> {
  return new Promise((res) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => res(img);
    img.onerror = () => res(img);
    img.src = url;
  });
}

/* ════════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════════ */
export default function HeroBackground3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    /* ── Scene & Camera ── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200);
    // Elevated + slightly offset so we see the 3D depth of all orbital planes
    camera.position.set(0, 5, 15);
    camera.lookAt(0, 0, 0);

    /* ── Galaxy parent group (mouse + auto rotation target) ── */
    const galaxy = new THREE.Group();
    scene.add(galaxy);

    /* ══════════════════════════════════════════
       1.  DEEP SPACE STARFIELD  (3 layers)
    ══════════════════════════════════════════ */
    function makeStars(count: number, spread: number, size: number, color: number, opacity: number) {
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * spread;
        pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.55;
        pos[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.6 - 5;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      return new THREE.Points(geo, new THREE.PointsMaterial({
        color, size, sizeAttenuation: true,
        transparent: true, opacity, depthWrite: false,
        blending: THREE.AdditiveBlending,
      }));
    }

    const stars1 = makeStars(4000, 80, 0.016, 0xffffff, 0.75);
    const stars2 = makeStars(1500, 60, 0.030, 0xd4f57a, 0.35);
    const stars3 = makeStars(800,  50, 0.045, 0x7affee, 0.22);
    galaxy.add(stars1, stars2, stars3);

    /* ══════════════════════════════════════════
       2.  MILKY WAY BAND  (dense star strip)
    ══════════════════════════════════════════ */
    const mwPos = new Float32Array(3500 * 3);
    for (let i = 0; i < 3500; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 8 + Math.random() * 30;
      mwPos[i * 3]     = Math.cos(angle) * r;
      mwPos[i * 3 + 1] = (Math.random() - 0.5) * 3.5;   // thin band
      mwPos[i * 3 + 2] = Math.sin(angle) * r * 0.22 - 12;
    }
    const mwGeo = new THREE.BufferGeometry();
    mwGeo.setAttribute("position", new THREE.BufferAttribute(mwPos, 3));
    galaxy.add(new THREE.Points(mwGeo, new THREE.PointsMaterial({
      color: 0xd4f57a, size: 0.012, sizeAttenuation: true,
      transparent: true, opacity: 0.40, depthWrite: false,
      blending: THREE.AdditiveBlending,
    })));

    /* ══════════════════════════════════════════
       3.  NEBULA CLOUDS  (3 wispy particle clusters)
    ══════════════════════════════════════════ */
    const NEBULA_DEFS = [
      { cx: -12, cy:  5, cz: -10, color: 0xd4f57a, spread: 8,  count: 600, size: 0.12, opacity: 0.06 },
      { cx:  14, cy: -4, cz:  -8, color: 0x7affee, spread: 7,  count: 500, size: 0.10, opacity: 0.05 },
      { cx:   0, cy:  8, cz: -14, color: 0xb97aff, spread: 10, count: 700, size: 0.14, opacity: 0.055 },
    ];

    NEBULA_DEFS.forEach(({ cx, cy, cz, color, spread, count, size, opacity }) => {
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const u = Math.random(), v = Math.random(), w = Math.random();
        pos[i * 3]     = cx + (u - 0.5) * spread * (1 + v * 0.5);
        pos[i * 3 + 1] = cy + (v - 0.5) * spread * 0.5;
        pos[i * 3 + 2] = cz + (w - 0.5) * spread * 0.7;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      galaxy.add(new THREE.Points(geo, new THREE.PointsMaterial({
        color, size, sizeAttenuation: true,
        transparent: true, opacity, depthWrite: false,
        blending: THREE.AdditiveBlending,
      })));
    });

    /* ══════════════════════════════════════════
       4.  CENTRAL ENERGY CORE  (the "Sun")
    ══════════════════════════════════════════ */
    // Holographic core material
    const coreMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    
    // Create placeholder canvas texture first (1024x1024 for high resolution)
    const phCanvas = document.createElement("canvas");
    phCanvas.width = 1024;
    phCanvas.height = 1024;
    paintSketchCard(phCanvas.getContext("2d")!, 1024, null);
    const coreTex = new THREE.CanvasTexture(phCanvas);
    coreTex.colorSpace = THREE.SRGBColorSpace;
    coreTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    coreMat.map = coreTex;

    const coreSphere = new THREE.Mesh(
      new THREE.PlaneGeometry(3.6, 4.4),
      coreMat
    );
    galaxy.add(coreSphere);

    // Asynchronously load the sketch image and repaint with high resolution (safely handles cached triggers)
    const sketchImg = new Image();
    sketchImg.src = "/images/sketch.png";
    const handleLoad = () => {
      const activeCanvas = document.createElement("canvas");
      activeCanvas.width = 1024;
      activeCanvas.height = 1024;
      paintSketchCard(activeCanvas.getContext("2d")!, 1024, sketchImg);
      const activeTex = new THREE.CanvasTexture(activeCanvas);
      activeTex.colorSpace = THREE.SRGBColorSpace;
      activeTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      coreMat.map = activeTex;
      coreMat.needsUpdate = true;
      activeTex.needsUpdate = true;
    };
    if (sketchImg.complete) {
      handleLoad();
    } else {
      sketchImg.onload = handleLoad;
    }

    // Dynamic scale & layout positioning: prevents clipping off-screen on smaller monitors
    const updatePosition = () => {
      const width = window.innerWidth;
      if (width < 768) {
        // Mobile: Center core and scale down slightly
        galaxy.position.set(0, -1.2, -1.5);
        coreSphere.scale.setScalar(0.75);
      } else if (width < 1024) {
        // Tablet: Shift right moderately and scale down
        galaxy.position.set(2.4, 0.2, 0);
        coreSphere.scale.setScalar(0.85);
      } else if (width < 1366) {
        // Smaller Laptop: Shift right and scale down to 0.95 so it fits cleanly without cut-off
        galaxy.position.set(3.2, 0.1, 0);
        coreSphere.scale.setScalar(0.95);
      } else if (width < 1600) {
        // Full HD / Desktop: Shift right, normal scale
        galaxy.position.set(3.8, 0.1, 0);
        coreSphere.scale.setScalar(1.08);
      } else {
        // Ultra-wide Widescreen: Shift right, extra large scale
        galaxy.position.set(4.3, 0.1, 0);
        coreSphere.scale.setScalar(1.22);
      }
    };
    updatePosition();



    /* ══════════════════════════════════════════
       5.  ORBITAL RINGS  (visible glowing tori)
    ══════════════════════════════════════════ */
    const orbitalRingMeshes: THREE.Mesh[] = [];

    RING_CONFIG.forEach(({ r, tx, tz, col }) => {
      // Main ring
      const ringMesh = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.014, 8, 180),
        new THREE.MeshBasicMaterial({
          color: col, transparent: true, opacity: 0.35,
          depthWrite: false, blending: THREE.AdditiveBlending,
        })
      );
      ringMesh.rotation.x = tx;
      ringMesh.rotation.z = tz;
      galaxy.add(ringMesh);
      orbitalRingMeshes.push(ringMesh);

      // Dashed dot ring (dots along the orbit)
      const dotCount = Math.round(r * 12);
      const dotsGeo = new THREE.BufferGeometry();
      const dPos = new Float32Array(dotCount * 3);
      for (let i = 0; i < dotCount; i++) {
        const a = (i / dotCount) * Math.PI * 2;
        dPos[i * 3]     = Math.cos(a) * r;
        dPos[i * 3 + 1] = Math.sin(a) * r;
        dPos[i * 3 + 2] = 0;
      }
      dotsGeo.setAttribute("position", new THREE.BufferAttribute(dPos, 3));
      const dotsMesh = new THREE.Points(dotsGeo, new THREE.PointsMaterial({
        color: col, size: 0.035, sizeAttenuation: true,
        transparent: true, opacity: 0.55,
        depthWrite: false, blending: THREE.AdditiveBlending,
      }));
      dotsMesh.rotation.x = tx;
      dotsMesh.rotation.z = tz;
      galaxy.add(dotsMesh);
    });

    /* ══════════════════════════════════════════
       6.  TECH PLANETS  (icon planes on orbits)
    ══════════════════════════════════════════ */
    interface Planet {
      group: THREE.Group;
      mesh: THREE.Mesh;
      ring: number;
      orbitAngle: number;       // current angle on ring (rad)
      orbitSpeed: number;
      selfRotSpeed: number;
      glowMesh: THREE.Mesh;
    }

    const planets: Planet[] = [];
    const PS = 512;  // planet texture size

    /* Group planets by ring to spread them evenly */
    const ringGroups: number[][] = RING_CONFIG.map(() => []);
    TECH.forEach((t, i) => ringGroups[t.ring].push(i));

    TECH.forEach((tech, idx) => {
      const ringIdx = tech.ring;
      const cfg = RING_CONFIG[ringIdx];
      const siblings = ringGroups[ringIdx];
      const posInRing = siblings.indexOf(idx);
      const startAngle = (posInRing / siblings.length) * Math.PI * 2;

      /* Placeholder planet canvas */
      const ph = document.createElement("canvas");
      ph.width = PS; ph.height = PS;
      paintPlanet(ph.getContext("2d")!, PS, tech.label, tech.color, null);
      const phTex = new THREE.CanvasTexture(ph);
      phTex.colorSpace = THREE.SRGBColorSpace;

      /* PlaneGeometry for billboard planet */
      const pSize = 0.9 + ringIdx * 0.07;
      const geo = new THREE.PlaneGeometry(pSize, pSize);
      const mat = new THREE.MeshBasicMaterial({
        map: phTex, transparent: true,
        depthWrite: false, side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);

      /* Per-planet glow disc */
      const glowMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(tech.color),
        transparent: true, opacity: 0.22,
        depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
      });
      const glowMesh = new THREE.Mesh(new THREE.CircleGeometry(pSize * 0.72, 32), glowMat);

      const group = new THREE.Group();
      group.add(glowMesh, mesh);
      galaxy.add(group);

      /* Compute initial world position on ring */
      const rx = Math.cos(startAngle) * cfg.r;
      const ry = Math.sin(startAngle) * cfg.r;
      // Apply ring inclination
      const inclX = new THREE.Matrix4().makeRotationX(cfg.tx);
      const inclZ = new THREE.Matrix4().makeRotationZ(cfg.tz);
      const pos = new THREE.Vector3(rx, ry, 0).applyMatrix4(inclX).applyMatrix4(inclZ);
      group.position.copy(pos);

      planets.push({
        group, mesh, ring: ringIdx,
        orbitAngle: startAngle,
        orbitSpeed: cfg.spd * (0.88 + Math.random() * 0.24),
        selfRotSpeed: (Math.random() - 0.5) * 0.006,
        glowMesh,
      });

      /* Async: load real SVG and repaint */
      loadIcon(tech.svg).then((img) => {
        if (!img.naturalWidth) return;
        const fc = document.createElement("canvas");
        fc.width = PS; fc.height = PS;
        paintPlanet(fc.getContext("2d")!, PS, tech.label, tech.color, img);
        const fTex = new THREE.CanvasTexture(fc);
        fTex.colorSpace = THREE.SRGBColorSpace;
        (mesh.material as THREE.MeshBasicMaterial).map = fTex;
        (mesh.material as THREE.MeshBasicMaterial).needsUpdate = true;
        fTex.needsUpdate = true;
      });
    });

    /* ══════════════════════════════════════════
       7.  ASTEROID BELT  (between ring 1 & 2)
    ══════════════════════════════════════════ */
    const BELT_COUNT = 280;
    const beltPos = new Float32Array(BELT_COUNT * 3);
    for (let i = 0; i < BELT_COUNT; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 5.2 + (Math.random() - 0.5) * 0.7;
      beltPos[i * 3]     = Math.cos(a) * r;
      beltPos[i * 3 + 1] = (Math.random() - 0.5) * 0.25;
      beltPos[i * 3 + 2] = Math.sin(a) * r; // Circular horizontal belt
    }
    const beltGeo = new THREE.BufferGeometry();
    beltGeo.setAttribute("position", new THREE.BufferAttribute(beltPos, 3));
    const beltMesh = new THREE.Points(beltGeo, new THREE.PointsMaterial({
      color: 0x8890a0, size: 0.025, sizeAttenuation: true,
      transparent: true, opacity: 0.55, depthWrite: false,
    }));
    galaxy.add(beltMesh);

    /* ══════════════════════════════════════════
       8.  SHOOTING STARS  (occasional streaks)
    ══════════════════════════════════════════ */
    interface Streak { line: THREE.Line; ttl: number; maxTtl: number; vel: THREE.Vector3 }
    const streaks: Streak[] = [];
    const streakMat = new THREE.LineBasicMaterial({
      color: 0xd4f57a, transparent: true, opacity: 0.0,
      blending: THREE.AdditiveBlending,
    });

    function spawnStreak() {
      const pts = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.8 + Math.random() * 0.6, 0, 0)];
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        streakMat.clone()
      );
      const sx = (Math.random() - 0.5) * 22, sy = 4 + Math.random() * 5, sz = (Math.random() - 0.5) * 6;
      line.position.set(sx, sy, sz);
      line.rotation.z = -Math.PI / 6 + (Math.random() - 0.5) * 0.3;
      scene.add(line);
      const ttl = 90 + Math.random() * 60;
      streaks.push({ line, ttl, maxTtl: ttl, vel: new THREE.Vector3(-0.12 - Math.random() * 0.08, -0.06, 0) });
    }

    /* ── Lights ── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.25));
    const sunLight  = new THREE.PointLight(0xd4f57a, 6, 25);
    const fillLight = new THREE.PointLight(0x7affee, 2, 18);
    const rimLight  = new THREE.PointLight(0xb97aff, 1.8, 14);
    sunLight.position.set(0, 0, 0);
    fillLight.position.set(8, 4, 6);
    rimLight.position.set(-6, -3, -5);
    scene.add(sunLight, fillLight, rimLight);

    /* ── Mouse & Resize ── */
    const mouse = { x: 0, y: 0 };
    const lean  = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.x =  (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      updatePosition();
    };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("resize",    onResize);

    /* ══════════════════════════════════════════
       9.  ANIMATION LOOP
    ══════════════════════════════════════════ */
    let animId: number;
    const t0 = performance.now();
    let nextStreak = 180;  // frames until next shooting star

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = (performance.now() - t0) * 0.001;

      /* ── Strict Horizontal Rotation & Flat Orbits ── */
      // Constant Y spin (horizontal only)
      galaxy.rotation.y = t * 0.016;
      // Fixed X tilt towards camera so it's a 3D disk, but stays static (no vertical wobble)
      galaxy.rotation.x = 0.22;
      galaxy.rotation.z = 0;

      /* Horizontal-only mouse parallax */
      lean.y += (mouse.x * 0.15 - lean.y) * 0.045;
      galaxy.rotation.y += lean.y;

      /* Billboard rotation (always face camera) */
      coreSphere.quaternion.copy(camera.quaternion);
      const invGalaxy = galaxy.quaternion.clone().invert();
      coreSphere.quaternion.premultiply(invGalaxy);

      /* Orbital ring subtle pulse */
      orbitalRingMeshes.forEach((rm, i) => {
        (rm.material as THREE.MeshBasicMaterial).opacity = 0.30 + Math.sin(t * 0.9 + i * 1.2) * 0.10;
      });

      /* Planet orbits */
      planets.forEach((p) => {
        p.orbitAngle += p.orbitSpeed * 0.008;
        const cfg = RING_CONFIG[p.ring];
        const angle = p.orbitAngle;

        /* Position along inclined ring */
        const rx = Math.cos(angle) * cfg.r;
        const ry = Math.sin(angle) * cfg.r;
        const raw = new THREE.Vector3(rx, ry, 0);
        raw.applyEuler(new THREE.Euler(cfg.tx, 0, cfg.tz));
        p.group.position.copy(raw);

        /* Billboard: planet always faces camera in world space */
        p.group.quaternion.copy(camera.quaternion);

        /* Undo galaxy rotation on planet so it always faces cam */
        const invGalaxy = galaxy.quaternion.clone().invert();
        p.group.quaternion.premultiply(invGalaxy);

        /* Self-rotation (slight wobble) */
        p.mesh.rotation.z += p.selfRotSpeed;

        /* Glow pulse */
        (p.glowMesh.material as THREE.MeshBasicMaterial).opacity =
          0.18 + Math.sin(t * 1.4 + p.orbitAngle) * 0.10;
      });

      /* Star field slow drift */
      stars1.rotation.y = t * 0.004;
      stars2.rotation.y = t * 0.006;
      stars3.rotation.y = t * 0.003;

      /* Asteroid belt slow spin */
      beltMesh.rotation.y = t * 0.025;

      /* Shooting stars */
      nextStreak--;
      if (nextStreak <= 0) {
        spawnStreak();
        nextStreak = 180 + Math.floor(Math.random() * 240);
      }
      for (let i = streaks.length - 1; i >= 0; i--) {
        const s = streaks[i];
        s.ttl--;
        const life = s.ttl / s.maxTtl;
        // Fade in then out
        const op = life > 0.8 ? (1 - life) * 5 : life < 0.2 ? life * 5 : 1;
        (s.line.material as THREE.LineBasicMaterial).opacity = op * 0.85;
        s.line.position.addScaledVector(s.vel, 1);
        if (s.ttl <= 0) {
          scene.remove(s.line);
          streaks.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize",    onResize);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none -z-10"
      aria-hidden="true"
    />
  );
}
