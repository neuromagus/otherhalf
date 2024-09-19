'use client';

import { addImage } from '@/app/actions/userActions';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { HiPhoto } from 'react-icons/hi2';
import { toast } from 'react-toastify';

export default function ImageUploadButton() {
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('/api/upload-image', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const result = await response.json();

            await addImage(result.url);

            toast.success('Image uploaded successfully');
            router.refresh()
        } catch (error) {
            console.error('Upload error:', error);
            toast.error("Problem upload image")
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 bg-secondary text-white rounded-lg py-2 px-4 hover:bg-secondary/70"
                disabled={isUploading}
            >
                <HiPhoto size={28} />
                {isUploading ? 'Uploading...' : 'Upload new image'}
            </button>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleUpload}
                style={{ display: 'none' }}
            />
        </>
    );
}