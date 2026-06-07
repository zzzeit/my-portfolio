import './FileTree.css';
import { useEffect, useState } from "react";

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
		<div className="file-tree-item flex flex-col items-start">
			<div className="file-tree-item-name flex items-center gap-2 pl-2 w-full" onClick={itemClicked}>
				{areChildren && <span>∟</span>}
				{type === 'file' ? 
					<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title xmlns="">file-line</title><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M13.586 2a2 2 0 0 1 1.284.467l.13.119L19.414 7a2 2 0 0 1 .578 1.238l.008.176V20a2 2 0 0 1-1.85 1.995L18 22H6a2 2 0 0 1-1.995-1.85L4 20V4a2 2 0 0 1 1.85-1.995L6 2zM12 4H6v16h12V10h-4.5A1.5 1.5 0 0 1 12 8.5zm2 .414V8h3.586z"/></g></svg> 
					: 
					<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title xmlns="">folder-rounded</title><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h5.175q.4 0 .763.15t.637.425L12 6h8q.825 0 1.413.588T22 8v10q0 .825-.587 1.413T20 20z"/></svg>
				}
				{file.name}	
			</div>
			{expanded && type === 'dir' && (
				<div className={`file-tree-children flex flex-row ${areChildren ? 'pl-6' : 'pl-2'}`}>
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
		// console.log(files);
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

function FileTree() {
    const [repoState, setRepoState] = useState({
		owner: 'zzzeit',
		repo: 'desolate-rift',
		selectedFile: null,
	});
	const [retrieving, setRetreiving] = useState(false);

	const token = import.meta.env.VITE_GITHUB_TOKEN; 
	console.log(`Using GitHub Token: ${token ? 'Provided' : 'Not Provided'}`);
	const requestOptions = {
		method: 'GET',
		headers: {
			'Accept': 'application/vnd.github+json',
			'X-GitHub-Api-Version': '2022-11-28',
			'Authorization': `bearer ${token}` // Injected safely on the server side
		}
    }

	// test
	const fetchRepoContents = async (path) => {
		setRetreiving(true);
		// setError(null);
		try {
			const response = await fetch(
				`https://api.github.com/repos/${repoState.owner}/${repoState.repo}/contents${path ? `/${path}` : ''}`, 
				requestOptions ? requestOptions : undefined
			);
			const data = await response.json();
			return data;
			// setFiles(data);
			// console.log(data);
		} catch (err) {
			console.error("Error fetching repository contents:", err);
			// setError(err.message);
		} finally {
			setRetreiving(false);
		}
	};

	// useEffect(() => {
	// 	fetchRepoContents();
	// }, []);

	useEffect(() => {
		console.log(`File Selected: ${repoState.selectedFile ? repoState.selectedFile.path : 'None'}`);
	}, [repoState.selectedFile]);


    return (
		<div className="file-tree-container h-[500px] w-[250px]">
			<FileTreeList path='' fetchRepoContents={fetchRepoContents} onFileClick={(file) => setRepoState(prev => ({ ...prev, selectedFile: file }))} areChildren={false} />
		</div>
        
    )
}

export default FileTree;