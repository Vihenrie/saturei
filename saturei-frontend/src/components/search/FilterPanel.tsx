'use client'

import { ChevronDown, MapPin, SlidersHorizontal, Tag, X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface FilterPanelProps {
  // Values
  category: string | undefined
  location: string | undefined
  minPrice: number | undefined
  maxPrice: number | undefined
  // Options
  categories: string[]
  locations: string[]
  // Callbacks
  onCategoryChange: (v: string) => void
  onLocationChange: (v: string) => void
  onMinPriceChange: (v: number | undefined) => void
  onMaxPriceChange: (v: number | undefined) => void
  onClear: () => void
  hasActiveFilters: boolean
}

export function FilterPanel({
  category,
  location,
  minPrice,
  maxPrice,
  categories,
  locations,
  onCategoryChange,
  onLocationChange,
  onMinPriceChange,
  onMaxPriceChange,
  onClear,
  hasActiveFilters,
}: FilterPanelProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  const panelContent = (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-primary" />
          <span className="font-semibold text-foreground text-base">
            Filtros
          </span>
          {hasActiveFilters && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold text-primary-foreground bg-primary">
              !
            </span>
          )}
        </div>
        {hasActiveFilters && (
          // biome-ignore lint/a11y/useButtonType: This is a button, but it's not a <button> element, so we need to ignore the lint warning
          <button
            onClick={onClear}
            className="
              flex items-center gap-1 text-xs font-medium
              text-muted-foreground hover:text-primary
              transition-colors duration-150
            "
          >
            <X size={13} />
            Limpar filtros
          </button>
        )}
      </div>

      <div className="w-full h-px bg-border" />

      {/* Category */}
      <FilterSection
        icon={<Tag size={16} className="text-primary" />}
        label="Categoria"
      >
        <SelectFilter
          id="filter-category"
          value={category ?? ''}
          onChange={onCategoryChange}
          placeholder="Todas as categorias"
          options={categories}
        />
      </FilterSection>

      {/* Location */}
      <FilterSection
        icon={<MapPin size={16} className="text-primary" />}
        label="Localização"
      >
        <SelectFilter
          id="filter-location"
          value={location ?? ''}
          onChange={onLocationChange}
          placeholder="Todas as localizações"
          options={locations}
        />
      </FilterSection>

      {/* Price Range */}
      <FilterSection
        icon={
          <span className="text-primary font-bold text-sm leading-none">
            R$
          </span>
        }
        label="Faixa de preço"
      >
        <div className="flex items-center gap-2">
          <PriceInput
            id="filter-min-price"
            placeholder="Mínimo"
            value={minPrice}
            onChange={onMinPriceChange}
          />
          <span className="text-muted-foreground text-sm font-medium shrink-0">
            até
          </span>
          <PriceInput
            id="filter-max-price"
            placeholder="Máximo"
            value={maxPrice}
            onChange={onMaxPriceChange}
          />
        </div>
      </FilterSection>
    </div>
  )

  return (
    <>
      {/* Mobile trigger button */}
      <div className="lg:hidden">
        {/** biome-ignore lint/a11y/useButtonType: This is a button, but it's not a <button> element, so we need to ignore the lint warning */}
        <button
          id="filter-mobile-toggle"
          onClick={() => setMobileOpen(true)}
          className="
            flex items-center gap-2 px-4 py-2.5 rounded-xl
            border-2 border-border bg-card
            text-sm font-medium text-foreground
            hover:border-primary hover:text-primary
            transition-all duration-200 shadow-sm
          "
        >
          <SlidersHorizontal size={16} />
          Filtros
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          {/** biome-ignore lint/a11y/noStaticElementInteractions: This is a static element that triggers an action on click */}
          {/** biome-ignore lint/a11y/useKeyWithClickEvents: This is a static element that triggers an action on click */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div
            className="
              fixed bottom-0 left-0 right-0 z-50 lg:hidden
              bg-card rounded-t-3xl p-6
              shadow-[0_-8px_40px_rgba(0,0,0,0.18)]
              animate-slide-in
            "
            style={{ maxHeight: '85vh', overflowY: 'auto' }}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-bold text-foreground">
                Filtrar resultados
              </span>
              {/** biome-ignore lint/a11y/useButtonType: This is a static element that triggers an action on click */}
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-xl hover:bg-secondary transition-colors"
              >
                <X size={20} className="text-muted-foreground" />
              </button>
            </div>
            {panelContent}
            {/** biome-ignore lint/a11y/useButtonType: This is a static element that triggers an action on click */}
            <button
              onClick={() => setMobileOpen(false)}
              className="
                mt-6 w-full h-12 rounded-xl font-semibold text-primary-foreground
                bg-primary hover:opacity-90
                transition-opacity duration-200
              "
            >
              Ver resultados
            </button>
          </div>
        </>
      )}

      {/* Desktop Sidebar */}
      <aside
        className="
          hidden lg:block
          w-72 shrink-0
          bg-card rounded-2xl p-6
          border border-border
          shadow-sm
          sticky top-6 self-start
        "
      >
        {panelContent}
      </aside>
    </>
  )
}

// ─── Sub-components ───────────────────────────────────────────

function FilterSection({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm font-semibold text-foreground">{label}</span>
      </div>
      {children}
    </div>
  )
}

function SelectFilter({
  id,
  value,
  onChange,
  placeholder,
  options,
}: {
  id: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  options: string[]
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full h-11 pl-4 pr-10 appearance-none
          bg-muted border border-border
          rounded-xl text-sm font-medium text-foreground
          focus:outline-none focus:border-primary focus:bg-card
          transition-all duration-200 cursor-pointer
        "
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown
        size={15}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
      />
    </div>
  )
}

function PriceInput({
  id,
  placeholder,
  value,
  onChange,
}: {
  id: string
  placeholder: string
  value: number | undefined
  onChange: (v: number | undefined) => void
}) {
  const [localValue, setLocalValue] = useState(
    value != null ? String(value) : '',
  )

  useEffect(() => {
    setLocalValue(value != null ? String(value) : '')
  }, [value])

  function handleBlur() {
    const num = parseFloat(localValue)
    // biome-ignore lint/suspicious/noGlobalIsNan: We want to allow non-numeric input to be cleared (undefined), but still handle invalid numbers gracefully
    onChange(isNaN(num) || num < 0 ? undefined : num)
  }

  return (
    <div className="relative flex-1">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-medium">
        R$
      </span>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={0}
        step="0.01"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        className="
          w-full h-11 pl-8 pr-3
          bg-muted border border-border
          rounded-xl text-sm text-foreground
          focus:outline-none focus:border-primary focus:bg-card
          transition-all duration-200
          [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none
        "
      />
    </div>
  )
}
