'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Polygon, Popup, ZoomControl } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Card } from '@/components/ui/card'

// Define custom icon for markers
const customIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%231e40af"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
})

interface PlotData {
  id: string
  khasraNumber: string
  status: 'sold' | 'available' | 'reserved'
  area: string
  owner: string
  coordinates: [number, number][]
}

const statusColors: Record<string, { color: string; label: string }> = {
  sold: { color: '#ef4444', label: 'Sold' },
  available: { color: '#22c55e', label: 'Available' },
  reserved: { color: '#ca8a04', label: 'Reserved' },
}

// Sample plot data with coordinates (latitude, longitude)
const plotsData: PlotData[] = [
  {
    id: 'P-001',
    khasraNumber: 'KH-089',
    status: 'sold',
    area: '500m²',
    owner: 'Hassan Khan',
    coordinates: [
      [31.5204, 74.3587],
      [31.5210, 74.3587],
      [31.5210, 74.3595],
      [31.5204, 74.3595],
    ],
  },
  {
    id: 'P-002',
    khasraNumber: 'KH-012',
    status: 'available',
    area: '750m²',
    owner: 'Available',
    coordinates: [
      [31.5220, 74.3620],
      [31.5230, 74.3620],
      [31.5230, 74.3635],
      [31.5220, 74.3635],
    ],
  },
  {
    id: 'P-003',
    khasraNumber: 'KH-045',
    status: 'reserved',
    area: '600m²',
    owner: 'Ibrahim Khan',
    coordinates: [
      [31.5240, 74.3580],
      [31.5250, 74.3580],
      [31.5250, 74.3595],
      [31.5240, 74.3595],
    ],
  },
  {
    id: 'P-004',
    khasraNumber: 'KH-156',
    status: 'available',
    area: '650m²',
    owner: 'Available',
    coordinates: [
      [31.5215, 74.3650],
      [31.5225, 74.3650],
      [31.5225, 74.3670],
      [31.5215, 74.3670],
    ],
  },
  {
    id: 'P-005',
    khasraNumber: 'KH-203',
    status: 'sold',
    area: '580m²',
    owner: 'Ahmed Abdullah',
    coordinates: [
      [31.5195, 74.3540],
      [31.5205, 74.3540],
      [31.5205, 74.3555],
      [31.5195, 74.3555],
    ],
  },
]

export function LeafletMap({
  onPlotSelect,
  selectedPlot,
}: {
  onPlotSelect: (plot: PlotData) => void
  selectedPlot: PlotData | null
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card className="w-full h-full bg-card border-border flex items-center justify-center">
        <p className="text-muted-foreground">Loading map...</p>
      </Card>
    )
  }

  const center: [number, number] = [31.5215, 74.3600]

  return (
    <div className="w-full h-full">
      <MapContainer center={center} zoom={14} style={{ height: '100%', width: '100%', position: 'relative' }} zoomControl={false}>
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; Esri'
          maxZoom={20}
        />

        {/* Custom zoom control positioned at top right */}
        <ZoomControl position="topright" />

        {/* Plot Polygons */}
        {plotsData.map((plot) => (
          <Polygon
            key={plot.id}
            positions={plot.coordinates}
            pathOptions={{
              color: statusColors[plot.status].color,
              weight: selectedPlot?.id === plot.id ? 3 : 2,
              opacity: selectedPlot?.id === plot.id ? 1 : 0.8,
              fillOpacity: selectedPlot?.id === plot.id ? 0.7 : 0.6,
            }}
            eventHandlers={{
              click: () => onPlotSelect(plot),
            }}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-bold">{plot.khasraNumber}</p>
                <p className="text-xs text-muted-foreground">{plot.id}</p>
                <p className="text-xs">{plot.area}</p>
                <p className="text-xs">Status: {statusColors[plot.status].label}</p>
                <p className="text-xs">Owner: {plot.owner}</p>
              </div>
            </Popup>
          </Polygon>
        ))}
      </MapContainer>
    </div>
  )
}
