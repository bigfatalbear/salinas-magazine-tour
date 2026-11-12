import { useEffect, useRef, useState, type DependencyList } from 'react'

export interface LoaderState<T> {
  data: T | null
  loading: boolean
  error: string | null
  reload: () => void
}

export function useLoader<T>(loader: () => Promise<T>, deps: DependencyList = []): LoaderState<T> {
  const loaderRef = useRef(loader)
  loaderRef.current = loader

  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)

    loaderRef
      .current()
      .then((result) => {
        if (active) setData(result)
      })
      .catch((err: unknown) => {
        if (active) setError(err instanceof Error ? err.message : 'Falha ao carregar dados.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick])

  return {
    data,
    loading,
    error,
    reload: () => setTick((value) => value + 1),
  }
}
