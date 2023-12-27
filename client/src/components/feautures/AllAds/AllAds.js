import { useSelector } from "react-redux";
import { getAllAds } from "../../../redux/adsRedux";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import { NavLink } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { IMGS_URL } from "../../../config";
import styles from "./AllAds.module.scss";
import formatShortDate from "./../../../utils/formatShortDate"


const AllAds = () => {

    const ads = useSelector(getAllAds)
    
    
    return(<section id="allAdds">
        
    <Row>{ads.map(ad => (
      <Col key={ad._id} className="col-lg-4">
        <Card className="mr-2 mb-3" style={{ minWidth: '18rem' }}>
          <Card.Body  >
            <Card.Title className={styles.title}>{ad.title}</Card.Title>
            <Stack direction="horizontal" gap={1}>
              <Card.Subtitle className='mt-0'>Location:
              </Card.Subtitle>
              <Card.Text>
                {ad.location}
              </Card.Text>
            </Stack>
            <Stack direction="horizontal" gap={1}>
              <Card.Subtitle className='mt-0'>Published:
              </Card.Subtitle>
              <Card.Text>
                {formatShortDate(ad.publicationDate)}
              </Card.Text>
            </Stack>
            <Stack className="pr-2 py-2">
                <div className={styles.img }><Card.Img variant="top" src={IMGS_URL + ad.image } alt={ad.title} /></div>        
            </Stack>
            <NavLink to={`/ad/${ad._id}`}>
              <Button variant="primary">Read more</Button>
            </NavLink>
          </Card.Body>
        </Card></Col>))}
    </Row>

    </section>)
}

export default AllAds;