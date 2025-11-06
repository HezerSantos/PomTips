import { Link } from "react-router-dom"
const HomeHeader: React.FC = () => {
    return(
        <>
            <header className="page-section">
                <section className="page-section__child home-header">
                    <h1>
                        Refined Nails.
                        <br />
                        Pom-Level Pawfection
                    </h1>
                    <div>
                        <Link to={"/"}>View More</Link>
                        <Link to={""}>Book Now</Link>
                    </div>
                </section>
            </header>
        </>
    )
}

export default HomeHeader