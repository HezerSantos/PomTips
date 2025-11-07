import { Link } from "react-router-dom"
const HomeHeader: React.FC = () => {
    return(
        <>
            <header className="page-section">
                <section className="page-section__child home-header">
                    <h1>
                        Refined Nails.
                        <br />
                        Flawless Finish.
                    </h1>
                    <div>
                        <Link to={"/"}><p>View More</p></Link>
                        <Link to={""}><p>Book Now</p></Link>
                    </div>
                </section>
            </header>
        </>
    )
}

export default HomeHeader