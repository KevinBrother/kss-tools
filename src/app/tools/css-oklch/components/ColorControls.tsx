import { Card, Label, Slider } from "@aientry/ui";

interface ColorControlsProps {
  l: number;
  c: number;
  h: number;
  onLChange: (value: number) => void;
  onCChange: (value: number) => void;
  onHChange: (value: number) => void;
}

export function ColorControls({
  l,
  c,
  h,
  onLChange,
  onCChange,
  onHChange,
}: ColorControlsProps) {
  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="mb-4">OKLCH 参数控制</h3>
        <p className="text-sm text-muted-foreground mb-6">
          调整下方滑块来探索 OKLCH 颜色空间的各个维度
        </p>
      </div>

      {/* Lightness control */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-black to-white border border-border"></span>
            Lightness (L)
          </Label>
          <span className="text-sm tabular-nums">{l.toFixed(3)}</span>
        </div>
        <Slider
          value={[l * 100]}
          onValueChange={(values) => onLChange(values[0] / 100)}
          min={0}
          max={100}
          step={0.1}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground">
          亮度：0 = 黑色，1 = 白色
        </p>
      </div>

      {/* Chroma control */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-gray-400 to-pink-500 border border-border"></span>
            Chroma (C)
          </Label>
          <span className="text-sm tabular-nums">{c.toFixed(3)}</span>
        </div>
        <Slider
          value={[c * 100]}
          onValueChange={(values) => onCChange(values[0] / 100)}
          min={0}
          max={40}
          step={0.1}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground">
          色度/饱和度：0 = 灰色，值越大颜色越鲜艳
        </p>
      </div>

      {/* Hue control */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full border border-border"
              style={{
                background:
                  "conic-gradient(from 0deg, red, yellow, lime, cyan, blue, magenta, red)",
              }}
            ></span>
            Hue (H)
          </Label>
          <span className="text-sm tabular-nums">{h.toFixed(1)}°</span>
        </div>
        <Slider
          value={[h]}
          onValueChange={(values) => onHChange(values[0])}
          min={0}
          max={360}
          step={1}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground">
          色相：色轮角度（0° = 红色，120° = 绿色，240° = 蓝色）
        </p>
      </div>

      {/* Hue visualization */}
      <div
        className="h-8 rounded-md overflow-hidden"
        style={{
          background:
            "linear-gradient(to right, oklch(0.65 0.25 0), oklch(0.65 0.25 30), oklch(0.65 0.25 60), oklch(0.65 0.25 90), oklch(0.65 0.25 120), oklch(0.65 0.25 150), oklch(0.65 0.25 180), oklch(0.65 0.25 210), oklch(0.65 0.25 240), oklch(0.65 0.25 270), oklch(0.65 0.25 300), oklch(0.65 0.25 330), oklch(0.65 0.25 360))",
        }}
      >
        <div
          className="h-full w-1 bg-white border-2 border-black transition-all duration-150"
          style={{ marginLeft: `${(h / 360) * 100}%` }}
        />
      </div>
    </Card>
  );
}
