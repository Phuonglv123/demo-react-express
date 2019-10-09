import React, {Component} from 'react';
import MyLayout from "../../component/MyLayout/MyLayout";
import {inject, observer} from "mobx-react";
import {withRouter} from 'react-router-dom';
import Slider from "react-slick";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import {toJS} from "mobx";

class HomeScene extends Component {
    async componentDidMount(): void {
        await this.props.TripsStore.getAllTrips();
        await this.props.TripsStore.getTest();
    }

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1
        };
        const AllTrip = toJS(this.props.TripsStore.AllTrips);
        console.log(AllTrip)
        return (
            <MyLayout>
                <Slider {...settings}>
                    {AllTrip.map((i, index) => (
                        <div key={index}>
                            <Card className='m-3'>
                                <CardBody>
                                    <CardTitle>Card title</CardTitle>
                                    <CardSubtitle>Card subtitle</CardSubtitle>
                                    <CardText>Some quick example text to build on the card title and make up the bulk of
                                        the
                                        card's content.</CardText>
                                    <Button>Button</Button>
                                </CardBody>
                            </Card>
                        </div>
                    ))}
                </Slider>
            </MyLayout>
        );
    }
}

export default inject('TripsStore')(withRouter(observer(HomeScene)))
