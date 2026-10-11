/**
 * Scroll-synced particle story for the whole page (original implementation, inspired by
 * scroll-morph particle sites). One fixed full-screen canvas sits behind the page. Every
 * particle stores a position for each formation; scroll position picks which two formations
 * to blend, and the vertex shader morphs them on the GPU with a burst mid-transition.
 *
 * Formations, in page order (index = anchor index):
 *   0 orb (hero), 1 spiral (agents), 2 brain (production), 3 data wave (projects),
 *   4 double helix (experience), 5 lattice (stack), 6 globe (about), 7 orb (contact)
 *
 * Loaded lazily by ParticleField.tsx, so none of this is on the critical path.
 */
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  NormalBlending,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderer,
} from "three";

/** Sections that anchor formations 1..7, in page order (formation 0 is the hero). */
export type SceneOptions = { reducedMotion: boolean; compact: boolean; anchors: HTMLElement[] };

const FORMATIONS = 8;
// How bright each formation is: full for the story, dimmer behind dense content.
const INTENSITY = [1, 1, 1, 0.5, 0.55, 0.5, 0.6, 0.85];

// Ashima 3D simplex noise (MIT), used for the orb's breathing surface and other motion.
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const vertex = /* glsl */ `
  attribute vec3 aOrb;
  attribute vec3 aGalaxy;
  attribute vec3 aBrain;
  attribute vec3 aWave;
  attribute vec3 aHelix;
  attribute vec3 aLattice;
  attribute vec3 aGlobe;
  attribute vec3 aRand;
  attribute float aSeed;
  uniform float uTime;
  uniform float uMorph;      // 0..7, see FORMATIONS
  uniform float uIntro;      // 0 -> 1 assemble on load
  uniform float uIntensity;
  uniform float uPixelRatio;
  uniform float uSize;
  uniform vec3 uOffsets[8];
  uniform vec3 uPointer;
  uniform float uPointerForce;
  uniform vec3 uColA;
  uniform vec3 uColB;
  uniform vec3 uColHot;
  varying vec3 vColor;
  varying float vAlpha;
  ${NOISE}

  vec3 rotY(vec3 p, float a) { float c = cos(a), s = sin(a); return vec3(c*p.x + s*p.z, p.y, -s*p.x + c*p.z); }
  vec3 rotX(vec3 p, float a) { float c = cos(a), s = sin(a); return vec3(p.x, c*p.y - s*p.z, s*p.y + c*p.z); }
  float ease(float t) { return t * t * (3.0 - 2.0 * t); }

  vec3 orbShape(vec3 offset) {
    float n = snoise(aOrb * 0.75 + vec3(0.0, uTime * 0.22, uTime * 0.1));
    return aOrb * (1.0 + 0.17 * n + 0.03 * sin(uTime * 0.9)) + offset;
  }

  // Animated position of formation i (only the two being blended are evaluated).
  vec3 shape(float i) {
    if (i < 0.5) return orbShape(uOffsets[0]);
    if (i < 1.5) {
      // Spiral: differential rotation (inner arms turn faster), laid back at a low angle.
      float r = length(aGalaxy.xz);
      vec3 g = rotY(aGalaxy * 0.82, uTime * 0.28 / (0.35 + r * 0.55));
      return rotX(g, 0.42) + uOffsets[1];
    }
    if (i < 2.5) return aBrain * (1.0 + 0.012 * sin(uTime * 1.7 + aSeed * 6.283)) + uOffsets[2];
    if (i < 3.5) {
      // Data wave: a terrain of points rolling toward the viewer.
      vec3 w = aWave;
      w.y = 0.42 * sin(w.x * 0.55 + uTime * 0.7) + 0.3 * sin(w.z * 0.8 - uTime * 0.9)
        + 0.18 * snoise(vec3(w.xz * 0.35, uTime * 0.15));
      return rotX(w, 0.32) + uOffsets[3];
    }
    if (i < 4.5) return rotY(aHelix, uTime * 0.35) + uOffsets[4];
    if (i < 5.5) return rotX(rotY(aLattice, uTime * 0.22), 0.45 + sin(uTime * 0.2) * 0.1) + uOffsets[5];
    if (i < 6.5) return rotX(rotY(aGlobe, uTime * 0.12 + 1.9), 0.35) + uOffsets[6];
    return orbShape(uOffsets[7]);
  }

  vec3 offsetOf(float i) {
    if (i < 0.5) return uOffsets[0];
    if (i < 1.5) return uOffsets[1];
    if (i < 2.5) return uOffsets[2];
    if (i < 3.5) return uOffsets[3];
    if (i < 4.5) return uOffsets[4];
    if (i < 5.5) return uOffsets[5];
    if (i < 6.5) return uOffsets[6];
    return uOffsets[7];
  }

  void main() {
    float i0 = floor(uMorph);
    float f = uMorph - i0;
    float i1 = min(i0 + 1.0, 7.0);
    float e = ease(f);
    vec3 pos = mix(shape(i0), shape(i1), e);

    // Mid-transition burst: particles fly outward (and toward the camera), then regroup.
    // Wide scatter keeps density low behind any one line of text.
    float burst = sin(f * 3.14159);
    pos += aRand * burst * 3.4;

    // Load-in: each particle streams in from behind the scene with a small stagger.
    float ti = ease(clamp(uIntro * 1.5 - aSeed * 0.5, 0.0, 1.0));
    vec3 far = vec3(aRand.xy * 10.0, -abs(aRand.z) * 6.0 - 3.0);
    pos = mix(far, pos, ti);

    // Brain glints and globe city lights (aSeed > 0.985 marks the globe's city particles).
    float brainW = (i0 == 2.0 ? 1.0 - e : 0.0) + (i1 == 2.0 ? e : 0.0);
    float globeW = (i0 == 6.0 ? 1.0 - e : 0.0) + (i1 == 6.0 ? e : 0.0);
    float spark = snoise(aBrain * 1.4 + vec3(uTime * 0.55, 0.0, uTime * 0.3));
    float hot = smoothstep(0.62, 0.95, spark) * 0.55 * brainW
      + step(0.985, aSeed) * globeW * (0.7 + 0.3 * sin(uTime * 2.0 + aSeed * 40.0));

    vec4 world = modelMatrix * vec4(pos, 1.0);
    vec2 d = world.xy - uPointer.xy;
    float dist = max(length(d), 1e-4);
    world.xy += (d / dist) * uPointerForce * smoothstep(1.5, 0.0, dist) * 0.55;

    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;

    vec3 centre = mix(offsetOf(i0), offsetOf(i1), e);
    float k = clamp((pos.y - centre.y) * 0.3 + 0.5, 0.0, 1.0);
    vColor = mix(mix(uColB, uColA, k), uColHot, clamp(hot, 0.0, 1.0) * 0.85);
    // Dim mid-burst so copy crossing a transition stays readable.
    vAlpha = (0.55 + 0.45 * aSeed) * uIntensity * (1.0 - 0.5 * burst) * smoothstep(22.0, 5.0, -mv.z);
    gl_PointSize = min(
      uSize * (0.55 + aSeed * 0.9) * (1.0 + hot * 1.4 - burst * 0.25) * uPixelRatio * (8.0 / max(-mv.z, 0.5)),
      9.0 * uPixelRatio
    );
  }
`;

const fragment = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.05, d);
    gl_FragColor = vec4(vColor, a * vAlpha * uOpacity);
  }
`;

// ---------- formation generators (plain math, run once) ----------

const gauss = () => {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

function randomUnit(out: Vector3) {
  const z = Math.random() * 2 - 1;
  const t = Math.random() * Math.PI * 2;
  const r = Math.sqrt(1 - z * z);
  return out.set(r * Math.cos(t), z, r * Math.sin(t));
}

function orbPoint(out: Vector3) {
  randomUnit(out);
  const shell = Math.random() < 0.9 ? 2.05 + gauss() * 0.04 : 1.2 + Math.random() * 0.8;
  return out.multiplyScalar(shell);
}

function galaxyPoint(out: Vector3, i: number) {
  if (Math.random() < 0.16) {
    // Bright core: the orchestrator.
    const r = Math.abs(gauss()) * 0.38;
    const a = Math.random() * Math.PI * 2;
    return out.set(Math.cos(a) * r, gauss() * 0.08, Math.sin(a) * r);
  }
  const arms = 3;
  const arm = i % arms;
  const r = 0.35 + Math.pow(Math.random(), 0.85) * 4.4;
  const spread = gauss() * (0.12 + r * 0.05);
  const a = (arm / arms) * Math.PI * 2 + r * 1.25 + spread;
  return out.set(Math.cos(a) * r, gauss() * 0.05 * (1 + (4.8 - r) * 0.15), Math.sin(a) * r);
}

// Side view of a brain, frontal lobe facing left: a wide rounded "loaf" with fine folded gyri,
// a central fissure, temporal lobes hanging below the middle, cerebellum and a short stem.
function brainPoint(out: Vector3) {
  const roll = Math.random();
  if (roll < 0.12) {
    // Cerebellum: back and below, finely striated.
    randomUnit(out);
    const y = out.y;
    out.set(out.x * 0.85, out.y * 0.52, out.z * 1.15);
    out.multiplyScalar(1 + 0.05 * Math.sin(y * 34));
    return out.add(new Vector3(1.55, -1.0, 0));
  }
  if (roll < 0.145) {
    // Brain stem.
    const t = Math.random();
    const a = Math.random() * Math.PI * 2;
    return out.set(0.75 + t * 0.2 + Math.cos(a) * 0.17, -1.1 - t * 0.75, Math.sin(a) * 0.17);
  }
  randomUnit(out);
  const u = out.clone();
  // Fine gyri: several crossed frequencies read as folds, not stripes.
  const fold =
    0.045 *
      Math.sin(14 * u.x + 6 * Math.sin(9 * u.y)) *
      Math.sin(12 * u.y + 5 * Math.sin(11 * u.z)) +
    0.03 * Math.sin(19 * u.z + 7 * u.x) +
    0.02 * Math.sin(23 * u.y + 9 * u.z);
  const inner = Math.random() < 0.8 ? 1 : 0.6 + Math.random() * 0.35;
  // Loaf profile: long front-to-back, taller toward the back, rounder top.
  const ry = 1.42 + 0.18 * u.x;
  out.set(u.x * 2.65, u.y * ry, u.z * 1.75).multiplyScalar((1 + fold) * inner);
  if (Math.abs(u.z) < 0.045 && u.y > 0.1) out.y *= 0.93; // longitudinal fissure
  if (out.y < -0.2) out.y *= 0.82; // softer base
  // Temporal lobe: a bulge hanging below the middle-front on both sides.
  if (u.y < -0.1 && Math.abs(u.z) > 0.35 && u.x > -0.55 && u.x < 0.45)
    out.y -= 0.42 * (1 - Math.abs(u.x + 0.05) * 1.6);
  out.x = -out.x; // frontal lobe faces left
  return out.add(new Vector3(0, 0.3, 0));
}

// Data wave: a wide sheet of points (the shader animates its height).
function wavePoint(out: Vector3) {
  return out.set((Math.random() * 2 - 1) * 10, 0, -6 + Math.random() * 8.5);
}

// Double helix with rungs: two strands winding up a vertical axis.
function helixPoint(out: Vector3, i: number) {
  const t = Math.random() * 2 - 1;
  const y = t * 4.4;
  const a = t * 7.5;
  if (Math.random() < 0.16) {
    // Rung between the strands.
    const k = Math.round(t * 12) / 12;
    const ra = k * 7.5;
    const s = Math.random() * 2 - 1;
    return out.set(Math.cos(ra) * 1.15 * s, k * 4.4, Math.sin(ra) * 1.15 * s);
  }
  const strand = i % 2 === 0 ? 0 : Math.PI;
  const jitter = gauss() * 0.07;
  return out.set(
    Math.cos(a + strand) * (1.15 + jitter),
    y + gauss() * 0.04,
    Math.sin(a + strand) * (1.15 + jitter),
  );
}

// Lattice cube: points along the edges of a 4x4x4 grid (a system architecture).
function latticePoint(out: Vector3) {
  const n = 4;
  const size = 2.8;
  const step = size / (n - 1);
  const axis = Math.floor(Math.random() * 3);
  const a = Math.floor(Math.random() * n) * step - size / 2;
  const b = Math.floor(Math.random() * n) * step - size / 2;
  const t = Math.random() * size - size / 2;
  const v = axis === 0 ? [t, a, b] : axis === 1 ? [a, t, b] : [a, b, t];
  return out.set(v[0] + gauss() * 0.015, v[1] + gauss() * 0.015, v[2] + gauss() * 0.015);
}

// Globe: dotted sphere with arcs between Lahore, Dubai and London (aSeed > 0.985 glow).
const CITIES = [
  [31.55, 74.34], // Lahore
  [25.2, 55.27], // Dubai
  [51.5, -0.12], // London
];
function latLon(lat: number, lon: number, r: number, out: Vector3) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return out.set(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}
function globePoint(out: Vector3, seed: number) {
  const r = 2.3;
  if (seed > 0.985) {
    // City cluster.
    const c = CITIES[Math.floor(Math.random() * CITIES.length)];
    return latLon(c[0] + gauss() * 1.2, c[1] + gauss() * 1.2, r * 1.01, out);
  }
  if (Math.random() < 0.14) {
    // Arc between two cities, lifted off the surface.
    const i = Math.floor(Math.random() * 3);
    const a = CITIES[i];
    const b = CITIES[(i + 1) % 3];
    const t = Math.random();
    const p = latLon(a[0], a[1], 1, new Vector3());
    const q = latLon(b[0], b[1], 1, new Vector3());
    const dir = p.clone().lerp(q, t).normalize();
    return out.copy(dir).multiplyScalar(r * (1 + 0.22 * Math.sin(Math.PI * t)));
  }
  randomUnit(out);
  return out.multiplyScalar(r + gauss() * 0.01);
}

function readTheme() {
  const light = document.documentElement.dataset.theme === "light";
  return light
    ? { a: [0.02, 0.55, 0.5], b: [0.29, 0.22, 0.85], hot: [0.05, 0.05, 0.3], light }
    : { a: [0.42, 0.98, 0.85], b: [0.5, 0.4, 1.0], hot: [1.0, 1.0, 1.0], light };
}

export function mountParticleScene(container: HTMLElement, opts: SceneOptions): () => void {
  const renderer = new WebGLRenderer({
    antialias: false,
    alpha: true,
    powerPreference: "high-performance",
  });
  const pixelRatio = Math.min(window.devicePixelRatio, opts.compact ? 1.5 : 1.75);
  renderer.setPixelRatio(pixelRatio);
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute("aria-hidden", "true");
  renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;";
  container.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 0, 8);

  const count = opts.compact ? 16000 : 48000;
  const buffers = {
    aOrb: new Float32Array(count * 3),
    aGalaxy: new Float32Array(count * 3),
    aBrain: new Float32Array(count * 3),
    aWave: new Float32Array(count * 3),
    aHelix: new Float32Array(count * 3),
    aLattice: new Float32Array(count * 3),
    aGlobe: new Float32Array(count * 3),
    aRand: new Float32Array(count * 3),
  };
  const seed = new Float32Array(count);
  const v = new Vector3();
  for (let i = 0; i < count; i++) {
    seed[i] = Math.random();
    orbPoint(v).toArray(buffers.aOrb, i * 3);
    galaxyPoint(v, i).toArray(buffers.aGalaxy, i * 3);
    brainPoint(v).toArray(buffers.aBrain, i * 3);
    wavePoint(v).toArray(buffers.aWave, i * 3);
    helixPoint(v, i).toArray(buffers.aHelix, i * 3);
    latticePoint(v).toArray(buffers.aLattice, i * 3);
    globePoint(v, seed[i]).toArray(buffers.aGlobe, i * 3);
    randomUnit(v).multiplyScalar(0.4 + Math.random() * 0.9);
    v.z = Math.abs(v.z) * 1.6; // bursts lean toward the camera
    v.toArray(buffers.aRand, i * 3);
  }

  const geo = new BufferGeometry();
  // three needs a `position` attribute; the shader reads the named formations instead.
  geo.setAttribute("position", new BufferAttribute(buffers.aOrb, 3));
  for (const [name, data] of Object.entries(buffers)) {
    geo.setAttribute(name, new BufferAttribute(data, 3));
  }
  geo.setAttribute("aSeed", new BufferAttribute(seed, 1));

  const theme = readTheme();
  const uniforms = {
    uTime: { value: 0 },
    uMorph: { value: 0 },
    uIntro: { value: opts.reducedMotion ? 1 : 0 },
    uIntensity: { value: 1 },
    uOpacity: { value: 1 },
    uPixelRatio: { value: pixelRatio },
    uSize: { value: opts.compact ? 3.2 : 2.6 },
    uOffsets: { value: Array.from({ length: FORMATIONS }, () => new Vector3()) },
    uPointer: { value: new Vector3(99, 99, 0) },
    uPointerForce: { value: 0 },
    uColA: { value: new Vector3(...theme.a) },
    uColB: { value: new Vector3(...theme.b) },
    uColHot: { value: new Vector3(...theme.hot) },
  };
  const material = new ShaderMaterial({
    uniforms,
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    depthWrite: false,
    blending: theme.light ? NormalBlending : AdditiveBlending,
  });
  const points = new Points(geo, material);
  points.frustumCulled = false;
  scene.add(points);

  const applyTheme = () => {
    const t = readTheme();
    uniforms.uColA.value.set(...(t.a as [number, number, number]));
    uniforms.uColB.value.set(...(t.b as [number, number, number]));
    uniforms.uColHot.value.set(...(t.hot as [number, number, number]));
    material.blending = t.light ? NormalBlending : AdditiveBlending;
    material.needsUpdate = true;
  };
  const themeObserver = new MutationObserver(applyTheme);
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  // ---------- layout + scroll boundaries ----------
  let boundaries: number[] = [];
  const docTop = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY;
  const layout = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const wide = w >= 1024;
    points.scale.setScalar(w < 640 ? 0.54 : w < 1024 ? 0.8 : 1);
    // Positions are in viewport space (the canvas is fixed): keep shapes in empty margins or
    // behind glass.
    const o = uniforms.uOffsets.value;
    o[0].set(wide ? 1.4 : 0, wide ? -0.45 : -0.9, 0); // hero orb, right of the headline
    o[1].set(0, wide ? -0.95 : -0.7, 0); // spiral under the title
    o[2].set(wide ? 0.2 : 0, wide ? -0.15 : -0.5, 0); // brain between captions
    o[3].set(0, wide ? -2.6 : -3.4, 0); // data wave along the bottom
    o[4].set(wide ? 4.3 : 2.2, 0, -1); // helix at the right edge of the timeline
    o[5].set(wide ? 4.9 : 2.0, wide ? 0.3 : 1.7, -1.5); // lattice in the right margin
    o[6].set(wide ? -3.7 : 0, wide ? -0.6 : 1.9, -1); // globe glowing around the portrait card
    o[7].set(wide ? -3.6 : 0, wide ? 0.2 : 1.8, -1); // closing orb, left of the contact copy
    // Boundary i: the scroll position where section i's top reaches mid-viewport. Formation i
    // takes over across a band centred on it, so every section (short or long) gets a stretch
    // where its shape holds still.
    boundaries = opts.anchors.map((el) => docTop(el) - h * 0.5);
  };
  const ro = new ResizeObserver(layout);
  ro.observe(document.body);

  // ---------- input (plain values, no React state) ----------
  const pointer = { x: 0, y: 0, active: false };
  const onPointer = (e: PointerEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    pointer.active = e.pointerType === "mouse";
  };
  if (!opts.reducedMotion) window.addEventListener("pointermove", onPointer, { passive: true });
  const ray = new Vector3();

  // Map scroll to a fractional formation index: each boundary contributes 0..1 across a band of
  // 70% of the viewport centred on it.
  const scrollMorph = () => {
    const s = window.scrollY;
    const band = window.innerHeight * 0.7;
    let m = 0;
    for (const b of boundaries) m += Math.min(Math.max((s - (b - band / 2)) / band, 0), 1);
    return m;
  };

  let raf = 0;
  let last = performance.now();
  let intro = uniforms.uIntro.value;
  const smooth = { morph: 0, yaw: 0, pitch: 0, force: 0 };

  const frame = (now: number) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const k = 1 - Math.exp(-dt * 4.5); // inertia: the shape catches up with the scroll
    smooth.morph += (scrollMorph() - smooth.morph) * k;

    if (!opts.reducedMotion) {
      uniforms.uTime.value += dt;
      intro = Math.min(intro + dt / 2.2, 1);
      smooth.yaw +=
        (pointer.x * 0.3 + Math.sin(uniforms.uTime.value * 0.15) * 0.25 - smooth.yaw) * 0.04;
      smooth.pitch += (pointer.y * 0.12 - smooth.pitch) * 0.04;
      smooth.force += ((pointer.active ? 1 : 0) - smooth.force) * 0.05;
    }
    const m = Math.min(Math.max(smooth.morph, 0), FORMATIONS - 1);
    const i0 = Math.floor(m);
    const i1 = Math.min(i0 + 1, FORMATIONS - 1);
    uniforms.uIntensity.value = INTENSITY[i0] + (INTENSITY[i1] - INTENSITY[i0]) * (m - i0);
    uniforms.uIntro.value = intro;
    uniforms.uMorph.value = m;
    uniforms.uPointerForce.value = smooth.force;
    points.rotation.set(-smooth.pitch, smooth.yaw, 0);

    // Pointer onto the z = 0 plane in world space, for the repel effect.
    ray.set(pointer.x, pointer.y, 0.5).unproject(camera).sub(camera.position).normalize();
    uniforms.uPointer.value.copy(camera.position).addScaledVector(ray, -camera.position.z / ray.z);

    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  };

  const start = () => {
    cancelAnimationFrame(raf);
    last = performance.now();
    raf = requestAnimationFrame(frame);
  };
  const onVisibility = () => (document.hidden ? cancelAnimationFrame(raf) : start());
  document.addEventListener("visibilitychange", onVisibility);

  layout();
  smooth.morph = scrollMorph();
  start();

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    themeObserver.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pointermove", onPointer);
    geo.dispose();
    material.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
