'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Plus,
  Trash2,
  Maximize2,
  ZoomIn,
  RotateCw,
  Sparkles,
  CheckCircle2,
  Image as ImageIcon,
  X
} from 'lucide-react';
import { getCategoryImageUrl } from '@/lib/api';

export interface MediaItem {
  id: string;
  url: string;
  type: 'Featured Cover' | 'Front Angle' | 'Back Angle' | 'Macro Hallmark' | 'GIA / Assay Cert' | 'On-Model' | '360 Frame';
}

interface ProductMediaGalleryProps {
  initialFeaturedImage?: string;
  initialGallery?: MediaItem[];
  productType?: 'bullion' | 'jewelry';
  onMediaChange?: (featured: string, gallery: MediaItem[]) => void;
}

export function ProductMediaGallery({
  initialFeaturedImage = '',
  initialGallery = [],
  productType = 'bullion',
  onMediaChange,
}: ProductMediaGalleryProps) {
  const [featuredImage, setFeaturedImage] = useState<string>(initialFeaturedImage || '');
  const [gallery, setGallery] = useState<MediaItem[]>(initialGallery || []);

  // Sync state if props change (e.g. after async fetch)
  useEffect(() => {
    if (initialFeaturedImage) {
      setFeaturedImage(initialFeaturedImage);
      setActivePreviewImage(initialFeaturedImage);
    }
  }, [initialFeaturedImage]);

  useEffect(() => {
    if (Array.isArray(initialGallery) && initialGallery.length > 0) {
      setGallery(initialGallery);
      if (!featuredImage && initialGallery[0]?.url) {
        setFeaturedImage(initialGallery[0].url);
        setActivePreviewImage(initialGallery[0].url);
      }
    } else if (initialFeaturedImage && (!initialGallery || initialGallery.length === 0)) {
      const singleCover: MediaItem = {
        id: 'cover-1',
        url: initialFeaturedImage,
        type: 'Featured Cover',
      };
      setGallery([singleCover]);
    }
  }, [initialGallery, initialFeaturedImage]);

  // 360 Spin simulation frames
  const [rotationAngle, setRotationAngle] = useState(0);
  const [is360Active, setIs360Active] = useState(false);
  const [zoomPreviewOpen, setZoomPreviewOpen] = useState(false);
  const [activePreviewImage, setActivePreviewImage] = useState(featuredImage);

  // File input refs
  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  // Helper to read and auto-compress large images on canvas to keep requests lightweight
  const readFileOrCompress = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      if (file.type === 'image/svg+xml' || file.size < 250 * 1024) {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const MAX_WIDTH = 1400;
          const MAX_HEIGHT = 1400;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.85));
          } else {
            resolve(reader.result as string);
          }
        };
        img.onerror = () => resolve(reader.result as string);
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle Cover image upload from PC
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64Url = await readFileOrCompress(file);
      setFeaturedImage(base64Url);
      setActivePreviewImage(base64Url);

      // Also ensure it's in the gallery as Featured Cover
      const existingIndex = gallery.findIndex((g) => g.type === 'Featured Cover');
      let updated: MediaItem[];
      if (existingIndex >= 0) {
        updated = gallery.map((g, idx) =>
          idx === existingIndex ? { ...g, url: base64Url } : g
        );
      } else {
        const newCover: MediaItem = {
          id: String(Date.now()),
          url: base64Url,
          type: 'Featured Cover',
        };
        updated = [newCover, ...gallery];
      }
      setGallery(updated);
      onMediaChange?.(base64Url, updated);
    }
  };

  // Handle multi-image gallery upload from PC
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      const newItems: MediaItem[] = [];

      for (let idx = 0; idx < fileArray.length; idx++) {
        const file = fileArray[idx];
        const base64Url = await readFileOrCompress(file);
        newItems.push({
          id: `${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 5)}`,
          url: base64Url,
          type: (productType === 'bullion' ? 'Macro Hallmark' : 'Front Angle') as any,
        });
      }

      const updated = [...gallery, ...newItems];
      setGallery(updated);

      let newCover = featuredImage;
      if (!featuredImage && newItems.length > 0) {
        newCover = newItems[0].url;
        setFeaturedImage(newCover);
        setActivePreviewImage(newCover);
      }
      onMediaChange?.(newCover, updated);
    }
  };

  const handleRemoveMedia = (id: string) => {
    const itemToRemove = gallery.find((item) => item.id === id);
    const updated = gallery.filter((item) => item.id !== id);
    setGallery(updated);

    if (itemToRemove && itemToRemove.url === featuredImage) {
      const nextCover = updated.length > 0 ? updated[0].url : '';
      setFeaturedImage(nextCover);
      setActivePreviewImage(nextCover);
      onMediaChange?.(nextCover, updated);
    } else {
      onMediaChange?.(featuredImage, updated);
    }
  };

  const handleSetCover = (url: string) => {
    setFeaturedImage(url);
    setActivePreviewImage(url);
    onMediaChange?.(url, gallery);
  };

  return (
    <div className="luxury-glass p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
      {/* Hidden File Inputs */}
      <input
        ref={coverFileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        onChange={handleCoverUpload}
      />
      <input
        ref={galleryFileInputRef}
        type="file"
        multiple
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        onChange={handleGalleryUpload}
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>High-Resolution Media &amp; Product Gallery</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Upload featured cover image and multi-angle macro photos for storefront inspection.
          </p>
        </div>

        {gallery.length > 0 && (
          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5 self-start">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{gallery.length} Images Uploaded</span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Featured Image Stage (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              {is360Active ? '360° Studio Preview' : 'Featured Cover Photo'}
            </label>
            {activePreviewImage && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIs360Active(!is360Active)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1 cursor-pointer ${
                    is360Active
                      ? 'bg-amber-500/20 text-[#D4AF37] border-amber-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  <RotateCw className="w-3 h-3" />
                  <span>360° Mode</span>
                </button>
                <button
                  type="button"
                  onClick={() => setZoomPreviewOpen(true)}
                  className="text-[11px] font-semibold px-2 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1 cursor-pointer"
                >
                  <ZoomIn className="w-3 h-3" />
                  <span>Zoom</span>
                </button>
              </div>
            )}
          </div>

          {/* Main Visual Display Stage */}
          {activePreviewImage ? (
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-black/60 border border-amber-500/30 flex items-center justify-center p-4 group">
              <div
                className="w-full h-full flex items-center justify-center transition-transform duration-75"
                style={{
                  transform: is360Active ? `rotateY(${rotationAngle}deg)` : 'none',
                }}
              >
                <img
                  src={getCategoryImageUrl(activePreviewImage)}
                  alt="Product Featured"
                  className="max-h-full max-w-full object-contain drop-shadow-[0_20px_30px_rgba(212,175,55,0.15)] select-none"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&auto=format&fit=crop&q=80';
                  }}
                />
              </div>

              {is360Active && (
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-slate-800 text-[10px] font-bold text-amber-300">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  <span>Angle: {rotationAngle}°</span>
                </div>
              )}

              <button
                type="button"
                onClick={() => setZoomPreviewOpen(true)}
                className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/80 hover:bg-[#D4AF37] text-white hover:text-black border border-slate-700 transition-all opacity-0 group-hover:opacity-100 flex items-center gap-1 text-[10px] font-bold cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>HD Loupe</span>
              </button>
            </div>
          ) : (
            <div
              onClick={() => coverFileInputRef.current?.click()}
              className="aspect-square rounded-2xl border-2 border-dashed border-slate-700 hover:border-[#D4AF37] bg-slate-900/50 hover:bg-slate-900 flex flex-col items-center justify-center gap-3 p-6 text-center cursor-pointer transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                  Upload Featured Cover Image
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Click or drag &amp; drop high-res PNG, JPG or WebP (max 10MB)
                </p>
              </div>
            </div>
          )}

          {/* 360 Spin Slider Control */}
          {is360Active && activePreviewImage && (
            <div className="p-3.5 rounded-xl bg-[#090D15] border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <RotateCw className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Drag slider to rotate 360°</span>
                </span>
                <span className="text-amber-300 font-mono">{rotationAngle}° / 360°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={rotationAngle}
                onChange={(e) => setRotationAngle(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          )}

          {/* Change Primary Cover Button */}
          {activePreviewImage && (
            <div className="p-3 rounded-xl bg-[#090D15] border border-dashed border-amber-500/40 hover:border-amber-400 transition-all text-center">
              <button
                type="button"
                onClick={() => coverFileInputRef.current?.click()}
                className="text-xs font-bold text-amber-300 hover:text-white flex items-center justify-center gap-2 w-full py-1 cursor-pointer"
              >
                <Upload className="w-4 h-4 text-[#D4AF37]" />
                <span>Replace Cover Photo</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Multi-Image Gallery (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Product Gallery ({gallery.length} Images)
            </label>
            <button
              type="button"
              onClick={() => galleryFileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-xl gold-gradient-bg text-black font-bold text-xs flex items-center gap-1.5 shadow hover:opacity-95 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Gallery Images</span>
            </button>
          </div>

          {/* Gallery Thumbnails Grid */}
          {gallery.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  className={`relative group rounded-xl overflow-hidden border p-1 bg-[#090D15] transition-all ${
                    featuredImage === item.url
                      ? 'border-amber-400 ring-1 ring-amber-400/50'
                      : 'border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div
                    onClick={() => handleSetCover(item.url)}
                    className="aspect-square rounded-lg overflow-hidden bg-black/40 cursor-pointer relative"
                  >
                    <img
                      src={getCategoryImageUrl(item.url)}
                      alt="Gallery Item"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&auto=format&fit=crop&q=80';
                      }}
                    />

                    {featuredImage === item.url && (
                      <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-[#D4AF37] text-black text-[9px] font-black uppercase tracking-wider shadow">
                        Cover Hero
                      </span>
                    )}
                  </div>

                  <div className="p-1.5 space-y-1.5">
                    <select
                      value={item.type}
                      onChange={(e) => {
                        const updated = gallery.map((g) =>
                          g.id === item.id ? { ...g, type: e.target.value as any } : g
                        );
                        setGallery(updated);
                        onMediaChange?.(featuredImage, updated);
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded text-[10px] text-slate-300 px-1.5 py-1 focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Featured Cover">Featured Cover</option>
                      <option value="Front Angle">Front Angle</option>
                      <option value="Back Angle">Back Angle</option>
                      <option value="Macro Hallmark">Macro Hallmark / Assay</option>
                      <option value="GIA / Assay Cert">Assay Certificate</option>
                      <option value="360 Frame">360° Studio Frame</option>
                    </select>

                    <div className="flex items-center justify-between text-[10px] pt-0.5">
                      <button
                        type="button"
                        onClick={() => handleSetCover(item.url)}
                        className={`font-semibold cursor-pointer ${
                          featuredImage === item.url
                            ? 'text-amber-400'
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {featuredImage === item.url ? '✓ Active Cover' : 'Set as Cover'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveMedia(item.id)}
                        className="text-red-400/80 hover:text-red-400 p-1 rounded hover:bg-red-500/10 cursor-pointer"
                        title="Remove Image"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add More Tile */}
              <div
                onClick={() => galleryFileInputRef.current?.click()}
                className="aspect-square rounded-xl border-2 border-dashed border-slate-800 hover:border-amber-400/60 bg-slate-900/30 hover:bg-slate-900/60 flex flex-col items-center justify-center gap-2 p-4 text-center cursor-pointer transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-slate-400 group-hover:text-amber-300 transition-colors">
                  Add More Photos
                </span>
              </div>
            </div>
          ) : (
            <div
              onClick={() => galleryFileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-800 hover:border-[#D4AF37] rounded-2xl p-8 flex flex-col items-center justify-center gap-3 bg-slate-900/40 hover:bg-slate-900 cursor-pointer transition-all group text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                  No Gallery Images Uploaded Yet
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Click to select multiple angle photos, hallmark macros, or certificates from your computer.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* HD Zoom Modal */}
      {zoomPreviewOpen && activePreviewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setZoomPreviewOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-[#090D15] border border-amber-500/40 rounded-2xl overflow-hidden p-6 flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>High-Definition Inspection Mode</span>
              </span>
              <button
                type="button"
                onClick={() => setZoomPreviewOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="w-full max-h-[70vh] flex items-center justify-center overflow-hidden">
              <img
                src={getCategoryImageUrl(activePreviewImage)}
                alt="Zoomed Product"
                className="max-w-full max-h-[70vh] object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
