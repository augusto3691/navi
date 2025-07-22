import React, { useEffect, useRef, useState } from 'react';
import { Textarea } from '../ui/textarea';
import { useDebouncedCallback } from 'use-debounce';
import { translate } from '@vitalets/google-translate-api';

const Translate: React.FC = () => {

    const [translation, setTranslation] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const debounced = useDebouncedCallback(
        // function
        async (value) => {
            setLoading(true);

            try {
                const { text } = await translate(value, { to: 'en' });
                setTranslation(text);
            } catch (err) {
                setError('Erro ao traduzir');
            } finally {
                setLoading(false);
            }


        },
        1000
    );



    const translatorRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (translatorRef.current) {
            translatorRef.current.focus();
        }
    }, []);

    return (
        <div>
            <Textarea
                ref={translatorRef}
                autoFocus
                onChange={(e) => debounced(e.target.value)}
                placeholder="Qual a sua dúvida na tradução?"
                className="w-full h-40 resize-none"
            />

            <p className="text-sm text-gray-500 mt-5">
                {translation}
            </p>
        </div>
    );
};

export default Translate;