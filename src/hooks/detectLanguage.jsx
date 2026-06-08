const detectLanguage = (filename) => {
    if (!filename) return 'text';



    // Handle special exact filenames that don't use extensions
    const specialFiles = {
        'dockerfile': 'dockerfile',
        'makefile': 'makefile',
        'gemfile': 'ruby',
        'jenkinsfile': 'groovy',
        '.gitignore': 'bash',
        '.env': 'bash'
    };
    const lowerFilename = filename.toLowerCase();
    if (specialFiles[lowerFilename]) {
        return specialFiles[lowerFilename];
    }
    const extension = lowerFilename.split('.').pop();


    // Map common extensions to what your highlighter (Prism/Highlight.js) expects
    const languageMap = {
        // JavaScript ecosystem
        js: 'javascript',
        jsx: 'jsx',
        ts: 'typescript',
        tsx: 'tsx',
        json: 'json',

        // Web Design
        html: 'html',
        css: 'css',
        scss: 'scss',
        svg: 'xml',

        // Backend & Systems
        py: 'python',
        rb: 'ruby',
        rs: 'rust',
        go: 'go',
        java: 'java',
        cpp: 'cpp',
        c: 'c',
        cs: 'csharp',
        php: 'php',

        // Data & Config
        md: 'markdown',
        yml: 'yaml',
        yaml: 'yaml',
        xml: 'xml',
        ini: 'ini',

        // Shell scripts
        sh: 'bash',
        bash: 'bash',
        zsh: 'bash',
        ps1: 'powershell'
    };

    return languageMap[extension] || 'text';
};

export default detectLanguage;