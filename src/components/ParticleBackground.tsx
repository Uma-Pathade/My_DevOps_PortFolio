import React, { useEffect, useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;   // visual size
  pulse: number;    // current pulse phase (0–2π)
  pulseSpeed: number;
  // 0 = standard node (cyan), 1 = accent node (purple), 2 = dim node (gray)
  type: 0 | 1 | 2;
}

interface Packet {
  fromIdx: number;
  toIdx: number;
  progress: number; // 0 → 1
  speed: number;
  color: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const NODE_COUNT_DESKTOP = 72;
const NODE_COUNT_MOBILE  = 36;   // halved for small screens
const CONNECTION_DIST    = 140;  // px — max edge length
const MAX_CONNECTIONS    = 3;    // edges per node drawn per frame (cap for perf)
const PACKET_SPAWN_RATE  = 0.004; // probability per active edge per frame
const MAX_PACKETS        = 28;

// ─── Color helpers ────────────────────────────────────────────────────────────

const CYAN   = '0,255,255';
const PURPLE = '160,80,255';
const GRAY   = '120,140,160';

function nodeColor(n: Node): string {
  if (n.type === 1) return PURPLE;
  if (n.type === 2) return GRAY;
  return CYAN;
}

// ─── Component ───────────────────────────────────────────────────────────────

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const isMobile = window.innerWidth < 768;

    // ── Resize helper ─────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // ── Build nodes ───────────────────────────────────────────────────────────
    const count = isMobile ? NODE_COUNT_MOBILE : NODE_COUNT_DESKTOP;

    const nodes: Node[] = Array.from({ length: count }, () => {
      const roll = Math.random();
      const type: 0 | 1 | 2 =
        roll < 0.12 ? 1 :   // 12% purple accent
        roll < 0.25 ? 2 :   // 13% dim gray
        0;                  // 75% standard cyan

      // Larger nodes = "heavier" services (load balancer, DB, etc.)
      const radius =
        type === 1 ? 2.5 + Math.random() * 1.5 :
        type === 2 ? 0.8 + Math.random() * 0.8 :
                    1.2 + Math.random() * 1.4;

      return {
        x:          Math.random() * canvas.width,
        y:          Math.random() * canvas.height,
        vx:         (Math.random() - 0.5) * 0.28,  // slow drift
        vy:         (Math.random() - 0.5) * 0.28,
        radius,
        pulse:      Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.02,
        type,
      };
    });

    // ── Packet pool ───────────────────────────────────────────────────────────
    const packets: Packet[] = [];

    const spawnPacket = (fromIdx: number, toIdx: number) => {
      if (packets.length >= MAX_PACKETS) return;
      const col = nodes[fromIdx].type === 1 ? PURPLE : CYAN;
      packets.push({
        fromIdx,
        toIdx,
        progress: 0,
        speed:    0.006 + Math.random() * 0.008,
        color:    col,
      });
    };

    // ── Main draw loop ────────────────────────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Move nodes + bounce
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        n.pulse += n.pulseSpeed;
      }

      // 2. Build edge list + draw edges
      const drawnEdges: Array<[number, number]> = [];

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        let edgesThisNode = 0;

        for (let j = i + 1; j < nodes.length; j++) {
          if (edgesThisNode >= MAX_CONNECTIONS) break;

          const b   = nodes[j];
          const dx  = a.x - b.x;
          const dy  = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            edgesThisNode++;
            drawnEdges.push([i, j]);

            // Edge opacity falls off with distance; extra boost near accent nodes
            const base    = 1 - dist / CONNECTION_DIST;
            const opacity = base * 0.18 * (a.type === 1 || b.type === 1 ? 1.6 : 1);
            const col     = (a.type === 1 || b.type === 1) ? PURPLE : CYAN;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${col},${opacity.toFixed(3)})`;
            ctx.lineWidth   = 0.6;
            ctx.stroke();

            // Random packet spawn along active edges
            if (Math.random() < PACKET_SPAWN_RATE) {
              spawnPacket(i, j);
            }
          }
        }
      }

      // 3. Draw packets (data moving along edges)
      for (let p = packets.length - 1; p >= 0; p--) {
        const pkt  = packets[p];
        pkt.progress += pkt.speed;

        if (pkt.progress >= 1) {
          packets.splice(p, 1);
          continue;
        }

        const from = nodes[pkt.fromIdx];
        const to   = nodes[pkt.toIdx];
        const px   = from.x + (to.x - from.x) * pkt.progress;
        const py   = from.y + (to.y - from.y) * pkt.progress;

        ctx.beginPath();
        ctx.arc(px, py, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pkt.color},0.85)`;
        ctx.fill();
      }

      // 4. Draw nodes
      for (const n of nodes) {
        const pulseScale = 1 + Math.sin(n.pulse) * 0.25;  // gentle breathe
        const r          = n.radius * pulseScale;
        const col        = nodeColor(n);
        const alpha      = n.type === 2 ? 0.35 : 0.75;

        // Soft glow ring on accent + standard nodes
        if (n.type !== 2) {
          const glowR = r * 3.5;
          const grad  = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
          grad.addColorStop(0,   `rgba(${col},0.18)`);
          grad.addColorStop(1,   `rgba(${col},0)`);
          ctx.beginPath();
          ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col},${alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-30"
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
