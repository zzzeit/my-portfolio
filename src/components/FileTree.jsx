import './FileTree.css';
import { useEffect, useState, useCallback } from "react";
import Lottie from "lottie-react";
import LoadingAnim from "../assets/loadanim.json";

function FileTreeItem({ file, fetchRepoContents, filePath, type, onFileClick, areChildren }) {
    const [expanded, setExpanded] = useState(false);

    const itemClicked = () => {
        if (type === 'file') {
            onFileClick(file);
        } else if (type === 'dir') {
            setExpanded(prev => !prev);
        }
    }

    return (
        <div className="flex flex-col items-start file-tree-item">
            <div className="flex w-full items-center gap-2 pl-2 file-tree-item-name" onClick={itemClicked}>
                {areChildren && <span>∟</span>}
                {type === 'file' ? 
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title xmlns="">file-line</title><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M13.586 2a2 2 0 0 1 1.284.467l.13.119L19.414 7a2 2 0 0 1 .578 1.238l.008.176V20a2 2 0 0 1-1.85 1.995L18 22H6a2 2 0 0 1-1.995-1.85L4 20V4a2 2 0 0 1 1.85-1.995L6 2zM12 4H6v16h12V10h-4.5A1.5 1.5 0 0 1 12 8.5zm2 .414V8h3.586z"/></g></svg> 
                    : 
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title xmlns="">folder-rounded</title><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h5.175q.4 0 .763.15t.637.425L12 6h8q.825 0 1.413.588T22 8v10q0 .825-.587 1.413T20 20z"/></svg>
                }
                {file.name}	
            </div>
            {expanded && type === 'dir' && (
                <div className={`flex flex-row file-tree-children ${areChildren ? 'pl-6' : 'pl-2'}`}>
                    <div className="flex-1">
                        <FileTreeList path={`${filePath}/${file.name}`} fetchRepoContents={fetchRepoContents} onFileClick={onFileClick} areChildren={true} />
                    </div>
                </div>
            )}
        </div>
    )
}

function FileTreeList({ path, fetchRepoContents, onFileClick, areChildren }) {
    const [files, setFiles] = useState([]);
    const loadFiles = async () => {
        const data = await fetchRepoContents(path);
        setFiles(data ? data : []);
    };
    useEffect(() => {
        loadFiles();
    }, [path, fetchRepoContents]);

    return (
        <>
            {Array.isArray(files) && files.map((file) => (
                file.type === 'dir' ? (
                    <FileTreeItem key={file.sha} file={file} fetchRepoContents={fetchRepoContents} filePath={path} type={file.type} onFileClick={onFileClick} areChildren={areChildren} />
                ) : null
            ))}
            {Array.isArray(files) && files.map((file) => (
                file.type === 'file' ? (
                    <FileTreeItem key={file.sha} file={file} fetchRepoContents={fetchRepoContents} filePath={path} type={file.type} onFileClick={onFileClick} areChildren={areChildren} />
                ) : null
            ))}
        </>
    )
}

function FileTree({ selectedRepo }) {
    const LottieComponent = Lottie.default || Lottie;
    const [selectedFile, setSelectedFile] = useState(null);
    const [retrieving, setRetrieving] = useState(false);

    const token = import.meta.env.VITE_GITHUB_TOKEN;
    
    const fetchRepoContents = useCallback(async (path) => {
        if (!selectedRepo) return;
        console.log(`Fetching contents for: ${selectedRepo.owner.login}/${selectedRepo.name} at path: ${path}`);
        setRetrieving(true);
        try {
            if (!token) {
                console.error("Cannot retrieve repository contents. GitHub token is not set. Please add it to your .env file.");
            }
            const response = await fetch(
                `https://api.github.com/repos/${selectedRepo.owner.login}/${selectedRepo.name}/contents${path ? `/${path}` : ''}`,
                token ? {
                    headers: {
                        'Accept': 'application/vnd.github+json',
                        'X-GitHub-Api-Version': '2022-11-28',
                        'Authorization': `Bearer ${token}`
                    }
                } : undefined
            );
            return await response.json();
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setRetrieving(false);
        }
    }, [selectedRepo, token]);

    useEffect(() => {
        console.log(`File Selected: ${selectedFile ? selectedFile.path : 'None'}`);
    }, [selectedFile]);

    return (
        <div className="relative">
            {retrieving && (
                <div className="flex h-full items-center justify-center loading-animation rounded-[4px]">
                    <LottieComponent
                        animationData={LoadingAnim}
                        loop={true}
                        autoplay={true}
                        style={{ width: '100px', height: '100px', margin: '0 auto' }}
                    />
                </div>
            )}    
            <div className="h-full w-full min-w-[250px] max-h-[300px] file-tree-container min-[700px]:max-h-full">
                
                {!selectedRepo && (
                    <div className="flex h-full flex-col items-center justify-center gap-3 file-tree-placeholder">
                        <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><title xmlns="">mood-empty</title><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0m6-2h.01M15 10h.01M9 15h6"/></svg>
                        <p className="mt-4 text-center text-xs text-gray-500">No repository selected.</p>
                    </div>
                )}
                
                <FileTreeList 
                    path='' 
                    fetchRepoContents={fetchRepoContents} 
                    onFileClick={(file) => setSelectedFile(file)} 
                    areChildren={false} 
                />
            </div>    
        </div>
    );
}

export default FileTree;