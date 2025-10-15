"use client";
import { useState, useMemo } from "react";
import { ColorControls } from "./components/ColorControls";
import { ColorPreview } from "./components/ColorPreview";
import { ColorValues } from "./components/ColorValues";
import { oklchToRgb, rgbToHex, formatOklch } from "./utils/color-converter";
import { Palette } from "lucide-react";
import "./style/font.css";

export default function Page() {
  // Initial OKLCH values (a nice blue color)
  const [l, setL] = useState(0.65);
  const [c, setC] = useState(0.2);
  const [h, setH] = useState(250);

  // Calculate derived color values
  const colorValues = useMemo(() => {
    const rgb = oklchToRgb(l, c, h);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    const oklchString = formatOklch(l, c, h);
    const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

    // Calculate contrasting text color
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    const textColor = luminance > 0.5 ? "#000000" : "#FFFFFF";

    return {
      oklch: oklchString,
      rgb: rgbString,
      hex,
      bgColor: hex,
      textColor,
    };
  }, [l, c, h]);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="flex items-center justify-center gap-3">
            <Palette className="w-8 h-8 text-primary" />
            <h1>OKLCH 颜色探索器</h1>
          </div>
          <p className="text-muted-foreground">
            交互式探索 OKLCH 颜色空间，实时查看颜色变化和格式转换
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Controls */}
          <div className="lg:col-span-1 space-y-6">
            <ColorControls
              l={l}
              c={c}
              h={h}
              onLChange={setL}
              onCChange={setC}
              onHChange={setH}
            />

            <ColorValues
              oklch={colorValues.oklch}
              rgb={colorValues.rgb}
              hex={colorValues.hex}
            />
          </div>

          {/* Right column - Preview */}
          <div className="lg:col-span-2">
            <ColorPreview
              bgColor={colorValues.bgColor}
              textColor={colorValues.textColor}
            />
          </div>
        </div>

        {/* Additional info section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="p-6 bg-card rounded-lg border border-border">
            <h4 className="mb-2">💡 Lightness (亮度)</h4>
            <p className="text-sm text-muted-foreground">
              控制颜色的明暗程度。0 表示纯黑，1 表示纯白。与 HSL 不同，OKLCH
              的亮度在视觉上更加均匀。
            </p>
          </div>

          <div className="p-6 bg-card rounded-lg border border-border">
            <h4 className="mb-2">🎨 Chroma (色度)</h4>
            <p className="text-sm text-muted-foreground">
              控制颜色的饱和度或鲜艳程度。0
              表示完全无色（灰色），值越大颜色越鲜艳、越纯。
            </p>
          </div>

          <div className="p-6 bg-card rounded-lg border border-border">
            <h4 className="mb-2">🌈 Hue (色相)</h4>
            <p className="text-sm text-muted-foreground">
              表示颜色在色轮上的位置，以度数表示。0° 是红色，120° 是绿色，240°
              是蓝色，360° 又回到红色。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
