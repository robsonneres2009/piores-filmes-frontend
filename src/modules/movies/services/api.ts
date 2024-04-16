import { API } from "@/shared/api";
import { fetchMoviesProps } from "../types";

const fetchMovies = async ({ page, filterYear, filterWinner }: fetchMoviesProps) => {
    try {
        const response = await fetch(
            `${API.MOVIES}?page=${page < 0 ? 0 : page}&size=15${filterWinner ? "&winner=" + filterWinner : ""
            }${filterYear ? "&year=" + filterYear : ""}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch movies:', error);
        return { content: [], totalPages: 0 };
    }
};

export default fetchMovies;