'use client';

import { useEffect, useRef, useState } from 'react';

interface MediaPickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  adminToken: string;
}

interface UploadedFile {
  url: string;
  filename: string;
}

export function MediaPicker({ open, onClose, onSelect, adminToken }: MediaPickerProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load list of already-uploaded files when opened
  useEffect(() => {
    if (!open) return;
    void loadFiles();
  }, [open]);

  const loadFiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/media/upload', { cache: 'no-store' });
      const j = await res.json();
      if (j.ok) setFiles(j.files);
      else setError(j.error || 'Failed to list files');
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/media/upload', {
        method: 'POST',
        headers: { 'x-admin-token': adminToken },
        body: fd,
      });
      const j = await res.json();
      if (j.ok) {
        setFiles((prev) => [{ url: j.url, filename: j.filename }, ...prev]);
        setPreview(j.url);
      } else {
        setError(j.error || 'Upload failed');
      }
    } catch (e) {
      setError(String(e));
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) void handleUpload(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) void handleUpload(f);
  };

  if (!open) return null;

  return (
    <div
      className="dv-media-picker"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="dv-media-picker__backdrop" onClick={onClose}></div>
      <div className="dv-media-picker__panel">
        <div className="dv-media-picker__header">
          <h3 className="dv-media-picker__title">Медиабиблиотека</h3>
          <button className="dv-media-picker__close" onClick={onClose} aria-label="Закрыть">
            ×
          </button>
        </div>

        <div className="dv-media-picker__body">
          {/* Upload dropzone */}
          <div
            className="dv-media-dropzone"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.classList.add('dv-media-dropzone--over');
            }}
            onDragLeave={(e) => e.currentTarget.classList.remove('dv-media-dropzone--over')}
            onDrop={(e) => {
              e.preventDefault();
              e.currentTarget.classList.remove('dv-media-dropzone--over');
              const f = e.dataTransfer.files?.[0];
              if (f) void handleUpload(f);
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            {uploading ? (
              <div className="dv-media-dropzone__text">Загрузка…</div>
            ) : (
              <>
                <div className="dv-media-dropzone__icon">+</div>
                <div className="dv-media-dropzone__text">
                  Перетащите файл сюда или нажмите для выбора
                </div>
                <div className="dv-media-dropzone__hint">
                  JPG / PNG / GIF / WebP / SVG / BMP / ICO — до 10 МБ
                </div>
              </>
            )}
          </div>

          {error && <div className="dv-admin-msg dv-admin-msg--error">{error}</div>}

          {/* Preview selected file */}
          {preview && (
            <div className="dv-media-preview">
              <div className="dv-media-preview__label">Выбрано:</div>
              <div className="dv-media-preview__row">
                <img src={preview} alt={preview} className="dv-media-preview__img" />
                <code className="dv-media-preview__url">{preview}</code>
              </div>
            </div>
          )}

          {/* Library */}
          <div className="dv-media-library">
            <div className="dv-media-library__head">
              <span>Загруженные файлы ({files.length})</span>
              <button
                className="dv-admin-link"
                onClick={loadFiles}
                disabled={loading}
                type="button"
              >
                ↻ Обновить
              </button>
            </div>
            {loading ? (
              <div className="dv-media-library__empty">Загрузка списка…</div>
            ) : files.length === 0 ? (
              <div className="dv-media-library__empty">
                Пока нет загруженных файлов. Загрузите первый выше.
              </div>
            ) : (
              <div className="dv-media-library__grid">
                {files.map((f) => (
                  <button
                    key={f.url}
                    type="button"
                    className={`dv-media-thumb${
                      preview === f.url ? ' dv-media-thumb--selected' : ''
                    }`}
                    onClick={() => setPreview(f.url)}
                    onDoubleClick={() => {
                      onSelect(f.url);
                      onClose();
                    }}
                    title={f.filename}
                  >
                    <img src={f.url} alt={f.filename} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="dv-media-picker__footer">
          <button
            className="dv-admin-btn dv-admin-btn--ghost"
            onClick={onClose}
            type="button"
          >
            Отмена
          </button>
          <button
            className="dv-admin-btn dv-admin-btn--primary"
            onClick={() => {
              if (preview) {
                onSelect(preview);
                onClose();
              }
            }}
            disabled={!preview}
            type="button"
          >
            Выбрать
          </button>
        </div>
      </div>
    </div>
  );
}
