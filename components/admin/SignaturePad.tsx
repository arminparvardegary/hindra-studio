'use client';

import { useRef, useEffect, useState } from 'react';
import { Eraser, Type, Pen } from 'lucide-react';

interface SignaturePadProps {
  signatureType: 'text' | 'drawn';
  signatureText: string;
  signatureData: string;
  onTypeChange: (type: 'text' | 'drawn') => void;
  onTextChange: (text: string) => void;
  onDataChange: (data: string) => void;
}

export default function SignaturePad({
  signatureType,
  signatureText,
  signatureData,
  onTypeChange,
  onTextChange,
  onDataChange,
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    // Set drawing style
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    setContext(ctx);

    // Restore previous signature if exists
    if (signatureData) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
      };
      img.src = signatureData;
    }
  }, [signatureType]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }
    
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (!context) return;
    
    const { x, y } = getCoordinates(e);
    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !context) return;
    
    const { x, y } = getCoordinates(e);
    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    if (!context || !canvasRef.current) return;
    
    context.closePath();
    setIsDrawing(false);
    
    // Save signature data
    const data = canvasRef.current.toDataURL('image/png');
    onDataChange(data);
  };

  const clearSignature = () => {
    if (!context || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    context.clearRect(0, 0, rect.width, rect.height);
    onDataChange('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">Signature</label>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => onTypeChange('text')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              signatureType === 'text'
                ? 'bg-white shadow text-black'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <Type className="w-4 h-4" />
            Type
          </button>
          <button
            type="button"
            onClick={() => onTypeChange('drawn')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              signatureType === 'drawn'
                ? 'bg-white shadow text-black'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <Pen className="w-4 h-4" />
            Draw
          </button>
        </div>
      </div>

      {signatureType === 'text' ? (
        <div className="space-y-2">
          <input
            type="text"
            value={signatureText}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Type your full name"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
          />
          {signatureText && (
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <p className="text-2xl text-center" style={{ fontFamily: 'cursive' }}>
                {signatureText}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="w-full h-40 bg-gray-50 rounded-xl border border-gray-200 cursor-crosshair touch-none"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
            <button
              type="button"
              onClick={clearSignature}
              className="absolute top-2 right-2 p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              title="Clear signature"
            >
              <Eraser className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Draw your signature above
          </p>
        </div>
      )}
    </div>
  );
}
