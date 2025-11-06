import { MdOutlineReviews } from "react-icons/md";
const ReviewInfo: React.FC = () => {
    return(
        <>
            <section className="page-section">
                <div className="page-section__child review-info">
                    <div>
                        <p>Leave a Review <MdOutlineReviews /> </p>

                        <p>
                            We’d love to hear how your visit went! Tell us about your experience, your favorite nail design, or how your Pom-approved manicure made you feel. Your feedback helps us keep every set pawfect!
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ReviewInfo