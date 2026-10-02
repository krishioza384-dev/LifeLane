export interface HospitalNode {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  x: number;
  y: number;
  labelOffsetX: number;
  labelOffsetY: number;
  etaMinutes: number;
  corridorEtaMinutes: number;
  distanceKm: number;
  status: 'recommended' | 'available' | 'stale' | 'diverted';
  isCorridorTarget?: boolean;
}

export interface RoadArtery {
  id: string;
  name: string;
  type: 'arterial' | 'secondary' | 'expressway';
  pathD: string;
  label?: {
    text: string;
    x: number;
    y: number;
    rotate?: number;
  };
}

export interface SignalNode {
  id: string;
  name: string;
  x: number;
  y: number;
  type: 'corridor' | 'cross_hold' | 'normal' | 'diversion';
}

export interface EmergencyRoute {
  hospitalId: string;
  pathD: string;
  waypoints: { x: number; y: number }[];
  distanceKm: number;
  normalEtaMin: number;
  corridorEtaMin: number;
  keyAvenues: string[];
}

// Canonical Dimensions
export const MAP_VIEWBOX = {
  width: 1000,
  height: 650,
};

// Ambulance A-402 Initial Coordinates
export const AMBULANCE_ORIGIN = {
  id: 'A-402',
  callsign: 'Unit A-402',
  x: 210,
  y: 490,
  heading: 42, // degrees
  locationName: 'Station Rd & Metro Pkwy Junction',
};

// 4 Regional Emergency Hospitals
export const EMERGENCY_HOSPITALS: HospitalNode[] = [
  {
    id: 'sunrise',
    name: 'Sunrise General Hospital',
    shortName: '01 Sunrise',
    badge: '01 TOP MATCH',
    x: 740,
    y: 180,
    labelOffsetX: -15,
    labelOffsetY: 24,
    etaMinutes: 8,
    corridorEtaMinutes: 6,
    distanceKm: 8.4,
    status: 'recommended',
    isCorridorTarget: true,
  },
  {
    id: 'meridian',
    name: 'Meridian Heart Institute',
    shortName: '02 Meridian',
    badge: '02 CATH LAB',
    x: 840,
    y: 90,
    labelOffsetX: -20,
    labelOffsetY: 24,
    etaMinutes: 11,
    corridorEtaMinutes: 9,
    distanceKm: 11.2,
    status: 'available',
  },
  {
    id: 'riverside',
    name: 'Riverside Community Hospital',
    shortName: '03 Riverside',
    badge: '03 STALE DATA',
    x: 240,
    y: 200,
    labelOffsetX: -20,
    labelOffsetY: 24,
    etaMinutes: 14,
    corridorEtaMinutes: 12,
    distanceKm: 9.8,
    status: 'stale',
  },
  {
    id: 'northgate',
    name: 'Northgate Medical Center',
    shortName: '04 Northgate',
    badge: '04 AGEING',
    x: 780,
    y: 480,
    labelOffsetX: -20,
    labelOffsetY: 24,
    etaMinutes: 16,
    corridorEtaMinutes: 13,
    distanceKm: 14.5,
    status: 'available',
  },
];

// Precalculated Routes from A-402 to each hospital
export const EMERGENCY_ROUTES: Record<string, EmergencyRoute> = {
  sunrise: {
    hospitalId: 'sunrise',
    // Station Rd -> Metro Pkwy -> Bridge Crossing -> Sunrise Blvd
    pathD: 'M 210 490 L 310 420 L 410 370 L 510 330 L 610 260 L 680 220 L 740 180',
    waypoints: [
      { x: 310, y: 420 },
      { x: 410, y: 370 },
      { x: 510, y: 330 },
      { x: 610, y: 260 },
      { x: 680, y: 220 },
    ],
    distanceKm: 8.4,
    normalEtaMin: 8,
    corridorEtaMin: 6,
    keyAvenues: ['Station Rd', 'Metro Pkwy', 'East Bridge', 'Sunrise Blvd'],
  },
  meridian: {
    hospitalId: 'meridian',
    // Station Rd -> Metro Pkwy -> Grand Ave -> Bayview Highway North
    pathD: 'M 210 490 L 310 420 L 410 370 L 510 330 L 630 240 L 730 160 L 840 90',
    waypoints: [
      { x: 310, y: 420 },
      { x: 410, y: 370 },
      { x: 510, y: 330 },
      { x: 630, y: 240 },
      { x: 730, y: 160 },
    ],
    distanceKm: 11.2,
    normalEtaMin: 11,
    corridorEtaMin: 9,
    keyAvenues: ['Station Rd', 'Grand Ave', 'Bayview Hwy North'],
  },
  riverside: {
    hospitalId: 'riverside',
    // Station Rd -> West River Road North
    pathD: 'M 210 490 L 190 390 L 200 300 L 240 200',
    waypoints: [
      { x: 190, y: 390 },
      { x: 200, y: 300 },
    ],
    distanceKm: 9.8,
    normalEtaMin: 14,
    corridorEtaMin: 12,
    keyAvenues: ['Station Rd', 'West Riverside Dr'],
  },
  northgate: {
    hospitalId: 'northgate',
    // Station Rd -> South Outer Connector -> South Express Bypass
    pathD: 'M 210 490 L 330 520 L 490 540 L 640 520 L 780 480',
    waypoints: [
      { x: 330, y: 520 },
      { x: 490, y: 540 },
      { x: 640, y: 520 },
    ],
    distanceKm: 14.5,
    normalEtaMin: 16,
    corridorEtaMin: 13,
    keyAvenues: ['Station Rd', 'South Connector', 'Bayview South'],
  },
};

// Traffic Signal Nodes
export const TRAFFIC_SIGNALS: SignalNode[] = [
  // Green Wave corridor signals (along Sunrise route)
  { id: 'sig-1', name: 'Metro & Station Jct', x: 310, y: 420, type: 'corridor' },
  { id: 'sig-2', name: 'Metro & Central Blvd', x: 410, y: 370, type: 'corridor' },
  { id: 'sig-3', name: 'River Bridge West Pier', x: 510, y: 330, type: 'corridor' },
  { id: 'sig-4', name: 'River Bridge East Toll', x: 610, y: 260, type: 'corridor' },
  { id: 'sig-5', name: 'Sunrise & Bayview Jct', x: 680, y: 220, type: 'corridor' },

  // Cross-Traffic Hold signals
  { id: 'sig-hold-1', name: 'Cross Hold North', x: 440, y: 290, type: 'cross_hold' },
  { id: 'sig-hold-2', name: 'Cross Hold South', x: 570, y: 380, type: 'cross_hold' },

  // Normal phase telemetry signals
  { id: 'sig-norm-1', name: 'West Park Ave', x: 140, y: 330, type: 'normal' },
  { id: 'sig-norm-2', name: 'North Boulevard', x: 520, y: 140, type: 'normal' },
  { id: 'sig-norm-3', name: 'South Transit Ring', x: 420, y: 530, type: 'normal' },

  // Closed / Incident Diversion
  { id: 'sig-div-1', name: 'East Pier Diversion', x: 720, y: 340, type: 'diversion' },
];

// City Block Parcels for realistic schematic grid
export const CITY_PARCELS: string[] = [
  // Northwest District
  '40,30 160,40 150,130 30,115',
  '180,45 300,55 285,140 170,135',
  '320,60 440,75 425,150 310,145',
  '460,80 570,95 555,165 445,155',

  // West Central District
  '30,140 145,155 135,240 20,225',
  '160,160 270,175 255,255 150,245',
  '290,175 400,190 385,270 275,260',

  // Southwest District
  '20,250 135,265 120,360 10,345',
  '150,270 260,285 240,380 135,365',
  '275,290 380,305 360,400 255,385',

  // South Base District
  '10,370 120,385 100,490 0,470',
  '135,395 240,410 220,510 115,495',
  '255,420 360,435 340,530 235,515',

  // Northeast District (Across River)
  '620,60 740,75 725,150 605,140',
  '760,80 880,95 865,170 745,160',
  '600,165 720,180 700,260 585,250',
  '740,185 860,200 840,280 725,270',

  // Southeast District (Across River)
  '580,280 695,295 675,380 560,370',
  '715,300 830,315 810,400 695,385',
  '550,395 665,410 645,500 535,490',
  '685,415 800,430 780,520 665,510',
  '820,435 940,450 920,540 805,530',
];

// River Geometry
export const RIVER_PATH = 'M 490 -20 C 530 140, 560 230, 540 320 C 510 430, 440 520, 420 670';

// Bridges over River
export const RIVER_BRIDGES = [
  { x1: 505, y1: 315, x2: 565, y2: 345, width: 14 },
  { x1: 440, y1: 495, x2: 500, y2: 525, width: 10 },
];
