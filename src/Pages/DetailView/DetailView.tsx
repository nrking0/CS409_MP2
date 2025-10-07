import { Link, useParams } from "react-router-dom";
import { Artwork } from "../../utils/types";
import { useEffect, useState } from "react";
import styles from "./DetailView.module.scss";


const DetailView = ({ data }: { data: Artwork[] | null }) => {
    const { id } = useParams();
    const [art, setArt] = useState<Artwork>({} as Artwork);
    const [prev, setPrev] = useState<String>("");
    const [next, setNext] = useState<String>("");

    useEffect(() => {
        if (data) {
            const a = data?.filter((a) => String(a.id) === id);
            if(a) {
                setArt(a[0]);
                
                const i = data?.indexOf(a[0]);
                if (i === 0) {
                    setPrev(String(data[data?.length - 1].id))
                    setNext(String(data[i+1].id))
                } else if (i === data?.length) {
                    setPrev(String(data[i-1].id))
                    setNext(String(data[0].id))
                } else {
                    setNext(String(data[i+1].id))
                    setPrev(String(data[i-1].id))
                }
            }
        }

    }, [data, id]);

    return (
        <div className={styles.art}>
            <div>
                <img
                    src={`https://www.artic.edu/iiif/2/${art.image_id}/full/200,/0/default.jpg`}
                    alt={art.title}
                />
            </div>
            <div className={styles.details}>
                <h1>{art.title}</h1>
                <h2>{art.artist_display}</h2>
                <p><strong>Date:</strong> {art.date_display}</p>
                <p><strong>Dimensions:</strong> {art.dimensions}</p>
                <p><strong>Main Reference Number:</strong> {art.main_reference_number}</p>
                <p><strong>Place of Origin:</strong> {art.place_of_origin}</p>
                <p dangerouslySetInnerHTML={{ __html: `<strong>Description:</strong> ${art.description}` || "<strong>Description:</strong> N/A" }} />
                <p><strong>Short Description:</strong> {art.short_description || "N/A"}</p>
                <p><strong>Categories:</strong> {art.category_titles ? art.category_titles.join(", ") : "N/A"}</p>
            </div>
            <div className={styles.navigation}>
                <Link to={`/details/${prev}`} className={styles.navButton}>Previous</Link>
                <Link to={`/details/${next}`} className={styles.navButton}>Next</Link>
            </div>
        </div>
    );
};

export default DetailView;