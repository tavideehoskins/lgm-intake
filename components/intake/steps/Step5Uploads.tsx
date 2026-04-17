"use client";
import { useRef, useState, useCallback } from "react";
import { UploadCloud, X } from "lucide-react";
import type { IntakeFormData } from "@/types";

interface Props {
  data: IntakeFormData;
  onChange: (updates: Partial<IntakeFormData>) => void;
}

const MAX_FILES = 6;
const MAX_SIZE_MB = 10;

export default function Step5Uploads({ data, onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const addFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return;
      const valid = Array.from(newFiles)
        .filter((f) => f.type.startsWith("image/"))
        .filter((f) => f.size <= MAX_SIZE_MB * 1024 * 1024)
        .slice(0, MAX_FILES - data.inspirationPhotos.length);
      if (valid.length > 0) {
        onChange({ inspirationPhotos: [...data.inspirationPhotos, ...valid] });
      }
    },
    [data.inspirationPhotos, onChange]
  );

  function removeFile(index: number) {
    const updated = data.inspirationPhotos.filter((_, i) => i !== index);
    onChange({ inspirationPhotos: updated });
  }

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  return (
    <div className="animate-slide-up space-y-6">
      <div>
        <h2 className="text-2xl font-serif text-brand-black mb-1">
          Show us your inspiration.
        </h2>
        <p className="text-brand-muted text-sm">
          Upload up to {MAX_FILES} photos — screenshots, Pinterest saves, or anything
          that captures the look and feel you want.
        </p>
      </div>

      {/* Dropzone */}
      {data.inspirationPhotos.length < MAX_FILES && (
        <div
          className={`dropzone rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer ${
            dragActive ? "active" : ""
          }`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
        >
          <UploadCloud className="w-10 h-10 text-brand-gold mb-3" strokeWidth={1.5} />
          <p className="font-medium text-brand-black text-sm">
            Drop photos here or <span className="text-brand-gold underline">browse</span>
          </p>
          <p className="text-xs text-brand-muted mt-1">
            JPG, PNG, WEBP · max {MAX_SIZE_MB}MB each · up to {MAX_FILES} photos
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
          />
        </div>
      )}

      {/* Preview grid */}
      {data.inspirationPhotos.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {data.inspirationPhotos.map((file, i) => {
            const url = URL.createObjectURL(file);
            return (
              <div key={i} className="relative group rounded-lg overflow-hidden aspect-square bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`Inspiration ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="absolute top-1.5 right-1.5 bg-black/60 hover:bg-black text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {data.inspirationPhotos.length === 0 && (
        <p className="text-xs text-center text-brand-muted">
          No inspiration photos yet — this step is optional but very helpful!
        </p>
      )}
    </div>
  );
}
