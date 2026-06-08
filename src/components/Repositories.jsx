import Section from "./Section";
import './Repositories.css'
import { useEffect, useState } from "react";
import FileTree from "./FileTree";

function RepositoryCard({ repo, onClick }) {

    return (
        <div className="card-repository h-fit" onClick={() => onClick()}>
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
                console.error("GitHub token is not set. Please add it to your .env file.");
                return;
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

                        <div className="repositories-list-container max-w-[380px]">
                            <div className="search-container mb-5 lg:mb-0">
                                <input
                                    type="text"
                                    placeholder="Search repositories..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-bar"
                                />
                            </div>

                            <div className="grid-card flex flex-wrap h-[calc(100%-62px)] lg:flex-row-2 gap-x-7 gap-y-6 overflow-y-scroll scrollbar-none">
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