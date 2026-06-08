import Section from "./Section";
import './Repositories.css'
import { useEffect, useState } from "react";
import FileTree from "./FileTree";

function RepositoryCard({ repo, onClick }) {

    return (
        <div className="card-repository h-fit w-fit" onClick={() => onClick()}>
            <h3>{repo.name}</h3>
            <p>{repo.description}</p>
            <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--ui-border)', margin: '16px 0px 3px 0px' }} />
            <div className="repo-stats">
                <span className="repo-upd">Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
                <a className="repo-link" href={repo.html_url} target="_blank" rel="noopener noreferrer">Github</a>
            </div>

        </div>
    );
}

function Repositories() {

    const [fetchedRepos, setFetchedRepos] = useState([]);
    const [selectedRepo, setSelectedRepo] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const token = import.meta.env.VITE_GITHUB_TOKEN;
    const fetchGitHubRepos = async () => {
        try {
            if (!token) {
                console.error("Cannot retrieve GitHub repositories. GitHub token is not set. Please add it to your .env file.");
            }
            const response = await fetch(
                `https://api.github.com/search/repositories?q=user:zzzeit+${searchTerm}&sort=updated&order=desc`,
                token ? {
                    headers: {
                        'Accept': 'application/vnd.github+json',
                        'X-GitHub-Api-Version': '2022-11-28',
                        'Authorization': `Bearer ${token}`
                    }
                } : undefined
            );
            const data = await response.json();

            setFetchedRepos(data);
        } catch (err) {
            console.error("Error fetching repositories:", err);
        }  
    };

    useEffect(() => {
        fetchGitHubRepos();
    }, [searchTerm]);

    return (
        <Section id="repositories">
            <div className="my-repositories lg:h-[calc(100vh-73px)] w-full pl-5 pr-5 pt-4 pb-4 lg:pl-20 lg:pr-20">
                <div className="bordered-container h-full  w-full">
                    <h1 id="repositoriesTitle">My Repositories</h1>
                    <div className="decorator-divider" />
                    <h3 className="mb-7">These are the repositories for both real/mock projects I've created:</h3>
                    
                    <div className="flex max-[700px]:flex-col justify-center max-h-[500px] w-full lg:flex-row gap-10">

                        <div className="repositories-list-container max-w-[300px]">
                            <div className="search-container relative mb-5 lg:mb-0">
                                <svg className="absolute right-[2%] bottom-[10%]" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><title xmlns="">round-search</title><path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0s.41-1.08 0-1.49zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"/></svg>
                                <input
                                    type="text"
                                    placeholder="Search repositories..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-bar"
                                />
                            </div>

                            <div className="grid-card flex flex-col h-[calc(100%-62px)] lg:flex-col gap-4 overflow-y-scroll scrollbar-none">
                                {Array.isArray(fetchedRepos.items) && fetchedRepos.items.map((repo) => (
                                    <RepositoryCard key={repo.id} repo={repo} onClick={() => {
                                        setSelectedRepo(repo);
                                        console.log(`Selected Repository: ${repo.name}`);
                                    }} />
                                ))}
                            </div>    
                        </div>
                        
                        <FileTree selectedRepo={selectedRepo} />
                    </div>
                </div>
            </div>
        </Section>
    );
}

export default Repositories;