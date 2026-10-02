import React, { useRef } from 'react';
import { Download, Sparkles, Check, ZoomIn } from 'lucide-react';
import { AIStylistLook } from '../types';

interface AICoutureConceptPlateProps {
  look: AIStylistLook;
  onOpenZoom?: () => void;
}

export const AICoutureConceptPlate: React.FC<AICoutureConceptPlateProps> = ({
  look,
  onOpenZoom,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [downloaded, setDownloaded] = React.useState(false);

  // Extract primary & secondary colors from palette
  const primaryColor = look.colourPalette?.[0]?.hex || '#6E2332';
  const secondaryColor = look.colourPalette?.[1]?.hex || '#B89667';
  const tertiaryColor = look.colourPalette?.[2]?.hex || '#FAF7F2';
  const accentColor = look.colourPalette?.[3]?.hex || '#3E3A36';

  // Determine silhouette style from text
  const textToScan = `${look.lookName} ${look.styleConcept} ${look.outfit.top} ${look.outfit.bottom}`.toLowerCase();
  const isLehenga = textToScan.includes('lehenga') || textToScan.includes('skirt') || textToScan.includes('kali');
  const isSaree = textToScan.includes('saree') || textToScan.includes('sari') || textToScan.includes('drape');
  const isDhotiOrTrousers = textToScan.includes('dhoti') || textToScan.includes('pant') || textToScan.includes('trouser') || textToScan.includes('cigarette');
  const isAnarkali = textToScan.includes('anarkali') || textToScan.includes('angrakha');

  const handleDownloadSVG = () => {
    if (!containerRef.current) return;
    const svgElement = containerRef.current.querySelector('svg');
    if (!svgElement) return;

    const svgString = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(blob);
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 1500;
      const context = canvas.getContext('2d');
      if (context) {
        context.fillStyle = '#FAF7F2';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, 1200, 1500);
        const png = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `${look.lookName.replace(/\s+/g, '_')}_Concept_Plate.png`;
        downloadLink.href = png;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        setDownloaded(true);
        setTimeout(() => setDownloaded(false), 3000);
      }
    };
    image.src = blobURL;
  };

  return (
    <div className="relative flex flex-col bg-[#F5F0E6] border border-[#DDD3C2] p-4 sm:p-6 shadow-sm">
      {/* Plate Header Bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E2DBD0] text-[10px] font-sans uppercase tracking-[0.2em] text-[#78716C]">
        <div className="flex items-center gap-1.5 text-[#6E2332] font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Atelier Digital Concept Plate</span>
        </div>
        <div className="flex items-center gap-2">
          {onOpenZoom && (
            <button
              onClick={onOpenZoom}
              className="p-1 hover:text-[#1F1E1D] transition-colors cursor-pointer"
              title="Inspect Fullscreen"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={handleDownloadSVG}
            className="flex items-center gap-1 px-2 py-0.5 border border-[#D0C7B8] hover:border-[#6E2332] hover:text-[#6E2332] bg-[#FAF8F5] transition-colors cursor-pointer"
            title="Download Haute Couture Plate"
          >
            {downloaded ? <Check className="w-3 h-3 text-emerald-600" /> : <Download className="w-3 h-3" />}
            <span>{downloaded ? 'Saved' : 'Export PNG'}</span>
          </button>
        </div>
      </div>

      {/* SVG Canvas Frame */}
      <div ref={containerRef} className="relative aspect-[4/5] w-full overflow-hidden bg-[#FAF7F2] border border-[#E8E1D5] shadow-inner flex items-center justify-center">
        <svg
          viewBox="0 0 600 750"
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="plateBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FAF7F2" />
              <stop offset="100%" stopColor="#F2ECE1" />
            </linearGradient>

            <linearGradient id="primaryShimmer" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="50%" stopColor={secondaryColor} stopOpacity="0.85" />
              <stop offset="100%" stopColor={primaryColor} />
            </linearGradient>

            <linearGradient id="goldSheen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#F3E5AB" />
              <stop offset="100%" stopColor="#AA771C" />
            </linearGradient>

            <pattern id="handloomGrid" width="12" height="12" patternUnits="userSpaceOnUse">
              <path d="M 12 0 L 0 0 0 12" fill="none" stroke="#E6DFD3" strokeWidth="0.5" />
            </pattern>
          </defs>

          {/* Background Canvas */}
          <rect width="600" height="750" fill="url(#plateBg)" />
          <rect x="15" y="15" width="570" height="720" fill="none" stroke="#E5DDD0" strokeWidth="1" />
          <rect x="22" y="22" width="556" height="706" fill="none" stroke="#B89667" strokeWidth="0.75" strokeDasharray="3 3" />
          <rect x="25" y="25" width="550" height="700" fill="url(#handloomGrid)" opacity="0.4" />

          {/* Atelier Watermark & Header */}
          <text x="300" y="55" textAnchor="middle" fontFamily="Cinzel, Playfair Display, serif" fontSize="13" letterSpacing="4" fill="#6E2332" fontWeight="600">
            LĀYA ATELIER COUTURE INTELLIGENCE
          </text>
          <text x="300" y="72" textAnchor="middle" fontFamily="sans-serif" fontSize="8" letterSpacing="2.5" fill="#8C8578">
            BESPOKE CONCEPT SPECIFICATION · AUTUMN / FESTIVE 2026
          </text>
          <line x1="180" y1="80" x2="420" y2="80" stroke="#B89667" strokeWidth="0.8" />

          {/* Model Figure Silhouette & Tailored Ensemble Vector */}
          <g transform="translate(180, 100)">
            {/* Soft Ambient Shadow */}
            <ellipse cx="120" cy="510" rx="90" ry="14" fill="#000000" opacity="0.08" />

            {/* Mannequin / Figure Base (Stylized Haute Couture Line) */}
            {/* Head & Neck */}
            <ellipse cx="120" cy="40" rx="16" ry="22" fill="#E8DEC9" stroke="#B8AF9F" strokeWidth="1" />
            <path d="M 115 62 L 115 82 L 125 82 L 125 62 Z" fill="#E8DEC9" />
            
            {/* Shoulders & Bust */}
            <path d="M 85 92 Q 120 86 155 92 L 148 150 L 92 150 Z" fill="#E8DEC9" />

            {/* 1. LEHENGA SILHOUETTE */}
            {isLehenga && (
              <g>
                {/* Fitted Blouse / Choli */}
                <path
                  d="M 88 94 Q 120 100 152 94 L 146 142 Q 120 148 94 142 Z"
                  fill="url(#primaryShimmer)"
                  stroke={secondaryColor}
                  strokeWidth="1.5"
                />
                {/* Zardozi Neckline embroidery */}
                <path d="M 102 96 Q 120 114 138 96" fill="none" stroke="url(#goldSheen)" strokeWidth="2.5" />
                <path d="M 94 140 Q 120 146 146 140" fill="none" stroke="url(#goldSheen)" strokeWidth="2" />

                {/* Waist Bare midriff accent */}
                <rect x="100" y="142" width="40" height="14" fill="#E8DEC9" />

                {/* Flared Kalidar Lehenga Skirt */}
                <path
                  d="M 98 156 Q 120 160 142 156 L 210 470 Q 120 500 30 470 Z"
                  fill={primaryColor}
                  stroke={secondaryColor}
                  strokeWidth="1.5"
                />

                {/* Kalis (Flared Panels) Lines */}
                <path d="M 106 158 Q 110 320 65 474" stroke={secondaryColor} strokeWidth="1" opacity="0.6" fill="none" />
                <path d="M 114 159 Q 116 330 100 484" stroke={secondaryColor} strokeWidth="1" opacity="0.6" fill="none" />
                <path d="M 120 160 L 120 488" stroke="url(#goldSheen)" strokeWidth="1.5" opacity="0.8" fill="none" />
                <path d="M 126 159 Q 124 330 140 484" stroke={secondaryColor} strokeWidth="1" opacity="0.6" fill="none" />
                <path d="M 134 158 Q 130 320 175 474" stroke={secondaryColor} strokeWidth="1" opacity="0.6" fill="none" />

                {/* Hemline Heavy Zari Border */}
                <path
                  d="M 30 470 Q 120 500 210 470 L 206 450 Q 120 480 34 450 Z"
                  fill="url(#goldSheen)"
                  stroke="#AA771C"
                  strokeWidth="1"
                />

                {/* Diagonal Diaphanous Organza Dupatta Drape */}
                <path
                  d="M 88 94 Q 140 220 220 380 Q 200 410 180 370 Q 110 200 84 100 Z"
                  fill={secondaryColor}
                  opacity="0.5"
                  stroke="url(#goldSheen)"
                  strokeWidth="1"
                />
              </g>
            )}

            {/* 2. SAREE SILHOUETTE */}
            {isSaree && !isLehenga && (
              <g>
                {/* Blouse */}
                <path
                  d="M 88 94 Q 120 102 152 94 L 148 140 Q 120 144 92 140 Z"
                  fill="url(#primaryShimmer)"
                  stroke={secondaryColor}
                  strokeWidth="1.5"
                />
                <path d="M 100 96 Q 120 110 140 96" fill="none" stroke="url(#goldSheen)" strokeWidth="2" />

                {/* Saree Skirt & Pre-pleated Drape */}
                <path
                  d="M 94 140 Q 120 144 146 140 L 175 480 Q 120 495 65 480 Z"
                  fill={primaryColor}
                  stroke={secondaryColor}
                  strokeWidth="1.5"
                />

                {/* Pleats Cluster */}
                <path d="M 115 142 L 105 485" stroke="url(#goldSheen)" strokeWidth="1.5" fill="none" />
                <path d="M 118 142 L 110 487" stroke="url(#goldSheen)" strokeWidth="1.2" fill="none" />
                <path d="M 121 142 L 115 488" stroke="url(#goldSheen)" strokeWidth="1.2" fill="none" />
                <path d="M 124 142 L 120 488" stroke="url(#goldSheen)" strokeWidth="1.2" fill="none" />
                <path d="M 127 142 L 125 487" stroke="url(#goldSheen)" strokeWidth="1.2" fill="none" />

                {/* Cascading Pallu draped across bust & over shoulder */}
                <path
                  d="M 65 180 Q 80 120 148 94 L 160 102 Q 100 135 70 230 Q 55 360 40 450 L 25 440 Q 45 320 65 180 Z"
                  fill={secondaryColor}
                  stroke="url(#goldSheen)"
                  strokeWidth="1.5"
                  opacity="0.88"
                />
                {/* Pallu Zari End Border */}
                <rect x="25" y="425" width="20" height="25" fill="url(#goldSheen)" opacity="0.9" />
              </g>
            )}

            {/* 3. DHOTI / TROUSERS / FUSION SILHOUETTE */}
            {isDhotiOrTrousers && !isLehenga && !isSaree && (
              <g>
                {/* Peplum / Trench Kurta Top */}
                <path
                  d="M 88 94 Q 120 98 152 94 L 165 240 Q 120 260 75 240 Z"
                  fill="url(#primaryShimmer)"
                  stroke={secondaryColor}
                  strokeWidth="1.5"
                />
                {/* Asymmetric Kurta Hem or Front Placket */}
                <path d="M 120 98 L 120 255" stroke="url(#goldSheen)" strokeWidth="1.5" fill="none" />
                <path d="M 75 240 Q 120 265 165 240" stroke="url(#goldSheen)" strokeWidth="2" fill="none" />

                {/* Pleated Dhoti Trousers */}
                {/* Left Leg */}
                <path
                  d="M 85 245 Q 60 320 85 460 Q 95 470 110 460 Q 115 350 118 250 Z"
                  fill={secondaryColor}
                  stroke={primaryColor}
                  strokeWidth="1.2"
                />
                {/* Right Leg */}
                <path
                  d="M 122 250 Q 125 350 130 460 Q 145 470 155 460 Q 180 320 155 245 Z"
                  fill={secondaryColor}
                  stroke={primaryColor}
                  strokeWidth="1.2"
                />
                {/* Dhoti Cowl / Drape Folds */}
                <path d="M 80 310 Q 105 340 116 300" stroke={primaryColor} strokeWidth="1" fill="none" opacity="0.6" />
                <path d="M 78 350 Q 105 380 115 340" stroke={primaryColor} strokeWidth="1" fill="none" opacity="0.6" />
                <path d="M 162 310 Q 135 340 124 300" stroke={primaryColor} strokeWidth="1" fill="none" opacity="0.6" />
                <path d="M 164 350 Q 135 380 125 340" stroke={primaryColor} strokeWidth="1" fill="none" opacity="0.6" />
              </g>
            )}

            {/* 4. ANARKALI / CLASSIC KURTA (DEFAULT) */}
            {!isLehenga && !isSaree && !isDhotiOrTrousers && (
              <g>
                {/* Flared Kalidar Kurta */}
                <path
                  d="M 88 94 Q 120 98 152 94 L 180 380 Q 120 405 60 380 Z"
                  fill="url(#primaryShimmer)"
                  stroke={secondaryColor}
                  strokeWidth="1.5"
                />
                {/* Border detailing */}
                <path d="M 60 380 Q 120 405 180 380" stroke="url(#goldSheen)" strokeWidth="3" fill="none" />
                <path d="M 120 98 L 120 395" stroke="url(#goldSheen)" strokeWidth="1.5" fill="none" />

                {/* Churidar / Trousers Underneath */}
                <path d="M 98 395 L 98 475 L 110 475 L 110 398 Z" fill={secondaryColor} />
                <path d="M 130 398 L 130 475 L 142 475 L 142 395 Z" fill={secondaryColor} />
                {/* Churidar gathers */}
                <line x1="96" y1="440" x2="112" y2="440" stroke={primaryColor} strokeWidth="1" />
                <line x1="96" y1="455" x2="112" y2="455" stroke={primaryColor} strokeWidth="1" />
                <line x1="128" y1="440" x2="144" y2="440" stroke={primaryColor} strokeWidth="1" />
                <line x1="128" y1="455" x2="144" y2="455" stroke={primaryColor} strokeWidth="1" />

                {/* Stole / Dupatta Scarf */}
                <path
                  d="M 86 94 Q 70 200 65 340 L 78 340 Q 82 210 96 110 Z"
                  fill={accentColor}
                  opacity="0.8"
                />
              </g>
            )}

            {/* Handcrafted Juttis / Heels */}
            <path d="M 98 475 L 95 490 L 112 490 L 110 475 Z" fill="url(#goldSheen)" stroke="#7A6855" strokeWidth="0.8" />
            <path d="M 130 475 L 128 490 L 145 490 L 142 475 Z" fill="url(#goldSheen)" stroke="#7A6855" strokeWidth="0.8" />

            {/* Jewelry Accents */}
            <circle cx="120" cy="52" r="3.5" fill="url(#goldSheen)" />
            <circle cx="106" cy="45" r="2.5" fill="url(#goldSheen)" />
            <circle cx="134" cy="45" r="2.5" fill="url(#goldSheen)" />
          </g>

          {/* Couture Annotations & Callouts */}
          {/* Top Callout */}
          <g>
            <circle cx="240" cy="220" r="3" fill="#6E2332" />
            <line x1="240" y1="220" x2="100" y2="190" stroke="#6E2332" strokeWidth="0.75" strokeDasharray="2 2" />
            <text x="95" y="185" textAnchor="end" fontFamily="sans-serif" fontSize="8" fontWeight="600" fill="#6E2332" letterSpacing="1">
              UPPER SILHOUETTE
            </text>
            <text x="95" y="197" textAnchor="end" fontFamily="sans-serif" fontSize="7.5" fill="#57534E">
              {look.outfit.top.slice(0, 36)}...
            </text>
          </g>

          {/* Bottom Callout */}
          <g>
            <circle cx="360" cy="450" r="3" fill="#6E2332" />
            <line x1="360" y1="450" x2="470" y2="420" stroke="#6E2332" strokeWidth="0.75" strokeDasharray="2 2" />
            <text x="475" y="415" textAnchor="start" fontFamily="sans-serif" fontSize="8" fontWeight="600" fill="#6E2332" letterSpacing="1">
              LOWER DRAPERY
            </text>
            <text x="475" y="427" textAnchor="start" fontFamily="sans-serif" fontSize="7.5" fill="#57534E">
              {look.outfit.bottom.slice(0, 36)}...
            </text>
          </g>

          {/* Palette Swatches Bar Stamped on Plate */}
          <g transform="translate(60, 620)">
            <text x="0" y="0" fontFamily="sans-serif" fontSize="7.5" letterSpacing="1.5" fill="#78716C" fontWeight="600">
              ATELIER CHROMATIC PALETTE:
            </text>
            {look.colourPalette?.map((c, i) => (
              <g key={i} transform={`translate(${i * 120}, 10)`}>
                <rect x="0" y="0" width="16" height="16" fill={c.hex} stroke="#D9D0C1" strokeWidth="0.8" />
                <text x="22" y="9" fontFamily="sans-serif" fontSize="7.5" fontWeight="600" fill="#1F1E1D">
                  {c.name.slice(0, 14)}
                </text>
                <text x="22" y="18" fontFamily="monospace" fontSize="6.5" fill="#8C8578">
                  {c.hex}
                </text>
              </g>
            ))}
          </g>

          {/* Plate Footer Stamp */}
          <line x1="40" y1="675" x2="560" y2="675" stroke="#E2DBD0" strokeWidth="0.75" />
          <text x="40" y="695" fontFamily="sans-serif" fontSize="7.5" fill="#8C8578">
            SPEC ID: LA-2026-{look.id?.slice(-8) || 'BESPOKE'}
          </text>
          <text x="300" y="695" textAnchor="middle" fontFamily="sans-serif" fontSize="7.5" fill="#8C8578">
            COMMISSIONED FOR: &quot;{look.userPrompt?.slice(0, 42) || 'CUSTOM LOOK'}&quot;
          </text>
          <text x="560" y="695" textAnchor="end" fontFamily="sans-serif" fontSize="7.5" fontWeight="600" fill="#6E2332">
            100% BESPOKE AI COUTURE
          </text>
        </svg>
      </div>

      {/* Plate Caption */}
      <div className="mt-3 flex items-center justify-between text-[10.5px] font-sans text-[#78716C]">
        <span>Precision digital couture blueprint generated for your exact request</span>
        <span className="text-[#6E2332] font-medium">Bespoke Artisan Draft</span>
      </div>
    </div>
  );
};
