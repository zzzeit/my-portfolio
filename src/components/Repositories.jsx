import Section from "./Section";
import './Repositories.css'
import { useEffect, useState } from "react";


function RepositoryCard({ repo }) {

    return (
        <div className="card-repository">
            <h3>{repo.name}</h3>
            <p>{repo.description}</p>
            <div style={{ width: '100%', height: '1px', backgroundColor: '#474747', margin: '16px 0' }} />
            <div className="repo-stats">
                <span className="repo-upd">Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
                <a className="repo-link" href={repo.html_url} target="_blank" rel="noopener noreferrer">Source</a>
            </div>

        </div>
    );
}

function Repositories() {

    const [fetchedRepos, setFetchedRepos] = useState([]);

    const fetchGitHubRepos = async () => {
        try {
            const response = await fetch(`https://api.github.com/users/zzzeit/repos?sort=updated`);
            const data = await response.json();

            setFetchedRepos(data);
        } catch (err) {
            console.error("Error fetching repositories:", err);
        }  
    };

    useEffect(() => {
        fetchGitHubRepos();
    }, []);

    return (
        <Section id="repositories">
            <div className="my-repositories lg:h-[calc(100vh-73px)] pl-5 pr-5 lg:pl-20 lg:pr-20">
                <div className="bordered-container">
                    <h1 id="repositoriesTitle">My Repositories</h1>
                    <div className="decorator-divider" />
                    <h3 className="mb-7">These are the repositories for both real/mock projects I've created:</h3>
                    <div className="grid-card flex flex-wrap lg:flex-row-2 gap-x-7 gap-y-6">
                        {fetchedRepos.map((repo) => (
                            <RepositoryCard key={repo.id} repo={repo} />
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}

export default Repositories;