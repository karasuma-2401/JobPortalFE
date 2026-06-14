import React from 'react';

export const handleEnterToNext = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
        const form = e.currentTarget;
        const focusableElements = Array.from(
            form.querySelectorAll<HTMLElement>(
                'input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button[type="submit"]:not([disabled])'
            )
        );
        const currentIndex = focusableElements.indexOf(
            document.activeElement as HTMLElement
        );
        if (currentIndex > -1 && currentIndex < focusableElements.length - 1) {
            e.preventDefault();
            focusableElements[currentIndex + 1].focus();
        }
    }
};
