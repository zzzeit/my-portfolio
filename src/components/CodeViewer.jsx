import './CodeViewer.css';
import Lottie from "lottie-react";
import LoadingAnim from "../assets/loadanim3.json";
import detectLanguage from '../hooks/detectLanguage';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useEffect, useState } from 'react';

function CodeViewer({ file }) {
    const [isDark, setIsDark] = useState(true);
    const [codeContent, setCodeContent] = useState('');
    const [language, setLanguage] = useState('text');
    const [tooLarge, setTooLarge] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const LottieComponent = Lottie.default || Lottie;

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
                setIsLoading(true);
                const response = await fetch(file.download_url);
                const text = await response.text();
                setCodeContent(text);
                setIsLoading(false);
                return text;
            } catch (error) {
                console.error("Error fetching code content:", error);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
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
        <div className="code-viewer relative flex-1 md:min-w-[330px] h-full max-h-[100px] max-w-[800px] max-[825px]:max-h-[400px] min-[825px]:max-h-[500px] overflow-hidden rounded-[4px]">
            <div className="code-header absolute flex justify-between w-full px-3">
                <span className="file-name text-sm font-medium">{file ? file.name : 'Select a file to view its content'}</span>
                <span className="language-label text-xs font-light">{language.toUpperCase()}</span>
            </div>
            {tooLarge && (
                <div className="overlay flex flex-col">
                    <p>⚠ Code content is too large to display ⚠</p>
                    <button className="view-raw-button" onClick={() => window.open(file.html_url, '_blank')}>
                        View Raw
                    </button>
                </div>
            )}

            {isLoading && (
                <div className="overlay flex flex-col">
                    <LottieComponent animationData={LoadingAnim} style={{ width: '300px', height: '300px' }} loop={true} />
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
                {rawCodeText ? rawCodeText : ' '}
            </SyntaxHighlighter>
        </div>
    );
}

export default CodeViewer;