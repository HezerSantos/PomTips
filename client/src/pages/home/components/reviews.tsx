import React from 'react'
import reviewImage from '../../../assets/images/reviewImage.png'
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

interface ReviewItemProps {
    name: string
    text: string
    stars: 1 | 2 | 3 | 4 | 5
}
const ReviewItem: React.FC<ReviewItemProps> = ({name, text, stars}) => {
    const emptyStars = 5 - stars
    return(
        <>
            <div className='review-item'>
                <p>{name}</p>
                <p>{text}</p>
                <div>
                    {[...Array(emptyStars)].map((_, i)=> {
                        return(
                            <FaRegStar key={i} className='empty-star'/>
                        )
                    })}
                    {[...Array(stars)].map((_, i) => {
                        return(
                            <FaStar key={i} className='full-star'/>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

const Reviews: React.FC = () => {
    return(
        <>
            <section className="page-section">
                <div className="page-section__child reviews">
                    <div className="reviews-image">
                        <img src={reviewImage} alt="" />
                    </div>
                    <div className='reviews-container'>
                        <ReviewItem 
                        name='Isabella Cruz'
                        text='Absolutely obsessed! My Pom-inspired set turned out even better than I imagined — precise, comfy, and the staff made me feel pampered. I’ll be back every month'
                        stars={4}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Reviews