import { useEffect, useState } from "react";
import { Artwork } from "../../utils/types";
import styles from "./Gallery.module.scss";
import { useNavigate } from "react-router-dom";

const Gallery = ({ data }: { data: Artwork[] | null }) => {
    const origins: string[] = [];
    data?.forEach((artwork) => {
        if (
            artwork.place_of_origin &&
            !origins.includes(artwork.place_of_origin)
        ) {
            origins.push(artwork.place_of_origin);
        }
    });

    const categories: string[] = [];
    data?.forEach((artwork) => {
        if (artwork.category_titles) {
            artwork.category_titles.forEach((category) => {
                if (!categories.includes(category)) {
                    categories.push(category);
                }
            });
        }
    });

    const nav = useNavigate();

    const [filteredData, setFilteredData] = useState(data || []);
    const [selectedOrigin, setSelectedOrigin] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        if (selectedOrigin === "") {
            setFilteredData(data || []);
        } else {
            if (data) {
                setFilteredData(
                    data.filter(
                        (artwork) => artwork.place_of_origin === selectedOrigin
                    )
                );
            }
        }

        if (selectedCategory !== "") {
            setFilteredData((prevData) =>
                prevData.filter((artwork) =>
                    artwork.category_titles?.includes(selectedCategory)
                )
            );
        }
    }, [selectedOrigin, data, selectedCategory]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Gallery Page</h1>
            <div className={styles.filters}>
                <label>
                    Filter by Place of Origin:{" "}
                </label>
                <select
                    className={styles.filterSelect}
                    value={selectedOrigin}
                    onChange={(e) => setSelectedOrigin(e.target.value)}
                >
                    <option value="">All</option>
                    {origins.map((origin) => (
                        <option key={origin} value={origin}>
                            {origin}
                        </option>
                    ))}
                </select>
                <label>
                    Filter by Category:{" "}
                </label>
                <select
                    value={selectedCategory}
                    className={styles.filterSelect}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.artworkGrid}>
                {data ? (
                    filteredData
                        .filter((artwork) => artwork.image_id)
                        .map((artwork, i) => (
                            <div
                                key={i}
                                className={styles.artwork}
                                onClick={() => nav(`/details/${artwork.id}`)}
                            >
                                {artwork.image_id && (
                                    <div>
                                        <img
                                            src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/200,/0/default.jpg`}
                                            alt={artwork.title}
                                            loading="lazy"
                                        />
                                    </div>
                                )}
                            </div>
                        ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Gallery;
