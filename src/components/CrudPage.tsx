import { useState, type FormEvent, type ReactNode } from 'react'
import { Loader2, Pencil, Plus, Search, Sparkles, Trash2 } from 'lucide-react'
import { useAiAssist } from '../hooks/useAiAssist'
import { useLoader } from '../hooks/useLoader'
import { deleteRow } from '../lib/store'
import type { AiAction } from '../lib/ai'
import type { DataTable } from '../types'
import { useToast } from '../context/ToastContext'
import { EmptyState, ErrorState, LoadingGrid } from './EmptyState'
import { Modal } from './Modal'

export type CrudFieldType =
  | 'text'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'url'
  | 'tel'
  | 'number'
  | 'date'

export interface CrudField<T> {
  key: keyof T
  label: string
  type?: CrudFieldType
  options?: readonly (string | { value: string; label: string })[]
  placeholder?: string
  rows?: number
  help?: string
  required?: boolean
  full?: boolean
  ai?: AiAction
}

export interface CrudColumn<T> {
  key: keyof T
  label: string
  className?: string
  render?: (item: T) => ReactNode
}

interface CrudPageProps<T extends { id: string }> {
  title: string
  description: string
  table: DataTable
  loader: () => Promise<T[]>
  save: (item: T) => Promise<void>
  create: () => T
  fields: CrudField<T>[]
  columns: CrudColumn<T>[]
  searchText: (item: T) => string
  itemLabel: (item: T) => string
  headerExtra?: ReactNode
  emptyText?: string
}

export function CrudPage<T extends { id: string }>({
  title,
  description,
  table,
  loader,
  save,
  create,
  fields,
  columns,
  searchText,
  itemLabel,
  headerExtra,
  emptyText = 'Nenhum registro encontrado.',
}: CrudPageProps<T>) {
  const { data, loading, error, reload } = useLoader(loader)
  const { toast } = useToast()
  const { pending, run } = useAiAssist()

  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState<T | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)
  const [busyId, setBusyId] = useState<string | null>(null)

  const rows = (data ?? []).filter((item) =>
    searchText(item).toLowerCase().includes(query.trim().toLowerCase()),
  )

  function updateField(key: keyof T, value: unknown) {
    setEditing((current) => (current ? ({ ...current, [key]: value } as T) : current))
  }

  function openCreate() {
    setEditing(create())
    setIsNew(true)
  }

  function openEdit(item: T) {
    setEditing({ ...item })
    setIsNew(false)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!editing) return

    for (const field of fields) {
      if (field.required && !String(editing[field.key] ?? '').trim()) {
        toast(`Preencha o campo "${field.label}".`, 'error')
        return
      }
    }

    setSaving(true)
    try {
      await save(editing)
      toast(isNew ? 'Registro criado.' : 'Registro atualizado.')
      setEditing(null)
      reload()
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Falha ao salvar.', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(item: T) {
    if (!window.confirm(`Excluir "${itemLabel(item)}"? Essa ação não pode ser desfeita.`)) {
      return
    }
    setBusyId(item.id)
    try {
      await deleteRow(table, item.id)
      toast('Registro excluído.')
      reload()
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Falha ao excluir.', 'error')
    } finally {
      setBusyId(null)
    }
  }

  async function handleAi(field: CrudField<T>) {
    if (!editing || !field.ai) return
    const result = await run(field.ai, String(editing[field.key] ?? ''))
    if (result) updateField(field.key, result)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="display text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
          <p className="mt-1 max-w-2xl text-sm text-[var(--muted)]">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          {headerExtra}
          <button type="button" onClick={openCreate} className="btn btn-primary btn-sm">
            <Plus className="h-4 w-4" />
            Novo
          </button>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="input pl-9"
          placeholder="Buscar…"
          aria-label="Buscar registros"
        />
      </div>

      {loading ? (
        <LoadingGrid count={4} />
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : rows.length === 0 ? (
        <EmptyState
          title={query ? 'Nada encontrado' : 'Nenhum registro ainda'}
          description={query ? 'Tente outro termo de busca.' : emptyText}
          action={
            <button type="button" onClick={openCreate} className="btn btn-primary btn-sm">
              <Plus className="h-4 w-4" />
              Criar primeiro registro
            </button>
          }
        />
      ) : (
        <div className="card-flat table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={String(column.key)} className={column.className}>
                    {column.label}
                  </th>
                ))}
                <th className="w-24 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => (
                <tr key={item.id}>
                  {columns.map((column) => (
                    <td key={String(column.key)} className={column.className}>
                      {column.render ? column.render(item) : String(item[column.key] ?? '')}
                    </td>
                  ))}
                  <td>
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => openEdit(item)}
                        className="rounded-lg p-2 text-[var(--muted)] transition hover:bg-tide/10 hover:text-tide"
                        aria-label={`Editar ${itemLabel(item)}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleDelete(item)}
                        disabled={busyId === item.id}
                        className="rounded-lg p-2 text-[var(--muted)] transition hover:bg-coral/10 hover:text-coral disabled:opacity-50"
                        aria-label={`Excluir ${itemLabel(item)}`}
                      >
                        {busyId === item.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={isNew ? `Novo — ${title}` : `Editar — ${title}`}
        description={editing ? itemLabel(editing) : undefined}
        size="lg"
      >
        {editing ? (
          <form onSubmit={(event) => void handleSubmit(event)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((field) => {
                const value = editing[field.key]
                const isWide = field.full || field.type === 'textarea'
                return (
                  <div key={String(field.key)} className={isWide ? 'sm:col-span-2' : undefined}>
                    <div className="mb-1.5 flex items-center justify-between gap-2">
                      <label className="field-label mb-0" htmlFor={`field-${String(field.key)}`}>
                        {field.label}
                        {field.required ? <span className="text-coral"> *</span> : null}
                      </label>
                      {field.ai ? (
                        <button
                          type="button"
                          onClick={() => void handleAi(field)}
                          disabled={pending !== null}
                          className="inline-flex items-center gap-1 rounded-full bg-tide/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-tide transition hover:bg-tide/20 disabled:opacity-50"
                        >
                          {pending === field.ai ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Sparkles className="h-3 w-3" />
                          )}
                          IA
                        </button>
                      ) : null}
                    </div>

                    {field.type === 'textarea' ? (
                      <textarea
                        id={`field-${String(field.key)}`}
                        value={String(value ?? '')}
                        onChange={(event) => updateField(field.key, event.target.value)}
                        rows={field.rows ?? 5}
                        placeholder={field.placeholder}
                        className="textarea"
                      />
                    ) : field.type === 'checkbox' ? (
                      <label className="flex items-center gap-2 py-2 text-sm">
                        <input
                          id={`field-${String(field.key)}`}
                          type="checkbox"
                          checked={Boolean(value)}
                          onChange={(event) => updateField(field.key, event.target.checked)}
                          className="h-4 w-4 accent-[var(--color-tide)]"
                        />
                        {field.help ?? 'Ativo'}
                      </label>
                    ) : field.type === 'select' ? (
                      <select
                        id={`field-${String(field.key)}`}
                        value={String(value ?? '')}
                        onChange={(event) => updateField(field.key, event.target.value)}
                        className="select"
                      >
                        {(field.options ?? []).map((option) => {
                          const value = typeof option === 'string' ? option : option.value
                          const label = typeof option === 'string' ? option : option.label
                          return (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          )
                        })}
                      </select>
                    ) : (
                      <input
                        id={`field-${String(field.key)}`}
                        type={field.type ?? 'text'}
                        value={String(value ?? '')}
                        onChange={(event) =>
                          updateField(
                            field.key,
                            field.type === 'number'
                              ? Number(event.target.value)
                              : event.target.value,
                          )
                        }
                        placeholder={field.placeholder}
                        className="input"
                      />
                    )}
                    {field.help && field.type !== 'checkbox' ? (
                      <p className="mt-1 text-[11px] text-[var(--muted)]">{field.help}</p>
                    ) : null}
                  </div>
                )
              })}
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-[var(--line)] pt-4">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="btn btn-ghost btn-sm"
              >
                Cancelar
              </button>
              <button type="submit" disabled={saving} className="btn btn-primary btn-sm">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {isNew ? 'Criar' : 'Salvar'}
              </button>
            </div>
          </form>
        ) : null}
      </Modal>
    </div>
  )
}
