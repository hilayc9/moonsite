import React from 'react';
import {Image} from 'react-native';
import Star from "../Images/star.png";
import Blank from "../Images/blank.jpg";

let renderRating = (rating) => {
    let stars = [];
    let i;
    this.stars = [];

    for (i = 1; i < rating; i++) {
        this.stars.push((<Image key={i} source={Star} style={styles.star}/>));
    }

    let half = rating % 1;
    if (half > 0) {
        half = 1 - half;
        half = 20 * half;
        this.stars.push(
            (this.star),
            (<Image key={i + 1} source={Blank} style={[styles.star, {marginLeft: -half - 5}]}/>)
        )
    }

    return this.stars;
};

const styles = {
    star: {
        marginTop: 10,
        height: 20,
        width: 20,
        alignSelf: 'center',
        marginRight: 5
    }
};

export default renderRating;