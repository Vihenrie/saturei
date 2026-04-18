'use client'

import { PackageSearch } from 'lucide-react'
import type { ListingResponse, PageResponse } from '@/lib/api/listings'
import { ListingCard, ListingCardSkeleton } from './ListingCard'

interface ListingGridProps {
  data: PageResponse<ListingResponse> | undefined
  isLoading: boolean
  isFetching: boolean
  hasActiveFilters: boolean
}

const SKELETON_COUNT = 12

export function ListingGrid({
  data,
  isLoading,
  isFetching,
  hasActiveFilters,
}: ListingGridProps) {
  // Full skeleton on first load
  if (isLoading) {
    return (
      <Grid>
        <SkeletonCards />
      </Grid>
    )
  }

  // Empty state
  if (!data || data.empty) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mb-5 shadow-sm">
          <PackageSearch size={36} className="text-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">
          {hasActiveFilters
            ? 'Nenhum resultado encontrado'
            : 'Nenhum anúncio disponível'}
        </h3>
        <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
          {hasActiveFilters
            ? 'Tente ajustar ou remover alguns filtros para ver mais resultados.'
            : 'Seja o primeiro a publicar um anúncio!'}
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Result count + fetch indicator */}
      <div className="flex items-center gap-3">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            {data.totalElements.toLocaleString('pt-BR')}
          </span>{' '}
          {data.totalElements === 1
            ? 'anúncio encontrado'
            : 'anúncios encontrados'}
        </p>
        {isFetching && !isLoading && (
          <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
            <span className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            Atualizando…
          </div>
        )}
      </div>

      {/* Grid */}
      <Grid>
        {data.content.map((listing, idx) => (
          <div
            key={listing.id}
            className="animate-fade-in"
            style={{ animationDelay: `${Math.min(idx * 40, 300)}ms` }}
          >
            <ListingCard listing={listing} />
          </div>
        ))}
      </Grid>
    </div>
  )
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {children}
    </div>
  )
}

function SkeletonCards() {
  return (
    <>
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: This is a static list of skeletons, not dynamic data
        <ListingCardSkeleton key={i} />
      ))}
    </>
  )
}
