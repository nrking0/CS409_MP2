import styles from "./ListView.module.scss";
import { useEffect, useState } from "react";
import { Artwork } from "../../utils/types";
import { useNavigate } from "react-router-dom";

const ListView = ({data}: {data: Artwork[] | null}) => {

    const [search, setSearch] = useState("");

    const [filteredData, setFilteredData] = useState(data || []);
    const [sort, setSort] = useState("title");
    const [ascending, setAscending] = useState(true);

    const sortData = (s: string, d: Artwork[], a: boolean) => {
        if (!d) return [];
        const sorted = d;
        if (s === "title") {
            if (!a) {
                sorted.sort((a, b) => b.title.localeCompare(a.title));
                return sorted;
            }
            sorted.sort((a, b) => a.title.localeCompare(b.title));
        } else if (s === "artist") {
            if (!a) {
                sorted.sort((a, b) =>
                    b.artist_display.localeCompare(a.artist_display)
                );
                return sorted;
            }
            sorted.sort((a, b) =>
                a.artist_display.localeCompare(b.artist_display)
            );
        }
        return sorted;
    };

    useEffect(() => {
        const filterData = (s: string, d: Artwork[]) => {
            if (!d) return [];
            let temp = d.filter(
                (artwork) =>
                    artwork.title.toLowerCase().includes(s.toLowerCase()) ||
                    artwork.artist_display.toLowerCase().includes(s.toLowerCase())
            );
            return sortData(sort, temp, ascending);
        };

        setFilteredData(filterData(search, data || []));
    }, [search, data, ascending, sort]);

    const nav = useNavigate();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>List View</h1>
            <div className={styles.searchBox}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={styles.searchInput}
                />
            </div>
            <div className={styles.sort}>
                <p>Sort by:</p>
                <select
                    value={sort}
                    onChange={(e) => {
                        setSort(e.target.value);
                        setFilteredData(sortData(e.target.value, filteredData, ascending));
                    }}
                >
                    <option value="title">Title</option>
                    <option value="artist">Artist</option>
                </select>
                <button
                    onClick={() => {
                        setAscending((a) => !a);
                        setFilteredData(sortData(sort, filteredData, !ascending));
                    }}
                >
                    {ascending ? "Asc" : "Desc"}
                </button>
            </div>
            {data ? (
                <div className={styles.artworkList}>
                    {filteredData.map((artwork, i) => (
                        <div key={i} className={styles.artwork} onClick={() => nav(`/details/${artwork.id}`)}>
                            {artwork.image_id ? (
                                <div className={styles.artworkImageContainer}>
                                    <img
                                        src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/200,/0/default.jpg`}
                                        alt={artwork.title}
                                        loading="lazy"
                                        className={styles.artworkImage}
                                    />
                                </div>
                            ) : (
                                <div className={styles.noImage}>
                                    No Image Available :(
                                </div>
                            )}
                            <div className={styles.artworkDetails}>
                                <h2>{artwork.title}</h2>
                                <h3>{artwork.artist_display}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ListView;
