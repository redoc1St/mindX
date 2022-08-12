import{Card as BCard} from 'react-bootstrap'
function Card({
    imageUrl,
    title,
    description,
    note
}) {
    //mấy cái thuộc tính trên giống cái props dưới này
    // const { imageUrl } = props
    return (
        <BCard>
            <BCard.Img variant="top" src={imageUrl} />
            <BCard.Body>
                <BCard.Title>{title}</BCard.Title>
                <BCard.Text>
                    {description}
                </BCard.Text>
                <BCard.Text>
                    {note}
                </BCard.Text>
                {/* <Button variant="primary">Go somewhere</Button> */}
            </BCard.Body>
        </BCard>
    )
}

export default Card