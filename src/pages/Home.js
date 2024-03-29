import supabase from "../config/supabaseClient"
import {useEffect, useState} from "react"
import {logSmoothies} from '../service'


// components
import SmoothieCard from "../components/SmoothieCard"

const Home = () => {
    const [fetchError, setFetchError] = useState(null)
    const [smoothies, setSmoothies] = useState(null)
    const [orderBy, setOrderBy] = useState("created_at")

    const handleDelete = (id) => {
        setSmoothies((prevSmoothies) => {
            return prevSmoothies.filter((sm) => sm.id !== id)
        })
    }

    useEffect(() => {
        logSmoothies()
        const fetchSmoothies = async () => {
            const {data, error} = await supabase
                .from("smoothies")
                .select()
                .order(orderBy, {ascending: false})

            if (error) {
                setFetchError("Could not fetch the smoothies")
                setSmoothies(null)
            }
            if (data) {
                setSmoothies(data)
                setFetchError(null)
            }
        }

        fetchSmoothies()
    }, [orderBy])

    return (
        <div className="page home">
            {fetchError && <p>{fetchError}</p>}
            {smoothies && (
                <div className="smoothies">
                    <div className="order-by">
                        <p>Order by:</p>
                        <button
                            onClick={() => setOrderBy("created_at")}
                            className={`${orderBy ? "active" : "deactive"}`}
                        >
                            Time Created
                        </button>
                        <button
                            onClick={() => setOrderBy("title")}
                            className={`${orderBy ? "active" : "deactive"}`}
                        >
                            Title
                        </button>
                        <button
                            onClick={() => setOrderBy("rating")}
                            className={`${orderBy ? "active" : "deactive"}`}
                        >
                            rating
                        </button>
                    </div>
                    <div className="smoothie-grid">
                        {smoothies.map((smoothie) => (
                            <SmoothieCard
                                key={smoothie.id}
                                smoothie={smoothie}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home
