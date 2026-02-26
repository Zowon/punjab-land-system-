'use client'

import { useEffect, useRef, useState } from 'react'

interface PlotData {
  id: string
  khasraNumber: string
  latitude: number
  longitude: number
  status: 'sold' | 'available' | 'reserved'
  area: string
  owner: string
  coords: Array<[number, number]>
}

const statusColors: Record<string, { bg: string; border: string; label: string }> = {
  sold: { bg: '#ef4444', border: '#c91e1e', label: 'Sold' },
  available: { bg: '#22c55e', border: '#15803d', label: 'Available' },
  reserved: { bg: '#ca8a04', border: '#a16207', label: 'Reserved' },
}

const plotData: PlotData[] = [
  {
    id: 'P-001',
    khasraNumber: 'KH-001',
    latitude: 31.5204,
    longitude: 74.3587,
    status: 'sold',
    area: '500m²',
    owner: 'Hassan Khan',
    coords: [
      [31.5204, 74.3587],
      [31.5214, 74.3587],
      [31.5214, 74.3597],
      [31.5204, 74.3597],
    ],
  },
  {
    id: 'P-002',
    khasraNumber: 'KH-012',
    latitude: 31.521,
    longitude: 74.3608,
    status: 'available',
    area: '750m²',
    owner: 'Available',
    coords: [
      [31.521, 74.3608],
      [31.5225, 74.3608],
      [31.5225, 74.3623],
      [31.521, 74.3623],
    ],
  },
  {
    id: 'P-003',
    khasraNumber: 'KH-045',
    latitude: 31.5195,
    longitude: 74.3625,
    status: 'reserved',
    area: '600m²',
    owner: 'Ibrahim Khan',
    coords: [
      [31.5195, 74.3625],
      [31.5208, 74.3625],
      [31.5208, 74.3638],
      [31.5195, 74.3638],
    ],
  },
  {
    id: 'P-004',
    khasraNumber: 'KH-089',
    latitude: 31.5218,
    longitude: 74.3572,
    status: 'sold',
    area: '450m²',
    owner: 'Ahmed Abdullah',
    coords: [
      [31.5218, 74.3572],
      [31.5228, 74.3572],
      [31.5228, 74.3582],
      [31.5218, 74.3582],
    ],
  },
  {
    id: 'P-005',
    khasraNumber: 'KH-156',
    latitude: 31.5188,
    longitude: 74.3610,
    status: 'available',
    area: '800m²',
    owner: 'Available',
    coords: [
      [31.5188, 74.361],
      [31.5203, 74.361],
      [31.5203, 74.3625],
      [31.5188, 74.3625],
    ],
  },
]

interface InteractiveMapProps {
  onPlotSelect?: (plot: PlotData) => void
  selectedPlot?: PlotData | null
  searchTerm?: string
}

export function InteractiveMap({ onPlotSelect, selectedPlot, searchTerm = '' }: InteractiveMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [zoom, setZoom] = useState(10)
  const [center, setCenter] = useState({ lat: 31.5204, lng: 74.3597 })

  const filteredPlots = plotData.filter(
    (plot) =>
      plot.khasraNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plot.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plot.owner.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    if (!canvas.current) return

    const ctx = canvas.current.getContext('2d')
    if (!ctx) return

    const width = canvas.current.width
    const height = canvas.current.height

    // Draw terrain/satellite background
    const imageData = ctx.createImageData(width, height)
    const data = imageData.data

    // Create a more realistic terrain appearance with noise
    for (let i = 0; i < width * height; i++) {
      const x = i % width
      const y = Math.floor(i / width)

      // Use Perlin-like noise for terrain variation
      const noise = Math.sin(x * 0.01) * Math.cos(y * 0.01) * 30 + 50
      const greenBase = 80 + noise
      const brownBase = 60 + noise * 0.5

      // Vary the terrain colors
      if (Math.random() > 0.7) {
        // Brown/tan patches
        data[i * 4] = Math.min(255, brownBase + Math.random() * 20)
        data[i * 4 + 1] = Math.min(255, brownBase - Math.random() * 10)
        data[i * 4 + 2] = Math.min(255, brownBase * 0.6)
      } else {
        // Green patches
        data[i * 4] = Math.max(0, greenBase - Math.random() * 20)
        data[i * 4 + 1] = Math.min(255, greenBase + Math.random() * 30)
        data[i * 4 + 2] = Math.max(0, greenBase - Math.random() * 25)
      }
      data[i * 4 + 3] = 255 // Alpha
    }

    ctx.putImageData(imageData, 0, 0)

    // Draw grid
    ctx.strokeStyle = 'rgba(100, 100, 100, 0.1)'
    ctx.lineWidth = 1
    const gridSize = 50
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Calculate scale (pixels per degree of latitude)
    const latSpan = 0.005
    const pixelsPerLat = height / latSpan

    // Draw plots
    filteredPlots.forEach((plot) => {
      const x = ((plot.longitude - (center.lng - 0.0025)) / (0.005)) * (width / 2)
      const y = ((center.lat + 0.0025 - plot.latitude) / (0.005)) * (height / 2)

      const plotWidth = 40
      const plotHeight = 35

      // Draw plot rectangle
      ctx.fillStyle = statusColors[plot.status].bg
      ctx.globalAlpha = 0.8
      ctx.fillRect(x - plotWidth / 2, y - plotHeight / 2, plotWidth, plotHeight)

      // Draw border
      ctx.strokeStyle = statusColors[plot.status].border
      ctx.lineWidth = 2
      if (selectedPlot?.id === plot.id) {
        ctx.lineWidth = 4
      }
      ctx.strokeRect(x - plotWidth / 2, y - plotHeight / 2, plotWidth, plotHeight)
      ctx.globalAlpha = 1

      // Draw Khasra number
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 11px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(plot.khasraNumber, x, y - 5)
      ctx.font = '9px sans-serif'
      ctx.fillText(plot.area, x, y + 8)
    })
  }, [zoom, center, selectedPlot, filteredPlots])

  const handleZoom = (direction: 'in' | 'out') => {
    if (direction === 'in') {
      setZoom((z) => Math.min(z + 2, 20))
    } else {
      setZoom((z) => Math.max(z - 2, 5))
    }
  }

  const handleReset = () => {
    setZoom(10)
    setCenter({ lat: 31.5204, lng: 74.3597 })
  }

  return (
    <div className="w-full h-full flex flex-col bg-card border border-border rounded-lg overflow-hidden">
      {/* Map Controls */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-background">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">Zoom: {zoom}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">Latitude: {center.lat.toFixed(4)}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleZoom('in')}
            className="p-2 hover:bg-muted rounded-lg transition-colors border border-border"
            title="Zoom in"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button
            onClick={() => handleZoom('out')}
            className="p-2 hover:bg-muted rounded-lg transition-colors border border-border"
            title="Zoom out"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <button
            onClick={handleReset}
            className="p-2 hover:bg-muted rounded-lg transition-colors border border-border text-sm"
            title="Reset view"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Canvas Map */}
      <div className="flex-1 overflow-auto bg-gradient-to-b from-green-900 to-green-800">
        <canvas
          ref={canvas}
          width={1200}
          height={700}
          onClick={(e) => {
            if (!canvas.current) return
            const rect = canvas.current.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            // Check if click is on any plot
            const width = canvas.current.width
            const height = canvas.current.height

            filteredPlots.forEach((plot) => {
              const px = ((plot.longitude - (center.lng - 0.0025)) / 0.005) * (width / 2)
              const py = ((center.lat + 0.0025 - plot.latitude) / 0.005) * (height / 2)
              const plotWidth = 40
              const plotHeight = 35

              if (
                x > px - plotWidth / 2 &&
                x < px + plotWidth / 2 &&
                y > py - plotHeight / 2 &&
                y < py + plotHeight / 2
              ) {
                onPlotSelect?.(plot)
              }
            })
          }}
          className="cursor-pointer hover:cursor-pointer"
        />
      </div>

      {/* Map Legend */}
      <div className="p-4 border-t border-border bg-background grid grid-cols-3 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: statusColors.sold.bg }} />
          <span className="text-sm text-foreground font-medium">Sold</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: statusColors.available.bg }} />
          <span className="text-sm text-foreground font-medium">Available</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: statusColors.reserved.bg }} />
          <span className="text-sm text-foreground font-medium">Reserved</span>
        </div>
      </div>
    </div>
  )
}
