import { useEffect, useState } from 'react';
import axios from 'axios';

// Define the Manga type
type Manga = {
    id: number;
    title: string;
    description: string;
};

const MangaList = () => {
    // Specify the type for the state
    const [mangaList, setMangaList] = useState<Manga[]>([]);

    useEffect(() => {
        const fetchManga = async () => {
            try {
                const response = await axios.get('/api/manga');
                setMangaList(response.data);  // TypeScript now knows what data to expect
            } catch (error) {
                console.error('Error fetching manga list:', error);
            }
        };
        fetchManga();
    }, []);

    return (
        <div>
            <h1>Manga List</h1>
            {mangaList.map((manga) => (
                <div key={manga.id}>
                    <h2>{manga.title}</h2>
                    <p>{manga.description}</p>
                </div>
            ))}
        </div>
    );
};

export default MangaList;
