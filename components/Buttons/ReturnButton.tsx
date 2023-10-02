"use client"

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const ReturnButton = () => {
    const router = useRouter();


    const handleClick = useCallback(() => {
        router.push(`/browse`)
    }, [router]);

    return (
        <ArrowLeftIcon onClick={handleClick} className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition" />
    );
}

export default ReturnButton;