import './CodeViewer.css';
import detectLanguage from '../hooks/detectLanguage';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useEffect, useState } from 'react';

function CodeViewer({ file }) {
    const [isDark, setIsDark] = useState(true);
    const [codeContent, setCodeContent] = useState('');
    const [language, setLanguage] = useState('text');
    const [tooLarge, setTooLarge] = useState(false);

    useEffect(() => {
        const checkTheme = () => {
            setIsDark(document.documentElement.classList.contains('dark'));
        };
        checkTheme();

        // Create an observer to watch for theme changes automatically
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        console.log("Theme Switched");
    }, [isDark]);

    const fetchCodeContent = async () => {
        if (file && file.download_url) {
            try {
                const response = await fetch(file.download_url);
                const text = await response.text();
                setCodeContent(text);
                return text;
            } catch (error) {
                console.error("Error fetching code content:", error);
            }
        }
    };

    useEffect(() => {
        console.log("File changed in CodeViewer:", file);
        if (file && file.size > 10000) {
            setTooLarge(true);
            console.warn(`File "${file.name}" is too large to display (${file.size} bytes).`);
            return;
        }

        setTooLarge(false);
        fetchCodeContent().then(() => {
            if (file && file.name) {
                const detectedLanguage = detectLanguage(file.name);
                setLanguage(detectedLanguage);
            }
        });
    }, [file]);

    const rawCodeText = typeof codeContent === 'string' ? codeContent : JSON.stringify(codeContent, null, 2);

    return (
        <div className="code-viewer relative w-full h-full max-w-[800px]">
            {tooLarge && (
                <div className="overlay flex flex-col">
                    <p>⚠ Code content is too large to display ⚠</p>
                    <button className="view-raw-button" onClick={() => window.open(file.html_url, '_blank')}>
                        View Raw
                    </button>
                </div>
            )}

            <SyntaxHighlighter 
                className="code-content h-full w-full"
                key={isDark ? "dark-box" : "light-box"}
                language={language}
                style={isDark ? oneDark : oneLight}
                showLineNumbers={true}
                customStyle={{
                    margin: 0,
                    display: 'block',
                }}
            >
                {rawCodeText}
            </SyntaxHighlighter>
        </div>
    );
}

export default CodeViewer;