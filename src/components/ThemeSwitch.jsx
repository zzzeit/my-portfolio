import { useEffect, useState, useRef } from 'react';
import './ThemeSwitch.css';
import Lottie from 'lottie-react';
import ThemeButtonAnimation from '../assets/theme2.json';

function ThemeSwitch() {
	const LottieComponent = Lottie.default || Lottie;
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('theme');
        if (saved) return saved === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    const lottieRef = useRef(null);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            lottieRef.current?.playSegments([0, 15], true);
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            lottieRef.current?.playSegments([15, 0], true);
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark(!isDark);

    return (
        <div className="theme-switch" onClick={toggleTheme}>
            <LottieComponent
                lottieRef={lottieRef}
                animationData={ThemeButtonAnimation} 
                loop={false}
                autoplay={false}
            />
        </div>
    );
}

export default ThemeSwitch;