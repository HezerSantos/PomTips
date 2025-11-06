import nailOne from '../../../assets/images/nailOne.jpg'
interface NailCardProps {
    header: string
    price: number
    imgUrl: string
}


const nailInfo: NailCardProps[] = [
    {
        header: "French Tips",
        price: 25,
        imgUrl: nailOne
    },
    {
        header: "Acrylic Full Set",
        price: 45,
        imgUrl: nailOne
    },
    {
        header: "Gel X Extensions",
        price: 55,
        imgUrl: nailOne
    },
    {
        header: "Builder Gel Refill",
        price: 40,
        imgUrl: nailOne
    },
    {
        header: "Classic Manicure",
        price: 20,
        imgUrl: nailOne
    },
    {
        header: "Deluxe Pedicure",
        price: 35,
        imgUrl: nailOne
    },
    {
        header: "Nail Art Design",
        price: 50,
        imgUrl: nailOne
    },
    {
        header: "Custom Shape Set",
        price: 60,
        imgUrl: nailOne
    },
    {
        header: "Polish Change",
        price: 15,
        imgUrl: nailOne
    },
    {
        header: "Ombre Nails",
        price: 55,
        imgUrl: nailOne
    },
    {
        header: "Chrome Finish",
        price: 45,
        imgUrl: nailOne
    },
    {
        header: "Glitter Set",
        price: 40,
        imgUrl: nailOne
    }
]

export default nailInfo